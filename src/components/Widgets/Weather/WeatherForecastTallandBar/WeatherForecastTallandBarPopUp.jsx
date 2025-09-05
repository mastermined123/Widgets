import React from "react";

function WeatherForecastTallandBarPopUp({ 
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
    labels 
}) {
    // Mock weather data matching the provided image exactly
    const weatherData = {
        forecast: [
            {
                day: "today",
                high: "84",
                low: "74",
                condition: "rainy",
                bgColor: "linear-gradient(135deg, #6b6b6b 0%, #8a8a8a 100%)"
            },
            {
                day: "thu",
                high: "88",
                low: "75", 
                condition: "rainy",
                bgColor: "linear-gradient(135deg, #6b6b6b 0%, #8a8a8a 100%)"
            },
            {
                day: "fri",
                high: "90",
                low: "76",
                condition: "sunny",
                bgColor: "linear-gradient(135deg, #74b9ff 0%, #0984e3 100%)"
            }
        ]
    };

    // Weather icons matching the image style
    const getWeatherIcon = (condition) => {
        if (condition === "sunny") {
            return (
                <svg width="140" height="140" viewBox="0 0 140 140" fill="none">
                    <defs>
                        <radialGradient id="sunGlow" cx="50%" cy="50%" r="50%">
                            <stop offset="0%" stopColor="#FFD700" stopOpacity="1"/>
                            <stop offset="70%" stopColor="#FFA500" stopOpacity="0.8"/>
                            <stop offset="100%" stopColor="#FF8C00" stopOpacity="0.6"/>
                        </radialGradient>
                    </defs>
                    <circle cx="70" cy="70" r="35" fill="url(#sunGlow)" />
                    <g stroke="#FFD700" strokeWidth="4" strokeLinecap="round" opacity="0.9">
                        <line x1="70" y1="15" x2="70" y2="30" />
                        <line x1="70" y1="110" x2="70" y2="125" />
                        <line x1="15" y1="70" x2="30" y2="70" />
                        <line x1="110" y1="70" x2="125" y2="70" />
                        <line x1="31.82" y1="31.82" x2="42.43" y2="42.43" />
                        <line x1="97.57" y1="97.57" x2="108.18" y2="108.18" />
                        <line x1="31.82" y1="108.18" x2="42.43" y2="97.57" />
                        <line x1="97.57" y1="42.43" x2="108.18" y2="31.82" />
                    </g>
                </svg>
            );
        } else {
            return (
                <svg width="140" height="140" viewBox="0 0 140 140" fill="none">
                    <path 
                        d="M100 45C100 35.335 92.165 27.5 82.5 27.5C81.298 27.5 80.122 27.62 78.971 27.854C75.561 18.849 66.894 12.5 56.625 12.5C43.335 12.5 32.5 23.335 32.5 36.625C32.5 37.827 32.62 39.003 32.854 40.154C25.099 43.564 20 51.106 20 59.875C20 71.415 29.585 81 41.125 81H85C90.523 81 95 76.523 95 71C95 65.477 90.523 61 85 61"
                        fill="white" 
                        fillOpacity="0.95"
                    />
                    <g stroke="white" strokeWidth="3" fill="none" opacity="0.85" strokeLinecap="round">
                        <line x1="45" y1="95" x2="40" y2="115" />
                        <line x1="55" y1="90" x2="50" y2="110" />
                        <line x1="65" y1="95" x2="60" y2="115" />
                        <line x1="75" y1="90" x2="70" y2="110" />
                        <line x1="85" y1="95" x2="80" y2="115" />
                        <line x1="50" y1="100" x2="45" y2="120" />
                        <line x1="70" y1="100" x2="65" y2="120" />
                    </g>
                </svg>
            );
        }
    };

    return (
        <div style={styles.overlay} onClick={onClose}>
            <div style={styles.popup} onClick={(e) => e.stopPropagation()}>
                <button onClick={onClose} style={styles.closeButton}>×</button>

                <div style={styles.weatherContainer}>
                    <div style={styles.horizontalForecast}>
                        {weatherData.forecast.map((day, index) => (
                            <div key={index} style={{
                                ...styles.daySection,
                                background: day.bgColor,
                                width: "33.333%",
                                height: "100vh",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: "40px"
                            }}>
                                <div style={styles.dayLabel}>
                                    {day.day}
                                </div>
                                <div style={styles.temperatureRange}>
                                    {day.high}°/{day.low}°
                                </div>
                                <div style={styles.weatherIcon}>
                                    {getWeatherIcon(day.condition)}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {tags && tags.length > 0 && (
                    <div style={styles.tagsContainer}>
                        {tags.map((tag, index) => (
                            <span key={index} style={styles.tag}>
                                {tag}
                            </span>
                        ))}
                    </div>
                )}
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
        backgroundColor: "transparent",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
    },
    popup: {
        backgroundColor: "transparent",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        position: "relative",
        border: "none",
        boxShadow: "none"
    },
    closeButton: {
        background: "rgba(0, 0, 0, 0.8)",
        border: "none",
        fontSize: "28px",
        cursor: "pointer",
        color: "#fff",
        padding: "15px",
        width: "50px",
        height: "50px",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "fixed",
        top: "30px",
        right: "30px",
        zIndex: 10000,
        fontWeight: "bold",
    },
    weatherContainer: {
        height: "100vh",
        width: "100vw",
        color: "white",
        display: "flex",
        overflow: "hidden"
    },
    horizontalForecast: {
        display: "flex",
        width: "100%",
        height: "100%",
    },
    daySection: {
        textAlign: "center",
        flex: 1,
        position: "relative"
    },
    dayLabel: {
        fontSize: "clamp(36px, 5vw, 64px)",
        fontWeight: "300",
        opacity: 0.95,
        letterSpacing: "3px",
        textTransform: "lowercase",
        fontStyle: "italic",
        textShadow: "2px 2px 8px rgba(0,0,0,0.3)",
        fontFamily: "Arial, sans-serif"
    },
    weatherIcon: {
        opacity: 0.9,
        filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.2))"
    },
    temperatureRange: {
        fontSize: "clamp(48px, 8vw, 96px)",
        fontWeight: "200",
        opacity: 0.95,
        letterSpacing: "2px",
        textShadow: "2px 2px 8px rgba(0,0,0,0.3)",
        fontFamily: "Arial, sans-serif"
    },
    tagsContainer: {
        position: "fixed",
        bottom: "40px",
        left: "50%",
        transform: "translateX(-50%)",
        display: "flex",
        gap: "20px",
        background: "rgba(255, 255, 255, 0.15)",
        backdropFilter: "blur(15px)",
        padding: "20px 40px",
        borderRadius: "30px",
        border: "1px solid rgba(255, 255, 255, 0.3)",
        zIndex: 1000
    },
    tag: {
        padding: "10px 20px",
        backgroundColor: "rgba(255, 255, 255, 0.25)",
        borderRadius: "25px",
        fontSize: "16px",
        color: "white",
        fontWeight: "500",
        textShadow: "1px 1px 3px rgba(0,0,0,0.3)"
    },
};

export default WeatherForecastTallandBarPopUp;