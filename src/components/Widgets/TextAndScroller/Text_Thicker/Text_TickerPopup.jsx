import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";

const TextTickerPopUp = ({
  onClose,
  appName = "",
  tags = [],
  textColor = "#000000",
  backgroundColor = "#ffffff",
  sentenceDuration = 3,
  animateTransition = true,
  fontSize = "100",
  textFont = "",
  textContent = ""
}) => {
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);

  // Split text into sentences
  const sentences = textContent && textContent.trim() ? 
    textContent.split(/[.!?]+/).filter(sentence => sentence.trim()) : 
    ["Welcome to Text Scroller!", "This is your custom text display", "Add your text in the form to see it here"];

  // Clean sentences and add punctuation back
  const cleanSentences = sentences.map(sentence => {
    const trimmed = sentence.trim();
    // Add period if no punctuation at end
    if (trimmed && !['.', '!', '?'].some(punct => trimmed.endsWith(punct))) {
      return trimmed + '.';
    }
    return trimmed;
  });

  useEffect(() => {
    if (cleanSentences.length > 1) {
      const interval = setInterval(() => {
        setCurrentSentenceIndex(prev => (prev + 1) % cleanSentences.length);
      }, sentenceDuration * 1000);

      return () => clearInterval(interval);
    }
  }, [cleanSentences.length, sentenceDuration]);

  useEffect(() => {
    // Add fade animation keyframes to document
    if (animateTransition) {
      const styleId = "text-fade-animation";
      let existingStyle = document.getElementById(styleId);
      
      if (!existingStyle) {
        const style = document.createElement("style");
        style.id = styleId;
        style.textContent = `
          @keyframes fadeInOut {
            0% { 
              opacity: 0;
              transform: scale(0.9);
            }
            10% {
              opacity: 1;
              transform: scale(1);
            }
            90% {
              opacity: 1;
              transform: scale(1);
            }
            100% { 
              opacity: 0;
              transform: scale(0.9);
            }
          }
          
          @keyframes slideIn {
            0% { 
              opacity: 0;
              transform: translateY(20px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
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
    }
  }, [animateTransition]);

  // Calculate font size based on percentage
// Calculate font size based on percentage and viewport
const getFontSize = () => {
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  
  // Base font size calculation based on viewport (responsive base)
  const baseSize = Math.min(viewportWidth, viewportHeight) * 0.3; // 30% of smaller viewport dimension
  
  let percentage = parseInt(fontSize) || 100;
  
  // Constrain percentage between 1 and 100
  percentage = Math.max(1, Math.min(100, percentage));
  
  const calculatedSize = (baseSize * percentage) / 100;
  
  // Min and max constraints
  const minSize = 16; // minimum readable size
  const maxSize = Math.min(viewportWidth, viewportHeight) * 0.7; // 70% of viewport for 100%
  
  return `${Math.max(minSize, Math.min(maxSize, calculatedSize))}px`;
};


// Get font family
  const getFontFamily = () => {
    return textFont || "Arial, sans-serif";
  };

  const currentSentence = cleanSentences[currentSentenceIndex] || cleanSentences[0];

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
        {appName && (
          <div style={styles.titleBar}>
            <h2 style={{ 
              ...styles.appTitle, 
              color: textColor,
              fontFamily: getFontFamily()
            }}>
              {appName}
            </h2>
          </div>
        )}

        {/* Main text display container */}
        <div style={styles.textContainer}>
          <div
            key={currentSentenceIndex}
            style={{
              ...styles.mainText,
              color: textColor,
              fontFamily: getFontFamily(),
              fontSize: getFontSize(),
              animation: animateTransition ? 
                (cleanSentences.length > 1 ? `fadeInOut ${sentenceDuration}s ease-in-out` : "slideIn 0.5s ease-out") :
                "none"
            }}
          >
            {currentSentence}
          </div>

          {/* Sentence indicator dots */}
          {cleanSentences.length > 1 && (
            <div style={styles.indicatorContainer}>
              {cleanSentences.map((_, index) => (
                <div
                  key={index}
                  style={{
                    ...styles.indicator,
                    backgroundColor: index === currentSentenceIndex ? textColor : 'rgba(255,255,255,0.3)',
                    borderColor: textColor
                  }}
                />
              ))}
            </div>
          )}

          {/* Duration info */}
          {cleanSentences.length > 1 && (
            <div style={{
              ...styles.durationInfo,
              color: textColor,
              fontFamily: getFontFamily()
            }}>
              Showing each sentence for {sentenceDuration} seconds
            </div>
          )}
        </div>

        {/* Tags display */}
        {tags && tags.length > 0 && (
          <div style={styles.tagsContainer}>
            <div style={{
              ...styles.tagsLabel,
              color: textColor,
              fontFamily: getFontFamily()
            }}>
              Tags:
            </div>
            <div style={styles.tagsWrapper}>
              {tags.map((tag, index) => (
                <span 
                  key={index} 
                  style={{
                    ...styles.tag,
                    color: backgroundColor,
                    backgroundColor: textColor,
                    fontFamily: getFontFamily()
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Settings info */}
        <div style={styles.settingsInfo}>
          <div style={{
            ...styles.settingItem,
            color: textColor,
            fontFamily: getFontFamily()
          }}>
            Font Size: {fontSize}% | Font: {textFont || "Default"} | Animation: {animateTransition ? "On" : "Off"}
          </div>
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
    boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
    transition: "all 0.2s ease"
  },
  titleBar: {
    padding: "20px",
    textAlign: "center",
    borderBottom: "1px solid rgba(255,255,255,0.1)"
  },
  appTitle: {
    margin: 0,
    fontSize: "28px",
    fontWeight: "bold",
    textShadow: "2px 2px 4px rgba(0,0,0,0.3)"
  },
  textContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "40px",
    textAlign: "center"
  },
mainText: {
  fontWeight: "bold",
  textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
  maxWidth: "95%",
  lineHeight: "1.2",
  marginBottom: "30px",
  minHeight: "1.2em",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  wordWrap: "break-word",      // Add this
  overflowWrap: "break-word",  // Add this
  hyphens: "auto"              // Add this
},
  indicatorContainer: {
    display: "flex",
    gap: "8px",
    marginBottom: "20px"
  },
  indicator: {
    width: "12px",
    height: "12px",
    borderRadius: "50%",
    border: "2px solid",
    transition: "all 0.3s ease"
  },
  durationInfo: {
    fontSize: "14px",
    opacity: 0.8,
    fontStyle: "italic"
  },
  tagsContainer: {
    position: "absolute",
    bottom: "60px",
    left: "20px",
    right: "20px",
    zIndex: 5
  },
  tagsLabel: {
    fontSize: "14px",
    fontWeight: "bold",
    marginBottom: "8px"
  },
  tagsWrapper: {
    display: "flex",
    gap: "8px",
    flexWrap: "wrap"
  },
  tag: {
    padding: "6px 12px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "bold",
    border: "1px solid rgba(255,255,255,0.2)",
    transition: "all 0.2s ease"
  },
  settingsInfo: {
    position: "absolute",
    bottom: "20px",
    left: "20px",
    right: "20px",
    textAlign: "center",
    zIndex: 5
  },
  settingItem: {
    fontSize: "12px",
    opacity: 0.7,
    fontStyle: "italic"
  }
};

export default TextTickerPopUp;