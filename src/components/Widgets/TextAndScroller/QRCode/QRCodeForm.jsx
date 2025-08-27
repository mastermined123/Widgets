import React, { useState } from "react";
import QRCodePopUp from "./QRCodePopUp";

function QRCodeForm({ card }) {
    const [activeTab, setActiveTab] = useState("settings");

    // Fields
    const [appName, setAppName] = useState("");
    const [tags, setTags] = useState([]);
    const [dataFeed, setDataFeed] = useState(""); // input for tags
    const [textToEncode, setTextToEncode] = useState("");
    const [qrCodeColor, setQrCodeColor] = useState("#000000");
    const [backgroundColor, setBackgroundColor] = useState("#ffffff");
    const [backgroundImage, setBackgroundImage] = useState("");
    const [transparentBackground, setTransparentBackground] = useState(false);

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

        if (!textToEncode.trim()) {
            setTextError("Please enter text to encode.");
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
            textToEncode,
            qrCodeColor,
            backgroundColor,
            backgroundImage,
            transparentBackground,
        });
        alert("Saved! Check console.");
    };

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setBackgroundImage(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div style={styles.container}>
            {/* Left Portion */}
            <div style={styles.left}>
                <label style={{ ...styles.field, fontWeight: "bold" }}>{card?.title || "QR Code Generator"}</label>
                {card?.imageSrc && <img src={card.imageSrc} alt={card?.title || "QR Code Generator"} style={styles.image} />}
                <p>Generate customizable QR codes with colors, background options, and text encoding.</p>
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

                            {/* Text to be encoded to QRCode */}
                            <div style={styles.field}>
                                <label>Text to be encoded to QRCode</label>
                                <textarea
                                    value={textToEncode}
                                    onChange={(e) => {
                                        setTextToEncode(e.target.value);
                                        if (textError) setTextError("");
                                    }}
                                    placeholder="Enter text to encode in QR code"
                                    style={{
                                        ...styles.textarea,
                                        borderColor: textError ? "#ff0000" : "#ccc"
                                    }}
                                    rows={4}
                                />
                                {textError && (
                                    <div style={styles.errorMessage}>
                                        <span style={styles.errorIcon}>⚠</span>
                                        {textError}
                                    </div>
                                )}
                            </div>

                            {/* QRCode color (optional) */}
                            <div style={styles.field}>
                                <label>QRCode color <span style={styles.optional}>(optional)</span></label>
                                <div style={styles.colorInputContainer}>
                                    <input
                                        type="text"
                                        value={qrCodeColor}
                                        onChange={(e) => setQrCodeColor(e.target.value)}
                                        style={styles.colorTextInput}
                                        placeholder="#000000" />
                                    <input
                                        type="color"
                                        value={qrCodeColor}
                                        onChange={(e) => setQrCodeColor(e.target.value)}
                                        style={styles.colorPicker} />
                                </div>
                            </div>

                            {/* Background color (optional) */}
                            <div style={styles.field}>
                                <label>Background color <span style={styles.optional}>(optional)</span></label>
                                <div style={styles.colorInputContainer}>
                                    <input
                                        type="text"
                                        value={backgroundColor}
                                        onChange={(e) => setBackgroundColor(e.target.value)}
                                        style={styles.colorTextInput}
                                        placeholder="#ffffff" />
                                    <input
                                        type="color"
                                        value={backgroundColor}
                                        onChange={(e) => setBackgroundColor(e.target.value)}
                                        style={styles.colorPicker} />
                                </div>
                            </div>

                            {/* Background image (optional) */}
                            <div style={styles.field}>
                                <label>Background image <span style={styles.optional}>(optional)</span></label>
                                <div style={styles.fileInputContainer}>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        style={styles.hiddenInput}
                                        id="backgroundImage"
                                    />
                                    <label htmlFor="backgroundImage" style={styles.chooseButton}>
                                        Choose
                                    </label>
                                    {backgroundImage && (
                                        <span style={styles.fileName}>Image selected</span>
                                    )}
                                </div>
                            </div>

                            {/* Transparent Background */}
                            <div style={styles.field}>
                                <label style={styles.checkboxContainer}>
                                    <input
                                        type="checkbox"
                                        checked={transparentBackground}
                                        onChange={(e) => setTransparentBackground(e.target.checked)}
                                        style={styles.checkbox}
                                    />
                                    Transparent Background
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
                    <QRCodePopUp
                        onClose={() => setShowPopup(false)}
                        appName={appName}
                        tags={tags}
                        textToEncode={textToEncode}
                        qrCodeColor={qrCodeColor}
                        backgroundColor={backgroundColor}
                        backgroundImage={backgroundImage}
                        transparentBackground={transparentBackground}
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
    fileInputContainer: {
        display: "flex",
        alignItems: "center",
        gap: "10px",
    },
    hiddenInput: {
        display: "none",
    },
    chooseButton: {
        padding: "8px 16px",
        backgroundColor: "#007acc",
        color: "#fff",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        fontSize: "14px",
    },
    fileName: {
        fontSize: "14px",
        color: "#666",
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

export default QRCodeForm;