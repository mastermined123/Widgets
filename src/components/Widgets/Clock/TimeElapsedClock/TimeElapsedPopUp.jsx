/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";

const TimeElapsedPopUp = ({ 
  onClose, 
  eventDate,
  eventTime,
  countdownType,
  text,
  autoFitText,
  lineHeight,
  pageMargin,
  backgroundColor,
  customBgImage,
  transparentBackground,
  language
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
        // Calculate months (approximate)
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

  // Render countdown based on selected type
  const renderCountdown = () => {
    switch(countdownType) {
      case "Months":
        return (
          <div style={styles.countdownContainer}>
            <div style={styles.countdownRow}>
              <div style={styles.timeUnit}>
                <div style={styles.timeValue}>{formatNumber(timeLeft.months)}</div>
                <div style={styles.timeLabel}>Months</div>
              </div>
              <div style={styles.timeUnit}>
                <div style={styles.timeValue}>{formatNumber(timeLeft.days)}</div>
                <div style={styles.timeLabel}>Days</div>
              </div>
              <div style={styles.timeUnit}>
                <div style={styles.timeValue}>{formatNumber(timeLeft.hours)}</div>
                <div style={styles.timeLabel}>Hours</div>
              </div>
            </div>
            <div style={styles.detailedTime}>
              {formatNumber(timeLeft.months)} : {formatNumber(timeLeft.days)} : {formatNumber(timeLeft.hours)}:{formatNumber(timeLeft.minutes)}:{formatNumber(timeLeft.seconds)}
            </div>
          </div>
        );
      
      case "Days":
        return (
          <div style={styles.countdownContainer}>
            <div style={styles.countdownRow}>
              <div style={styles.timeUnit}>
                <div style={styles.timeValue}>{formatNumber(timeLeft.days)}</div>
                <div style={styles.timeLabel}>Days</div>
              </div>
              <div style={styles.timeUnit}>
                <div style={styles.timeValue}>{formatNumber(timeLeft.hours)}</div>
                <div style={styles.timeLabel}>Hours</div>
              </div>
              <div style={styles.timeUnit}>
                <div style={styles.timeValue}>{formatNumber(timeLeft.minutes)}</div>
                <div style={styles.timeLabel}>Minutes</div>
              </div>
            </div>
            <div style={styles.detailedTime}>
              {formatNumber(timeLeft.days)} : {formatNumber(timeLeft.hours)}:{formatNumber(timeLeft.minutes)}:{formatNumber(timeLeft.seconds)}
            </div>
          </div>
        );
      
      case "Hours":
        return (
          <div style={styles.countdownContainer}>
            <div style={styles.countdownRow}>
              <div style={styles.timeUnit}>
                <div style={styles.timeValue}>{formatNumber(timeLeft.hours)}</div>
                <div style={styles.timeLabel}>Hours</div>
              </div>
              <div style={styles.timeUnit}>
                <div style={styles.timeValue}>{formatNumber(timeLeft.minutes)}</div>
                <div style={styles.timeLabel}>Minutes</div>
              </div>
              <div style={styles.timeUnit}>
                <div style={styles.timeValue}>{formatNumber(timeLeft.seconds)}</div>
                <div style={styles.timeLabel}>Seconds</div>
              </div>
            </div>
            <div style={styles.detailedTime}>
              {formatNumber(timeLeft.hours)}:{formatNumber(timeLeft.minutes)}:{formatNumber(timeLeft.seconds)}
            </div>
          </div>
        );
      
      case "Days only":
        return (
          <div style={styles.countdownContainer}>
            <div style={styles.singleUnit}>
              <div style={styles.singleValue}>{timeLeft.days}</div>
              <div style={styles.singleLabel}>Days</div>
            </div>
          </div>
        );
      
      default:
        return (
          <div style={styles.countdownContainer}>
            <div style={styles.countdownRow}>
              <div style={styles.timeUnit}>
                <div style={styles.timeValue}>{formatNumber(timeLeft.days)}</div>
                <div style={styles.timeLabel}>Days</div>
              </div>
              <div style={styles.timeUnit}>
                <div style={styles.timeValue}>{formatNumber(timeLeft.hours)}</div>
                <div style={styles.timeLabel}>Hours</div>
              </div>
              <div style={styles.timeUnit}>
                <div style={styles.timeValue}>{formatNumber(timeLeft.minutes)}</div>
                <div style={styles.timeLabel}>Minutes</div>
              </div>
            </div>
            <div style={styles.detailedTime}>
              {formatNumber(timeLeft.days)} : {formatNumber(timeLeft.hours)}:{formatNumber(timeLeft.minutes)}:{formatNumber(timeLeft.seconds)}
            </div>
          </div>
        );
    }
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
          fontFamily: 'Arial, sans-serif'
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
          {renderCountdown()}
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
    overflow: "hidden",
    boxShadow: "0px 10px 30px rgba(0,0,0,0.3)",
    display: "flex",
    flexDirection: "column",
  },
  topBar: {
    padding: "10px 15px",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    height: "40px",
    backgroundColor: "#f0f0f0",
    borderBottom: "1px solid #ddd"
  },
  closeBtn: {
    border: "none",
    fontSize: "20px",
    cursor: "pointer",
    padding: "5px",
    borderRadius: "3px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
    color: "#333"
  },
  mainContent: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    padding: "40px 20px"
  },
  headerText: {
    fontWeight: "bold",
    color: "#333",
    marginBottom: "30px",
    maxWidth: "90%",
    wordWrap: "break-word",
    fontSize: "28px"
  },
  countdownContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%"
  },
  countdownRow: {
    display: "flex",
    justifyContent: "center",
    gap: "30px",
    marginBottom: "20px",
    flexWrap: "wrap"
  },
  timeUnit: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    minWidth: "80px"
  },
  timeValue: {
    fontSize: "58px",
    fontWeight: "bold",
    color: "#2c3e50",
  fontFamily: "'Digital-7', 'DS-Digital', 'Orbitron', 'Roboto Mono', 'Courier New', monospace",
    marginBottom: "5px"
  },
  timeLabel: {
    fontSize: "36px",
    color: "#666",
    textTransform: "uppercase",
    fontWeight: "500"
  },
detailedTime: {
  fontFamily: "'Digital-7', 'DS-Digital', 'Orbitron', 'Roboto Mono', 'Courier New', monospace",
  fontSize: "100px",
  fontWeight: "bold",
  color: "#000",          
  letterSpacing: "2px",
  textAlign: "center",
  backgroundColor: "#fff", 
  padding: "10px 20px",
  borderRadius: "8px",
  gap: "8px",
  fontVariantNumeric: "tabular-nums lining-nums",
  fontFeatureSettings: "'tnum' 1, 'lnum' 1",
  lineHeight: 1,
},
  singleUnit: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },
  singleValue: {
    fontSize: "72px",
    fontWeight: "bold",
    color: "#2c3e50",
    fontFamily: "'Courier New', monospace",
    marginBottom: "10px"
  },
  singleLabel: {
    fontSize: "20px",
    color: "#666",
    textTransform: "uppercase",
    fontWeight: "500"
  }
};

export default TimeElapsedPopUp;