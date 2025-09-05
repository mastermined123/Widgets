/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";

const MultiDayWeatherScrollingPopUp = ({ 
  onClose, 
  fontColor, 
  customBgColor, 
  textFont, 
  temperatureScale, 
  distanceUnit,
  transitionInterval,
  backgroundGradient,
  disableAnimations,
  location,
  labels,
  image
}) => {
  const [weatherData, setWeatherData] = useState(null);

  // Sample weather data
  useEffect(() => {
    const generateWeatherData = () => {
      const days = [
        { name: labels?.today || "Today", short: "Today" },
        { name: labels?.fri || "Fri", short: "Fri" },
        { name: labels?.sat || "Sat", short: "Sat" },
        { name: labels?.sun || "Sun", short: "Sun" },
        { name: labels?.mon || "Mon", short: "Mon" }
      ];

      const conditions = [
        { name: labels?.rainy || "Rainy", icon: "rain" },
        { name: labels?.clear || "Clear", icon: "sun" },
        { name: labels?.cloudy || "Cloudy", icon: "cloud" },
        { name: labels?.partlyCloudy || "Partly cloudy", icon: "cloud" }
      ];

      const forecastDays = days.map((day, index) => {
        const baseTemp = temperatureScale === "celsius" ? 
          Math.floor(Math.random() * 10) + 25 : // 25-35°C
          Math.floor(Math.random() * 18) + 77; // 77-95°F
        
        const condition = conditions[Math.floor(Math.random() * conditions.length)];
        
        return {
          id: index + 1,
          name: day.name,
          short: day.short,
          condition: condition.name,
          icon: condition.icon,
          high: baseTemp + (temperatureScale === "celsius" ? 3 : 5),
          low: baseTemp - (temperatureScale === "celsius" ? 8 : 14),
          isToday: index === 0
        };
      });

      // Today's detailed data
      const todayDetail = {
        temperature: temperatureScale === "celsius" ? 32 : 89,
        condition: labels?.rainy || "Rainy",
        hourlyTemps: [
          { time: "2 AM", temp: temperatureScale === "celsius" ? 32 : 90 },
          { time: "10 AM", temp: temperatureScale === "celsius" ? 27 : 81 },
          { time: "6 PM", temp: temperatureScale === "celsius" ? 25 : 77 },
          { time: "2 AM", temp: temperatureScale === "celsius" ? 33 : 91 }
        ],
        details: {
          precipitation: "42%",
          humidity: "80%", 
          visibility: distanceUnit === "metric" ? "13 km" : "13 mi",
          wind: distanceUnit === "metric" ? "4 km/h" : "4 mph"
        }
      };

      return {
        location: location || "New York",
        today: todayDetail,
        forecast: forecastDays
      };
    };

    setWeatherData(generateWeatherData());
  }, [temperatureScale, distanceUnit, location, labels]);

  if (!weatherData) return null;

  const getWeatherIcon = (iconType) => {
    const iconStyle = { fontSize: "40px", color: "#333" };
    
    switch(iconType) {
      case "sun":
        return (
          <div style={{ ...iconStyle, position: "relative" }}>
            <div style={styles.sunIcon}>
              <div style={styles.sunRays}>
                {Array.from({length: 8}, (_, i) => (
                  <div 
                    key={i} 
                    style={{
                      ...styles.sunRay,
                      marginTop:'14px',
                      transform: `rotate(${i * 45}deg) translate(15px)`
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        );
      case "cloud":
        return <div style={styles.cloudIcon}></div>;
      case "rain":
        return (
          <div style={styles.rainContainer}>
            <div style={styles.rainCloud}></div>
            <div style={styles.rainDrops}>
              <div style={styles.rainDrop}></div>
              <div style={styles.rainDrop}></div>
              <div style={styles.rainDrop}></div>
            </div>
          </div>
        );
      default:
        return <div style={styles.cloudIcon}></div>;
    }
  };

  const backgroundStyle = {
    background: backgroundGradient ? 
      `linear-gradient(135deg, ${customBgColor} 0%, #f0f0f0 100%)` : 
      customBgColor || '#ffffff',
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
        color: fontColor || '#000000'
      }}>
        <div style={styles.topBar}>
          <button onClick={onClose} style={styles.closeBtn}>
            <IoMdClose />
          </button>
        </div>

        <div style={styles.weatherContainer}>
          <div style={styles.mainLayout}>

            <div style={styles.todaySection}>
              <div style={styles.todayHeader}>
                {weatherData.forecast[0].name}
              </div>
              
              <div style={styles.todayMain}>
                <div style={styles.todayIcon}>
                  {getWeatherIcon("rain")}
                </div>
                <div style={styles.todayTemp}>
                  {weatherData.today.temperature}°{temperatureScale === "celsius" ? "C" : "F"}
                </div>
              </div>
              
              <div style={styles.todayCondition}>
                {weatherData.today.condition}
              </div>

              {/* Hourly Temperature Graph */}
              <div style={styles.hourlyGraph}>
                <svg width="100%" height="120" viewBox="0 0 300 120">
                  {/* Temperature line */}
                  <polyline
                    fill="none"
                    stroke="#333"
                    strokeWidth="2"
                    points="50,30 100,60 200,80 250,25"
                  />
                  {/* Temperature points */}
                  {weatherData.today.hourlyTemps.map((hour, index) => {
                    const x = 50 + (index * 67);
                    const y = index === 0 ? 30 : index === 1 ? 60 : index === 2 ? 80 : 25;
                    return (
                      <g key={index}>
                        <circle cx={x} cy={y} r="4" fill="#333" />
                        <text x={x} y={y - 10} textAnchor="middle" fontSize="12" fill="#333">
                          {hour.temp}°
                        </text>
                        <text x={x} y="110" textAnchor="middle" fontSize="11" fill="#666">
                          {hour.time}
                        </text>
                      </g>
                    );
                  })}
                </svg>
              </div>

              {/* Weather Details */}
              <div style={styles.weatherDetails}>
                <div style={styles.detailRow}>
                  <div style={styles.detailItem}>
                    <span style={styles.detailIcon}>💧</span>
                    <span>{labels?.precipitation || "Precipitation"}: {weatherData.today.details.precipitation}</span>
                  </div>
                  <div style={styles.detailItem}>
                    <span style={styles.detailIcon}>💨</span>
                    <span>{labels?.humidity || "Humidity"}: {weatherData.today.details.humidity}</span>
                  </div>
                </div>
                <div style={styles.detailRow}>
                  <div style={styles.detailItem}>
                    <span style={styles.detailIcon}>👁️</span>
                    <span>{labels?.visibility || "Visibility"}: {weatherData.today.details.visibility}</span>
                  </div>
                  <div style={styles.detailItem}>
                    <span style={styles.detailIcon}>🌪️</span>
                    <span>{labels?.wind || "Wind"}: {weatherData.today.details.wind}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - 5 Day Forecast */}
            <div style={styles.forecastSection}>
              {weatherData.forecast.map((day) => (
                <div key={day.id} style={styles.forecastDay}>
                  <div style={styles.dayName}>
                    {day.name}
                  </div>
                  <div style={styles.dayIcon}>
                    {getWeatherIcon(day.icon)}
                  </div>
                  <div style={styles.dayTemp}>
                    {day.high}°{temperatureScale === "celsius" ? "C" : "F"}
                  </div>
                  <div style={styles.dayTempLow}>
                    {day.low}°{temperatureScale === "celsius" ? "C" : "F"}
                  </div>
                </div>
              ))}
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
    width: "100%",
    height: "100%",
    boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    position: "relative",
  },
  topBar: {
    background: "rgba(241, 241, 241, 0.9)",
    padding: "10px 15px",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    borderBottom: "1px solid rgba(0,0,0,0.1)",
  },
  closeBtn: {
    border: "none",
    background: "transparent",
    fontSize: "24px",
    cursor: "pointer",
    color: "#333",
    padding: "5px",
    borderRadius: "50%",
  },
  weatherContainer: {
    flex: 1,
    padding: "30px",
    overflow: "hidden",

  },
  mainLayout: {
    display: "flex",
    height: "100%",
    gap: "40px",
  },
  todaySection: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  todayHeader: {
    fontSize: "32px",
    fontWeight: "bold",
    fontStyle: "italic",
    marginBottom: "10px",
  },
  todayMain: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
    marginBottom: "10px",
  },
  todayIcon: {
    fontSize: "60px",
  },
  todayTemp: {
    fontSize: "72px",
    fontWeight: "bold",
    lineHeight: "1",
  },
  todayCondition: {
    fontSize: "24px",
    fontStyle: "italic",
    marginBottom: "10px",
  },
  hourlyGraph: {
    marginBottom: "10px",
    padding: "10px",
  },
  weatherDetails: {
    display: "flex",
    flexDirection: "row",
    gap: "20px",

  },
  detailRow: {
    display: "flex",
    gap: "30px",
  },
  detailItem: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "16px",
  },
  detailIcon: {
    fontSize: "18px",
  },
  forecastSection: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    paddingTop: "20px",
  },
  forecastDay: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "15px 20px",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: "10px",
    border: "1px solid rgba(0,0,0,0.1)",
  },
  dayName: {
    fontSize: "20px",
    fontWeight: "bold",
    fontStyle: "italic",
    minWidth: "60px",
  },
  dayIcon: {
    fontSize: "32px",
    minWidth: "50px",
    textAlign: "center",
  },
  dayTemp: {
    fontSize: "24px",
    fontWeight: "bold",
    minWidth: "60px",
    textAlign: "right",
  },
  dayTempLow: {
    fontSize: "18px",
    opacity: 0.7,
    minWidth: "60px",
    textAlign: "right",
  },
  // Weather Icons
  sunIcon: {
    width: "30px",
    height: "30px",
    backgroundColor: "#FFD700",
    borderRadius: "50%",
    position: "relative",
    display: "inline-block",
  },
  sunRays: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  sunRay: {
    position: "absolute",
    width: "2px",
    height: "8px",
    backgroundColor: "#FFD700",
    borderRadius: "1px",
    top: "50%",
    left: "50%",
    transformOrigin: "1px -15px",
  },
  cloudIcon: {
    width: "40px",
    height: "25px",
    backgroundColor: "#D3D3D3",
    borderRadius: "25px",
    position: "relative",
    display: "inline-block",
    '::before': {
      content: '""',
      position: "absolute",
      width: "20px",
      height: "20px",
      backgroundColor: "#D3D3D3",
      borderRadius: "50%",
      top: "-10px",
      left: "5px",
    },
    '::after': {
      content: '""',
      position: "absolute",
      width: "15px",
      height: "15px",
      backgroundColor: "#D3D3D3",
      borderRadius: "50%",
      top: "-5px",
      right: "8px",
    }
  },
  rainContainer: {
    position: "relative",
    display: "inline-block",
  },
  rainCloud: {
    width: "35px",
    height: "20px",
    backgroundColor: "#808080",
    borderRadius: "20px",
    position: "relative",
  },
  rainDrops: {
    position: "absolute",
    top: "18px",
    left: "5px",
    display: "flex",
    gap: "3px",
  },
  rainDrop: {
    width: "2px",
    height: "8px",
    backgroundColor: "#4682B4",
    borderRadius: "0 0 2px 2px",
  }
};

export default MultiDayWeatherScrollingPopUp;