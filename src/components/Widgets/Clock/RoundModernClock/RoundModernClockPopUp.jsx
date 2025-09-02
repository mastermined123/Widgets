import React, { useState, useEffect } from "react";

function RoundModernClockPopUp({ 
    onClose, 
    appName, 
    tags, 
    clockFormat,
    timeFormat,
    textFont,
    fontColor,
    backgroundColor,
    backgroundImage,
    hideDate,
    hideDigitalClock
}) {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const formatTime = (date) => {
        let hours = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();
        let period = "";

        if (timeFormat === "AM/PM") {
            period = hours >= 12 ? "PM" : "AM";
            hours = hours % 12;
            hours = hours ? hours : 12; // 0 should be 12
        }

        const formattedMinutes = minutes.toString().padStart(2, '0');
        const formattedHours = hours.toString().padStart(2, '0');
        const formattedSeconds = seconds.toString().padStart(2, '0');

        // Format based on clock format
        if (clockFormat === "Hours and Minutes") {
            return timeFormat === "AM/PM" 
                ? `${formattedHours}:${formattedMinutes} ${period}`
                : `${formattedHours}:${formattedMinutes}`;
        } else if (clockFormat === "Minutes and Seconds") {
            return `${formattedMinutes}:${formattedSeconds}`;
        } else { // Hours, Minutes and Seconds
            return timeFormat === "AM/PM" 
                ? `${formattedHours}:${formattedMinutes}:${formattedSeconds} ${period}`
                : `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
        }
    };

    const formatDate = (date) => {
        const options = { 
            month: 'long', 
            day: 'numeric' 
        };
        return date.toLocaleDateString('en-US', options).toUpperCase();
    };

    // Calculate angles for analog clock hands
    const hours = time.getHours() % 12;
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();

    const hourAngle = (hours * 30) + (minutes * 0.5);
    const minuteAngle = minutes * 6;
    const secondAngle = seconds * 6;

    const containerStyle = {
        ...styles.container,
        backgroundColor: backgroundColor || "#ffffff",
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
    };

    const clockTextStyle = {
        ...styles.clockText,
        color: fontColor || "#333333",
        fontFamily: textFont || "Arial, sans-serif",
    };

    const dateTextStyle = {
        ...styles.dateText,
        color: fontColor || "#333333",
        fontFamily: textFont || "Arial, sans-serif",
    };

    return (
        <div style={styles.overlay} onClick={onClose}>
            <div style={styles.popup} onClick={(e) => e.stopPropagation()}>
                {/* Close Button */}
                <button onClick={onClose} style={styles.closeButton}>×</button>

                {/* Clock Container */}
                <div style={containerStyle}>
                    <div style={styles.clockContent}>
                        {/* Analog Clock */}
                        <div style={styles.analogClockContainer}>
                            <svg width="400" height="400" viewBox="0 0 400 400" style={styles.clockSvg}>
                                {/* Outer circle */}
                                <circle
                                    cx="200"
                                    cy="200"
                                    r="190"
                                    fill="rgba(255, 255, 255, 0.9)"
                                    stroke="#ddd"
                                    strokeWidth="2"
                                />
                               
                                {/* Inner circle */}
                                <circle
                                    cx="200"
                                    cy="200"
                                    r="180"
                                    fill="rgba(255, 255, 255, 0.95)"
                                    stroke="none"
                                />
                               
                                {/* Hour marks */}
                                {Array.from({ length: 12 }, (_, i) => {
                                    const angle = i * 30;
                                    const radian = (angle - 90) * (Math.PI / 180);
                                    const x1 = 200 + 160 * Math.cos(radian);
                                    const y1 = 200 + 160 * Math.sin(radian);
                                    const x2 = 200 + 140 * Math.cos(radian);
                                    const y2 = 200 + 140 * Math.sin(radian);
                                   
                                    return (
                                        <line
                                            key={i}
                                            x1={x1}
                                            y1={y1}
                                            x2={x2}
                                            y2={y2}
                                            stroke="#999"
                                            strokeWidth="3"
                                        />
                                    );
                                })}
                               
                                {/* Minute marks */}
                                {Array.from({ length: 60 }, (_, i) => {
                                    if (i % 5 !== 0) { // Skip hour marks
                                        const angle = i * 6;
                                        const radian = (angle - 90) * (Math.PI / 180);
                                        const x1 = 200 + 160 * Math.cos(radian);
                                        const y1 = 200 + 160 * Math.sin(radian);
                                        const x2 = 200 + 150 * Math.cos(radian);
                                        const y2 = 200 + 150 * Math.sin(radian);
                                       
                                        return (
                                            <line
                                                key={i}
                                                x1={x1}
                                                y1={y1}
                                                x2={x2}
                                                y2={y2}
                                                stroke="#ccc"
                                                strokeWidth="1"
                                            />
                                        );
                                    }
                                    return null;
                                })}
                               
                                {/* Hour hand */}
                                <line
                                    x1="200"
                                    y1="200"
                                    x2={200 + 80 * Math.cos((hourAngle - 90) * Math.PI / 180)}
                                    y2={200 + 80 * Math.sin((hourAngle - 90) * Math.PI / 180)}
                                    stroke="#333"
                                    strokeWidth="6"
                                    strokeLinecap="round"
                                />
                               
                                {/* Minute hand */}
                                <line
                                    x1="200"
                                    y1="200"
                                    x2={200 + 120 * Math.cos((minuteAngle - 90) * Math.PI / 180)}
                                    y2={200 + 120 * Math.sin((minuteAngle - 90) * Math.PI / 180)}
                                    stroke="#333"
                                    strokeWidth="4"
                                    strokeLinecap="round"
                                />
                               
                                {/* Second hand */}
                                <line
                                    x1="200"
                                    y1="200"
                                    x2={200 + 130 * Math.cos((secondAngle - 90) * Math.PI / 180)}
                                    y2={200 + 130 * Math.sin((secondAngle - 90) * Math.PI / 180)}
                                    stroke="#ff0000"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                />
                               
                                {/* Center dot */}
                                <circle 
                                    cx="200" 
                                    cy="200" 
                                    r="8" 
                                    fill="#ff0000" 
                                />
                                <circle 
                                    cx="200" 
                                    cy="200" 
                                    r="4" 
                                    fill="#fff" 
                                />
                            </svg>
                           
                            {/* Digital Time Display */}
                            {!hideDigitalClock && (
                                <div style={styles.digitalTimeContainer}>
                                    <div style={clockTextStyle}>
                                        {formatTime(time)}
                                    </div>
                                </div>
                            )}
                           
                            {/* Date Display */}
                            {!hideDate && (
                                <div style={styles.dateContainer}>
                                    <div style={dateTextStyle}>
                                        {formatDate(time)}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const styles = {
    overlay: {
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
    },
    popup: {
        backgroundColor: "transparent",
        borderRadius: "12px",
        width: "1000px",
        maxWidth: "95vw",
        height: "700px",
        maxHeight: "95vh",
        overflow: "hidden",
        boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)",
        position: "relative",
    },
    closeButton: {
        background: "rgba(0, 0, 0, 0.7)",
        border: "none",
        fontSize: "20px",
        cursor: "pointer",
        color: "#fff",
        padding: "8px",
        width: "32px",
        height: "32px",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        top: "20px",
        right: "20px",
        zIndex: 1001,
        fontWeight: "bold",
    },
    container: {
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "12px",
        position: "relative",
    },
    clockContent: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
    },
    analogClockContainer: {
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    clockSvg: {
        filter: "drop-shadow(0 10px 20px rgba(0, 0, 0, 0.2))",
    },
    digitalTimeContainer: {
        position: "absolute",
        top: "45%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        textAlign: "center",
        pointerEvents: "none",
    },
    dateContainer: {
        position: "absolute",
        top: "65%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        textAlign: "center",
        pointerEvents: "none",
        padding: "4px 12px",
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        borderRadius: "4px",
        border: "1px solid #ddd",
    },
    clockText: {
        fontSize: "28px",
        fontWeight: "400",
        textShadow: "0 1px 2px rgba(0, 0, 0, 0.1)",
        letterSpacing: "1px",
    },
    dateText: {
        fontSize: "12px",
        fontWeight: "500",
        letterSpacing: "1px",
        opacity: 0.8,
    },
};

export default RoundModernClockPopUp;