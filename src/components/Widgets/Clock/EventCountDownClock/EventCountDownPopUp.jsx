/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";

const EventCountDownPopUp = ({ 
  onClose, 
  eventDate,
  eventTime,
  countdownType,
  text,
  autoFitText,
  textFont,
  lineHeight,
  pageMargin,
  backgroundColor,
  customBgImage,
  transparentBackground,
  disableBackgroundGradient,
  language,
  appLabels
}) => {
  const [timeLeft, setTimeLeft] = useState({
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    if (!eventDate || !eventTime) return;

    const updateCountdown = () => {
      const targetDate = new Date(`${eventDate}T${eventTime}`);
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference > 0) {
        const months = Math.floor(difference / (1000 * 60 * 60 * 24 * 30));
        const days = Math.floor((difference % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ months, days, hours, minutes, seconds });
      } else {
        setTimeLeft({ months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [eventDate, eventTime]);

  const getBackgroundStyle = () => {
    let style = {};

    if (transparentBackground) {
      style.backgroundColor = "transparent";
    } else if (backgroundColor) {
      style.backgroundColor = backgroundColor;
    } else {
      style.backgroundColor = "#f5f5f5";
    }

    if (!disableBackgroundGradient && !transparentBackground) {
      style.background = `linear-gradient(135deg, ${backgroundColor || '#f5f5f5'}, ${backgroundColor ? backgroundColor + '80' : '#e0e0e0'})`;
    }

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

  const getMarginStyle = () => {
    const margins = {
      Small: "20px",
      Regular: "40px", 
      Big: "60px"
    };
    return margins[pageMargin] || margins.Regular;
  };

  const getLineHeightStyle = () => {
    const lineHeights = {
      Small: "1.2",
      Regular: "1.5",
      Big: "1.8"
    };
    return lineHeights[lineHeight] || lineHeights.Regular;
  };

  const getFontSize = () => {
    return autoFitText ? "clamp(24px, 5vw, 48px)" : "36px";
  };

  const formatNumber = (num) => {
    return num.toString().padStart(2, '0');
  };


  const renderFlipCard = (value, label) => {
    const formattedValue = formatNumber(value);
    const digit1 = formattedValue[0];
    const digit2 = formattedValue[1];

    return (
      <div style={styles.flipCardContainer}>
        <div style={styles.flipCardLabel}>{label}</div>
        <div style={styles.flipCardGroup}>
          <div style={styles.flipCard}>
            <div style={styles.flipCardDigit}>{digit1}</div>
          </div>
          <div style={styles.flipCard}>
            <div style={styles.flipCardDigit}>{digit2}</div>
          </div>
        </div>
      </div>
    );
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

        {/* Main Content */}
        <div style={{
          ...styles.mainContent,
          ...getBackgroundStyle(),
          padding: getMarginStyle(),
          fontFamily: textFont || 'Arial'
        }}>
          
          {/* Header Text */}
          {text && (
            <div style={{
              ...styles.headerText,
              fontSize: getFontSize(),
              lineHeight: getLineHeightStyle()
            }}>
              {text}
            </div>
          )}

          {/* Countdown Display */}
<div style={styles.countdownContainer}>
  {countdownType === "Months" && (
    <>
      {renderFlipCard(timeLeft.months, appLabels.months || "Months")}
      {renderFlipCard(timeLeft.days, appLabels.days || "Days")}
      {renderFlipCard(timeLeft.hours, appLabels.hours || "Hours")}
      {renderFlipCard(timeLeft.minutes, "Minutes")}
      {renderFlipCard(timeLeft.seconds, "Seconds")}
    </>
  )}

  {countdownType === "Days" && (
    <>
      {renderFlipCard(timeLeft.days, appLabels.days || "Days")}
      {renderFlipCard(timeLeft.hours, appLabels.hours || "Hours")}
      {renderFlipCard(timeLeft.minutes, "Minutes")}
      {renderFlipCard(timeLeft.seconds, "Seconds")}
    </>
  )}

  {countdownType === "Hours" && (
    <>
      {renderFlipCard(timeLeft.hours, appLabels.hours || "Hours")}
      {renderFlipCard(timeLeft.minutes, "Minutes")}
      {renderFlipCard(timeLeft.seconds, "Seconds")}
    </>
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
    backgroundColor: "#f0f0f0",
    borderBottom: "1px solid #ddd"
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
    backgroundColor: "transparent"
  },
  mainContent: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    minHeight: "calc(100vh - 35px)"
  },
  headerText: {
    fontWeight: "600",
    color: "#333",
    marginBottom: "40px",
    maxWidth: "80%",
    wordWrap: "break-word"
  },
  countdownContainer: {
    display: "flex",
    gap: "20px",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center"
  },
  flipCardContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: "10px"
  },
  flipCardLabel: {
    fontSize: "16px",
    fontWeight: "500",
    color: "#666",
    marginBottom: "10px",
    textTransform: "capitalize"
  },
  flipCardGroup: {
    display: "flex",
    gap: "4px"
  },
  flipCard: {
    width: "60px",
    height: "80px",
    backgroundColor: "#2c3e50",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
    border: "2px solid #34495e"
  },
  flipCardDigit: {
    color: "#fff",
    fontSize: "36px",
    fontWeight: "bold",
    fontFamily: "'Courier New', monospace"
  }
};

export default EventCountDownPopUp;