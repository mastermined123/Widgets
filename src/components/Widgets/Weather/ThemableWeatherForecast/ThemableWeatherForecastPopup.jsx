import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { WiDaySunny, WiCloudy, WiRain, WiSnow, WiThunderstorm } from "react-icons/wi";

const ThemableWeatherForecastPopUp = ({ 
  onClose, 
  fontColor, 
  customBgColor, 
  textFont, 
  textShadow, 
  temperatureScale, 
  location,
  theme,
  labels 
}) => {
  const [currentWeather, setCurrentWeather] = useState(null);


  console.log("theme",theme);
  // Get background image based on theme
  const getBackgroundImage = () => {
    switch(theme) {
      case "Default":
        return "url('/default.jfif')";
      case "Theme1":
        return "url('/theme1.jfif')";
      case "Theme2":
        return "url('/theme2.jpg')";
      case "Theme3":
        return "url('/theme3.jfif')";
      case "Old Theme":
        return "none";
      default:
        return "url('/default.jfif')";
    }
  };

  // Sample weather data
  useEffect(() => {
    const weatherData = {
      temperature: temperatureScale === "celsius" ? 84 : 84,
      todayHigh: temperatureScale === "celsius" ? 91 : 91,
      todayLow: temperatureScale === "celsius" ? 76 : 76,
      friHigh: temperatureScale === "celsius" ? 91 : 91,
      friLow: temperatureScale === "celsius" ? 79 : 79,
      satHigh: temperatureScale === "celsius" ? 87 : 87,
      satLow: temperatureScale === "celsius" ? 79 : 79,
      condition: "Sunny",
      location: location || "Lahore"
    };
    setCurrentWeather(weatherData);
  }, [temperatureScale, location]);

  if (!currentWeather) return null;

  // Get appropriate weather icon based on condition
  const getSunIcon = () => (
    <div style={styles.sunIcon}>
      <div style={styles.sunCenter}></div>
      <div style={styles.sunRay1}></div>
      <div style={styles.sunRay2}></div>
      <div style={styles.sunRay3}></div>
      <div style={styles.sunRay4}></div>
      <div style={styles.sunRay5}></div>
      <div style={styles.sunRay6}></div>
      <div style={styles.sunRay7}></div>
      <div style={styles.sunRay8}></div>
    </div>
  );

  const getCloudyIcon = () => (
    <div style={styles.cloudyIcon}>
      <div style={styles.cloud}></div>
      <div style={styles.sunBehind}></div>
    </div>
  );

  const getRainIcon = () => (
    <div style={styles.rainIcon}>
      <div style={styles.rainCloud}></div>
      <div style={styles.rainDrop1}></div>
      <div style={styles.rainDrop2}></div>
      <div style={styles.rainDrop3}></div>
    </div>
  );

  return (
    <div style={styles.overlay}>
      <div style={{
        ...styles.popup,
        backgroundImage: getBackgroundImage(),
        backgroundColor : customBgColor,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        fontFamily: textFont,
        color: fontColor || "#FFFFFF",
        textShadow: textShadow ? "2px 2px 4px rgba(0,0,0,0.8)" : "2px 2px 4px rgba(0,0,0,0.5)"
      }}>
        {/* Close button */}
        <button onClick={onClose} style={styles.closeBtn}>
          <IoMdClose />
        </button>

        {/* Main weather layout */}
        <div style={styles.weatherLayout}>
          {/* Top section with location and NOW */}
          <div style={styles.topSection}>
            <div style={styles.locationText}>
              {currentWeather.location.toUpperCase()}
            </div>
            <div style={styles.nowText}>
              {labels?.now?.toUpperCase() || "NOW"}
            </div>
          </div>

          {/* Center section with main weather icon and temperature */}
<div style={styles.centerSection(theme)}>
            <div style={styles.mainWeatherIcon}>
              {getSunIcon()}
            </div>
            <div style={styles.mainTemperature}>
              {currentWeather.temperature}°
            </div>
          </div>

          {/* Bottom section with forecast */}
          <div style={styles.forecastSection}>
            {/* Today */}
            <div style={styles.forecastItem(theme)}>
              <div style={styles.smallWeatherIcon}>
                {getSunIcon()}
              </div>
              <div style={styles.dayLabel}>
                {labels?.today?.toUpperCase() || "TODAY"}
              </div>
              <div style={styles.tempRange}>
                {currentWeather.todayHigh}°/{currentWeather.todayLow}°
              </div>
            </div>

            {/* Friday */}
            <div style={styles.forecastItem(theme)}>
              <div style={styles.smallWeatherIcon}>
                {getCloudyIcon()}
              </div>
              <div style={styles.dayLabel}>
                {labels?.fri?.toUpperCase() || "FRI"}
              </div>
              <div style={styles.tempRange}>
                {currentWeather.friHigh}°/{currentWeather.friLow}°
              </div>
            </div>

            {/* Saturday */}
            <div style={styles.forecastItem(theme)}>
              <div style={styles.smallWeatherIcon}>
                {getRainIcon()}
              </div>
              <div style={styles.dayLabel}>
                {labels?.sat?.toUpperCase() || "SAT"}
              </div>
              <div style={styles.tempRange}>
                {currentWeather.satHigh}°/{currentWeather.satLow}°
              </div>
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
    background: "rgba(0,0,0,0.8)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2000,
  },
  popup: {
    width: "100%",
    height: "100%",
    overflow: "hidden",
    position: "relative",
    display: "flex",
    flexDirection: "column",
  },
  closeBtn: {
    position: "absolute",
    top: "15px",
    right: "15px",
    border: "none",
    background: "rgba(255,255,255,0.3)",
    borderRadius: "50%",
    width: "40px",
    height: "40px",
    fontSize: "20px",
    cursor: "pointer",
    color: "red",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
  },
  weatherLayout: {
    flex: 1,
    padding: "40px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  topSection: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  locationText: {
    fontSize: "24px",
    fontWeight: "300",
    letterSpacing: "2px",
  },
  nowText: {
    fontSize: "24px",
    fontWeight: "300",
    letterSpacing: "2px",
  },
centerSection: (theme) => ({
  padding: "25px 20px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "40px",
  margin: "5px 105px",
    backgroundColor: theme === "Theme1" || theme === "Theme3" ? "#FFF780" : theme === "Theme2" ? "#90EE90" :  theme === "Default" ? "whitesmoke" : "none" ,
    opacity : theme === "Default" ? "0.6" : theme === "Theme1" || theme === "Theme3" ? "0.7" : theme === "Theme2" ? "0.7" : "1"  ,
}),
  mainWeatherIcon: {
    width: "120px",
    height: "120px",
    position: "relative",
  },
  mainTemperature: {
    fontSize: "180px",
    fontWeight: "100",
    lineHeight: "1",
  },
  forecastSection: {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-end",
    gap:"10px",
  },

  forecastItem: (theme) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "8px",
    backgroundColor : theme === "Theme3" ? "#FFF780" : theme === "Theme1" ?  "gray" : theme === "Default" ?  "transparent" : "none",
    opacity : theme === "Theme1" ? "0.7" : theme === "Theme3" ? "0.7" : "1",
    padding:"60px 120px",
    color : theme === "Theme1" ? "#fff" : "#000",

  }),
  smallWeatherIcon: {
    width: "50px",
    height: "50px",
    position: "relative",
  },
  dayLabel: {
    fontSize: "26px",
    fontWeight: "300",
    letterSpacing: "1px",
  },
  tempRange: {
    fontSize: "24px",
    fontWeight: "400",
  },

  // Sun icon styles
  sunIcon: {
    position: "relative",
    width: "100%",
    height: "100%",
  },
  sunCenter: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    backgroundColor: "currentColor",
  },
  sunRay1: {
    position: "absolute",
    top: "10px",
    left: "50%",
    transform: "translateX(-50%)",
    width: "4px",
    height: "20px",
    backgroundColor: "currentColor",
    borderRadius: "2px",
  },
  sunRay2: {
    position: "absolute",
    top: "22px",
    right: "22px",
    width: "4px",
    height: "20px",
    backgroundColor: "currentColor",
    borderRadius: "2px",
    transform: "rotate(45deg)",
  },
  sunRay3: {
    position: "absolute",
    top: "50%",
    right: "10px",
    transform: "translateY(-50%)",
    width: "20px",
    height: "4px",
    backgroundColor: "currentColor",
    borderRadius: "2px",
  },
  sunRay4: {
    position: "absolute",
    bottom: "22px",
    right: "22px",
    width: "4px",
    height: "20px",
    backgroundColor: "currentColor",
    borderRadius: "2px",
    transform: "rotate(-45deg)",
  },
  sunRay5: {
    position: "absolute",
    bottom: "10px",
    left: "50%",
    transform: "translateX(-50%)",
    width: "4px",
    height: "20px",
    backgroundColor: "currentColor",
    borderRadius: "2px",
  },
  sunRay6: {
    position: "absolute",
    bottom: "22px",
    left: "22px",
    width: "4px",
    height: "20px",
    backgroundColor: "currentColor",
    borderRadius: "2px",
    transform: "rotate(45deg)",
  },
  sunRay7: {
    position: "absolute",
    top: "50%",
    left: "10px",
    transform: "translateY(-50%)",
    width: "20px",
    height: "4px",
    backgroundColor: "currentColor",
    borderRadius: "2px",
  },
  sunRay8: {
    position: "absolute",
    top: "22px",
    left: "22px",
    width: "4px",
    height: "20px",
    backgroundColor: "currentColor",
    borderRadius: "2px",
    transform: "rotate(-45deg)",
  },

  // Cloudy icon styles
  cloudyIcon: {
    position: "relative",
    width: "100%",
    height: "100%",
  },
  cloud: {
    position: "absolute",
    top: "40%",
    left: "30%",
    width: "40px",
    height: "20px",
    backgroundColor: "currentColor",
    borderRadius: "20px",
  },
  sunBehind: {
    position: "absolute",
    top: "20%",
    right: "30%",
    width: "25px",
    height: "25px",
    borderRadius: "50%",
    backgroundColor: "currentColor",
    opacity: 0.7,
  },

  // Rain icon styles
  rainIcon: {
    position: "relative",
    width: "100%",
    height: "100%",
  },
  rainCloud: {
    position: "absolute",
    top: "30%",
    left: "25%",
    width: "50px",
    height: "25px",
    backgroundColor: "currentColor",
    borderRadius: "25px",
  },
  rainDrop1: {
    position: "absolute",
    bottom: "20%",
    left: "35%",
    width: "3px",
    height: "8px",
    backgroundColor: "currentColor",
    borderRadius: "50%",
  },
  rainDrop2: {
    position: "absolute",
    bottom: "15%",
    left: "50%",
    width: "3px",
    height: "8px",
    backgroundColor: "currentColor",
    borderRadius: "50%",
  },
  rainDrop3: {
    position: "absolute",
    bottom: "20%",
    right: "35%",
    width: "3px",
    height: "8px",
    backgroundColor: "currentColor",
    borderRadius: "50%",
  },
};

export default ThemableWeatherForecastPopUp;