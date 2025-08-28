/* eslint-disable no-unused-vars */
// TextThickerForm.jsx
import React, { useState } from "react";
import TextTickerPopUp from "./Text_TickerPopup";

const TextTickerForm = ({ card }) => {

    console.log('card',card)
  const [appName, setAppName] = useState("");
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [textColor, setTextColor] = useState("#000000");
  const [backgroundColor, setBackgroundColor] = useState("#ffffff");
  const [sentenceDuration, setSentenceDuration] = useState("3");
  const [animateTransition, setAnimateTransition] = useState(true);
  const [fontSize, setFontSize] = useState("100");
  const [textFont, setTextFont] = useState("");
  const [textContent, setTextContent] = useState("");
  const [showPopup, setShowPopup] = useState(false);

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

  const handleSave = () => {
    console.log({
      appName,
      tags,
      textColor,
      backgroundColor,
      sentenceDuration,
      animateTransition,
      fontSize,
      textFont,
      textContent
    });
    alert("Saved! Check console.");
  };

  return (
    <div style={styles.container}>
      {/* Left Portion */}
      <div style={styles.left}>
        <label style={{ ...styles.field, fontWeight: "bold" }}>{card.title}</label>
        {card.imageSrc && <img src={card.imageSrc} alt={card.title} style={styles.image} />}
        <p>This app will show scrolling text with customizable animations and styling.</p>
        <p>Better Viewed Like This:</p>
        <div style={styles.previewBoxes}>
          <div style={{ ...styles.box, width: "100px", height: "60px" }}></div>
          <div style={{ ...styles.box, width: "60px", height: "100px" }}></div>
        </div>
      </div>

      {/* Right Portion */}
      <div style={styles.right}>
        <div style={styles.tabs}>
          <button style={styles.activeTab}>
            Settings
          </button>
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
                placeholder="Enter app name"
              />
            </div>

            <div style={styles.field}>
              <label>Tags (optional):</label>
              <div style={{ display: "flex", gap: "5px", flexWrap: "wrap", marginBottom: "5px" }}>
                {tags?.map((tag, i) => (
                  <span key={i} style={styles.tag}>
                    {tag} <button onClick={() => removeTag(i)} style={styles.removeTag}>×</button>
                  </span>
                ))}
              </div>
              <div style={{ display: "flex", gap: "5px" }}>
                <input
                  type="text"
                  value={tagInput}
                  onChange={e => setTagInput(e.target.value)}
                  placeholder="Enter tag"
                  style={{ ...styles.input, flex: "1" }}
                  onKeyDown={e => e.key === "Enter" && (e.preventDefault(), addTag())}
                />
                <button onClick={addTag} style={styles.addBtn}>Add</button>
              </div>
            </div>

            <div style={styles.field}>
              <label>Text Color:</label>
              <input 
                type="color" 
                value={textColor} 
                onChange={e => setTextColor(e.target.value)} 
                style={styles.colorInput}
              />
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
              <label>Show each sentence for (seconds):</label>
              <input 
                type="number" 
                value={sentenceDuration} 
                onChange={e => setSentenceDuration(e.target.value)} 
                style={styles.input}
                min="1"
                max="10"
                placeholder="3"
              />
            </div>

            <div style={styles.checkboxGroup}>
              <label>
                <input 
                  type="checkbox" 
                  checked={animateTransition} 
                  onChange={e => setAnimateTransition(e.target.checked)} 
                /> 
                Animate text transition
              </label>
            </div>

<div style={styles.field}>
  <label>Font size (%) (optional):</label>
  <input 
    type="number" 
    value={fontSize} 
    onChange={e => {
      const value = e.target.value;
      const numValue = parseInt(value);
      
      if (value === "" || (numValue >= 1 && numValue <= 100)) {
        setFontSize(value);
      } else if (numValue < 1) {
        alert("Font size cannot be less than 1%");
        setFontSize("1");
      } else if (numValue > 100) {
        alert("Font size cannot be more than 100%");
        setFontSize("100");
      }
    }} 
    style={styles.input}
    min="1"
    max="100"
    placeholder="100"
  />
</div>
            <div style={styles.field}>
              <label>Text font (optional):</label>
              <select 
                value={textFont} 
                onChange={e => setTextFont(e.target.value)} 
                style={styles.input}
              >
                <option value="">Default</option>
                <option value="Arial">Arial</option>
                <option value="Times New Roman">Times New Roman</option>
                <option value="Helvetica">Helvetica</option>
                <option value="Georgia">Georgia</option>
                <option value="Verdana">Verdana</option>
                <option value="Courier New">Courier New</option>
                <option value="Impact">Impact</option>
                <option value="Comic Sans MS">Comic Sans MS</option>
              </select>
            </div>

            <div style={styles.field}>
              <label>Text:</label>
              <textarea
                value={textContent}
                onChange={e => setTextContent(e.target.value)}
                style={styles.textarea}
                placeholder="Enter your text content here. Each sentence will be displayed for the specified duration."
                rows="6"
              />
            </div>
          </div>
        </div>

        <div style={styles.fixedButtons}>
          <button onClick={handleSave} style={styles.saveBtn}>Save</button>
          <button onClick={() => setShowPopup(true)} style={styles.previewBtn}>Preview</button>
        </div>

        {showPopup && (
          <TextTickerPopUp
            textColor={textColor}
            backgroundColor={backgroundColor}
            sentenceDuration={parseInt(sentenceDuration) || 3}
            animateTransition={animateTransition}
            fontSize={fontSize}
            textFont={textFont}
            textContent={textContent}
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
  activeTab: { 
    padding: "8px 20px", 
    cursor: "pointer", 
    backgroundColor: "#005481", 
    color: "#fff", 
    border: "none", 
    borderRadius: "4px",
    fontWeight: "bold"
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
  textarea: { 
    padding: "8px", 
    borderRadius: "4px", 
    border: "1px solid #ccc",
    fontSize: "14px",
    resize: "vertical",
    minHeight: "100px"
  },
  colorInput: {
    width: "50px",
    height: "40px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    cursor: "pointer"
  },
  checkboxGroup: { 
    display: "flex", 
    flexDirection: "column", 
    gap: "8px", 
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
    padding: "10px 16px", 
    backgroundColor: "#005481", 
    color: "#fff", 
    border: "none", 
    borderRadius: "4px", 
    cursor: "pointer",
    fontWeight: "bold"
  },
  previewBtn: { 
    padding: "10px 16px", 
    backgroundColor: "#888", 
    color: "#fff", 
    border: "none", 
    borderRadius: "4px", 
    cursor: "pointer",
    fontWeight: "bold"
  },
  tag: { 
    padding: "4px 8px", 
    backgroundColor: "#e0e0e0", 
    borderRadius: "16px", 
    display: "flex", 
    alignItems: "center",
    fontSize: "12px"
  },
  removeTag: { 
    marginLeft: "6px", 
    backgroundColor: "#ff4444", 
    color: "#fff", 
    border: "none", 
    borderRadius: "50%", 
    width: "18px", 
    height: "18px", 
    cursor: "pointer",
    fontSize: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  addBtn: {
    padding: "8px 12px",
    backgroundColor: "#005481",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "14px"
  }
};

export default TextTickerForm;