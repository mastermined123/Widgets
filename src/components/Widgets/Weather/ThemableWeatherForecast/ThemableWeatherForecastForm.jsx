// ThemableWeatherForecastForm.jsx
import React, { useState } from "react";
import ThemableWeatherForecastPopUp from "./ThemableWeatherForecastPopup";

const ThemableWeatherForecastForm = ({ card }) => {
  console.log('card', card);
  const [activeTab, setActiveTab] = useState("settings");
  const [tags, setTags] = useState([]);
  const [appName, setAppName] = useState("");
  const [dataFeed, setDataFeed] = useState("");
  const [forecastLocation, setForecastLocation] = useState("");
  const [locationName, setLocationName] = useState("");
  const [usePlayerLocation, setUsePlayerLocation] = useState(false);
  const [theme, setTheme] = useState("Default");
  const [temperatureScale, setTemperatureScale] = useState("celsius");
  const [distanceUnit, setDistanceUnit] = useState("metric");
  const [animateBackground, setAnimateBackground] = useState(false);
  const [textFont, setTextFont] = useState("Arial");
  const [fontColor, setFontColor] = useState("#000000");
  const [textShadow, setTextShadow] = useState(false);
  const [customBgColor, setCustomBgColor] = useState("#ffffff");
  const [customBgImage, setCustomBgImage] = useState(null);
  
  // Language Tab Fields
  const [language, setLanguage] = useState("English");
  const [nowLabel, setNowLabel] = useState("now");
  const [todayLabel, setTodayLabel] = useState("today");
  const [unavailableLabel, setUnavailableLabel] = useState("Information not available.");
  const [sunLabel, setSunLabel] = useState("Sun");
  const [monLabel, setMonLabel] = useState("Mon");
  const [tueLabel, setTueLabel] = useState("Tue");
  const [wedLabel, setWedLabel] = useState("Wed");
  const [thuLabel, setThuLabel] = useState("Thu");
  const [friLabel, setFriLabel] = useState("Fri");
  const [satLabel, setSatLabel] = useState("Sat");
  
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
      locationName,
      usePlayerLocation,
      theme,
      temperatureScale,
      distanceUnit,
      animateBackground,
      textFont,
      fontColor,
      textShadow,
      customBgColor,
      customBgImage,
      language,
      nowLabel,
      todayLabel,
      unavailableLabel,
      sunLabel,
      monLabel,
      tueLabel,
      wedLabel,
      thuLabel,
      friLabel,
      satLabel
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

  const themeOptions = [
    { value: "Default", label: "Default" },
    { value: "Theme1", label: "Theme1" },
    { value: "Theme2", label: "Theme2" },
    { value: "Theme3", label: "Theme3" },
    { value: "Old Theme", label: "Old Theme" }
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

              <div style={styles.field}>
                <label>Location name (optional):</label>
                <input
                  type="text"
                  value={locationName}
                  onChange={e => setLocationName(e.target.value)}
                  style={styles.input}
                  placeholder="Enter location name"
                />
              </div>

              <div style={styles.checkboxGroup}>
                <label>
                  <input
                    type="checkbox"
                    checked={usePlayerLocation}
                    onChange={e => setUsePlayerLocation(e.target.checked)}
                  />{" "}
                  Use player location. Only available on Android Player 8.1.3 or greater.
                </label>
                <p style={styles.description}>
                  Player location will be based on GPS, or location can be manually configured at the player settings page. Enabling this feature will override the Forecast location field.
                </p>
              </div>

              <div style={styles.field}>
                <label>Theme:</label>
                <select
                  value={theme}
                  onChange={e => setTheme(e.target.value)}
                  style={styles.input}
                >
                  {themeOptions.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>

              <div style={styles.field}>
                <label>Units:</label>
                <select
                  value={temperatureScale}
                  onChange={e => setTemperatureScale(e.target.value)}
                  style={styles.input}
                >
                  <option value="celsius">Celsius (°C)</option>
                  <option value="fahrenheit">Fahrenheit (°F)</option>
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
                    checked={animateBackground}
                    onChange={e => setAnimateBackground(e.target.checked)}
                  />{" "}
                  Animate background image
                </label>
              </div>

              <div style={styles.field}>
                <label>Font family (optional):</label>
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
                </select>
              </div>

              <div style={styles.field}>
                <label>Font color (optional):</label>
                <input
                  type="color"
                  value={fontColor}
                  onChange={e => setFontColor(e.target.value)}
                  style={styles.colorInput}
                />
              </div>

              <div style={styles.checkboxGroup}>
                <label>
                  <input
                    type="checkbox"
                    checked={textShadow}
                    onChange={e => setTextShadow(e.target.checked)}
                  />{" "}
                  Text shadow
                </label>
              </div>

              <div style={styles.field}>
                <label>Background color (optional):</label>
                <input
                  type="color"
                  value={customBgColor}
                  onChange={e => setCustomBgColor(e.target.value)}
                  style={styles.colorInput}
                />
              </div>

              <div style={styles.field}>
                <label>Background image (optional):</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={e => setCustomBgImage(e.target.files[0])}
                  style={styles.fileInput}
                />
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
                <label>now:</label>
                <input
                  type="text"
                  value={nowLabel}
                  onChange={e => setNowLabel(e.target.value)}
                  style={styles.input}
                  placeholder="now"
                />
              </div>

              <div style={styles.field}>
                <label>today:</label>
                <input
                  type="text"
                  value={todayLabel}
                  onChange={e => setTodayLabel(e.target.value)}
                  style={styles.input}
                  placeholder="today"
                />
              </div>

              <div style={styles.field}>
                <label>Information not available.:</label>
                <input
                  type="text"
                  value={unavailableLabel}
                  onChange={e => setUnavailableLabel(e.target.value)}
                  style={styles.input}
                  placeholder="Information not available."
                />
              </div>

              <div style={styles.field}>
                <label>Sun:</label>
                <input
                  type="text"
                  value={sunLabel}
                  onChange={e => setSunLabel(e.target.value)}
                  style={styles.input}
                  placeholder="Sun"
                />
              </div>

              <div style={styles.field}>
                <label>Mon:</label>
                <input
                  type="text"
                  value={monLabel}
                  onChange={e => setMonLabel(e.target.value)}
                  style={styles.input}
                  placeholder="Mon"
                />
              </div>

              <div style={styles.field}>
                <label>Tue:</label>
                <input
                  type="text"
                  value={tueLabel}
                  onChange={e => setTueLabel(e.target.value)}
                  style={styles.input}
                  placeholder="Tue"
                />
              </div>

              <div style={styles.field}>
                <label>Wed:</label>
                <input
                  type="text"
                  value={wedLabel}
                  onChange={e => setWedLabel(e.target.value)}
                  style={styles.input}
                  placeholder="Wed"
                />
              </div>

              <div style={styles.field}>
                <label>Thu:</label>
                <input
                  type="text"
                  value={thuLabel}
                  onChange={e => setThuLabel(e.target.value)}
                  style={styles.input}
                  placeholder="Thu"
                />
              </div>

              <div style={styles.field}>
                <label>Fri:</label>
                <input
                  type="text"
                  value={friLabel}
                  onChange={e => setFriLabel(e.target.value)}
                  style={styles.input}
                  placeholder="Fri"
                />
              </div>

              <div style={styles.field}>
                <label>Sat:</label>
                <input
                  type="text"
                  value={satLabel}
                  onChange={e => setSatLabel(e.target.value)}
                  style={styles.input}
                  placeholder="Sat"
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
          <ThemableWeatherForecastPopUp
            image={customBgImage ? URL.createObjectURL(customBgImage) : card.imageSrc}
            onClose={() => setShowPopup(false)}
            fontColor={fontColor}
            customBgColor={customBgColor}
            textFont={textFont}
            textShadow={textShadow}
            temperatureScale={temperatureScale}
            distanceUnit={distanceUnit}
            animateBackground={animateBackground}
            theme={theme}
            location={usePlayerLocation ? "Player Location" : (locationName || forecastLocation)}
            labels={{
              now: nowLabel,
              today: todayLabel,
              unavailable: unavailableLabel,
              sun: sunLabel,
              mon: monLabel,
              tue: tueLabel,
              wed: wedLabel,
              thu: thuLabel,
              fri: friLabel,
              sat: satLabel
            }}
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
  sectionHeading: {
    marginTop: "20px",
    marginBottom: "15px",
    borderTop: "1px solid #ddd",
    paddingTop: "15px"
  },
  checkboxGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "5px",
    marginBottom: "15px"
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

export default ThemableWeatherForecastForm;