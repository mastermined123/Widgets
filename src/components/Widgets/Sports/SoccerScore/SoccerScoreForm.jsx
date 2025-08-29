/* eslint-disable no-unused-vars */
// SoccerScoreForm.jsx
import React, { useState } from "react";
import SoccerScorePopUp from "./SoccerScorePopup";

const SoccerScoreForm = ({ isScoreWidgetTwo, card }) => {
  console.log('card', card);
  
  const [activeTab, setActiveTab] = useState("settings");
  const [tags, setTags] = useState([]);
  const [appName, setAppName] = useState("");
  const [dataFeed, setDataFeed] = useState("");
  const [intervalBetweenFixtures, setIntervalBetweenFixtures] = useState("");
  const [leagueCup, setLeagueCup] = useState("ChampionLeague");
  const [customLeagueName, setCustomLeagueName] = useState("");
  const [transition, setTransition] = useState("Slide from left");
  const [round, setRound] = useState("last round");
  const [textFont, setTextFont] = useState("");
  const [textColor, setTextColor] = useState("#000000");
  const [textShadow, setTextShadow] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState("#ffffff");
  const [backgroundImage, setBackgroundImage] = useState(null);
  const [tableCellColor, setTableCellColor] = useState("#ffffff");
  const [animateBackgroundImage, setAnimateBackgroundImage] = useState(false);
  const [hideBackgroundImage, setHideBackgroundImage] = useState(false);
  const [language, setLanguage] = useState("en");
  const [appLabels, setAppLabels] = useState({
    round: "",
    informationNotAvailable: "",
    sample: ""
  });
  const [showPopup, setShowPopup] = useState(false);

  // League/Cup options
  const leagueCupOptions = [
    "ChampionLeague",
    "Premier League", 
    "La Liga",
    "Serie A",
    "Bundesliga",
    "Ligue 1",
    "World Cup",
    "Euro Cup",
    "Copa America"
  ];

  // Transition options
  const transitionOptions = [
    "Slide from left",
    "Slide from Right", 
    "Slide Top",
    "Slide From Bottom",
    "Fade",
    "No Animation"
  ];

  // Font options
  const fontOptions = [
    "Arial",
    "Helvetica", 
    "Times New Roman",
    "Georgia",
    "Verdana",
    "Courier New",
    "Impact",
    "Comic Sans MS"
  ];

  // Language options
  const languageOptions = [
    { value: "en", label: "English" },
    { value: "es", label: "Spanish" },
    { value: "fr", label: "French" },
    { value: "de", label: "German" },
    { value: "it", label: "Italian" },
    { value: "pt", label: "Portuguese" },
    { value: "ar", label: "Arabic" },
    { value: "ur", label: "Urdu" }
  ];

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
      intervalBetweenFixtures,
      leagueCup,
      customLeagueName,
      transition,
      round,
      textFont,
      textColor,
      textShadow,
      backgroundColor,
      backgroundImage,
      tableCellColor,
      animateBackgroundImage,
      hideBackgroundImage,
      language,
      appLabels
    });
    alert("Saved! Check console.");
  };

  return (
    <div style={styles.container}>
      {/* Left Portion */}
      <div style={styles.left}>
        <label style={{ ...styles.field, fontWeight: "bold" }}>{card?.title || "Soccer Score Display"}</label>
        {card?.imageSrc && <img src={card.imageSrc} alt={card.title} style={styles.image} />}
        <p>This app will display match scores in a stylish scorecard format.</p>
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
                <label>Interval between league fixtures:</label>
                <input
                  type="text"
                  value={intervalBetweenFixtures}
                  onChange={e => setIntervalBetweenFixtures(e.target.value)}
                  style={styles.input}
                  placeholder="e.g., 30 seconds"
                />
                <p style={styles.description}>
                  In case there is more than 20 teams
                </p>
              </div>

              <div style={styles.field}>
                <label>League/Cup:</label>
                <select
                  value={leagueCup}
                  onChange={e => setLeagueCup(e.target.value)}
                  style={styles.input}
                >
                  {leagueCupOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>

              <div style={styles.field}>
                <label>Custom League Name (optional):</label>
                <input
                  type="text"
                  value={customLeagueName}
                  onChange={e => setCustomLeagueName(e.target.value)}
                  style={styles.input}
                  placeholder="Enter custom league name"
                />
              </div>

              <div style={styles.field}>
                <label>Transition:</label>
                <select
                  value={transition}
                  onChange={e => setTransition(e.target.value)}
                  style={styles.input}
                >
                  {transitionOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>

              <div style={styles.field}>
                <label>Round:</label>
                <select
                  value={round}
                  onChange={e => setRound(e.target.value)}
                  style={styles.input}
                >
                  <option value="last round">last round</option>
                  <option value="next round">next round</option>
                </select>
              </div>

              <div style={styles.field}>
                <label>Text font (optional):</label>
                <select
                  value={textFont}
                  onChange={e => setTextFont(e.target.value)}
                  style={styles.input}
                >
                  <option value="">Default</option>
                  {fontOptions.map(font => (
                    <option key={font} value={font}>{font}</option>
                  ))}
                </select>
              </div>

              <div style={styles.field}>
                <label>Text color (optional):</label>
                <input
                  type="color"
                  value={textColor}
                  onChange={e => setTextColor(e.target.value)}
                  style={styles.colorInput}
                />
              </div>

              <div style={styles.checkboxGroup}>
                <label>
                  <input 
                    type="checkbox" 
                    checked={textShadow} 
                    onChange={e => setTextShadow(e.target.checked)} 
                  /> Text shadow
                </label>
              </div>

              <div style={styles.field}>
                <label>Background color (optional):</label>
                <input
                  type="color"
                  value={backgroundColor}
                  onChange={e => setBackgroundColor(e.target.value)}
                  style={styles.colorInput}
                />
              </div>

              <div style={styles.field}>
                <label>Background Image (optional):</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={e => setBackgroundImage(e.target.files[0])}
                  style={styles.input}
                />
              </div>

              <div style={styles.field}>
                <label>Table cell color (optional):</label>
                <input
                  type="color"
                  value={tableCellColor}
                  onChange={e => setTableCellColor(e.target.value)}
                  style={styles.colorInput}
                />
              </div>

              <div style={styles.checkboxGroup}>
                <label>
                  <input 
                    type="checkbox" 
                    checked={animateBackgroundImage} 
                    onChange={e => setAnimateBackgroundImage(e.target.checked)} 
                  /> Animate background image
                </label>
                <label>
                  <input 
                    type="checkbox" 
                    checked={hideBackgroundImage} 
                    onChange={e => setHideBackgroundImage(e.target.checked)} 
                  /> Hide background image
                </label>
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
                  {languageOptions.map(lang => (
                    <option key={lang.value} value={lang.value}>{lang.label}</option>
                  ))}
                </select>
                <p style={styles.description}>
                  Changing the language will affect any text displayed on the app as well as how dates and numbers are formatted.
                </p>
              </div>

              <div style={styles.field}>
                <label style={styles.sectionHeading}>App Labels</label>
                <p style={styles.description}>
                  These labels will be displayed in the app. You can choose to override them if the default translation shown below does not fit your needs.
                </p>
              </div>

              <div style={styles.field}>
                <label>Round:</label>
                <input 
                  type="text" 
                  value={appLabels.round} 
                  onChange={e => setAppLabels({...appLabels, round: e.target.value})} 
                  style={styles.input}
                  placeholder="round"
                />
              </div>

              <div style={styles.field}>
                <label>Information not available:</label>
                <input 
                  type="text" 
                  value={appLabels.informationNotAvailable} 
                  onChange={e => setAppLabels({...appLabels, informationNotAvailable: e.target.value})} 
                  style={styles.input}
                  placeholder="Information not available"
                />
              </div>

              <div style={styles.field}>
                <label>Sample:</label>
                <input 
                  type="text" 
                  value={appLabels.sample} 
                  onChange={e => setAppLabels({...appLabels, sample: e.target.value})} 
                  style={styles.input}
                  placeholder="Sample"
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
          <SoccerScorePopUp
            onClose={() => setShowPopup(false)}
            intervalBetweenFixtures={intervalBetweenFixtures}
            leagueCup={leagueCup}
            customLeagueName={customLeagueName}
            transition={transition}
            round={round}
            textFont={textFont}
            textColor={textColor}
            textShadow={textShadow}
            backgroundColor={backgroundColor}
            backgroundImage={backgroundImage ? URL.createObjectURL(backgroundImage) : null}
            tableCellColor={tableCellColor}
            animateBackgroundImage={animateBackgroundImage}
            hideBackgroundImage={hideBackgroundImage}
            language={language}
            appLabels={appLabels}
            isScoreWidgetTwo={isScoreWidgetTwo}
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
    overflowY: "auto",
    paddingBottom: "60px"
  },
  field: {
    display: "flex",
    flexDirection: "column",
    marginBottom: "12px"
  },
  input: {
    padding: "8px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    fontSize: "14px"
  },
  colorInput: {
    padding: "4px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    width: "60px",
    height: "40px",
    cursor: "pointer"
  },
  description: {
    fontSize: "12px",
    color: "#666",
    margin: "5px 0 0 0",
    fontStyle: "italic"
  },
  sectionHeading: {
    fontWeight: "bold",
    fontSize: "16px",
    color: "#333",
    marginBottom: "5px"
  },
  checkboxGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    marginTop: "5px"
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
    padding: "4px 8px",
    backgroundColor: "#ccc",
    borderRadius: "4px",
    display: "flex",
    alignItems: "center",
    fontSize: "12px"
  },
  removeTag: {
    marginLeft: "6px",
    backgroundColor: "red",
    color: "#fff",
    border: "none",
    borderRadius: "50%",
    width: "18px",
    height: "18px",
    cursor: "pointer",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "10px"
  }
};

export default SoccerScoreForm;