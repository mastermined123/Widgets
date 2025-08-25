/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import EmployeeFormpopUp from "./EmployeeFormPopUp";

const EmployeeForm = ({ card }) => {
  const [activeTab, setActiveTab] = useState("settings");

  // Settings tab fields
  const [appName, setAppName] = useState("");
  const [tags, setTags] = useState([]);
  const [dataFeedFile, setDataFeedFile] = useState(null);
  const [duration, setDuration] = useState("");
  const [title, setTitle] = useState("Employee of the Month");
  const [description, setDescription] = useState("");
  const [textFont, setTextFont] = useState("Arial");
  const [fontColor, setFontColor] = useState("#000000");
  const [ribbonColor, setRibbonColor] = useState("#FFD700");
  const [dividerColor, setDividerColor] = useState("#ccc");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [bgImage, setBgImage] = useState(null);

  // Settings checkboxes
  const [disableStar, setDisableStar] = useState(false);
  const [disableRibbon, setDisableRibbon] = useState(false);
  const [disableAnimation, setDisableAnimation] = useState(false);

  // Language tab fields
  const [language, setLanguage] = useState("en");
  const [appLabels, setAppLabels] = useState({
    noData: "",
    checkConnection: ""
  });

  // Popup
  const [showPopup, setShowPopup] = useState(false);

  const [dataFeed, setDataFeed] = useState(""); // for tags input

  // Tag handling
  const addTag = () => {
    if (dataFeed.trim()) {
      setTags([...tags, dataFeed.trim()]);
      setDataFeed("");
    }
  };

  const removeTag = (index) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    console.log({
      appName,
      tags,
      dataFeedFile,
      duration,
      title,
      description,
      textFont,
      fontColor,
      ribbonColor,
      dividerColor,
      bgColor,
      bgImage,
      disableStar,
      disableRibbon,
      disableAnimation,
      language,
      appLabels
    });
    alert("Saved! Check console.");
  };

  return (
    <div style={styles.container}>
      {/* Left Portion */}
      <div style={styles.left}>
        <label style={{ ...styles.field, fontWeight: "bold" }}>{card.title}</label>
        {card.imageSrc && <img src={card.imageSrc} alt={card.title} style={styles.image} />}
        <p>This app will show a list of employee events matching the filtering criteria.</p>
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
          {/* Settings Tab */}
          {activeTab === "settings" && (
            <div>
              <div style={styles.field}>
                <label>App Name:</label>
                <input type="text" value={appName} onChange={e => setAppName(e.target.value)} style={styles.input} />
              </div>

              <div style={styles.field}>
                <label>Tags (optional):</label>
                <div style={{ display: "flex", gap: "5px", flexWrap: "wrap" }}>
                  {tags.map((tag, i) => (
                    <span key={i} style={styles.tag}>
                      {tag} <button onClick={() => removeTag(i)} style={styles.removeTag}>x</button>
                    </span>
                  ))}
                  <input
                    type="text"
                    value={dataFeed}
                    onChange={e => setDataFeed(e.target.value)}
                    placeholder="Enter tag"
                    style={{ ...styles.input, flex: "1" }}
                    onKeyDown={e => e.key === "Enter" && (e.preventDefault(), addTag())}
                  />
                </div>
              </div>

              <div style={styles.field}>
                <label>Data Feed:</label>
                <input type="file" accept=".csv,.json,.xml" onChange={e => setDataFeedFile(e.target.files[0])} style={styles.input} />
              </div>

              <div style={styles.field}>
                <label>Show Each Employee For (seconds):</label>
                <input type="number" value={duration} onChange={e => setDuration(e.target.value)} style={styles.input} />
              </div>

              <div style={styles.field}>
                <label>Title:</label>
                <input type="text" value={title} onChange={e => setTitle(e.target.value)} style={styles.input} />
              </div>

              <div style={styles.field}>
                <label>Description (optional):</label>
                <input type="text" value={description} onChange={e => setDescription(e.target.value)} style={styles.input} />
              </div>

              <div style={styles.field}>
                <label>Text Font (optional):</label>
                <select value={textFont} onChange={e => setTextFont(e.target.value)} style={styles.input}>
                  <option value="Arial">Arial</option>
                  <option value="Helvetica">Helvetica</option>
                  <option value="Times New Roman">Times New Roman</option>
                </select>
              </div>

              <div style={styles.field}>
                <label>Font Color (optional):</label>
                <input type="color" value={fontColor} onChange={e => setFontColor(e.target.value)} />
              </div>

              <div style={styles.field}>
                <label>Ribbon Color (optional):</label>
                <input type="color" value={ribbonColor} onChange={e => setRibbonColor(e.target.value)} />
              </div>

              <div style={styles.field}>
                <label>Divider Color (optional):</label>
                <input type="color" value={dividerColor} onChange={e => setDividerColor(e.target.value)} />
              </div>

              <div style={styles.field}>
                <label>Background Color (optional):</label>
                <input type="color" value={bgColor} onChange={e => setBgColor(e.target.value)} />
              </div>

              <div style={styles.field}>
                <label>Background Image (optional):</label>
                <input type="file" onChange={e => setBgImage(e.target.files[0])} />
              </div>

              {/* Checkboxes */}
              <div style={styles.checkboxGroup}>
                <label><input type="checkbox" checked={disableStar} onChange={e => setDisableStar(e.target.checked)} /> Disable Star Illustration</label>
                <label><input type="checkbox" checked={disableRibbon} onChange={e => setDisableRibbon(e.target.checked)} /> Disable Ribbon Illustration</label>
                <label><input type="checkbox" checked={disableAnimation} onChange={e => setDisableAnimation(e.target.checked)} /> Disable Animation</label>
              </div>
            </div>
          )}

          {/* Language Tab */}
          {activeTab === "language" && (
            <div>
              <div style={styles.field}>
                <label>Language:</label>
                <select value={language} onChange={e => setLanguage(e.target.value)} style={styles.input}>
                  <option value="en">English</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                </select>
              </div>

              <div style={styles.field}>
                <label>App Labels</label>
                <p>These labels will be displayed in the app. You can choose to override them if the default translation does not fit your needs.</p>
              </div>

              <div style={styles.field}>
                <label>No Data Available:</label>
                <input type="text" value={appLabels.noData} onChange={e => setAppLabels({...appLabels, noData: e.target.value})} style={styles.input} />
              </div>

              <div style={styles.field}>
                <label>Check Internet Connection/Data Feed:</label>
                <input type="text" value={appLabels.checkConnection} onChange={e => setAppLabels({...appLabels, checkConnection: e.target.value})} style={styles.input} />
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div style={styles.fixedButtons}>
          <button onClick={handleSave} style={styles.saveBtn}>Save</button>
          <button onClick={() => setShowPopup(true)} style={styles.previewBtn}>Preview</button>
        </div>

        {/* Popup */}
        {showPopup && (
          <EmployeeFormpopUp
            image={bgImage ? URL.createObjectURL(bgImage) : card.imageSrc}
            duration={duration ? parseInt(duration) : 5}
            onClose={() => setShowPopup(false)}
          />
        )}
      </div>
    </div>
  );
};

// Styles
const styles = {
  container: { display: "flex", width: "96%", border: "1px solid #ddd", borderRadius: "8px", overflow: "hidden", marginTop: "1px", position: "relative" },
  left: { flex: 0.35, borderRight: "3px solid #ddd", backgroundColor: "#f5f5f5", display: "flex", flexDirection: "column", alignItems: "center", padding: "10px", overflowY: "auto" },
  right: { flex: 0.65, padding: "15px", display: "flex", flexDirection: "column", position: "relative" },
  image: { width: "100%", height: "200px", objectFit: "cover", borderRadius: "8px", marginBottom: "10px" },
  tabs: { display: "flex", gap: "10px", marginBottom: "15px" },
  tab: { padding: "5px 15px", cursor: "pointer", backgroundColor: "#eee", border: "none", borderRadius: "4px" },
  activeTab: { padding: "5px 15px", cursor: "pointer", backgroundColor: "#005481", color: "#fff", border: "none", borderRadius: "4px" },
  tabContent: { flex: 1, overflowY: "auto" },
  field: { display: "flex", flexDirection: "column", marginBottom: "10px" },
  input: { padding: "5px", borderRadius: "4px", border: "1px solid #ccc" },
  checkboxGroup: { display: "flex", flexDirection: "column", gap: "5px", marginTop: "10px" },
  fixedButtons: { position: "absolute", bottom: "10px", right: "10px", display: "flex", gap: "10px" },
  saveBtn: { padding: "8px 12px", backgroundColor: "#005481", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" },
  previewBtn: { padding: "8px 12px", backgroundColor: "#888", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" },
  tag: { padding: "2px 5px", backgroundColor: "#ccc", borderRadius: "4px", display: "flex", alignItems: "center" },
  removeTag: { marginLeft: "5px", backgroundColor: "red", color: "#fff", border: "none", borderRadius: "50%", width: "16px", height: "16px", cursor: "pointer" }
};

export default EmployeeForm;
