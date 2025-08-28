import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { WiDaySunny, WiCloudy, WiRain, WiSnow, WiThunderstorm } from "react-icons/wi";

const SimpleWeatherPopUp = ({ 
  onClose, 
  fontColor, 
  customBgColor, 
  textFont, 
  textShadow, 
  temperatureScale, 
  location 
}) => {
  const [currentWeather, setCurrentWeather] = useState(null);

  // Sample weather data
  useEffect(() => {
    // Simulate weather data based on location
    const weatherData = {
      temperature: temperatureScale === "celsius" ? 24 : 75, // 24°C or 75°F
      low: temperatureScale === "celsius" ? 18 : 64, // 18°C or 64°F
      high: temperatureScale === "celsius" ? 29 : 84, // 29°C or 84°F
      condition: "Partly Cloudy",
      humidity: 65,
      windSpeed: 12,
      location: location || "New York"
    };
    setCurrentWeather(weatherData);
  }, [temperatureScale, location]);

  if (!currentWeather) return null;

  // Get appropriate weather icon based on condition
  const getWeatherIcon = () => {
    const condition = currentWeather.condition.toLowerCase();
    if (condition.includes("sun") || condition.includes("clear")) {
      return <WiDaySunny style={styles.weatherIcon} />;
    } else if (condition.includes("cloud")) {
      return <WiCloudy style={styles.weatherIcon} />;
    } else if (condition.includes("rain")) {
      return <WiRain style={styles.weatherIcon} />;
    } else if (condition.includes("snow")) {
      return <WiSnow style={styles.weatherIcon} />;
    } else if (condition.includes("storm") || condition.includes("thunder")) {
      return <WiThunderstorm style={styles.weatherIcon} />;
    }
    return <WiDaySunny style={styles.weatherIcon} />;
  };

  return (
    <div style={styles.overlay}>
      <div style={{
        ...styles.popup, 
        backgroundColor: customBgColor, 
        fontFamily: textFont,
        color: fontColor,
        textShadow: textShadow ? "2px 2px 4px rgba(0,0,0,0.5)" : "none"
      }}>
        {/* Top bar like browser tab */}
        <div style={styles.topBar}>
          <button onClick={onClose} style={styles.closeBtn}>
            <IoMdClose />
          </button>
        </div>

        {/* Weather display */}
        <div style={styles.weatherContainer}>
<div style={{ ...styles.location, textTransform: "uppercase" }}>
  {currentWeather.location}
</div>
          
          <div style={styles.weatherMain}>
            {getWeatherIcon()}
            <div style={styles.temperature}>
              {currentWeather.temperature}°{temperatureScale === "celsius" ? "C" : "F"}
            </div>
          </div>

          <div style={styles.condition}>
            {currentWeather.condition}
          </div>

          <div style={styles.weatherDetails}>
            <div style={styles.detailItem}>
              <span style={styles.detailLabel}>High:</span>
              <span style={styles.detailValue}>{currentWeather.high}°</span>
            </div>
            <div style={styles.detailItem}>
              <span style={styles.detailLabel}>Low:</span>
              <span style={styles.detailValue}>{currentWeather.low}°</span>
            </div>
            <div style={styles.detailItem}>
              <span style={styles.detailLabel}>Humidity:</span>
              <span style={styles.detailValue}>{currentWeather.humidity}%</span>
            </div>
            <div style={styles.detailItem}>
              <span style={styles.detailLabel}>Wind:</span>
              <span style={styles.detailValue}>{currentWeather.windSpeed} km/h</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

const styles = {
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
    width: "100%",       // full width
    height: "100%",      // full height
    borderRadius: "0px", // remove rounded corners
    boxShadow: "none",   // optional: remove shadow for full cover
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    position: "relative",
  },
    topBar: {
    background: "#f1f1f1",
    padding: "10px",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    borderBottom: "1px solid #ccc",
  },
  closeBtn: {
    border: "none",
    background: "transparent",
    fontSize: "20px",
    cursor: "pointer",
    color: "#555",
  },
  weatherContainer: {
    padding: "30px 20px",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "15px",
  },
  location: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  weatherMain: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "15px",
    margin: "10px 0",
  },
  weatherIcon: {
    fontSize: "64px",
    color: "#555",
  },
  temperature: {
    fontSize: "48px",
    fontWeight: "bold",
  },
  condition: {
    fontSize: "18px",
    marginBottom: "15px",
    opacity: 0.8,
  },
  weatherDetails: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "15px",
    width: "100%",
    maxWidth: "300px",
  },
  detailItem: {
    display: "flex",
    justifyContent: "space-between",
    padding: "8px 12px",
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: "8px",
  },
  detailLabel: {
    fontWeight: "bold",
    opacity: 0.8,
  },
  detailValue: {
    fontWeight: "bold",
  },
  progressWrapper: {
    height: "6px",
    background: "#eee",
    width: "100%",
  },
  progressBar: {
    height: "100%",
    background: "#005481",
    transition: "width 0.1s linear",
  },
};

export default SimpleWeatherPopUp;