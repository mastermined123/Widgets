import React, { useState, useEffect } from "react";

function ClockBarModernPopUp({ 
    onClose, 
    appName, 
    tags, 
    timeFormat,
    textFont,
    fontColor,
    dialColor,
    backgroundColor,
    backgroundImage,
    disableRoundClock
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
        let period = "";

        if (timeFormat === "AM/PM") {
            period = hours >= 12 ? "PM" : "AM";
            hours = hours % 12;
            hours = hours ? hours : 12; // 0 should be 12
        }

        const formattedMinutes = minutes.toString().padStart(2, '0');
        const formattedHours = hours.toString().padStart(2, '0');

        return timeFormat === "AM/PM" 
            ? `${formattedHours}:${formattedMinutes}${period}`
            : `${formattedHours}:${formattedMinutes}`;
    };

    const formatDate = (date) => {
        const options = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        };
        return date.toLocaleDateString('en-US', options);
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
                        {!disableRoundClock && (
                            <div style={styles.analogClockContainer}>
                                <svg width="300" height="300" viewBox="0 0 300 300" style={styles.clockSvg}>
                                    {/* Outer circle */}
                                    <circle
                                        cx="150"
                                        cy="150"
                                        r="140"
                                        fill="rgba(255, 255, 255, 0.9)"
                                        stroke={dialColor || "#14d5ef"}
                                        strokeWidth="8"
                                    />
                                    
                                    {/* Inner circle */}
                                    <circle
                                        cx="150"
                                        cy="150"
                                        r="130"
                                        fill="rgba(255, 255, 255, 0.95)"
                                        stroke="rgba(0, 0, 0, 0.1)"
                                        strokeWidth="1"
                                    />
                                    
                                    {/* Hour marks */}
                                    {Array.from({ length: 12 }, (_, i) => {
                                        const angle = i * 30;
                                        const radian = (angle - 90) * (Math.PI / 180);
                                        const x1 = 150 + 120 * Math.cos(radian);
                                        const y1 = 150 + 120 * Math.sin(radian);
                                        const x2 = 150 + 105 * Math.cos(radian);
                                        const y2 = 150 + 105 * Math.sin(radian);
                                        
                                        return (
                                            <line
                                                key={i}
                                                x1={x1}
                                                y1={y1}
                                                x2={x2}
                                                y2={y2}
                                                stroke={dialColor || "#14d5ef"}
                                                strokeWidth="4"
                                            />
                                        );
                                    })}
                                    
                                    {/* Minute marks */}
                                    {Array.from({ length: 60 }, (_, i) => {
                                        if (i % 5 !== 0) { // Skip hour marks
                                            const angle = i * 6;
                                            const radian = (angle - 90) * (Math.PI / 180);
                                            const x1 = 150 + 120 * Math.cos(radian);
                                            const y1 = 150 + 120 * Math.sin(radian);
                                            const x2 = 150 + 115 * Math.cos(radian);
                                            const y2 = 150 + 115 * Math.sin(radian);
                                            
                                            return (
                                                <line
                                                    key={i}
                                                    x1={x1}
                                                    y1={y1}
                                                    x2={x2}
                                                    y2={y2}
                                                    stroke={dialColor || "#14d5ef"}
                                                    strokeWidth="1"
                                                />
                                            );
                                        }
                                        return null;
                                    })}
                                    
                                    {/* Hour hand */}
                                    <line
                                        x1="150"
                                        y1="150"
                                        x2={150 + 60 * Math.cos((hourAngle - 90) * Math.PI / 180)}
                                        y2={150 + 60 * Math.sin((hourAngle - 90) * Math.PI / 180)}
                                        stroke={dialColor || "#14d5ef"}
                                        strokeWidth="6"
                                        strokeLinecap="round"
                                    />
                                    
                                    {/* Minute hand */}
                                    <line
                                        x1="150"
                                        y1="150"
                                        x2={150 + 85 * Math.cos((minuteAngle - 90) * Math.PI / 180)}
                                        y2={150 + 85 * Math.sin((minuteAngle - 90) * Math.PI / 180)}
                                        stroke={dialColor || "#14d5ef"}
                                        strokeWidth="4"
                                        strokeLinecap="round"
                                    />
                                    
                                    {/* Second hand */}
                                    <line
                                        x1="150"
                                        y1="150"
                                        x2={150 + 95 * Math.cos((secondAngle - 90) * Math.PI / 180)}
                                        y2={150 + 95 * Math.sin((secondAngle - 90) * Math.PI / 180)}
                                        stroke="#ff4444"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                    />
                                    
                                    {/* Center dot */}
                                    <circle 
                                        cx="150" 
                                        cy="150" 
                                        r="8" 
                                        fill={dialColor || "#14d5ef"} 
                                    />
                                </svg>
                            </div>
                        )}

                        {/* Digital Time Display */}
                        <div style={styles.digitalTimeContainer}>
                            <div style={{
                                ...styles.digitalTime,
                                color: fontColor || "#202735",
                                fontFamily: textFont || "Arial, sans-serif",
                            }}>
                                {formatTime(time)}
                            </div>
                            <div style={{
                                ...styles.dateDisplay,
                                color: fontColor || "#202735",
                                fontFamily: textFont || "Arial, sans-serif",
                            }}>
                                {formatDate(time)}
                            </div>
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
        flexDirection: "column",
        alignItems: "center",
        gap: "40px",
        padding: "40px",
    },
    analogClockContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    clockSvg: {
        filter: "drop-shadow(0 10px 20px rgba(0, 0, 0, 0.2))",
    },
    digitalTimeContainer: {
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "10px",
    },
    digitalTime: {
        fontSize: "72px",
        fontWeight: "bold",
        textShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
        letterSpacing: "2px",
    },
    dateDisplay: {
        fontSize: "24px",
        fontWeight: "500",
        opacity: 0.8,
        textShadow: "0 1px 2px rgba(0, 0, 0, 0.3)",
    },
};

export default ClockBarModernPopUp;