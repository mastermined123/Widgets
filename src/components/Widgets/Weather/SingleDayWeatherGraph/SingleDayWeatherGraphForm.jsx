/* eslint-disable no-unused-vars */
// SingleDayWeatherGraphForm.jsx
import React, { useState } from "react";
import SingleDayWeatherGraphPopUp from "./SingleDayGraphWeatherPopup";

const SingleDayWeatherGraphForm = ({ card }) => {
  console.log('card', card);
  const [activeTab, setActiveTab] = useState("settings");
  const [tags, setTags] = useState([]);
  const [appName, setAppName] = useState("");
  const [dataFeed, setDataFeed] = useState("");
  const [forecastLocation, setForecastLocation] = useState("");
  const [getAutomaticLocation, setGetAutomaticLocation] = useState(false);
  const [temperatureScale, setTemperatureScale] = useState("celsius");
  const [distanceUnit, setDistanceUnit] = useState("metric");
  const [hideAdditionalInfo, setHideAdditionalInfo] = useState(false);
  const [textFont, setTextFont] = useState("Arial");
  const [fontColor, setFontColor] = useState("#000000");
  const [customBgColor, setCustomBgColor] = useState("#ffffff");
  const [customBgImage, setCustomBgImage] = useState(null);
  const [backgroundGradient, setBackgroundGradient] = useState(false);
  
  // Language Tab Fields
  const [language, setLanguage] = useState("English");
  const [precipitationLabel, setPrecipitationLabel] = useState("Precipitation");
  const [visibilityLabel, setVisibilityLabel] = useState("Visibility");
  const [humidityLabel, setHumidityLabel] = useState("Humidity");
  const [windLabel, setWindLabel] = useState("Wind");
  const [clearLabel, setClearLabel] = useState("Clear");
  const [partlyCloudyLabel, setPartlyCloudyLabel] = useState("Partly cloudy");
  const [snowyLabel, setSnowyLabel] = useState("Snowy");
  const [sleetyLabel, setSleetyLabel] = useState("Sleety");
  const [rainyLabel, setRainyLabel] = useState("Rainy");
  const [cloudyLabel, setCloudyLabel] = useState("Cloudy");
  const [foggyLabel, setFoggyLabel] = useState("Foggy");
  const [windyLabel, setWindyLabel] = useState("Windy");
  const [unavailableLabel, setUnavailableLabel] = useState("Unavailable");
  
  const [showPopup, setShowPopup] = useState(false);

  const addTag = () => {
    if (dataFeed.trim()) {
      setTags([...tags, dataFeed.trim()]);
      setDataFeed("");
    }
  };

  const removeTag = (index) => {
    const newTags = tags.filter((_, i) => i !== index);
    setTags(newTags);
  };

  const handleSave = () => {
    console.log({
      appName,
      tags,
      forecastLocation,
      getAutomaticLocation,
      temperatureScale,
      distanceUnit,
      hideAdditionalInfo,
      textFont,
      fontColor,
      customBgColor,
      customBgImage,
      backgroundGradient,
      language,
      precipitationLabel,
      visibilityLabel,
      humidityLabel,
      windLabel,
      clearLabel,
      partlyCloudyLabel,
      snowyLabel,
      sleetyLabel,
      rainyLabel,
      cloudyLabel,
      foggyLabel,
      windyLabel,
      unavailableLabel
    });
    alert("Saved! Check console.");
  };

  const locationOptions = [
    { value: "", label: "Select a location" },
    { value: "new-york", label: "New York" },
    { value: "london", label: "London" },
    { value: "tokyo", label: "Tokyo" },
    { value: "sydney", label: "Sydney" },
    { value: "paris", label: "Paris" },
    { value: "dubai", label: "Dubai" },
    { value: "mumbai", label: "Mumbai" },
    { value: "singapore", label: "Singapore" },
    { value: "berlin", label: "Berlin" },
    { value: "toronto", label: "Toronto" }
  ];

  const languageOptions = [
    { value: "English", label: "English" },
    { value: "Spanish", label: "Spanish" },
    { value: "French", label: "French" },
    { value: "German", label: "German" },
    { value: "Italian", label: "Italian" },
    { value: "Portuguese", label: "Portuguese" },
    { value: "Russian", label: "Russian" },
    { value: "Chinese", label: "Chinese" },
    { value: "Japanese", label: "Japanese" },
    { value: "Korean", label: "Korean" }
  ];

  return (
    <div style={styles.container}>
      {/* Left Portion */}
      <div style={styles.left}>
        <label style={{ ...styles.field, fontWeight: "bold" }}>{card.title}</label>
        {card.imageSrc && <img src={card.imageSrc} alt={card.title} style={styles.image} />}
        <p>This app will display weather information based on your location settings.</p>
        <p>Better Viewed Like This:</p>
        <div style={styles.previewBoxes}>
          <div style={{ ...styles.box, width: "100px", height: "60px" }}></div>
          <div style={{ ...styles.box, width: "60px", height: "100px" }}></div>
        </div>
      </div>

      {/* Right Portion */}
      <div style={styles.right}>
        <div style={styles.tabs}>
          <button
            style={activeTab === "settings" ? styles.activeTab : styles.tab}
            onClick={() => setActiveTab("settings")}
          >
            Settings
          </button>
          <button
            style={activeTab === "language" ? styles.activeTab : styles.tab}
            onClick={() => setActiveTab("language")}
          >
            Language
          </button>
        </div>

        <div style={styles.tabContent}>
          {activeTab === "settings" && (
            <div>
              <div style={styles.field}>
                <label>App Name:</label>
                <input
                  type="text"
                  value={appName}
                  onChange={e => setAppName(e.target.value)}
                  style={styles.input}
                />
              </div>

              <div style={styles.field}>
                <label>Tags (optional):</label>
                <div style={{ display: "flex", gap: "5px", flexWrap: "wrap" }}>
                  {tags?.map((tag, i) => (
                    <span key={i} style={styles.tag}>
                      {tag} <button onClick={() => removeTag(i)} style={styles.removeTag}>x</button>
                    </span>
                  ))}
                  <input
                    type="text"
                    value={dataFeed}
                    onChange={e => setDataFeed(e.target.value)}
                    placeholder="Enter tag"
                    style={{ ...styles.input, flex: "1" }}
                    onKeyDown={e => e.key === "Enter" && (e.preventDefault(), addTag())}
                  />
                </div>
              </div>

              <div style={styles.field}>
                <label>Forecast location:</label>
                <select
                  value={forecastLocation}
                  onChange={e => setForecastLocation(e.target.value)}
                  style={styles.input}
                >
                  {locationOptions.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>

              <div style={styles.checkboxGroup}>
                <label>
                  <input
                    type="checkbox"
                    checked={getAutomaticLocation}
                    onChange={e => setGetAutomaticLocation(e.target.checked)}
                  />{" "}
                  Get automatic location if available
                </label>
              </div>

              <div style={styles.field}>
                <label>Temperature Scale:</label>
                <select
                  value={temperatureScale}
                  onChange={e => setTemperatureScale(e.target.value)}
                  style={styles.input}
                >
                  <option value="celsius">Celsius</option>
                  <option value="fahrenheit">Fahrenheit</option>
                </select>
              </div>

              <div style={styles.field}>
                <label>Distance Unit:</label>
                <select
                  value={distanceUnit}
                  onChange={e => setDistanceUnit(e.target.value)}
                  style={styles.input}
                >
                  <option value="metric">Metric</option>
                  <option value="imperial">Imperial</option>
                </select>
              </div>

              <div style={styles.checkboxGroup}>
                <label>
                  <input
                    type="checkbox"
                    checked={hideAdditionalInfo}
                    onChange={e => setHideAdditionalInfo(e.target.checked)}
                  />{" "}
                  Hide additional informations
                </label>
              </div>

              <div style={styles.field}>
                <label>Text Font (optional):</label>
                <select
                  value={textFont}
                  onChange={e => setTextFont(e.target.value)}
                  style={styles.input}
                >
                  <option value="Arial">Arial</option>
                  <option value="Courier New">Courier New</option>
                  <option value="Georgia">Georgia</option>
                  <option value="Times New Roman">Times New Roman</option>
                  <option value="Verdana">Verdana</option>
                  <option value="Helvetica">Helvetica</option>
                  <option value="Roboto">Roboto</option>
                </select>
              </div>

              <div style={styles.field}>
                <label>Text Color (optional):</label>
                <input
                  type="color"
                  value={fontColor}
                  onChange={e => setFontColor(e.target.value)}
                  style={styles.colorInput}
                />
              </div>

              <div style={styles.field}>
                <label>Background Color (optional):</label>
                <input
                  type="color"
                  value={customBgColor}
                  onChange={e => setCustomBgColor(e.target.value)}
                  style={styles.colorInput}
                />
              </div>

              <div style={styles.field}>
                <label>Background Image (optional):</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={e => setCustomBgImage(e.target.files[0])}
                  style={styles.fileInput}
                />
              </div>

              <div style={styles.checkboxGroup}>
                <label>
                  <input
                    type="checkbox"
                    checked={backgroundGradient}
                    onChange={e => setBackgroundGradient(e.target.checked)}
                  />{" "}
                  Background gradient
                </label>
              </div>
            </div>
          )}

          {activeTab === "language" && (
            <div>
              <div style={styles.field}>
                <label>Language:</label>
                <select
                  value={language}
                  onChange={e => setLanguage(e.target.value)}
                  style={styles.input}
                >
                  {languageOptions.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
                <p style={styles.description}>
                  Changing the language will affect any text displayed on the app as well as how dates and numbers are formatted.
                </p>
              </div>

              <div style={styles.sectionHeading}>
                <h3>App Labels</h3>
                <p style={styles.description}>
                  These labels will be displayed in the app. You can choose to override them if the default translation shown below does not fit your needs.
                </p>
              </div>

              <div style={styles.field}>
                <label>Precipitation:</label>
                <input
                  type="text"
                  value={precipitationLabel}
                  onChange={e => setPrecipitationLabel(e.target.value)}
                  style={styles.input}
                  placeholder="Precipitation"
                />
              </div>

              <div style={styles.field}>
                <label>Visibility:</label>
                <input
                  type="text"
                  value={visibilityLabel}
                  onChange={e => setVisibilityLabel(e.target.value)}
                  style={styles.input}
                  placeholder="Visibility"
                />
              </div>

              <div style={styles.field}>
                <label>Humidity:</label>
                <input
                  type="text"
                  value={humidityLabel}
                  onChange={e => setHumidityLabel(e.target.value)}
                  style={styles.input}
                  placeholder="Humidity"
                />
              </div>

              <div style={styles.field}>
                <label>Wind:</label>
                <input
                  type="text"
                  value={windLabel}
                  onChange={e => setWindLabel(e.target.value)}
                  style={styles.input}
                  placeholder="Wind"
                />
              </div>

              <div style={styles.field}>
                <label>Clear:</label>
                <input
                  type="text"
                  value={clearLabel}
                  onChange={e => setClearLabel(e.target.value)}
                  style={styles.input}
                  placeholder="Clear"
                />
              </div>

              <div style={styles.field}>
                <label>Partly cloudy:</label>
                <input
                  type="text"
                  value={partlyCloudyLabel}
                  onChange={e => setPartlyCloudyLabel(e.target.value)}
                  style={styles.input}
                  placeholder="Partly cloudy"
                />
              </div>

              <div style={styles.field}>
                <label>Snowy:</label>
                <input
                  type="text"
                  value={snowyLabel}
                  onChange={e => setSnowyLabel(e.target.value)}
                  style={styles.input}
                  placeholder="Snowy"
                />
              </div>

              <div style={styles.field}>
                <label>Sleety:</label>
                <input
                  type="text"
                  value={sleetyLabel}
                  onChange={e => setSleetyLabel(e.target.value)}
                  style={styles.input}
                  placeholder="Sleety"
                />
              </div>

              <div style={styles.field}>
                <label>Rainy:</label>
                <input
                  type="text"
                  value={rainyLabel}
                  onChange={e => setRainyLabel(e.target.value)}
                  style={styles.input}
                  placeholder="Rainy"
                />
              </div>

              <div style={styles.field}>
                <label>Cloudy:</label>
                <input
                  type="text"
                  value={cloudyLabel}
                  onChange={e => setCloudyLabel(e.target.value)}
                  style={styles.input}
                  placeholder="Cloudy"
                />
              </div>

              <div style={styles.field}>
                <label>Foggy:</label>
                <input
                  type="text"
                  value={foggyLabel}
                  onChange={e => setFoggyLabel(e.target.value)}
                  style={styles.input}
                  placeholder="Foggy"
                />
              </div>

              <div style={styles.field}>
                <label>Windy:</label>
                <input
                  type="text"
                  value={windyLabel}
                  onChange={e => setWindyLabel(e.target.value)}
                  style={styles.input}
                  placeholder="Windy"
                />
              </div>

              <div style={styles.field}>
                <label>Unavailable:</label>
                <input
                  type="text"
                  value={unavailableLabel}
                  onChange={e => setUnavailableLabel(e.target.value)}
                  style={styles.input}
                  placeholder="Unavailable"
                />
              </div>
            </div>
          )}
        </div>

        <div style={styles.fixedButtons}>
          <button onClick={handleSave} style={styles.saveBtn}>Save</button>
          <button onClick={() => setShowPopup(true)} style={styles.previewBtn}>Preview</button>
        </div>

{showPopup && (
  <SingleDayWeatherGraphPopUp
    image={customBgImage}
    onClose={() => setShowPopup(false)}
    fontColor={fontColor}
    customBgColor={customBgColor}
    textFont={textFont}
    temperatureScale={temperatureScale}
    distanceUnit={distanceUnit}
    hideAdditionalInfo={hideAdditionalInfo}
    backgroundGradient={backgroundGradient}
    location={getAutomaticLocation ? "Automatic Location" : forecastLocation}
    labels={{
      precipitation: precipitationLabel,
      visibility: visibilityLabel,
      humidity: humidityLabel,
      wind: windLabel,
      clear: clearLabel,
      partlyCloudy: partlyCloudyLabel,
      snowy: snowyLabel,
      sleety: sleetyLabel,
      rainy: rainyLabel,
      cloudy: cloudyLabel,
      foggy: foggyLabel,
      windy: windyLabel,
      unavailable: unavailableLabel
    }}
    // 👇 Yahan dummy hourly data bhej do (baad me API se bhi aa sakta hai)
    hourlyTemps={[
      { time: "6 AM", temp: 22 },
      { time: "9 AM", temp: 25 },
      { time: "12 PM", temp: 29 },
      { time: "3 PM", temp: 31 },
      { time: "6 PM", temp: 28 },
      { time: "9 PM", temp: 24 }
    ]}
  />
)}
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    width: "96%",
    border: "1px solid #ddd",
    borderRadius: "8px",
    overflow: "hidden",
    marginTop: "1px",
    position: "relative"
  },
  left: {
    flex: 0.35,
    borderRight: "3px solid #ddd",
    backgroundColor: "#f5f5f5",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "10px",
    overflowY: "auto"
  },
  right: {
    flex: 0.65,
    padding: "15px",
    display: "flex",
    flexDirection: "column",
    position: "relative"
  },
  image: {
    width: "100%",
    height: "200px",
    objectFit: "contain",
    borderRadius: "8px",
    marginBottom: "10px"
  },
  previewBoxes: {
    display: "flex",
    gap: "10px",
    marginTop: "10px",
    marginBottom: "20px"
  },
  box: {
    backgroundColor: "#ddd",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "4px"
  },
  tabs: {
    display: "flex",
    gap: "10px",
    marginBottom: "15px"
  },
  tab: {
    padding: "8px 16px",
    cursor: "pointer",
    backgroundColor: "#eee",
    border: "none",
    borderRadius: "4px",
    fontSize: "14px"
  },
  activeTab: {
    padding: "8px 16px",
    cursor: "pointer",
    backgroundColor: "#005481",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    fontSize: "14px"
  },
  tabContent: {
    flex: 1,
    overflowY: "auto",
    paddingBottom: "70px"
  },
  field: {
    display: "flex",
    flexDirection: "column",
    marginBottom: "15px"
  },
  input: {
    padding: "8px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    fontSize: "14px"
  },
  colorInput: {
    padding: "5px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    width: "60px",
    height: "40px",
    cursor: "pointer"
  },
  fileInput: {
    padding: "8px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    fontSize: "14px",
    backgroundColor: "#fff"
  },
  description: {
    fontSize: "12px",
    color: "#666",
    margin: "5px 0 0 0",
    fontStyle: "italic"
  },
  checkboxGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "5px",
    marginBottom: "15px"
  },
  sectionHeading: {
    marginTop: "20px",
    marginBottom: "15px",
    borderTop: "1px solid #ddd",
    paddingTop: "15px"
  },
  fixedButtons: {
    position: "absolute",
    bottom: "10px",
    right: "10px",
    display: "flex",
    gap: "10px"
  },
  saveBtn: {
    padding: "10px 16px",
    backgroundColor: "#005481",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "bold"
  },
  previewBtn: {
    padding: "10px 16px",
    backgroundColor: "#888",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "bold"
  },
  tag: {
    padding: "4px 8px",
    backgroundColor: "#e0e0e0",
    borderRadius: "4px",
    display: "flex",
    alignItems: "center",
    fontSize: "12px"
  },
  removeTag: {
    marginLeft: "6px",
    backgroundColor: "#ff4444",
    color: "#fff",
    border: "none",
    borderRadius: "50%",
    width: "18px",
    height: "18px",
    cursor: "pointer",
    fontSize: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }
};

export default SingleDayWeatherGraphForm;