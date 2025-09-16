import React, { useState } from "react";
import MultiCurrencyExchangeRateChartPopUp from "./MultiCurrencyExchangeRateChartPopUp";

const MultiCurrenctExchangeRateChartForm = ({ card }) => {

  const [activeTab, setActiveTab] = useState("settings");

  // Settings Fields - Simplified as per requirements
  const [appName, setAppName] = useState("");
  const [tags, setTags] = useState([]); // optional tags
  const [dataFeed, setDataFeed] = useState(""); // input for tags
  const [baseCurrency, setBaseCurrency] = useState("");
  const [exchangeCurrencies, setExchangeCurrencies] = useState([]); // multiple select
  const [selectedExchangeCurrency, setSelectedExchangeCurrency] = useState("");
  const [showEachCurrencyFor, setShowEachCurrencyFor] = useState(""); // seconds
  const [language, setLanguage] = useState("");
  const [theme, setTheme] = useState("");
  const [customFontColor, setCustomFontColor] = useState("");
  const [customBackgroundColor, setCustomBackgroundColor] = useState("");
  const [customBackgroundImage, setCustomBackgroundImage] = useState(null);

  const [showPopup, setShowPopup] = useState(false);

  // Currency options for multiple select
const currencyOptions = [
  { code: "AED", name: "United Arab Emirates Dirham", sign: "د.إ" },
  { code: "AFN", name: "Afghan Afghani", sign: "؋" },
  { code: "ALL", name: "Albanian Lek", sign: "L" },
  { code: "AMD", name: "Armenian Dram", sign: "֏" },
  { code: "ANG", name: "Netherlands Antillean Guilder", sign: "ƒ" },
  { code: "AOA", name: "Angolan Kwanza", sign: "Kz" },
  { code: "ARS", name: "Argentine Peso", sign: "$" },
  { code: "AUD", name: "Australian Dollar", sign: "A$" },
  { code: "AWG", name: "Aruban Florin", sign: "ƒ" },
  { code: "AZN", name: "Azerbaijani Manat", sign: "₼" },
  { code: "BAM", name: "Bosnia-Herzegovina Convertible Mark", sign: "KM" },
  { code: "BBD", name: "Barbadian Dollar", sign: "Bds$" },
  { code: "BDT", name: "Bangladeshi Taka", sign: "৳" },
  { code: "BGN", name: "Bulgarian Lev", sign: "лв" },
  { code: "BHD", name: "Bahraini Dinar", sign: ".د.ب" },
  { code: "BIF", name: "Burundian Franc", sign: "FBu" },
  { code: "BMD", name: "Bermudan Dollar", sign: "BD$" },
  { code: "BND", name: "Brunei Dollar", sign: "B$" },
  { code: "BOB", name: "Bolivian Boliviano", sign: "Bs." },
  { code: "BRL", name: "Brazilian Real", sign: "R$" },
  { code: "BSD", name: "Bahamian Dollar", sign: "B$" },
  { code: "BTC", name: "Bitcoin", sign: "₿" },
  { code: "BTN", name: "Bhutanese Ngultrum", sign: "Nu." },
  { code: "BWP", name: "Botswanan Pula", sign: "P" },
  { code: "BYN", name: "Belarusian Ruble", sign: "Br" },
  { code: "BZD", name: "Belize Dollar", sign: "BZ$" },
  { code: "CAD", name: "Canadian Dollar", sign: "CA$" },
  { code: "CDF", name: "Congolese Franc", sign: "FC" },
  { code: "CHF", name: "Swiss Franc", sign: "CHF" },
  { code: "CLF", name: "Chilean Unit of Account (UF)", sign: "UF" },
  { code: "CLP", name: "Chilean Peso", sign: "$" },
  { code: "CNY", name: "Chinese Yuan", sign: "¥" },
  { code: "COP", name: "Colombian Peso", sign: "$" },
  { code: "CRC", name: "Costa Rican Colón", sign: "₡" },
  { code: "EUR", name: "Euro", sign: "€" },
  { code: "GBP", name: "British Pound Sterling", sign: "£" },
  { code: "JPY", name: "Japanese Yen", sign: "¥" },
  { code: "USD", name: "US Dollar", sign: "$" },
  { code: "PKR", name: "Pakistani Rupee", sign: "₨" }
];

  // Language options
  const languageOptions = [
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
    { code: "fi", name: "Finnish" }
  ];

  // Theme options
  const themeOptions = [
    "Dark",
    "Light"
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

  // Exchange currency handlers
  const addExchangeCurrency = () => {
    if (selectedExchangeCurrency && !exchangeCurrencies.includes(selectedExchangeCurrency)) {
      setExchangeCurrencies([...exchangeCurrencies, selectedExchangeCurrency]);
      setSelectedExchangeCurrency("");
    }
  };

  const removeExchangeCurrency = (currency) => {
    setExchangeCurrencies(exchangeCurrencies.filter(c => c !== currency));
  };

  const handleSave = () => {
    console.log({
      appName,
      tags,
      baseCurrency,
      exchangeCurrencies,
      showEachCurrencyFor,
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
              <label>Base Currency:</label>
              <select value={baseCurrency} onChange={e => setBaseCurrency(e.target.value)} style={styles.input}>
                <option value="">Select Base Currency</option>
                {currencyOptions.map(currency => (
                  <option key={currency.code} value={currency.code}>{currency.code} - {currency.name}</option>
                ))}
              </select>
            </div>

            <div style={styles.field}>
              <label>Exchange Currencies (add multiples):</label>
              <div style={{ display: "flex", gap: "5px", marginBottom: "5px" }}>
                <select 
                  value={selectedExchangeCurrency} 
                  onChange={e => setSelectedExchangeCurrency(e.target.value)} 
                  style={{ ...styles.input, flex: "1" }}
                >
                  <option value="">Select Currency to Add</option>
                  {currencyOptions.map(currency => (
                    <option key={currency.code} value={currency.code}>{currency.code} - {currency.name}</option>
                  ))}
                </select>
                <button onClick={addExchangeCurrency} style={styles.addBtn}>Add</button>
              </div>
              <div style={{ display: "flex", gap: "5px", flexWrap: "wrap" }}>
                {exchangeCurrencies.map((currency, i) => (
                  <span key={i} style={styles.tag}>
                    {currency} <button onClick={() => removeExchangeCurrency(currency)} style={styles.removeTag}>x</button>
                  </span>
                ))}
              </div>
            </div>

            <div style={styles.field}>
              <label>Show each currency for (seconds):</label>
              <input
                type="number"
                value={showEachCurrencyFor}
                onChange={e => setShowEachCurrencyFor(e.target.value)}
                style={styles.input}
                placeholder="Enter duration in seconds"
              />
            </div>

            <div style={styles.field}>
              <label>Language:</label>
              <select value={language} onChange={e => setLanguage(e.target.value)} style={styles.input}>
                <option value="">Select Language</option>
                {languageOptions.map(lang => (
                  <option key={lang.code} value={lang.code}>{lang.name}</option>
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

            <div style={styles.field}>
              <label>Custom Font Color (optional):</label>
              <input 
                type="color" 
                value={customFontColor} 
                onChange={e => setCustomFontColor(e.target.value)} 
                style={styles.colorInput}
              />
            </div>

            <div style={styles.field}>
              <label>Custom Background Color (optional):</label>
              <input 
                type="color" 
                value={customBackgroundColor} 
                onChange={e => setCustomBackgroundColor(e.target.value)} 
                style={styles.colorInput}
              />
            </div>

            <div style={styles.field}>
              <label>Custom Background Image (optional):</label>
              <input type="file" onChange={e => setCustomBackgroundImage(e.target.files[0])} />
            </div>
          </div>
        </div>

        <div style={styles.fixedButtons}>
          <button onClick={handleSave} style={styles.saveBtn}>Save</button>
          <button onClick={() => setShowPopup(true)} style={styles.previewBtn}>Preview</button>
        </div>

        {showPopup && (
          <MultiCurrencyExchangeRateChartPopUp
            onClose={() => setShowPopup(false)}
            appName={appName}
            tags={tags}
            baseCurrency={baseCurrency}
            exchangeCurrencies={exchangeCurrencies}
            showEachCurrencyFor={showEachCurrencyFor}
            language={language}
            theme={theme}
            customFontColor={customFontColor}
            customBackgroundColor={customBackgroundColor}
            customBackgroundImage={customBackgroundImage ? URL.createObjectURL(customBackgroundImage) : null}
            currencyOptions={currencyOptions}
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
  addBtn: { padding: "5px 10px", backgroundColor: "#005481", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" },
  tag: { padding: "2px 5px", backgroundColor: "#ccc", borderRadius: "4px", display: "flex", alignItems: "center" },
  removeTag: { marginLeft: "5px", backgroundColor: "red", color: "#fff", border: "none", borderRadius: "50%", width: "16px", height: "16px", cursor: "pointer" }
};

export default MultiCurrenctExchangeRateChartForm;