import React, { useState } from "react";
import KlipfoloiPopUp from "./KlipfoloiPopUp";

function KlipfoloiForm({ card }) {
  const [showPopup, setShowPopup] = useState(false);
  const [dataFeed, setDataFeed] = useState(""); // input for tags
  const [appNameError, setAppNameError] = useState("");
  
  // Configuration state
  const [appName, setAppName] = useState("");
  const [tags, setTags] = useState([]);
  const [klipfolioUrl, setKlipfolioUrl] = useState("");
  
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
      klipfolioUrl,
    });
    alert("Saved! Check console.");
  };

  return (
    <div style={styles.container}>
      {/* Left Portion */}
      <div style={styles.left}>
        <label style={{ ...styles.field, fontWeight: "bold" }}>{card?.title || "Klipfolio"}</label>
        {card?.imageSrc && <img src={card.imageSrc} alt={card?.title || "Klipfolio"} style={styles.image} />}
        <p>Display your Klipfolio dashboard with customizable settings.</p>
      </div>

      {/* Right Portion */}
      <div style={styles.right}>
        <div style={styles.tabs}>
          <button style={styles.activeTab}>
            Settings
          </button>
        </div>

        <div style={styles.tabContent}>
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
                }}
              />
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
                  onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                />
              </div>
            </div>

            {/* Klipfolio URL */}
            <div style={styles.field}>
              <label>Klipfolio URL</label>
              <input
                type="text"
                value={klipfolioUrl}
                onChange={(e) => setKlipfolioUrl(e.target.value)}
                style={styles.input}
                placeholder="Enter your Klipfolio URL"
              />
              <div style={styles.helperText}>
                You can get your Klipfolio URL by opening your created app, clicking "Get App", and copying the URL.
              </div>
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
          <KlipfoloiPopUp
            onClose={() => setShowPopup(false)}
            appName={appName}
            tags={tags}
            klipfolioUrl={klipfolioUrl}
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
    height: "500px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    overflow: "hidden",
    marginTop: "10px",
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
  tabs: { 
    display: "flex", 
    gap: "10px", 
    marginBottom: "15px" 
  },
  activeTab: {
    padding: "5px 15px",
    cursor: "pointer",
    backgroundColor: "#005481",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
  },
  tabContent: { 
    flex: 1, 
    overflowY: "auto" 
  },
  field: { 
    display: "flex", 
    flexDirection: "column", 
    marginBottom: "15px" 
  },
  input: { 
    padding: "8px", 
    borderRadius: "4px", 
    border: "1px solid #ccc",
    marginTop: "5px",
  },
  optional: {
    fontSize: "12px",
    color: "#666",
    fontStyle: "italic",
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
  helperText: {
    color: "#666",
    fontSize: "12px",
    marginTop: "4px",
    lineHeight: "1.3",
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

export default KlipfoloiForm;