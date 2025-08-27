/* eslint-disable no-unused-vars */
// CafeTeriaForm.jsx
import React, { useState } from "react";
import CafeTeriaFormPopUp from "./CaferteriaFormPopUp";

const CafeTeriaForm = ({ card }) => {
  console.log("card", card);
  const [activeTab, setActiveTab] = useState("settings");
  const [tags, setTags] = useState([]);
  const [appName, setAppName] = useState("");
  const [dataFeed, setDataFeed] = useState("");
  const [duration, setDuration] = useState("");
  const [noMealMessage, setNoMealMessage] = useState("");
  const [textFont, setTextFont] = useState("Arial");
  const [itemsFontColor, setItemsFontColor] = useState("#000000");
  const [mealFontColor, setMealFontColor] = useState("#000000");
  const [highlightColor, setHighlightColor] = useState("#000000");
  const [cardBgColor, setCardBgColor] = useState("#ffffff");
  const [customBgColor, setCustomBgColor] = useState("#ffffff");
  const [customBgImage, setCustomBgImage] = useState(null);
  const [showOnlyToday, setShowOnlyToday] = useState(false);
  const [disableAnimations, setDisableAnimations] = useState(false);
  const [dataFeedFile, setDataFeedFile] = useState(null);

  const [language, setLanguage] = useState("en");
  const [appLabels, setAppLabels] = useState({
    monday: "",
    tuesday: "",
    wednesday: "",
    thursday: "",
    friday: "",
    saturday: "",
    sunday: "",
    noData: "",
    checkConnection: "",
    noCards: ""
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
      noMealMessage,
      textFont,
      itemsFontColor,
      mealFontColor,
      highlightColor,
      cardBgColor,
      customBgColor,
      customBgImage,
      showOnlyToday,
      disableAnimations,
      language,
      appLabels
    });
    alert("Saved! Check console.");
  };

  return (
    <div style={styles.container}>
      {/* Left Portion */}
      <div style={styles.left}>
        <label style={{ ...styles.field, fontWeight: "bold" }}>
          {card.title}
        </label>
        {card.imageSrc && (
          <img src={card.imageSrc} alt={card.title} style={styles.image} />
        )}
        <p>
          This app will show a list of cafeteria meals for each day of the week.
        </p>
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
          {/* SETTINGS TAB */}
          {activeTab === "settings" && (
            <div>
              <div style={styles.field}>
                <label>App Name:</label>
                <input
                  type="text"
                  value={appName}
                  onChange={(e) => setAppName(e.target.value)}
                  style={styles.input}
                />
              </div>

              <div style={styles.field}>
                <label>Tags (optional):</label>
                <div style={{ display: "flex", gap: "5px", flexWrap: "wrap" }}>
                  {tags?.map((tag, i) => (
                    <span key={i} style={styles.tag}>
                      {tag}{" "}
                      <button
                        onClick={() => removeTag(i)}
                        style={styles.removeTag}
                      >
                        x
                      </button>
                    </span>
                  ))}
                  <input
                    type="text"
                    value={dataFeed}
                    onChange={(e) => setDataFeed(e.target.value)}
                    placeholder="Enter tag"
                    style={{ ...styles.input, flex: "1" }}
                    onKeyDown={(e) =>
                      e.key === "Enter" && (e.preventDefault(), addTag())
                    }
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
                <label>Show Each Page For:</label>
                <input
                  type="text"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  style={styles.input}
                  placeholder="Seconds"
                />
              </div>

              <div style={styles.field}>
                <label>No Meal Message (optional):</label>
                <input
                  type="text"
                  value={noMealMessage}
                  onChange={(e) => setNoMealMessage(e.target.value)}
                  style={styles.input}
                  placeholder="Message when no meals available"
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
                <label>Items Font Color (optional):</label>
                <input
                  type="color"
                  value={itemsFontColor}
                  onChange={(e) => setItemsFontColor(e.target.value)}
                />
              </div>

              <div style={styles.field}>
                <label>Meal Font Color (optional):</label>
                <input
                  type="color"
                  value={mealFontColor}
                  onChange={(e) => setMealFontColor(e.target.value)}
                />
              </div>

              <div style={styles.field}>
                <label>Highlight Color (optional):</label>
                <input
                  type="color"
                  value={highlightColor}
                  onChange={(e) => setHighlightColor(e.target.value)}
                />
              </div>

              <div style={styles.field}>
                <label>Card's Background Color (optional):</label>
                <input
                  type="color"
                  value={cardBgColor}
                  onChange={(e) => setCardBgColor(e.target.value)}
                />
              </div>

              <div style={styles.field}>
                <label>Background Color (optional):</label>
                <input
                  type="color"
                  value={customBgColor}
                  onChange={(e) => setCustomBgColor(e.target.value)}
                />
              </div>

              <div style={styles.field}>
                <label>Background Image (optional):</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setCustomBgImage(e.target.files[0])}
                />
              </div>

              <div style={styles.checkboxGroup}>
                <label>
                  <input
                    type="checkbox"
                    checked={showOnlyToday}
                    onChange={(e) => setShowOnlyToday(e.target.checked)}
                  />{" "}
                  Show Only Today
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={disableAnimations}
                    onChange={(e) => setDisableAnimations(e.target.checked)}
                  />{" "}
                  Disable Animation
                </label>
              </div>
            </div>
          )}

          {/* LANGUAGE TAB */}
          {activeTab === "language" && (
            <div>
              <div style={styles.field}>
                <label>Language:</label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  style={styles.input}
                >
                  <option value="en">English</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                </select>
              </div>

              <div style={styles.field}>
                <label style={{ fontWeight: "bold" }}>App Labels</label>
                <p>
                  These labels will be displayed in the app. You can choose to
                  override them if the default translation shown below does not
                  fit your needs.
                </p>
              </div>

              {/* Day Labels */}
              <div style={styles.field}>
                <label>Monday:</label>
                <input
                  type="text"
                  value={appLabels.monday}
                  onChange={(e) =>
                    setAppLabels({ ...appLabels, monday: e.target.value })
                  }
                  style={styles.input}
                />
              </div>
              <div style={styles.field}>
                <label>Tuesday:</label>
                <input
                  type="text"
                  value={appLabels.tuesday}
                  onChange={(e) =>
                    setAppLabels({ ...appLabels, tuesday: e.target.value })
                  }
                  style={styles.input}
                />
              </div>
              <div style={styles.field}>
                <label>Wednesday:</label>
                <input
                  type="text"
                  value={appLabels.wednesday}
                  onChange={(e) =>
                    setAppLabels({ ...appLabels, wednesday: e.target.value })
                  }
                  style={styles.input}
                />
              </div>
              <div style={styles.field}>
                <label>Thursday:</label>
                <input
                  type="text"
                  value={appLabels.thursday}
                  onChange={(e) =>
                    setAppLabels({ ...appLabels, thursday: e.target.value })
                  }
                  style={styles.input}
                />
              </div>
              <div style={styles.field}>
                <label>Friday:</label>
                <input
                  type="text"
                  value={appLabels.friday}
                  onChange={(e) =>
                    setAppLabels({ ...appLabels, friday: e.target.value })
                  }
                  style={styles.input}
                />
              </div>
              <div style={styles.field}>
                <label>Saturday:</label>
                <input
                  type="text"
                  value={appLabels.saturday}
                  onChange={(e) =>
                    setAppLabels({ ...appLabels, saturday: e.target.value })
                  }
                  style={styles.input}
                />
              </div>
              <div style={styles.field}>
                <label>Sunday:</label>
                <input
                  type="text"
                  value={appLabels.sunday}
                  onChange={(e) =>
                    setAppLabels({ ...appLabels, sunday: e.target.value })
                  }
                  style={styles.input}
                />
              </div>

              {/* Extra Messages */}
              <div style={styles.field}>
                <label>No Data Available:</label>
                <input
                  type="text"
                  value={appLabels.noData}
                  onChange={(e) =>
                    setAppLabels({ ...appLabels, noData: e.target.value })
                  }
                  style={styles.input}
                />
              </div>
              <div style={styles.field}>
                <label>Check internet connection/Data Feed:</label>
                <input
                  type="text"
                  value={appLabels.checkConnection}
                  onChange={(e) =>
                    setAppLabels({
                      ...appLabels,
                      checkConnection: e.target.value
                    })
                  }
                  style={styles.input}
                />
              </div>
              <div style={styles.field}>
                <label>No Cards to Display:</label>
                <input
                  type="text"
                  value={appLabels.noCards}
                  onChange={(e) =>
                    setAppLabels({ ...appLabels, noCards: e.target.value })
                  }
                  style={styles.input}
                />
              </div>
            </div>
          )}
        </div>

        <div style={styles.fixedButtons}>
          <button onClick={handleSave} style={styles.saveBtn}>
            Save
          </button>
          <button
            onClick={() => setShowPopup(true)}
            style={styles.previewBtn}
          >
            Preview
          </button>
        </div>

        {showPopup && (
          <CafeTeriaFormPopUp
            image={customBgImage ? URL.createObjectURL(customBgImage) : card.imageSrc}
            duration={duration ? parseInt(duration) : 5}
            onClose={() => setShowPopup(false)}
            itemsFontColor={itemsFontColor}
            mealFontColor={mealFontColor}
            highlightColor={highlightColor}
            cardBgColor={cardBgColor}
            customBgColor={customBgColor}
            textFont={textFont}
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
  tabs: { display: "flex", gap: "10px", marginBottom: "15px" },
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
  tabContent: { flex: 1, overflowY: "auto" },
  field: { display: "flex", flexDirection: "column", marginBottom: "10px" },
  input: { padding: "5px", borderRadius: "4px", border: "1px solid #ccc" },
  checkboxGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "5px",
    marginTop: "10px"
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

export default CafeTeriaForm;