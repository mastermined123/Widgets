/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import RoundModernClockPopUp from "./RoundModernClockPopUp";

function RoundModernClockForm({ card }) {
    const [activeTab, setActiveTab] = useState("settings");

    // Fields
    const [appName, setAppName] = useState("");
    const [tags, setTags] = useState([]);
    const [dataFeed, setDataFeed] = useState(""); // input for tags

    const [clockFormat, setClockFormat] = useState("Hours, Minutes and Seconds"); // Clock format options
    const [timeFormat, setTimeFormat] = useState("AM/PM"); // AM/PM or 24h
    const [textFont, setTextFont] = useState(""); // font selection
    const [fontColor, setFontColor] = useState("#000000");
    const [backgroundColor, setBackgroundColor] = useState("#ffffff");
    const [backgroundImage, setBackgroundImage] = useState("");
    const [hideDate, setHideDate] = useState(false);
    const [hideDigitalClock, setHideDigitalClock] = useState(false);

    const [showPopup, setShowPopup] = useState(false);
    const [appNameError, setAppNameError] = useState("");

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
            clockFormat,
            timeFormat,
            textFont,
            fontColor,
            backgroundColor,
            backgroundImage,
            hideDate,
            hideDigitalClock,
        });
        alert("Saved! Check console.");
    };

    return (
        <div style={styles.container}>
            {/* Left Portion */}
            <div style={styles.left}>
                <label style={{ ...styles.field, fontWeight: "bold" }}>{card?.title || "Round Modern Clock"}</label>
                {card?.imageSrc && <img src={card.imageSrc} alt={card?.title || "Round Modern Clock"} style={styles.image} />}
                <p>Modern round clock with customizable format, colors, and display options.</p>
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

                            {/* Clock Format */}
                            <div style={styles.field}>
                                <label>Clock format</label>
                                <select
                                    value={clockFormat}
                                    onChange={(e) => setClockFormat(e.target.value)}
                                    style={styles.input}
                                >
                                    <option value="Hours, Minutes and Seconds">Hours, Minutes and Seconds</option>
                                    <option value="Hours and Minutes">Hours and Minutes</option>
                                    <option value="Minutes and Seconds">Minutes and Seconds</option>
                                </select>
                                <p style={styles.helpText}>Choose which informations the clock will be showing.</p>
                            </div>

                            {/* Time Format */}
                            <div style={styles.field}>
                                <label>Time format</label>
                                <select
                                    value={timeFormat}
                                    onChange={(e) => setTimeFormat(e.target.value)}
                                    style={styles.input}
                                >
                                    <option value="AM/PM">AM/PM</option>
                                    <option value="24h">24h</option>
                                </select>
                            </div>

                            {/* Text Font */}
                            <div style={styles.field}>
                                <label>Text font <span style={styles.optional}>(optional)</span></label>
                                <select
                                    value={textFont}
                                    onChange={(e) => setTextFont(e.target.value)}
                                    style={styles.fontSelect}
                                >
                                    <option value="">Click here to select a font</option>
                                    <option value="Arial">Arial</option>
                                    <option value="Helvetica">Helvetica</option>
                                    <option value="Times New Roman">Times New Roman</option>
                                    <option value="Georgia">Georgia</option>
                                    <option value="Verdana">Verdana</option>
                                    <option value="Courier New">Courier New</option>
                                    <option value="Impact">Impact</option>
                                    <option value="Comic Sans MS">Comic Sans MS</option>
                                </select>
                                <p style={styles.helpText}>Change the font used to show the text.</p>
                            </div>

                            {/* Font Color */}
                            <div style={styles.field}>
                                <label>Font color <span style={styles.optional}>(optional)</span></label>
                                <div style={styles.colorInputContainer}>
                                    <input
                                        type="text"
                                        value={fontColor}
                                        onChange={(e) => setFontColor(e.target.value)}
                                        style={styles.colorTextInput}
                                        placeholder="#000000" />
                                    <div style={styles.transparentPattern}></div>
                                </div>
                                <p style={styles.helpText}>Change the font color.</p>
                            </div>

                            {/* Background Color */}
                            <div style={styles.field}>
                                <label>Background color <span style={styles.optional}>(optional)</span></label>
                                <div style={styles.colorInputContainer}>
                                    <input
                                        type="text"
                                        value={backgroundColor}
                                        onChange={(e) => setBackgroundColor(e.target.value)}
                                        style={styles.colorTextInput}
                                        placeholder="#ffffff" />
                                    <div style={styles.transparentPattern}></div>
                                </div>
                                <p style={styles.helpText}>Change the background color.</p>
                            </div>

                            {/* Background Image */}
                            <div style={styles.field}>
                                <label>Background Image <span style={styles.optional}>(optional)</span></label>
                                <div style={styles.imageUploadContainer}>
                                    <button style={styles.chooseButton}>Choose</button>
                                </div>
                                <p style={styles.helpText}>The background image will stretch to fill the app height and width.</p>
                            </div>

                            {/* Hide Date */}
                            <div style={styles.field}>
                                <label style={styles.checkboxContainer}>
                                    <input
                                        type="checkbox"
                                        checked={hideDate}
                                        onChange={(e) => setHideDate(e.target.checked)}
                                        style={styles.checkbox}
                                    />
                                    Hide date
                                </label>
                            </div>

                            {/* Hide Digital Clock */}
                            <div style={styles.field}>
                                <label style={styles.checkboxContainer}>
                                    <input
                                        type="checkbox"
                                        checked={hideDigitalClock}
                                        onChange={(e) => setHideDigitalClock(e.target.checked)}
                                        style={styles.checkbox}
                                    />
                                    Hide digital clock
                                </label>
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
                    <RoundModernClockPopUp
                        onClose={() => setShowPopup(false)}
                        appName={appName}
                        tags={tags}
                        clockFormat={clockFormat}
                        timeFormat={timeFormat}
                        textFont={textFont}
                        fontColor={fontColor}
                        backgroundColor={backgroundColor}
                        backgroundImage={backgroundImage}
                        hideDate={hideDate}
                        hideDigitalClock={hideDigitalClock}
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
        height: "600px",
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
    tabContent: { flex: 1, overflowY: "auto" },
    field: { display: "flex", flexDirection: "column", marginBottom: "15px" },
    input: { 
        padding: "8px", 
        borderRadius: "4px", 
        border: "1px solid #ccc",
        fontSize: "14px",
    },
    fontSelect: {
        padding: "8px", 
        borderRadius: "4px", 
        border: "1px solid #ccc",
        fontSize: "14px",
        color: "#007acc",
        cursor: "pointer",
    },
    optional: {
        color: "#666",
        fontWeight: "normal",
        fontSize: "12px",
    },
    helpText: {
        fontSize: "12px",
        color: "#666",
        margin: "4px 0 0 0",
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
        backgroundColor: "#e0e0e0",
        borderRadius: "4px",
        display: "flex",
        alignItems: "center",
        gap: "4px",
        fontSize: "12px",
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
        fontSize: "10px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
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
    transparentPattern: {
        width: "40px",
        height: "36px",
        border: "1px solid #ccc",
        borderRadius: "4px",
        backgroundImage: `
            linear-gradient(45deg, #ccc 25%, transparent 25%), 
            linear-gradient(-45deg, #ccc 25%, transparent 25%), 
            linear-gradient(45deg, transparent 75%, #ccc 75%), 
            linear-gradient(-45deg, transparent 75%, #ccc 75%)
        `,
        backgroundSize: "8px 8px",
        backgroundPosition: "0 0, 0 4px, 4px -4px, -4px 0px",
    },
    imageUploadContainer: {
        display: "flex",
        alignItems: "center",
    },
    chooseButton: {
        padding: "8px 16px",
        backgroundColor: "#007acc",
        color: "#fff",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        fontWeight: "500",
    },
    checkboxContainer: {
        display: "flex",
        alignItems: "center",
        gap: "8px",
        cursor: "pointer",
    },
    checkbox: {
        width: "16px",
        height: "16px",
        cursor: "pointer",
    },
};

export default RoundModernClockForm;