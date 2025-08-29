/* eslint-disable no-unused-vars */
// MatchScoreForm.jsx
import React, { useState } from "react";
import SoccerTablePopUp from "./SoccerTablePopup";

const SoccerTableForm = ({ isScoreWidgetTwo, card }) => {
  const [activeTab, setActiveTab] = useState("settings");

  // Settings Tab States
  const [appName, setAppName] = useState("");
  const [tags, setTags] = useState([]);
  const [dataFeed, setDataFeed] = useState("");
  const [showEachPage, setShowEachPage] = useState("");
  const [teamsPerPage, setTeamsPerPage] = useState("");
  const [league, setLeague] = useState("Champion League");
  const [customLeague, setCustomLeague] = useState("");
  const [animation, setAnimation] = useState("Slide from left");
  const [textFont, setTextFont] = useState("");
  const [textColor, setTextColor] = useState("");
  const [textShadow, setTextShadow] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState("");
  const [backgroundImage, setBackgroundImage] = useState(null);
  const [tableCellColor, setTableCellColor] = useState("");
  const [tableHeaderColor, setTableHeaderColor] = useState("");
  const [animateBgImage, setAnimateBgImage] = useState(false);
  const [hideBgImage, setHideBgImage] = useState(false);

  // Language Tab States
  const [language, setLanguage] = useState("English");
  const [appLabelTeams, setAppLabelTeams] = useState("Teams");
  const [appLabelPoints, setAppLabelPoints] = useState("Points");
  const [appLabelMatches, setAppLabelMatches] = useState("Matches");
  const [appLabelWins, setAppLabelWins] = useState("Wins");
  const [appLabelRound, setAppLabelRound] = useState("Round");
  const [appLabelInfoNA, setAppLabelInfoNA] = useState("Information not available");
  const [appLabelSample, setAppLabelSample] = useState("Sample");

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
    const data = {
      settings: {
        appName,
        tags,
        showEachPage,
        teamsPerPage,
        league,
        customLeague,
        animation,
        textFont,
        textColor,
        textShadow,
        backgroundColor,
        backgroundImage,
        tableCellColor,
        tableHeaderColor,
        animateBgImage,
        hideBgImage
      },
      language: {
        language,
        appLabelTeams,
        appLabelPoints,
        appLabelMatches,
        appLabelWins,
        appLabelRound,
        appLabelInfoNA,
        appLabelSample
      }
    };
    console.log(data);
    alert("Saved! Check console.");
  };

  const [showPopup, setShowPopup] = useState(false);

  return (
    <div style={styles.container}>
      {/* Left Portion */}
      <div style={styles.left}>
        <label style={{ ...styles.field, fontWeight: "bold" }}>{card.title}</label>
        {card.imageSrc && <img src={card.imageSrc} alt={card.title} style={styles.image} />}
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
                <label>Show each page for (seconds):</label>
                <input type="number" value={showEachPage} onChange={e => setShowEachPage(e.target.value)} style={styles.input} />
                <small>Display up to 10 teams per page</small>
              </div>

              <div style={styles.field}>
                <label>Number of teams per page (optional):</label>
                <input type="number" value={teamsPerPage} onChange={e => setTeamsPerPage(e.target.value)} style={styles.input} />
              </div>

              <div style={styles.field}>
                <label>League:</label>
                <select value={league} onChange={e => setLeague(e.target.value)} style={styles.input}>
                  <option>Champion League</option>
                  <option>Brazil League</option>
                  <option>Premier League</option>
                  <option>La Liga</option>
                </select>
              </div>

              <div style={styles.field}>
                <label>Custom League Name (optional):</label>
                <input type="text" value={customLeague} onChange={e => setCustomLeague(e.target.value)} style={styles.input} />
              </div>

              <div style={styles.field}>
                <label>Animation:</label>
                <select value={animation} onChange={e => setAnimation(e.target.value)} style={styles.input}>
                  <option>Slide from left</option>
                  <option>Slide from right</option>
                  <option>Slide from top</option>
                  <option>Slide from bottom</option>
                  <option>Fade</option>
                </select>
              </div>

              <div style={styles.field}>
                <label>Text font (optional):</label>
                <input type="text" value={textFont} onChange={e => setTextFont(e.target.value)} style={styles.input} />
              </div>

              <div style={styles.field}>
                <label>Text color (optional):</label>
                <input type="color" value={textColor} onChange={e => setTextColor(e.target.value)} style={styles.input} />
              </div>

              <div style={styles.field}>
                <label>
                  <input type="checkbox" checked={textShadow} onChange={e => setTextShadow(e.target.checked)} /> Text shadow
                </label>
              </div>

              <div style={styles.field}>
                <label>Background color (optional):</label>
                <input type="color" value={backgroundColor} onChange={e => setBackgroundColor(e.target.value)} style={styles.input} />
              </div>

              <div style={styles.field}>
                <label>Background image (optional):</label>
                <input type="file" accept="image/*" onChange={e => setBackgroundImage(e.target.files[0])} />
              </div>

              <div style={styles.field}>
                <label>Table cell color (optional):</label>
                <input type="color" value={tableCellColor} onChange={e => setTableCellColor(e.target.value)} style={styles.input} />
              </div>

              <div style={styles.field}>
                <label>Table header color (optional):</label>
                <input type="color" value={tableHeaderColor} onChange={e => setTableHeaderColor(e.target.value)} style={styles.input} />
              </div>

              <div style={styles.field}>
                <label>
                  <input type="checkbox" checked={animateBgImage} onChange={e => setAnimateBgImage(e.target.checked)} /> Animate background image
                </label>
              </div>

              <div style={styles.field}>
                <label>
                  <input type="checkbox" checked={hideBgImage} onChange={e => setHideBgImage(e.target.checked)} /> Hide background image
                </label>
              </div>
            </div>
          )}

          {activeTab === "language" && (
            <div>
              <div style={styles.field}>
                <label>Language:</label>
                <select value={language} onChange={e => setLanguage(e.target.value)} style={styles.input}>
                  <option>English</option>
                  <option>Spanish</option>
                  <option>French</option>
                  <option>German</option>
                </select>
                <small>Changing the language will affect text, dates, and numbers displayed on the app.</small>
              </div>

              <h4>App Labels</h4>
              <div style={styles.field}><label>Teams:</label><input type="text" value={appLabelTeams} onChange={e => setAppLabelTeams(e.target.value)} style={styles.input} /></div>
              <div style={styles.field}><label>Points:</label><input type="text" value={appLabelPoints} onChange={e => setAppLabelPoints(e.target.value)} style={styles.input} /></div>
              <div style={styles.field}><label>Matches:</label><input type="text" value={appLabelMatches} onChange={e => setAppLabelMatches(e.target.value)} style={styles.input} /></div>
              <div style={styles.field}><label>Wins:</label><input type="text" value={appLabelWins} onChange={e => setAppLabelWins(e.target.value)} style={styles.input} /></div>
              <div style={styles.field}><label>Round:</label><input type="text" value={appLabelRound} onChange={e => setAppLabelRound(e.target.value)} style={styles.input} /></div>
              <div style={styles.field}><label>Information not available:</label><input type="text" value={appLabelInfoNA} onChange={e => setAppLabelInfoNA(e.target.value)} style={styles.input} /></div>
              <div style={styles.field}><label>Sample:</label><input type="text" value={appLabelSample} onChange={e => setAppLabelSample(e.target.value)} style={styles.input} /></div>
            </div>
          )}
        </div>

        <div style={styles.fixedButtons}>
          <button onClick={handleSave} style={styles.saveBtn}>Save</button>
          <button onClick={() => setShowPopup(true)} style={styles.previewBtn}>Preview</button>
        </div>

        {showPopup && (
          <SoccerTablePopUp
            onClose={() => setShowPopup(false)}
            isScoreWidgetTwo={isScoreWidgetTwo}
            settings={{
              appName,
              tags,
              showEachPage,
              teamsPerPage,
              league,
              customLeague,
              animation,
              textFont,
              textColor,
              textShadow,
              backgroundColor,
              backgroundImage: backgroundImage ? URL.createObjectURL(backgroundImage) : null,
              tableCellColor,
              tableHeaderColor,
              animateBgImage,
              hideBgImage
            }}
            language={{
              language,
              appLabelTeams,
              appLabelPoints,
              appLabelMatches,
              appLabelWins,
              appLabelRound,
              appLabelInfoNA,
              appLabelSample
            }}
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
  description: { fontSize: "12px", color: "#666", margin: "5px 0 0 0", fontStyle: "italic" },
  fixedButtons: { position: "absolute", bottom: "10px", right: "10px", display: "flex", gap: "10px" },
  saveBtn: { padding: "8px 12px", backgroundColor: "#005481", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" },
  previewBtn: { padding: "8px 12px", backgroundColor: "#888", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" },
  tag: { padding: "2px 5px", backgroundColor: "#ccc", borderRadius: "4px", display: "flex", alignItems: "center" },
  removeTag: { marginLeft: "5px", backgroundColor: "red", color: "#fff", border: "none", borderRadius: "50%", width: "16px", height: "16px", cursor: "pointer", display: "flex", justifyContent: "center", alignItems: "center", fontSize: "10px" }
};

export default SoccerTableForm;
