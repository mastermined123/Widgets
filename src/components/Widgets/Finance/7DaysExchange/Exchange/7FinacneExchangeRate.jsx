import React, { useState } from "react";
import FinacneExchangeRatePopUp from "./FinacneExchangeRatePopUp";

const FinacneExchangeRate = ({ card }) => {

    console.log('card',card)
  const [activeTab, setActiveTab] = useState("settings");

  // Settings Fields
  const [appName, setAppName] = useState("");
  const [tags, setTags] = useState([]);
  const [baseCurrency, setBaseCurrency] = useState("");
  const [exchangeCurrency, setExchangeCurrency] = useState("");
  const [theme, setTheme] = useState("");
  const [customFontColor, setCustomFontColor] = useState("");
  const [textFont, setTextFont] = useState("");
  const [divisorColor, setDivisorColor] = useState("");
  const [customBgColor, setCustomBgColor] = useState("");
  const [customBgImage, setCustomBgImage] = useState(null);

  // Language Fields
  const [appLabels, setAppLabels] = useState({
    exchangeRate: "",
    dailyVariation: "",
    weeklyVariation: ""
  });

  const [showPopup, setShowPopup] = useState(false);

  const [dataFeed, setDataFeed] = useState("");

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
      baseCurrency,
      exchangeCurrency,
      theme,
      customFontColor,
      textFont,
      divisorColor,
      customBgColor,
      customBgImage,
      appLabels
    });
    alert("Saved! Check console.");
  };

  return (
    <div style={styles.container}>
      {/* Left Portion */}
      <div style={styles.left}>
        <label style={{ ...styles.field, fontWeight: "bold" }}>{card.title}</label>
        {card.imageSrc && <img src={card.imageSrc} alt={card.title} style={styles.image} />}
        <p>Displays current exchange rate for selected currency and 7 days history chart.</p>
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
                <label>Base Currency:</label>
                <select value={baseCurrency} onChange={e => setBaseCurrency(e.target.value)} style={styles.input}>
                  <option value="">Select Base Currency</option>
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                  <option value="GBP">GBP</option>
                </select>
              </div>

              <div style={styles.field}>
                <label>Exchange Currency:</label>
                <select value={exchangeCurrency} onChange={e => setExchangeCurrency(e.target.value)} style={styles.input}>
                  <option value="">Select Exchange Currency</option>
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                  <option value="GBP">GBP</option>
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
                <label>Custom Font Color (optional):</label>
                <input type="color" value={customFontColor} onChange={e => setCustomFontColor(e.target.value)} />
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
                <label>Choose the color of the divisor line (optional):</label>
                <input type="color" value={divisorColor} onChange={e => setDivisorColor(e.target.value)} />
              </div>

              <div style={styles.field}>
                <label>Custom Background Color (optional):</label>
                <input type="color" value={customBgColor} onChange={e => setCustomBgColor(e.target.value)} />
              </div>

              <div style={styles.field}>
                <label>Custom Background Image (optional):</label>
                <input type="file" onChange={e => setCustomBgImage(e.target.files[0])} />
              </div>
            </div>
          )}

          {activeTab === "language" && (
            <div>
              <div style={styles.field}>
                <label>App Labels</label>
                <p>These labels will be displayed in the app. You can choose to override them if the default translation shown below does not fit your needs.</p>
              </div>

              <div style={styles.field}>
                <label>Exchange Rate Field:</label>
                <input type="text" value={appLabels.exchangeRate} onChange={e => setAppLabels({...appLabels, exchangeRate: e.target.value})} style={styles.input}/>
              </div>

              <div style={styles.field}>
                <label>Daily Variation Field:</label>
                <input type="text" value={appLabels.dailyVariation} onChange={e => setAppLabels({...appLabels, dailyVariation: e.target.value})} style={styles.input}/>
              </div>

              <div style={styles.field}>
                <label>Weekly Variation Field:</label>
                <input type="text" value={appLabels.weeklyVariation} onChange={e => setAppLabels({...appLabels, weeklyVariation: e.target.value})} style={styles.input}/>
              </div>
            </div>
          )}
        </div>

        <div style={styles.fixedButtons}>
          <button onClick={handleSave} style={styles.saveBtn}>Save</button>
          <button onClick={() => setShowPopup(true)} style={styles.previewBtn}>Preview</button>
        </div>

{showPopup && (
  <FinacneExchangeRatePopUp
    image={customBgImage ? URL.createObjectURL(customBgImage) : card.imageSrc}
    duration={50}
    onClose={() => setShowPopup(false)}
    baseCurrency={baseCurrency}
    exchangeCurrency={exchangeCurrency}
    theme={theme}
    customFontColor={customFontColor}
    textFont={textFont}
    divisorColor={divisorColor}
    customBgColor={customBgColor}
    appLabels={appLabels}
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
  previewBoxes: { display: "flex", gap: "10px", marginTop: "10px", marginBottom: "20px" },
  box: { backgroundColor: "#ddd", display: "flex", justifyContent: "center", alignItems: "center", borderRadius: "4px" },
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
  removeTag: { marginLeft: "5px", backgroundColor: "red", color: "#fff", border: "none", borderRadius: "50%", width: "16px", height: "16px", cursor: "pointer" }
};

export default FinacneExchangeRate;