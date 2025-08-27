import React, { useState } from "react";
import FormEntertainment1to5PopUp from "./FormEntertainment1to5PopUp";

const FormEntertainMent = ({ card }) => {
  const [activeTab, setActiveTab] = useState("settings");

  // Settings states
  const [appName, setAppName] = useState("");
  const [tags, setTags] = useState([]);
  const [dataFeed, setDataFeed] = useState("");
  const [dataFeedFile, setDataFeedFile] = useState(null);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [duration, setDuration] = useState("");
  const [highlightColor, setHighlightColor] = useState("");
  const [textFont, setTextFont] = useState("Arial");
  const [fontColor, setFontColor] = useState("");
  const [disableAnimations, setDisableAnimations] = useState(false);

  // Language tab
  const [appLabels, setAppLabels] = useState({
    americanFootball: "",
    noData: "",
    connectionError: "",
    photoBy: ""
  });

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
      tags,
      dataFeedFile,
      acceptTerms,
      duration,
      highlightColor,
      textFont,
      fontColor,
      disableAnimations,
      appLabels
    });
    alert("Saved! Check console.");
  };

  return (
    <div style={styles.container}>
      {/* Left Portion */}
      <div style={styles.left}>
        <label style={{ ...styles.field, fontWeight: "bold" }}>{card.title}</label>
        {card.imageSrc && (
          <img src={card.imageSrc} alt={card.title} style={styles.image} />
        )}
        <p>Hundreds of incredible football facts to share.</p>
        <p>Better Viewed Like This:</p>
        <div style={styles.previewBoxes}>
          <div style={{ ...styles.box, width: "100px", height: "60px" }}></div>
          <div style={{ ...styles.box, width: "60px", height: "100px" }}></div>
        </div>
      </div>

      {/* Right Portion */}
      <div style={styles.right}>
        {/* Tabs */}
        <div style={styles.tabs}>
          <button
            style={activeTab === "settings" ? styles.activeTab : styles.tab}
            onClick={() => setActiveTab("settings")}
          >
            Settings
          </button>
          <button
            style={activeTab === "language" ? styles.activeTab : styles.tab}
            onClick={() => setActiveTab("language")}
          >
            Language
          </button>
        </div>

        <div style={styles.tabContent}>
          {/* SETTINGS TAB */}
          {activeTab === "settings" && (
            <div>
              {/* App Name */}
              <div style={styles.field}>
                <label>App Name:</label>
                <input
                  type="text"
                  value={appName}
                  onChange={(e) => setAppName(e.target.value)}
                  style={styles.input}
                />
              </div>

              {/* Tags */}
              <div style={styles.field}>
                <label>Tags (optional):</label>
                <div style={{ display: "flex", gap: "5px", flexWrap: "wrap" }}>
                  {tags?.map((tag, i) => (
                    <span key={i} style={styles.tag}>
                      {tag}{" "}
                      <button
                        onClick={() => removeTag(i)}
                        style={styles.removeTag}
                      >
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
                    onKeyDown={(e) =>
                      e.key === "Enter" && (e.preventDefault(), addTag())
                    }
                  />
                </div>
              </div>

              {/* Data Feed */}
              <div style={styles.field}>
                <label>Data Feed:</label>
                <input
                  type="file"
                  accept=".csv,.json,.xml"
                  onChange={(e) => setDataFeedFile(e.target.files[0])}
                  style={styles.input}
                />
              </div>

              {/* Accept Terms */}
              <div style={styles.field}>
                <label>
                  <input
                    type="checkbox"
                    checked={acceptTerms}
                    onChange={(e) => setAcceptTerms(e.target.checked)}
                  />{" "}
                  I accept the terms below
                </label>
                <p style={styles.description}>
                  It is user’s responsibility to review all Data Feeds used and
                  make sure the selected content is adequate to each target
                  audience.
                </p>
              </div>

              {/* Duration */}
              <div style={styles.field}>
                <label>Show Each Fact For (optional):</label>
                <input
                  type="text"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  style={styles.input}
                />
                <p style={styles.description}>
                  Minimum duration of 15 seconds
                </p>
              </div>

              {/* Highlight Color */}
              <div style={styles.field}>
                <label>Highlight Color (optional):</label>
                <input
                  type="color"
                  value={highlightColor}
                  onChange={(e) => setHighlightColor(e.target.value)}
                />
                <p style={styles.description}>
                  Change the font color of the header.
                </p>
              </div>

              {/* Text Font */}
              <div style={styles.field}>
                <label>Text Font (optional):</label>
                <select
                  value={textFont}
                  onChange={(e) => setTextFont(e.target.value)}
                  style={styles.input}
                >
                  <option value="Arial">Arial</option>
                  <option value="Verdana">Verdana</option>
                  <option value="Times New Roman">Times New Roman</option>
                  <option value="Georgia">Georgia</option>
                </select>
                <p style={styles.description}>
                  Change the font used to show the text.
                </p>
              </div>

              {/* Font Colour */}
              <div style={styles.field}>
                <label>Font Colour (optional):</label>
                <input
                  type="color"
                  value={fontColor}
                  onChange={(e) => setFontColor(e.target.value)}
                />
                <p style={styles.description}>
                  Change the font color inside the cards.
                </p>
              </div>

              {/* Disable Animations */}
              <div style={styles.field}>
                <label>
                  <input
                    type="checkbox"
                    checked={disableAnimations}
                    onChange={(e) => setDisableAnimations(e.target.checked)}
                  />{" "}
                  Disable Animations
                </label>
              </div>
            </div>
          )}

          {/* LANGUAGE TAB */}
          {activeTab === "language" && (
            <div>
              <div style={styles.field}>
                <label>{card?.title}</label>
                <input
                  type="text"
                  value={appLabels.americanFootball}
                  onChange={(e) =>
                    setAppLabels({
                      ...appLabels,
                      americanFootball: e.target.value
                    })
                  }
                  style={styles.input}
                />
              </div>

                            <div style={styles.field}>
                <label>App Labels</label>
                <p>These labels will be displayed in the app. You can choose to override them if the default translation does not fit your needs.</p>
              </div>



              <div style={styles.field}>
                <label>No Data Available:</label>
                <input
                  type="text"
                  value={appLabels.noData}
                  onChange={(e) =>
                    setAppLabels({ ...appLabels, noData: e.target.value })
                  }
                  style={styles.input}
                />
              </div>

              <div style={styles.field}>
                <label>Check internet connection/Data Feed:</label>
                <input
                  type="text"
                  value={appLabels.connectionError}
                  onChange={(e) =>
                    setAppLabels({ ...appLabels, connectionError: e.target.value })
                  }
                  style={styles.input}
                />
              </div>

              <div style={styles.field}>
                <label>Photo by:</label>
                <input
                  type="text"
                  value={appLabels.photoBy}
                  onChange={(e) =>
                    setAppLabels({ ...appLabels, photoBy: e.target.value })
                  }
                  style={styles.input}
                />
              </div>
            </div>
          )}
        </div>

        {/* Buttons */}
        <div style={styles.fixedButtons}>
          <button onClick={handleSave} style={styles.saveBtn}>
            Save
          </button>
          <button
            onClick={() => setShowPopup(true)}
            style={styles.previewBtn}
          >
            Preview
          </button>
        </div>

        {/* Preview Popup */}
        {showPopup && (
          <FormEntertainment1to5PopUp
            image={card.imageSrc}
            duration={duration ? parseInt(duration) : 15}
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
    position: "relative"
  },
  left: {
    flex: 0.35,
    borderRight: "3px solid #ddd",
    backgroundColor: "#f5f5f5",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "10px",
    overflowY: "auto"
  },
  right: {
    flex: 0.65,
    padding: "15px",
    display: "flex",
    flexDirection: "column",
    position: "relative"
  },
  image: {
    width: "100%",
    height: "200px",
    objectFit: "cover",
    borderRadius: "8px",
    marginBottom: "10px"
  },
  previewBoxes: {
    display: "flex",
    gap: "10px",
    marginTop: "10px",
    marginBottom: "20px"
  },
  box: {
    backgroundColor: "#ddd",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "4px"
  },
  tabs: { display: "flex", gap: "10px", marginBottom: "15px" },
  tab: {
    padding: "5px 15px",
    cursor: "pointer",
    backgroundColor: "#eee",
    border: "none",
    borderRadius: "4px"
  },
  activeTab: {
    padding: "5px 15px",
    cursor: "pointer",
    backgroundColor: "#005481",
    color: "#fff",
    border: "none",
    borderRadius: "4px"
  },
  tabContent: { flex: 1, overflowY: "auto" },
  field: { display: "flex", flexDirection: "column", marginBottom: "10px" },
  input: { padding: "5px", borderRadius: "4px", border: "1px solid #ccc" },
  checkboxGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "5px",
    marginTop: "10px"
  },
  fixedButtons: {
    position: "absolute",
    bottom: "10px",
    right: "10px",
    display: "flex",
    gap: "10px"
  },
  saveBtn: {
    padding: "8px 12px",
    backgroundColor: "#005481",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer"
  },
  previewBtn: {
    padding: "8px 12px",
    backgroundColor: "#888",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer"
  },
  tag: {
    padding: "2px 5px",
    backgroundColor: "#ccc",
    borderRadius: "4px",
    display: "flex",
    alignItems: "center"
  },
  removeTag: {
    marginLeft: "5px",
    backgroundColor: "red",
    color: "#fff",
    border: "none",
    borderRadius: "50%",
    width: "16px",
    height: "16px",
    cursor: "pointer"
  },
  description: {
    fontSize: "12px",
    color: "#666",
    marginTop: "4px"
  }
};

export default FormEntertainMent;
