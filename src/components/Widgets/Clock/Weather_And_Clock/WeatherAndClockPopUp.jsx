/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";

const WeatherAndClockPopUp = ({
  onClose,
  appName = "Weather and Clock",
  tags = [],
  forecastLocation = "New York, NY",
  usePlayerLocation = false,
  timeFormat = "AM/PM",
  temperatureScale = "Celsius",
  layout = "Clock and Weather",
  textFont = "Arial, sans-serif",
  fontColor = "#000000",
  barColor = "#cccccc",
  backgroundColor = "#ffffff",
  backgroundImage = "",
  language = "English",
  appLabels = {
    now: "Now",
    today: "Today",
    tomorrow: "Tomorrow",
    wind: "Wind",
    humidity: "Humidity",
    pressure: "Pressure",
    visibility: "Visibility"
  }
}) => {
  const [time, setTime] = useState(new Date());

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Format time based on selected format
  const formatTime = (date) => {
    if (timeFormat === "24H") {
      return date.toLocaleTimeString("en-US", { 
        hour12: false, 
        hour: "2-digit", 
        minute: "2-digit" 
      });
    } else {
      return date.toLocaleTimeString("en-US", { 
        hour12: true, 
        hour: "2-digit", 
        minute: "2-digit" 
      });
    }
  };

  // Get temperature symbol
  const getTempSymbol = () => temperatureScale === "Celsius" ? "°C" : "°F";

  // Calculate clock hands rotation
  const seconds = time.getSeconds();
  const minutes = time.getMinutes();
  const hours = time.getHours();

  const secondDeg = (seconds / 60) * 360;
  const minuteDeg = (minutes / 60) * 360 + (seconds / 60) * 6;
  const hourDeg = ((hours % 12) / 12) * 360 + (minutes / 60) * 30;

  // Get day name and date
  const dayName = time.toLocaleDateString("en-US", { weekday: "long" });
  const monthDay = time.toLocaleDateString("en-US", { month: "long", day: "numeric" });

  // Mock weather data
  const weatherData = {
    now: { temp: temperatureScale === "Celsius" ? "22" : "72", condition: "rainy", icon: "🌧️" },
    today: { temp: temperatureScale === "Celsius" ? "25" : "77", condition: "rainy", icon: "🌧️" },
    tomorrow: { temp: temperatureScale === "Celsius" ? "28" : "82", condition: "partly-cloudy", icon: "⛅" },
    hourly: [
      { time: "1 PM", temp: temperatureScale === "Celsius" ? "24" : "75", icon: "🌧️" },
      { time: "3 PM", temp: temperatureScale === "Celsius" ? "26" : "79", icon: "⛅" },
      { time: "5 PM", temp: temperatureScale === "Celsius" ? "23" : "73", icon: "🌧️" }
    ]
  };

  const renderClock = () => (
    <div style={styles.clockContainer}>
      <div style={{ ...styles.clock, borderColor: barColor }}>
        {/* Clock face with strokes */}
{[...Array(60)].map((_, i) => (
  <div
    key={i}
    style={{
      ...styles.stroke,
      backgroundColor: fontColor,
      transform: `rotate(${i * 6}deg)`,
      height: i % 5 === 0 ? "12px" : "6px",
    }}
  />
))}

        {/* Hour hand */}
        <div
          style={{
            ...styles.hand,
            height: "60px",
            backgroundColor: fontColor,
            transform: `rotate(${hourDeg}deg)`,
          }}
        />
        {/* Minute hand */}
        <div
          style={{
            ...styles.hand,
            height: "90px",
            backgroundColor: fontColor,
            transform: `rotate(${minuteDeg}deg)`,
          }}
        />
        {/* Second hand */}
        <div
          style={{
            ...styles.hand,
            height: "110px",
            backgroundColor: "red",
            transform: `rotate(${secondDeg}deg)`,
            width: "2px",
          }}
        />
        {/* Center dot */}
        <div style={{ ...styles.centerDot, backgroundColor: fontColor }}></div>
      </div>
      
      {/* Digital time display */}
      <div style={{ 
        ...styles.digitalTime, 
        fontFamily: textFont,
        color: fontColor,
        backgroundColor: barColor
      }}>
        {formatTime(time)}
      </div>
    </div>
  );

  const renderWeather = () => (
    <div style={styles.weatherContainer}>
      {/* Date and location */}
      <div style={{ ...styles.dateSection, fontFamily: textFont, color: fontColor }}>
        <h2 style={styles.dayName}>{dayName}</h2>
        <p style={styles.date}>{monthDay}</p>
        <div style={{ ...styles.divider, backgroundColor: barColor }}></div>
      </div>

      {/* Weather forecast */}
      <div style={styles.forecastContainer}>
        <div style={{ ...styles.weatherCard, fontFamily: textFont }}>
          <div style={styles.weatherIcon}>{weatherData.now.icon}</div>
          <div style={{ ...styles.temperature, color: fontColor }}>
            {weatherData.now.temp}{getTempSymbol()}
          </div>
          <div style={{ ...styles.timeLabel, color: fontColor }}>
            {appLabels.now || "Now"}
          </div>
        </div>

        <div style={{ ...styles.weatherCard, fontFamily: textFont }}>
          <div style={styles.weatherIcon}>{weatherData.hourly[0].icon}</div>
          <div style={{ ...styles.temperature, color: fontColor }}>
            {weatherData.hourly[0].temp}{getTempSymbol()}
          </div>
          <div style={{ ...styles.timeLabel, color: fontColor }}>
            {weatherData.hourly[0].time}
          </div>
        </div>

        <div style={{ ...styles.weatherCard, fontFamily: textFont }}>
          <div style={styles.weatherIcon}>{weatherData.hourly[1].icon}</div>
          <div style={{ ...styles.temperature, color: fontColor }}>
            {weatherData.hourly[1].temp}{getTempSymbol()}
          </div>
          <div style={{ ...styles.timeLabel, color: fontColor }}>
            {weatherData.hourly[1].time}
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (layout) {
      case "Clock":
        return (
          <div style={styles.centerContent}>
            {renderClock()}
          </div>
        );
      
      case "Weather":
        return (
          <div style={styles.centerContent}>
            {renderWeather()}
          </div>
        );
      
      case "Clock and Weather":
      default:
        return (
          <div style={styles.combinedContent}>
            <div style={styles.leftSection}>
              {renderClock()}
            </div>
            <div style={styles.rightSection}>
              {renderWeather()}
            </div>
          </div>
        );
    }
  };

  const popupStyle = {
    ...styles.popup,
    backgroundColor: backgroundColor,
    backgroundImage: backgroundImage ? `url(${backgroundImage})` : "none",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat"
  };

  return (
    <div style={styles.overlay}>
      <div style={popupStyle}>
        {/* Close button */}
        <button onClick={onClose} style={styles.closeBtn}>
          <IoMdClose />
        </button>

        {/* Main content */}
        <div style={styles.content}>
          {renderContent()}

          {/* Tags (if any)
          {tags?.length > 0 && (
            <div style={styles.tagsContainer}>
              {tags.map((tag, i) => (
                <span key={i} style={{ 
                  ...styles.tag, 
                  fontFamily: textFont,
                  color: fontColor,
                  backgroundColor: barColor
                }}>
                  {tag}
                </span>
              ))}
            </div>
          )} */}
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
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.6)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2000,
  },
  popup: {
    boxShadow: "0px 8px 32px rgba(0,0,0,0.3)",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100%",
    position: "relative",
  },
  closeBtn: {
    position: "absolute",
    top: "15px",
    right: "15px",
    border: "none",
    background: "rgba(0,0,0,0.1)",
    fontSize: "18px",
    cursor: "pointer",
    width: "30px",
    height: "30px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
  },
  content: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    height: "100%",
  },
  centerContent: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  combinedContent: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    gap: "40px",
  },
  leftSection: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  rightSection: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  clockContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "20px",
  },
  clock: {
    position: "relative",
    width: "250px",
    height: "250px",
    borderRadius: "50%",
    border: "8px solid #333",
    backgroundColor: "#fff",
  },
stroke: {
  position: "absolute",
  top: "94%",
  left: "50%",
  width: "2px",
  backgroundColor: "#333",
  transformOrigin: "center -110px", // adjust radius (125px fits 250px clock)
},
  hand: {
    position: "absolute",
    bottom: "50%",
    left: "50%",
    width: "4px",
    transformOrigin: "bottom center",
    borderRadius: "2px",
  },
  centerDot: {
    position: "absolute",
    top: "50%",
    left: "50%",
    width: "12px",
    height: "12px",
    backgroundColor: "#333",
    borderRadius: "50%",
    transform: "translate(-50%, -50%)",
  },
  digitalTime: {
    // position : 'fixed',
    // top : '55%',
    // left:'46%',
    padding: "8px 16px",
    borderRadius: "20px",
    fontSize: "16px",
    fontWeight: "bold",
    border: "1px solid #ddd",
  },
  weatherContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "20px",
    width: "100%",
  },
  dateSection: {
    textAlign: "center",
    marginBottom: "10px",
  },
  dayName: {
    fontSize: "28px",
    fontWeight: "bold",
    margin: "0 0 5px 0",
    fontStyle: "italic",
  },
  date: {
    fontSize: "18px",
    margin: "0 0 15px 0",
  },
  divider: {
    width: "200px",
    height: "3px",
    backgroundColor: "#007acc",
    margin: "0 auto",
  },
  forecastContainer: {
    display: "flex",
    gap: "20px",
    justifyContent: "center",
    alignItems: "center",
  },
  weatherCard: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "8px",
    padding: "15px",
    borderRadius: "10px",
    backgroundColor: "rgba(255,255,255,0.1)",
    backdropFilter: "blur(10px)",
    minWidth: "80px",
  },
  weatherIcon: {
    fontSize: "32px",
    marginBottom: "5px",
  },
  temperature: {
    fontSize: "18px",
    fontWeight: "bold",
  },
  timeLabel: {
    fontSize: "14px",
    opacity: 0.8,
  },
  tagsContainer: {
    display: "flex",
    gap: "8px",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: "20px",
  },
  tag: {
    padding: "4px 12px",
    borderRadius: "15px",
    fontSize: "12px",
    fontWeight: "500",
  },
};

export default WeatherAndClockPopUp;