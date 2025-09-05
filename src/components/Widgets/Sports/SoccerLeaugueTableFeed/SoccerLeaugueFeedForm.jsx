/* eslint-disable no-unused-vars */
// BirthdayAnnouncement.jsx
import React, { useState } from "react";
import SoccerleaugueTableFeedPopup from "./SoccerleaugueFeedPopup";

const SoccerleaugueTableFeedForm = ({ card }) => {

    console.log('card',card)
  const [activeTab, setActiveTab] = useState("settings");
  const [tags, setTags] = useState([]);
  const [appName, setAppName] = useState("");
  const [dataFeed, setDataFeed] = useState("");
  const [duration, setDuration] = useState("");
  const [titleFontColor, setTitleFontColor] = useState("");
  const [cardFontColor, setCardFontColor] = useState("");
  const [customBgColor, setCustomBgColor] = useState("");
  const [customBgImage, setCustomBgImage] = useState(null);
  const [disableBackground, setDisableBackground] = useState(false);
  const [disableAnimations, setDisableAnimations] = useState(false);
  const [showCurrentMonth, setShowCurrentMonth] = useState(true);
  const [hideDates, setHideDates] = useState(false);
  const [dataFeedFile, setDataFeedFile] = useState(null);

  const [language, setLanguage] = useState("en");
  const [appLabels, setAppLabels] = useState({
    birthdayAnnouncement: "",
    noBirthdays: ""
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
      duration,
      titleFontColor,
      cardFontColor,
      customBgColor,
      customBgImage,
      disableBackground,
      disableAnimations,
      showCurrentMonth,
      hideDates,
      language,
      appLabels
    });
    alert("Saved! Check console.");
  };

  return (
    <div style={styles.container}>
      {/* Left Portion */}

      <div style={styles.left}>

                      <label style={{ ...styles.field, fontWeight: "bold" }} >{card.title}</label>
        {card.imageSrc && <img src={card.imageSrc} alt={card.title} style={styles.image} />}
        <p>This app will show a list of birthday events matching the filtering criteria.</p>
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
                <label>Data Feed:</label>
                <input
                  type="file"
                  accept=".csv,.json,.xml"
                  onChange={(e) => setDataFeedFile(e.target.files[0])}
                  style={styles.input}
                />
              </div>

              <div style={styles.field}>
                <label>Duration:</label>
                <input type="text" value={duration} onChange={e => setDuration(e.target.value)} style={styles.input} />
              </div>

              <div style={styles.field}>
                <label>Filtering Options:</label>
                <select style={styles.input}>
                  <option>Today Birthday Wishing</option>
                  <option>This Week</option>
                  <option>This Month</option>
                </select>
              </div>

              <div style={styles.field}>
                <label>Title Font Color:</label>
                <input type="color" value={titleFontColor} onChange={e => setTitleFontColor(e.target.value)} />
              </div>

              <div style={styles.field}>
                <label>Card Font Color (optional):</label>
                <input type="color" value={cardFontColor} onChange={e => setCardFontColor(e.target.value)} />
              </div>

              <div style={styles.field}>
                <label>Custom Background Color (optional):</label>
                <input type="color" value={customBgColor} onChange={e => setCustomBgColor(e.target.value)} />
              </div>

              <div style={styles.field}>
                <label>Custom Background Image (optional):</label>
                <input type="file" onChange={e => setCustomBgImage(e.target.files[0])} />
              </div>

              <div style={styles.checkboxGroup}>
                <label><input type="checkbox" checked={disableBackground} onChange={e => setDisableBackground(e.target.checked)} /> Disable Background</label>
                <label><input type="checkbox" checked={disableAnimations} onChange={e => setDisableAnimations(e.target.checked)} /> Disable Animations</label>
                <label><input type="checkbox" checked={showCurrentMonth} onChange={e => setShowCurrentMonth(e.target.checked)} /> Show Current Month</label>
                <label><input type="checkbox" checked={hideDates} onChange={e => setHideDates(e.target.checked)} /> Hide Dates</label>
              </div>
            </div>
          )}

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
                <input type="text" value={appLabels.birthdayAnnouncement} onChange={e => setAppLabels({...appLabels, birthdayAnnouncement: e.target.value})} style={styles.input}/>
              </div>

              <div style={styles.field}>
                <label>No Birthdays to Show:</label>
                <input type="text" value={appLabels.noBirthdays} onChange={e => setAppLabels({...appLabels, noBirthdays: e.target.value})} style={styles.input}/>
              </div>
            </div>
          )}
        </div>

        <div style={styles.fixedButtons}>
          <button onClick={handleSave} style={styles.saveBtn}>Save</button>
        <button onClick={() => setShowPopup(true)} style={styles.previewBtn}>Preview</button>
        </div>


          {showPopup && (
        <SoccerleaugueTableFeedPopup
          image={customBgImage ? URL.createObjectURL(customBgImage) : card.imageSrc}
          duration={duration ? parseInt(duration) : 5}
          onClose={() => setShowPopup(false)}
        />
      )}

      </div>
    </div>
  );
};

const styles = {
  container: { display: "flex", width: "96%", border: "1px solid #ddd", borderRadius: "8px", overflow: "hidden", marginTop: "1px", position: "relative" },
  left: { flex: 0.35, borderRight: "3px solid #ddd", backgroundColor: "#f5f5f5", display: "flex", flexDirection: "column", alignItems: "center", padding: "10px", overflowY: "auto" },
  right: { flex: 0.65, padding: "15px", display: "flex", flexDirection: "column", position: "relative" },
  image: { width: "100%", height: "200px", objectFit: "cover", borderRadius: "8px", marginBottom: "10px" },
  previewBoxes: { display: "flex", gap: "10px", marginTop: "10px", marginBottom: "20px" },
  box: { backgroundColor: "#ddd", display: "flex", justifyContent: "center", alignItems: "center", borderRadius: "4px" },
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

export default SoccerleaugueTableFeedForm;
