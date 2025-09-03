import React, { useState } from "react";
import TimeAppPopUp from "./TimeAppPopUp";

function TimeAppForm({ card }) {
    const [activeTab, setActiveTab] = useState("settings");

    // Fields
    const [appName, setAppName] = useState("");
    const [tags, setTags] = useState([]);
    const [dataFeed, setDataFeed] = useState(""); // input for tags

    const [highlightSeconds, setHighlightSeconds] = useState(false);
    const [textFont, setTextFont] = useState("");
    const [textColor, setTextColor] = useState("#000000");
    const [currentTimeColor, setCurrentTimeColor] = useState("#ffffff");
    const [textShadow, setTextShadow] = useState(false);
    const [backgroundColor, setBackgroundColor] = useState("#2c7a7b");

    const [showPopup, setShowPopup] = useState(false);
    const [appNameError, setAppNameError] = useState("");

    // Font options
    const fontOptions = [
        { value: "", label: "Click here to select a font" },
        { value: "Arial", label: "Arial" },
        { value: "Helvetica", label: "Helvetica" },
        { value: "Times New Roman", label: "Times New Roman" },
        { value: "Georgia", label: "Georgia" },
        { value: "Verdana", label: "Verdana" },
        { value: "Courier New", label: "Courier New" },
        { value: "Trebuchet MS", label: "Trebuchet MS" },
        { value: "Arial Black", label: "Arial Black" },
        { value: "Impact", label: "Impact" },
        { value: "Comic Sans MS", label: "Comic Sans MS" },
        { value: "Roboto", label: "Roboto" },
        { value: "Open Sans", label: "Open Sans" },
        { value: "Lato", label: "Lato" },
        { value: "Montserrat", label: "Montserrat" },
        { value: "Poppins", label: "Poppins" }
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
            highlightSeconds,
            textFont,
            textColor,
            currentTimeColor,
            textShadow,
            backgroundColor,
        });
        alert("Saved! Check console.");
    };

    return (
        <div style={styles.container}>
            {/* Left Portion */}
            <div style={styles.left}>
                <label style={{ ...styles.field, fontWeight: "bold" }}>{card?.title || "Time App"}</label>
                {card?.imageSrc && <img src={card.imageSrc} alt={card?.title || "Time App"} style={styles.image} />}
                <p>Configurable time display with calendar view, custom fonts, colors, and highlighting options.</p>
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
                    {activeTab === "settings" && (
                        <div>
                            {/* App Name */}
                            <div style={styles.field}>
                                <label>App name</label>
                                <input
                                    type="text"
                                    value={appName}
                                    onChange={(e) => {
                                        setAppName(e.target.value);
                                        if (appNameError) setAppNameError("");
                                    }}
                                    placeholder="Enter a name for this app"
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

                            {/* Tags */}
                            <div style={styles.field}>
                                <label>Tags <span style={styles.optional}>(optional)</span></label>
                                <div style={{ display: "flex", gap: "5px", flexWrap: "wrap" }}>
                                    {tags?.map((tag, i) => (
                                        <span key={i} style={styles.tag}>
                                            {tag}
                                            <button onClick={() => removeTag(i)} style={styles.removeTag}>×</button>
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

                            {/* Highlight seconds */}
                            <div style={styles.checkboxField}>
                                <input
                                    type="checkbox"
                                    id="highlightSeconds"
                                    checked={highlightSeconds}
                                    onChange={(e) => setHighlightSeconds(e.target.checked)}
                                    style={styles.checkbox}
                                />
                                <label htmlFor="highlightSeconds" style={styles.checkboxLabel}>Highlight seconds</label>
                            </div>

                            {/* Text font */}
                            <div style={styles.field}>
                                <label>Text font <span style={styles.optional}>(optional)</span></label>
                                <select
                                    value={textFont}
                                    onChange={(e) => setTextFont(e.target.value)}
                                    style={styles.select}
                                >
                                    {fontOptions.map((font) => (
                                        <option key={font.value} value={font.value}>
                                            {font.label}
                                        </option>
                                    ))}
                                </select>
                                <small style={styles.helpText}>Change the font used to show the text</small>
                            </div>

                            {/* Text color */}
                            <div style={styles.field}>
                                <label>Text color <span style={styles.optional}>(optional)</span></label>
                                <div style={styles.colorInputContainer}>
                                    <input
                                        type="text"
                                        value={textColor}
                                        onChange={(e) => setTextColor(e.target.value)}
                                        style={styles.colorTextInput}
                                        placeholder="#000000" />
                                    <input
                                        type="color"
                                        value={textColor}
                                        onChange={(e) => setTextColor(e.target.value)}
                                        style={styles.colorPicker} />
                                </div>
                            </div>

                            {/* Text color of the current time */}
                            <div style={styles.field}>
                                <label>Text color of the current time <span style={styles.optional}>(optional)</span></label>
                                <div style={styles.colorInputContainer}>
                                    <input
                                        type="text"
                                        value={currentTimeColor}
                                        onChange={(e) => setCurrentTimeColor(e.target.value)}
                                        style={styles.colorTextInput}
                                        placeholder="#ffffff" />
                                    <input
                                        type="color"
                                        value={currentTimeColor}
                                        onChange={(e) => setCurrentTimeColor(e.target.value)}
                                        style={styles.colorPicker} />
                                </div>
                            </div>

                            {/* Text shadow */}
                            <div style={styles.checkboxField}>
                                <input
                                    type="checkbox"
                                    id="textShadow"
                                    checked={textShadow}
                                    onChange={(e) => setTextShadow(e.target.checked)}
                                    style={styles.checkbox}
                                />
                                <label htmlFor="textShadow" style={styles.checkboxLabel}>Text shadow</label>
                            </div>

                            {/* Background color */}
                            <div style={styles.field}>
                                <label>Background color <span style={styles.optional}>(optional)</span></label>
                                <div style={styles.colorInputContainer}>
                                    <input
                                        type="text"
                                        value={backgroundColor}
                                        onChange={(e) => setBackgroundColor(e.target.value)}
                                        style={styles.colorTextInput}
                                        placeholder="#2c7a7b" />
                                    <input
                                        type="color"
                                        value={backgroundColor}
                                        onChange={(e) => setBackgroundColor(e.target.value)}
                                        style={styles.colorPicker} />
                                </div>
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
                    <TimeAppPopUp
                        onClose={() => setShowPopup(false)}
                        appName={appName}
                        tags={tags}
                        highlightSeconds={highlightSeconds}
                        textFont={textFont}
                        textColor={textColor}
                        currentTimeColor={currentTimeColor}
                        textShadow={textShadow}
                        backgroundColor={backgroundColor} />
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
    objectFit: "cover",
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
  tabContent: { flex: 1, overflowY: "auto" },
  field: { display: "flex", flexDirection: "column", marginBottom: "15px" },
  checkboxField: { 
    display: "flex", 
    alignItems: "center", 
    marginBottom: "15px",
    gap: "8px"
  },
  input: { 
    padding: "8px", 
    borderRadius: "4px", 
    border: "1px solid #ccc",
    fontSize: "14px"
  },
  select: { 
    padding: "8px", 
    borderRadius: "4px", 
    border: "1px solid #ccc",
    fontSize: "14px",
    backgroundColor: "#fff"
  },
  checkbox: {
    width: "16px",
    height: "16px",
    cursor: "pointer"
  },
  checkboxLabel: {
    cursor: "pointer",
    fontSize: "14px"
  },
  optional: {
    color: "#666",
    fontWeight: "normal",
    fontSize: "12px"
  },
  helpText: {
    color: "#666",
    fontSize: "12px",
    marginTop: "4px"
  },
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
  tag: {
    padding: "4px 8px",
    backgroundColor: "#e2e8f0",
    borderRadius: "4px",
    display: "flex",
    alignItems: "center",
    gap: "4px",
    fontSize: "12px"
  },
  removeTag: {
    marginLeft: "4px",
    backgroundColor: "transparent",
    color: "#666",
    border: "none",
    borderRadius: "50%",
    width: "16px",
    height: "16px",
    cursor: "pointer",
    lineHeight: "16px",
    fontSize: "14px"
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

export default TimeAppForm;