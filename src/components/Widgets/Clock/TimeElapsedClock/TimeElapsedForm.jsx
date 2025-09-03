/* eslint-disable no-unused-vars */
// EventCountDownForm.jsx
import React, { useState } from "react";
import TimeElapsedPopUp from "./TimeElapsedPopUp";

const TimeElapsedForm = ({ card }) => {

    console.log('card',card)
  const [activeTab, setActiveTab] = useState("settings");
  const [tags, setTags] = useState([]);
  const [appName, setAppName] = useState("");
  const [dataFeed, setDataFeed] = useState("");
  
  // Settings tab fields
  const [eventDate, setEventDate] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [countdownType, setCountdownType] = useState("Days");
  const [text, setText] = useState("");
  const [autoFitText, setAutoFitText] = useState(false);
  const [lineHeight, setLineHeight] = useState("Regular");
  const [pageMargin, setPageMargin] = useState("Regular");
  const [backgroundColor, setBackgroundColor] = useState("#ffffff");
  const [customBgImage, setCustomBgImage] = useState(null);
  const [transparentBackground, setTransparentBackground] = useState(false);
  const [language, setLanguage] = useState("en");

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
      eventDate,
      eventTime,
      countdownType,
      text,
      autoFitText,
      lineHeight,
      pageMargin,
      backgroundColor,
      customBgImage,
      transparentBackground,
      language
    });
    alert("Saved! Check console.");
  };

  return (
    <div style={styles.container}>
      {/* Left Portion */}
      <div style={styles.left}>
        <label style={{ ...styles.field, fontWeight: "bold" }} >{card.title}</label>
        {card.imageSrc && <img src={card.imageSrc} alt={card.title} style={styles.image} />}
        <p>This app will show a countdown to your specified event.</p>
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
                <label>Event Date:</label>
                <input
                  type="date"
                  value={eventDate}
                  onChange={e => setEventDate(e.target.value)}
                  style={styles.input}
                />
              </div>

              <div style={styles.field}>
                <label>Event Time:</label>
                <input
                  type="time"
                  value={eventTime}
                  onChange={e => setEventTime(e.target.value)}
                  style={styles.input}
                />
              </div>

              <div style={styles.field}>
                <label>Countdown Type:</label>
                <select 
                  value={countdownType} 
                  onChange={e => setCountdownType(e.target.value)} 
                  style={styles.input}
                >
                  <option value="Months">Months</option>
                  <option value="Days">Days</option>
                  <option value="Hours">Hours</option>
                  <option value="Days only">Days only</option>
                </select>
              </div>

              <div style={styles.field}>
                <label>Text:</label>
                <textarea
                  value={text}
                  onChange={e => setText(e.target.value)}
                  style={{ ...styles.input, minHeight: "80px", resize: "vertical" }}
                  placeholder="Enter your countdown text..."
                />
              </div>

              <div style={styles.checkboxGroup}>
                <label>
                  <input 
                    type="checkbox" 
                    checked={autoFitText} 
                    onChange={e => setAutoFitText(e.target.checked)} 
                  /> 
                  Auto-fit text size
                </label>
              </div>

              <div style={styles.field}>
                <label>Line Height:</label>
                <select 
                  value={lineHeight} 
                  onChange={e => setLineHeight(e.target.value)} 
                  style={styles.input}
                >
                  <option value="Small">Small</option>
                  <option value="Regular">Regular</option>
                  <option value="Big">Big</option>
                </select>
              </div>

              <div style={styles.field}>
                <label>Page Margin:</label>
                <select 
                  value={pageMargin} 
                  onChange={e => setPageMargin(e.target.value)} 
                  style={styles.input}
                >
                  <option value="Small">Small</option>
                  <option value="Regular">Regular</option>
                  <option value="Big">Big</option>
                </select>
              </div>

              <div style={styles.checkboxGroup}>
                <label>
                  <input 
                    type="checkbox" 
                    checked={transparentBackground} 
                    onChange={e => setTransparentBackground(e.target.checked)} 
                  /> 
                  Transparent background
                </label>
              </div>

              <div style={styles.field}>
                <label>Background Color:</label>
                <div style={styles.colorInputContainer}>
                  <input 
                    type="text" 
                    value={backgroundColor} 
                    onChange={e => setBackgroundColor(e.target.value)} 
                    style={styles.colorTextInput}
                    placeholder="#ffffff"
                  />
                  <input 
                    type="color" 
                    value={backgroundColor} 
                    onChange={e => setBackgroundColor(e.target.value)} 
                    style={styles.colorPicker}
                  />
                </div>
              </div>

              <div style={styles.field}>
                <label>Custom Background Image (optional):</label>
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={e => setCustomBgImage(e.target.files[0])} 
                  style={styles.input}
                />
              </div>

              <div style={styles.field}>
                <label>Language:</label>
                <select value={language} onChange={e => setLanguage(e.target.value)} style={styles.input}>
                  <option value="en">English</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                  <option value="de">German</option>
                  <option value="it">Italian</option>
                  <option value="pt">Portuguese</option>
                  <option value="ru">Russian</option>
                  <option value="ja">Japanese</option>
                  <option value="ko">Korean</option>
                  <option value="zh">Chinese</option>
                  <option value="ar">Arabic</option>
                  <option value="hi">Hindi</option>
                  <option value="ur">Urdu</option>
                </select>
              </div>
            </div>
          )}
        </div>

        <div style={styles.fixedButtons}>
          <button onClick={handleSave} style={styles.saveBtn}>Save</button>
          <button onClick={() => setShowPopup(true)} style={styles.previewBtn}>Preview</button>
        </div>

        {showPopup && (
          <TimeElapsedPopUp
            onClose={() => setShowPopup(false)}
            eventDate={eventDate}
            eventTime={eventTime}
            countdownType={countdownType}
            text={text}
            autoFitText={autoFitText}
            lineHeight={lineHeight}
            pageMargin={pageMargin}
            backgroundColor={backgroundColor}
            customBgImage={customBgImage}
            transparentBackground={transparentBackground}
            language={language}
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
    overflow: "hidden" 
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
    objectFit: "contain", 
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
    marginBottom: "15px" 
  },
  input: { 
    padding: "8px", 
    borderRadius: "4px", 
    border: "1px solid #ccc", 
    marginTop: "2px",
    fontSize: "14px"
  },
  checkboxGroup: { 
    display: "flex", 
    flexDirection: "column", 
    gap: "8px", 
    marginTop: "10px",
    marginBottom: "15px"
  },
  fixedButtons: { 
    position: "absolute", 
    bottom: "10px", 
    right: "10px", 
    display: "flex", 
    gap: "10px" 
  },
  saveBtn: { 
    padding: "8px 16px", 
    backgroundColor: "#ff8c00", 
    color: "#fff", 
    border: "none", 
    borderRadius: "4px", 
    cursor: "pointer",
    fontWeight: "500"
  },
  previewBtn: { 
    padding: "8px 16px", 
    backgroundColor: "#007acc", 
    color: "#fff", 
    border: "none", 
    borderRadius: "4px", 
    cursor: "pointer",
    fontWeight: "500"
  },
  tag: { 
    padding: "4px 8px", 
    backgroundColor: "#e0e0e0", 
    borderRadius: "4px", 
    display: "flex", 
    alignItems: "center",
    fontSize: "14px"
  },
  removeTag: { 
    marginLeft: "5px", 
    backgroundColor: "#ff6b6b", 
    color: "#fff", 
    border: "none", 
    borderRadius: "50%", 
    width: "16px", 
    height: "16px", 
    cursor: "pointer",
    fontSize: "12px"
  },
  colorInputContainer: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginTop: "2px"
  },
  colorTextInput: {
    flex: 1,
    padding: "8px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    fontSize: "14px"
  },
  colorPicker: {
    width: "40px",
    height: "36px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    cursor: "pointer",
    padding: "0"
  }
};

export default TimeElapsedForm;