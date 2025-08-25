/* eslint-disable no-unused-vars */
// WeatherApp.jsx
import React, { useState } from "react";
import WeatherImagePopup from "./WeatherImagePopup";

const WeatherApp = ({ card }) => {
  const [tags, setTags] = useState([]);
  const [appName, setAppName] = useState("");
  const [forecastLocation, setForecastLocation] = useState("");
  const [usePlayerLocation, setUsePlayerLocation] = useState(false);
  const [temperatureScale, setTemperatureScale] = useState("celsius");
  const [fontFamily, setFontFamily] = useState("");
  const [fontColor, setFontColor] = useState("");
  const [textShadow, setTextShadow] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState("");
  const [backgroundImage, setBackgroundImage] = useState(null);
  const [dataFeed, setDataFeed] = useState("");
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
      fontFamily,
      fontColor,
      textShadow,
      backgroundColor,
      backgroundImage
    });
    alert("Saved! Check console.");
  };

  return (
    <div style={styles.container}>
      {/* Left Portion */}
      <div style={styles.left}>
        <label style={{ ...styles.field, fontWeight: "bold" }}>{card.title}</label>
        {card.imageSrc && <img src={card.imageSrc} alt={card.title} style={styles.image} />}
        <p>Flexible weather app that works well for small screen spaces.

</p>
      </div>

      {/* Right Portion */}
      <div style={styles.right}>
        <h3 style={{ marginBottom: "15px" }}>Settings</h3>

        {/* App Name */}
        <div style={styles.field}>
          <label>App Name:</label>
          <input
            type="text"
            value={appName}
            onChange={(e) => setAppName(e.target.value)}
            style={styles.input}
          />
        </div>

        {/* Tags */}
        <div style={styles.field}>
          <label>Tags (optional):</label>
          <div style={{ display: "flex", gap: "5px", flexWrap: "wrap" }}>
            {tags?.map((tag, i) => (
              <span key={i} style={styles.tag}>
                {tag}{" "}
                <button
                  onClick={() => removeTag(i)}
                  style={styles.removeTag}
                >
                  x
                </button>
              </span>
            ))}
            <input
              type="text"
              value={dataFeed}
              onChange={(e) => setDataFeed(e.target.value)}
              placeholder="Enter tag"
              style={{ ...styles.input, flex: "1" }}
              onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
            />
          </div>
        </div>

        {/* Forecast Location */}
        <div style={styles.field}>
          <label>Forecast Location:</label>
          <input
            type="text"
            value={forecastLocation}
            onChange={(e) => setForecastLocation(e.target.value)}
            style={styles.input}
          />
          <small style={styles.description}>
            Type the location of the forecast and choose from the dropdown.
          </small>
        </div>

        {/* Use Player Location */}
        <div style={styles.checkboxGroup}>
          <label>
            <input
              type="checkbox"
              checked={usePlayerLocation}
              onChange={(e) => setUsePlayerLocation(e.target.checked)}
            />{" "}
            Use player location (Only available on Android Player 8.1.3 or greater)
          </label>
          <small style={styles.description}>
            Player location will be based on GPS, or location can be manually configured
            at the player settings page. Enabling this feature will override the Forecast
            location field.
          </small>
        </div>

        {/* Temperature Scale */}
        <div style={styles.field}>
          <label>Temperature Scale:</label>
          <select
            value={temperatureScale}
            onChange={(e) => setTemperatureScale(e.target.value)}
            style={styles.input}
          >
            <option value="celsius">Celsius (°C)</option>
            <option value="fahrenheit">Fahrenheit (°F)</option>
          </select>
        </div>

        {/* Font Family */}
        <div style={styles.field}>
          <label>Font Family (optional):</label>
          <select
            value={fontFamily}
            onChange={(e) => setFontFamily(e.target.value)}
            style={styles.input}
          >
            <option value="">Default</option>
            <option value="Arial">Arial</option>
            <option value="Roboto">Roboto</option>
            <option value="Times New Roman">Times New Roman</option>
          </select>
        </div>

        {/* Font Color */}
        <div style={styles.field}>
          <label>Font Color (optional):</label>
          <input
            type="color"
            value={fontColor}
            onChange={(e) => setFontColor(e.target.value)}
          />
        </div>

        {/* Text Shadow */}
        <div style={styles.checkboxGroup}>
          <label>
            <input
              type="checkbox"
              checked={textShadow}
              onChange={(e) => setTextShadow(e.target.checked)}
            />{" "}
            Text Shadow
          </label>
        </div>

        {/* Background Color */}
        <div style={styles.field}>
          <label>Background Color (optional):</label>
          <input
            type="color"
            value={backgroundColor}
            onChange={(e) => setBackgroundColor(e.target.value)}
          />
        </div>

        {/* Background Image */}
        <div style={styles.field}>
          <label>Background Image (optional):</label>
          <input
            type="file"
            onChange={(e) => setBackgroundImage(e.target.files[0])}
          />
        </div>

        {/* Save & Preview */}
        <div style={styles.fixedButtons}>
          <button onClick={handleSave} style={styles.saveBtn}>Save</button>
          <button onClick={() => setShowPopup(true)} style={styles.previewBtn}>Preview</button>
        </div>

        {showPopup && (
          <WeatherImagePopup
            image={backgroundImage ? URL.createObjectURL(backgroundImage) : card.imageSrc}
            duration={5}
            onClose={() => setShowPopup(false)}
          />
        )}
      </div>
    </div>
  );
};

const styles = {
  container: { display: "flex", width: "96%", border: "1px solid #ddd", borderRadius: "8px", overflow: "hidden", marginTop: "1px", position: "relative" },
  left: { flex: 0.35, borderRight: "3px solid #ddd", backgroundColor: "#f5f5f5", display: "flex", flexDirection: "column", alignItems: "center", padding: "10px", overflowY: "auto" },
  right: { flex: 0.65, padding: "15px", display: "flex", flexDirection: "column", position: "relative" },
  image: { width: "100%", height: "200px", objectFit: "cover", borderRadius: "8px", marginBottom: "10px" },
  field: { display: "flex", flexDirection: "column", marginBottom: "10px" },
  input: { padding: "5px", borderRadius: "4px", border: "1px solid #ccc" },
  checkboxGroup: { display: "flex", flexDirection: "column", gap: "5px", marginBottom: "10px" },
  description: { fontSize: "12px", color: "#555", marginTop: "3px" },
  fixedButtons: { position: "absolute", bottom: "10px", right: "10px", display: "flex", gap: "10px" },
  saveBtn: { padding: "8px 12px", backgroundColor: "#005481", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" },
  previewBtn: { padding: "8px 12px", backgroundColor: "#888", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" },
  tag: { padding: "2px 5px", backgroundColor: "#ccc", borderRadius: "4px", display: "flex", alignItems: "center" },
  removeTag: { marginLeft: "5px", backgroundColor: "red", color: "#fff", border: "none", borderRadius: "50%", width: "16px", height: "16px", cursor: "pointer" }
};

export default WeatherApp;
