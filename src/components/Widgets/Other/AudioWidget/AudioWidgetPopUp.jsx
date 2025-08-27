import React, { useEffect } from "react";
import { IoMdClose } from "react-icons/io";

const AudioWidgetPopUp = ({ textToSpeak, onClose }) => {

  useEffect(() => {
    if (!textToSpeak) return;

    // Speak the text
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    window.speechSynthesis.speak(utterance);

    return () => {
      window.speechSynthesis.cancel();
    };
  }, [textToSpeak]);

  if (!textToSpeak) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.popup}>
        <div style={styles.topBar}>
          <button onClick={onClose} style={styles.closeBtn}><IoMdClose /></button>
        </div>
        <div style={styles.textContainer}>
          <p style={styles.text}>{textToSpeak}</p>
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
    width: "1000px",
    height:'200px',
    background: "#fff",
    borderRadius: "8px",
    boxShadow: "0px 4px 20px rgba(0,0,0,0.3)",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
  },
  topBar: {
    background: "#f1f1f1",
    padding: "5px",
    display: "flex",
    justifyContent: "flex-end",
    borderBottom: "1px solid #ccc",
  },
  closeBtn: {
    border: "none",
    background: "transparent",
    fontSize: "18px",
    cursor: "pointer",
  },
  textContainer: {
    padding: "20px",
    minHeight: "100px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: "18px",
    textAlign: "center",
  }
};

export default AudioWidgetPopUp;
