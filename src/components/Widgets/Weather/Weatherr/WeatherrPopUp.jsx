import React from "react";
import { IoMdClose } from "react-icons/io";

function WeatherrPopUp({ 
    onClose, 
    appName, 
    tags, 
    forecastLocation, 
    locationName, 
    usePlayerLocation, 
    units, 
    textFont, 
    textColor, 
    backgroundColor, 
    backgroundImage,
    language,
    labels,
    disableBackgroundGradient,
    disableAnimation
}) {
    // Mock weather data for preview
    const weatherData = {
        location: locationName || forecastLocation || "Lahore",
        current: {
            temperature: units === "Celsius" ? "28" : "82",
            condition: "Cloudy",
            icon: "☁️"
        },
        forecast: [
            {
                day: labels?.now || "NOW",
                high: units === "Celsius" ? "29" : "84",
                low: units === "Celsius" ? "26" : "79",
                icon: "🌧️"
            },
            {
                day: labels?.monday || "MON",
                high: units === "Celsius" ? "27" : "81",
                low: units === "Celsius" ? "24" : "76",
                icon: "🌧️"
            },
            {
                day: labels?.tuesday || "TUE",
                high: units === "Celsius" ? "28" : "82",
                low: units === "Celsius" ? "24" : "75",
                icon: "🌧️"
            }
        ]
    };

    const unitSymbol = units === "Celsius" ? "°C" : "°F";

    return (
        <div style={styles.overlay} onClick={onClose}>
            {/* Add CSS animations */}
            <style>
                {`
                    @keyframes fadeIn {
                        from { opacity: 0; transform: translateY(20px); }
                        to { opacity: 1; transform: translateY(0); }
                    }
                    @keyframes float {
                        0%, 100% { transform: translateY(0px); }
                        50% { transform: translateY(-10px); }
                    }
                    @keyframes pulse {
                        0%, 100% { transform: scale(1); }
                        50% { transform: scale(1.05); }
                    }
                    @keyframes slideUp {
                        from { opacity: 0; transform: translateY(30px); }
                        to { opacity: 1; transform: translateY(0); }
                    }
                `}
            </style>
            
            <div style={{
                ...styles.popup,
                width: "100vw",
                height: "100vh",
                maxWidth: "none",
                maxHeight: "none",
                overflow: "hidden",
                boxShadow: "none",
                position: "relative",
                margin: 0,
                padding: 0,
            }} onClick={(e) => e.stopPropagation()}>
                {/* Close Button */}
                <button onClick={onClose} style={{
                    ...styles.closeButton,
                    position: "absolute",
                    top: "15px",
                    right: "15px",
                }}>×</button>

                {/* Weather Container */}
                <div style={{
                    ...styles.weatherContainer,
                    height: "100vh",
                    width: "100vw",
                    backgroundColor: disableBackgroundGradient ? backgroundColor : backgroundColor,
                    color: textColor || "#ffffff",
                    fontFamily: textFont || "Arial, sans-serif",
            
                    backgroundImage: backgroundImage ? `url(${backgroundImage})` : 
                        (!disableBackgroundGradient && (!backgroundColor || backgroundColor === "#ffffff" || backgroundColor === "transparent")) ? 
                        "linear-gradient(135deg, #74b9ff 0%, #0984e3 100%)" : 
                        "none",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    transition: disableAnimation ? "none" : "all 0.3s ease",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "60px 40px"

                }}>
                    
                    {/* Location Name */}
                    <div style={{
                        ...styles.locationTitle,
                        animation: disableAnimation ? "none" : "fadeIn 1s ease-in-out"
                    }}>
                        {locationName || forecastLocation || "Lahore"}
                    </div>

                    {/* Main Weather Section */}
                    <div style={{
                        ...styles.mainWeatherSection,
                        animation: disableAnimation ? "none" : "fadeIn 1.2s ease-in-out"
                    }}>
                        {/* Left: Sun Icon */}
                        <div style={{
                            ...styles.sunIconContainer,
                            animation: disableAnimation ? "none" : "float 3s ease-in-out infinite"
                        }}>
                            <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                                {/* Sun Icon */}
                                <circle cx="60" cy="60" r="25" fill="#FFD700" />
                                {/* Sun rays */}
                                <g stroke="#FFD700" strokeWidth="3" strokeLinecap="round">
                                    <line x1="60" y1="15" x2="60" y2="25" />
                                    <line x1="60" y1="95" x2="60" y2="105" />
                                    <line x1="15" y1="60" x2="25" y2="60" />
                                    <line x1="95" y1="60" x2="105" y2="60" />
                                    <line x1="25.86" y1="25.86" x2="32.73" y2="32.73" />
                                    <line x1="87.27" y1="87.27" x2="94.14" y2="94.14" />
                                    <line x1="25.86" y1="94.14" x2="32.73" y2="87.27" />
                                    <line x1="87.27" y1="32.73" x2="94.14" y2="25.86" />
                                </g>
                            </svg>
                        </div>

                        {/* Center: Circular Temperature Display */}
                        <div style={{
                            ...styles.circularTempContainer,
                            animation: disableAnimation ? "none" : "fadeIn 1.4s ease-in-out"
                        }}>
                            <div style={styles.temperatureCircle}>
                                <div style={{
                                    ...styles.mainTemp,
                                    animation: disableAnimation ? "none" : "pulse 2s ease-in-out infinite"
                                }}>
                                    {weatherData.current.temperature}°
                                </div>
                                <div style={styles.weatherCondition}>
                                    {weatherData.current.condition}
                                </div>
                                <div style={styles.weatherCondition}>
                                    Day
                                </div>
                            </div>
                        </div>

                        {/* Right: High/Low Temperatures */}
                        <div style={{
                            ...styles.highLowContainer,
                            animation: disableAnimation ? "none" : "fadeIn 1.6s ease-in-out"
                        }}>
                            <div style={styles.tempItem}>
                                <span style={styles.tempValue}>{weatherData.forecast[0].high}°</span>
                                <span style={styles.tempArrow}>↑</span>
                            </div>
                            <div style={styles.tempItem}>
                                <span style={styles.tempValue}>{weatherData.forecast[0].low}°</span>
                                <span style={styles.tempArrow}>↓</span>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Weather Stats */}
                    <div style={{
                        ...styles.weatherStats,
                        animation: disableAnimation ? "none" : "slideUp 0.8s ease-out"
                    }}>
                        <div style={styles.statItem}>
                            <div style={styles.statIcon}>
                                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M20 5C15 5 10 10 15 15C10 20 15 25 20 25C25 25 30 20 25 15C30 10 25 5 20 5Z" fill="white" opacity="0.8"/>
                                    <circle cx="12" cy="30" r="2" fill="white" opacity="0.8"/>
                                    <circle cx="20" cy="32" r="1.5" fill="white" opacity="0.8"/>
                                    <circle cx="28" cy="30" r="2" fill="white" opacity="0.8"/>
                                </svg>
                            </div>
                            <div style={styles.statValue}>0%</div>
                            <div style={styles.statLabel}>Precip.</div>
                        </div>

                        <div style={styles.statItem}>
                            <div style={styles.statIcon}>
                                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5 20L10 15L15 25L20 10L25 20L30 15L35 20" stroke="white" strokeWidth="2" fill="none" opacity="0.8"/>
                                    <polygon points="30,12 35,20 30,18" fill="white" opacity="0.8"/>
                                </svg>
                            </div>
                            <div style={styles.statValue}>2 mph</div>
                            <div style={styles.statLabel}>Wind</div>
                        </div>

                        <div style={styles.statItem}>
                            <div style={styles.statIcon}>
                                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M20 8C15 8 12 12 12 16C12 20 15 24 20 28C25 24 28 20 28 16C28 12 25 8 20 8Z" fill="white" opacity="0.8"/>
                                </svg>
                            </div>
                            <div style={styles.statValue}>67%</div>
                            <div style={styles.statLabel}>Humidity</div>
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
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
        margin: 0,
        padding: 0,
    },
    popup: {
        backgroundColor: "transparent",
        borderRadius: "0",
        width: "100vw",
        height: "100vh",
        maxWidth: "none",
        maxHeight: "none",
        overflow: "hidden",
        boxShadow: "none",
        position: "relative",
        margin: 0,
        padding: 0,
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
        top: "15px",
        right: "15px",
        zIndex: 1000,
        fontWeight: "bold",
    },
    weatherContainer: {
        padding: "40px 30px",
        borderRadius: "0 0 12px 12px",
        position: "relative",
        minHeight: "300px",
        backgroundSize: "cover",
        backgroundPosition: "center",
        //color: "white",
    },
    locationTitle: {
        fontSize: "32px",
        fontWeight: "300",
        marginBottom: "20px",
        opacity: 0.9,
    },
    mainWeatherSection: {
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        width: "100%",
    },
    sunIconContainer: {
        opacity: 0.9,
    },
    circularTempContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    temperatureCircle: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "200px",
        height: "200px",
        borderRadius: "50%",
        backgroundColor: "rgba(255, 255, 255, 0.2)",
        backdropFilter: "blur(10px)",
    },
    mainTemp: {
        fontSize: "64px",
        fontWeight: "100",
        lineHeight: "1",
    },
    weatherCondition: {
        fontSize: "20px",
        opacity: 0.8,
    },
    highLowContainer: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
    tempItem: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: "10px",
    },
    tempValue: {
        fontSize: "24px",
        marginRight: "5px",
    },
    tempArrow: {
        fontSize: "18px",
    },
    weatherStats: {
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        width: "100%",
        marginTop: "40px",
    },
    statItem: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
    statIcon: {
        marginBottom: "10px",
    },
    statValue: {
        fontSize: "24px",
        marginBottom: "5px",
    },
    statLabel: {
        fontSize: "18px",
        opacity: 0.8,
    },
};

styles.fadeIn = {
    animationName: "fadeIn",
    animationDuration: "1s",
    animationTimingFunction: "ease-in-out",
}

styles.float = {
    animationName: "float",
    animationDuration: "3s",
    animationTimingFunction: "ease-in-out",
    animationIterationCount: "infinite",
}

styles.pulse = {
    animationName: "pulse",
    animationDuration: "2s",
    animationTimingFunction: "ease-in-out",
    animationIterationCount: "infinite",
}

styles.slideUp = {
    animationName: "slideUp",
    animationDuration: "0.8s",
    animationTimingFunction: "ease-out",
}

export default WeatherrPopUp;