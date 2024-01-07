import express from "express";
import mongoose from "mongoose";
import shortUrl from "./model/shortStore.js";
import User from "./model/userModel.js"
import cors from "cors";
import bodyParser from 'body-parser';  

const app = express();

mongoose.connect("mongodb://127.0.0.1:27017/shortUrlDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(()=>{console.log("mongoDB connected")});

//use cors to allow cross origin resource sharing
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello There!");
});

app.post("/short", async (req, res) => {
  const found = await shortUrl.find({ full: req.body.full });
  if (found.length > 0) {
    res.send(found);
  } else {
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 48);

    await shortUrl.create({ full: req.body.full, visitHistory: [], expiresAt });
    const foundNow = await shortUrl.find({ full: req.body.full });
    res.send(foundNow);
  }
});

app.get("/:shortUrl", async (req, res) => {
 // const short = await shortUrl.findOne({ short: req.params.shortUrl });
  const entry = await shortUrl.findOneAndUpdate({
    short: req.params.shortUrl 
  },{$push:{
    visitHistory:{ timestamp: Date.now()},
  }});
  // res.redirect(entry.redirectUrl);
  if (entry == null) return res.sendStatus(404);
  res.redirect(`${entry.full}`);
});
app.get("/short/all", async (req, res) => {
  const entry = await shortUrl.find({});
  res.send(entry);
});
app.post('/login', async (req, res) => {
  // const { username, password } = req.body;
  // console.log({ username:req.body.username, password:req.body.password })

  try {
    const user = await User.findOne({ username:req.body.username, password:req.body.password });
    //  console.log(user);
    if (user) {
      res.json({ success: true });
    } else {
      res.json({ success: false });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

let port = process.env.PORT || 5019;

app.listen(port, function () {
  console.log("Server started successfully on port: ", port);
});
