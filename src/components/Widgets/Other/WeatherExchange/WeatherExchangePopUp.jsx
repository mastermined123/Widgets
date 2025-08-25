import React from "react";
import { IoMdClose } from "react-icons/io";

const WeatherExchangepopUp = ({ text, onClose }) => {
  return (
    <div style={styles.overlay}>
      <div style={styles.popup}>
        <div >
          <button onClick={onClose} style={styles.closeBtn}><IoMdClose /></button>
        </div>
        <div style={styles.textContainer}>
          <p style={styles.text}>{text}</p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: "fixed",
    top: 0, left: 0,
    width: "100%", height: "100%",
    background: "rgba(0,0,0,0.6)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2000,
  },
  popup: {
    width: "90%",
    height:'500px',
    background: "#fff",
    borderRadius: "8px",
    boxShadow: "0px 4px 20px rgba(0,0,0,0.3)",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
  },
  topBar: {
    // width: "100%",
    // display: "flex",
    // justifyContent: "flex-end",
    // borderBottom: "1px solid #ccc",
    // marginBottom: "20px",
  },
  closeBtn: {
    border: "none",
    background: "transparent",
    fontSize: "20px",
    cursor: "pointer",
position: "absolute",
top:35,
right:45,
  },
  textContainer: {
    textAlign: "center",
  },
  text: {
    fontSize: "16px",
    fontWeight: "bold",
  },
};

export default WeatherExchangepopUp;
