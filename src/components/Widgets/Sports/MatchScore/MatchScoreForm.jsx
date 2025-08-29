/* eslint-disable no-unused-vars */
// MatchScoreForm.jsx
import React, { useState } from "react";
import MatchScorePopUp from "./MatchScorePopup";

const MatchScoreForm = ({isScoreWidgetTwo, card }) => {
  console.log('card', card);
  const [activeTab, setActiveTab] = useState("settings");
  const [tags, setTags] = useState([]);
  const [appName, setAppName] = useState("");
  const [dataFeed, setDataFeed] = useState("");
  const [title, setTitle] = useState("");
  const [firstMatchScore, setFirstMatchScore] = useState("");
  const [secondMatchScore, setSecondMatchScore] = useState("");
  const [thirdMatchScore, setThirdMatchScore] = useState("");
  const [fourthMatchScore, setFourthMatchScore] = useState("");
  const [backgroundTheme, setBackgroundTheme] = useState("Baseball");
  const [championshipLogo, setChampionshipLogo] = useState(null);
  const [customBgImage, setCustomBgImage] = useState(null);
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
      title,
      firstMatchScore,
      secondMatchScore,
      thirdMatchScore,
      fourthMatchScore,
      backgroundTheme,
      championshipLogo,
      customBgImage
    });
    alert("Saved! Check console.");
  };

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
                <label>Title:</label>
                <input
                  type="text"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  style={styles.input}
                  placeholder="e.g., MYTHOLOGICAL LEAGUE"
                />
              </div>

              <div style={styles.field}>
                <label>First Match Score:</label>
                <input
                  type="text"
                  value={firstMatchScore}
                  onChange={e => setFirstMatchScore(e.target.value)}
                  style={styles.input}
                  placeholder="e.g., Avalon,1,Camelot,2"
                />
                <p style={styles.description}>
                  Separate teams and scores with commas. E.g. use 'Avalon,1,Camelot,2' to display: 'Avalon 1 x 2 Camelot'
                </p>
              </div>

              <div style={styles.field}>
                <label>Second Match Score (optional):</label>
                <input
                  type="text"
                  value={secondMatchScore}
                  onChange={e => setSecondMatchScore(e.target.value)}
                  style={styles.input}
                  placeholder="e.g., La Ciudad Blanca,1,El Dorado,0"
                />
              </div>

              <div style={styles.field}>
                <label>Third Match Score (optional):</label>
                <input
                  type="text"
                  value={thirdMatchScore}
                  onChange={e => setThirdMatchScore(e.target.value)}
                  style={styles.input}
                  placeholder="e.g., Jotunhein,2,Biarmaland,1"
                />
              </div>

              <div style={styles.field}>
                <label>Fourth Match Score (optional):</label>
                <input
                  type="text"
                  value={fourthMatchScore}
                  onChange={e => setFourthMatchScore(e.target.value)}
                  style={styles.input}
                  placeholder="e.g., Kvenland,2,Kyopelinvuori,1"
                />
              </div>

              <div style={styles.field}>
                <label>Background theme:</label>
                <select
                  value={backgroundTheme}
                  onChange={e => setBackgroundTheme(e.target.value)}
                  style={styles.input}
                >
                  <option value="Baseball">Baseball</option>
                  <option value="BasketBall">BasketBall</option>
                  <option value="Soccer">Soccer</option>
                  <option value="Football">Football</option>
                </select>
              </div>

              <div style={styles.field}>
                <label>Championship Logo (optional):</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={e => setChampionshipLogo(e.target.files[0])}
                />
              </div>

              <div style={styles.field}>
                <label>Custom Background Image (optional):</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={e => setCustomBgImage(e.target.files[0])}
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
          <MatchScorePopUp
            onClose={() => setShowPopup(false)}
            title={title}
            firstMatchScore={firstMatchScore}
            secondMatchScore={secondMatchScore}
            thirdMatchScore={thirdMatchScore}
            fourthMatchScore={fourthMatchScore}
            backgroundTheme={backgroundTheme}
            championshipLogo={championshipLogo ? URL.createObjectURL(championshipLogo) : null}
            customBgImage={customBgImage ? URL.createObjectURL(customBgImage) : null}
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
  description: {
    fontSize: "12px",
    color: "#666",
    margin: "5px 0 0 0",
    fontStyle: "italic"
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
    cursor: "pointer",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "10px"
  }
};

export default MatchScoreForm;