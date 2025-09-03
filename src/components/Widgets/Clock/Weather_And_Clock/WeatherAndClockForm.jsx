import React, { useState } from "react";
import WeatherAndClockPopUp from "./WeatherAndClockPopUp";

function WeatherAndClockForm({ card }) {
    const [activeTab, setActiveTab] = useState("settings");

    // Settings Tab Fields
    const [appName, setAppName] = useState("");
    const [tags, setTags] = useState([]);
    const [dataFeed, setDataFeed] = useState(""); // input for tags
    const [forecastLocation, setForecastLocation] = useState("");
    const [usePlayerLocation, setUsePlayerLocation] = useState(false);
    const [timeFormat, setTimeFormat] = useState("");
    const [temperatureScale, setTemperatureScale] = useState("");
    const [layout, setLayout] = useState("");
    const [textFont, setTextFont] = useState("");
    const [fontColor, setFontColor] = useState("#000000");
    const [barColor, setBarColor] = useState("#cccccc");
    const [backgroundColor, setBackgroundColor] = useState("#ffffff");
    const [backgroundImage, setBackgroundImage] = useState("");

    // Language Tab Fields
    const [language, setLanguage] = useState("");
    const [nowLabel, setNowLabel] = useState("");
    const [todayLabel, setTodayLabel] = useState("");
    const [tomorrowLabel, setTomorrowLabel] = useState("");
    const [windLabel, setWindLabel] = useState("");
    const [humidityLabel, setHumidityLabel] = useState("");
    const [pressureLabel, setPressureLabel] = useState("");
    const [visibilityLabel, setVisibilityLabel] = useState("");

    const [showPopup, setShowPopup] = useState(false);
    const [appNameError, setAppNameError] = useState("");

    // Dummy data for dropdowns
    const forecastLocations = [
        "New York, NY",
        "London, UK",
        "Tokyo, Japan",
        "Sydney, Australia",
        "Toronto, Canada",
        "Berlin, Germany",
        "Paris, France",
        "Mumbai, India"
    ];

    const languages = [
        "English",
        "Spanish",
        "French",
        "German",
        "Italian",
        "Portuguese",
        "Dutch",
        "Russian",
        "Chinese",
        "Japanese"
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
            forecastLocation,
            usePlayerLocation,
            timeFormat,
            temperatureScale,
            layout,
            textFont,
            fontColor,
            barColor,
            backgroundColor,
            backgroundImage,
            language,
            appLabels: {
                now: nowLabel,
                today: todayLabel,
                tomorrow: tomorrowLabel,
                wind: windLabel,
                humidity: humidityLabel,
                pressure: pressureLabel,
                visibility: visibilityLabel
            }
        });
        alert("Saved! Check console.");
    };

    return (
        <div style={styles.container}>
            {/* Left Portion */}
            <div style={styles.left}>
                <label style={{ ...styles.field, fontWeight: "bold" }}>{card?.title || "Weather and Clock"}</label>
                {card?.imageSrc && <img src={card.imageSrc} alt={card?.title || "Weather and Clock"} style={styles.image} />}
                <p>Configurable weather and clock app with forecast location, time format, and customizable styling.</p>
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
                                <label>App Name:</label>
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
                                <label>Tags (optional):</label>
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
                                        placeholder="Enter a tag and press Enter"
                                        style={{ ...styles.input, flex: "1" }}
                                        onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTag())} />
                                </div>
                            </div>

                            {/* Forecast Location */}
                            <div style={styles.field}>
                                <label>Forecast Location:</label>
                                <select
                                    value={forecastLocation}
                                    onChange={(e) => setForecastLocation(e.target.value)}
                                    style={styles.input}
                                >
                                    <option value="">Select Location</option>
                                    {forecastLocations.map((location, index) => (
                                        <option key={index} value={location}>{location}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Use Player Location Checkbox */}
                            <div style={styles.field}>
                                <label style={styles.checkboxContainer}>
                                    <input
                                        type="checkbox"
                                        checked={usePlayerLocation}
                                        onChange={(e) => setUsePlayerLocation(e.target.checked)}
                                        style={styles.checkbox}
                                    />
                                    Use player location. Only available on Android Player 8.1.3 or greater.
                                </label>
                                <p style={styles.helpText}>
                                    Player location will be based on GPS, or location can be manually configured at the player settings page. Enabling this feature will override the Forecast location field.
                                </p>
                            </div>

                            {/* Time Format */}
                            <div style={styles.field}>
                                <label>Time Format:</label>
                                <select
                                    value={timeFormat}
                                    onChange={(e) => setTimeFormat(e.target.value)}
                                    style={styles.input}
                                >
                                    <option value="">Select Time Format</option>
                                    <option value="AM/PM">AM/PM</option>
                                    <option value="24H">24H</option>
                                </select>
                            </div>

                            {/* Temperature Scale */}
                            <div style={styles.field}>
                                <label>Temperature Scale:</label>
                                <select
                                    value={temperatureScale}
                                    onChange={(e) => setTemperatureScale(e.target.value)}
                                    style={styles.input}
                                >
                                    <option value="">Select Temperature Scale</option>
                                    <option value="Celsius">Celsius</option>
                                    <option value="Fahrenheit">Fahrenheit</option>
                                </select>
                            </div>

                            {/* Layout */}
                            <div style={styles.field}>
                                <label>Layout:</label>
                                <select
                                    value={layout}
                                    onChange={(e) => setLayout(e.target.value)}
                                    style={styles.input}
                                >
                                    <option value="">Select Layout</option>
                                    <option value="Clock and Weather">Clock and Weather</option>
                                    <option value="Clock">Clock</option>
                                    <option value="Weather">Weather</option>
                                </select>
                                <p style={styles.helpText}>
                                    Choose which information the app will be showing.
                                </p>
                            </div>

                            {/* Text Font (optional) */}
                            <div style={styles.field}>
                                <label>Text Font (optional):</label>
                                <input
                                    type="text"
                                    value={textFont}
                                    onChange={(e) => setTextFont(e.target.value)}
                                    style={styles.input}
                                    placeholder="e.g., Arial, Helvetica, sans-serif"
                                />
                            </div>

                            {/* Font Color (optional) */}
                            <div style={styles.field}>
                                <label>Font Color (optional):</label>
                                <div style={styles.colorInputContainer}>
                                    <input
                                        type="text"
                                        value={fontColor}
                                        onChange={(e) => setFontColor(e.target.value)}
                                        style={styles.colorTextInput}
                                        placeholder="#000000"
                                    />
                                    <input
                                        type="color"
                                        value={fontColor}
                                        onChange={(e) => setFontColor(e.target.value)}
                                        style={styles.colorPicker}
                                    />
                                </div>
                            </div>

                            {/* Bar Color (optional) */}
                            <div style={styles.field}>
                                <label>Bar Color (optional):</label>
                                <div style={styles.colorInputContainer}>
                                    <input
                                        type="text"
                                        value={barColor}
                                        onChange={(e) => setBarColor(e.target.value)}
                                        style={styles.colorTextInput}
                                        placeholder="#cccccc"
                                    />
                                    <input
                                        type="color"
                                        value={barColor}
                                        onChange={(e) => setBarColor(e.target.value)}
                                        style={styles.colorPicker}
                                    />
                                </div>
                            </div>

                            {/* Background Color (optional) */}
                            <div style={styles.field}>
                                <label>Background Color (optional):</label>
                                <div style={styles.colorInputContainer}>
                                    <input
                                        type="text"
                                        value={backgroundColor}
                                        onChange={(e) => setBackgroundColor(e.target.value)}
                                        style={styles.colorTextInput}
                                        placeholder="#ffffff"
                                    />
                                    <input
                                        type="color"
                                        value={backgroundColor}
                                        onChange={(e) => setBackgroundColor(e.target.value)}
                                        style={styles.colorPicker}
                                    />
                                </div>
                            </div>

                            {/* Background Image (optional) */}
                            <div style={styles.field}>
                                <label>Background Image (optional):</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => {
                                        const file = e.target.files[0];
                                        if (file) {
                                            const reader = new FileReader();
                                            reader.onload = (e) => setBackgroundImage(e.target.result);
                                            reader.readAsDataURL(file);
                                        }
                                    }}
                                    style={styles.input}
                                />
                                {backgroundImage && (
                                    <div style={styles.imagePreview}>
                                        <img src={backgroundImage} alt="Background preview" style={styles.previewImg} />
                                        <button onClick={() => setBackgroundImage("")} style={styles.removeImageBtn}>
                                            Remove
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {activeTab === "language" && (
                        <div>
                            {/* Language */}
                            <div style={styles.field}>
                                <label>Language:</label>
                                <select
                                    value={language}
                                    onChange={(e) => setLanguage(e.target.value)}
                                    style={styles.input}
                                >
                                    <option value="">Select Language</option>
                                    {languages.map((lang, index) => (
                                        <option key={index} value={lang}>{lang}</option>
                                    ))}
                                </select>
                            </div>

                            {/* App Labels Section */}
                            <div style={styles.sectionHeader}>
                                <h3>App Labels</h3>
                                <p style={styles.helpText}>
                                    These labels will be displayed in the app. You can choose to override them if the default translation shown below does not fit your needs.
                                </p>
                            </div>

                            {/* Now Label */}
                            <div style={styles.field}>
                                <label>Now:</label>
                                <input
                                    type="text"
                                    value={nowLabel}
                                    onChange={(e) => setNowLabel(e.target.value)}
                                    style={styles.input}
                                    placeholder="Now"
                                />
                            </div>

                            {/* Today Label */}
                            <div style={styles.field}>
                                <label>Today:</label>
                                <input
                                    type="text"
                                    value={todayLabel}
                                    onChange={(e) => setTodayLabel(e.target.value)}
                                    style={styles.input}
                                    placeholder="Today"
                                />
                            </div>

                            {/* Tomorrow Label */}
                            <div style={styles.field}>
                                <label>Tomorrow:</label>
                                <input
                                    type="text"
                                    value={tomorrowLabel}
                                    onChange={(e) => setTomorrowLabel(e.target.value)}
                                    style={styles.input}
                                    placeholder="Tomorrow"
                                />
                            </div>

                            {/* Wind Label */}
                            <div style={styles.field}>
                                <label>Wind:</label>
                                <input
                                    type="text"
                                    value={windLabel}
                                    onChange={(e) => setWindLabel(e.target.value)}
                                    style={styles.input}
                                    placeholder="Wind"
                                />
                            </div>

                            {/* Humidity Label */}
                            <div style={styles.field}>
                                <label>Humidity:</label>
                                <input
                                    type="text"
                                    value={humidityLabel}
                                    onChange={(e) => setHumidityLabel(e.target.value)}
                                    style={styles.input}
                                    placeholder="Humidity"
                                />
                            </div>

                            {/* Pressure Label */}
                            <div style={styles.field}>
                                <label>Pressure:</label>
                                <input
                                    type="text"
                                    value={pressureLabel}
                                    onChange={(e) => setPressureLabel(e.target.value)}
                                    style={styles.input}
                                    placeholder="Pressure"
                                />
                            </div>

                            {/* Visibility Label */}
                            <div style={styles.field}>
                                <label>Visibility:</label>
                                <input
                                    type="text"
                                    value={visibilityLabel}
                                    onChange={(e) => setVisibilityLabel(e.target.value)}
                                    style={styles.input}
                                    placeholder="Visibility"
                                />
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
                    <WeatherAndClockPopUp
                        onClose={() => setShowPopup(false)}
                        appName={appName}
                        tags={tags}
                        forecastLocation={forecastLocation}
                        usePlayerLocation={usePlayerLocation}
                        timeFormat={timeFormat}
                        temperatureScale={temperatureScale}
                        layout={layout}
                        textFont={textFont}
                        fontColor={fontColor}
                        barColor={barColor}
                        backgroundColor={backgroundColor}
                        backgroundImage={backgroundImage}
                        language={language}
                        appLabels={{
                            now: nowLabel,
                            today: todayLabel,
                            tomorrow: tomorrowLabel,
                            wind: windLabel,
                            humidity: humidityLabel,
                            pressure: pressureLabel,
                            visibility: visibilityLabel
                        }}
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
    tabs: { 
        display: "flex", 
        gap: "10px", 
        marginBottom: "15px" 
    },
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
    tabContent: { 
        flex: 1, 
        overflowY: "auto" 
    },
    field: { 
        display: "flex", 
        flexDirection: "column", 
        marginBottom: "10px" 
    },
    input: { 
        padding: "5px", 
        borderRadius: "4px", 
        border: "1px solid #ccc" 
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
        lineHeight: "16px",
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
        padding: "5px",
        borderRadius: "4px",
        border: "1px solid #ccc",
        fontSize: "14px",
    },
    colorPicker: {
        width: "40px",
        height: "32px",
        border: "1px solid #ccc",
        borderRadius: "4px",
        cursor: "pointer",
        padding: "0",
    },
    checkboxContainer: {
        display: "flex",
        alignItems: "flex-start",
        gap: "8px",
        cursor: "pointer",
        fontSize: "14px",
        lineHeight: "1.4",
    },
    checkbox: {
        marginTop: "2px",
        cursor: "pointer",
    },
    helpText: {
        fontSize: "12px",
        color: "#666",
        marginTop: "5px",
        fontStyle: "italic",
        lineHeight: "1.4",
    },
    sectionHeader: {
        marginBottom: "15px",
        paddingBottom: "10px",
        borderBottom: "1px solid #eee",
    },
    imagePreview: {
        marginTop: "10px",
        display: "flex",
        alignItems: "center",
        gap: "10px",
    },
    previewImg: {
        width: "60px",
        height: "40px",
        objectFit: "cover",
        borderRadius: "4px",
        border: "1px solid #ddd",
    },
    removeImageBtn: {
        padding: "4px 8px",
        backgroundColor: "#ff4444",
        color: "#fff",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        fontSize: "12px",
    },
};

export default WeatherAndClockForm;