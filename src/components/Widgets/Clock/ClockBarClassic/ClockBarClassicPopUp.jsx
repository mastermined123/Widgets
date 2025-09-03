/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";

const ClockBarClassicPopUp = ({
  onClose,
  appName = "Clock Bar Classic",
  tags = [],
  theme = "Royal Blue",
  timeFormat = "AM/PM",
  textFont = "Arial",
  fontColor = "#000000",
  containerColor = "#ffffff",
  bgColor = "#f5f5f5",
  bgImage = "",
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

    hours = hours.toString().padStart(2, "0");
    minutes = minutes.toString().padStart(2, "0");

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

  // Apply theme-based styling
  const getThemeStyles = () => {
    switch(theme) {
      case "Royal Blue":
        return {
          containerBg: "#1a4b8c",
          textColor: "#ffffff"
        };
      case "Navy":
        return {
          containerBg: "#0a192f",
          textColor: "#ffffff"
        };
      case "Dark Cyan":
        return {
          containerBg: "#008b8b",
          textColor: "#ffffff"
        };
      case "Lime Green":
        return {
          containerBg: "#32cd32",
          textColor: "#000000"
        };
      case "Wheat":
        return {
          containerBg: "#f5deb3",
          textColor: "#000000"
        };
      case "Red Velvet":
        return {
          containerBg: "#8b0000",
          textColor: "#ffffff"
        };
      case "Forest Green":
        return {
          containerBg: "#228b22",
          textColor: "#ffffff"
        };
      default:
        return {
          containerBg: "#1a4b8c",
          textColor: "#ffffff"
        };
    }
  };

  const themeStyles = getThemeStyles();

  return (
    <div style={styles.overlay}>
      <div style={{
        ...styles.popup,
        backgroundColor: bgColor,
        backgroundImage: bgImage ? `url(${bgImage})` : "none",
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}>
        {/* Close button */}
        <button onClick={onClose} style={styles.closeBtn}>
          <IoMdClose />
        </button>

        {/* App Name */}
        {/* <div style={styles.appName}>{appName}</div> */}

        {/* Main Content */}
        <div style={styles.content}>
          {/* Left Box - Date */}
          <div style={{
            ...styles.box1,
            backgroundColor: containerColor !== "#ffffff" ? containerColor : themeStyles.containerBg,
            color: containerColor !== "#ffffff" ? fontColor : themeStyles.textColor,
            fontFamily: textFont || "Arial",
            marginTop: '-60px',
          }}>
            <div style={styles.boxContent}>
              {dateString}
            </div>
          </div>

          {/* Right Box - Time */}
          <div style={{
            ...styles.box2,
            backgroundColor: containerColor !== "#ffffff" ? containerColor : themeStyles.containerBg,
            color: containerColor !== "#ffffff" ? fontColor : themeStyles.textColor,
            fontFamily: textFont || "Arial"
          }}>
<div style={{ ...styles.boxContent, fontSize: "74px" }}>
              {hours}:{minutes} {timeFormat === "AM/PM" && ampm}
            </div>
          </div>
        </div>

        {/* Tags (below boxes) */}
        {/* {tags?.length > 0 && (
          <div style={styles.tagsContainer}>
            {tags.map((tag, i) => (
              <span key={i} style={styles.tag}>{tag}</span>
            ))}
          </div>
        )} */}
      </div>

      {/* CSS Animations */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.3; }
          }
        `}
      </style>
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
    position: "relative",
    width: "100%",
    height: "100%",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    padding: "20px",
  },
  closeBtn: {
    position: "absolute",
    top: "25px",
    right: "5px",
    border: "none",
    background: "gray",
    fontSize: "24px",
    cursor: "pointer",
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 100000,
    color: "#333",
    backdropFilter: "blur(5px)",
  },
  appName: {
    position: "absolute",
    top: "20px",
    left: "20px",
    fontSize: "18px",
    fontWeight: "bold",
    color: "#333",
  },
content: {
  position: "fixed",   
  top: 0,             
  left: 0,
  width: "100%",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  gap: "20px",
  zIndex: 1000, 
},
  box1: {
    flex: 1,
    height: "100px",
    width:'100%',
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
    border: "1px solid rgba(0,0,0,0.1)",
    borderBottomRightRadius: "40px",
       },
  box2: {
    flex: 1,
    height: "150px",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
    border: "1px solid rgba(0,0,0,0.1)",
      borderBottomLeftRadius: "70px",

  },

  boxContent: {
    fontSize: "34px",
    fontWeight: "500",
    textAlign: "center",
    padding: "10px",
  },
  tagsContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "8px",
    flexWrap: "wrap",
    padding: "15px 0",
    marginTop: "auto",
  },
  tag: {
    padding: "6px 12px",
    backgroundColor: "rgba(0,0,0,0.1)",
    borderRadius: "16px",
    fontSize: "12px",
    color: "#333",
  },
};

export default ClockBarClassicPopUp;