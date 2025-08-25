import React, { useState } from "react";
import ModernWeatherForecastPopUp from "./ModernWeatherForecastPopUp";

function ModernWeatherForecastForm({ card, onSwitchToLanguage, appName, setAppName, tags, setTags, forecastLocation, setForecastLocation, backgroundColor, setBackgroundColor, textColor, setTextColor, backgroundImage, setBackgroundImage, textFont, setTextFont, language, setLanguage, languageLabels, setLanguageLabels }) {
    // Fields
    const [dataFeed, setDataFeed] = useState(""); // input for tags

    const [locationName, setLocationName] = useState("");
    const [usePlayerLocation, setUsePlayerLocation] = useState(false);
    const [units, setUnits] = useState("Fahrenheit");

    const [showPopup, setShowPopup] = useState(false);
    const [appNameError, setAppNameError] = useState("");
    const [forecastLocationError, setForecastLocationError] = useState("");

    // Font options
    const fontOptions = [
        { value: "", label: "Use app default font" },
        { value: "Allan Normal", label: "Allan Normal" },
        { value: "Allan Bold", label: "Allan Bold" },
        { value: "Arvo Normal", label: "Arvo Normal" },
        { value: "Arvo Italic", label: "Arvo Italic" },
        { value: "Arvo Bold", label: "Arvo Bold" },
        { value: "Audiowide", label: "Audiowide" },
        { value: "BANGERS", label: "BANGERS" },
        { value: "Bree Serif", label: "Bree Serif" },
        { value: "Cabin Sketch Normal", label: "Cabin Sketch Normal" },
        { value: "Cabin Sketch Bold", label: "Cabin Sketch Bold" },
        { value: "CAESAR DRESSING", label: "CAESAR DRESSING" },
        { value: "Courgette", label: "Courgette" },
        { value: "Cousine Normal", label: "Cousine Normal" },
        { value: "Cousine Italic", label: "Cousine Italic" },
        { value: "Cousine Bold", label: "Cousine Bold" },
        { value: "Covered by Your Grace", label: "Covered by Your Grace" },
        { value: "CREEPSTER", label: "CREEPSTER" },
        { value: "Cuprum Normal", label: "Cuprum Normal" }
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
        let hasError = false;
        
        if (!appName.trim()) {
            setAppNameError("Please fill out this field.");
            hasError = true;
        } else {
            setAppNameError("");
        }

        if (!usePlayerLocation && !forecastLocation.trim()) {
            setForecastLocationError("Please fill out this field.");
            hasError = true;
        } else {
            setForecastLocationError("");
        }

        if (hasError) return;
        
        setShowPopup(true);
    };

    const handleSave = () => {
        console.log({
            appName,
            tags,
            forecastLocation,
            locationName,
            usePlayerLocation,
            units,
            textFont,
            textColor,
            backgroundColor,
            backgroundImage,
        });
        alert("Saved! Check console.");
    };

    const handleBackgroundImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setBackgroundImage(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const triggerFileInput = () => {
        document.getElementById('backgroundImageInput').click();
    };

    return (
        <div style={styles.container}>
            {/* Left Portion */}
            <div style={styles.left}>
                <label style={{ ...styles.field, fontWeight: "bold" }}>{card?.title || "Modern Weather Forecast"}</label>
                {card?.imageSrc && <img src={card.imageSrc} alt={card?.title || "Modern Weather Forecast"} style={styles.image} />}
                <p>Configurable weather forecast widget with location, units, fonts, and styling options.</p>
            </div>

            {/* Right Portion */}
            <div style={styles.right}>
                <div style={styles.topButtons}>
                    <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                        <button
                            style={styles.settingsButton}
                        >
                            Settings
                        </button>
                        <button
                            style={styles.languageButton}
                            onClick={() => onSwitchToLanguage()}
                        >
                            Language
                        </button>
                    </div>
                </div>

                <div style={styles.tabContent}>
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

                    {/* Forecast Location */}
                    <div style={styles.field}>
                        <label>Forecast location</label>
                        <input
                            type="text"
                            value={forecastLocation}
                            onChange={(e) => {
                                setForecastLocation(e.target.value);
                                if (forecastLocationError) setForecastLocationError("");
                            }}
                            placeholder="Enter a location"
                            disabled={usePlayerLocation}
                            style={{
                                ...styles.input,
                                borderColor: forecastLocationError ? "#ff0000" : "#ccc",
                                backgroundColor: usePlayerLocation ? "#f5f5f5" : "#fff"
                            }} />
                        {forecastLocationError && (
                            <div style={styles.errorMessage}>
                                <span style={styles.errorIcon}>⚠</span>
                                {forecastLocationError}
                            </div>
                        )}
                        <p style={styles.helpText}>Type the location of the forecast and choose from the dropdown.</p>
                    </div>

                    {/* Location Name */}
                    <div style={styles.field}>
                        <label>Location name <span style={styles.optional}>(optional)</span></label>
                        <input
                            type="text"
                            value={locationName}
                            onChange={(e) => setLocationName(e.target.value)}
                            style={styles.input} />
                        <p style={styles.helpText}>How to display the name of the location. Leave blank to hide it.</p>
                    </div>

                    {/* Use Player Location */}
                    <div style={styles.field}>
                        <div style={styles.checkboxContainer}>
                            <input
                                type="checkbox"
                                checked={usePlayerLocation}
                                onChange={(e) => {
                                    setUsePlayerLocation(e.target.checked);
                                    if (e.target.checked) {
                                        setForecastLocation("");
                                        setForecastLocationError("");
                                    }
                                }}
                                style={styles.checkbox} />
                            <label>Use player location. Only available on Android Player 8.1.3 or greater.</label>
                        </div>
                        <p style={styles.helpText}>
                            Player location will be based on GPS, or location can be manually 
                            configured at the player settings page. Enabling this feature will override 
                            the <em>Forecast location</em> field.
                        </p>
                    </div>

                    {/* Units */}
                    <div style={styles.field}>
                        <label>Units</label>
                        <select
                            value={units}
                            onChange={(e) => setUnits(e.target.value)}
                            style={styles.input}
                        >
                            <option value="Fahrenheit">Fahrenheit</option>
                            <option value="Celsius">Celsius</option>
                        </select>
                    </div>

                    {/* Text Font */}
                    <div style={styles.field}>
                        <label>Text font <span style={styles.optional}>(optional)</span></label>
                        <select
                            value={textFont}
                            onChange={(e) => setTextFont(e.target.value)}
                            style={styles.input}
                        >
                            {fontOptions.map((font, index) => (
                                <option key={index} value={font.value}>
                                    {font.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Text Color */}
                    <div style={styles.field}>
                        <label>Text color <span style={styles.optional}>(optional)</span></label>
                        <div style={styles.colorInputContainer}>
                            <input
                                type="text"
                                value={textColor}
                                onChange={(e) => setTextColor(e.target.value)}
                                style={styles.colorTextInput} />
                            <input
                                type="color"
                                value={textColor}
                                onChange={(e) => setTextColor(e.target.value)}
                                style={styles.colorPicker} />
                        </div>
                    </div>

                    {/* Background Color */}
                    <div style={styles.field}>
                        <label>Background color <span style={styles.optional}>(optional)</span></label>
                        <div style={styles.colorInputContainer}>
                            <input
                                type="text"
                                value={backgroundColor}
                                onChange={(e) => setBackgroundColor(e.target.value)}
                                style={styles.colorTextInput} />
                            <input
                                type="color"
                                value={backgroundColor}
                                onChange={(e) => setBackgroundColor(e.target.value)}
                                style={styles.colorPicker} />
                        </div>
                    </div>

                    {/* Background Image */}
                    <div style={styles.field}>
                        <label>Background image <span style={styles.optional}>(optional)</span></label>
                        <div style={styles.backgroundImageContainer}>
                            <input
                                id="backgroundImageInput"
                                type="file"
                                accept="image/*"
                                onChange={handleBackgroundImageUpload}
                                style={{ display: 'none' }}
                            />
                            <input
                                type="text"
                                value={backgroundImage ? "Image selected" : ""}
                                placeholder="No file selected"
                                readOnly
                                style={styles.backgroundImageInput}
                            />
                            <button
                                type="button"
                                onClick={triggerFileInput}
                                style={styles.backgroundImageButton}
                            >
                                📁 Choose
                            </button>
                        </div>
                        {backgroundImage && (
                            <div style={styles.imagePreview}>
                                <img src={backgroundImage} alt="Background preview" style={styles.previewImage} />
                                <button
                                    type="button"
                                    onClick={() => setBackgroundImage("")}
                                    style={styles.removeImageButton}
                                >
                                    ×
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Buttons at bottom */}
                <div style={styles.bottomButtons}>
                    <button onClick={handlePreview} style={styles.previewBtn}>Preview</button>
                    <button onClick={handleSave} style={styles.saveBtn}>Save</button>
                </div>

                {/* Preview Popup */}
                {showPopup && (
                    <ModernWeatherForecastPopUp
                        onClose={() => setShowPopup(false)}
                        appName={appName}
                        tags={tags}
                        forecastLocation={forecastLocation}
                        locationName={locationName}
                        usePlayerLocation={usePlayerLocation}
                        units={units}
                        textFont={textFont}
                        textColor={textColor}
                        backgroundColor={backgroundColor}
                        backgroundImage={backgroundImage}
                        language={language}
                        labels={languageLabels} />
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
  topButtons: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "15px"
  },
  settingsButton: {
    padding: "10px 20px",
    backgroundColor: "#007acc",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "500",
    fontSize: "14px",
  },
  languageButton: {
    padding: "10px 20px",
    backgroundColor: "transparent",
    color: "#666",
    border: "1px solid #ddd",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "400",
    fontSize: "14px",
  },
  tabContent: { flex: 1, overflowY: "auto" },
  field: { display: "flex", flexDirection: "column", marginBottom: "15px" },
  input: { 
    padding: "8px", 
    borderRadius: "4px", 
    border: "1px solid #ccc",
    fontSize: "14px",
    marginTop: "5px"
  },
  optional: {
    color: "#666",
    fontWeight: "normal",
    fontSize: "14px"
  },
  helpText: {
    color: "#666",
    fontSize: "12px",
    marginTop: "5px",
    lineHeight: "1.4"
  },
  checkboxContainer: {
    display: "flex",
    alignItems: "flex-start",
    gap: "8px",
    marginTop: "5px"
  },
  checkbox: {
    marginTop: "2px"
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
    padding: "2px 5px",
    backgroundColor: "#ccc",
    borderRadius: "4px",
    display: "flex",
    alignItems: "center",
    gap: "4px",
  },
  removeTag: {
    marginLeft: "5px",
    backgroundColor: "red",
    color: "#fff",
    border: "none",
    borderRadius: "50%",
    width: "16px",
    height: "16px",
    cursor: "pointer",
    fontSize: "14px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
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
    marginTop: "5px"
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
    height: "34px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    cursor: "pointer",
    padding: "0",
  },
  fileUploadContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "10px"
  },
  backgroundImageContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "10px"
  },
  backgroundImageInput: {
    padding: "8px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    fontSize: "14px",
    backgroundColor: "#f5f5f5",
    cursor: "not-allowed"
  },
  backgroundImageButton: {
    display: "flex",
    alignItems: "center",
    padding: "8px 16px",
    backgroundColor: "#f8f9fa",
    border: "1px solid #ccc",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "14px",
    color: "#333",
    width: "fit-content"
  },
  imagePreview: {
    position: "relative",
    display: "inline-block",
    marginTop: "10px"
  },
  previewImage: {
    width: "100px",
    height: "100px",
    objectFit: "cover",
    borderRadius: "4px",
    border: "1px solid #ccc"
  },
  removeImageButton: {
    position: "absolute",
    top: "-5px",
    right: "-5px",
    width: "20px",
    height: "20px",
    borderRadius: "50%",
    backgroundColor: "#ff4444",
    color: "white",
    border: "none",
    cursor: "pointer",
    fontSize: "14px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
};

export default ModernWeatherForecastForm;