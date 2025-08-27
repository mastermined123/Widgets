/* eslint-disable no-unused-vars */
// DirectoryForm.jsx
import React, { useState } from "react";
import DirectoryListPopUp from "./DirectoryListPopUp";

const DirectoryForm = ({ card }) => {
  const [activeTab, setActiveTab] = useState("settings");
  const [tags, setTags] = useState([]);
  const [appName, setAppName] = useState("");
  const [title, setTitle] = useState("");
  const [backgroundType, setBackgroundType] = useState("color"); // "color" or "image"
  const [customLogo, setCustomLogo] = useState(null);
  const [customBgImage, setCustomBgImage] = useState(null);
  const [headerBgColor, setHeaderBgColor] = useState("#ffffff");
  const [textFont, setTextFont] = useState("Arial");
  const [titleFontSize, setTitleFontSize] = useState(16);
  const [bodyFontSize, setBodyFontSize] = useState(14);
  const [titleColor, setTitleColor] = useState("#000000");
  const [textColor, setTextColor] = useState("#000000");
  const [directoryContent, setDirectoryContent] = useState("");
  const [disableRowShadow, setDisableRowShadow] = useState(false);
  const [dataFeed, setDataFeed] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const addTag = () => {
    if (dataFeed.trim()) {
      setTags([...tags, dataFeed.trim()]);
      setDataFeed("");
    }
  };

  const removeTag = (index) => {
    const newTags = tags.filter((_, i) => i !== index);
    setTags(newTags);
  };

  const handleSave = () => {
    console.log({
      appName,
      title,
      tags,
      backgroundType,
      customLogo,
      customBgImage,
      headerBgColor,
      textFont,
      titleFontSize,
      bodyFontSize,
      titleColor,
      textColor,
      directoryContent,
      disableRowShadow,
    });
    alert("Saved! Check console.");
  };

  return (
    <div style={styles.container}>
      {/* Left Portion */}
      <div style={styles.left}>
        <label style={{ ...styles.field, fontWeight: "bold" }}>{card.title}</label>
        {card.imageSrc && <img src={card.imageSrc} alt={card.title} style={styles.image} />}
        <p>This app will display a directory list with custom settings.</p>
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
          {/* SETTINGS TAB */}
          {activeTab === "settings" && (
            <div>
              <div style={styles.field}>
                <label>App Name:</label>
                <input
                  type="text"
                  value={appName}
                  onChange={(e) => setAppName(e.target.value)}
                  style={styles.input}
                />
              </div>

              <div style={styles.field}>
                <label>Tags (optional):</label>
                <div style={{ display: "flex", gap: "5px", flexWrap: "wrap" }}>
                  {tags?.map((tag, i) => (
                    <span key={i} style={styles.tag}>
                      {tag}{" "}
                      <button onClick={() => removeTag(i)} style={styles.removeTag}>
                        x
                      </button>
                    </span>
                  ))}
                  <input
                    type="text"
                    value={dataFeed}
                    onChange={(e) => setDataFeed(e.target.value)}
                    placeholder="Enter tag"
                    style={{ ...styles.input, flex: "1" }}
                    onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                  />
                </div>
              </div>

              <div style={styles.field}>
                <label>Title:</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  style={styles.input}
                />
              </div>

              <div style={styles.field}>
                <label>Background Type:</label>
                <select
                  value={backgroundType}
                  onChange={(e) => setBackgroundType(e.target.value)}
                  style={styles.input}
                >
                  <option value="color">Color</option>
                  <option value="image">Image</option>
                </select>
              </div>

              <div style={styles.field}>
                <label>Custom Logo (optional):</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setCustomLogo(e.target.files[0])}
                />
              </div>

              <div style={styles.field}>
                <label>Background Image (optional):</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setCustomBgImage(e.target.files[0])}
                />
              </div>

              <div style={styles.field}>
                <label>Header Background Color (optional):</label>
                <input
                  type="color"
                  value={headerBgColor}
                  onChange={(e) => setHeaderBgColor(e.target.value)}
                />
              </div>

              <div style={styles.field}>
                <label>Text Font (optional):</label>
                <select
                  value={textFont}
                  onChange={(e) => setTextFont(e.target.value)}
                  style={styles.input}
                >
                  <option value="Arial">Arial</option>
                  <option value="Courier New">Courier New</option>
                  <option value="Georgia">Georgia</option>
                  <option value="Times New Roman">Times New Roman</option>
                  <option value="Verdana">Verdana</option>
                </select>
              </div>

              <div style={styles.field}>
                <label>Title Font Size (optional):</label>
                <input
                  type="number"
                  value={titleFontSize}
                  onChange={(e) => setTitleFontSize(parseInt(e.target.value))}
                  style={styles.input}
                />
              </div>

              <div style={styles.field}>
                <label>Body Font Size (optional):</label>
                <input
                  type="number"
                  value={bodyFontSize}
                  onChange={(e) => setBodyFontSize(parseInt(e.target.value))}
                  style={styles.input}
                />
              </div>

              <div style={styles.field}>
                <label>Title Color (optional):</label>
                <input
                  type="color"
                  value={titleColor}
                  onChange={(e) => setTitleColor(e.target.value)}
                />
              </div>

              <div style={styles.field}>
                <label>Text Color (optional):</label>
                <input
                  type="color"
                  value={textColor}
                  onChange={(e) => setTextColor(e.target.value)}
                />
              </div>

              <div style={styles.field}>
                <label>Directory Content:</label>
                <textarea
                  value={directoryContent}
                  onChange={(e) => setDirectoryContent(e.target.value)}
                  style={{ ...styles.input, height: "100px", resize: "vertical" }}
                />
              </div>

              <div style={styles.checkboxGroup}>
                <label>
                  <input
                    type="checkbox"
                    checked={disableRowShadow}
                    onChange={(e) => setDisableRowShadow(e.target.checked)}
                  />{" "}
                  Disable Row Shadow
                </label>
              </div>
            </div>
          )}
        </div>

        <div style={styles.fixedButtons}>
          <button onClick={handleSave} style={styles.saveBtn}>
            Save
          </button>
          <button onClick={() => setShowPopup(true)} style={styles.previewBtn}>
            Preview
          </button>
        </div>

        {showPopup && (
          <DirectoryListPopUp
            image={
              backgroundType === "image"
                ? customBgImage
                  ? URL.createObjectURL(customBgImage)
                  : card.imageSrc
                : null
            }
            logo={customLogo ? URL.createObjectURL(customLogo) : null}
            appName={appName}
            title={title}
            headerBgColor={headerBgColor}
            textFont={textFont}
            titleFontSize={titleFontSize}
            bodyFontSize={bodyFontSize}
            titleColor={titleColor}
            textColor={textColor}
            directoryContent={directoryContent}
            disableRowShadow={disableRowShadow}
            tags={tags}
                        onClose={() => setShowPopup(false)}

          />
        )}
      </div>
    </div>
  );
};

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
    position: "relative",
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
  checkboxGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "5px",
    marginTop: "10px",
  },
  fixedButtons: {
    position: "absolute",
    bottom: "10px",
    right: "10px",
    display: "flex",
    gap: "10px",
  },
  saveBtn: {
    padding: "8px 12px",
    backgroundColor: "#005481",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  previewBtn: {
    padding: "8px 12px",
    backgroundColor: "#888",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  tag: {
    padding: "2px 5px",
    backgroundColor: "#ccc",
    borderRadius: "4px",
    display: "flex",
    alignItems: "center",
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
  },
};

export default DirectoryForm;
