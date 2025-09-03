/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";

const MultiCityClockPopUp = ({
  onClose,
  appName = "Multi City Clock",
  tags = [],
  fontColor = "#000000",
  handsColor = "#000000",
  bgColor = "#f5f5f5",
  firstTimezone,
  firstName,
  secondTimezone,
  secondName,
  thirdTimezone,
  thirdName,
}) => {
  const [times, setTimes] = useState({
    first: new Date(),
    second: new Date(),
    third: new Date(),
  });

  // Update times every second for all three timezones
  useEffect(() => {
    const updateTimes = () => {
      const now = new Date();
      
      setTimes({
        first: firstTimezone ? new Date(now.toLocaleString("en-US", { timeZone: firstTimezone })) : now,
        second: secondTimezone ? new Date(now.toLocaleString("en-US", { timeZone: secondTimezone })) : now,
        third: thirdTimezone ? new Date(now.toLocaleString("en-US", { timeZone: thirdTimezone })) : now,
      });
    };

    updateTimes();
    const timer = setInterval(updateTimes, 1000);
    return () => clearInterval(timer);
  }, [firstTimezone, secondTimezone, thirdTimezone]);

  // Calculate clock hands rotation for a given time
  const getClockRotations = (time) => {
    const seconds = time.getSeconds();
    const minutes = time.getMinutes();
    const hours = time.getHours();

    const secondDeg = (seconds / 60) * 360;
    const minuteDeg = (minutes / 60) * 360 + (seconds / 60) * 6;
    const hourDeg = ((hours % 12) / 12) * 360 + (minutes / 60) * 30;

    return { secondDeg, minuteDeg, hourDeg };
  };

  // Clock component for individual clocks
  const Clock = ({ time, cityName }) => {
    const { secondDeg, minuteDeg, hourDeg } = getClockRotations(time);

    return (
      <div style={styles.clockContainer}>
        {/* City Name */}
        <div style={{ ...styles.cityName, color: fontColor }}>
          {cityName || "City"}
        </div>
        
        {/* Clock */}
        <div style={{ ...styles.clock, borderColor: handsColor }}>
          {/* Numbers */}
          {[12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((num, i) => (
            <div
              key={i}
              style={{
                ...styles.number,
                color: handsColor,
                transform: `rotate(${i * 30}deg) translate(0, -80px) rotate(-${i * 30}deg)`,
              }}
            >
              {num}
            </div>
          ))}

          {/* Clock hands */}
          {/* Hour hand */}
          <div
            style={{
              ...styles.hand,
              height: "40px",
              width: "3px",
              backgroundColor: handsColor,
              transform: `rotate(${hourDeg}deg)`,
            }}
          />
          {/* Minute hand */}
          <div
            style={{
              ...styles.hand,
              height: "55px",
              width: "2px",
              backgroundColor: handsColor,
              transform: `rotate(${minuteDeg}deg)`,
            }}
          />
          {/* Second hand */}
          <div
            style={{
              ...styles.hand,
              height: "60px",
              width: "1px",
              backgroundColor: "#ff0000",
              transform: `rotate(${secondDeg}deg)`,
            }}
          />
          {/* Center dot */}
          <div style={{ ...styles.centerDot, backgroundColor: handsColor }}></div>
        </div>
      </div>
    );
  };

  return (
    <div style={styles.overlay}>
      <div style={{ ...styles.popup, backgroundColor: bgColor }}>
        {/* Close button */}
        <button onClick={onClose} style={styles.closeBtn}>
          <IoMdClose />
        </button>

        {/* Main Content */}
        <div style={styles.content}>
          {/* Three Clocks Side by Side */}
          <div style={styles.clocksRow}>
            <Clock 
              time={times.first} 
              cityName={firstName || (firstTimezone ? "City 1" : "")} 
            />
            <Clock 
              time={times.second} 
              cityName={secondName || (secondTimezone ? "City 2" : "")} 
            />
            <Clock 
              time={times.third} 
              cityName={thirdName || (thirdTimezone ? "City 3" : "")} 
            />
          </div>

          {/* Tags (below clocks) */}
          {/* {tags?.length > 0 && (
            <div style={styles.tagsContainer}>
              {tags.map((tag, i) => (
                <span key={i} style={styles.tag}>{tag}</span>
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
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.6)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2000,
  },
  popup: {
    boxShadow: "0px 4px 20px rgba(0,0,0,0.3)",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "90%",
    padding: "30px",
    position: "relative",
  },
  closeBtn: {
    position: "absolute",
    top: "15px",
    right: "15px",
    border: "none",
    background: "rgba(0,0,0,0.1)",
    fontSize: "18px",
    cursor: "pointer",
    width: "30px",
    height: "30px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
  },
  content: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "30px",
  },
  clocksRow: {
    display: "flex",
    gap: "40px",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  clockContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "15px",
  },
  cityName: {
    fontSize: "24px",
    fontWeight: "600",
    textAlign: "center",
    minHeight: "30px",
    display: "flex",
    alignItems: "center",
  },
  clock: {
    position: "relative",
    width: "200px",
    height: "200px",
    borderRadius: "50%",
    border: "3px solid #000",
    backgroundColor: "#ffffff",
  },
  number: {
    position: "absolute",
    top: "45%",
    left: "45%",
    transformOrigin: "center center",
    fontSize: "16px",
    fontWeight: "bold",
    width: "20px",
    height: "20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  hand: {
    position: "absolute",
    bottom: "50%",
    left: "50%",
    transformOrigin: "bottom center",
    borderRadius: "1px",
  },
  centerDot: {
    position: "absolute",
    top: "50%",
    left: "50%",
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    transform: "translate(-50%, -50%)",
  },
  tagsContainer: {
    display: "flex",
    gap: "8px",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  tag: {
    padding: "4px 10px",
    backgroundColor: "#ddd",
    borderRadius: "12px",
    fontSize: "12px",
    color: "#666",
  },
};

export default MultiCityClockPopUp;