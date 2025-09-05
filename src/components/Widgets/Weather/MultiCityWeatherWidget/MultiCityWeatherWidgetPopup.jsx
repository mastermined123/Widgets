/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";

const MultiCityWeatherWidgetPopUp = ({ 
  onClose, 
  fontColor, 
  customBgColor, 
  textFont, 
  temperatureScale, 
  locations = [],
  cityLabels = [],
  image
}) => {
  const [weatherData, setWeatherData] = useState([]);

  // Sample weather data for 3 cities
  useEffect(() => {
    const generateWeatherData = () => {
      const cities = ["Lahore", "Muslim Town", "Karachi"];
      
      const data = [];
      for (let i = 0; i < 3; i++) {
        const baseTemp = temperatureScale === "celsius" ? 
          Math.floor(Math.random() * 15) + 85 : // 85-100°C (hot weather)
          Math.floor(Math.random() * 20) + 185; // 185-205°F
        
        const cityName = locations[i] || cities[i] || `City ${i + 1}`;
        const displayName = cityLabels[i] || cityName;
        
        data.push({
          id: i + 1,
          name: displayName,
          temperature: baseTemp,
          high: baseTemp + (temperatureScale === "celsius" ? 5 : 9),
          low: baseTemp - (temperatureScale === "celsius" ? 13 : 23)
        });
      }
      return data;
    };

    setWeatherData(generateWeatherData());
  }, [temperatureScale, locations, cityLabels]);

  const backgroundStyle = {
    background: customBgColor || '#87CEEB',
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
        {/* Top bar with close button */}
        <div style={styles.topBar}>
          <button onClick={onClose} style={styles.closeBtn}>
            <IoMdClose />
          </button>
        </div>

        {/* Main weather content */}
        <div style={styles.weatherContainer}>
          {/* Green hills background */}
          <div style={styles.hillsBackground}>
            <svg viewBox="0 0 1200 400" style={styles.hillsSvg}>
              {/* Multiple hill layers */}
              <path d="M0,300 C200,250 400,280 600,260 C800,240 1000,270 1200,250 L1200,400 L0,400 Z" fill="#90C695" opacity="0.8"/>
              <path d="M0,320 C150,290 350,310 500,300 C700,285 900,305 1200,290 L1200,400 L0,400 Z" fill="#7DB383" opacity="0.9"/>
              <path d="M0,340 C250,320 450,330 700,325 C900,320 1100,335 1200,330 L1200,400 L0,400 Z" fill="#6BA86F"/>
            </svg>
          </div>

          {/* Cities weather display */}
          <div style={styles.citiesContainer}>
            {weatherData.map((city, index) => (
              <div key={city.id} style={styles.citySection}>
                {/* City Name */}
                <div style={styles.cityName}>
                  {city.name}
                </div>

                {/* Main Temperature */}
                <div style={styles.mainTemp}>
                  {city.temperature}°
                </div>

                {/* Sun Icon */}
                <div style={styles.sunContainer}>
                  <div style={styles.sun}>
                    <div style={styles.sunRays}>
                      {Array.from({length: 16}, (_, i) => (
                        <div 
                          key={i} 
                          style={{
                            ...styles.ray,
                            transform: `rotate(${i * 22.5}deg) translate(35px)`
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* High/Low Temperature */}
                <div style={styles.tempRange}>
                  {city.low}° / {city.high}°
                </div>
              </div>
            ))}
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
    // borderRadius: "15px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    position: "relative",
  },
  topBar: {
    background: "rgba(255, 255, 255, 0.9)",
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
    transition: "background-color 0.2s",
    '&:hover': {
      backgroundColor: "rgba(0,0,0,0.1)"
    }
  },
  weatherContainer: {
    flex: 1,
    position: "relative",
    background: "linear-gradient(180deg, #87CEEB 0%, #98D8E8 70%, #90C695 100%)",
    overflow: "hidden"
  },
  hillsBackground: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "40%",
    zIndex: 1
  },
  hillsSvg: {
    width: "100%",
    height: "100%"
  },
  citiesContainer: {
    position: "relative",
    zIndex: 2,
    display: "flex",
    justifyContent: "space-around",
    alignItems: "flex-start",
    padding: "40px 20px 20px 20px",
    height: "100%"
  },
  citySection: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    maxWidth: "250px"
  },
  cityName: {
    fontSize: "28px",
    fontWeight: "bold",
    marginBottom: "20px",
    textAlign: "center",
    color: "#000",
    textShadow: "1px 1px 2px rgba(255,255,255,0.8)"
  },
  mainTemp: {
    fontSize: "72px",
    fontWeight: "bold",
    marginBottom: "30px",
    color: "#000",
    textShadow: "2px 2px 4px rgba(255,255,255,0.8)",
    lineHeight: "1"
  },
  sunContainer: {
    position: "relative",
    marginBottom: "40px"
  },
  sun: {
    width: "120px",
    height: "120px",
    backgroundColor: "#FFD700",
    borderRadius: "50%",
    position: "relative",
    boxShadow: "0 0 20px rgba(255, 215, 0, 0.6)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  sunRays: {
    position: "absolute",
    width: "100%",
    height: "100%"
  },
  ray: {
    position: "absolute",
    width: "4px",
    height: "25px",
    backgroundColor: "#FFD700",
    borderRadius: "2px",
    top: "50%",
    left: "50%",
    transformOrigin: "2px -35px",
    boxShadow: "0 0 6px rgba(255, 215, 0, 0.8)"
  },
  tempRange: {
    fontSize: "28px",
    fontWeight: "bold",
    color: "#000",
    textShadow: "1px 1px 2px rgba(255,255,255,0.8)",
    position: "relative",
    zIndex: 3
  }
};

export default MultiCityWeatherWidgetPopUp;