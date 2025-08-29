import React from "react";

function MultiDayWeatherPopUp({ 
    onClose, 
    appName, 
    tags, 
    forecastLocation, 
    locationName, 
    usePlayerLocation, 
    forecastSpan, 
    temperatureScale, 
    textFont, 
    textColor, 
    backgroundColor, 
    backgroundImage, 
    language, 
    labels 
}) {
    // Weather conditions with dynamic icons
    const weatherConditions = [
        { condition: "cloudy", icon: "☁️" },
        { condition: "sunny", icon: "☀️" },
        { condition: "rainy", icon: "🌧️" },
        { condition: "partly_cloudy", icon: "⛅" },
        { condition: "stormy", icon: "⛈️" },
        { condition: "snowy", icon: "❄️" }
    ];

    // Get random weather condition
    const getRandomWeather = () => {
        return weatherConditions[Math.floor(Math.random() * weatherConditions.length)];
    };

    // Mock weather data for today
    const todayWeather = {
        location: locationName || forecastLocation || "Current Location",
        current: {
            temp: temperatureScale === "Celsius" ? "26°" : "79°",
            high: temperatureScale === "Celsius" ? "32°" : "90°",
            condition: getRandomWeather()
        }
    };

    // Generate dynamic weather data based on forecast span
    const generateWeatherData = () => {
        // Get current date and generate proper day names
        const today = new Date();
        const dayNames = {
            en: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            es: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
            fr: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
            de: ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'],
            it: ['Domenica', 'Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato'],
            zh: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
        };

        const currentLanguage = language?.toLowerCase() || 'en';
        const languageKey = currentLanguage.includes('chinese') ? 'zh' : 
                           currentLanguage.includes('spanish') ? 'es' :
                           currentLanguage.includes('french') ? 'fr' :
                           currentLanguage.includes('german') ? 'de' :
                           currentLanguage.includes('italian') ? 'it' : 'en';

        const selectedDayNames = dayNames[languageKey] || dayNames.en;

        let numDays = 7; // default
        if (forecastSpan === "Today Only") numDays = 1;
        else if (forecastSpan.includes("Days")) {
            numDays = parseInt(forecastSpan.split(" ")[0]);
        }

        const weatherData = [];
        for (let i = 0; i < numDays; i++) {
            const weather = getRandomWeather();
            const currentDate = new Date(today);
            currentDate.setDate(today.getDate() + i);
            
            let dayLabel;
            if (i === 0) {
                dayLabel = labels?.now || "NOW";
            } else {
                const dayIndex = currentDate.getDay();
                dayLabel = selectedDayNames[dayIndex];
            }

            weatherData.push({
                day: dayLabel,
                temp: temperatureScale === "Celsius" ? 
                    `${Math.floor(Math.random() * 10 + 20)}° / ${Math.floor(Math.random() * 10 + 25)}°` :
                    `${Math.floor(Math.random() * 20 + 70)}° / ${Math.floor(Math.random() * 20 + 80)}°`,
                icon: weather.icon,
                condition: weather.condition
            });
        }
        return weatherData;
    };

    const weeklyWeather = generateWeatherData();

    const previewStyle = {
        ...styles.previewContainer,
        backgroundColor: backgroundColor || "#87CEEB",
        color: textColor || "#ffffff",
        fontFamily: textFont || "Arial, sans-serif",
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
        border: "none",
        padding: "0"
    };

    const renderTodayWeather = () => (
        <div style={styles.todayWeatherContainer}>
            <div style={styles.todayWeatherContent}>
                <div style={styles.todayLeft}>
                    <div style={styles.todayTemp}>
                        {todayWeather.current.temp} / {todayWeather.current.high}
                    </div>
                </div>
                <div style={styles.todayRight}>
                    <div style={styles.todayIcon}>{todayWeather.current.condition.icon}</div>
                    {todayWeather.current.condition.condition === "rainy" && (
                        <div style={styles.rainDrops}>
                            {[...Array(7)].map((_, i) => (
                                <div key={i} style={{
                                    ...styles.rainDrop,
                                    left: `${20 + i * 15}%`,
                                    animationDelay: `${i * 0.2}s`
                                }}>💧</div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <div style={styles.grassContainer}>
                {[...Array(20)].map((_, i) => (
                    <div key={i} style={{
                        ...styles.grass,
                        left: `${i * 5}%`,
                        height: `${Math.random() * 20 + 30}px`
                    }}>🌱</div>
                ))}
            </div>
        </div>
    );

    const renderWeeklyWeather = () => (
        <div style={styles.weeklyWeatherContainer}>
            <div style={styles.weeklyWeatherContent}>
                {weeklyWeather.map((day, index) => (
                    <div key={index} style={styles.dayColumn}>
                        <div style={styles.dayName}>{day.day}</div>
                        <div style={styles.dayTemp}>{day.temp}</div>
                        <div style={styles.dayIcon}>{day.icon}</div>
                        {day.condition === "rainy" && (
                            <div style={styles.dayRainDrops}>
                                {[...Array(3)].map((_, i) => (
                                    <div key={i} style={{
                                        ...styles.smallRainDrop,
                                        left: `${20 + i * 20}%`,
                                        animationDelay: `${i * 0.3}s`
                                    }}>💧</div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
            <div style={styles.grassContainer}>
                {[...Array(20)].map((_, i) => (
                    <div key={i} style={{
                        ...styles.grass,
                        left: `${i * 5}%`,
                        height: `${Math.random() * 20 + 20}px`
                    }}>🌱</div>
                ))}
            </div>
        </div>
    );

    return (
        <div style={styles.overlay} onClick={onClose}>
            <div style={{
                ...styles.popup,
                width: "1000px",
                maxWidth: "95vw",
                height: "600px",
                maxHeight: "95vh",
            }} onClick={(e) => e.stopPropagation()}>
                {/* Close Button */}
                <button onClick={onClose} style={{
                    ...styles.closeButton,
                    position: "absolute",
                    top: "20px",
                    right: "20px",
                    zIndex: 1001,
                }}>×</button>

                {/* Weather Container */}
                <div style={{
                    ...previewStyle,
                    height: "100%",
                    padding: "40px 30px",
                    borderRadius: "12px",
                    position: "relative",
                    minHeight: "300px",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}>
                    {forecastSpan === "Today Only" ? renderTodayWeather() : renderWeeklyWeather()}
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
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
    },
    popup: {
        backgroundColor: "#fff",
        borderRadius: "12px",
        width: "90%",
        maxWidth: "800px",
        maxHeight: "90vh",
        overflow: "hidden",
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
    },
    closeButton: {
        background: "none",
        border: "none",
        fontSize: "24px",
        cursor: "pointer",
        color: "#666",
        padding: "0",
        width: "30px",
        height: "30px",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    previewContainer: {
        height: "400px",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
    },
    todayWeatherContainer: {
        flex: 1,
        position: "relative",
        display: "flex",
        flexDirection: "column",
    },
    todayWeatherContent: {
        flex: 1,
        display: "flex",
        alignItems: "center",
        padding: "40px",
    },
    todayLeft: {
        flex: 1,
    },
    todayTemp: {
        fontSize: "48px",
        fontWeight: "300",
        lineHeight: "1",
    },
    todayRight: {
        flex: 1,
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    todayIcon: {
        fontSize: "120px",
        filter: "drop-shadow(2px 2px 4px rgba(0,0,0,0.3))",
    },
    rainDrops: {
        position: "absolute",
        top: "0",
        left: "0",
        right: "0",
        bottom: "0",
        pointerEvents: "none",
    },
    rainDrop: {
        position: "absolute",
        fontSize: "16px",
        animation: "fall 2s infinite linear",
        opacity: 0.8,
    },
    weeklyWeatherContainer: {
        flex: 1,
        position: "relative",
        display: "flex",
        flexDirection: "column",
    },
    weeklyWeatherContent: {
        flex: 1,
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        padding: "20px",
        gap: "10px",
    },
    dayColumn: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "relative",
        minWidth: "60px",
        flex: 1,
    },
    dayName: {
        fontSize: "14px",
        fontWeight: "300",
        marginBottom: "12px",
        textAlign: "center",
        lineHeight: "1.2",
    },
    dayTemp: {
        fontSize: "14px",
        fontWeight: "300",
        marginBottom: "12px",
        textAlign: "center",
        lineHeight: "1.2",
    },
    dayIcon: {
        fontSize: "40px",
        filter: "drop-shadow(1px 1px 2px rgba(0,0,0,0.3))",
    },
    dayRainDrops: {
        position: "absolute",
        top: "60px",
        left: "0",
        right: "0",
        bottom: "0",
        pointerEvents: "none",
    },
    smallRainDrop: {
        position: "absolute",
        fontSize: "10px",
        animation: "fall 1.5s infinite linear",
        opacity: 0.7,
    },
    grassContainer: {
        position: "absolute",
        bottom: "0",
        left: "0",
        right: "0",
        height: "60px",
        pointerEvents: "none",
    },
    grass: {
        position: "absolute",
        bottom: "0",
        fontSize: "12px",
        opacity: 0.8,
        animation: "sway 3s infinite ease-in-out",
    },
    info: {
        padding: "20px",
        backgroundColor: "#f8f9fa",
        borderTop: "1px solid #eee",
    },
};

// Add CSS animations
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = `
    @keyframes fall {
        0% { transform: translateY(-100px); opacity: 0; }
        10% { opacity: 1; }
        90% { opacity: 1; }
        100% { transform: translateY(400px); opacity: 0; }
    }
    
    @keyframes sway {
        0%, 100% { transform: rotate(-2deg); }
        50% { transform: rotate(2deg); }
    }
`;
document.head.appendChild(styleSheet);

export default MultiDayWeatherPopUp;
