import React from "react";
import { IoMdClose } from "react-icons/io";

function ModernWeatherForecastPopUp({ 
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
            <div style={{
                ...styles.popup,
                width: "1000px",
                maxWidth: "95vw",
                maxHeight: "95vh",
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
                    height: "100%",
                    backgroundColor: backgroundColor,
                    color: textColor || "#ffffff",
                    fontFamily: textFont || "Arial, sans-serif",
            
                    backgroundImage: backgroundImage ? `url(${backgroundImage})` : 
                        (backgroundColor && backgroundColor !== "#ffffff" && backgroundColor !== "transparent") ? 
                        "none" : 
                        "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwMCIgaGVpZ2h0PSI0MDAiIHZpZXdCb3g9IjAgMCAxMDAwIDQwMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8ZGVmcz4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0iYmciIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPgogICAgICA8c3RvcCBvZmZzZXQ9IjAlIiBzdHlsZT0ic3RvcC1jb2xvcjojNzRiOWZmO3N0b3Atb3BhY2l0eToxIiAvPgogICAgICA8c3RvcCBvZmZzZXQ9IjEwMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiMwOTg0ZTM7c3RvcC1vcGFjaXR5OjEiIC8+CiAgICA8L2xpbmVhckdyYWRpZW50PgogIDwvZGVmcz4KICA8cmVjdCB3aWR0aD0iMTAwMCIgaGVpZ2h0PSI0MDAiIGZpbGw9InVybCgjYmcpIi8+CiAgPCEtLSBDbG91ZHMgLS0+CiAgPGVsbGlwc2UgY3g9IjE1MCIgY3k9IjEwMCIgcng9IjgwIiByeT0iNDAiIGZpbGw9IndoaXRlIiBmaWxsLW9wYWNpdHk9IjAuMyIvPgogIDxlbGxpcHNlIGN4PSIzNTAiIGN5PSI4MCIgcng9IjEwMCIgcnk9IjUwIiBmaWxsPSJ3aGl0ZSIgZmlsbC1vcGFjaXR5PSIwLjIiLz4KICA8ZWxsaXBzZSBjeD0iNjUwIiBjeT0iMTIwIiByeD0iOTAiIHJ5PSI0NSIgZmlsbD0id2hpdGUiIGZpbGwtb3BhY2l0eT0iMC4yNSIvPgogIDxlbGxpcHNlIGN4PSI4NTAiIGN5PSI5MCIgcng9IjcwIiByeT0iMzUiIGZpbGw9IndoaXRlIiBmaWxsLW9wYWNpdHk9IjAuMyIvPgo8L3N2Zz4K')"
                    // backgroundSize: backgroundImage ? 'cover' : 'cover',
                    // backgroundPosition: backgroundImage ? 'center' : 'center',
                    // backgroundRepeat: 'no-repeat',
                    // display: "flex",
                    // alignItems: "center",
                    // justifyContent: "center"

                }}>
                    
                    {/* Main Weather Display */}
                    <div style={styles.mainWeather}>
                        <div style={styles.locationAndIcon}>
                            <div style={styles.locationName}>
                                {locationName || forecastLocation || "Lahore"}
                            </div>
                            
                            <div style={styles.weatherIcon}>
                                <svg width="120" height="120" viewBox="0 0 150 150" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path 
                                        d="M105 35C105 28.373 99.627 23 93 23C92.298 23 91.622 23.07 90.971 23.204C88.561 16.849 82.394 12.5 75.125 12.5C65.335 12.5 57.25 20.585 57.25 30.375C57.25 31.077 57.32 31.753 57.454 32.404C52.099 34.814 48.5 40.106 48.5 46.375C48.5 54.665 55.335 61.5 63.625 61.5H96C99.314 61.5 102 58.814 102 55.5C102 52.186 99.314 49.5 96 49.5H94.75V48.25C94.75 42.981 90.519 38.75 85.25 38.75"
                                        fill="white" 
                                        fillOpacity="0.7"
                                    />
                                </svg>
                            </div>
                            
                            <div style={styles.temperatureSection}>
                                <div style={styles.nowLabel}>
                                    {labels?.now || "NOW"}
                                </div>
                                <div style={styles.mainTemperature}>
                                    {weatherData.current.temperature}°
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Forecast Row */}
                    <div style={styles.forecastRow}>
                        <div style={styles.forecastItem}>
                            <div style={styles.forecastDay}>{labels?.now || "NOW"}</div>
                            <div style={styles.forecastIcon}>🌧️</div>
                            <div style={styles.forecastTemp}>{weatherData.forecast[0].high}°/{weatherData.forecast[0].low}°</div>
                        </div>
                        
                        <div style={styles.forecastItem}>
                            <div style={styles.forecastDay}>{labels?.monday || "MON"}</div>
                            <div style={styles.forecastIcon}>🌧️</div>
                            <div style={styles.forecastTemp}>{weatherData.forecast[1].high}°/{weatherData.forecast[1].low}°</div>
                        </div>
                        
                        <div style={styles.forecastItem}>
                            <div style={styles.forecastDay}>{labels?.tuesday || "TUE"}</div>
                            <div style={styles.forecastIcon}>🌧️</div>
                            <div style={styles.forecastTemp}>{weatherData.forecast[2].high}°/{weatherData.forecast[2].low}°</div>
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
    mainWeather: {
        textAlign: "center",
        marginBottom: "40px",
    },
    locationAndIcon: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "20px",
    },
    locationName: {
        fontSize: "32px",
        fontWeight: "300",
        marginBottom: "20px",
        opacity: 0.9,
    },
    weatherIcon: {
        opacity: 0.9,
    },
    temperatureSection: {
        textAlign: "left",
    },
    nowLabel: {
        fontSize: "24px",
        fontWeight: "300",
        opacity: 0.8,
        marginBottom: "5px",
    },
    mainTemperature: {
        fontSize: "96px",
        fontWeight: "100",
        lineHeight: "1",
    },
    forecastRow: {
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        backdropFilter: "blur(10px)",
        borderRadius: "15px",
        padding: "20px 10px",
        marginTop: "20px",
    },
    forecastItem: {
        textAlign: "center",
        flex: 1,
    },
    forecastDay: {
        fontSize: "20px",
        marginBottom: "10px",
    },
    forecastIcon: {
        marginBottom: "10px",
        opacity: 0.8,
    },
    forecastTemp: {
        fontSize: "20px",
        marginTop: "8px",
    },
};

export default ModernWeatherForecastPopUp;