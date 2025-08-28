import React, { useState } from "react";

function StreamingVideoLinkForm({ card }) {
  const [activeTab, setActiveTab] = useState("settings");
  const [dataFeed, setDataFeed] = useState(""); // input for tags
  const [appNameError, setAppNameError] = useState("");

  // Configuration state
  const [appName, setAppName] = useState("");
  const [tags, setTags] = useState([]);
  const [pageUrl, setPageUrl] = useState("");
  const [checkInterval, setCheckInterval] = useState("");

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

  const handleSave = () => {
    console.log({
      appName,
      tags,
      pageUrl,
      checkInterval,
    });
    alert("Saved! Check console.");
  };

  return (
    <div style={styles.container}>
      {/* Left Portion */}
      <div style={styles.left}>
        <label style={{ ...styles.field, fontWeight: "bold" }}>{card?.title || "Streaming Video Link"}</label>
        {card?.imageSrc && <img src={card.imageSrc} alt={card?.title || "Streaming Video Link"} style={styles.image} />}
        <p>Configurable streaming video link: URL, check interval, and streaming settings.</p>
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
                  }}
                />
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
                    onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                  />
                </div>
              </div>

              {/* URL */}
              <div style={styles.field}>
                <label>URL:</label>
                <input
                  type="text"
                  value={pageUrl}
                  onChange={(e) => setPageUrl(e.target.value)}
                  style={styles.input}
                  placeholder="https://example.com"
                />
              </div>

              {/* Check Interval */}
              <div style={styles.field}>
                <label>Check Interval (optional):</label>
                <input
                  type="number"
                  value={checkInterval}
                  onChange={(e) => setCheckInterval(e.target.value)}
                  style={styles.input}
                  placeholder=""
                />
                <div style={styles.helperText}>
                  Increase interval for slower streams. Use 0 to disable.
                </div>
              </div>

              {/* Save Button */}
              <div style={styles.buttonContainer}>
                <button onClick={handleSave} style={styles.saveBtn}>Save</button>
              </div>
            </div>
          )}
        </div>
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
  field: { display: "flex", flexDirection: "column", marginBottom: "10px" },
  input: { padding: "5px", borderRadius: "4px", border: "1px solid #ccc" },
  buttonContainer: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "10px",
    marginTop: "20px",
    paddingTop: "15px",
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
  helperText: {
    color: "#666",
    fontSize: "12px",
    marginTop: "4px",
    lineHeight: "1.3",
  },
};

export default StreamingVideoLinkForm;
