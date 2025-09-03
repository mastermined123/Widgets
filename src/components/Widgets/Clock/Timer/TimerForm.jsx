import React, { useState } from "react";
import TimerPopUp from "./TimerPopUp";

function TimerForm({ card }) {
    const [activeTab, setActiveTab] = useState("settings");

    // Fields
    const [appName, setAppName] = useState("");
    const [tags, setTags] = useState([]);
    const [dataFeed, setDataFeed] = useState(""); // input for tags

    const [kind, setKind] = useState("Countdown"); // Countdown/Count up
    const [timer, setTimer] = useState("00:05:30"); // Timer input (hh:mm:ss)
    const [completionMessage, setCompletionMessage] = useState("Done");
    const [textFont, setTextFont] = useState("");
    const [fontColor, setFontColor] = useState("#ffffff");
    const [iconImage, setIconImage] = useState("");
    const [backgroundColor, setBackgroundColor] = useState("#1a2332");
    const [backgroundImage, setBackgroundImage] = useState("");
    const [disableIllustration, setDisableIllustration] = useState(false);
    const [disableAnimations, setDisableAnimations] = useState(false);

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

    // File upload handlers
    const handleIconImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setIconImage(e.target.result);
            };
            reader.readAsDataURL(file);
        }
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
            kind,
            timer,
            completionMessage,
            textFont,
            fontColor,
            iconImage,
            backgroundColor,
            backgroundImage,
            disableIllustration,
            disableAnimations,
        });
        alert("Saved! Check console.");
    };

    return (
        <div style={styles.container}>
            {/* Left Portion */}
            <div style={styles.left}>
                <label style={{ ...styles.field, fontWeight: "bold" }}>{card?.title || "Timer"}</label>
                {card?.imageSrc && <img src={card.imageSrc} alt={card?.title || "Timer"} style={styles.image} />}
                <p>Customizable countdown and count-up timer with completion messages and styling options.</p>
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

                            {/* Kind */}
                            <div style={styles.field}>
                                <label>Kind</label>
                                <select
                                    value={kind}
                                    onChange={(e) => setKind(e.target.value)}
                                    style={styles.input}
                                >
                                    <option value="Countdown">Countdown</option>
                                    <option value="Count up">Count up</option>
                                </select>
                            </div>

                            {/* Timer */}
                            <div style={styles.field}>
                                <label>Timer</label>
                                <input
                                    type="text"
                                    value={timer}
                                    onChange={(e) => setTimer(e.target.value)}
                                    placeholder="00:05:30"
                                    style={styles.input} />
                                <p style={styles.helpText}>Insert the time (hh:mm:ss).</p>
                            </div>

                            {/* Completion Message */}
                            <div style={styles.field}>
                                <label>Completion Message <span style={styles.optional}>(optional)</span></label>
                                <input
                                    type="text"
                                    value={completionMessage}
                                    onChange={(e) => setCompletionMessage(e.target.value)}
                                    placeholder="Done"
                                    style={styles.input} />
                                <p style={styles.helpText}>Set a text that will appear at the end of the timer.</p>
                            </div>

                            {/* Text Font */}
                            <div style={styles.field}>
                                <label>Text Font <span style={styles.optional}>(optional)</span></label>
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

                            {/* Replace Icon Image */}
                            <div style={styles.field}>
                                <label>Replace Icon Image <span style={styles.optional}>(optional)</span></label>
                                <div style={styles.imageUploadContainer}>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleIconImageUpload}
                                        style={styles.hiddenInput}
                                        id="iconImageUpload"
                                    />
                                    <label htmlFor="iconImageUpload" style={styles.chooseButton}>
                                        Choose
                                    </label>
                                    {iconImage && <span style={styles.fileName}>Image selected</span>}
                                </div>
                                <p style={styles.helpText}>The icon image will stretch to fill the app height and width.</p>
                            </div>

                            {/* Background Color */}
                            <div style={styles.field}>
                                <label>Background Color <span style={styles.optional}>(optional)</span></label>
                                <div style={styles.colorInputContainer}>
                                    <input
                                        type="text"
                                        value={backgroundColor}
                                        onChange={(e) => setBackgroundColor(e.target.value)}
                                        style={styles.colorTextInput}
                                        placeholder="#1a2332" />
                                    <input
                                        type="color"
                                        value={backgroundColor}
                                        onChange={(e) => setBackgroundColor(e.target.value)}
                                        style={styles.colorPicker} />
                                </div>
                                <p style={styles.helpText}>Change the background color.</p>
                            </div>

                            {/* Background Image */}
                            <div style={styles.field}>
                                <label>Background Image <span style={styles.optional}>(optional)</span></label>
                                <div style={styles.imageUploadContainer}>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleBackgroundImageUpload}
                                        style={styles.hiddenInput}
                                        id="backgroundImageUpload"
                                    />
                                    <label htmlFor="backgroundImageUpload" style={styles.chooseButton}>
                                        Choose
                                    </label>
                                    {backgroundImage && <span style={styles.fileName}>Image selected</span>}
                                </div>
                                <p style={styles.helpText}>The background image will stretch to fill the app height and width.</p>
                            </div>

                            {/* Disable Illustration */}
                            <div style={styles.field}>
                                <label style={styles.checkboxContainer}>
                                    <input
                                        type="checkbox"
                                        checked={disableIllustration}
                                        onChange={(e) => setDisableIllustration(e.target.checked)}
                                        style={styles.checkbox}
                                    />
                                    Disable Illustration
                                </label>
                            </div>

                            {/* Disable Animations */}
                            <div style={styles.field}>
                                <label style={styles.checkboxContainer}>
                                    <input
                                        type="checkbox"
                                        checked={disableAnimations}
                                        onChange={(e) => setDisableAnimations(e.target.checked)}
                                        style={styles.checkbox}
                                    />
                                    Disable Animations
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
                    <TimerPopUp
                        onClose={() => setShowPopup(false)}
                        appName={appName}
                        tags={tags}
                        kind={kind}
                        timer={timer}
                        completionMessage={completionMessage}
                        textFont={textFont}
                        fontColor={fontColor}
                        iconImage={iconImage}
                        backgroundColor={backgroundColor}
                        backgroundImage={backgroundImage}
                        disableIllustration={disableIllustration}
                        disableAnimations={disableAnimations}
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
    colorPicker: {
        width: "40px",
        height: "36px",
        border: "1px solid #ccc",
        borderRadius: "4px",
        cursor: "pointer",
        padding: "0",
    },
    imageUploadContainer: {
        display: "flex",
        alignItems: "center",
        gap: "10px",
    },
    chooseButton: {
        padding: "8px 16px",
        backgroundColor: "#007acc",
        color: "#fff",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        fontWeight: "500",
        textDecoration: "none",
        display: "inline-block",
    },
    hiddenInput: {
        display: "none",
    },
    fileName: {
        fontSize: "12px",
        color: "#666",
        fontStyle: "italic",
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

export default TimerForm;