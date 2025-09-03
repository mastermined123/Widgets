/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";

function GlowClockPopUp({ 
    onClose, 
    appName, 
    tags, 
    timeOptions,
    timeFormat,
    backgroundCircleColor,
    circleColor,
    fontColor,
    textFont,
    fontSize,
    backgroundColor,
    backgroundImage,
    hideClock,
    hideCircles,
    hideGlowing
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

        // Format based on time options
        if (timeOptions === "HH/MM") {
            return timeFormat === "AM/PM" 
                ? `${formattedHours}:${formattedMinutes} ${period}`
                : `${formattedHours}:${formattedMinutes}`;
        } else if (timeOptions === "MM/SS") {
            return `${formattedMinutes}:${formattedSeconds}`;
        } else { // HH/MM/SS
            return timeFormat === "AM/PM" 
                ? `${formattedHours}:${formattedMinutes}:${formattedSeconds} ${period}`
                : `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
        }
    };

    // Calculate progress for the glowing circle (based on seconds)
    const seconds = time.getSeconds();
    const progress = (seconds / 60) * 100;

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
        fontSize: fontSize ? `${fontSize}%` : "100%",
    };

    const glowEffect = hideGlowing ? {} : {
        filter: `drop-shadow(0 0 20px ${circleColor || "#e83e00"})`,
    };

    return (
        <div style={styles.overlay} onClick={onClose}>
            <div style={styles.popup} onClick={(e) => e.stopPropagation()}>
                {/* Close Button */}
                <button onClick={onClose} style={styles.closeButton}>×</button>

                {/* Clock Container */}
                <div style={containerStyle}>
                    <div style={styles.clockContent}>
                        {!hideClock && (
                            <div style={styles.clockDisplay}>
                                {/* Glowing Circle */}
                                {!hideCircles && (
                                    <div style={styles.circleContainer}>
                                        <svg width="400" height="400" viewBox="0 0 400 400" style={styles.clockSvg}>
                                            {/* Background Circle */}
                                            <circle
                                                cx="200"
                                                cy="200"
                                                r="180"
                                                fill="none"
                                                stroke={backgroundCircleColor || "#e1e2eb"}
                                                strokeWidth="8"
                                            />
                                            
                                            {/* Progress Circle with Glow */}
                                            <circle
                                                cx="200"
                                                cy="200"
                                                r="180"
                                                fill="none"
                                                stroke={circleColor || "#e83e00"}
                                                strokeWidth="8"
                                                strokeLinecap="round"
                                                strokeDasharray={`${2 * Math.PI * 180}`}
                                                strokeDashoffset={`${2 * Math.PI * 180 * (1 - progress / 100)}`}
                                                transform="rotate(-90 200 200)"
                                                style={glowEffect}
                                            />
                                            
                                            {/* Small dot at the end of progress */}
                                            <circle
                                                cx={200 + 180 * Math.cos((progress / 100) * 2 * Math.PI - Math.PI / 2)}
                                                cy={200 + 180 * Math.sin((progress / 100) * 2 * Math.PI - Math.PI / 2)}
                                                r="8"
                                                fill={circleColor || "#e83e00"}
                                                style={glowEffect}
                                            />
                                        </svg>
                                        
                                        {/* Time Display in Center */}
                                        <div style={styles.timeContainer}>
                                            <div style={clockTextStyle}>
                                                {formatTime(time)}
                                            </div>
                                        </div>
                                    </div>
                                )}
                                
                                {/* Time Display when circles are hidden */}
                                {hideCircles && (
                                    <div style={styles.timeOnlyContainer}>
                                        <div style={clockTextStyle}>
                                            {formatTime(time)}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
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
        width: "100%",
        height: "100%",
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
    clockDisplay: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
    },
    circleContainer: {
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    clockSvg: {
        filter: "drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1))",
    },
    timeContainer: {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        textAlign: "center",
        pointerEvents: "none",
    },
    timeOnlyContainer: {
        textAlign: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    clockText: {
        fontSize: "48px",
        fontWeight: "600",
        textShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
        letterSpacing: "2px",
        whiteSpace: "nowrap",
    },
};

export default GlowClockPopUp;