import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";

const LcdClockPopUp = ({ 
  onClose, 
  fontColor = "#ff4444",
  customBgColor = "#000000", 
  customBgImage,
  timeOptions = "HH:MM",
  timeFormat = "24H",
  hideDate = false,
  hideWeek = false,
  language = "en"
}) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    // Update time every second
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timeInterval);
  }, []);


const formatTime = (date) => {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();
  let ampm = "";

  if (timeFormat === "AM/PM") {
    ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // 0 should be 12
  }
  // For 24H format, keep hours as is (no conversion needed)

  const formatNumber = (num) => num.toString().padStart(2, "0");

  switch (timeOptions) {
    case "HH:MM:SS":
      return `${formatNumber(hours)}:${formatNumber(minutes)}:${formatNumber(seconds)}${ampm ? ` ${ampm}` : ""}`;
    case "MM:SS":
      return `${formatNumber(minutes)}:${formatNumber(seconds)}`;
    case "HH:MM":
    default:
      return `${formatNumber(hours)}:${formatNumber(minutes)}${ampm ? ` ${ampm}` : ""}`;
  }
};

  const formatDate = (date) => {
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    
    // Use the selected language for date formatting
    return date.toLocaleDateString(language === 'en' ? 'en-US' : language, options);
  };

  const formatWeekday = (date) => {
    const options = { weekday: 'long' };
    return date.toLocaleDateString(language === 'en' ? 'en-US' : language, options);
  };

  const getBackgroundStyle = () => {
    let style = {
      backgroundColor: customBgColor || "#000000"
    };

    if (customBgImage) {
      style = {
        ...style,
        backgroundImage: `url(${typeof customBgImage === 'string' ? customBgImage : URL.createObjectURL(customBgImage)})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
      };
    }

    return style;
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.popup}>
        {/* Top bar like browser tab */}
        <div style={styles.topBar}>
          <button onClick={onClose} style={styles.closeBtn}>
            <IoMdClose />
          </button>
        </div>

        {/* LCD Clock Display */}
        <div style={{...styles.clockContainer, ...getBackgroundStyle()}}>
          <div style={styles.clockContent}>
            {/* Time Display */}
            <div style={{...styles.timeDisplay, color: fontColor || "#ff4444"}}>
              {formatTime(currentTime)}
            </div>
            
            {/* Date Display */}
            {!hideDate && (
              <div style={{...styles.dateDisplay, color: fontColor || "#ff4444"}}>
                {formatDate(currentTime)}
              </div>
            )}
            
            {/* Weekday Display */}
            {!hideWeek && (
              <div style={{...styles.weekDisplay, color: fontColor || "#ff4444"}}>
                {formatWeekday(currentTime)}
              </div>
            )}
          </div>
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
    width: "100%",
    height: "100%",
    background: "#fff",
    boxShadow: "0px 4px 20px rgba(0,0,0,0.3)",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
  },
  topBar: {
    padding: "5px 10px",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    height: "35px",
  },
  closeBtn: {
    border: "none",
    fontSize: "18px",
    cursor: "pointer",
    padding: "5px",
    borderRadius: "3px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  clockContainer: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    overflow: "hidden",
  },
  clockContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    zIndex: 1,
    padding: "30px",
  },
timeDisplay: {
  fontFamily: "'Orbitron', 'Wallpoet', monospace",
  fontSize: "100px",
  fontWeight: "bold",
  letterSpacing: "8px",
  // textShadow: "0 0 20px currentColor, 0 0 40px currentColor",
  marginBottom: "15px",
  lineHeight: "1",
},
  dateDisplay: {
    fontSize: "54px",
    fontWeight: "600",
  fontFamily: "'Orbitron', 'Wallpoet', monospace",
    letterSpacing: "2px",
    // textShadow: "0 0 10px currentColor",
    marginBottom: "10px",
    opacity: "0.9",
  },
  weekDisplay: {
    fontSize: "60px",
    fontWeight: "500",
  fontFamily: "'Orbitron', 'Wallpoet', monospace",
    letterSpacing: "4px",
    // textShadow: "0 0 8px currentColor",
    textTransform: "uppercase",
    opacity: "0.8",
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

export default LcdClockPopUp;