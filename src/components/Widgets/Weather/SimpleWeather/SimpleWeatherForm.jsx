/* eslint-disable no-unused-vars */
// SimpleWeatherForm.jsx
import React, { useState } from "react";
import SimpleWeatherPopUp from "./SimpleWeatherPopup";

const SimpleWeatherForm = ({ card }) => {
  console.log('card', card);
  const [activeTab, setActiveTab] = useState("settings");
  const [tags, setTags] = useState([]);
  const [appName, setAppName] = useState("");
  const [dataFeed, setDataFeed] = useState("");
  const [forecastLocation, setForecastLocation] = useState("");
  const [usePlayerLocation, setUsePlayerLocation] = useState(false);
  const [temperatureScale, setTemperatureScale] = useState("celsius");
  const [textFont, setTextFont] = useState("Arial");
  const [fontColor, setFontColor] = useState("#000000");
  const [textShadow, setTextShadow] = useState(false);
  const [customBgColor, setCustomBgColor] = useState("#ffffff");
  const [customBgImage, setCustomBgImage] = useState(null);
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
      usePlayerLocation,
      temperatureScale,
      textFont,
      fontColor,
      textShadow,
      customBgColor,
      customBgImage
    });
    alert("Saved! Check console.");
  };

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
                  <option value="">Select a location</option>
                  <option value="new-york">New York</option>
                  <option value="london">London</option>
                  <option value="tokyo">Tokyo</option>
                  <option value="sydney">Sydney</option>
                  <option value="paris">Paris</option>
                </select>
                <p style={styles.description}>
                  Type the location of the forecast and choose from the dropdown.
                </p>
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
                <label>Temperature Scale:</label>
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
                />
              </div>

              <div style={styles.field}>
                <label>Background image (optional):</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={e => setCustomBgImage(e.target.files[0])}
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
          <SimpleWeatherPopUp
            image={customBgImage ? URL.createObjectURL(customBgImage) : card.imageSrc}
            onClose={() => setShowPopup(false)}
            fontColor={fontColor}
            customBgColor={customBgColor}
            textFont={textFont}
            textShadow={textShadow}
            temperatureScale={temperatureScale}
            location={usePlayerLocation ? "Player Location" : forecastLocation}
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
    objectFit: "cover",
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
    overflowY: "auto"
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

export default SimpleWeatherForm;