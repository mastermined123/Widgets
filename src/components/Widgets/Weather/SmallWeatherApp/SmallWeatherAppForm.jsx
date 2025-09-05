import React, { useState } from "react";
import SmallWeatherAppPopUp from "./SmallWeatherAppPopUp";

function SmallWeatherAppForm({ 
    card, 
    onSwitchToLanguage, 
    appName, 
    setAppName, 
    tags, 
    setTags, 
    forecastLocation, 
    setForecastLocation, 
    locationName,
    setLocationName,
    usePlayerLocation,
    setUsePlayerLocation,
    temperatureScale,
    setTemperatureScale,
    transitionInterval,
    setTransitionInterval,
    textFont,
    setTextFont,
    textColor,
    setTextColor,
    backgroundColor, 
    setBackgroundColor, 
    backgroundImage, 
    setBackgroundImage, 
    language, 
    setLanguage, 
    languageLabels, 
    setLanguageLabels,
    onSave
}) {
    // Fields
    const [dataFeed, setDataFeed] = useState(""); // input for tags
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
                <label style={{ ...styles.field, fontWeight: "bold" }}>{card?.title || "Small Weather App"}</label>
                {card?.imageSrc && <img src={card.imageSrc} alt={card?.title || "Small Weather App"} style={styles.image} />}
                <p>Compact weather widget with location, units, and styling options.</p>
            </div>

            {/* Right Portion */}
            <div style={styles.right}>
                <div style={styles.topButtons}>
                    <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                        <button style={styles.settingsButton}>
                            Settings
                        </button>
                        <button
                            style={styles.languageButton}
                            onClick={onSwitchToLanguage}
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

                    {/* Temperature Scale */}
                    <div style={styles.field}>
                        <label>Temperature scale</label>
                        <select
                            value={temperatureScale}
                            onChange={(e) => setTemperatureScale(e.target.value)}
                            style={styles.input}
                        >
                            <option value="Fahrenheit">Fahrenheit</option>
                            <option value="Celsius">Celsius</option>
                        </select>
                    </div>

                    {/* Transition Interval */}
                    <div style={styles.field}>
                        <label>Transition interval (seconds) <span style={styles.optional}>(optional)</span></label>
                        <input
                            type="number"
                            min="1"
                            value={transitionInterval}
                            onChange={(e) => setTransitionInterval(e.target.value)}
                            style={styles.input} />
                        <p style={styles.helpText}>Time in seconds between weather transitions. Set to 0 to disable transitions.</p>
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
                    <button onClick={onSave} style={styles.saveBtn}>Save</button>
                </div>

                {/* Preview Popup */}
                {showPopup && (
                    <SmallWeatherAppPopUp
                        onClose={() => setShowPopup(false)}
                        appName={appName}
                        forecastLocation={forecastLocation}
                        locationName={locationName}
                        usePlayerLocation={usePlayerLocation}
                        temperatureScale={temperatureScale}
                        transitionInterval={transitionInterval}
                        textFont={textFont}
                        textColor={textColor}
                        backgroundColor={backgroundColor}
                        backgroundImage={backgroundImage}
                        language={language}
                        labels={languageLabels}
                    />
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
        marginBottom: "20px",
    },
    settingsButton: {
        backgroundColor: "#4a90e2",
        color: "white",
        border: "none",
        padding: "8px 15px",
        borderRadius: "4px",
        cursor: "pointer",
        fontWeight: "bold",
    },
    languageButton: {
        backgroundColor: "#f5f5f5",
        border: "1px solid #ddd",
        padding: "8px 15px",
        borderRadius: "4px",
        cursor: "pointer",
    },
    tabContent: {
        flex: 1,
        overflowY: "auto",
        paddingRight: "10px",
    },
    field: {
        marginBottom: "20px",
    },
    input: {
        width: "100%",
        padding: "8px",
        borderRadius: "4px",
        border: "1px solid #ccc",
        marginTop: "5px",
    },
    errorMessage: {
        color: "#ff0000",
        fontSize: "12px",
        marginTop: "5px",
        display: "flex",
        alignItems: "center",
    },
    errorIcon: {
        marginRight: "5px",
    },
    optional: {
        color: "#888",
        fontSize: "12px",
        marginLeft: "5px",
    },
    tag: {
        backgroundColor: "#e9ecef",
        padding: "4px 8px",
        borderRadius: "4px",
        display: "inline-flex",
        alignItems: "center",
        fontSize: "14px",
    },
    removeTag: {
        background: "none",
        border: "none",
        color: "#888",
        cursor: "pointer",
        marginLeft: "5px",
        padding: "0 5px",
        fontSize: "16px",
        lineHeight: 1,
    },
    helpText: {
        color: "#666",
        fontSize: "12px",
        marginTop: "5px",
        marginBottom: 0,
    },
    checkboxContainer: {
        display: "flex",
        alignItems: "center",
        marginBottom: "5px",
    },
    checkbox: {
        marginRight: "10px",
    },
    colorInputContainer: {
        display: "flex",
        gap: "10px",
        alignItems: "center",
    },
    colorTextInput: {
        flex: 1,
        padding: "8px",
        borderRadius: "4px",
        border: "1px solid #ccc",
    },
    colorPicker: {
        width: "50px",
        height: "36px",
        padding: 0,
        border: "1px solid #ccc",
        borderRadius: "4px",
    },
    backgroundImageContainer: {
        display: "flex",
        gap: "10px",
        marginTop: "5px",
    },
    backgroundImageInput: {
        flex: 1,
        padding: "8px",
        borderRadius: "4px",
        border: "1px solid #ccc",
    },
    backgroundImageButton: {
        backgroundColor: "#f5f5f5",
        border: "1px solid #ccc",
        borderRadius: "4px",
        padding: "0 15px",
        cursor: "pointer",
    },
    imagePreview: {
        position: "relative",
        marginTop: "10px",
        width: "100%",
        height: "150px",
        borderRadius: "4px",
        overflow: "hidden",
    },
    previewImage: {
        width: "100%",
        height: "100%",
        objectFit: "cover",
    },
    removeImageButton: {
        position: "absolute",
        top: "5px",
        right: "5px",
        backgroundColor: "rgba(0,0,0,0.6)",
        color: "white",
        border: "none",
        borderRadius: "50%",
        width: "24px",
        height: "24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        fontSize: "16px",
        lineHeight: 1,
    },
    bottomButtons: {
        display: "flex",
        justifyContent: "flex-end",
        gap: "10px",
        marginTop: "20px",
    },
    previewBtn: {
        backgroundColor: "#f5f5f5",
        border: "1px solid #ccc",
        padding: "8px 20px",
        borderRadius: "4px",
        cursor: "pointer",
    },
    saveBtn: {
        backgroundColor: "#4a90e2",
        color: "white",
        border: "none",
        padding: "8px 20px",
        borderRadius: "4px",
        cursor: "pointer",
    },
};

export default SmallWeatherAppForm;