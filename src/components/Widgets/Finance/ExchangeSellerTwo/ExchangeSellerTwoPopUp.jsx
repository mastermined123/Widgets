import React from "react";
import { IoMdClose } from "react-icons/io";

const ExchangeSellerTwoPopUp = ({
  valueText,
  customFontColor,
  textFont,
  customBgColor,
  onClose
}) => {
  if (!valueText) return null;

  return (
    <div style={{...styles.overlay, backgroundColor: customBgColor || "rgba(0,0,0,0.6)"}}>
      <div style={styles.popup}>
        {/* Top bar */}
        <div style={styles.topBar}>
          <button onClick={onClose} style={styles.closeBtn}>
            <IoMdClose />
          </button>
        </div>

        {/* Fullscreen scrolling text */}
        <div style={styles.scrollWrapper}>
          <h1 style={{
            ...styles.scrollText,
            color: customFontColor || "#fff",
            fontFamily: textFont || "Arial",
          }}>
            {valueText}
          </h1>
        </div>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: "fixed",
    top: 0, left: 0,
    width: "100vw",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2000,
  },
  popup: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    overflow: "hidden",
  },
  topBar: {
    position: "absolute",
    top: "10px",
    right: "10px",
  },
  closeBtn: {
    border: "none",
    background: "transparent",
    fontSize: "30px",
    cursor: "pointer",
    color: "#fff"
  },
  scrollWrapper: {
    width: "100%",
    overflow: "hidden",
    whiteSpace: "nowrap",
    display: "flex",
    justifyContent: "flex-start",
  },
  scrollText: {
    display: "inline-block",
    paddingLeft: "100%",
    animation: "scroll-left 12s linear infinite",
    fontSize: "300px",
    fontWeight: "bold",
  }
};

// Keyframes for scrolling
// const styleSheet = document.styleSheets[0];
// if (styleSheet) {
//   styleSheet.insertRule(`
//     @keyframes scroll-left {
//       0% { transform: translateX(0%); }
//       100% { transform: translateX(-100%); }
//     }
//   // `, styleSheet.cssRules.length);
// }

export default ExchangeSellerTwoPopUp;
