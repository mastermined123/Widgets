/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";

const TimeAppPopUp = ({
  onClose,
  appName = "Time App",
  tags = [],
  highlightSeconds = false,
  textFont = "Arial",
  textColor = "#000000",
  currentTimeColor = "#ffffff",
  textShadow = false,
  backgroundColor = "#2c7a7b",
}) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Get current date info
  const now = currentTime;
  const currentMonth = now.getMonth();
  const currentDate = now.getDate();
  const currentDay = now.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase();
  
  // Format time
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  const ampm = hours >= 12 ? 'PM' : 'AM'; 
  const displayHours = hours % 12 || 12;
  
  // Month names
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  // Generate calendar dates for current week
  const generateCalendarDates = () => {
    const dates = [];
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay()); // Start from Sunday
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      dates.push(date.getDate());
    }
    return dates;
  };

  const calendarDates = generateCalendarDates();
  const dayNames = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  const textShadowStyle = textShadow ? '2px 2px 4px rgba(0,0,0,0.5)' : 'none';
  const fontFamily = textFont || 'Arial';

  return (
    <div style={styles.overlay}>
      <div style={{ ...styles.popup, backgroundColor }}>
        {/* Close button */}
        <button onClick={onClose} style={styles.closeBtn}>
          <IoMdClose />
        </button>

        {/* Main Content */}
        <div style={styles.content}>
          {/* Months Header */}
          <div style={styles.monthsHeader}>
            {months.map((month, index) => (
              <span
                key={month}
                style={{
                  ...styles.monthText,
                  color: index === currentMonth ? currentTimeColor : textColor,
                  opacity: index === currentMonth ? 1 : 0.4,
                  fontFamily,
                  textShadow: textShadowStyle
                }}
              >
                {month}
              </span>
            ))}
          </div>

          {/* Calendar Week */}
          <div style={styles.calendarWeek}>
            {dayNames.map((day, index) => (
              <div key={day} style={styles.dayColumn}>
                <div
                  style={{
                    ...styles.dateNumber,
                    color: calendarDates[index] === currentDate ? currentTimeColor : textColor,
                    opacity: calendarDates[index] === currentDate ? 1 : 0.4,
                    fontFamily,
                    textShadow: textShadowStyle
                  }}
                >
                  {calendarDates[index].toString().padStart(2, '0')}
                </div>
                <div
                  style={{
                    ...styles.dayName,
                    color: day === currentDay ? currentTimeColor : textColor,
                    opacity: day === currentDay ? 1 : 0.4,
                    fontFamily,
                    textShadow: textShadowStyle
                  }}
                >
                  {day}
                </div>
              </div>
            ))}
          </div>

          {/* Large Time Display */}
          <div style={styles.timeContainer}>
            <div style={styles.timeDisplay}>
              <span
                style={{
                  ...styles.timeText,
                  color: currentTimeColor,
                  fontFamily,
                  textShadow: textShadowStyle
                }}
              >
                {displayHours.toString().padStart(2, '0')}
              </span>
              <span
                style={{
                  ...styles.separator,
                  color: currentTimeColor,
                  fontFamily,
                  textShadow: textShadowStyle
                }}
              >
                :
              </span>
              <span
                style={{
                  ...styles.timeText,
                  color: currentTimeColor,
                  fontFamily,
                  textShadow: textShadowStyle
                }}
              >
                {minutes.toString().padStart(2, '0')}
              </span>
              <span
                style={{
                  ...styles.separator,
                  color: currentTimeColor,
                  fontFamily,
                  textShadow: textShadowStyle
                }}
              >
                :
              </span>
              <span
                style={{
                  ...styles.timeText,
                  color: highlightSeconds ? currentTimeColor : textColor,
                  opacity: highlightSeconds ? 1 : 0.6,
                  fontFamily,
                  textShadow: textShadowStyle
                }}
              >
                {seconds.toString().padStart(2, '0')}
              </span>
              <span
                style={{
                  ...styles.ampmText,
                  color: currentTimeColor,
                  fontFamily,
                  textShadow: textShadowStyle
                }}
              >
                {ampm}
              </span>
            </div>
          </div>

          {/* Tags */}
          {/* {tags?.length > 0 && (
            <div style={styles.tagsContainer}>
              {tags.map((tag, i) => (
                <span key={i} style={{
                  ...styles.tag,
                  fontFamily,
                  textShadow: textShadowStyle
                }}>
                  {tag}
                </span>
              ))}
            </div>
          )} */}
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
    display: "flex",
    flexDirection: "column",
    position: "relative",
    overflow: "hidden",
  },
  closeBtn: {
    position: "absolute",
    top: "20px",
    right: "20px",
    border: "none",
    background: "rgba(255,255,255,0.2)",
    color: "#fff",
    fontSize: "24px",
    cursor: "pointer",
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
    backdropFilter: "blur(10px)",
  },
  content: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "40px",
  },
  monthsHeader: {
    display: "flex",
    justifyContent: "center",
    gap: "clamp(20px, 4vw, 60px)",
    marginBottom: "clamp(40px, 6vh, 80px)",
    flexWrap: "wrap",
  },
  monthText: {
    fontSize: "clamp(1.2rem, 3vw, 2.5rem)",
    fontWeight: "300",
    letterSpacing: "2px",
    transition: "all 0.3s ease",
  },
  calendarWeek: {
    display: "flex",
    justifyContent: "center",
    gap: "clamp(30px, 5vw, 80px)",
    marginBottom: "clamp(60px, 8vh, 120px)",
    flexWrap: "wrap",
  },
  dayColumn: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "8px",
  },
  dateNumber: {
    fontSize: "clamp(2rem, 5vw, 4rem)",
    fontWeight: "300",
    lineHeight: "1",
    transition: "all 0.3s ease",
  },
  dayName: {
    fontSize: "clamp(0.8rem, 2vw, 1.2rem)",
    fontWeight: "300",
    letterSpacing: "1px",
    transition: "all 0.3s ease",
  },
  timeContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "clamp(40px, 6vh, 80px)",
  },
  timeDisplay: {
    display: "flex",
    alignItems: "baseline",
    gap: "clamp(8px, 1vw, 16px)",
  },
  timeText: {
    fontSize: "clamp(4rem, 12vw, 12rem)",
    fontWeight: "300",
    lineHeight: "1",
    letterSpacing: "-2px",
  },
  separator: {
    fontSize: "clamp(4rem, 12vw, 12rem)",
    fontWeight: "300",
    lineHeight: "1",
    opacity: 0.8,
  },
  ampmText: {
    fontSize: "clamp(1.5rem, 4vw, 3rem)",
    fontWeight: "300",
    marginLeft: "clamp(8px, 1vw, 16px)",
    alignSelf: "flex-end",
    marginBottom: "clamp(8px, 1vh, 16px)",
  },
  tagsContainer: {
    display: "flex",
    gap: "12px",
    flexWrap: "wrap",
    justifyContent: "center",
    position: "absolute",
    bottom: "40px",
    left: "50%",
    transform: "translateX(-50%)",
  },
  tag: {
    padding: "8px 16px",
    backgroundColor: "rgba(255,255,255,0.1)",
    backdropFilter: "blur(10px)",
    borderRadius: "20px",
    fontSize: "14px",
    color: "rgba(255,255,255,0.8)",
    border: "1px solid rgba(255,255,255,0.2)",
    animation: "slideUp 0.6s ease-out",
  },
};

export default TimeAppPopUp;