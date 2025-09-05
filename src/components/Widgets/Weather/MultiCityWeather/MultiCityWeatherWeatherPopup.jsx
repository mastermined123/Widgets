/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { WiDaySunny, WiCloudy, WiRain, WiSnow, WiThunderstorm, WiNightClear, WiFog } from "react-icons/wi";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

const MultiCityWeatherPopUp = ({ 
  onClose, 
  fontColor, 
  customBgColor, 
  textFont, 
  temperatureScale, 
  distanceUnit,
  locations = [],
  cityLabels = [],
  disableBackgroundGradient,
  disableAnimation,
  image
}) => {
  const [weatherData, setWeatherData] = useState([]);

  // Sample weather data for 3 cities
  useEffect(() => {
    const generateWeatherData = () => {
      const conditions = ["Clear Day", "Partly Cloudy", "Cloudy", "Rain", "Snow", "Thunderstorm", "Fog"];
      const cities = ["New York", "London", "Tokyo"];
      
      const data = [];
      for (let i = 0; i < 3; i++) {
        const baseTemp = temperatureScale === "celsius" ? 
          Math.floor(Math.random() * 30) + 5 : // 5-35°C
          Math.floor(Math.random() * 60) + 40; // 40-100°F
        
        const cityName = locations[i] || cities[i] || `City ${i + 1}`;
        const displayName = cityLabels[i] || cityName;
        
        data.push({
          id: i + 1,
          name: displayName,
          temperature: baseTemp,
          high: baseTemp + (temperatureScale === "celsius" ? 5 : 9),
          low: baseTemp - (temperatureScale === "celsius" ? 5 : 9),
          condition: conditions[Math.floor(Math.random() * conditions.length)],
          humidity: Math.floor(Math.random() * 40) + 40, // 40-80%
          windSpeed: Math.floor(Math.random() * 20) + 5, // 5-25
          precipitation: Math.floor(Math.random() * 30) // 0-30%
        });
      }
      return data;
    };

    setWeatherData(generateWeatherData());
  }, [temperatureScale, locations, cityLabels]);

  // Get appropriate weather icon based on condition
  const getWeatherIcon = (condition) => {
    const cond = condition.toLowerCase();
    const iconStyle = { fontSize: "48px", color: "#FFD700" };
    
    if (cond.includes("clear") && cond.includes("day")) {
      return <WiDaySunny style={iconStyle} />;
    } else if (cond.includes("clear") && cond.includes("night")) {
      return <WiNightClear style={iconStyle} />;
    } else if (cond.includes("partly") || cond.includes("cloud")) {
      return <WiCloudy style={{...iconStyle, color: "#87CEEB"}} />;
    } else if (cond.includes("rain")) {
      return <WiRain style={{...iconStyle, color: "#4682B4"}} />;
    } else if (cond.includes("snow")) {
      return <WiSnow style={{...iconStyle, color: "#B0E0E6"}} />;
    } else if (cond.includes("storm") || cond.includes("thunder")) {
      return <WiThunderstorm style={{...iconStyle, color: "#483D8B"}} />;
    } else if (cond.includes("fog")) {
      return <WiFog style={{...iconStyle, color: "#D3D3D3"}} />;
    }
    return <WiDaySunny style={iconStyle} />;
  };

  const backgroundStyle = {
    background: disableBackgroundGradient ? 
      customBgColor : 
      `linear-gradient(135deg, ${customBgColor} 0%, #87CEEB 100%)`,
    backgroundImage: image ? `url(${image})` : 'none',
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  };

  return (
    <div style={styles.overlay}>
      <div style={{
        ...styles.popup, 
        ...backgroundStyle,
        fontFamily: textFont,
        color: fontColor,
        animation: disableAnimation ? 'none' : 'fadeIn 0.3s ease-in'
      }}>
        {/* Top bar like browser tab */}
        <div style={styles.topBar}>
          <button onClick={onClose} style={styles.closeBtn}>
            <IoMdClose />
          </button>
        </div>

        {/* Three Cities Weather Display */}
        <div style={styles.citiesContainer}>
          {weatherData.map((city, index) => (
            <div key={city.id} style={styles.cityWeatherCard}>
              {/* City Name */}
              <div style={styles.cityName}>
                {city.name}
              </div>

              {/* Main Weather Circle */}
              <div style={styles.weatherCircle}>
                <div style={styles.weatherIcon}>
                  {getWeatherIcon(city.condition)}
                </div>
                <div style={styles.mainTemp}>
                  {city.temperature}°{temperatureScale === "celsius" ? "C" : "F"}
                </div>
                <div style={styles.condition}>
                  {city.condition}
                </div>
              </div>

              {/* High/Low Temperatures */}
              <div style={styles.tempRange}>
                <div style={styles.tempItem}>
                  <FaArrowUp style={styles.tempArrow} />
                  <span>{city.high}°{temperatureScale === "celsius" ? "C" : "F"}</span>
                </div>
                <div style={styles.tempItem}>
                  <FaArrowDown style={styles.tempArrow} />
                  <span>{city.low}°{temperatureScale === "celsius" ? "C" : "F"}</span>
                </div>
              </div>

              {/* Weather Details */}
              <div style={styles.weatherDetails}>
                <div style={styles.detailItem}>
                  <div style={styles.detailIcon}>🌧️</div>
                  <div style={styles.detailText}>
                    <div style={styles.detailValue}>{city.precipitation}%</div>
                    <div style={styles.detailLabel}>Precip.</div>
                  </div>
                </div>
                <div style={styles.detailItem}>
                  <div style={styles.detailIcon}>💨</div>
                  <div style={styles.detailText}>
                    <div style={styles.detailValue}>
                      {city.windSpeed} {distanceUnit === "metric" ? "km/h" : "mph"}
                    </div>
                    <div style={styles.detailLabel}>Wind</div>
                  </div>
                </div>
                <div style={styles.detailItem}>
                  <div style={styles.detailIcon}>💧</div>
                  <div style={styles.detailText}>
                    <div style={styles.detailValue}>{city.humidity}%</div>
                    <div style={styles.detailLabel}>Humidity</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const styles = {
  '@keyframes fadeIn': {
    from: { opacity: 0, transform: 'scale(0.9)' },
    to: { opacity: 1, transform: 'scale(1)' }
  },
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    background: "rgba(0,0,0,0.6)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2000,
  },
  popup: {
    width: "100%",
    height: "100%",
    boxShadow: "none",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    position: "relative",
  },
  topBar: {
    background: "rgba(241, 241, 241, 0.9)",
    padding: "10px",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    borderBottom: "1px solid rgba(204, 204, 204, 0.5)",
    backdropFilter: "blur(10px)",
  },
  closeBtn: {
    border: "none",
    background: "transparent",
    fontSize: "20px",
    cursor: "pointer",
    color: "#555",
    padding: "5px",
    borderRadius: "50%",
    transition: "background-color 0.2s",
  },
  citiesContainer: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    padding: "20px",
    height: "100%",
    gap: "20px",
  },
  cityWeatherCard: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "1px",
    borderRadius: "15px",
    background: "rgba(255, 255, 255, 0.1)",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    minHeight: "450px",
    justifyContent: "space-between",
  },
  cityName: {
    fontSize: "18px",
    fontWeight: "bold",
    marginBottom: "20px",
    textAlign: "center",
    textTransform: "uppercase",
    letterSpacing: "1px",
  },
  weatherCircle: {
    width: "180px",
    height: "150px",
    borderRadius: "50%",
    border: "2px solid rgba(255, 255, 255, 0.3)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    background: "rgba(255, 255, 255, 0.05)",
    marginBottom: "20px",
    position: "relative",
  },
  weatherIcon: {
    marginBottom: "10px",
  },
  mainTemp: {
    fontSize: "28px",
    fontWeight: "bold",
    marginBottom: "5px",
  },
  condition: {
    fontSize: "12px",
    opacity: 0.8,
    fontStyle: "italic",
    textAlign: "center",
  },
  tempRange: {
    display: "flex",
    gap: "20px",
    marginBottom: "10px",
  },
  tempItem: {
    display: "flex",
    alignItems: "center",
    gap: "5px",
    fontSize: "16px",
    fontWeight: "bold",
  },
  tempArrow: {
    fontSize: "12px",
  },
  weatherDetails: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    gap: "10px",
  },
  detailItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    flex: 1,
  },
  detailIcon: {
    fontSize: "20px",
    marginBottom: "5px",
  },
  detailText: {
    textAlign: "center",
  },
  detailValue: {
    fontSize: "14px",
    fontWeight: "bold",
    marginBottom: "2px",
  },
  detailLabel: {
    fontSize: "10px",
    opacity: 0.7,
    fontStyle: "italic",
  },
};

export default MultiCityWeatherPopUp;