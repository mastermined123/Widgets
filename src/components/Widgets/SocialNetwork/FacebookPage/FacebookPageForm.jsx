import React, { useState } from "react";
import FacebookPagePopUp from "./FacebookPagePopUp";

function FacebookPageForm({ card }) {
    const [activeTab, setActiveTab] = useState("settings");

    // Fields
    const [appName, setAppName] = useState("");
    const [tags, setTags] = useState([]);
    const [dataFeed, setDataFeed] = useState(""); // input for tags

    const [facebookPageUrl, setFacebookPageUrl] = useState("");
    const [numberOfPosts, setNumberOfPosts] = useState("10");
    const [postDuration, setPostDuration] = useState("15");
    const [headerColor, setHeaderColor] = useState("#1877f2");
    const [highlightColor, setHighlightColor] = useState("#42a5f5");
    const [fontColor, setFontColor] = useState("#000000");
    const [textFont, setTextFont] = useState("");
    const [backgroundColor, setBackgroundColor] = useState("#ffffff");
    const [backgroundImage, setBackgroundImage] = useState("");
    const [enableAnimations, setEnableAnimations] = useState(true);

    const [showPopup, setShowPopup] = useState(false);
    const [appNameError, setAppNameError] = useState("");
    const [facebookUrlError, setFacebookUrlError] = useState("");

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

    // Facebook URL validation
    const validateFacebookUrl = (url) => {
        const facebookRegex = /^https:\/\/www\.facebook\.com\//;
        return facebookRegex.test(url);
    };

    const handlePreview = () => {
        let hasError = false;

        if (!appName.trim()) {
            setAppNameError("Please fill out this field.");
            hasError = true;
        } else {
            setAppNameError("");
        }

        if (!facebookPageUrl.trim()) {
            setFacebookUrlError("Please enter a Facebook page URL.");
            hasError = true;
        } else if (!validateFacebookUrl(facebookPageUrl)) {
            setFacebookUrlError("Please enter a valid Facebook URL starting with https://www.facebook.com/");
            hasError = true;
        } else {
            setFacebookUrlError("");
        }

        if (!hasError) {
            setShowPopup(true);
        }
    };

    const handleSave = () => {
        console.log({
            appName,
            tags,
            facebookPageUrl,
            numberOfPosts,
            postDuration,
            headerColor,
            highlightColor,
            fontColor,
            textFont,
            backgroundColor,
            backgroundImage,
            enableAnimations,
        });
        alert("Saved! Check console.");
    };

    const handleBackgroundImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => setBackgroundImage(e.target.result);
            reader.readAsDataURL(file);
        }
    };

    return (
        <div style={styles.container}>
            {/* Left Portion */}
            <div style={styles.left}>
                <label style={{ ...styles.field, fontWeight: "bold" }}>{card?.title || "Facebook Page"}</label>
                {card?.imageSrc && <img src={card.imageSrc} alt={card?.title || "Facebook Page"} style={styles.image} />}
                <p>Display Facebook page posts with customizable styling and animations.</p>
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
                                <label>Tags <span style={styles.optionalText}>(optional)</span></label>
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

                            {/* Facebook Page URL */}
                            <div style={styles.field}>
                                <label>Facebook page</label>
                                <input
                                    type="text"
                                    value={facebookPageUrl}
                                    onChange={(e) => {
                                        setFacebookPageUrl(e.target.value);
                                        if (facebookUrlError) setFacebookUrlError("");
                                    }}
                                    style={{
                                        ...styles.input,
                                        borderColor: facebookUrlError ? "#ff0000" : "#ccc"
                                    }} />
                                {facebookUrlError && (
                                    <div style={styles.errorMessage}>
                                        <span style={styles.errorIcon}>⚠</span>
                                        {facebookUrlError}
                                    </div>
                                )}
                                <div style={styles.urlHelpText}>
                                    Enter the Facebook page URL you want to show. It should start with https://www.facebook.com/
                                </div>
                            </div>

                            {/* Number of Posts */}
                            <div style={styles.field}>
                                <label>Number of posts: <span style={styles.optionalText}>(optional)</span></label>
                                <input
                                    type="number"
                                    value={numberOfPosts}
                                    onChange={(e) => setNumberOfPosts(e.target.value)}
                                    placeholder="10"
                                    style={styles.input} />
                                <div style={styles.helpText}>
                                    Show at most this amount of posts
                                </div>
                            </div>

                            {/* Post Duration */}
                            <div style={styles.field}>
                                <label>Show each post for this many seconds: <span style={styles.optionalText}>(optional)</span></label>
                                <input
                                    type="number"
                                    value={postDuration}
                                    onChange={(e) => setPostDuration(e.target.value)}
                                    placeholder="15"
                                    style={styles.input} />
                            </div>

                            {/* Header Color */}
                            <div style={styles.field}>
                                <label>Header color <span style={styles.optionalText}>(optional)</span></label>
                                <div style={styles.colorInputContainer}>
                                    <input
                                        type="text"
                                        value={headerColor}
                                        onChange={(e) => setHeaderColor(e.target.value)}
                                        style={styles.colorTextInput}
                                        placeholder="#1877f2" />
                                    <input
                                        type="color"
                                        value={headerColor}
                                        onChange={(e) => setHeaderColor(e.target.value)}
                                        style={styles.colorPicker} />
                                </div>
                                <div style={styles.helpText}>
                                    Change the color of the header
                                </div>
                            </div>

                            {/* Highlight Color */}
                            <div style={styles.field}>
                                <label>Highlight color <span style={styles.optionalText}>(optional)</span></label>
                                <div style={styles.colorInputContainer}>
                                    <input
                                        type="text"
                                        value={highlightColor}
                                        onChange={(e) => setHighlightColor(e.target.value)}
                                        style={styles.colorTextInput}
                                        placeholder="#42a5f5" />
                                    <input
                                        type="color"
                                        value={highlightColor}
                                        onChange={(e) => setHighlightColor(e.target.value)}
                                        style={styles.colorPicker} />
                                </div>
                            </div>

                            {/* Font Color */}
                            <div style={styles.field}>
                                <label>Font color <span style={styles.optionalText}>(optional)</span></label>
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

                            {/* Text Font */}
                            <div style={styles.field}>
                                <label>Text font <span style={styles.optionalText}>(optional)</span></label>
                                <select
                                    value={textFont}
                                    onChange={(e) => setTextFont(e.target.value)}
                                    style={styles.input}
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
                                <div style={styles.helpText}>
                                    Change the font used to show the text
                                </div>
                            </div>

                            {/* Background Color */}
                            <div style={styles.field}>
                                <label>Background color <span style={styles.optionalText}>(optional)</span></label>
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
                                <div style={styles.helpText}>
                                    Change the background color
                                </div>
                            </div>

                            {/* Background Image */}
                            <div style={styles.field}>
                                <label>Background image <span style={styles.optionalText}>(optional)</span></label>
                                <div style={styles.fileInputContainer}>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleBackgroundImageUpload}
                                        style={styles.hiddenFileInput}
                                        id="backgroundImageInput" />
                                    <label htmlFor="backgroundImageInput" style={styles.fileInputButton}>
                                        📁 Choose
                                    </label>
                                    {backgroundImage && (
                                        <button 
                                            onClick={() => setBackgroundImage("")}
                                            style={styles.removeImageButton}
                                        >
                                            Remove
                                        </button>
                                    )}
                                </div>
                                {backgroundImage && (
                                    <div style={styles.imagePreview}>
                                        <img src={backgroundImage} alt="Background preview" style={styles.previewImage} />
                                    </div>
                                )}
                                <div style={styles.helpText}>
                                    The background image will stretch to fill the app height and width
                                </div>
                            </div>

                            {/* Enable Animations */}
                            <div style={styles.field}>
                                <label style={styles.checkboxContainer}>
                                    <input
                                        type="checkbox"
                                        checked={enableAnimations}
                                        onChange={(e) => setEnableAnimations(e.target.checked)}
                                        style={styles.checkbox} />
                                    <span style={{
                                        ...styles.checkmark,
                                        backgroundColor: enableAnimations ? "#ff0000" : "#fff",
                                        border: enableAnimations ? "none" : "2px solid #ccc",
                                        color: enableAnimations ? "#fff" : "transparent"
                                    }}>✓</span>
                                    Enable animations
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
                    <FacebookPagePopUp
                        onClose={() => setShowPopup(false)}
                        appName={appName}
                        tags={tags}
                        facebookPageUrl={facebookPageUrl}
                        numberOfPosts={numberOfPosts}
                        postDuration={postDuration}
                        headerColor={headerColor}
                        highlightColor={highlightColor}
                        fontColor={fontColor}
                        textFont={textFont}
                        backgroundColor={backgroundColor}
                        backgroundImage={backgroundImage}
                        enableAnimations={enableAnimations} />
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
        marginTop: "5px"
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
    optionalText: {
        color: "#888",
        fontWeight: "normal",
        fontSize: "12px",
    },
    urlHelpText: {
        fontSize: "12px",
        color: "#666",
        marginTop: "5px",
        lineHeight: "1.4",
    },
    helpText: {
        fontSize: "12px",
        color: "#666",
        marginTop: "5px",
        lineHeight: "1.4",
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
    fileInputContainer: {
        display: "flex",
        alignItems: "center",
        gap: "8px",
    },
    hiddenFileInput: {
        display: "none",
    },
    fileInputButton: {
        padding: "8px 16px",
        backgroundColor: "#007acc",
        color: "#fff",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        fontWeight: "500",
        display: "inline-block",
    },
    checkboxContainer: {
        display: "flex",
        alignItems: "center",
        gap: "8px",
        cursor: "pointer",
        fontSize: "14px",
    },
    checkbox: {
        display: "none",
    },
    checkmark: {
        width: "20px",
        height: "20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "3px",
        fontSize: "12px",
        fontWeight: "bold",
        transition: "all 0.2s ease",
    },
    removeImageButton: {
        padding: "8px 16px",
        backgroundColor: "#dc3545",
        color: "#fff",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        fontWeight: "500",
        marginLeft: "8px",
    },
    imagePreview: {
        marginTop: "10px",
        border: "1px solid #ddd",
        borderRadius: "4px",
        overflow: "hidden",
        maxWidth: "200px",
    },
    previewImage: {
        width: "100%",
        height: "auto",
        display: "block",
    },
};

export default FacebookPageForm;