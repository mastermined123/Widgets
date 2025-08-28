import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";

const TwitterFormPopUp = ({ image, duration, onClose }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!duration) return;
    let elapsed = 0;
    const interval = setInterval(() => {
      elapsed += 100;
      setProgress((elapsed / (duration * 1000)) * 100);
      if (elapsed >= duration * 1000) {
        clearInterval(interval);
        onClose && onClose();
      }
    }, 100);
    return () => clearInterval(interval);
  }, [duration, onClose]);

  if (!image) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.popup}>
        {/* Top bar like browser tab */}
        <div style={styles.topBar}>
          <button onClick={onClose} style={styles.closeBtn}>

<IoMdClose />

          </button>
        </div>

        {/* Image display */}
        <div style={styles.imageContainer}>
          <img src={image} alt="Birthday" style={styles.image} />
        </div>

        {/* Progress bar */}
        <div style={styles.progressWrapper}>
          <div style={{ ...styles.progressBar, width: `${progress}%` }}></div>
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
    width: "500px",
    background: "#fff",
    borderRadius: "8px",
    boxShadow: "0px 4px 20px rgba(0,0,0,0.3)",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
  },
  topBar: {
    background: "#f1f1f1",
    padding: "1px 1px",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    borderBottom: "1px solid #ccc",
  },
  closeBtn: {
    border: "none",
    background: "transparent",
    fontSize: "18px",
    cursor: "pointer",
  },
  imageContainer: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "10px",
    backgroundColor: "#fafafa",
  },
  image: {
    maxWidth: "100%",
    maxHeight: "400px",
    borderRadius: "6px",
  },
  progressWrapper: {
    height: "6px",
    background: "#eee",
    width: "100%",
  },
  progressBar: {
    height: "100%",
    background: "#005481",
    transition: "width 0.1s linear",
  },
};

export default TwitterFormPopUp;
