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
        @keyframes scroll-right-to-left {
          0% { 
            transform: translateX(100vw); 
          }
          100% { 
            transform: translateX(-100%); 
          }
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
    // customScrollSpeed = pixels per second (higher = faster)
    const speed = parseFloat(customScrollSpeed);
    const distance = window.innerWidth * 2; // travel distance approx
    const duration = distance / speed; // seconds
    return `${duration}s`;
  }

  switch (scrollSpeed) {
    case "Slow":
      return "20s";
    case "Fast":
      return "8s";
    default:
      return "12s";
  }
};


  // Calculate font size
  const getFontSize = () => {
    const baseSize = 48;
    if (fontSize) {
      return `${parseInt(fontSize)}px`;
    }
    return `${baseSize}px`;
  };

  // Split text into lines or use default text
  const textLines = text && text.trim() ? 
    text.split('\n').filter(line => line.trim()) : 
    ["Welcome to Text Scroller!", "This text scrolls from right to left across the screen", "Add your custom text in the form to see it here"];

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

        {/* App Title */}
        <div style={styles.titleBar}>
          <h2 style={{ ...styles.appTitle, color: textColor }}>
            {appName}
          </h2>
        </div>

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
                  animationDelay: `${index * 3}s`
                }}
              >
                {line}
              </div>
            </div>
          ))}
        </div>

        {/* Tags display */}
        {tags && tags.length > 0 && (
          <div style={styles.tagsContainer}>
            {tags.map((tag, index) => (
              <span key={index} style={styles.tag}>
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    background: "rgba(0,0,0,0.8)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2000,
  },
  popup: {
    width: "100vw",
    height: "100vh",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    position: "relative",
  },
  closeBtn: {
    position: "absolute",
    top: "20px",
    right: "20px",
    border: "none",
    background: "rgba(255,255,255,0.9)",
    fontSize: "24px",
    cursor: "pointer",
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
    color: "#000",
    boxShadow: "0 2px 8px rgba(0,0,0,0.3)"
  },
  titleBar: {
    padding: "20px",
    textAlign: "center",
    borderBottom: "2px solid rgba(255,255,255,0.2)"
  },
  appTitle: {
    margin: 0,
    fontSize: "24px",
    fontWeight: "bold",
    textShadow: "2px 2px 4px rgba(0,0,0,0.5)"
  },
  scrollContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    overflow: "hidden",
    padding: "40px 0",
    gap: "30px"
  },
  scrollWrapper: {
    width: "100%",
    overflow: "hidden",
    whiteSpace: "nowrap",
    height: "auto",
    display: "flex",
    alignItems: "center"
  },
  scrollText: {
    display: "inline-block",
    animation: "scroll-right-to-left 12s linear infinite",
    fontWeight: "bold",
    whiteSpace: "nowrap",
    textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
    minWidth: "max-content"
  },
  tagsContainer: {
    position: "absolute",
    bottom: "20px",
    left: "20px",
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
    zIndex: 5
  },
  tag: {
    backgroundColor: "rgba(255,255,255,0.2)",
    color: "#ffffff",
    padding: "5px 12px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "bold",
    border: "1px solid rgba(255,255,255,0.3)"
  }
};

export default TextScrollerPopUp;