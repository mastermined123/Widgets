/* eslint-disable no-unused-vars */
// SoccerLeagueTableForm.jsx
import React, { useState } from "react";
import SoccerLeaugueTablePopUp from "./SoccerLeaugueTablePopup";

const SoccerLeaugueTableForm = ({ isScoreWidgetTwo, card }) => {
  // Settings Tab States
  const [appName, setAppName] = useState("");
  const [tags, setTags] = useState([]);
  const [dataFeed, setDataFeed] = useState("");
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [group, setGroup] = useState("");
  const [firstTeamScore, setFirstTeamScore] = useState("");
  const [secondTeamScore, setSecondTeamScore] = useState("");
  const [thirdTeamScore, setThirdTeamScore] = useState("");
  const [fourthTeamScore, setFourthTeamScore] = useState("");
  const [fifthTeamScore, setFifthTeamScore] = useState("");
  const [language, setLanguage] = useState("English");
  const [championshipLogo, setChampionshipLogo] = useState(null);
  const [customBackgroundImage, setCustomBackgroundImage] = useState(null);

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
        title,
        subtitle,
        group,
        firstTeamScore,
        secondTeamScore,
        thirdTeamScore,
        fourthTeamScore,
        fifthTeamScore,
        language,
        championshipLogo,
        customBackgroundImage
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
        <div style={styles.header}>
          <h3>Settings</h3>
        </div>

        <div style={styles.tabContent}>
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
              <label>Title:</label>
              <input 
                type="text" 
                value={title} 
                onChange={e => setTitle(e.target.value)} 
                style={styles.input} 
              />
            </div>

            <div style={styles.field}>
              <label>Subtitle (optional):</label>
              <input 
                type="text" 
                value={subtitle} 
                onChange={e => setSubtitle(e.target.value)} 
                style={styles.input} 
              />
            </div>

            <div style={styles.field}>
              <label>Group:</label>
              <input 
                type="text" 
                value={group} 
                onChange={e => setGroup(e.target.value)} 
                style={styles.input} 
              />
            </div>

            <div style={styles.field}>
              <label>First Team Score:</label>
              <input 
                type="text" 
                value={firstTeamScore} 
                onChange={e => setFirstTeamScore(e.target.value)} 
                style={styles.input} 
              />
              <small style={styles.description}>
                Use Position, Team, Matches played, Wins, Draws, Losses, Goals for, Goals against, Goals difference, Points
              </small>
            </div>

            <div style={styles.field}>
              <label>Second Team Score (optional):</label>
              <input 
                type="text" 
                value={secondTeamScore} 
                onChange={e => setSecondTeamScore(e.target.value)} 
                style={styles.input} 
              />
            </div>

            <div style={styles.field}>
              <label>Third Team Score (optional):</label>
              <input 
                type="text" 
                value={thirdTeamScore} 
                onChange={e => setThirdTeamScore(e.target.value)} 
                style={styles.input} 
              />
            </div>

            <div style={styles.field}>
              <label>Fourth Team Score (optional):</label>
              <input 
                type="text" 
                value={fourthTeamScore} 
                onChange={e => setFourthTeamScore(e.target.value)} 
                style={styles.input} 
              />
            </div>

            <div style={styles.field}>
              <label>Fifth Team Score (optional):</label>
              <input 
                type="text" 
                value={fifthTeamScore} 
                onChange={e => setFifthTeamScore(e.target.value)} 
                style={styles.input} 
              />
            </div>

            <div style={styles.field}>
              <label>Language:</label>
              <select 
                value={language} 
                onChange={e => setLanguage(e.target.value)} 
                style={styles.input}
              >
                <option>English</option>
                <option>Spanish</option>
                <option>French</option>
                <option>German</option>
                <option>Portuguese</option>
                <option>Italian</option>
                <option>Dutch</option>
                <option>Russian</option>
                <option>Arabic</option>
                <option>Chinese</option>
              </select>
            </div>

            <div style={styles.field}>
              <label>Championship Logo (optional):</label>
              <input 
                type="file" 
                accept="image/*" 
                onChange={e => setChampionshipLogo(e.target.files[0])} 
                style={styles.fileInput}
              />
            </div>

            <div style={styles.field}>
              <label>Custom Background Image (optional):</label>
              <input 
                type="file" 
                accept="image/*" 
                onChange={e => setCustomBackgroundImage(e.target.files[0])} 
                style={styles.fileInput}
              />
            </div>
          </div>
        </div>

        <div style={styles.fixedButtons}>
          <button onClick={handleSave} style={styles.saveBtn}>Save</button>
          <button onClick={() => setShowPopup(true)} style={styles.previewBtn}>Preview</button>
        </div>

{showPopup && (
  <SoccerLeaugueTablePopUp
    onClose={() => setShowPopup(false)}
    isScoreWidgetTwo={isScoreWidgetTwo}
    settings={{
      appName,
      tags,
      title,
      subtitle,
      group,
      firstTeamScore,
      secondTeamScore,
      thirdTeamScore,
      fourthTeamScore,
      fifthTeamScore,
      language,
      championshipLogo: championshipLogo ? URL.createObjectURL(championshipLogo) : "https://via.placeholder.com/60x60/ffffff/000000?text=LOGO",
      customBackgroundImage: customBackgroundImage ? URL.createObjectURL(customBackgroundImage) : "https://via.placeholder.com/800x600/4CAF50/ffffff?text=Background"
    }}
  />
)}      </div>
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
  header: {
    marginBottom: "15px"
  },
  tabContent: { 
    flex: 1, 
    overflowY: "auto", 
    paddingBottom: "60px" 
  },
  field: { 
    display: "flex", 
    flexDirection: "column", 
    marginBottom: "15px" 
  },
  input: { 
    padding: "8px", 
    borderRadius: "4px", 
    border: "1px solid #ccc",
    fontSize: "14px"
  },
  fileInput: {
    padding: "5px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    fontSize: "14px"
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

export default SoccerLeaugueTableForm;