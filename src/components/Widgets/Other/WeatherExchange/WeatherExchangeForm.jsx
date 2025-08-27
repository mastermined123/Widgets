/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import WeatherExchangepopUp from "./WeatherExchangePopUp";

const WeatherExchangeForm = ({ card }) => {
  const [appName, setAppName] = useState("");
  const [tags, setTags] = useState([]);
  const [dataFeed, setDataFeed] = useState("");
  const [forecastLocation, setForecastLocation] = useState("");
  const [locationLabel, setLocationLabel] = useState("");
  const [usePlayerLocation, setUsePlayerLocation] = useState(false);
  const [units, setUnits] = useState("Celsius");
  const [baseCurrency, setBaseCurrency] = useState("USD");
  const [exchangeCurrency, setExchangeCurrency] = useState("EUR");
  const [exchangeLabel, setExchangeLabel] = useState("");
  const [logo, setLogo] = useState(null);
  const [cityLabelColor, setCityLabelColor] = useState("#000000");
  const [fontSize, setFontSize] = useState(100);
  const [textFont, setTextFont] = useState("Arial");
  const [logoBgColor, setLogoBgColor] = useState("#ffffff");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [textColor, setTextColor] = useState("#000000");
  const [bgImage, setBgImage] = useState(null);

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
      locationLabel,
      usePlayerLocation,
      units,
      baseCurrency,
      exchangeCurrency,
      exchangeLabel,
      logo,
      cityLabelColor,
      fontSize,
      textFont,
      logoBgColor,
      bgColor,
      textColor,
      bgImage
    });
    alert("Saved! Check console.");
  };

  return (
    <div style={styles.container}>
      <div style={styles.left}>
        <label style={{ ...styles.field, fontWeight: "bold" }}>{card.title}</label>
        {card.imageSrc && <img src={card.imageSrc} alt={card.title} style={styles.image} />}
        <p>This app will display weather and exchange info.</p>
      </div>

      <div style={styles.right}>
        <div style={styles.tabContent}>
          {/* App Name */}
          <div style={styles.field}>
            <label>App Name:</label>
            <input type="text" value={appName} onChange={e => setAppName(e.target.value)} style={styles.input} />
          </div>

          {/* Tags */}
          <div style={styles.field}>
            <label>Tags (optional):</label>
            <div style={{ display: "flex", gap: "5px", flexWrap: "wrap" }}>
              {tags.map((tag, i) => (
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

          {/* Forecast Location */}
          <div style={styles.field}>
            <label>Forecast Location:</label>
            <input type="text" value={forecastLocation} onChange={e => setForecastLocation(e.target.value)} style={styles.input} />
          </div>

          {/* Location Label */}
          <div style={styles.field}>
            <label>Location Label (optional):</label>
            <input type="text" value={locationLabel} onChange={e => setLocationLabel(e.target.value)} style={styles.input} />
          </div>

          {/* Use Player Location */}
          <div style={styles.field}>
            <label>
              <input type="checkbox" checked={usePlayerLocation} onChange={e => setUsePlayerLocation(e.target.checked)} /> Use player location (Android 8.1.3+)
            </label>
            <p style={{ fontSize: "12px", color: "#666" }}>
              Player location will be based on GPS, or location can be manually configured at the player settings page. Enabling this feature will override the Forecast location field.
            </p>
          </div>

          {/* Units */}
          <div style={styles.field}>
            <label>Units:</label>
            <select value={units} onChange={e => setUnits(e.target.value)} style={styles.input}>
              <option value="Celsius">Celsius</option>
              <option value="Fahrenheit">Fahrenheit</option>
            </select>
          </div>

          {/* Base Currency */}
          <div style={styles.field}>
            <label>Base Currency:</label>
            <select value={baseCurrency} onChange={e => setBaseCurrency(e.target.value)} style={styles.input}>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
            </select>
          </div>

          {/* Exchange Currency */}
          <div style={styles.field}>
            <label>Exchange Currency:</label>
            <select value={exchangeCurrency} onChange={e => setExchangeCurrency(e.target.value)} style={styles.input}>
              <option value="EUR">EUR</option>
              <option value="USD">USD</option>
              <option value="GBP">GBP</option>
            </select>
          </div>

          {/* Exchange Label */}
          <div style={styles.field}>
            <label>Exchange Label (optional):</label>
            <input type="text" value={exchangeLabel} onChange={e => setExchangeLabel(e.target.value)} style={styles.input} />
          </div>

          {/* Logo */}
          <div style={styles.field}>
            <label>Logo (optional):</label>
            <input type="file" accept="image/*" onChange={e => setLogo(e.target.files[0])} />
          </div>

          {/* City label color */}
          <div style={styles.field}>
            <label>City label color (optional):</label>
            <input type="color" value={cityLabelColor} onChange={e => setCityLabelColor(e.target.value)} />
          </div>

          {/* Font size */}
          <div style={styles.field}>
            <label>Font size (%) (optional):</label>
            <input type="number" value={fontSize} onChange={e => setFontSize(e.target.value)} style={styles.input} />
          </div>

          {/* Text font */}
          <div style={styles.field}>
            <label>Text font (optional):</label>
            <select value={textFont} onChange={e => setTextFont(e.target.value)} style={styles.input}>
              <option value="Arial">Arial</option>
              <option value="Helvetica">Helvetica</option>
              <option value="Times New Roman">Times New Roman</option>
            </select>
          </div>

          {/* Logo bg color */}
          <div style={styles.field}>
            <label>Logo background color (optional):</label>
            <input type="color" value={logoBgColor} onChange={e => setLogoBgColor(e.target.value)} />
          </div>

          {/* Background color */}
          <div style={styles.field}>
            <label>Background color (optional):</label>
            <input type="color" value={bgColor} onChange={e => setBgColor(e.target.value)} />
          </div>

          {/* Text color */}
          <div style={styles.field}>
            <label>Text color (optional):</label>
            <input type="color" value={textColor} onChange={e => setTextColor(e.target.value)} />
          </div>

          {/* Background Image */}
          <div style={styles.field}>
            <label>Background Image (optional):</label>
            <input type="file" onChange={e => setBgImage(e.target.files[0])} />
          </div>
        </div>

        <div style={styles.fixedButtons}>
          <button onClick={handleSave} style={styles.saveBtn}>Save</button>
          <button onClick={() => setShowPopup(true)} style={styles.previewBtn}>Preview</button>
        </div>

        {showPopup && (
          <WeatherExchangepopUp
            text="Perspiciatis enim p MAX 34° MIN 26° 16:32 Voluptates nisi labo EUR $1.16 0.02% 16:32"
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
  tag: { padding: "2px 5px", backgroundColor: "#ccc", borderRadius: "4px", display: "flex", alignItems: "center" },
  removeTag: { marginLeft: "5px", backgroundColor: "red", color: "#fff", border: "none", borderRadius: "50%", width: "16px", height: "16px", cursor: "pointer" },
  fixedButtons: { position: "absolute", bottom: "10px", right: "10px", display: "flex", gap: "10px" },
  saveBtn: { padding: "8px 12px", backgroundColor: "#005481", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" },
  previewBtn: { padding: "8px 12px", backgroundColor: "#888", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" },
};

export default WeatherExchangeForm;
