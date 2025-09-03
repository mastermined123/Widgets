import React, { useState } from "react";
import MultiCityClockPopUp from "./MultiCityClockPopUp";

function MultiCityClockForm({ card }) {
    const [activeTab, setActiveTab] = useState("settings");

    // Fields
    const [appName, setAppName] = useState("");
    const [tags, setTags] = useState([]);
    const [dataFeed, setDataFeed] = useState(""); // input for tags

    // Updated fields
    const [fontColor, setFontColor] = useState("#000000");
    const [handsColor, setHandsColor] = useState("#000000");
    const [bgColor, setBgColor] = useState("#f5f5f5");
    
    // Timezone fields
    const [firstTimezone, setFirstTimezone] = useState("");
    const [firstName, setFirstName] = useState("");
    const [secondTimezone, setSecondTimezone] = useState("");
    const [secondName, setSecondName] = useState("");
    const [thirdTimezone, setThirdTimezone] = useState("");
    const [thirdName, setThirdName] = useState("");

    const [showPopup, setShowPopup] = useState(false);
    const [appNameError, setAppNameError] = useState("");

    // Static dummy list of cities with timezones
    const cityTimezones = [
        { city: "New York", timezone: "America/New_York" },
        { city: "Los Angeles", timezone: "America/Los_Angeles" },
        { city: "London", timezone: "Europe/London" },
        { city: "Paris", timezone: "Europe/Paris" },
        { city: "Tokyo", timezone: "Asia/Tokyo" },
        { city: "Sydney", timezone: "Australia/Sydney" },
        { city: "Dubai", timezone: "Asia/Dubai" },
        { city: "Singapore", timezone: "Asia/Singapore" },
        { city: "Hong Kong", timezone: "Asia/Hong_Kong" },
        { city: "Mumbai", timezone: "Asia/Kolkata" },
        { city: "Berlin", timezone: "Europe/Berlin" },
        { city: "Rome", timezone: "Europe/Rome" },
        { city: "Moscow", timezone: "Europe/Moscow" },
        { city: "Cairo", timezone: "Africa/Cairo" },
        { city: "Lagos", timezone: "Africa/Lagos" },
        { city: "São Paulo", timezone: "America/Sao_Paulo" },
        { city: "Mexico City", timezone: "America/Mexico_City" },
        { city: "Toronto", timezone: "America/Toronto" },
        { city: "Vancouver", timezone: "America/Vancouver" },
        { city: "Bangkok", timezone: "Asia/Bangkok" },
        { city: "Seoul", timezone: "Asia/Seoul" },
        { city: "Beijing", timezone: "Asia/Shanghai" },
        { city: "Shanghai", timezone: "Asia/Shanghai" },
        { city: "Karachi", timezone: "Asia/Karachi" },
        { city: "Lahore", timezone: "Asia/Karachi" },
        { city: "Istanbul", timezone: "Europe/Istanbul" },
        { city: "Athens", timezone: "Europe/Athens" },
        { city: "Vienna", timezone: "Europe/Vienna" },
        { city: "Amsterdam", timezone: "Europe/Amsterdam" },
        { city: "Stockholm", timezone: "Europe/Stockholm" }
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
            fontColor,
            handsColor,
            bgColor,
            firstTimezone,
            firstName,
            secondTimezone,
            secondName,
            thirdTimezone,
            thirdName
        });
        alert("Saved! Check console.");
    };

    return (
        <div style={styles.container}>
            {/* Left Portion */}
            <div style={styles.left}>
                <label style={{ ...styles.field, fontWeight: "bold" }}>{card?.title || "Multi City Clock"}</label>
                {card?.imageSrc && <img src={card.imageSrc} alt={card?.title || "Multi City Clock"} style={styles.image} />}
                <p>Display time from multiple cities around the world with customizable colors and fonts.</p>
                <p>Better Viewed Like This:</p>
                <div style={styles.previewBoxes}>
                    <div style={{ ...styles.box, width: "100px", height: "60px" }}></div>
                    <div style={{ ...styles.box, width: "60px", height: "100px" }}></div>
                </div>
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
                                        placeholder="Enter tag"
                                        style={{ ...styles.input, flex: "1" }}
                                        onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTag())} />
                                </div>
                            </div>

                            {/* Font Color */}
                            <div style={styles.field}>
                                <label>Font Color:</label>
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

                            {/* Hands and Dial Color */}
                            <div style={styles.field}>
                                <label>Hands and dial color:</label>
                                <div style={styles.colorInputContainer}>
                                    <input
                                        type="text"
                                        value={handsColor}
                                        onChange={(e) => setHandsColor(e.target.value)}
                                        style={styles.colorTextInput}
                                        placeholder="#000000" />
                                    <input
                                        type="color"
                                        value={handsColor}
                                        onChange={(e) => setHandsColor(e.target.value)}
                                        style={styles.colorPicker} />
                                </div>
                            </div>

                            {/* Background Color */}
                            <div style={styles.field}>
                                <label>Background color:</label>
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
                            </div>

                            {/* First Timezone City */}
                            <div style={styles.field}>
                                <label>First timezone City:</label>
                                <select
                                    value={firstTimezone}
                                    onChange={(e) => setFirstTimezone(e.target.value)}
                                    style={styles.input}
                                >
                                    <option value="">Select City</option>
                                    {cityTimezones.map((item, index) => (
                                        <option key={index} value={item.timezone}>
                                            {item.city}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* First City Name */}
                            <div style={styles.field}>
                                <label>City name:</label>
                                <input
                                    type="text"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    style={styles.input}
                                    placeholder="Enter custom city name"
                                />
                            </div>

                            {/* Second Timezone City */}
                            <div style={styles.field}>
                                <label>Second timezone City:</label>
                                <select
                                    value={secondTimezone}
                                    onChange={(e) => setSecondTimezone(e.target.value)}
                                    style={styles.input}
                                >
                                    <option value="">Select City</option>
                                    {cityTimezones.map((item, index) => (
                                        <option key={index} value={item.timezone}>
                                            {item.city}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Second City Name */}
                            <div style={styles.field}>
                                <label>City name:</label>
                                <input
                                    type="text"
                                    value={secondName}
                                    onChange={(e) => setSecondName(e.target.value)}
                                    style={styles.input}
                                    placeholder="Enter custom city name"
                                />
                            </div>

                            {/* Third Timezone City */}
                            <div style={styles.field}>
                                <label>Third timezone City:</label>
                                <select
                                    value={thirdTimezone}
                                    onChange={(e) => setThirdTimezone(e.target.value)}
                                    style={styles.input}
                                >
                                    <option value="">Select City</option>
                                    {cityTimezones.map((item, index) => (
                                        <option key={index} value={item.timezone}>
                                            {item.city}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Third City Name */}
                            <div style={styles.field}>
                                <label>City name:</label>
                                <input
                                    type="text"
                                    value={thirdName}
                                    onChange={(e) => setThirdName(e.target.value)}
                                    style={styles.input}
                                    placeholder="Enter custom city name"
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
                    <MultiCityClockPopUp
                        onClose={() => setShowPopup(false)}
                        appName={appName}
                        tags={tags}
                        fontColor={fontColor}
                        handsColor={handsColor}
                        bgColor={bgColor}
                        firstTimezone={firstTimezone}
                        firstName={firstName}
                        secondTimezone={secondTimezone}
                        secondName={secondName}
                        thirdTimezone={thirdTimezone}
                        thirdName={thirdName}
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
    objectFit: "contain",
    borderRadius: "8px",
    marginBottom: "10px",
  },
  previewBoxes: { display: "flex", gap: "10px", marginTop: "10px", marginBottom: "20px" },
  box: { backgroundColor: "#ddd", display: "flex", justifyContent: "center", alignItems: "center", borderRadius: "4px" },
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
  tabContent: { flex: 1, overflowY: "auto", paddingBottom: "80px" },
  field: { display: "flex", flexDirection: "column", marginBottom: "10px" },
  input: { padding: "5px", borderRadius: "4px", border: "1px solid #ccc", marginTop: "2px" },
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
    backgroundColor: "#005481",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontWeight: "500",
  },
  previewBtn: {
    padding: "8px 16px",
    backgroundColor: "#888",
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
};

export default MultiCityClockForm;