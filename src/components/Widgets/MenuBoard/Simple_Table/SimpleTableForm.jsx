/* eslint-disable no-unused-vars */
// SimpleTableForm.jsx
import React, { useState } from "react";
import SimpleTablePopUp from "./SimpleTablePopup";

const SimpleTableForm = ({ card }) => {
  console.log('card', card);
  
  const [activeTab, setActiveTab] = useState("settings");
  const [tags, setTags] = useState([]);
  const [appName, setAppName] = useState("");
  const [dataFeed, setDataFeed] = useState("");
  const [dataFeedFile, setDataFeedFile] = useState(null);
  const [title, setTitle] = useState("");
  const [showEachPageFor, setShowEachPageFor] = useState("");
  const [rowsPerTable, setRowsPerTable] = useState("");
  const [textFont, setTextFont] = useState("Arial");
  const [titleFontSize, setTitleFontSize] = useState(16);
  const [bodyFontSize, setBodyFontSize] = useState(14);
  const [titleColor, setTitleColor] = useState("#000000");
  const [textColor, setTextColor] = useState("#000000");
  const [backgroundColor, setBackgroundColor] = useState("#ffffff");
  const [backgroundImage, setBackgroundImage] = useState(null);
  const [disableAnimations, setDisableAnimations] = useState(false);
  const [dontDisplayTitle, setDontDisplayTitle] = useState(false);

  const [language, setLanguage] = useState("en");
  const [appLabels, setAppLabels] = useState({
    noDataAvailable: "",
    checkInternetConnection: ""
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
      title,
      showEachPageFor,
      rowsPerTable,
      textFont,
      titleFontSize,
      bodyFontSize,
      titleColor,
      textColor,
      backgroundColor,
      backgroundImage,
      disableAnimations,
      dontDisplayTitle,
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
        <p>This app will show a list of data in table format matching the filtering criteria.</p>
        <p>Better Viewed Like This:</p>
        <div style={styles.previewBoxes}>
          <div style={{ ...styles.box, width: "100px", height: "60px" }}></div>
          <div style={{ ...styles.box, width: "60px", height: "100px" }}></div>
        </div>
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
          <button
            style={activeTab === "language" ? styles.activeTab : styles.tab}
            onClick={() => setActiveTab("language")}
          >
            Language
          </button>
        </div>

        <div style={styles.tabContent}>
          {activeTab === "settings" && (
            <div>
              <div style={styles.field}>
                <label>App Name:</label>
                <input
                  type="text"
                  value={appName}
                  onChange={e => setAppName(e.target.value)}
                  style={styles.input}
                />
              </div>

              <div style={styles.field}>
                <label>Tags (optional):</label>
                <div style={{ display: "flex", gap: "5px", flexWrap: "wrap" }}>
                  {tags?.map((tag, i) => (
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
                <label>Data Feed (file):</label>
                <input
                  type="file"
                  accept=".csv,.json,.xml"
                  onChange={(e) => setDataFeedFile(e.target.files[0])}
                  style={styles.input}
                />
              </div>

              <div style={styles.field}>
                <label>Title:</label>
                <input 
                  type="text" 
                  value={title} 
                  onChange={e => setTitle(e.target.value)} 
                  style={styles.input} 
                />
              </div>

              <div style={styles.field}>
                <label>Show Each Page For (duration field):</label>
                <input 
                  type="number" 
                  value={showEachPageFor} 
                  onChange={e => setShowEachPageFor(e.target.value)} 
                  style={styles.input}
                  placeholder="Duration in seconds"
                />
              </div>

              <div style={styles.field}>
                <label>Rows Per Table (optional):</label>
                <input 
                  type="number" 
                  value={rowsPerTable} 
                  onChange={e => setRowsPerTable(e.target.value)} 
                  style={styles.input}
                  placeholder="Number of rows"
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
                  onChange={e => setTitleColor(e.target.value)} 
                />
              </div>

              <div style={styles.field}>
                <label>Text Color (optional):</label>
                <input 
                  type="color" 
                  value={textColor} 
                  onChange={e => setTextColor(e.target.value)} 
                />
              </div>

              <div style={styles.field}>
                <label>Background Color:</label>
                <input 
                  type="color" 
                  value={backgroundColor} 
                  onChange={e => setBackgroundColor(e.target.value)} 
                />
              </div>

              <div style={styles.field}>
                <label>Background Image (optional):</label>
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={e => setBackgroundImage(e.target.files[0])} 
                />
              </div>

              <div style={styles.checkboxGroup}>
                <label>
                  <input 
                    type="checkbox" 
                    checked={disableAnimations} 
                    onChange={e => setDisableAnimations(e.target.checked)} 
                  /> Disable Animations
                </label>
                <label>
                  <input 
                    type="checkbox" 
                    checked={dontDisplayTitle} 
                    onChange={e => setDontDisplayTitle(e.target.checked)} 
                  /> Don't Display Title
                </label>
                <p style={styles.checkboxNote}>
                  When this box is checked, no title will be displayed. However, the Title field cannot be empty.
                </p>
              </div>
            </div>
          )}

          {activeTab === "language" && (
            <div>
              <div style={styles.field}>
                <label>Language:</label>
                <select 
                  value={language} 
                  onChange={e => setLanguage(e.target.value)} 
                  style={styles.input}
                >
                  <option value="en">English</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                  <option value="de">German</option>
                  <option value="it">Italian</option>
                </select>
              </div>

              <div style={styles.field}>
                <label style={styles.heading}>App Labels</label>
                <p style={styles.description}>
                  These labels will be displayed in the app. You can choose to override them if the default translation shown below does not fit your needs.
                </p>
              </div>

              <div style={styles.field}>
                <label>No Data Available:</label>
                <input 
                  type="text" 
                  value={appLabels.noDataAvailable} 
                  onChange={e => setAppLabels({...appLabels, noDataAvailable: e.target.value})} 
                  style={styles.input}
                  placeholder="No data available"
                />
              </div>

              <div style={styles.field}>
                <label>Check Internet Connection/Data Source:</label>
                <input 
                  type="text" 
                  value={appLabels.checkInternetConnection} 
                  onChange={e => setAppLabels({...appLabels, checkInternetConnection: e.target.value})} 
                  style={styles.input}
                  placeholder="Check internet connection/data source"
                />
              </div>
            </div>
          )}
        </div>

        <div style={styles.fixedButtons}>
          <button onClick={handleSave} style={styles.saveBtn}>Save</button>
          <button onClick={() => setShowPopup(true)} style={styles.previewBtn}>Preview</button>
        </div>

        {showPopup && (
          <SimpleTablePopUp
            image={backgroundImage ? URL.createObjectURL(backgroundImage) : card.imageSrc}
            title={title}
            titleColor={titleColor}
            textColor={textColor}
            backgroundColor={backgroundColor}
            textFont={textFont}
            titleFontSize={titleFontSize}
            bodyFontSize={bodyFontSize}
            disableAnimations={disableAnimations}
            dontDisplayTitle={dontDisplayTitle}
            showEachPageFor={showEachPageFor ? parseInt(showEachPageFor) : 5}
            rowsPerTable={rowsPerTable ? parseInt(rowsPerTable) : 10}
            appLabels={appLabels}
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
  tabs: { 
    display: "flex", 
    gap: "10px", 
    marginBottom: "15px" 
  },
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
  tabContent: { 
    flex: 1, 
    overflowY: "auto" 
  },
  field: { 
    display: "flex", 
    flexDirection: "column", 
    marginBottom: "10px" 
  },
  input: { 
    padding: "5px", 
    borderRadius: "4px", 
    border: "1px solid #ccc" 
  },
  checkboxGroup: { 
    display: "flex", 
    flexDirection: "column", 
    gap: "5px", 
    marginTop: "10px" 
  },
  checkboxNote: {
    fontSize: "12px",
    color: "#666",
    fontStyle: "italic",
    marginTop: "5px",
    marginLeft: "20px"
  },
  heading: {
    fontWeight: "bold",
    fontSize: "16px",
    marginBottom: "5px"
  },
  description: {
    fontSize: "12px",
    color: "#666",
    marginBottom: "10px",
    lineHeight: "1.4"
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
  }
};

export default SimpleTableForm;