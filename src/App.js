import React, { useState, useEffect } from 'react';
import Navbar from "./components/Navbar/Navbar";
import Login from "./components/Login/Login";
import Container from "./components/Container/Container";
import styles from "./App.module.css";
import Logoutbtn from "./components/Logout/Logoutbtn";

function App() {
  const [isLoggenIn, setIsLoggedIn] = useState(JSON.parse(localStorage.getItem('isLoggenIn')) || false);
  useEffect(() => {
    localStorage.setItem('isLoggenIn', JSON.stringify(isLoggenIn));
  }, [isLoggenIn]);
  return (
    <div className={styles.container}>                                                                                                          
      {isLoggenIn===false?
      <>
      <Navbar />
      <Login setIsLoggedIn={setIsLoggedIn}/>
      </>
      :
      <><Navbar />
      <Logoutbtn setIsLoggedIn={setIsLoggedIn}/>
      <Container setIsLoggedIn={setIsLoggedIn} />
      </>
      }
      
    </div>
  );
}

export default App;
