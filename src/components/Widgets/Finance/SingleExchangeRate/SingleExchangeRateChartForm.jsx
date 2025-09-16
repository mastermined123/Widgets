import React, { useState } from "react";
import SingleExchangeRateChartPopUp from "./SingleExchangeRateChartPopUp";

const SingleExchangeRateChartForm = ({ card }) => {
  const [activeTab, setActiveTab] = useState("settings");

  // Settings Fields
  const [appName, setAppName] = useState("");
  const [tags, setTags] = useState([]);
  const [dataFeed, setDataFeed] = useState(""); // input for tags
  const [baseCurrency, setBaseCurrency] = useState("");
  const [exchangeCurrency, setExchangeCurrency] = useState("");
  const [language, setLanguage] = useState("");
  const [theme, setTheme] = useState("");
  const [customFontColor, setCustomFontColor] = useState("");
  const [customBackgroundColor, setCustomBackgroundColor] = useState("");
  const [customBackgroundImage, setCustomBackgroundImage] = useState(null);

  const [showPopup, setShowPopup] = useState(false);

  // Currency options (dummy with signs)
  const currencyOptions = [
    { code: "USD", name: "US Dollar", sign: "$" },
    { code: "EUR", name: "Euro", sign: "€" },
    { code: "GBP", name: "British Pound Sterling", sign: "£" },
    { code: "JPY", name: "Japanese Yen", sign: "¥" },
    { code: "PKR", name: "Pakistani Rupee", sign: "₨" }
  ];

  // Language options
  const languageOptions = [
    { code: "en", name: "English" },
    { code: "es", name: "Spanish" },
    { code: "fr", name: "French" },
    { code: "de", name: "German" },
    { code: "ar", name: "Arabic" },
    { code: "hi", name: "Hindi" }
  ];

  // Theme options
  const themeOptions = ["Light Theme", "Dark Theme"];

  // Tag handlers
  const addTag = () => {
    if (dataFeed.trim()) {
      setTags([...tags, dataFeed.trim()]);
      setDataFeed("");
    }
  };

  const removeTag = (index) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    console.log({
      appName,
      tags,
      baseCurrency,
      exchangeCurrency,
      language,
      theme,
      customFontColor,
      customBackgroundColor,
      customBackgroundImage
    });
    alert("Saved! Check console.");
  };

  return (
    <div style={styles.container}>
      {/* Left Section */}
      <div style={styles.left}>
        <label style={{ ...styles.field, fontWeight: "bold" }}>{card.title}</label>
        {card.imageSrc && (
          <img src={card.imageSrc} alt={card.title} style={styles.image} />
        )}
        <p>Displays single exchange rate with configurable options.</p>
      </div>

      {/* Right Section */}
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
                  {tag}
                  <button onClick={() => removeTag(i)} style={styles.removeTag}>
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
                onKeyDown={(e) =>
                  e.key === "Enter" && (e.preventDefault(), addTag())
                }
              />
            </div>
          </div>

          {/* Base Currency */}
          <div style={styles.field}>
            <label>Base Currency:</label>
            <select
              value={baseCurrency}
              onChange={(e) => setBaseCurrency(e.target.value)}
              style={styles.input}
            >
              <option value="">Select Base Currency</option>
              {currencyOptions.map((currency) => (
                <option key={currency.code} value={currency.code}>
                  {currency.sign} - {currency.code} ({currency.name})
                </option>
              ))}
            </select>
          </div>

          {/* Exchange Currency */}
          <div style={styles.field}>
            <label>Exchange Currency:</label>
            <select
              value={exchangeCurrency}
              onChange={(e) => setExchangeCurrency(e.target.value)}
              style={styles.input}
            >
              <option value="">Select Exchange Currency</option>
              {currencyOptions.map((currency) => (
                <option key={currency.code} value={currency.code}>
                  {currency.sign} - {currency.code} ({currency.name})
                </option>
              ))}
            </select>
          </div>

          {/* Language */}
          <div style={styles.field}>
            <label>Language:</label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              style={styles.input}
            >
              <option value="">Select Language</option>
              {languageOptions.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.name}
                </option>
              ))}
            </select>
          </div>

          {/* Theme */}
          <div style={styles.field}>
            <label>Theme:</label>
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              style={styles.input}
            >
              <option value="">Select Theme</option>
              {themeOptions.map((themeOption) => (
                <option key={themeOption} value={themeOption}>
                  {themeOption}
                </option>
              ))}
            </select>
          </div>

          {/* Custom Font Color */}
          <div style={styles.field}>
            <label>Custom Font Color (optional):</label>
            <input
              type="color"
              value={customFontColor}
              onChange={(e) => setCustomFontColor(e.target.value)}
              style={styles.colorInput}
            />
          </div>

          {/* Custom Background Color */}
          <div style={styles.field}>
            <label>Custom Background Color (optional):</label>
            <input
              type="color"
              value={customBackgroundColor}
              onChange={(e) => setCustomBackgroundColor(e.target.value)}
              style={styles.colorInput}
            />
          </div>

          {/* Custom Background Image */}
          <div style={styles.field}>
            <label>Custom Background Image (optional):</label>
            <input
              type="file"
              onChange={(e) => setCustomBackgroundImage(e.target.files[0])}
            />
          </div>
        </div>

        {/* Save + Preview Buttons */}
        <div style={styles.fixedButtons}>
          <button onClick={handleSave} style={styles.saveBtn}>
            Save
          </button>
          <button onClick={() => setShowPopup(true)} style={styles.previewBtn}>
            Preview
          </button>
        </div>

        {showPopup && (
          <SingleExchangeRateChartPopUp
            onClose={() => setShowPopup(false)}
            appName={appName}
            tags={tags}
            baseCurrency={baseCurrency}
            exchangeCurrency={exchangeCurrency}
            language={language}
            theme={theme}
            customFontColor={customFontColor}
            customBackgroundColor={customBackgroundColor}
            customBackgroundImage={
              customBackgroundImage
                ? URL.createObjectURL(customBackgroundImage)
                : null
            }
            currencyOptions={currencyOptions}
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
  tabs: { display: "flex", gap: "10px", marginBottom: "15px" },
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
  tabContent: { flex: 1, overflowY: "auto", paddingBottom: "60px" },
  field: { display: "flex", flexDirection: "column", marginBottom: "10px" },
  input: { padding: "5px", borderRadius: "4px", border: "1px solid #ccc" },
  colorInput: {
    padding: "5px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    width: "50px",
    height: "35px"
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

export default SingleExchangeRateChartForm;
