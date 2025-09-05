import React, { useState, useEffect } from "react";
import { IoMdClose } from "react-icons/io";

function SmallWeatherAppPopUp({ 
    onClose, 
    appName, 
    forecastLocation, 
    locationName, 
    usePlayerLocation, 
    temperatureScale, 
    transitionInterval = 5, 
    textFont, 
    textColor = "#ffffff", 
    backgroundColor = "#000000", 
    backgroundImage, 
    language, 
    labels 
}) {
    const [currentWeatherIndex, setCurrentWeatherIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);

    // Mock weather data for different conditions with transitions
    const weatherData = [
        {
            location: locationName || forecastLocation || "Lahore",
            day: labels?.today || "TODAY",
            current: {
                temp: temperatureScale === "Celsius" ? 31 : 88,
                condition: "Rainy",
                icon: "🌧️",
                high: temperatureScale === "Celsius" ? 33 : 91,
                low: temperatureScale === "Celsius" ? 24 : 75,
                humidity: "65%",
                wind: "8 mph",
                pressure: "1012 mb"
            },
            background: backgroundImage || "linear-gradient(135deg, #4a4a4a 0%, #2c2c2c 100%)"
        },
        {
            location: locationName || forecastLocation || "Lahore", 
            day: labels?.friday || "FRI",
            current: {
                temp: temperatureScale === "Celsius" ? 32 : 90,
                condition: "Sunny",
                icon: "☀️",
                high: temperatureScale === "Celsius" ? 34 : 93,
                low: temperatureScale === "Celsius" ? 25 : 77,
                humidity: "45%",
                wind: "5 mph",
                pressure: "1015 mb"
            },
            background: backgroundImage || "linear-gradient(135deg, #87CEEB 0%, #1E90FF 100%)"
        },
        {
            location: locationName || forecastLocation || "Lahore",
            day: labels?.saturday || "SAT", 
            current: {
                temp: temperatureScale === "Celsius" ? 29 : 84,
                condition: "Partly Cloudy",
                icon: "⛅",
                high: temperatureScale === "Celsius" ? 31 : 88,
                low: temperatureScale === "Celsius" ? 22 : 72,
                humidity: "55%",
                wind: "7 mph",
                pressure: "1010 mb"
            },
            background: backgroundImage || "linear-gradient(135deg, #87CEEB 0%, #98D8E8 100%)"
        }
    ];

    const currentWeather = weatherData[currentWeatherIndex];
    const tempUnit = temperatureScale === "Celsius" ? "°C" : "°F";

    // Handle automatic transitions
    useEffect(() => {
        if (!transitionInterval || transitionInterval <= 0) return;

        const interval = setInterval(() => {
            setIsTransitioning(true);
            setTimeout(() => {
                setCurrentWeatherIndex((prev) => (prev + 1) % weatherData.length);
                setIsTransitioning(false);
            }, 500);
        }, transitionInterval * 1000);

        return () => clearInterval(interval);
    }, [transitionInterval, weatherData.length]);

    const containerStyle = {
        ...styles.container,
        background: backgroundImage 
            ? `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${backgroundImage}) center/cover no-repeat`
            : currentWeather.background,
        color: textColor,
        fontFamily: textFont || "Arial, sans-serif",
        opacity: isTransitioning ? 0.7 : 1,
        transition: 'opacity 0.5s ease-in-out'
    };

    const contentStyle = {
        ...styles.content,
        opacity: isTransitioning ? 0 : 1,
        transform: isTransitioning ? "translateY(10px)" : "translateY(0)",
        transition: 'all 0.5s ease-in-out'
    };

    return (
        <div style={containerStyle}>
            <button onClick={onClose} style={styles.closeButton}>
                <IoMdClose size={24} />
            </button>

            <div style={contentStyle}>
                {/* Location */}
                <div style={styles.location}>{currentWeather.location}</div>

                {/* Day */}
                <div style={styles.day}>{currentWeather.day}</div>

                {/* Weather Icon */}
                <div style={styles.weatherIcon}>
                    {currentWeather.current.icon}
                </div>

                {/* Temperature */}
                <div style={styles.temperature}>
                    {currentWeather.current.temp}{tempUnit}/{currentWeather.current.low}{tempUnit}
                </div>

                {/* Weather Condition */}
                <div style={styles.condition}>
                    {currentWeather.current.condition}
                </div>

                {/* Weather Details */}
                <div style={styles.detailsContainer}>
                    <div style={styles.detailItem}>
                        <span style={styles.detailLabel}>HUMIDITY</span>
                        <span style={styles.detailValue}>{currentWeather.current.humidity}</span>
                    </div>
                    <div style={styles.detailItem}>
                        <span style={styles.detailLabel}>WIND</span>
                        <span style={styles.detailValue}>{currentWeather.current.wind}</span>
                    </div>
                    <div style={styles.detailItem}>
                        <span style={styles.detailLabel}>PRESSURE</span>
                        <span style={styles.detailValue}>{currentWeather.current.pressure}</span>
                    </div>
                </div>

                {/* Transition indicator dots */}
                <div style={styles.transitionIndicator}>
                    {weatherData.map((_, index) => (
                        <div
                            key={index}
                            style={{
                                ...styles.dot,
                                backgroundColor: index === currentWeatherIndex 
                                    ? textColor 
                                    : `rgba(255, 255, 255, ${textColor === '#ffffff' ? '0.4' : '0.2'})`
                            }}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

const styles = {
    container: {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        padding: "20px",
        boxSizing: "border-box"
    },
    closeButton: {
        position: "absolute",
        top: "20px",
        right: "20px",
        background: "rgba(0,0,0,0.6)",
        color: "white",
        border: "none",
        borderRadius: "50%",
        width: "40px",
        height: "40px",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1001
    },
    content: {
        textAlign: "center",
        width: "100%",
        maxWidth: "400px",
        padding: "20px"
    },
    location: {
        fontSize: "24px",
        fontWeight: "bold",
        marginBottom: "5px"
    },
    day: {
        fontSize: "16px",
        marginBottom: "20px",
        opacity: 0.8
    },
    weatherIcon: {
        fontSize: "80px",
        margin: "20px 0"
    },
    temperature: {
        fontSize: "48px",
        fontWeight: "bold",
        marginBottom: "10px"
    },
    condition: {
        fontSize: "20px",
        marginBottom: "30px",
        opacity: 0.9
    },
    detailsContainer: {
        display: "flex",
        justifyContent: "space-around",
        marginBottom: "30px",
        flexWrap: "wrap"
    },
    detailItem: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "0 15px"
    },
    detailLabel: {
        fontSize: "12px",
        opacity: 0.8,
        marginBottom: "5px",
        letterSpacing: "1px"
    },
    detailValue: {
        fontSize: "16px",
        fontWeight: "bold"
    },
    transitionIndicator: {
        display: "flex",
        justifyContent: "center",
        gap: "8px",
        marginTop: "20px"
    },
    dot: {
        width: "10px",
        height: "10px",
        borderRadius: "50%",
        cursor: "pointer"
    }
};

export default SmallWeatherAppPopUp;
