import React, { useState } from "react";
import TodayDatePopUp from "./TodayDatePopUp";

function TodayDateForm({ card }) {
    const [activeTab, setActiveTab] = useState("settings");

    // Fields
    const [appName, setAppName] = useState("");
    const [tags, setTags] = useState([]);
    const [dataFeed, setDataFeed] = useState(""); // input for tags

    const [dateFormat, setDateFormat] = useState("Numeric"); // Numeric/Short/Long
    const [centralBgColor, setCentralBgColor] = useState("#506172");
    const [borderBgColor, setBorderBgColor] = useState("#2c353f");
    const [textFont, setTextFont] = useState("Roboto Bold");
    const [fontColor, setFontColor] = useState("#ffffff");

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
            dateFormat,
            centralBgColor,
            borderBgColor,
            textFont,
            fontColor,
        });
        alert("Saved! Check console.");
    };

    return (
        <div style={styles.container}>
            {/* Left Portion */}
            <div style={styles.left}>
                <label style={{ ...styles.field, fontWeight: "bold" }}>{card?.title || "Today Date"}</label>
                {card?.imageSrc && <img src={card.imageSrc} alt={card?.title || "Today Date"} style={styles.image} />}
                <p>Display today's date with customizable format and styling options.</p>
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

                            {/* Date Format */}
                            <div style={styles.field}>
                                <label>Date Format</label>
                                <select
                                    value={dateFormat}
                                    onChange={(e) => setDateFormat(e.target.value)}
                                    style={styles.input}
                                >
                                    <option value="Numeric">Numeric</option>
                                    <option value="Short">Short</option>
                                    <option value="Long">Long</option>
                                </select>
                                <p style={styles.helpText}>Change the date format — Adapts based on the selected language.</p>
                            </div>

                            {/* Central Background Color */}
                            <div style={styles.field}>
                                <label>Central Background Color <span style={styles.optional}>(optional)</span></label>
                                <div style={styles.colorInputContainer}>
                                    <input
                                        type="text"
                                        value={centralBgColor}
                                        onChange={(e) => setCentralBgColor(e.target.value)}
                                        style={styles.colorTextInput}
                                        placeholder="#506172" />
                                    <input
                                        type="color"
                                        value={centralBgColor}
                                        onChange={(e) => setCentralBgColor(e.target.value)}
                                        style={styles.colorPicker} />
                                </div>
                                <p style={styles.helpText}>Change the background color gradient.</p>
                            </div>

                            {/* Border Background Color */}
                            <div style={styles.field}>
                                <label>Border Background Color <span style={styles.optional}>(optional)</span></label>
                                <div style={styles.colorInputContainer}>
                                    <input
                                        type="text"
                                        value={borderBgColor}
                                        onChange={(e) => setBorderBgColor(e.target.value)}
                                        style={styles.colorTextInput}
                                        placeholder="#2c353f" />
                                    <input
                                        type="color"
                                        value={borderBgColor}
                                        onChange={(e) => setBorderBgColor(e.target.value)}
                                        style={styles.colorPicker} />
                                </div>
                                <p style={styles.helpText}>Change the background color gradient.</p>
                            </div>

                            {/* Text Font */}
                            <div style={styles.field}>
                                <label>Text Font <span style={styles.optional}>(optional)</span></label>
                                <select
                                    value={textFont}
                                    onChange={(e) => setTextFont(e.target.value)}
                                    style={styles.fontSelect}
                                >
                                    <option value="Roboto Bold">Roboto Bold</option>
                                    <option value="Roboto Bold Italic">Roboto Bold Italic</option>
                                    <option value="Roboto Condensed Normal">Roboto Condensed Normal</option>
                                    <option value="Roboto Condensed Italic">Roboto Condensed Italic</option>
                                    <option value="Roboto Condensed Bold">Roboto Condensed Bold</option>
                                    <option value="Roboto Condensed Bold Italic">Roboto Condensed Bold Italic</option>
                                    <option value="Roboto Mono Normal">Roboto Mono Normal</option>
                                    <option value="Roboto Mono Italic">Roboto Mono Italic</option>
                                    <option value="Arial">Arial</option>
                                    <option value="Helvetica">Helvetica</option>
                                    <option value="Times New Roman">Times New Roman</option>
                                    <option value="Georgia">Georgia</option>
                                    <option value="Verdana">Verdana</option>
                                    <option value="Courier New">Courier New</option>
                                </select>
                                <p style={styles.helpText}>Change the font used to show the text.</p>
                            </div>

                            {/* Font Color */}
                            <div style={styles.field}>
                                <label>Font Color <span style={styles.optional}>(optional)</span></label>
                                <div style={styles.colorInputContainer}>
                                    <input
                                        type="text"
                                        value={fontColor}
                                        onChange={(e) => setFontColor(e.target.value)}
                                        style={styles.colorTextInput}
                                        placeholder="#ffffff" />
                                    <input
                                        type="color"
                                        value={fontColor}
                                        onChange={(e) => setFontColor(e.target.value)}
                                        style={styles.colorPicker} />
                                </div>
                                <p style={styles.helpText}>Change the font color.</p>
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
                    <TodayDatePopUp
                        onClose={() => setShowPopup(false)}
                        appName={appName}
                        tags={tags}
                        dateFormat={dateFormat}
                        centralBgColor={centralBgColor}
                        borderBgColor={borderBgColor}
                        textFont={textFont}
                        fontColor={fontColor} />
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
        fontFamily: "inherit",
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
    colorPicker: {
        width: "40px",
        height: "36px",
        border: "1px solid #ccc",
        borderRadius: "4px",
        cursor: "pointer",
        padding: "0",
    },
};

export default TodayDateForm;