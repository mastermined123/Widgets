import React, { useState } from "react";
import ExchangeRatePopUp from "./ExchangeRatePopUp";

const ExchangeRateForm = ({ card }) => {

  const [activeTab, setActiveTab] = useState("settings");

  // Settings Fields
  const [appName, setAppName] = useState("");
  const [tags, setTags] = useState([]); // for multiple exchange currencies
  const [dataFeed, setDataFeed] = useState(""); // input for exchange currency tags
  const [baseCurrency, setBaseCurrency] = useState("");
  const [variation, setVariation] = useState(""); // percentage / absolute
  const [decimalPlaces, setDecimalPlaces] = useState("");
  const [currencyFormat, setCurrencyFormat] = useState("");
  const [theme, setTheme] = useState("");
  const [textFont, setTextFont] = useState("");
  const [customTextColor, setCustomTextColor] = useState("");
  const [textShadow, setTextShadow] = useState(false);
  const [backgroundGradient, setBackgroundGradient] = useState(false);
  const [customBgColor, setCustomBgColor] = useState("");
  const [customBgImage, setCustomBgImage] = useState(null);
  const [scrollSpeed, setScrollSpeed] = useState("");

  const [showPopup, setShowPopup] = useState(false);

  // Tag handlers for multiple exchange currencies
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
      baseCurrency,
      exchangeCurrencies: tags,
      variation,
      decimalPlaces,
      currencyFormat,
      theme,
      textFont,
      customTextColor,
      textShadow,
      backgroundGradient,
      customBgColor,
      customBgImage,
      scrollSpeed
    });
    alert("Saved! Check console.");
  };

  return (
    <div style={styles.container}>
      {/* Left Portion */}
      <div style={styles.left}>
        <label style={{ ...styles.field, fontWeight: "bold" }}>{card.title}</label>
        {card.imageSrc && <img src={card.imageSrc} alt={card.title} style={styles.image} />}
        <p>Displays current exchange rate with configurable display options.</p>
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
              <label>Exchange Currencies (multiple):</label>
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
                  placeholder="Enter currency code"
                  style={{ ...styles.input, flex: "1" }}
                  onKeyDown={e => e.key === "Enter" && (e.preventDefault(), addTag())}
                />
              </div>
            </div>

            <div style={styles.field}>
              <label>Base Currency:</label>
              <select value={baseCurrency} onChange={e => setBaseCurrency(e.target.value)} style={styles.input}>
                <option value="">Select Base Currency</option>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
              </select>
            </div>

            <div style={styles.field}>
              <label>Variation:</label>
              <select value={variation} onChange={e => setVariation(e.target.value)} style={styles.input}>
                <option value="">Select Variation</option>
                <option value="percentage">Percentage</option>
                <option value="absolute">Absolute</option>
              </select>
            </div>

            <div style={styles.field}>
              <label>Decimal Places:</label>
              <select value={decimalPlaces} onChange={e => setDecimalPlaces(e.target.value)} style={styles.input}>
                <option value="">Select Decimal Places</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
            </div>

            <div style={styles.field}>
              <label>Currency Format:</label>
              <select value={currencyFormat} onChange={e => setCurrencyFormat(e.target.value)} style={styles.input}>
                <option value="">Select Format</option>
                <option value="1,234,567,890.12">1,234,567,890.12</option>
                <option value="1.234.567.890,12">1.234.567.890,12</option>
              </select>
            </div>

            <div style={styles.field}>
              <label>Theme:</label>
              <select value={theme} onChange={e => setTheme(e.target.value)} style={styles.input}>
                <option value="">Select Theme</option>
                <option value="light">Light</option>
                <option value="dark">Dark</option>
              </select>
            </div>

            <div style={styles.field}>
              <label>Text Font (optional):</label>
              <select value={textFont} onChange={e => setTextFont(e.target.value)} style={styles.input}>
                <option value="">Select Font</option>
                <option value="Arial">Arial</option>
                <option value="Verdana">Verdana</option>
                <option value="Times New Roman">Times New Roman</option>
              </select>
            </div>

            <div style={styles.field}>
              <label>Custom Text Color (optional):</label>
              <input type="color" value={customTextColor} onChange={e => setCustomTextColor(e.target.value)} />
            </div>

            <div style={styles.checkboxGroup}>
              <label><input type="checkbox" checked={textShadow} onChange={e => setTextShadow(e.target.checked)} /> Text Shadow</label>
              <label><input type="checkbox" checked={backgroundGradient} onChange={e => setBackgroundGradient(e.target.checked)} /> Background Gradient</label>
            </div>

            <div style={styles.field}>
              <label>Custom Background Color (optional):</label>
              <input type="color" value={customBgColor} onChange={e => setCustomBgColor(e.target.value)} />
            </div>

            <div style={styles.field}>
              <label>Custom Background Image (optional):</label>
              <input type="file" onChange={e => setCustomBgImage(e.target.files[0])} />
            </div>

            <div style={styles.field}>
              <label>Scroll Speed:</label>
              <select value={scrollSpeed} onChange={e => setScrollSpeed(e.target.value)} style={styles.input}>
                <option value="">Select Scroll Speed</option>
                <option value="default">Default</option>
                <option value="slow">Slow</option>
                <option value="fast">Fast</option>
              </select>
            </div>
          </div>
        </div>

        <div style={styles.fixedButtons}>
          <button onClick={handleSave} style={styles.saveBtn}>Save</button>
          <button onClick={() => setShowPopup(true)} style={styles.previewBtn}>Preview</button>
        </div>

// In the parent component, replace the ExchangeRatePopUp usage with this:
{showPopup && (
  <ExchangeRatePopUp
    onClose={() => setShowPopup(false)}
    baseCurrency={baseCurrency}
    exchangeCurrencies={tags}
    variation={variation}
    decimalPlaces={parseInt(decimalPlaces) || 2}
    currencyFormat={currencyFormat === "1.234.567.890,12" ? "de-DE" : "en-US"}
    theme={theme}
    textFont={textFont}
    customTextColor={customTextColor}
    textShadow={textShadow}
    backgroundGradient={backgroundGradient}
    customBgColor={customBgColor}
    customBgImage={customBgImage ? URL.createObjectURL(customBgImage) : null}
    scrollSpeed={scrollSpeed}
  />
)}      </div>
    </div>
  );
};

const styles = {
  container: { display: "flex", width: "96%", border: "1px solid #ddd", borderRadius: "8px", overflow: "hidden", marginTop: "1px", position: "relative" },
  left: { flex: 0.35, borderRight: "3px solid #ddd", backgroundColor: "#f5f5f5", display: "flex", flexDirection: "column", alignItems: "center", padding: "10px", overflowY: "auto" },
  right: { flex: 0.65, padding: "15px", display: "flex", flexDirection: "column", position: "relative" },
  image: { width: "100%", height: "200px", objectFit: "cover", borderRadius: "8px", marginBottom: "10px" },
  tabs: { display: "flex", gap: "10px", marginBottom: "15px" },
  tab: { padding: "5px 15px", cursor: "pointer", backgroundColor: "#eee", border: "none", borderRadius: "4px" },
  activeTab: { padding: "5px 15px", cursor: "pointer", backgroundColor: "#005481", color: "#fff", border: "none", borderRadius: "4px" },
  tabContent: { flex: 1, overflowY: "auto" },
  field: { display: "flex", flexDirection: "column", marginBottom: "10px" },
  input: { padding: "5px", borderRadius: "4px", border: "1px solid #ccc" },
  fixedButtons: { position: "absolute", bottom: "10px", right: "10px", display: "flex", gap: "10px" },
  saveBtn: { padding: "8px 12px", backgroundColor: "#005481", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" },
  previewBtn: { padding: "8px 12px", backgroundColor: "#888", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" },
  tag: { padding: "2px 5px", backgroundColor: "#ccc", borderRadius: "4px", display: "flex", alignItems: "center" },
  removeTag: { marginLeft: "5px", backgroundColor: "red", color: "#fff", border: "none", borderRadius: "50%", width: "16px", height: "16px", cursor: "pointer" },
  checkboxGroup: { display: "flex", flexDirection: "column", gap: "5px", marginBottom: "10px" }
};

export default ExchangeRateForm;
