import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";

const AnalogSquareClockPopUp = ({
  onClose,
  appName = "Analog Square Clock",
  tags = [],
  dialType = "Arabic Numerials Dial",
  dialBgColor = "#ffffff",
  handsColor = "#000000",
  dialColor = "#000000",
  bgColor = "#f5f5f5",
}) => {
  const [time, setTime] = useState(new Date());

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Calculate clock hands rotation
  const seconds = time.getSeconds();
  const minutes = time.getMinutes();
  const hours = time.getHours();

  const secondDeg = (seconds / 60) * 360;
  const minuteDeg = (minutes / 60) * 360 + (seconds / 60) * 6;
  const hourDeg = ((hours % 12) / 12) * 360 + (minutes / 60) * 30;

  return (
    <div style={styles.overlay}>
      <div style={{ ...styles.popup, backgroundColor: bgColor }}>
        {/* Close button */}
        <button onClick={onClose} style={styles.closeBtn}>
          <IoMdClose />
        </button>

        {/* Clock */}
        <div style={styles.content}>
          <div style={{ ...styles.clock, backgroundColor: dialBgColor, borderColor: dialColor }}>
            {/* Numbers (optional based on dialType) */}
            {dialType === "Arabic Numerials Dial" &&
              [12, 3, 6, 9].map((num, i) => {
                const positions = [
                  { top: "10px", left: "50%", transform: "translateX(-50%)" }, // 12
                  { top: "50%", right: "10px", transform: "translateY(-50%)" }, // 3
                  { bottom: "10px", left: "50%", transform: "translateX(-50%)" }, // 6
                  { top: "50%", left: "10px", transform: "translateY(-50%)" }, // 9
                ];
                return (
                  <div
                    key={i}
                    style={{
                      ...styles.number,
                      color: handsColor,
                      ...positions[i],
                    }}
                  >
                    {num}
                  </div>
                );
              })}
            {dialType === "Roman Numerials Dial" &&
              ["XII", "III", "VI", "IX"].map((num, i) => {
                const positions = [
                  { top: "10px", left: "50%", transform: "translateX(-50%)" }, // XII
                  { top: "50%", right: "10px", transform: "translateY(-50%)" }, // III
                  { bottom: "10px", left: "50%", transform: "translateX(-50%)" }, // VI
                  { top: "50%", left: "10px", transform: "translateY(-50%)" }, // IX
                ];
                return (
                  <div
                    key={i}
                    style={{
                      ...styles.number,
                      color: handsColor,
                      ...positions[i],
                    }}
                  >
                    {num}
                  </div>
                );
              })}
            {dialType === "Strokes Dial" &&
              [0, 3, 6, 9].map((pos, i) => {
                const positions = [
                  { top: "5px", left: "50%", transform: "translateX(-50%)", width: "3px", height: "15px" }, // 12
                  { top: "50%", right: "5px", transform: "translateY(-50%)", width: "15px", height: "3px" }, // 3
                  { bottom: "5px", left: "50%", transform: "translateX(-50%)", width: "3px", height: "15px" }, // 6
                  { top: "50%", left: "5px", transform: "translateY(-50%)", width: "15px", height: "3px" }, // 9
                ];
                return (
                  <div
                    key={i}
                    style={{
                      ...styles.stroke,
                      backgroundColor: handsColor,
                      position: "absolute",
                      ...positions[i],
                    }}
                  />
                );
              })}

            {/* Hour hand */}
            <div
              style={{
                ...styles.hand,
                height: "60px",
                backgroundColor: handsColor,
                transform: `rotate(${hourDeg}deg)`,
              }}
            />
            {/* Minute hand */}
            <div
              style={{
                ...styles.hand,
                height: "90px",
                backgroundColor: handsColor,
                transform: `rotate(${minuteDeg}deg)`,
              }}
            />
            {/* Second hand */}
            <div
              style={{
                ...styles.hand,
                height: "110px",
                backgroundColor: "red",
                transform: `rotate(${secondDeg}deg)`,
              }}
            />
            {/* Center dot */}
            <div style={styles.centerDot}></div>
          </div>

          {/* Tags (below clock) */}
          {tags?.length > 0 && (
            <div style={{ marginTop: "15px", display: "flex", gap: "6px", flexWrap: "wrap" }}>
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
  },
  clock: {
    position: "relative",
    width: "300px",
    height: "300px",
    borderRadius: "0px",
    border: "12px solid black",
  },
  number: {
    position: "absolute",
    fontSize: "18px",
    fontWeight: "bold",
  },
  stroke: {
    backgroundColor: "#000",
  },
  hand: {
    position: "absolute",
    bottom: "50%",
    left: "50%",
    width: "4px",
    transformOrigin: "bottom center",
    borderRadius: "2px",
  },
  centerDot: {
    position: "absolute",
    top: "50%",
    left: "50%",
    width: "12px",
    height: "12px",
    backgroundColor: "black",
    borderRadius: "50%",
    transform: "translate(-50%, -50%)",
  },
  tag: {
    padding: "3px 8px",
    backgroundColor: "#ddd",
    borderRadius: "12px",
    fontSize: "12px",
  },
};

export default AnalogSquareClockPopUp;