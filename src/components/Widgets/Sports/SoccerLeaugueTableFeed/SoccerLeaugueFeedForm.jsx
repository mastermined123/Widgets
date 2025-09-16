import React, { useState } from "react";
import SoccerleaugueTableFeedPopup from "./SoccerleaugueFeedPopup";

const SoccerleaugueTableFeedForm = ({ card }) => {
  console.log("card", card);

  const [activeTab, setActiveTab] = useState("settings");

  const [appName, setAppName] = useState("");
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [dataFeedFile, setDataFeedFile] = useState(null);
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [group, setGroup] = useState("");
  const [championshipLogo, setChampionshipLogo] = useState(null);
  const [textFont, setTextFont] = useState("");
  const [customHeaderColor, setCustomHeaderColor] = useState("");
  const [customBgColor, setCustomBgColor] = useState("");
  const [customBgImage, setCustomBgImage] = useState(null);

  const [language, setLanguage] = useState("en");
  const [appLabels, setAppLabels] = useState({
    MP: "",
    W: "",
    D: "",
    L: "",
    F: "",
    A: "",
    GD: "",
    Pts: "",
  });

  const [showPopup, setShowPopup] = useState(false);

  // Tag handlers
  const addTag = () => {
    if (tagInput.trim()) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const removeTag = (index) => {
    const newTags = tags.filter((_, i) => i !== index);
    setTags(newTags);
  };

  // Save handler
  const handleSave = () => {
    console.log({
      appName,
      tags,
      dataFeedFile,
      title,
      subtitle,
      group,
      championshipLogo,
      textFont,
      customHeaderColor,
      customBgColor,
      customBgImage,
      language,
      appLabels,
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
        <p>
          This app will show a soccer league table feed based on the configured
          data.
        </p>
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

        {/* Tab Content */}
        <div style={styles.tabContent}>
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
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
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

              {/* Title */}
              <div style={styles.field}>
                <label>Title:</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  style={styles.input}
                />
              </div>

              {/* Subtitle */}
              <div style={styles.field}>
                <label>Subtitle (optional):</label>
                <input
                  type="text"
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  style={styles.input}
                />
              </div>

              {/* Group */}
              <div style={styles.field}>
                <label>Group:</label>
                <input
                  type="text"
                  value={group}
                  onChange={(e) => setGroup(e.target.value)}
                  style={styles.input}
                />
              </div>

              {/* Championship Logo */}
              <div style={styles.field}>
                <label>Championship Logo (optional):</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setChampionshipLogo(e.target.files[0])}
                  style={styles.input}
                />
              </div>

              {/* Text Font */}
              <div style={styles.field}>
                <label>Text Font (optional):</label>
                <input
                  type="text"
                  value={textFont}
                  onChange={(e) => setTextFont(e.target.value)}
                  style={styles.input}
                  placeholder="e.g., Arial, Roboto"
                />
              </div>

              {/* Custom Header Color */}
              <div style={styles.field}>
                <label>Custom Header Color (optional):</label>
                <input
                  type="color"
                  value={customHeaderColor}
                  onChange={(e) => setCustomHeaderColor(e.target.value)}
                />
              </div>

              {/* Custom Background Color */}
              <div style={styles.field}>
                <label>Custom Background Color (optional):</label>
                <input
                  type="color"
                  value={customBgColor}
                  onChange={(e) => setCustomBgColor(e.target.value)}
                />
              </div>

              {/* Custom Background Image */}
              <div style={styles.field}>
                <label>Custom Background Image (optional):</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setCustomBgImage(e.target.files[0])}
                />
              </div>
            </div>
          )}

          {activeTab === "language" && (
            <div>
              {/* Language */}
              <div style={styles.field}>
                <label>Language:</label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  style={styles.input}
                >
                  <option value="en">English</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                </select>
                <p style={{ fontSize: "12px", color: "#555", marginTop: "5px" }}>
                  Changing the language will affect any text displayed on the
                  app as well as how dates and numbers are formatted.
                </p>
              </div>

              {/* App Labels */}
              <div style={styles.field}>
                <label>App Labels</label>
                <p>
                  These labels will be displayed in the app. You can choose to
                  override them if the default translation shown below does not
                  fit your needs.
                </p>
              </div>

              {/* Labels fields */}
              {Object.keys(appLabels).map((key) => (
                <div style={styles.field} key={key}>
                  <input
                    type="text"
                    placeholder={key}
                    value={appLabels[key]}
                    onChange={(e) =>
                      setAppLabels({ ...appLabels, [key]: e.target.value })
                    }
                    style={styles.input}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Save + Preview */}
        <div style={styles.fixedButtons}>
          <button onClick={handleSave} style={styles.saveBtn}>
            Save
          </button>
          <button onClick={() => setShowPopup(true)} style={styles.previewBtn}>
            Preview
          </button>
        </div>

        {/* Popup */}
        {showPopup && (
          <SoccerleaugueTableFeedPopup
            image={
              customBgImage ? URL.createObjectURL(customBgImage) : card.imageSrc
            }
            duration={5}
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
  previewBoxes: {
    display: "flex",
    gap: "10px",
    marginTop: "10px",
    marginBottom: "20px",
  },
  box: {
    backgroundColor: "#ddd",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "4px",
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

export default SoccerleaugueTableFeedForm;
