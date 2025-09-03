import React, { useState, useEffect } from "react";

function TimerPopUp({
    onClose,
    appName = "Timer",
    tags = [],
    kind = "Countdown",
    timer = "00:05:30",
    completionMessage = "Done",
    textFont = "",
    fontColor = "#ffffff",
    iconImage = "",
    backgroundColor = "#1a2332",
    backgroundImage = "",
    disableIllustration = false,
    disableAnimations = false
}) {
    const [timeLeft, setTimeLeft] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);
    const [startTime, setStartTime] = useState(0);

    // Parse timer input (hh:mm:ss) to seconds
    useEffect(() => {
        const parseTimer = (timeString) => {
            const parts = timeString.split(':');
            if (parts.length === 3) {
                const hours = parseInt(parts[0]) || 0;
                const minutes = parseInt(parts[1]) || 0;
                const seconds = parseInt(parts[2]) || 0;
                return hours * 3600 + minutes * 60 + seconds;
            }
            return 0;
        };

        const initialTime = parseTimer(timer);
        setTimeLeft(initialTime);
        setStartTime(initialTime);
        setIsCompleted(false);
    }, [timer]);

    // Timer logic
    useEffect(() => {
        let interval = null;
        
        if (isRunning && !isCompleted) {
            interval = setInterval(() => {
                setTimeLeft(prevTime => {
                    if (kind === "Countdown") {
                        if (prevTime <= 1) {
                            setIsCompleted(true);
                            setIsRunning(false);
                            return 0;
                        }
                        return prevTime - 1;
                    } else { // Count up
                        return prevTime + 1;
                    }
                });
            }, 1000);
        }

        return () => {
            if (interval) clearInterval(interval);
        };
    }, [isRunning, isCompleted, kind]);

    const formatTime = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        
        return {
            hours: hours.toString().padStart(2, '0'),
            minutes: minutes.toString().padStart(2, '0'),
            seconds: secs.toString().padStart(2, '0')
        };
    };

    const toggleTimer = () => {
        if (isCompleted) {
            // Reset timer
            setTimeLeft(kind === "Countdown" ? startTime : 0);
            setIsCompleted(false);
        }
        setIsRunning(!isRunning);
    };

    const resetTimer = () => {
        setIsRunning(false);
        setIsCompleted(false);
        setTimeLeft(kind === "Countdown" ? startTime : 0);
    };

    const time = formatTime(timeLeft);

    const containerStyle = {
        ...styles.container,
        backgroundColor: backgroundColor,
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
    };

    const textStyle = {
        ...styles.text,
        color: fontColor,
        fontFamily: textFont || "Arial, sans-serif",
    };

    // Timer icon SVG
    const TimerIcon = () => (
        <svg width="120" height="120" viewBox="0 0 120 120" style={{
            ...styles.timerIcon,
            animation: !disableAnimations ? "pulse 2s infinite" : "none"
        }}>
            <circle
                cx="60"
                cy="60"
                r="50"
                fill="none"
                stroke="#ff8c42"
                strokeWidth="4"
            />
            <circle
                cx="60"
                cy="60"
                r="45"
                fill="none"
                stroke="#ffb366"
                strokeWidth="2"
            />
            {/* Timer top button */}
            <rect
                x="55"
                y="5"
                width="10"
                height="15"
                fill="#ff8c42"
                rx="5"
            />
            {/* Timer hands */}
            <line
                x1="60"
                y1="60"
                x2="60"
                y2="25"
                stroke="#ff8c42"
                strokeWidth="3"
                strokeLinecap="round"
                style={{
                    animation: !disableAnimations && isRunning ? "rotate 1s linear infinite" : "none",
                    transformOrigin: "60px 60px"
                }}
            />
            <line
                x1="60"
                y1="60"
                x2="80"
                y2="60"
                stroke="#ff8c42"
                strokeWidth="2"
                strokeLinecap="round"
                style={{
                    animation: !disableAnimations && isRunning ? "rotate 12s linear infinite" : "none",
                    transformOrigin: "60px 60px"
                }}
            />
            <circle
                cx="60"
                cy="60"
                r="3"
                fill="#ff8c42"
            />
        </svg>
    );

    return (
        <div style={styles.overlay} onClick={onClose}>
            <div style={containerStyle} onClick={(e) => e.stopPropagation()}>
                {/* Close Button */}
                <button onClick={onClose} style={styles.closeButton}>×</button>

                {/* Main Content */}
                <div style={styles.content}>
                    {/* Timer Icon */}
                    {!disableIllustration && !iconImage && (
                        <div style={styles.iconContainer}>
                            <TimerIcon />
                        </div>
                    )}

                    {/* Custom Icon Image */}
                    {iconImage && (
                        <div style={styles.iconContainer}>
                            <img src={iconImage} alt="Timer Icon" style={{
                                ...styles.customIcon,
                                animation: !disableAnimations ? "bounce 2s infinite" : "none"
                            }} />
                        </div>
                    )}

                    {/* Timer Display */}
                    <div style={styles.timerDisplay}>
                        <div style={styles.timeContainer}>
                            <div style={styles.timeUnit}>
                                <div style={{
                                    ...styles.timeNumber, 
                                    ...textStyle,
                                    animation: !disableAnimations && isRunning ? "pulse 1s infinite" : "none"
                                }}>{time.hours}</div>
                                <div style={{...styles.timeLabel, ...textStyle}}>Hours</div>
                            </div>
                            <div style={{
                                ...styles.separator, 
                                color: fontColor,
                                animation: !disableAnimations && isRunning ? "blink 1s infinite" : "none"
                            }}>:</div>
                            <div style={styles.timeUnit}>
                                <div style={{
                                    ...styles.timeNumber, 
                                    ...textStyle,
                                    animation: !disableAnimations && isRunning ? "pulse 1s infinite" : "none"
                                }}>{time.minutes}</div>
                                <div style={{...styles.timeLabel, ...textStyle}}>Minutes</div>
                            </div>
                            <div style={{
                                ...styles.separator, 
                                color: fontColor,
                                animation: !disableAnimations && isRunning ? "blink 1s infinite" : "none"
                            }}>:</div>
                            <div style={styles.timeUnit}>
                                <div style={{
                                    ...styles.timeNumber, 
                                    ...textStyle,
                                    animation: !disableAnimations && isRunning ? "pulse 1s infinite" : "none"
                                }}>{time.seconds}</div>
                                <div style={{...styles.timeLabel, ...textStyle}}>Seconds</div>
                            </div>
                        </div>
                    </div>

                    {/* Completion Message */}
                    {isCompleted && completionMessage && (
                        <div style={{
                            ...styles.completionMessage, 
                            ...textStyle,
                            animation: !disableAnimations ? "fadeInScale 0.5s ease-out" : "none"
                        }}>
                            {completionMessage}
                        </div>
                    )}

                    {/* Control Buttons */}
                    <div style={styles.controls}>
                        <button 
                            onClick={toggleTimer} 
                            style={{
                                ...styles.controlButton,
                                transition: !disableAnimations ? "all 0.3s ease" : "none"
                            }}
                        >
                            {isCompleted ? "Restart" : isRunning ? "Pause" : "Start"}
                        </button>
                        <button 
                            onClick={resetTimer} 
                            style={{
                                ...styles.resetButton,
                                transition: !disableAnimations ? "all 0.3s ease" : "none"
                            }}
                        >
                            Reset
                        </button>
                    </div>
                </div>

                {/* Tags Display */}
                {tags?.length > 0 && (
                    <div style={styles.tagsContainer}>
                        {tags.map((tag, i) => (
                            <span key={i} style={{
                                ...styles.tag,
                                animation: !disableAnimations ? `slideInUp 0.5s ease-out ${i * 0.1}s both` : "none"
                            }}>
                                {tag}
                            </span>
                        ))}
                    </div>
                )}

                {/* CSS Animations */}
                <style jsx>{`
                    @keyframes pulse {
                        0%, 100% { transform: scale(1); opacity: 1; }
                        50% { transform: scale(1.05); opacity: 0.8; }
                    }
                    
                    @keyframes rotate {
                        from { transform: rotate(0deg); }
                        to { transform: rotate(360deg); }
                    }
                    
                    @keyframes bounce {
                        0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
                        40% { transform: translateY(-10px); }
                        60% { transform: translateY(-5px); }
                    }
                    
                    @keyframes blink {
                        0%, 50% { opacity: 1; }
                        25%, 75% { opacity: 0.3; }
                    }
                    
                    @keyframes fadeInScale {
                        0% { 
                            opacity: 0; 
                            transform: scale(0.8); 
                        }
                        100% { 
                            opacity: 1; 
                            transform: scale(1); 
                        }
                    }
                    
                    @keyframes slideInUp {
                        0% {
                            opacity: 0;
                            transform: translateY(20px);
                        }
                        100% {
                            opacity: 1;
                            transform: translateY(0);
                        }
                    }
                `}</style>
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
    container: {
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
    },
    closeButton: {
        position: "absolute",
        top: "20px",
        right: "20px",
        background: "rgba(0, 0, 0, 0.7)",
        border: "none",
        fontSize: "24px",
        cursor: "pointer",
        color: "#fff",
        padding: "10px",
        width: "40px",
        height: "40px",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1001,
        fontWeight: "bold",
    },
    content: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
        gap: "40px",
    },
    iconContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    timerIcon: {
        filter: "drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3))",
    },
    customIcon: {
        width: "120px",
        height: "120px",
        objectFit: "contain",
        filter: "drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3))",
    },
    timerDisplay: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    timeContainer: {
        display: "flex",
        alignItems: "center",
        gap: "20px",
    },
    timeUnit: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "10px",
    },
    timeNumber: {
        fontSize: "clamp(4rem, 8vw, 8rem)",
        fontWeight: "bold",
        lineHeight: 1,
        textShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
        userSelect: "none",
    },
    timeLabel: {
        fontSize: "clamp(1rem, 2vw, 1.5rem)",
        fontWeight: "normal",
        opacity: 0.8,
        textTransform: "uppercase",
        letterSpacing: "2px",
        userSelect: "none",
    },
    separator: {
        fontSize: "clamp(3rem, 6vw, 6rem)",
        fontWeight: "bold",
        opacity: 0.6,
        userSelect: "none",
    },
    text: {
        textShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
    },
    completionMessage: {
        fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
        fontWeight: "bold",
        textAlign: "center",
        padding: "20px",
        backgroundColor: "rgba(255, 140, 66, 0.2)",
        borderRadius: "10px",
        border: "2px solid #ff8c42",
        backdropFilter: "blur(10px)",
    },
    controls: {
        display: "flex",
        gap: "20px",
        alignItems: "center",
    },
    controlButton: {
        padding: "15px 30px",
        fontSize: "18px",
        fontWeight: "bold",
        backgroundColor: "#ff8c42",
        color: "#fff",
        border: "none",
        borderRadius: "50px",
        cursor: "pointer",
        transition: "all 0.3s ease",
        boxShadow: "0 4px 15px rgba(255, 140, 66, 0.3)",
    },
    resetButton: {
        padding: "15px 30px",
        fontSize: "18px",
        fontWeight: "bold",
        backgroundColor: "transparent",
        color: "#fff",
        border: "2px solid #fff",
        borderRadius: "50px",
        cursor: "pointer",
        transition: "all 0.3s ease",
    },
    tagsContainer: {
        position: "absolute",
        bottom: "40px",
        left: "50%",
        transform: "translateX(-50%)",
        display: "flex",
        gap: "12px",
        flexWrap: "wrap",
        justifyContent: "center",
        maxWidth: "80%",
    },
    tag: {
        padding: "8px 16px",
        backgroundColor: "rgba(255, 255, 255, 0.2)",
        borderRadius: "20px",
        fontSize: "14px",
        color: "#fff",
        fontWeight: "500",
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(255, 255, 255, 0.3)",
    },
};

export default TimerPopUp;