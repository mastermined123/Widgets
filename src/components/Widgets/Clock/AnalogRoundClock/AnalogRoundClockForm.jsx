import React, { useState } from "react";
import AnalogRoundClockPopUp from "./AnalogRoundClockPopUp";

function AnalogRoundClockForm({ card }) {
    const [activeTab, setActiveTab] = useState("settings");

    // Fields
    const [appName, setAppName] = useState("");
    const [tags, setTags] = useState([]);
    const [dataFeed, setDataFeed] = useState(""); // input for tags

    const [dialType, setDialType] = useState(""); // Arabic Numerials Dial / Roman Numerials Dial / Strokes Dial
    const [dialBgColor, setDialBgColor] = useState("#ffffff");
    const [handsColor, setHandsColor] = useState("#000000");
    const [dialColor, setDialColor] = useState("#000000");
    const [bgColor, setBgColor] = useState("#f5f5f5");

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
            dialType,
            dialBgColor,
            handsColor,
            dialColor,
            bgColor,
        });
        alert("Saved! Check console.");
    };

    return (
        <div style={styles.container}>
            {/* Left Portion */}
            <div style={styles.left}>
                <label style={{ ...styles.field, fontWeight: "bold" }}>{card?.title || "Analog Round Clock"}</label>
                {card?.imageSrc && <img src={card.imageSrc} alt={card?.title || "Analog Round Clock"} style={styles.image} />}
                <p>Configurable analog clock: dial type, colors, and tags.</p>
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

                            {/* Tags (multiple) */}
                            <div style={styles.field}>
                                <label>Tags (multiple):</label>
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

                            {/* Dial Type */}
                            <div style={styles.field}>
                                <label>Dial Type:</label>
                                <select
                                    value={dialType}
                                    onChange={(e) => setDialType(e.target.value)}
                                    style={styles.input}
                                >
                                    <option value="">Select Dial Type</option>
                                    <option value="Arabic Numerials Dial">Arabic Numerials Dial</option>
                                    <option value="Roman Numerials Dial">Roman Numerials Dial</option>
                                    <option value="Strokes Dial">Strokes Dial</option>
                                </select>
                            </div>

                            {/* Dial Background Color */}
                            <div style={styles.field}>
                                <label>Dial Background Color:</label>
                                <div style={styles.colorInputContainer}>
                                    <input
                                        type="text"
                                        value={dialBgColor}
                                        onChange={(e) => setDialBgColor(e.target.value)}
                                        style={styles.colorTextInput}
                                        placeholder="#ffffff" />
                                    <input
                                        type="color"
                                        value={dialBgColor}
                                        onChange={(e) => setDialBgColor(e.target.value)}
                                        style={styles.colorPicker} />
                                </div>
                            </div>

                            {/* Hands and Dial color */}
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

                            <div style={styles.field}>
                                <label>Dial Color:</label>
                                <div style={styles.colorInputContainer}>
                                    <input
                                        type="text"
                                        value={dialColor}
                                        onChange={(e) => setDialColor(e.target.value)}
                                        style={styles.colorTextInput}
                                        placeholder="#000000" />
                                    <input
                                        type="color"
                                        value={dialColor}
                                        onChange={(e) => setDialColor(e.target.value)}
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
                    <AnalogRoundClockPopUp
                        onClose={() => setShowPopup(false)}
                        appName={appName}
                        tags={tags}
                        dialType={dialType}
                        dialBgColor={dialBgColor}
                        handsColor={handsColor}
                        dialColor={dialColor}
                        bgColor={bgColor} />
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
  field: { display: "flex", flexDirection: "column", marginBottom: "10px" },
  input: { padding: "5px", borderRadius: "4px", border: "1px solid #ccc" },
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
};

export default AnalogRoundClockForm;
