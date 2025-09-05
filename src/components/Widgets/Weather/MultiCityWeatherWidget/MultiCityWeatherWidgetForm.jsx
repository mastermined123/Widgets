/* eslint-disable no-unused-vars */
// MultiCityWeatherForm.jsx
import React, { useState } from "react";
import MultiCityWeatherWidgetPopUp from "./MultiCityWeatherWidgetPopup";

const MultiCityWeatherWidgetForm = ({ card }) => {
  console.log('card', card);
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
  const [textFont, setTextFont] = useState("Arial");
  const [fontColor, setFontColor] = useState("#000000");
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
      firstForecastLocation,
      firstCityLabel,
      secondForecastLocation,
      secondCityLabel,
      thirdForecastLocation,
      thirdCityLabel,
      temperatureScale,
      textFont,
      fontColor,
      customBgColor,
      customBgImage
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
        <div style={styles.header}>
          <h3>Settings</h3>
        </div>

        <div style={styles.content}>
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
        </div>

        <div style={styles.fixedButtons}>
          <button onClick={handleSave} style={styles.saveBtn}>Save</button>
          <button onClick={() => setShowPopup(true)} style={styles.previewBtn}>Preview</button>
        </div>

        {showPopup && (
          <MultiCityWeatherWidgetPopUp
            image={customBgImage ? URL.createObjectURL(customBgImage) : card.imageSrc}
            onClose={() => setShowPopup(false)}
            fontColor={fontColor}
            customBgColor={customBgColor}
            textFont={textFont}
            temperatureScale={temperatureScale}
            locations={[firstForecastLocation, secondForecastLocation, thirdForecastLocation]}
            cityLabels={[firstCityLabel, secondCityLabel, thirdCityLabel]}
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
  header: {
    marginBottom: "15px",
    paddingBottom: "10px",
    borderBottom: "2px solid #005481"
  },
  content: {
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

export default MultiCityWeatherWidgetForm;