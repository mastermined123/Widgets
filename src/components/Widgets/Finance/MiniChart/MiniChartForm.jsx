import React, { useState } from "react";
import MiniChartPopUp from "./MiniChartChartPopUp";

const MiniChartForm = ({ card }) => {

  const [activeTab, setActiveTab] = useState("settings");

  // Settings Fields
  const [appName, setAppName] = useState("");
  const [tags, setTags] = useState([]); // optional tags
  const [dataFeed, setDataFeed] = useState(""); // input for tags
  const [symbol, setSymbol] = useState("");
  const [dateRange, setDateRange] = useState("");
  const [theme, setTheme] = useState("");
  const [transparentBackground, setTransparentBackground] = useState(false);
  const [priceLineColor, setPriceLineColor] = useState("");
  const [underLineAreaTopColor, setUnderLineAreaTopColor] = useState("");
  const [underLineAreaBottomColor, setUnderLineAreaBottomColor] = useState("");
  const [locale, setLocale] = useState("");

  const [showPopup, setShowPopup] = useState(false);

  // Date Range options
  const dateRangeOptions = [
    "1 Day",
    "1 Month", 
    "1 Year",
    "5 years",
    "All"
  ];

  // Theme options
  const themeOptions = [
    "Light",
    "Dark"
  ];

  // Locale options (all languages)
  const localeOptions = [
    { code: "en", name: "English" },
    { code: "es", name: "Spanish" },
    { code: "fr", name: "French" },
    { code: "de", name: "German" },
    { code: "it", name: "Italian" },
    { code: "pt", name: "Portuguese" },
    { code: "ru", name: "Russian" },
    { code: "zh", name: "Chinese" },
    { code: "ja", name: "Japanese" },
    { code: "ar", name: "Arabic" },
    { code: "ko", name: "Korean" },
    { code: "hi", name: "Hindi" },
    { code: "th", name: "Thai" },
    { code: "tr", name: "Turkish" },
    { code: "pl", name: "Polish" },
    { code: "nl", name: "Dutch" },
    { code: "sv", name: "Swedish" },
    { code: "da", name: "Danish" },
    { code: "no", name: "Norwegian" },
    { code: "fi", name: "Finnish" },
    { code: "he", name: "Hebrew" },
    { code: "cs", name: "Czech" },
    { code: "hu", name: "Hungarian" },
    { code: "ro", name: "Romanian" },
    { code: "bg", name: "Bulgarian" },
    { code: "hr", name: "Croatian" },
    { code: "sk", name: "Slovak" },
    { code: "sl", name: "Slovenian" },
    { code: "et", name: "Estonian" },
    { code: "lv", name: "Latvian" },
    { code: "lt", name: "Lithuanian" },
    { code: "uk", name: "Ukrainian" },
    { code: "vi", name: "Vietnamese" },
    { code: "id", name: "Indonesian" },
    { code: "ms", name: "Malay" },
    { code: "tl", name: "Filipino" },
    { code: "bn", name: "Bengali" },
    { code: "ur", name: "Urdu" },
    { code: "fa", name: "Persian" },
    { code: "sw", name: "Swahili" },
    { code: "am", name: "Amharic" },
    { code: "zu", name: "Zulu" },
    { code: "af", name: "Afrikaans" }
  ];

  // Tag handlers for optional tags
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
      symbol,
      dateRange,
      theme,
      transparentBackground,
      priceLineColor,
      underLineAreaTopColor,
      underLineAreaBottomColor,
      locale
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
              <label>Symbol:</label>
              <input
                type="text"
                value={symbol}
                onChange={e => setSymbol(e.target.value)}
                style={styles.input}
                placeholder="E.g.: FX:EURUSD or EURUSD"
              />
              <p style={styles.helpText}>
                The exchange symbol and/or stock market symbol with a colon between them. E.g.: FX:EURUSD or EURUSD.
              </p>
            </div>

            <div style={styles.field}>
              <label>Date Range:</label>
              <select value={dateRange} onChange={e => setDateRange(e.target.value)} style={styles.input}>
                <option value="">Select Date Range</option>
                {dateRangeOptions.map(range => (
                  <option key={range} value={range}>{range}</option>
                ))}
              </select>
            </div>

            <div style={styles.field}>
              <label>Theme:</label>
              <select value={theme} onChange={e => setTheme(e.target.value)} style={styles.input}>
                <option value="">Select Theme</option>
                {themeOptions.map(themeOption => (
                  <option key={themeOption} value={themeOption}>{themeOption}</option>
                ))}
              </select>
            </div>

            <div style={styles.checkboxGroup}>
              <label><input type="checkbox" checked={transparentBackground} onChange={e => setTransparentBackground(e.target.checked)} /> Transparent Background</label>
            </div>

            <div style={styles.field}>
              <label>Price Line (optional):</label>
              <input 
                type="color" 
                value={priceLineColor} 
                onChange={e => setPriceLineColor(e.target.value)} 
                style={styles.colorInput}
              />
            </div>

            <div style={styles.field}>
              <label>Under Line Area Top (optional):</label>
              <input 
                type="color" 
                value={underLineAreaTopColor} 
                onChange={e => setUnderLineAreaTopColor(e.target.value)} 
                style={styles.colorInput}
              />
            </div>

            <div style={styles.field}>
              <label>Under Line Area Bottom (optional):</label>
              <input 
                type="color" 
                value={underLineAreaBottomColor} 
                onChange={e => setUnderLineAreaBottomColor(e.target.value)} 
                style={styles.colorInput}
              />
            </div>

            <div style={styles.field}>
              <label>Locale:</label>
              <select value={locale} onChange={e => setLocale(e.target.value)} style={styles.input}>
                <option value="">Select Locale</option>
                {localeOptions.map(localeOption => (
                  <option key={localeOption.code} value={localeOption.code}>{localeOption.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div style={styles.fixedButtons}>
          <button onClick={handleSave} style={styles.saveBtn}>Save</button>
          <button onClick={() => setShowPopup(true)} style={styles.previewBtn}>Preview</button>
        </div>

        {showPopup && (
          <MiniChartPopUp
            onClose={() => setShowPopup(false)}
            appName={appName}
            tags={tags}
            symbol={symbol}
            dateRange={dateRange}
            theme={theme}
            transparentBackground={transparentBackground}
            priceLineColor={priceLineColor}
            underLineAreaTopColor={underLineAreaTopColor}
            underLineAreaBottomColor={underLineAreaBottomColor}
            locale={locale}
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
  image: { width: "100%", height: "200px", objectFit: "contain", borderRadius: "8px", marginBottom: "10px" },
  tabs: { display: "flex", gap: "10px", marginBottom: "15px" },
  tab: { padding: "5px 15px", cursor: "pointer", backgroundColor: "#eee", border: "none", borderRadius: "4px" },
  activeTab: { padding: "5px 15px", cursor: "pointer", backgroundColor: "#005481", color: "#fff", border: "none", borderRadius: "4px" },
  tabContent: { flex: 1, overflowY: "auto", paddingBottom: "60px" },
  field: { display: "flex", flexDirection: "column", marginBottom: "10px" },
  input: { padding: "5px", borderRadius: "4px", border: "1px solid #ccc" },
  colorInput: { padding: "5px", borderRadius: "4px", border: "1px solid #ccc", width: "50px", height: "35px" },
  fixedButtons: { position: "absolute", bottom: "10px", right: "10px", display: "flex", gap: "10px" },
  saveBtn: { padding: "8px 12px", backgroundColor: "#005481", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" },
  previewBtn: { padding: "8px 12px", backgroundColor: "#888", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" },
  tag: { padding: "2px 5px", backgroundColor: "#ccc", borderRadius: "4px", display: "flex", alignItems: "center" },
  removeTag: { marginLeft: "5px", backgroundColor: "red", color: "#fff", border: "none", borderRadius: "50%", width: "16px", height: "16px", cursor: "pointer" },
  checkboxGroup: { display: "flex", flexDirection: "column", gap: "5px", marginBottom: "10px" },
  helpText: { fontSize: "12px", color: "#666", marginTop: "5px", marginBottom: "10px" }
};

export default MiniChartForm;