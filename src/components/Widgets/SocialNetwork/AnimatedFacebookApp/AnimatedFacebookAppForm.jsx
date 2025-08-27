import React, { useState } from "react";
import AnimatedFacebookAppPopUp from "./AnimatedFacebookAppPopUp";

function AnimatedFacebookAppForm({ 
    card, 
    appName, 
    setAppName, 
    tags, 
    setTags, 
    facebookPageUrl, 
    setFacebookPageUrl,
    numberOfPosts,
    setNumberOfPosts,
    postDuration,
    setPostDuration,
    textSize,
    setTextSize,
    textFont,
    setTextFont,
    kenBurnsEffect,
    setKenBurnsEffect,
    transitionAnimation,
    setTransitionAnimation,
    headerColor,
    setHeaderColor,
    highlightColor,
    setHighlightColor,
    textColor,
    setTextColor,
    backgroundColor,
    setBackgroundColor,
    backgroundImage,
    setBackgroundImage
}) {
    // Fields
    const [dataFeed, setDataFeed] = useState(""); // input for tags
    const [showPopup, setShowPopup] = useState(false);
    const [appNameError, setAppNameError] = useState("");
    const [facebookPageUrlError, setFacebookPageUrlError] = useState("");

    // Font options
    const fontOptions = [
        { value: "", label: "Click here to select a font" },
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

        if (!facebookPageUrl.trim()) {
            setFacebookPageUrlError("Please fill out this field.");
            hasError = true;
        } else if (!isValidFacebookUrl(facebookPageUrl)) {
            setFacebookPageUrlError("Please enter a valid Facebook page URL.");
            hasError = true;
        } else {
            setFacebookPageUrlError("");
        }

        if (hasError) return;
        
        setShowPopup(true);
    };

    const isValidFacebookUrl = (url) => {
        try {
            const urlObj = new URL(url);
            return urlObj.hostname.includes('facebook.com') || urlObj.hostname.includes('fb.com');
        } catch {
            return false;
        }
    };

    const handleSave = () => {
        console.log({
            appName,
            tags,
            facebookPageUrl,
            numberOfPosts,
            postDuration,
            textSize,
            textFont,
            kenBurnsEffect,
            transitionAnimation,
            headerColor,
            highlightColor,
            textColor,
            backgroundColor,
            backgroundImage
        });
        alert("Saved! Check console.");
    };

    const handleBackgroundImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setBackgroundImage(event.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div style={styles.container}>
            {/* Left Portion */}
            <div style={styles.left}>
                <label style={{ ...styles.field, fontWeight: "bold" }}>{card?.title || "Animated Facebook App"}</label>
                {card?.imageSrc && <img src={card.imageSrc} alt={card?.title || "Animated Facebook App"} style={styles.image} />}
                <p>Dynamic Facebook page post widget with Ken Burns effect and smooth transition animations.</p>
            </div>

            {/* Right Portion */}
            <div style={styles.right}>
                <div style={styles.topButtons}>
                    <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                        <button style={styles.settingsButton}>
                            Settings
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
                                if (facebookPageUrlError) setFacebookPageUrlError("");
                            }}
                            placeholder=""
                            style={{
                                ...styles.input,
                                borderColor: facebookPageUrlError ? "#ff0000" : "#ccc"
                            }} />
                        {facebookPageUrlError && (
                            <div style={styles.errorMessage}>
                                <span style={styles.errorIcon}>⚠</span>
                                {facebookPageUrlError}
                            </div>
                        )}
                        <p style={styles.helpText}>Enter the Facebook page URL you want to show. It should start with https://www.facebook.com/</p>
                    </div>

                    {/* Number of Posts */}
                    <div style={styles.field}>
                        <label>Number of posts <span style={styles.optional}>(optional)</span></label>
                        <input
                            type="number"
                            value={numberOfPosts}
                            onChange={(e) => setNumberOfPosts(e.target.value)}
                            style={styles.input}
                            min="1"
                            max="20"
                        />
                        <p style={styles.helpText}>Show at most this amount of posts. Limited to 20 posts.</p>
                    </div>

                    {/* Post Duration */}
                    <div style={styles.field}>
                        <label>Show each post for this many seconds</label>
                        <input
                            type="number"
                            value={postDuration}
                            onChange={(e) => setPostDuration(e.target.value)}
                            min="5"
                            max="60"
                            style={styles.input}
                        />
                    </div>

                    {/* Text Size */}
                    <div style={styles.field}>
                        <label>Text size (pixels) <span style={styles.optional}>(optional)</span></label>
                        <input
                            type="number"
                            value={textSize}
                            onChange={(e) => setTextSize(e.target.value)}
                            placeholder=""
                            style={styles.input}
                        />
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
                        <p style={styles.helpText}>Change the font used to show the news. Defaults to Roboto.</p>
                    </div>

                    {/* Header Color */}
                    <div style={styles.field}>
                        <label>Header color <span style={styles.optional}>(optional)</span></label>
                        <input
                            type="color"
                            value={headerColor}
                            onChange={(e) => setHeaderColor(e.target.value)}
                            style={styles.colorInput}
                        />
                    </div>

                    {/* Highlight Color */}
                    <div style={styles.field}>
                        <label>Highlight color <span style={styles.optional}>(optional)</span></label>
                        <input
                            type="color"
                            value={highlightColor}
                            onChange={(e) => setHighlightColor(e.target.value)}
                            style={styles.colorInput}
                        />
                    </div>

                    {/* Text Color */}
                    <div style={styles.field}>
                        <label>Text color <span style={styles.optional}>(optional)</span></label>
                        <input
                            type="color"
                            value={textColor}
                            onChange={(e) => setTextColor(e.target.value)}
                            style={styles.colorInput}
                        />
                    </div>

                    {/* Background Color */}
                    <div style={styles.field}>
                        <label>Background color <span style={styles.optional}>(optional)</span></label>
                        <input
                            type="color"
                            value={backgroundColor}
                            onChange={(e) => setBackgroundColor(e.target.value)}
                            style={styles.colorInput}
                        />
                    </div>

                    {/* Background Image */}
                    <div style={styles.field}>
                        <label>Background image <span style={styles.optional}>(optional)</span></label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleBackgroundImageUpload}
                            style={styles.input}
                        />
                        {backgroundImage && (
                            <div style={styles.imagePreview}>
                                <img src={backgroundImage} alt="Background preview" style={styles.previewImage} />
                            </div>
                        )}
                    </div>

                    {/* Ken Burns Effect */}
                    <div style={styles.field}>
                        <div style={styles.checkboxContainer}>
                            <input
                                type="checkbox"
                                checked={kenBurnsEffect}
                                onChange={(e) => setKenBurnsEffect(e.target.checked)}
                                style={styles.checkbox} />
                            <label>Animate post image with Ken Burns effect</label>
                        </div>
                    </div>

                    {/* Transition Animation */}
                    <div style={styles.field}>
                        <div style={styles.checkboxContainer}>
                            <input
                                type="checkbox"
                                checked={transitionAnimation}
                                onChange={(e) => setTransitionAnimation(e.target.checked)}
                                style={styles.checkbox} />
                            <label>Animate transition between posts</label>
                        </div>
                    </div>
                </div>

                {/* Buttons at bottom */}
                <div style={styles.bottomButtons}>
                    <button onClick={handlePreview} style={styles.previewBtn}>Preview</button>
                    <button onClick={handleSave} style={styles.saveBtn}>Save</button>
                </div>

                {/* Preview Popup */}
                {showPopup && (
                    <AnimatedFacebookAppPopUp
                        onClose={() => setShowPopup(false)}
                        appName={appName}
                        tags={tags}
                        facebookPageUrl={facebookPageUrl}
                        numberOfPosts={numberOfPosts}
                        postDuration={postDuration}
                        textSize={textSize}
                        textFont={textFont}
                        kenBurnsEffect={kenBurnsEffect}
                        transitionAnimation={transitionAnimation}
                        headerColor={headerColor}
                        highlightColor={highlightColor}
                        textColor={textColor}
                        backgroundColor={backgroundColor}
                        backgroundImage={backgroundImage} />
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
    marginBottom: "15px"
  },
  settingsButton: {
    padding: "10px 20px",
    backgroundColor: "#1877f2",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "500",
    fontSize: "14px",
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
  colorInput: {
    padding: "4px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    width: "60px",
    height: "40px",
    marginTop: "5px",
    cursor: "pointer"
  },
  optional: {
    color: "#666",
    fontWeight: "normal",
    fontSize: "14px"
  },
  helpText: {
    color: "#666",
    fontSize: "12px",
    marginTop: "5px",
    lineHeight: "1.4"
  },
  checkboxContainer: {
    display: "flex",
    alignItems: "flex-start",
    gap: "8px",
    marginTop: "5px"
  },
  checkbox: {
    marginTop: "2px"
  },
  imagePreview: {
    marginTop: "10px",
    border: "1px solid #ddd",
    borderRadius: "4px",
    overflow: "hidden"
  },
  previewImage: {
    width: "100%",
    maxHeight: "100px",
    objectFit: "cover"
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
    backgroundColor: "#1877f2",
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
    fontSize: "14px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
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
};

export default AnimatedFacebookAppForm;