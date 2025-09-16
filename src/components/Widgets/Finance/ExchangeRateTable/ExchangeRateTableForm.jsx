/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import ExchangeRateTablePopUp from "./ExchangeRateTablePopUp";

const ExchangeRateTableForm = ({ card }) => {

  const [activeTab, setActiveTab] = useState("settings");

  // Settings Fields
  const [appName, setAppName] = useState("");
  const [tags, setTags] = useState([]); // optional tags
  const [dataFeed, setDataFeed] = useState(""); // input for tags
  const [baseCurrency, setBaseCurrency] = useState("");
  const [exchangeCurrencies, setExchangeCurrencies] = useState([]); // multiple select
  const [selectedExchangeCurrency, setSelectedExchangeCurrency] = useState("");
  const [headerText, setHeaderText] = useState("");
  const [logoImage, setLogoImage] = useState(null);
  const [transition, setTransition] = useState("");
  const [headerColor, setHeaderColor] = useState("");
  const [tableColor, setTableColor] = useState("");
  const [textFont, setTextFont] = useState("");
  const [textColor, setTextColor] = useState("");
  const [backgroundColor, setBackgroundColor] = useState("");
  const [backgroundImage, setBackgroundImage] = useState(null);
  const [animateBackgroundImage, setAnimateBackgroundImage] = useState(false);

  // Language Fields
  const [language, setLanguage] = useState("");
  const [currencyLabels, setCurrencyLabels] = useState({});

  const [showPopup, setShowPopup] = useState(false);

  // Currency options for multiple select
  const currencyOptions = [
    { code: "AED", name: "United Arab Emirates Dirham" },
    { code: "AFN", name: "Afghan Afghani" },
    { code: "ALL", name: "Albanian Lek" },
    { code: "AMD", name: "Armenian Dram" },
    { code: "ANG", name: "Netherlands Antillean Guilder" },
    { code: "AOA", name: "Angolan Kwanza" },
    { code: "ARS", name: "Argentine Peso" },
    { code: "AUD", name: "Australian Dollar" },
    { code: "AWG", name: "Aruban Florin" },
    { code: "AZN", name: "Azerbaijani Manat" },
    { code: "BAM", name: "Bosnia-Herzegovina Convertible Mark" },
    { code: "BBD", name: "Barbadian Dollar" },
    { code: "BDT", name: "Bangladeshi Taka" },
    { code: "BGN", name: "Bulgarian Lev" },
    { code: "BHD", name: "Bahraini Dinar" },
    { code: "BIF", name: "Burundian Franc" },
    { code: "BMD", name: "Bermudan Dollar" },
    { code: "BND", name: "Brunei Dollar" },
    { code: "BOB", name: "Bolivian Boliviano" },
    { code: "BRL", name: "Brazilian Real" },
    { code: "BSD", name: "Bahamian Dollar" },
    { code: "BTC", name: "Bitcoin" },
    { code: "BTN", name: "Bhutanese Ngultrum" },
    { code: "BWP", name: "Botswanan Pula" },
    { code: "BYN", name: "Belarusian Ruble" },
    { code: "BZD", name: "Belize Dollar" },
    { code: "CAD", name: "Canadian Dollar" },
    { code: "CDF", name: "Congolese Franc" },
    { code: "CHF", name: "Swiss Franc" },
    { code: "CLF", name: "Chilean Unit of Account (UF)" },
    { code: "CLP", name: "Chilean Peso" },
    { code: "CNY", name: "Chinese Yuan" },
    { code: "COP", name: "Colombian Peso" },
    { code: "CRC", name: "Costa Rican Colón" },
    { code: "EUR", name: "Euro" },
    { code: "GBP", name: "British Pound Sterling" },
    { code: "JPY", name: "Japanese Yen" },
    { code: "USD", name: "US Dollar" },
    { code: "PKR", name: "Pakistani Rupee" }
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
    { code: "ar", name: "Arabic" }
  ];

  // Font options
  const fontOptions = [
    "Arial",
    "Helvetica",
    "Times New Roman",
    "Georgia",
    "Verdana",
    "Courier New",
    "Trebuchet MS",
    "Arial Black",
    "Impact"
  ];

  // Transition options
  const transitionOptions = [
    "Transition from left",
    "Slide from Right",
    "Slide from Top",
    "Slide from Bottom",
    "Fade",
    "No Animation"
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

  // Currency label handler
  const handleCurrencyLabelChange = (currencyCode, value) => {
    setCurrencyLabels(prev => ({
      ...prev,
      [currencyCode]: value
    }));
  };

  const handleSave = () => {
    console.log({
      appName,
      tags,
      baseCurrency,
      exchangeCurrencies,
      headerText,
      logoImage,
      transition,
      headerColor,
      tableColor,
      textFont,
      textColor,
      backgroundColor,
      backgroundImage,
      animateBackgroundImage,
      language,
      currencyLabels
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
                  {currencyOptions.map(currency => (
                    <option key={currency.code} value={currency.code}>{currency.code} - {currency.name}</option>
                  ))}
                </select>
              </div>

              <div style={styles.field}>
                <label>Exchange Currencies (multiple select):</label>
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
                <label>Header Text:</label>
                <input
                  type="text"
                  value={headerText}
                  onChange={e => setHeaderText(e.target.value)}
                  style={styles.input}
                />
              </div>

              <div style={styles.field}>
                <label>Logo Image (optional):</label>
                <input type="file" onChange={e => setLogoImage(e.target.files[0])} />
              </div>

              <div style={styles.field}>
                <label>Transition:</label>
                <select value={transition} onChange={e => setTransition(e.target.value)} style={styles.input}>
                  <option value="">Select Transition</option>
                  {transitionOptions.map(transitionOption => (
                    <option key={transitionOption} value={transitionOption}>{transitionOption}</option>
                  ))}
                </select>
              </div>

              <div style={styles.field}>
                <label>Header Color (optional):</label>
                <input 
                  type="color" 
                  value={headerColor} 
                  onChange={e => setHeaderColor(e.target.value)} 
                  style={styles.colorInput}
                />
              </div>

              <div style={styles.field}>
                <label>Table Color (optional):</label>
                <input 
                  type="color" 
                  value={tableColor} 
                  onChange={e => setTableColor(e.target.value)} 
                  style={styles.colorInput}
                />
              </div>

              <div style={styles.field}>
                <label>Text Font (optional):</label>
                <select value={textFont} onChange={e => setTextFont(e.target.value)} style={styles.input}>
                  <option value="">Select Font</option>
                  {fontOptions.map(font => (
                    <option key={font} value={font}>{font}</option>
                  ))}
                </select>
              </div>

              <div style={styles.field}>
                <label>Text Color (optional):</label>
                <input 
                  type="color" 
                  value={textColor} 
                  onChange={e => setTextColor(e.target.value)} 
                  style={styles.colorInput}
                />
              </div>

              <div style={styles.field}>
                <label>Background Color (optional):</label>
                <input 
                  type="color" 
                  value={backgroundColor} 
                  onChange={e => setBackgroundColor(e.target.value)} 
                  style={styles.colorInput}
                />
              </div>

              <div style={styles.field}>
                <label>Background Image (optional):</label>
                <input type="file" onChange={e => setBackgroundImage(e.target.files[0])} />
              </div>

              <div style={styles.checkboxGroup}>
                <label><input type="checkbox" checked={animateBackgroundImage} onChange={e => setAnimateBackgroundImage(e.target.checked)} /> Animate background image</label>
              </div>
            </div>
          )}

          {activeTab === "language" && (
            <div>
              <div style={styles.field}>
                <label>Language:</label>
                <select value={language} onChange={e => setLanguage(e.target.value)} style={styles.input}>
                  <option value="">Select Language</option>
                  {languageOptions.map(lang => (
                    <option key={lang.code} value={lang.code}>{lang.name}</option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>

        <div style={styles.fixedButtons}>
          <button onClick={handleSave} style={styles.saveBtn}>Save</button>
          <button onClick={() => setShowPopup(true)} style={styles.previewBtn}>Preview</button>
        </div>

        {showPopup && (
          <ExchangeRateTablePopUp
            onClose={() => setShowPopup(false)}
            appName={appName}
            tags={tags}
            baseCurrency={baseCurrency}
            exchangeCurrencies={exchangeCurrencies}
            headerText={headerText}
            logoImage={logoImage ? URL.createObjectURL(logoImage) : null}
            transition={transition}
            headerColor={headerColor}
            tableColor={tableColor}
            textFont={textFont}
            textColor={textColor}
            backgroundColor={backgroundColor}
            backgroundImage={backgroundImage ? URL.createObjectURL(backgroundImage) : null}
            animateBackgroundImage={animateBackgroundImage}
            language={language}
            currencyLabels={currencyLabels}
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
  removeTag: { marginLeft: "5px", backgroundColor: "red", color: "#fff", border: "none", borderRadius: "50%", width: "16px", height: "16px", cursor: "pointer" },
  checkboxGroup: { display: "flex", flexDirection: "column", gap: "5px", marginBottom: "10px" },
  helpText: { fontSize: "12px", color: "#666", marginTop: "5px", marginBottom: "10px" },
  labelField: { marginBottom: "5px" }
};

export default ExchangeRateTableForm;