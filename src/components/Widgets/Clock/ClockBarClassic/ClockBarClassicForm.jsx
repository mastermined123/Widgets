import React, { useState } from "react";
import ClockBarClassicPopUp from "./ClockBarClassicPopUp";

function ClockBarClassicForm({ card }) {
    const [activeTab, setActiveTab] = useState("settings");

    // Fields
    const [appName, setAppName] = useState("");
    const [tags, setTags] = useState([]);
    const [dataFeed, setDataFeed] = useState(""); // input for tags
    const [theme, setTheme] = useState("Royal Blue");
    const [timeFormat, setTimeFormat] = useState("AM/PM");
    const [textFont, setTextFont] = useState("");
    const [fontColor, setFontColor] = useState("#000000");
    const [containerColor, setContainerColor] = useState("#ffffff");
    const [bgColor, setBgColor] = useState("#f5f5f5");
    const [bgImage, setBgImage] = useState("");
    const [selectedLanguage, setSelectedLanguage] = useState("en-US");

    const [showPopup, setShowPopup] = useState(false);
    const [appNameError, setAppNameError] = useState("");

    // Theme options
    const themeOptions = [
        "Royal Blue",
        "Navy",
        "Dark Cyan",
        "Lime Green",
        "Wheat",
        "Red Velvet",
        "Forest Green"
    ];

    // Font options
    const fontOptions = [
        "Arial",
        "Times New Roman",
        "Helvetica",
        "Georgia",
        "Verdana",
        "Courier New",
        "Roboto",
        "Open Sans"
    ];

    // Tag handlers
    const addTag = () => {
        if (dataFeed.trim()) {
            setTags((prev) => [...prev, dataFeed.trim()]);
            setDataFeed("");
        }
    };

    const removeTag = (index) => {
        setTags((prev) => prev.filter((_, i) => i !== index));
    };

    const handlePreview = () => {
        if (!appName.trim()) {
            setAppNameError("Please fill out this field.");
            return;
        }
        setAppNameError("");
        setShowPopup(true);
    };

    const handleSave = () => {
        console.log({
            appName,
            tags,
            theme,
            timeFormat,
            textFont,
            fontColor,
            containerColor,
            bgColor,
            bgImage,
            selectedLanguage
        });
        alert("Saved! Check console.");
    };

    return (
        <div style={styles.container}>
            {/* Left Portion */}
            <div style={styles.left}>
                <label style={{ ...styles.field, fontWeight: "bold" }}>{card?.title || "Clock Bar Classic"}</label>
                {card?.imageSrc && <img src={card.imageSrc} alt={card?.title || "Clock Bar Classic"} style={styles.image} />}
                <p>Configurable clock bar with theme options and customizable appearance.</p>
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
                            {/* App Name */}
                            <div style={styles.field}>
                                <label>App name:</label>
                                <input
                                    type="text"
                                    value={appName}
                                    onChange={(e) => {
                                        setAppName(e.target.value);
                                        if (appNameError) setAppNameError("");
                                    }}
                                    style={{
                                        ...styles.input,
                                        borderColor: appNameError ? "#ff0000" : "#ccc"
                                    }} />
                                {appNameError && (
                                    <div style={styles.errorMessage}>
                                        <span style={styles.errorIcon}>⚠</span>
                                        {appNameError}
                                    </div>
                                )}
                            </div>

                            {/* Tags (optional) */}
                            <div style={styles.field}>
                                <label>Tags <span style={styles.optional}>(optional)</span>:</label>
                                <div style={{ display: "flex", gap: "5px", flexWrap: "wrap" }}>
                                    {tags?.map((tag, i) => (
                                        <span key={i} style={styles.tag}>
                                            {tag}
                                            <button onClick={() => removeTag(i)} style={styles.removeTag}>x</button>
                                        </span>
                                    ))}
                                    <input
                                        type="text"
                                        value={dataFeed}
                                        onChange={(e) => setDataFeed(e.target.value)}
                                        placeholder="Select a tag or enter a new one"
                                        style={{ ...styles.input, flex: "1" }}
                                        onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTag())} />
                                </div>
                            </div>

                            {/* Theme */}
                            <div style={styles.field}>
                                <label>Theme:</label>
                                <select
                                    value={theme}
                                    onChange={(e) => setTheme(e.target.value)}
                                    style={styles.select}
                                >
                                    {themeOptions.map((option, index) => (
                                        <option key={index} value={option}>{option}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Time Format */}
                            <div style={styles.field}>
                                <label>Time Format:</label>
                                <select
                                    value={timeFormat}
                                    onChange={(e) => setTimeFormat(e.target.value)}
                                    style={styles.select}
                                >
                                    <option value="AM/PM">AM/PM</option>
                                    <option value="24H">24 Hour</option>
                                </select>
                            </div>

                            {/* Text Font (optional) */}
                            <div style={styles.field}>
                                <label>Text Font <span style={styles.optional}>(optional)</span>:</label>
                                <select
                                    value={textFont}
                                    onChange={(e) => setTextFont(e.target.value)}
                                    style={styles.select}
                                >
                                    <option value="">Select Font</option>
                                    {fontOptions.map((font, index) => (
                                        <option key={index} value={font}>{font}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Font Color (optional) */}
                            <div style={styles.field}>
                                <label>Font Color <span style={styles.optional}>(optional)</span>:</label>
                                <div style={styles.colorInputContainer}>
                                    <input
                                        type="text"
                                        value={fontColor}
                                        onChange={(e) => setFontColor(e.target.value)}
                                        style={styles.colorTextInput}
                                        placeholder="#000000" />
                                    <input
                                        type="color"
                                        value={fontColor}
                                        onChange={(e) => setFontColor(e.target.value)}
                                        style={styles.colorPicker} />
                                </div>
                            </div>

                            {/* Container Color (optional) */}
                            <div style={styles.field}>
                                <label>Container Color <span style={styles.optional}>(optional)</span>:</label>
                                <div style={styles.colorInputContainer}>
                                    <input
                                        type="text"
                                        value={containerColor}
                                        onChange={(e) => setContainerColor(e.target.value)}
                                        style={styles.colorTextInput}
                                        placeholder="#ffffff" />
                                    <input
                                        type="color"
                                        value={containerColor}
                                        onChange={(e) => setContainerColor(e.target.value)}
                                        style={styles.colorPicker} />
                                </div>
                                <small style={styles.helpText}>
                                    Change the container background color of the texts. If a color is chosen, it will overlap any theme's color.
                                </small>
                            </div>

                            {/* Background Color (optional) */}
                            <div style={styles.field}>
                                <label>Background Color <span style={styles.optional}>(optional)</span>:</label>
                                <div style={styles.colorInputContainer}>
                                    <input
                                        type="text"
                                        value={bgColor}
                                        onChange={(e) => setBgColor(e.target.value)}
                                        style={styles.colorTextInput}
                                        placeholder="#f5f5f5" />
                                    <input
                                        type="color"
                                        value={bgColor}
                                        onChange={(e) => setBgColor(e.target.value)}
                                        style={styles.colorPicker} />
                                </div>
                                <small style={styles.helpText}>
                                    Change the background color of the app. If a color is chosen, it will overlap any theme's color.
                                </small>
                            </div>

                            {/* Background Image (optional) */}
                            <div style={styles.field}>
                                <label>Background Image <span style={styles.optional}>(optional)</span>:</label>
                                <div style={{ display: "flex", gap: "8px" }}>
                                    <input
                                        type="text"
                                        value={bgImage}
                                        onChange={(e) => setBgImage(e.target.value)}
                                        placeholder="Enter image URL"
                                        style={{ ...styles.input, flex: 1 }}
                                    />
                                    <button style={styles.browseBtn}>Browse</button>
                                </div>
                                <small style={styles.helpText}>
                                    The background image will stretch to fill the app height and width. If a background image is chosen, it will overlap any theme's background.
                                </small>
                            </div>
                        </div>
                    )}
                    {activeTab === "language" && (
                        <div style={styles.languageTab}>
                            <div style={styles.field}>
                                <label>Language:</label>
                                <select
                                    value={selectedLanguage}
                                    onChange={(e) => setSelectedLanguage(e.target.value)}
                                    style={styles.select}
                                >
                                    <option value="af">Afrikaans</option>
                                    <option value="ar">العربية</option>
                                    <option value="ast">Asturianu</option>
                                    <option value="az">Azərbaycan</option>
                                    <option value="be">Беларуская</option>
                                    <option value="bg">Български</option>
                                    <option value="bn">বাংলা</option>
                                    <option value="br">Brezhoneg</option>
                                    <option value="bs">Bosanski</option>
                                    <option value="ca">Català</option>
                                    <option value="ku">کوردی</option>
                                    <option value="cs">Český</option>
                                    <option value="cy">Cymraeg</option>
                                    <option value="da">Dansk</option>
                                    <option value="de">Deutsch</option>
                                    <option value="el">Ελληνικά</option>
                                    <option value="en-US">English</option>
                                    <option value="en-AU">Australian English</option>
                                    <option value="en-GB">British English</option>
                                    <option value="es">Español</option>
                                    <option value="es-AR">Español De Argentina</option>
                                    <option value="es-CO">Español De Colombia</option>
                                    <option value="es-MX">Español De Mexico</option>
                                    <option value="es-NI">Español De Nicaragua</option>
                                    <option value="es-VE">Español De Venezuela</option>
                                    <option value="et">Eesti</option>
                                    <option value="eu">Basque</option>
                                    <option value="fa">فارسی</option>
                                    <option value="fi">Suomi</option>
                                    <option value="fr">Français</option>
                                    <option value="fy">Frysk</option>
                                    <option value="ga">Gaeilge</option>
                                    <option value="gd">Gàidhlig</option>
                                    <option value="gl">Galego</option>
                                    <option value="he">עברית</option>
                                    <option value="hi">हिन्दी</option>
                                    <option value="hr">Hrvatski</option>
                                    <option value="hu">Magyar</option>
                                    <option value="hy">Հայերեն</option>
                                    <option value="ia">Interlingua</option>
                                    <option value="id">Bahasa Indonesia</option>
                                    <option value="is">Íslenska</option>
                                    <option value="it">Italiano</option>
                                    <option value="ja">日本語</option>
                                    <option value="ka">ქართული</option>
                                    <option value="kk">Қазақ</option>
                                    <option value="km">ខ្មែរ</option>
                                    <option value="kn">ಕನ್ನಡ</option>
                                    <option value="ko">한국어</option>
                                    <option value="lt">Lietuvių</option>
                                    <option value="lv">Latviešu</option>
                                    <option value="mk">Македонски</option>
                                    <option value="ml">മലയാളം</option>
                                    <option value="mn">Монгол</option>
                                    <option value="mr">मराठी</option>
                                    <option value="my">မြန်မာ</option>
                                    <option value="nb">Norsk (bokmål)</option>
                                    <option value="ne">नेपाली</option>
                                    <option value="nl">Nederlands</option>
                                    <option value="nn">Norsk (nynorsk)</option>
                                    <option value="os">Ирон</option>
                                    <option value="pa">ਪੰਜਾਬی</option>
                                    <option value="pl">Polski</option>
                                    <option value="pt">Português</option>
                                    <option value="pt-BR">Português (Brasil)</option>
                                    <option value="ro">Română</option>
                                    <option value="ru">Русский</option>
                                    <option value="sk">Slovenčina</option>
                                    <option value="sl">Slovenščina</option>
                                    <option value="sq">Shqip</option>
                                    <option value="sr">Српски</option>
                                    <option value="sv">Svenska</option>
                                    <option value="sw">Kiswahili</option>
                                    <option value="ta">தமிழ்</option>
                                    <option value="te">తెలుగు</option>
                                    <option value="th">ไทย</option>
                                    <option value="tr">Türkçe</option>
                                    <option value="tt">Татар</option>
                                    <option value="udm">Удмурт</option>
                                    <option value="uk">Українська</option>
                                    <option value="ur">اردو</option>
                                    <option value="uz">Oʻzbek</option>
                                    <option value="vi">Tiếng Việt</option>
                                    <option value="zh-CN">中文 (简体)</option>
                                    <option value="zh-TW">中文 (繁體)</option>
                                </select>
                                <small style={styles.helpText}>
                                    Changing the language will affect any text displayed on the app as well as how dates and numbers are formatted.
                                </small>
                            </div>
                        </div>
                    )}
                </div>

                {/* Buttons at bottom */}
                <div style={styles.bottomButtons}>
                    <button onClick={handlePreview} style={styles.previewBtn}>Preview</button>
                    <button onClick={handleSave} style={styles.saveBtn}>Save</button>
                </div>

                {/* Preview Popup */}
                {showPopup && (
                    <ClockBarClassicPopUp
                        onClose={() => setShowPopup(false)}
                        appName={appName}
                        tags={tags}
                        theme={theme}
                        timeFormat={timeFormat}
                        textFont={textFont}
                        fontColor={fontColor}
                        containerColor={containerColor}
                        bgColor={bgColor}
                        bgImage={bgImage}
                        selectedLanguage={selectedLanguage} />
                )}
            </div>
        </div>
    );
}

const styles = {
  container: {
    display: "flex",
    width: "96%",
    border: "1px solid #ddd",
    borderRadius: "8px",
    overflow: "hidden",
    marginTop: "1px",
    position: "relative",
  },
  left: {
    flex: 0.35,
    borderRight: "3px solid #ddd",
    backgroundColor: "#f5f5f5",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "10px",
    overflowY: "auto",
  },
  right: {
    flex: 0.65,
    padding: "15px",
    display: "flex",
    flexDirection: "column",
  },
  image: {
    width: "100%",
    height: "200px",
    objectFit: "contain",
    borderRadius: "8px",
    marginBottom: "10px",
  },
  tabs: { display: "flex", gap: "10px", marginBottom: "15px" },
  tab: {
    padding: "5px 15px",
    cursor: "pointer",
    backgroundColor: "#eee",
    border: "none",
    borderRadius: "4px",
  },
  activeTab: {
    padding: "5px 15px",
    cursor: "pointer",
    backgroundColor: "#005481",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
  },
  tabContent: { flex: 1, overflowY: "auto", minHeight: "400px" },
  languageTab: { 
    minHeight: "350px",
    paddingBottom: "20px"
  },
  field: { display: "flex", flexDirection: "column", marginBottom: "15px" },
  input: { padding: "8px", borderRadius: "4px", border: "1px solid #ccc", fontSize: "14px" },
  select: { padding: "8px", borderRadius: "4px", border: "1px solid #ccc", fontSize: "14px" },
  optional: { color: "#888", fontWeight: "normal" },
  helpText: { color: "#666", fontSize: "12px", marginTop: "4px" },
  bottomButtons: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "10px",
    marginTop: "20px",
    paddingTop: "15px",
    borderTop: "1px solid #eee",
  },
  saveBtn: {
    padding: "8px 16px",
    backgroundColor: "#ff8c00",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontWeight: "500",
  },
  previewBtn: {
    padding: "8px 16px",
    backgroundColor: "#007acc",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontWeight: "500",
  },
  browseBtn: {
    padding: "8px 12px",
    backgroundColor: "#e9e9e9",
    border: "1px solid #ccc",
    borderRadius: "4px",
    cursor: "pointer",
  },
  tag: {
    padding: "4px 8px",
    backgroundColor: "#e0e0e0",
    borderRadius: "4px",
    display: "flex",
    alignItems: "center",
    gap: "4px",
    fontSize: "14px",
  },
  removeTag: {
    marginLeft: "5px",
    backgroundColor: "#ff6b6b",
    color: "#fff",
    border: "none",
    borderRadius: "50%",
    width: "16px",
    height: "16px",
    cursor: "pointer",
    lineHeight: "16px",
    fontSize: "12px",
  },
  errorMessage: {
    display: "flex",
    alignItems: "center",
    gap: "5px",
    color: "#ff0000",
    fontSize: "12px",
    marginTop: "5px",
    padding: "5px 8px",
    backgroundColor: "#fff3cd",
    border: "1px solid #ffeaa7",
    borderRadius: "4px",
  },
  errorIcon: {
    color: "#ff6b35",
    fontWeight: "bold",
  },
  colorInputContainer: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  colorTextInput: {
    flex: 1,
    padding: "8px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    fontSize: "14px",
  },
  colorPicker: {
    width: "40px",
    height: "36px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    cursor: "pointer",
    padding: "0",
  },
};

export default ClockBarClassicForm;