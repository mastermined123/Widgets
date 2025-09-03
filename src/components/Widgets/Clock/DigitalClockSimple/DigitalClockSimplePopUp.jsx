import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";

const DigitalClockSimplePopUp = ({
  onClose,
  appName = "Digital Clock Simple",
  tags = [],
  centralBgColor = "#cad4de",
  borderBgColor = "#0f0f0f",
  textFont = "Roboto Condensed Italic",
  fontColor = "#ffffff",
  timeFormat = "AM/PM",
  disableDate = false,
  disableAnimation = false,
  disableLeadingZero = false,
  selectedLanguage = "en-US",
}) => {
  const [time, setTime] = useState(new Date());

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Format time based on settings
  const formatTime = (date) => {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = "";

    if (timeFormat === "AM/PM") {
      ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12;
      hours = hours ? hours : 12; // 0 should be 12
    }

    if (!disableLeadingZero) {
      hours = hours.toString().padStart(2, "0");
      minutes = minutes.toString().padStart(2, "0");
    }

    return { hours, minutes, ampm };
  };

  // Format date
  const formatDate = (date) => {
    const options = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return date.toLocaleDateString(selectedLanguage, options);
  };

  const { hours, minutes, ampm } = formatTime(time);
  const dateString = formatDate(time);

  return (
    <div style={styles.overlay}>
      <div style={{
        ...styles.popup,
        background: `radial-gradient(circle at center, ${centralBgColor} 0%, ${borderBgColor} 100%)`,
        border: `2px solid ${borderBgColor}`
      }}>
        {/* Close button */}
        <button onClick={onClose} style={styles.closeBtn}>
          <IoMdClose />
        </button>

        {/* Digital Clock Display */}
        <div style={styles.content}>
          <div style={styles.clockContainer}>
            {/* Time Display */}
            <div style={{
              ...styles.timeDisplay,
              fontFamily: textFont,
              color: fontColor,
              animation: disableAnimation ? "none" : "fadeIn 1s ease-in-out"
            }}>
              <span style={styles.timeText}>
                {hours}
                <span style={{
                  ...styles.colonBlink,
                  animation: disableAnimation ? "none" : "blink 1s infinite"
                }}>:</span>
                {minutes}
                {timeFormat === "AM/PM" && (
                  <span style={styles.ampmText}>{ampm}</span>
                )}
              </span>
            </div>

            {/* Date Display */}
            {!disableDate && (
              <div style={{
                ...styles.dateDisplay,
                fontFamily: textFont,
                color: fontColor,
                opacity: 0.9
              }}>
                {dateString}
              </div>
            )}
          </div>

          {/* Tags (below clock) */}
          {tags?.length > 0 && (
            <div style={styles.tagsContainer}>
              {tags.map((tag, i) => (
                <span key={i} style={styles.tag}>{tag}</span>
              ))}
            </div>
          )}
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
    borderRadius: "8px",
    boxShadow: "0px 4px 20px rgba(0,0,0,0.3)",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    width: "900px",
    height: "550px",
    padding: "30px",
    position: "relative",
  },
  closeBtn: {
    position: "absolute",
    top: "15px",
    right: "15px",
    border: "none",
    background: "rgba(255,255,255,0.2)",
    fontSize: "18px",
    cursor: "pointer",
    width: "30px",
    height: "30px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
    color: "#fff",
  },
  content: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  clockContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  timeDisplay: {
    fontSize: "120px",
    fontWeight: "300",
    lineHeight: "1",
    marginBottom: "20px",
    textShadow: "0 2px 10px rgba(0,0,0,0.3)",
  },
  timeText: {
    display: "inline-block",
  },
  ampmText: {
    fontSize: "0.4em",
    verticalAlign: "top",
    marginLeft: "10px",
    fontWeight: "400",
  },
  dateDisplay: {
    fontSize: "28px",
    fontWeight: "300",
    textShadow: "0 1px 5px rgba(0,0,0,0.3)",
  },
  tagsContainer: {
    marginTop: "30px",
    display: "flex",
    gap: "8px",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  tag: {
    padding: "4px 12px",
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: "16px",
    fontSize: "14px",
    color: "#fff",
    backdropFilter: "blur(10px)",
  },
  colonBlink: {
    display: "inline-block",
  },
};

// // Add CSS keyframes for blinking animation
// const styleSheet = document.styleSheets[0];
// if (styleSheet && !Array.from(styleSheet.cssRules).some(rule => rule.name === 'blink')) {
//   styleSheet.insertRule(`
//     @keyframes blink {
//       0%, 50% { opacity: 1; }
//       51%, 100% { opacity: 0; }
//     }
//   `, styleSheet.cssRules.length);
// }

export default DigitalClockSimplePopUp;