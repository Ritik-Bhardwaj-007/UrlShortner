import axios from "axios";
import React, { useEffect, useState } from "react";
import Form from "../Form/Form";
import Table from "../Table/Table";

import styles from "./Container.module.css";
const serverBase = process.env.REACT_APP_SERVERURL || "http://localhost:5019";
export default function Container() {
  const [isLoading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState(null);
  const [fetchedData, setFetchedData] = useState([]);
  useEffect(()=>{axios
  .get(`${serverBase}/short/all`)
  .then((res) => setFetchedData(res.data))
  .catch((err) => {
    setErrMsg("Data Not Available");
    setLoading(false);
    console.error(err);
  });},[])

  return (
    <div className={styles.container}>
      <Form
        fetchedData={fetchedData}
        setLoading={setLoading}
        setErrMsg={setErrMsg}
        setFetchedData={setFetchedData}
      />

      {isLoading && (
        <img className={styles.spinner} src="/preloader.gif" alt="Loading..." />
      )}

      {errMsg && <p className={styles.err}>{errMsg}</p>}

      {!isLoading && !errMsg && fetchedData && (
        <Table fetchedData={fetchedData} />
      )}
    </div>
  );
}
