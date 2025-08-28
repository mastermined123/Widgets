/* eslint-disable no-unused-vars */
// TwitterForm.jsx
import React, { useState } from "react";
import TwitterFormPopUp from "./TwitterFormPopUp";

const TwitterForm = ({ card }) => {
  const [activeTab, setActiveTab] = useState("settings");
  const [appName, setAppName] = useState("");
  const [searchBy, setSearchBy] = useState("");
  const [description, setDescription] = useState(
    "A Twitter user such as @username, or a hashtag such as #digitalsignage"
  );
  const [removeUrls, setRemoveUrls] = useState(false);
  const [noMentions, setNoMentions] = useState(false);
  const [noReplies, setNoReplies] = useState(false);
  const [noRetweets, setNoRetweets] = useState(false);
  const [noRetweetsWithComment, setNoRetweetsWithComment] = useState(false);
  const [numPosts, setNumPosts] = useState("");
  const [duration, setDuration] = useState("");
  const [textFont, setTextFont] = useState("");
  const [fontColor, setFontColor] = useState("");
  const [statusColor, setStatusColor] = useState("");
  const [introLogoColor, setIntroLogoColor] = useState("");
  const [customBgColor, setCustomBgColor] = useState("");
  const [customBgImage, setCustomBgImage] = useState(null);
  const [disableAnimations, setDisableAnimations] = useState(false);
const [tags, setTags] = useState([]);
const [searchByTag, setSearchByTag] = useState(""); // for tag input
const [searchByUser, setSearchByUser] = useState(""); // for single username input

  const [language, setLanguage] = useState("en");
  const [appLabels, setAppLabels] = useState({
    noDataAvailable: "",
    checkInternet: ""
  });

  const [showPopup, setShowPopup] = useState(false);


  const removeTag = (index) => {
    const newTags = tags.filter((_, i) => i !== index);
    setTags(newTags);
  };

  const addTag = () => {
  if (searchByTag.trim()) {
    setTags([...tags, searchByTag.trim()]);
    setSearchByTag("");
  }
};


  const handleSave = () => {
    console.log({
      appName,
      tags,
      removeUrls,
      noMentions,
      noReplies,
      noRetweets,
      noRetweetsWithComment,
      numPosts,
      duration,
      textFont,
      fontColor,
      statusColor,
      introLogoColor,
      customBgColor,
      customBgImage,
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
        <label style={{ ...styles.field, fontWeight: "bold" }}>{card.title}</label>
        {card.imageSrc && (
          <img src={card.imageSrc} alt={card.title} style={styles.image} />
        )}
        <p>This app will display Twitter posts based on your filtering options.</p>
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
                  onChange={(e) => setAppName(e.target.value)}
                  style={styles.input}
                />
              </div>

{/* Tags (multiple) */}
<div style={styles.field}>
  <label>Tags (optional):</label>
  <div style={{ display: "flex", gap: "5px", flexWrap: "wrap" }}>
    {tags.map((tag, i) => (
      <span key={i} style={styles.tag}>
        {tag}{" "}
        <button onClick={() => removeTag(i)} style={styles.removeTag}>
          x
        </button>
      </span>
    ))}
    <input
      type="text"
      value={searchByTag}
      onChange={(e) => setSearchByTag(e.target.value)}
      placeholder="Enter hashtag"
      style={{ ...styles.input, flex: "1" }}
      onKeyDown={(e) =>
        e.key === "Enter" && (e.preventDefault(), addTag())
      }
    />
  </div>
</div>

{/* Search by (single) */}
<div style={styles.field}>
  <label>Search by (username):</label>
  <input
    type="text"
    value={searchByUser}
    onChange={(e) => setSearchByUser(e.target.value)}
    placeholder="@username"
    style={styles.input}
  />
  <p style={{ fontSize: "12px", marginTop: "2px" }}>
    Enter a Twitter user to display their posts
  </p>
</div>


              <div style={styles.checkboxGroup}>
                <label>
                  <input
                    type="checkbox"
                    checked={removeUrls}
                    onChange={(e) => setRemoveUrls(e.target.checked)}
                  />{" "}
                  Remove URL links
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={noMentions}
                    onChange={(e) => setNoMentions(e.target.checked)}
                  />{" "}
                  Do not show tweets with mentions
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={noReplies}
                    onChange={(e) => setNoReplies(e.target.checked)}
                  />{" "}
                  Do not show replies
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={noRetweets}
                    onChange={(e) => setNoRetweets(e.target.checked)}
                  />{" "}
                  Do not show retweets
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={noRetweetsWithComment}
                    onChange={(e) => setNoRetweetsWithComment(e.target.checked)}
                  />{" "}
                  Do not show retweets with comment
                </label>
              </div>

              <div style={styles.field}>
                <label>Number of posts (optional):</label>
                <input
                  type="number"
                  value={numPosts}
                  onChange={(e) => setNumPosts(e.target.value)}
                  style={styles.input}
                />
              </div>

              <div style={styles.field}>
                <label>Show each post for this many seconds (optional):</label>
                <input
                  type="number"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  style={styles.input}
                />
              </div>

              <div style={styles.field}>
                <label>Text Font (optional):</label>
                <input
                  type="text"
                  value={textFont}
                  onChange={(e) => setTextFont(e.target.value)}
                  style={styles.input}
                />
              </div>

              <div style={styles.field}>
                <label>Font Color (optional):</label>
                <input
                  type="color"
                  value={fontColor}
                  onChange={(e) => setFontColor(e.target.value)}
                />
              </div>

              <div style={styles.field}>
                <label>Status Color (optional):</label>
                <input
                  type="color"
                  value={statusColor}
                  onChange={(e) => setStatusColor(e.target.value)}
                />
              </div>

              <div style={styles.field}>
                <label>Intro Logo Color (optional):</label>
                <input
                  type="color"
                  value={introLogoColor}
                  onChange={(e) => setIntroLogoColor(e.target.value)}
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
                  onChange={(e) => setCustomBgImage(e.target.files[0])}
                />
              </div>

              <div style={styles.checkboxGroup}>
                <label>
                  <input
                    type="checkbox"
                    checked={disableAnimations}
                    onChange={(e) => setDisableAnimations(e.target.checked)}
                  />{" "}
                  Disable animations
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
                  onChange={(e) => setLanguage(e.target.value)}
                  style={styles.input}
                >
                  <option value="en">English</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                </select>
              </div>

              <div style={styles.field}>
                <label>App Labels:</label>
                <p style={{ fontSize: "12px" }}>
                  These labels will be displayed in the app. You can choose to
                  override them if the default translation shown below does not
                  fit your needs.
                </p>
              </div>

              <div style={styles.field}>
                <label>No Data Available:</label>
                <input
                  type="text"
                  value={appLabels.noDataAvailable}
                  onChange={(e) =>
                    setAppLabels({ ...appLabels, noDataAvailable: e.target.value })
                  }
                  style={styles.input}
                />
              </div>

              <div style={styles.field}>
                <label>Check internet connection or the User/Hashtag:</label>
                <input
                  type="text"
                  value={appLabels.checkInternet}
                  onChange={(e) =>
                    setAppLabels({ ...appLabels, checkInternet: e.target.value })
                  }
                  style={styles.input}
                />
              </div>
            </div>
          )}
        </div>

        {/* Fixed Buttons */}
        <div style={styles.fixedButtons}>
          <button onClick={handleSave} style={styles.saveBtn}>
            Save
          </button>
          <button onClick={() => setShowPopup(true)} style={styles.previewBtn}>
            Preview
          </button>
        </div>

        {/* Popup Preview */}
        {showPopup && (
          <TwitterFormPopUp
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
  checkboxGroup: { display: "flex", flexDirection: "column", gap: "5px", marginTop: "10px" },
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

export default TwitterForm;
