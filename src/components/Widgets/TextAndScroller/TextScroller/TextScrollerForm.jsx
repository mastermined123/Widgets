import React, { useState } from "react";
import TextScrollerPopUp from "./TextScrollerPopUp";

function TextScrollerForm({ card }) {
    const [activeTab, setActiveTab] = useState("settings");

    // Fields
    const [appName, setAppName] = useState("");
    const [tags, setTags] = useState([]);
    const [dataFeed, setDataFeed] = useState(""); // input for tags
    const [textColor, setTextColor] = useState("#ffffff");
    const [backgroundColor, setBackgroundColor] = useState("#007184");
    const [scrollSpeed, setScrollSpeed] = useState("Default");
    const [customScrollSpeed, setCustomScrollSpeed] = useState("");
    const [fontSize, setFontSize] = useState("");
    const [textFont, setTextFont] = useState("");
    const [text, setText] = useState("");

    const [showPopup, setShowPopup] = useState(false);
    const [appNameError, setAppNameError] = useState("");
    const [textError, setTextError] = useState("");

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

        if (!text.trim()) {
            setTextError("Please enter text to scroll.");
            hasError = true;
        } else {
            setTextError("");
        }

        if (!hasError) {
            setShowPopup(true);
        }
    };

    const handleSave = () => {
        console.log({
            appName,
            tags,
            textColor,
            backgroundColor,
            scrollSpeed,
            customScrollSpeed,
            fontSize,
            textFont,
            text,
        });
        alert("Saved! Check console.");
    };

    return (
        <div style={styles.container}>
            {/* Left Portion */}
            <div style={styles.left}>
                <label style={{ ...styles.field, fontWeight: "bold" }}>{card?.title || "Text Scroller"}</label>
                {card?.imageSrc && <img src={card.imageSrc} alt={card?.title || "Text Scroller"} style={styles.image} />}
                <p>Create scrolling text displays with customizable colors, fonts, and scroll speeds.</p>
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

                            {/* Tags (optional) */}
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

                            {/* Text color */}
                            <div style={styles.field}>
                                <label>Text color</label>
                                <div style={styles.colorInputContainer}>
                                    <input
                                        type="text"
                                        value={textColor}
                                        onChange={(e) => setTextColor(e.target.value)}
                                        style={styles.colorTextInput}
                                        placeholder="#ffffff" />
                                    <input
                                        type="color"
                                        value={textColor}
                                        onChange={(e) => setTextColor(e.target.value)}
                                        style={styles.colorPicker} />
                                </div>
                            </div>

                            {/* Background color */}
                            <div style={styles.field}>
                                <label>Background color</label>
                                <div style={styles.colorInputContainer}>
                                    <input
                                        type="text"
                                        value={backgroundColor}
                                        onChange={(e) => setBackgroundColor(e.target.value)}
                                        style={styles.colorTextInput}
                                        placeholder="#007184" />
                                    <input
                                        type="color"
                                        value={backgroundColor}
                                        onChange={(e) => setBackgroundColor(e.target.value)}
                                        style={styles.colorPicker} />
                                </div>
                            </div>

                            {/* Scroll speed */}
                            <div style={styles.field}>
                                <label>Scroll speed</label>
                                <select
                                    value={scrollSpeed}
                                    onChange={(e) => setScrollSpeed(e.target.value)}
                                    style={styles.input}
                                >
                                    <option value="Default">Default</option>
                                    <option value="Slow">Slow</option>
                                    <option value="Fast">Fast</option>
                                </select>
                            </div>

                            {/* Custom scrolling speed */}
                            <div style={styles.field}>
                                <label>Custom scrolling speed (20-1000) <span style={styles.optional}>(optional)</span></label>
                                <input
                                    type="number"
                                    value={customScrollSpeed}
                                    onChange={(e) => setCustomScrollSpeed(e.target.value)}
                                    placeholder="300"
                                    min="20"
                                    max="1000"
                                    style={styles.input}
                                />
                                <small style={styles.helpText}>
                                    Overwrites the scroll speed, if set. A lower number will result in a lower scrolling speed. As an example, our default speed is 300.
                                </small>
                            </div>

                            {/* Font size */}
                            <div style={styles.field}>
                                <label>Font size (%) <span style={styles.optional}>(optional)</span></label>
                                <input
                                    type="number"
                                    value={fontSize}
                                    onChange={(e) => setFontSize(e.target.value)}
                                    placeholder="100"
                                    style={styles.input}
                                />
                                <small style={styles.helpText}>
                                    Increase or decrease the font size by the desired percentage. Numbers only.
                                </small>
                            </div>

                            {/* Text font */}
                            <div style={styles.field}>
                                <label>Text font <span style={styles.optional}>(optional)</span></label>
                                <select
                                    value={textFont}
                                    onChange={(e) => setTextFont(e.target.value)}
                                    style={styles.input}
                                >
                                    <option value="">Click here to select a font</option>
                                    <option value="Arial">Arial</option>
                                    <option value="Verdana">Verdana</option>
                                    <option value="Times New Roman">Times New Roman</option>
                                    <option value="Helvetica">Helvetica</option>
                                    <option value="Georgia">Georgia</option>
                                    <option value="Courier New">Courier New</option>
                                </select>
                                <small style={styles.helpText}>
                                    Change the font used to show the text.
                                </small>
                            </div>

                            {/* Text */}
                            <div style={styles.field}>
                                <label>Text</label>
                                <textarea
                                    value={text}
                                    onChange={(e) => {
                                        setText(e.target.value);
                                        if (textError) setTextError("");
                                    }}
                                    placeholder="Enter text to scroll"
                                    style={{
                                        ...styles.textarea,
                                        borderColor: textError ? "#ff0000" : "#ccc"
                                    }}
                                    rows={6}
                                />
                                <small style={styles.helpText}>
                                    One line per message
                                </small>
                                {textError && (
                                    <div style={styles.errorMessage}>
                                        <span style={styles.errorIcon}>⚠</span>
                                        {textError}
                                    </div>
                                )}
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
                    <TextScrollerPopUp
                        onClose={() => setShowPopup(false)}
                        appName={appName}
                        tags={tags}
                        textColor={textColor}
                        backgroundColor={backgroundColor}
                        scrollSpeed={scrollSpeed}
                        customScrollSpeed={customScrollSpeed}
                        fontSize={fontSize}
                        textFont={textFont}
                        text={text}
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
        fontSize: "14px"
    },
    textarea: {
        padding: "8px",
        borderRadius: "4px",
        border: "1px solid #ccc",
        fontSize: "14px",
        resize: "vertical",
        fontFamily: "inherit"
    },
    optional: {
        color: "#666",
        fontSize: "12px",
        fontWeight: "normal"
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
        backgroundColor: "#e0e0e0",
        borderRadius: "12px",
        display: "flex",
        alignItems: "center",
        gap: "4px",
        fontSize: "12px",
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
        fontSize: "14px",
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

export default TextScrollerForm;
