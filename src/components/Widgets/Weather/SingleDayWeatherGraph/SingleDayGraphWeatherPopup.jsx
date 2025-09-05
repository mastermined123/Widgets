/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import Chart from "react-apexcharts";

const SingleDayWeatherGraphPopUp = ({
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

  // Weather data matching the image exactly
  useEffect(() => {
    const data = {
      location: location || "Current Location",
      currentTemp: 89,
      condition: "Clear",
      unit: "F",
      hourlyTemps: [
        { time: "3 AM", temp: 89 },
        { time: "7 AM", temp: 83 },
        { time: "11 AM", temp: 80 },
        { time: "3 PM", temp: 77 },
        { time: "7 PM", temp: 78 },
        { time: "11 PM", temp: 91 },
        { time: "3 AM", temp: 89 }
      ]
    };
    setWeatherData(data);
  }, [location]);

  if (!weatherData) return null;

  const backgroundStyle = {
    background: customBgColor || '#ffffff',
    backgroundImage: image ? `url(${image})` : 'none',
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  };

  return (
    <div style={styles.overlay}>
      <div
        style={{
          ...styles.popup,
          ...backgroundStyle,
          fontFamily: textFont || 'Arial, sans-serif',
          color: fontColor || '#000000'
        }}
      >
        <div style={styles.topBar}>
          <button onClick={onClose} style={styles.closeBtn}>
            <IoMdClose />
          </button>
        </div>

        <div style={styles.weatherContainer}>
          {/* Main temperature display */}
          <div style={styles.mainTempSection}>
            <div style={styles.currentTemp}>
              {weatherData.currentTemp}°{weatherData.unit}
            </div>
            <div style={styles.condition}>
              {weatherData.condition}
            </div>
          </div>

          {/* Full-width Line Chart */}
          <div style={styles.chartContainer}>
            <Chart
              type="line"
              height="100%"
              width="100%"
              options={{
                chart: {
                  toolbar: { show: false },
                  zoom: { enabled: false },
                  animations: { enabled: !disableAnimations }
                },
                stroke: { curve: "smooth", width: 3, colors: ["#000"] },
                fill: {
                  type: "gradient",
                  gradient: {
                    shade: "dark",
                    type: "vertical",
                    shadeIntensity: 1,
                    gradientToColors: ["#000"],
                    opacityFrom: 1,
                    opacityTo: 1,
                  },
                },
                markers: {
                  size: 1,
                  colors: ["#ffffff"],
                  strokeColors: "#ffffff",
                  strokeWidth: 2,
                },
                dataLabels: {
                  enabled: true,
                  style: { colors: ["#000"], fontSize: "14px", fontWeight: "bold", padding:"10px" },
                  formatter: (val) => `${val}°`
                },
                xaxis: {
                  categories: weatherData.hourlyTemps.map((h) => h.time),
                  labels: { style: { colors: "#fff", fontSize: '14px' } }
                },
                yaxis: {
                  labels: { style: { colors: "#fff", fontSize: '14px' } }
                },
                grid: { show: false },
                tooltip: { enabled: true }
              }}
              series={[
                {
                  name: "Temp",
                  data: weatherData.hourlyTemps.map((h) => h.temp)
                }
              ]}
            />
          </div>

          {/* Hourly temperatures */}
          <div style={styles.hourlyTemps}>
            {weatherData.hourlyTemps.map((hour, index) => (
              <div key={index} style={styles.hourTemp}>
                {hour.temp}°
              </div>
            ))}
          </div>

          {/* Time labels */}
          <div style={styles.timeLabels}>
            {weatherData.hourlyTemps.map((hour, index) => (
              <div key={index} style={styles.timeLabel}>
                {hour.time}
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
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  mainTempSection: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: "20px",
  },
  currentTemp: {
    fontSize: "64px",
    fontWeight: "bold",
    lineHeight: "1",
    marginBottom: "10px",
  },
  condition: {
    fontSize: "24px",
    color: "#fff",
  },
  chartContainer: {
    width: "100%",
    height: "300px",
    marginBottom: "30px",
    borderRadius: "12px",
    overflow: "hidden",
  },
  hourlyTemps: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: "10px",
  },
  hourTemp: {
    fontSize: "18px",
    fontWeight: "bold",
    textAlign: "center",
    flex: 1,
  },
  timeLabels: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
  },
  timeLabel: {
    fontSize: "14px",
    color: "#fff",
    textAlign: "center",
    flex: 1,
  }
};

export default SingleDayWeatherGraphPopUp;
