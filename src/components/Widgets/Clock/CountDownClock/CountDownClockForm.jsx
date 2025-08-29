import React, { useState } from "react";
import CountDownClockPopUp from "./CountDownClockPopUp";

function CountDownClockForm({ card }) {
    const [activeTab, setActiveTab] = useState("settings");

    // Fields
    const [appName, setAppName] = useState("");
    const [tags, setTags] = useState([]);
    const [dataFeed, setDataFeed] = useState(""); // input for tags

    const [type, setType] = useState("Countdown"); // Countdown / Count Up
    const [eventDateTime, setEventDateTime] = useState("");
    const [completionMessage, setCompletionMessage] = useState("Done!");
    const [title, setTitle] = useState("");
    const [subtitle, setSubtitle] = useState("Be Ready");
    const [textFont, setTextFont] = useState("");
    const [mainColor, setMainColor] = useState("#ffffff");
    const [secondaryColor, setSecondaryColor] = useState("#ff6b35");
    const [backgroundColor, setBackgroundColor] = useState("#2c1810");
    const [backgroundImage, setBackgroundImage] = useState("");
    const [disableIllustration, setDisableIllustration] = useState(false);
    const [disableAnimations, setDisableAnimations] = useState(false);

    const [showPopup, setShowPopup] = useState(false);
    const [showDatePicker, setShowDatePicker] = useState(false);
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
            type,
            eventDateTime,
            completionMessage,
            title,
            subtitle,
            textFont,
            mainColor,
            secondaryColor,
            backgroundColor,
            backgroundImage,
            disableIllustration,
            disableAnimations,
        });
        alert("Saved! Check console.");
    };

    const handleDateTimeClick = () => {
        setShowDatePicker(true);
    };

    const handleDateSelect = (date) => {
        setEventDateTime(date.toISOString().slice(0, 16));
        setShowDatePicker(false);
    };

    return (
        <div style={styles.container}>
            {/* Left Portion */}
            <div style={styles.left}>
                <label style={{ ...styles.field, fontWeight: "bold" }}>{card?.title || "Countdown Clock"}</label>
                {card?.imageSrc && <img src={card.imageSrc} alt={card?.title || "Countdown Clock"} style={styles.image} />}
                <p>Create countdown timers with custom styling and animations for events.</p>
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

                            {/* Type */}
                            <div style={styles.field}>
                                <label>Type</label>
                                <select
                                    value={type}
                                    onChange={(e) => setType(e.target.value)}
                                    style={styles.input}
                                >
                                    <option value="Countdown">Countdown</option>
                                    <option value="Count Up">Count Up</option>
                                </select>
                            </div>

                            {/* Event Date and Time */}
                            <div style={styles.field}>
                                <label>Event Date and Time</label>
                                <div style={styles.dateTimeContainer}>
                                    <input
                                        type="datetime-local"
                                        value={eventDateTime}
                                        onChange={(e) => setEventDateTime(e.target.value)}
                                        style={styles.input}
                                        onClick={handleDateTimeClick}
                                    />
                                </div>
                                <small style={styles.helpText}>Select date and time</small>
                            </div>

                            {/* Completion Message */}
                            <div style={styles.field}>
                                <label>Completion Message <span style={styles.optional}>(optional)</span></label>
                                <input
                                    type="text"
                                    value={completionMessage}
                                    onChange={(e) => setCompletionMessage(e.target.value)}
                                    placeholder="Done!"
                                    style={styles.input} />
                                <small style={styles.helpText}>Set a text that will appear at the end of the count.</small>
                            </div>

                            {/* Title */}
                            <div style={styles.field}>
                                <label>Title</label>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    style={styles.input} />
                                <small style={styles.helpText}>Set a text that will appear at top of the app.</small>
                            </div>

                            {/* Subtitle */}
                            <div style={styles.field}>
                                <label>Subtitle <span style={styles.optional}>(optional)</span></label>
                                <input
                                    type="text"
                                    value={subtitle}
                                    onChange={(e) => setSubtitle(e.target.value)}
                                    placeholder="Be Ready"
                                    style={styles.input} />
                                <small style={styles.helpText}>Set a text that will appear above the title.</small>
                            </div>

                            {/* Text Font */}
                            <div style={styles.field}>
                                <label>Text Font <span style={styles.optional}>(optional)</span></label>
                                <select
                                    value={textFont}
                                    onChange={(e) => setTextFont(e.target.value)}
                                    style={{
                                        ...styles.input,
                                        fontFamily: textFont || "Arial, sans-serif"
                                    }}
                                >
                                    <option value="">Click here to select a font</option>
                                    <option value="Arial" style={{ fontFamily: "Arial" }}>Arial</option>
                                    <option value="Helvetica" style={{ fontFamily: "Helvetica" }}>Helvetica</option>
                                    <option value="Times New Roman" style={{ fontFamily: "Times New Roman" }}>Times New Roman</option>
                                    <option value="Georgia" style={{ fontFamily: "Georgia" }}>Georgia</option>
                                    <option value="Verdana" style={{ fontFamily: "Verdana" }}>Verdana</option>
                                    <option value="Roboto" style={{ fontFamily: "Roboto" }}>Roboto</option>
                                    <option value="Open Sans" style={{ fontFamily: "Open Sans" }}>Open Sans</option>
                                    <option value="Lato" style={{ fontFamily: "Lato" }}>Lato</option>
                                    <option value="Montserrat" style={{ fontFamily: "Montserrat" }}>Montserrat</option>
                                    <option value="Poppins" style={{ fontFamily: "Poppins" }}>Poppins</option>
                                </select>
                                <small style={styles.helpText}>Change the font used to show the text.</small>
                            </div>

                            {/* Main Color */}
                            <div style={styles.field}>
                                <label>Main Color <span style={styles.optional}>(optional)</span></label>
                                <div style={styles.colorInputContainer}>
                                    <input
                                        type="text"
                                        value={mainColor}
                                        onChange={(e) => setMainColor(e.target.value)}
                                        style={styles.colorTextInput}
                                        placeholder="#ffffff" />
                                    <input
                                        type="color"
                                        value={mainColor}
                                        onChange={(e) => setMainColor(e.target.value)}
                                        style={styles.colorPicker} />
                                </div>
                                <small style={styles.helpText}>Change the main color.</small>
                            </div>

                            {/* Secondary Color */}
                            <div style={styles.field}>
                                <label>Secondary Color <span style={styles.optional}>(optional)</span></label>
                                <div style={styles.colorInputContainer}>
                                    <input
                                        type="text"
                                        value={secondaryColor}
                                        onChange={(e) => setSecondaryColor(e.target.value)}
                                        style={styles.colorTextInput}
                                        placeholder="#ff6b35" />
                                    <input
                                        type="color"
                                        value={secondaryColor}
                                        onChange={(e) => setSecondaryColor(e.target.value)}
                                        style={styles.colorPicker} />
                                </div>
                                <small style={styles.helpText}>Change the secondary color</small>
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
                                        placeholder="#2c1810" />
                                    <input
                                        type="color"
                                        value={backgroundColor}
                                        onChange={(e) => setBackgroundColor(e.target.value)}
                                        style={styles.colorPicker} />
                                </div>
                                <small style={styles.helpText}>Change the background color.</small>
                            </div>

                            {/* Background Image */}
                            <div style={styles.field}>
                                <label>Background Image <span style={styles.optional}>(optional)</span></label>
                                <div style={styles.imageUploadContainer}>
                                    <input
                                        type="text"
                                        value={backgroundImage}
                                        onChange={(e) => setBackgroundImage(e.target.value)}
                                        style={styles.colorTextInput}
                                        placeholder="Enter image URL" />
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => {
                                            const file = e.target.files[0];
                                            if (file) {
                                                const reader = new FileReader();
                                                reader.onload = (event) => {
                                                    setBackgroundImage(event.target.result);
                                                };
                                                reader.readAsDataURL(file);
                                            }
                                        }}
                                        style={styles.fileInput}
                                        id="backgroundImageInput"
                                    />
                                    <button 
                                        type="button"
                                        onClick={() => document.getElementById('backgroundImageInput').click()}
                                        style={styles.chooseButton}
                                    >
                                        📁 Choose
                                    </button>
                                </div>
                                <small style={styles.helpText}>The background image will stretch to fill the app height and width.</small>
                            </div>

                            {/* Disable Options */}
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
                    <CountDownClockPopUp
                        onClose={() => setShowPopup(false)}
                        appName={appName}
                        tags={tags}
                        type={type}
                        eventDateTime={eventDateTime}
                        completionMessage={completionMessage}
                        title={title}
                        subtitle={subtitle}
                        textFont={textFont}
                        mainColor={mainColor}
                        secondaryColor={secondaryColor}
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
    optional: {
        color: "#666",
        fontWeight: "normal",
        fontSize: "12px",
    },
    helpText: {
        color: "#666",
        fontSize: "12px",
        marginTop: "4px",
    },
    dateTimeContainer: {
        position: "relative",
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
        gap: "8px",
    },
    chooseButton: {
        padding: "8px 12px",
        backgroundColor: "#007acc",
        color: "#fff",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        fontSize: "14px",
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
    fileInput: {
        display: "none",
    },
};

export default CountDownClockForm;