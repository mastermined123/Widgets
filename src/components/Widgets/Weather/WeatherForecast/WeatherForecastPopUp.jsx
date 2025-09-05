import React from "react";
import { IoMdClose } from "react-icons/io";

function WeatherForecastPopUp({ onClose }) {
  // Static mock data according to your screenshot
  const weatherData = {
    location: "Lahore",
    current: {
      temp: 87,
      icon: "☀️",
    },
    forecast: [
      { day: "now", high: 89, low: 75, icon: "🌧️" },
      { day: "fri", high: 91, low: 77, icon: "☀️" },
      { day: "sat", high: 90, low: 78, icon: "🌧️" },
    ],
  };

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div
        style={styles.popup}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button onClick={onClose} style={styles.closeButton}>
          <IoMdClose size={22} />
        </button>

        {/* Main Weather Section */}
        <div style={styles.mainSection}>
          <div style={styles.location}>{weatherData.location}</div>
          <div style={styles.nowLabel}>now</div>
          <div style={styles.temperature}>{weatherData.current.temp}°</div>
          <div style={styles.bigIcon}>{weatherData.current.icon}</div>
        </div>

        {/* Forecast Row */}
        <div style={styles.forecastRow}>
          {weatherData.forecast.map((f, index) => (
            <div key={index} style={styles.forecastItem}>
              <div style={styles.forecastDay}>{f.day}</div>
              <div style={styles.forecastTemp}>
                {f.high}°/{f.low}°
              </div>
              <div style={styles.forecastIcon}>{f.icon}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: "fixed",
    inset: 0,
    backgroundColor: "#87CEEB", // sky blue background
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  popup: {
    position: "relative",
    width: "100%",
    height: "100%",
    maxWidth: "100vw",
    maxHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: "40px",
    color: "white",
    fontFamily: "Arial, sans-serif",
  },
  closeButton: {
    position: "absolute",
    top: "20px",
    right: "20px",
    background: "rgba(0,0,0,0.6)",
    color: "white",
    border: "none",
    borderRadius: "50%",
    width: "36px",
    height: "36px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  mainSection: {
    textAlign: "center",
    flex: 1,
  },
  location: {
    fontSize: "28px",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  nowLabel: {
    fontSize: "22px",
    marginBottom: "10px",
    fontWeight: "300",
  },
  temperature: {
    fontSize: "100px",
    fontWeight: "bold",
    lineHeight: "1",
    marginBottom: "10px",
  },
  bigIcon: {
    fontSize: "120px",
  },
  forecastRow: {
    display: "flex",
    justifyContent: "space-evenly",
    width: "100%",
    backgroundColor: "rgba(0,0,0,0.2)",
    padding: "20px 0",
  },
  forecastItem: {
    textAlign: "center",
    color: "white",
    flex: 1,
  },
  forecastDay: {
    fontSize: "20px",
    fontWeight: "500",
    marginBottom: "8px",
  },
  forecastTemp: {
    fontSize: "18px",
    marginBottom: "8px",
  },
  forecastIcon: {
    fontSize: "32px",
  },
};

export default WeatherForecastPopUp;
