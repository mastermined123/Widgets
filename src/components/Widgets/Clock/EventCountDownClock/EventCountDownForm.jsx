/* eslint-disable no-unused-vars */
// EventCountDownForm.jsx
import React, { useState } from "react";
import EventCountDownPopUp from "./EventCountDownPopUp";

const EventCountDownForm = ({ card }) => {

    console.log('card',card)
  const [activeTab, setActiveTab] = useState("settings");
  const [tags, setTags] = useState([]);
  const [appName, setAppName] = useState("");
  const [dataFeed, setDataFeed] = useState("");
  
  // New fields for Settings tab
  const [eventDate, setEventDate] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [countdownType, setCountdownType] = useState("Days");
  const [text, setText] = useState("");
  const [autoFitText, setAutoFitText] = useState(false);
  const [textFont, setTextFont] = useState("Arial");
  const [lineHeight, setLineHeight] = useState("Regular");
  const [pageMargin, setPageMargin] = useState("Regular");
  const [backgroundColor, setBackgroundColor] = useState("");
  const [customBgImage, setCustomBgImage] = useState(null);
  const [transparentBackground, setTransparentBackground] = useState(false);
  const [disableBackgroundGradient, setDisableBackgroundGradient] = useState(false);

  console.log("countdownType",countdownType)
  // Language fields
  const [language, setLanguage] = useState("en");
  const [appLabels, setAppLabels] = useState({
    months: "",
    days: "",
    hours: ""
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
      eventDate,
      eventTime,
      countdownType,
      text,
      autoFitText,
      textFont,
      lineHeight,
      pageMargin,
      backgroundColor,
      customBgImage,
      transparentBackground,
      disableBackgroundGradient,
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
                {/* <div style={styles.textControls}>
                  <button 
                    type="button" 
                    style={styles.formatBtn}
                    onClick={() => setText(prev => `<b>${prev}</b>`)}
                  >
                    Bold
                  </button>
                  <button 
                    type="button" 
                    style={styles.formatBtn}
                    onClick={() => setText(prev => `<i>${prev}</i>`)}
                  >
                    Italic
                  </button>
                  <input 
                    type="color" 
                    title="Text Color"
                    style={styles.colorPicker}
                  />
                </div> */}
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
                <label>Text Font (optional):</label>
                <select 
                  value={textFont} 
                  onChange={e => setTextFont(e.target.value)} 
                  style={styles.input}
                >
                  <option value="Arial">Arial</option>
                  <option value="Helvetica">Helvetica</option>
                  <option value="Times New Roman">Times New Roman</option>
                  <option value="Georgia">Georgia</option>
                  <option value="Verdana">Verdana</option>
                  <option value="Courier New">Courier New</option>
                  <option value="Impact">Impact</option>
                  <option value="Comic Sans MS">Comic Sans MS</option>
                </select>
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

              <div style={styles.field}>
                <label>Background Color:</label>
                <input 
                  type="color" 
                  value={backgroundColor} 
                  onChange={e => setBackgroundColor(e.target.value)} 
                  style={styles.colorInput}
                />
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

              <div style={styles.checkboxGroup}>
                <label>
                  <input 
                    type="checkbox" 
                    checked={transparentBackground} 
                    onChange={e => setTransparentBackground(e.target.checked)} 
                  /> 
                  Transparent background
                </label>
                <label>
                  <input 
                    type="checkbox" 
                    checked={disableBackgroundGradient} 
                    onChange={e => setDisableBackgroundGradient(e.target.checked)} 
                  /> 
                  Disable background gradient
                </label>
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

              <div style={styles.field}>
                <p style={{ margin: "10px 0", fontSize: "14px", color: "#666" }}>
                  Changing the language will affect any text displayed on the app as well as how dates and numbers are formatted.
                </p>
              </div>

              <div style={styles.field}>
                <h4 style={{ margin: "15px 0 10px 0", fontSize: "16px", fontWeight: "bold" }}>App Labels</h4>
                <p style={{ margin: "0 0 15px 0", fontSize: "14px", color: "#666" }}>
                  These labels will be displayed in the app. You can choose to override them if the default translation shown below does not fit your needs.
                </p>
              </div>

              <div style={styles.field}>
                <label>Months:</label>
                <input 
                  type="text" 
                  value={appLabels.months} 
                  onChange={e => setAppLabels({...appLabels, months: e.target.value})} 
                  style={styles.input}
                  placeholder="Months"
                />
              </div>

              <div style={styles.field}>
                <label>Days:</label>
                <input 
                  type="text" 
                  value={appLabels.days} 
                  onChange={e => setAppLabels({...appLabels, days: e.target.value})} 
                  style={styles.input}
                  placeholder="Days"
                />
              </div>

              <div style={styles.field}>
                <label>Hours:</label>
                <input 
                  type="text" 
                  value={appLabels.hours} 
                  onChange={e => setAppLabels({...appLabels, hours: e.target.value})} 
                  style={styles.input}
                  placeholder="Hours"
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
          <EventCountDownPopUp
            onClose={() => setShowPopup(false)}
            eventDate={eventDate}
            eventTime={eventTime}
            countdownType={countdownType}
            text={text}
            autoFitText={autoFitText}
            textFont={textFont}
            lineHeight={lineHeight}
            pageMargin={pageMargin}
            backgroundColor={backgroundColor}
            customBgImage={customBgImage}
            transparentBackground={transparentBackground}
            disableBackgroundGradient={disableBackgroundGradient}
            language={language}
            appLabels={appLabels}
          />
        )}
      </div>
    </div>
  );
};

const styles = {
  container: { display: "flex", width: "96%", border: "1px solid #ddd", borderRadius: "8px", overflow: "hidden", marginTop: "1px", position: "relative" },
  left: { flex: 0.35, borderRight: "3px solid #ddd", backgroundColor: "#f5f5f5", display: "flex", flexDirection: "column", alignItems: "center", padding: "10px", overflow: "hidden" },
  right: { flex: 0.65, padding: "15px", display: "flex", flexDirection: "column", position: "relative" },
  image: { width: "100%", objectFit: "contain", borderRadius: "8px", marginBottom: "10px" },
  previewBoxes: { display: "flex", gap: "10px", marginTop: "10px", marginBottom: "20px" },
  box: { backgroundColor: "#ddd", display: "flex", justifyContent: "center", alignItems: "center", borderRadius: "4px" },
  tabs: { display: "flex", gap: "10px", marginBottom: "15px" },
  tab: { padding: "5px 15px", cursor: "pointer", backgroundColor: "#eee", border: "none", borderRadius: "4px" },
  activeTab: { padding: "5px 15px", cursor: "pointer", backgroundColor: "#005481", color: "#fff", border: "none", borderRadius: "4px" },
  tabContent: { flex: 1, overflowY: "auto", paddingBottom: "60px" },
  field: { display: "flex", flexDirection: "column", marginBottom: "10px" },
  input: { padding: "5px", borderRadius: "4px", border: "1px solid #ccc", marginTop: "2px" },
  colorInput: { padding: "2px", borderRadius: "4px", border: "1px solid #ccc", width: "50px", height: "30px", marginTop: "2px" },
  colorPicker: { width: "30px", height: "25px", border: "1px solid #ccc", borderRadius: "4px", padding: "0", cursor: "pointer" },
  textControls: { display: "flex", gap: "5px", marginTop: "5px", alignItems: "center" },
  formatBtn: { padding: "4px 8px", backgroundColor: "#f0f0f0", border: "1px solid #ccc", borderRadius: "4px", cursor: "pointer", fontSize: "12px" },
  checkboxGroup: { display: "flex", flexDirection: "column", gap: "8px", marginTop: "10px" },
  fixedButtons: { position: "absolute", bottom: "10px", right: "10px", display: "flex", gap: "10px" },
  saveBtn: { padding: "8px 12px", backgroundColor: "#005481", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" },
  previewBtn: { padding: "8px 12px", backgroundColor: "#888", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" },
  tag: { padding: "2px 5px", backgroundColor: "#ccc", borderRadius: "4px", display: "flex", alignItems: "center" },
  removeTag: { marginLeft: "5px", backgroundColor: "red", color: "#fff", border: "none", borderRadius: "50%", width: "16px", height: "16px", cursor: "pointer" }
};

export default EventCountDownForm;