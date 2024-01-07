import React from 'react'
import styles from "./Logout.module.css";
function Logoutbtn(props) {
    function clickHandler(){
        props.setIsLoggedIn(false);
    }
  return (
    <div>
      <button className={styles.outbtn} onClick={clickHandler}>Logout</button>
    </div>
  )
}

export default Logoutbtn
