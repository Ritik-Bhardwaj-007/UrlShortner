import React, { useState } from 'react';
import './Login.module.css';
import axios from "axios";
const serverBase = process.env.REACT_APP_SERVERURL || "http://localhost:5019";

const Login = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginStatus, setLoginStatus] = useState('');

  const login = () => {
      axios
      .post(`${serverBase}/login`, {username,password})
      .then((res) => {
      if(res.data.success){
      setLoginStatus('Login successful!');
      props.setIsLoggedIn(true);}
      else{
        setLoginStatus('Login failed. Please check your credentials.');
        props.setIsLoggedIn(false);
      }
    }).catch((err) => {
        console.error('Error:', err);
      });
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <label htmlFor="username">Username:</label>
      <input
        type="text"
        id="username"
        name="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />

      <label htmlFor="password">Password:</label>
      <input
        type="password"
        id="password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <button type="button" onClick={login}>
        Login
      </button>

      <p id="loginStatus">{loginStatus}</p>
    </div>
  );
};

export default Login;
