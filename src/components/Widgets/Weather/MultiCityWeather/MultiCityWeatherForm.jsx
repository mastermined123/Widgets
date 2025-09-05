/* eslint-disable no-unused-vars */
// MultiCityWeatherForm.jsx
import React, { useState } from "react";
import MultiCityWeatherPopUp from "./MultiCityWeatherWeatherPopup";

const MultiCityWeatherForm = ({ card }) => {
  console.log('card', card);
  const [activeTab, setActiveTab] = useState("settings");
  const [tags, setTags] = useState([]);
  const [appName, setAppName] = useState("");
  const [dataFeed, setDataFeed] = useState("");
  
  // First City
  const [firstForecastLocation, setFirstForecastLocation] = useState("");
  const [firstCityLabel, setFirstCityLabel] = useState("");
  
  // Second City
  const [secondForecastLocation, setSecondForecastLocation] = useState("");
  const [secondCityLabel, setSecondCityLabel] = useState("");
  
  // Third City
  const [thirdForecastLocation, setThirdForecastLocation] = useState("");
  const [thirdCityLabel, setThirdCityLabel] = useState("");
  
  const [temperatureScale, setTemperatureScale] = useState("celsius");
  const [distanceUnit, setDistanceUnit] = useState("metric");
  const [textFont, setTextFont] = useState("Arial");
  const [fontColor, setFontColor] = useState("#000000");
  const [customBgColor, setCustomBgColor] = useState("#ffffff");
  const [customBgImage, setCustomBgImage] = useState(null);
  
  // Checkboxes
  const [disableBackgroundGradient, setDisableBackgroundGradient] = useState(false);
  const [disableAnimation, setDisableAnimation] = useState(false);
  
  // Language Tab Fields
  const [language, setLanguage] = useState("English");
  const [precipLabel, setPrecipLabel] = useState("Precip.");
  const [windLabel, setWindLabel] = useState("Wind");
  const [humidityLabel, setHumidityLabel] = useState("Humidity");
  const [clearDayLabel, setClearDayLabel] = useState("Clear Day");
  const [clearNightLabel, setClearNightLabel] = useState("Clear Night");
  const [cloudyLabel, setCloudyLabel] = useState("Cloudy");
  const [fogLabel, setFogLabel] = useState("Fog");
  const [hailLabel, setHailLabel] = useState("Hail");
  const [partlyCloudyLabel, setPartlyCloudyLabel] = useState("Partly Cloudy");
  const [rainLabel, setRainLabel] = useState("Rain");
  const [sleetLabel, setSleetLabel] = useState("Sleet");
  const [thunderstormLabel, setThunderstormLabel] = useState("Thunderstorm");
  const [tornadoLabel, setTornadoLabel] = useState("Tornado");
  const [snowLabel, setSnowLabel] = useState("Snow");
  
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
      firstForecastLocation,
      firstCityLabel,
      secondForecastLocation,
      secondCityLabel,
      thirdForecastLocation,
      thirdCityLabel,
      temperatureScale,
      distanceUnit,
      textFont,
      fontColor,
      customBgColor,
      customBgImage,
      disableBackgroundGradient,
      disableAnimation,
      language,
      precipLabel,
      windLabel,
      humidityLabel,
      clearDayLabel,
      clearNightLabel,
      cloudyLabel,
      fogLabel,
      hailLabel,
      partlyCloudyLabel,
      rainLabel,
      sleetLabel,
      thunderstormLabel,
      tornadoLabel,
      snowLabel
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
        <p>Displays weather information for up to three cities at once.</p>
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
                <label>First Forecast Location:</label>
                <select
                  value={firstForecastLocation}
                  onChange={e => setFirstForecastLocation(e.target.value)}
                  style={styles.input}
                >
                  {locationOptions.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>

              <div style={styles.field}>
                <label>First City Label (optional):</label>
                <input
                  type="text"
                  value={firstCityLabel}
                  onChange={e => setFirstCityLabel(e.target.value)}
                  style={styles.input}
                  placeholder="Enter custom label for first city"
                />
              </div>

              <div style={styles.field}>
                <label>Second Forecast Location:</label>
                <select
                  value={secondForecastLocation}
                  onChange={e => setSecondForecastLocation(e.target.value)}
                  style={styles.input}
                >
                  {locationOptions.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>

              <div style={styles.field}>
                <label>Second City Label (optional):</label>
                <input
                  type="text"
                  value={secondCityLabel}
                  onChange={e => setSecondCityLabel(e.target.value)}
                  style={styles.input}
                  placeholder="Enter custom label for second city"
                />
              </div>

              <div style={styles.field}>
                <label>Third Forecast Location:</label>
                <select
                  value={thirdForecastLocation}
                  onChange={e => setThirdForecastLocation(e.target.value)}
                  style={styles.input}
                >
                  {locationOptions.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>

              <div style={styles.field}>
                <label>Third City Label (optional):</label>
                <input
                  type="text"
                  value={thirdCityLabel}
                  onChange={e => setThirdCityLabel(e.target.value)}
                  style={styles.input}
                  placeholder="Enter custom label for third city"
                />
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
                <label>Font Color (optional):</label>
                <input
                  type="color"
                  value={fontColor}
                  onChange={e => setFontColor(e.target.value)}
                />
              </div>

              <div style={styles.field}>
                <label>Background Color (optional):</label>
                <input
                  type="color"
                  value={customBgColor}
                  onChange={e => setCustomBgColor(e.target.value)}
                />
              </div>

              <div style={styles.field}>
                <label>Background Image (optional):</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={e => setCustomBgImage(e.target.files[0])}
                />
              </div>

              <div style={styles.checkboxGroup}>
                <label>
                  <input
                    type="checkbox"
                    checked={disableBackgroundGradient}
                    onChange={e => setDisableBackgroundGradient(e.target.checked)}
                  />{" "}
                  Disable Background Gradient
                </label>
              </div>

              <div style={styles.checkboxGroup}>
                <label>
                  <input
                    type="checkbox"
                    checked={disableAnimation}
                    onChange={e => setDisableAnimation(e.target.checked)}
                  />{" "}
                  Disable Animation
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
                <label>Precip.:</label>
                <input
                  type="text"
                  value={precipLabel}
                  onChange={e => setPrecipLabel(e.target.value)}
                  style={styles.input}
                  placeholder="Precip."
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
                <label>Clear Day:</label>
                <input
                  type="text"
                  value={clearDayLabel}
                  onChange={e => setClearDayLabel(e.target.value)}
                  style={styles.input}
                  placeholder="Clear Day"
                />
              </div>

              <div style={styles.field}>
                <label>Clear Night:</label>
                <input
                  type="text"
                  value={clearNightLabel}
                  onChange={e => setClearNightLabel(e.target.value)}
                  style={styles.input}
                  placeholder="Clear Night"
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
                <label>Fog:</label>
                <input
                  type="text"
                  value={fogLabel}
                  onChange={e => setFogLabel(e.target.value)}
                  style={styles.input}
                  placeholder="Fog"
                />
              </div>

              <div style={styles.field}>
                <label>Hail:</label>
                <input
                  type="text"
                  value={hailLabel}
                  onChange={e => setHailLabel(e.target.value)}
                  style={styles.input}
                  placeholder="Hail"
                />
              </div>

              <div style={styles.field}>
                <label>Partly Cloudy:</label>
                <input
                  type="text"
                  value={partlyCloudyLabel}
                  onChange={e => setPartlyCloudyLabel(e.target.value)}
                  style={styles.input}
                  placeholder="Partly Cloudy"
                />
              </div>

              <div style={styles.field}>
                <label>Rain:</label>
                <input
                  type="text"
                  value={rainLabel}
                  onChange={e => setRainLabel(e.target.value)}
                  style={styles.input}
                  placeholder="Rain"
                />
              </div>

              <div style={styles.field}>
                <label>Sleet:</label>
                <input
                  type="text"
                  value={sleetLabel}
                  onChange={e => setSleetLabel(e.target.value)}
                  style={styles.input}
                  placeholder="Sleet"
                />
              </div>

              <div style={styles.field}>
                <label>Thunderstorm:</label>
                <input
                  type="text"
                  value={thunderstormLabel}
                  onChange={e => setThunderstormLabel(e.target.value)}
                  style={styles.input}
                  placeholder="Thunderstorm"
                />
              </div>

              <div style={styles.field}>
                <label>Tornado:</label>
                <input
                  type="text"
                  value={tornadoLabel}
                  onChange={e => setTornadoLabel(e.target.value)}
                  style={styles.input}
                  placeholder="Tornado"
                />
              </div>

              <div style={styles.field}>
                <label>Snow:</label>
                <input
                  type="text"
                  value={snowLabel}
                  onChange={e => setSnowLabel(e.target.value)}
                  style={styles.input}
                  placeholder="Snow"
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
          <MultiCityWeatherPopUp
            image={customBgImage ? URL.createObjectURL(customBgImage) : card.imageSrc}
            onClose={() => setShowPopup(false)}
            fontColor={fontColor}
            customBgColor={customBgColor}
            textFont={textFont}
            temperatureScale={temperatureScale}
            distanceUnit={distanceUnit}
            locations={[firstForecastLocation, secondForecastLocation, thirdForecastLocation]}
            cityLabels={[firstCityLabel, secondCityLabel, thirdCityLabel]}
            disableBackgroundGradient={disableBackgroundGradient}
            disableAnimation={disableAnimation}
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
    padding: "5px 15px",
    cursor: "pointer",
    backgroundColor: "#eee",
    border: "none",
    borderRadius: "4px"
  },
  activeTab: {
    padding: "5px 15px",
    cursor: "pointer",
    backgroundColor: "#005481",
    color: "#fff",
    border: "none",
    borderRadius: "4px"
  },
  tabContent: {
    flex: 1,
    overflowY: "auto",
    paddingBottom: "70px"
  },
  field: {
    display: "flex",
    flexDirection: "column",
    marginBottom: "10px"
  },
  input: {
    padding: "5px",
    borderRadius: "4px",
    border: "1px solid #ccc"
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
    marginTop: "10px",
    marginBottom: "10px"
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
    padding: "8px 12px",
    backgroundColor: "#005481",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer"
  },
  previewBtn: {
    padding: "8px 12px",
    backgroundColor: "#888",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer"
  },
  tag: {
    padding: "2px 5px",
    backgroundColor: "#ccc",
    borderRadius: "4px",
    display: "flex",
    alignItems: "center"
  },
  removeTag: {
    marginLeft: "5px",
    backgroundColor: "red",
    color: "#fff",
    border: "none",
    borderRadius: "50%",
    width: "16px",
    height: "16px",
    cursor: "pointer"
  }
};

export default MultiCityWeatherForm;