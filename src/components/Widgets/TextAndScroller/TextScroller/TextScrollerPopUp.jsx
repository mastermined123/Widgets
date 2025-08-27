import React, { useEffect } from "react";
import { IoMdClose } from "react-icons/io";

const TextScrollerPopUp = ({
  onClose,
  appName = "Text Scroller",
  tags = [],
  textColor = "#ffffff",
  backgroundColor = "#007184",
  scrollSpeed = "Default",
  customScrollSpeed = "",
  fontSize = "",
  textFont = "",
  text = ""
}) => {
  useEffect(() => {
    // Add scrolling animation keyframes to document
    const styleId = "text-scroller-animation";
    let existingStyle = document.getElementById(styleId);
    
    if (!existingStyle) {
      const style = document.createElement("style");
      style.id = styleId;
      style.textContent = `
        @keyframes scroll-left {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
      `;
      document.head.appendChild(style);
    }

    return () => {
      // Cleanup on unmount
      const style = document.getElementById(styleId);
      if (style) {
        style.remove();
      }
    };
  }, []);

  // Calculate scroll duration based on speed
  const getScrollDuration = () => {
    if (customScrollSpeed) {
      return `${customScrollSpeed / 100}s`;
    }
    
    switch (scrollSpeed) {
      case "Slow":
        return "15s";
      case "Fast":
        return "5s";
      default:
        return "10s";
    }
  };

  // Calculate font size
  const getFontSize = () => {
    const baseSize = 48;
    if (fontSize) {
      return `${(baseSize * parseInt(fontSize)) / 100}px`;
    }
    return `${baseSize}px`;
  };

  // Split text into lines
  const textLines = text.split('\n').filter(line => line.trim());

  return (
    <div style={styles.overlay}>
      <div style={{
        ...styles.popup,
        backgroundColor: backgroundColor
      }}>
        {/* Close button */}
        <button onClick={onClose} style={styles.closeBtn}>
          <IoMdClose />
        </button>

        {/* Scrolling text container */}
        <div style={styles.scrollContainer}>
          {textLines.map((line, index) => (
            <div key={index} style={styles.scrollWrapper}>
              <div
                style={{
                  ...styles.scrollText,
                  color: textColor,
                  fontFamily: textFont || "Arial, sans-serif",
                  fontSize: getFontSize(),
                  animationDuration: getScrollDuration(),
                  animationDelay: `${index * 2}s`
                }}
              >
                {line}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.6)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2000,
  },
  popup: {
    width: "90%",
    height: "70%",
    borderRadius: "8px",
    boxShadow: "0px 4px 20px rgba(0,0,0,0.3)",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    position: "relative",
  },
  closeBtn: {
    position: "absolute",
    top: "15px",
    right: "15px",
    border: "none",
    background: "rgba(255,255,255,0.8)",
    fontSize: "18px",
    cursor: "pointer",
    width: "30px",
    height: "30px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
    color: "#000",
  },
  scrollContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    overflow: "hidden",
    padding: "20px",
  },
  scrollWrapper: {
    width: "100%",
    overflow: "hidden",
    whiteSpace: "nowrap",
    marginBottom: "20px",
  },
  scrollText: {
    display: "inline-block",
    animation: "scroll-left 10s linear infinite",
    fontWeight: "bold",
    whiteSpace: "nowrap",
  }
};

export default TextScrollerPopUp;
