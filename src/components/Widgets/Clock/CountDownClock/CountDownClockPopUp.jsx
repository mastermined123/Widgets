/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";

function CountDownClockPopUp({ 
    onClose, 
    appName, 
    tags, 
    type,
    eventDateTime,
    completionMessage,
    title,
    subtitle,
    textFont,
    mainColor,
    secondaryColor,
    backgroundColor,
    backgroundImage,
    disableIllustration,
    disableAnimations
}) {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });
    const [isCompleted, setIsCompleted] = useState(false);

    useEffect(() => {
        if (!eventDateTime) {
            // Default to a future date for preview
            const futureDate = new Date();
            futureDate.setHours(futureDate.getHours() + 8);
            futureDate.setMinutes(futureDate.getMinutes() + 17);
            futureDate.setSeconds(futureDate.getSeconds() + 15);
            
            const calculateDefaultTime = () => {
                const now = new Date();
                const difference = futureDate - now;
                
                const days = Math.floor(difference / (1000 * 60 * 60 * 24));
                const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((difference % (1000 * 60)) / 1000);

                return { days, hours, minutes, seconds };
            };

            const timer = setInterval(() => {
                setTimeLeft(calculateDefaultTime());
            }, 1000);

            setTimeLeft(calculateDefaultTime());
            return () => clearInterval(timer);
        }

        const calculateTimeLeft = () => {
            const targetDate = new Date(eventDateTime);
            const now = new Date();
            const difference = type === "Countdown" ? targetDate - now : now - targetDate;

            if (difference <= 0 && type === "Countdown") {
                setIsCompleted(true);
                return { days: 0, hours: 0, minutes: 0, seconds: 0 };
            }

            const days = Math.floor(Math.abs(difference) / (1000 * 60 * 60 * 24));
            const hours = Math.floor((Math.abs(difference) % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((Math.abs(difference) % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((Math.abs(difference) % (1000 * 60)) / 1000);

            return { days, hours, minutes, seconds };
        };

        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        setTimeLeft(calculateTimeLeft());

        return () => clearInterval(timer);
    }, [eventDateTime, type]);

    const containerStyle = {
        ...styles.container,
        backgroundColor: backgroundColor || "#2c1810",
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
        fontFamily: textFont || "Arial, sans-serif",
        color: mainColor || "#ffffff",
    };

    const renderIllustration = () => {
        if (disableIllustration) return null;
        
        return (
            <div style={styles.illustration}>
                {/* Animated clock illustration */}
                <div style={{
                    ...styles.clockLines,
                    animation: disableAnimations ? "none" : "rotate 20s linear infinite"
                }}>
                    {[...Array(12)].map((_, i) => (
                        <div
                            key={i}
                            style={{
                                ...styles.clockLine,
                                transform: `rotate(${i * 30}deg)`,
                                backgroundColor: mainColor || "#ffffff",
                                opacity: 0.3
                            }}
                        />
                    ))}
                </div>
            </div>
        );
    };

    const renderCountdown = () => {
        if (isCompleted) {
            return (
                <div style={styles.completionContainer}>
                    <div style={{
                        ...styles.completionMessage,
                        color: secondaryColor || "#ff6b35"
                    }}>
                        {completionMessage || "Done!"}
                    </div>
                </div>
            );
        }

        return (
            <div style={styles.countdownContainer}>
                <div style={styles.timeUnits}>
                    <div style={styles.timeUnit}>
                        <div style={{
                            ...styles.timeNumber,
                            animation: disableAnimations ? "none" : "pulse 2s ease-in-out infinite"
                        }}>
                            {String(timeLeft.days).padStart(2, '0')}
                        </div>
                        <div style={{
                            ...styles.timeLabel,
                            color: secondaryColor || "#ff6b35"
                        }}>
                            DAYS
                        </div>
                    </div>
                    
                    <div style={styles.separator}>|</div>
                    
                    <div style={styles.timeUnit}>
                        <div style={{
                            ...styles.timeNumber,
                            animation: disableAnimations ? "none" : "pulse 2s ease-in-out infinite 0.5s"
                        }}>
                            {String(timeLeft.hours).padStart(2, '0')}
                        </div>
                        <div style={{
                            ...styles.timeLabel,
                            color: secondaryColor || "#ff6b35"
                        }}>
                            HOURS
                        </div>
                    </div>
                    
                    <div style={styles.separator}>|</div>
                    
                    <div style={styles.timeUnit}>
                        <div style={{
                            ...styles.timeNumber,
                            animation: disableAnimations ? "none" : "pulse 2s ease-in-out infinite 1s"
                        }}>
                            {String(timeLeft.minutes).padStart(2, '0')}
                        </div>
                        <div style={{
                            ...styles.timeLabel,
                            color: secondaryColor || "#ff6b35"
                        }}>
                            MINUTES
                        </div>
                    </div>
                    
                    <div style={styles.separator}>|</div>
                    
                    <div style={styles.timeUnit}>
                        <div style={{
                            ...styles.timeNumber,
                            animation: disableAnimations ? "none" : "pulse 2s ease-in-out infinite 1.5s"
                        }}>
                            {String(timeLeft.seconds).padStart(2, '0')}
                        </div>
                        <div style={{
                            ...styles.timeLabel,
                            color: secondaryColor || "#ff6b35"
                        }}>
                            SECONDS
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div style={styles.overlay} onClick={onClose}>
            <div style={{
                ...styles.popup,
                width: "100%",
                height: "100%",
            }} onClick={(e) => e.stopPropagation()}>
                {/* Close Button */}
                <button onClick={onClose} style={{
                    ...styles.closeButton,
                    position: "absolute",
                    top: "20px",
                    right: "20px",
                    zIndex: 1001,
                }}>×</button>

                {/* Countdown Container */}
                <div style={containerStyle}>
                    {renderIllustration()}
                    
                    <div style={styles.content}>
                        {subtitle && (
                            <div style={{
                                ...styles.subtitle,
                                color: secondaryColor || "#ff6b35"
                            }}>
                                {subtitle}
                            </div>
                        )}
                        
                        {title && (
                            <div style={styles.title}>
                                {title}
                            </div>
                        )}
                        
                        {renderCountdown()}
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
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        borderRadius: "12px",
        overflow: "hidden",
    },
    illustration: {
        position: "absolute",
        top: "50%",
        right: "10%",
        transform: "translateY(-50%)",
        width: "300px",
        height: "300px",
    },
    clockLines: {
        position: "relative",
        width: "100%",
        height: "100%",
    },
    clockLine: {
        position: "absolute",
        width: "2px",
        height: "80px",
        top: "10px",
        left: "50%",
        transformOrigin: "1px 140px",
        marginLeft: "-1px",
    },
    content: {
        textAlign: "left",
        zIndex: 2,
        maxWidth: "600px",
        width: "100%",
        paddingLeft: "60px",
    },
    subtitle: {
        fontSize: "16px",
        fontWeight: "400",
        marginBottom: "10px",
        textTransform: "uppercase",
        letterSpacing: "2px",
    },
    title: {
        fontSize: "48px",
        fontWeight: "300",
        marginBottom: "60px",
        lineHeight: "1.2",
    },
    countdownContainer: {
        width: "100%",
    },
    timeUnits: {
        display: "flex",
        alignItems: "center",
        gap: "40px",
    },
    timeUnit: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    timeNumber: {
        fontSize: "72px",
        fontWeight: "300",
        lineHeight: "1",
        marginBottom: "8px",
    },
    timeLabel: {
        fontSize: "14px",
        fontWeight: "400",
        letterSpacing: "1px",
    },
    separator: {
        fontSize: "48px",
        fontWeight: "300",
        opacity: 0.5,
        margin: "0 10px",
    },
    completionContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "200px",
    },
    completionMessage: {
        fontSize: "64px",
        fontWeight: "300",
        textAlign: "center",
    },
};

// Add CSS animations
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = `
    @keyframes pulse {
        0%, 100% { transform: scale(1); opacity: 1; }
        50% { transform: scale(1.05); opacity: 0.8; }
    }
    
    @keyframes rotate {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;
document.head.appendChild(styleSheet);

export default CountDownClockPopUp;