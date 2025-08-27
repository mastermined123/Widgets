/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import CalendarAppPopUp from "./CalendarAppPopUp";

const CalendarAppForm = ({ card }) => {
  const [activeTab, setActiveTab] = useState("settings");

  // Settings tab fields
  const [appName, setAppName] = useState("");
  const [tags, setTags] = useState([]);
  const [title, setTitle] = useState("");
  const [calendarUrl, setCalendarUrl] = useState("");

  const [showPastEvents, setShowPastEvents] = useState(false);
  const [showPresentEvents, setShowPresentEvents] = useState(false);
  const [showTime, setShowTime] = useState(false);

  const [numEvents, setNumEvents] = useState("");
  const [syncFrequency, setSyncFrequency] = useState("");
  const [cyclingInterval, setCyclingInterval] = useState("");
  const [calendarTimeout, setCalendarTimeout] = useState("");

  const [textFont, setTextFont] = useState("Arial");
  const [textShadow, setTextShadow] = useState(false);
  const [showIcon, setShowIcon] = useState(false);

  const [bgColor, setBgColor] = useState("#ffffff");
  const [textColor, setTextColor] = useState("#000000");
  const [bgImage, setBgImage] = useState(null);

  const [entranceAnimation, setEntranceAnimation] = useState(false);
  const [animateBgImage, setAnimateBgImage] = useState(false);

  // Language tab fields
  const [appLabels, setAppLabels] = useState({
    thisWeek: "",
    nextWeek: "",
    thisMonth: "",
    nextMonth: "",
    today: "",
    tomorrow: "",
    allDay: "",
    ending: "",
    noEvents: "",
    unableToFetch: "",
    invalidLink: "",
    allDayAlt: "",
    starting: "",
  });

  // Tags state
  const [dataFeed, setDataFeed] = useState("");

  // Popup
  const [showPopup, setShowPopup] = useState(false);

  // Tag handling
  const addTag = () => {
    if (dataFeed.trim()) {
      setTags([...tags, dataFeed.trim()]);
      setDataFeed("");
    }
  };
  const removeTag = (index) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    console.log({
      appName,
      tags,
      title,
      calendarUrl,
      showPastEvents,
      showPresentEvents,
      showTime,
      numEvents,
      syncFrequency,
      cyclingInterval,
      calendarTimeout,
      textFont,
      textShadow,
      showIcon,
      bgColor,
      textColor,
      bgImage,
      entranceAnimation,
      animateBgImage,
      appLabels,
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
        <p>This app will show events from your calendar using iCal feed.</p>
      </div>

      {/* Right Portion */}
      <div style={styles.right}>
        {/* Tabs */}
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
          {/* Settings Tab */}
          {activeTab === "settings" && (
            <div>
              {/* App Name */}
              <div style={styles.field}>
                <label>App Name:</label>
                <input
                  type="text"
                  value={appName}
                  onChange={(e) => setAppName(e.target.value)}
                  style={styles.input}
                />
              </div>

              {/* Tags */}
              <div style={styles.field}>
                <label>Tags (optional):</label>
                <div style={{ display: "flex", gap: "5px", flexWrap: "wrap" }}>
                  {tags.map((tag, i) => (
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

              {/* Title */}
              <div style={styles.field}>
                <label>Title:</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  style={styles.input}
                />
              </div>

              {/* Calendar URL */}
              <div style={styles.field}>
                <label>Calendar URL (iCal):</label>
                <input
                  type="text"
                  value={calendarUrl}
                  onChange={(e) => setCalendarUrl(e.target.value)}
                  style={styles.input}
                />
                <small>
                  Go to your Google Calendar and click on the three dots on the
                  right of the selected calendar ▶ Click on "Settings and
                  Share". ▶ Search public address in "ICAL format" ▶ Enter here
                  the URL address provided on the pop-up window.
                </small>
              </div>

              {/* Display calendar events for */}
              <div style={styles.checkboxGroup}>
                <label>
                  <input
                    type="checkbox"
                    checked={showPastEvents}
                    onChange={(e) => setShowPastEvents(e.target.checked)}
                  />
                  Show past events
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={showPresentEvents}
                    onChange={(e) => setShowPresentEvents(e.target.checked)}
                  />
                  Present events broken down in smaller periods
                </label>
                <small>
                  If configured for week view, it will show information
                  aggregated for each day of the week. If configured to month
                  view, it will show information aggregated for each week of the
                  month.
                </small>
              </div>

              {/* Show time */}
              <div style={styles.checkboxGroup}>
                <label>
                  <input
                    type="checkbox"
                    checked={showTime}
                    onChange={(e) => setShowTime(e.target.checked)}
                  />
                  Show time
                </label>
                <small>
                  Show up to 10 events in case “Show time” is enabled, or up to
                  16 in case “Show time” is disabled.
                </small>
              </div>

              {/* Numeric fields */}
              <div style={styles.field}>
                <label>Number of events to be shown:</label>
                <input
                  type="number"
                  value={numEvents}
                  onChange={(e) => setNumEvents(e.target.value)}
                  style={styles.input}
                />
              </div>
              <div style={styles.field}>
                <label>Calendar sync frequency:</label>
                <input
                  type="text"
                  value={syncFrequency}
                  onChange={(e) => setSyncFrequency(e.target.value)}
                  style={styles.input}
                />
              </div>
              <div style={styles.field}>
                <label>Cycling time interval:</label>
                <input
                  type="text"
                  value={cyclingInterval}
                  onChange={(e) => setCyclingInterval(e.target.value)}
                  style={styles.input}
                />
              </div>
              <div style={styles.field}>
                <label>Calendar timeout:</label>
                <input
                  type="text"
                  value={calendarTimeout}
                  onChange={(e) => setCalendarTimeout(e.target.value)}
                  style={styles.input}
                />
              </div>

              {/* Font */}
              <div style={styles.field}>
                <label>Text Font (optional):</label>
                <select
                  value={textFont}
                  onChange={(e) => setTextFont(e.target.value)}
                  style={styles.input}
                >
                  <option value="Arial">Arial</option>
                  <option value="Helvetica">Helvetica</option>
                  <option value="Times New Roman">Times New Roman</option>
                </select>
              </div>

              {/* Font checkboxes */}
              <div style={styles.checkboxGroup}>
                <label>
                  <input
                    type="checkbox"
                    checked={textShadow}
                    onChange={(e) => setTextShadow(e.target.checked)}
                  />
                  Text shadow
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={showIcon}
                    onChange={(e) => setShowIcon(e.target.checked)}
                  />
                  Show icon
                </label>
              </div>

              {/* Colors */}
              <div style={styles.field}>
                <label>Background Color (optional):</label>
                <input
                  type="color"
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                />
              </div>
              <div style={styles.field}>
                <label>Text Color (optional):</label>
                <input
                  type="color"
                  value={textColor}
                  onChange={(e) => setTextColor(e.target.value)}
                />
              </div>

              {/* Background image */}
              <div style={styles.field}>
                <label>Background Image (optional):</label>
                <input
                  type="file"
                  onChange={(e) => setBgImage(e.target.files[0])}
                />
              </div>

              {/* Animation checkboxes */}
              <div style={styles.checkboxGroup}>
                <label>
                  <input
                    type="checkbox"
                    checked={entranceAnimation}
                    onChange={(e) => setEntranceAnimation(e.target.checked)}
                  />
                  Entrance animation
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={animateBgImage}
                    onChange={(e) => setAnimateBgImage(e.target.checked)}
                  />
                  Animate background image
                </label>
              </div>
            </div>
          )}

          {/* Language Tab */}
          {activeTab === "language" && (
            <div>
              {Object.keys(appLabels).map((key) => (
                <div style={styles.field} key={key}>
                  <label>{key.replace(/([A-Z])/g, " $1")}:</label>
                  <input
                    type="text"
                    value={appLabels[key]}
                    onChange={(e) =>
                      setAppLabels({ ...appLabels, [key]: e.target.value })
                    }
                    style={styles.input}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Action Buttons */}
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

        {/* Popup */}
        {showPopup && (
          <CalendarAppPopUp
            image={bgImage ? URL.createObjectURL(bgImage) : card.imageSrc}
            duration={5}
            onClose={() => setShowPopup(false)}
          />
        )}
      </div>
    </div>
  );
};

// Styles
const styles = {
  container: {
    display: "flex",
    width: "96%",
    border: "1px solid #ddd",
    borderRadius: "8px",
    overflow: "hidden",
    marginTop: "1px",
    position: "relative",
  },
  left: {
    flex: 0.35,
    borderRight: "3px solid #ddd",
    backgroundColor: "#f5f5f5",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "10px",
    overflowY: "auto",
  },
  right: {
    flex: 0.65,
    padding: "15px",
    display: "flex",
    flexDirection: "column",
    position: "relative",
  },
  image: {
    width: "100%",
    height: "200px",
    objectFit: "cover",
    borderRadius: "8px",
    marginBottom: "10px",
  },
  tabs: { display: "flex", gap: "10px", marginBottom: "15px" },
  tab: {
    padding: "5px 15px",
    cursor: "pointer",
    backgroundColor: "#eee",
    border: "none",
    borderRadius: "4px",
  },
  activeTab: {
    padding: "5px 15px",
    cursor: "pointer",
    backgroundColor: "#005481",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
  },
  tabContent: { flex: 1, overflowY: "auto" },
  field: { display: "flex", flexDirection: "column", marginBottom: "10px" },
  input: { padding: "5px", borderRadius: "4px", border: "1px solid #ccc" },
  checkboxGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "5px",
    marginBottom: "10px",
  },
  fixedButtons: {
    position: "absolute",
    bottom: "10px",
    right: "10px",
    display: "flex",
    gap: "10px",
  },
  saveBtn: {
    padding: "8px 12px",
    backgroundColor: "#005481",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  previewBtn: {
    padding: "8px 12px",
    backgroundColor: "#888",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  tag: {
    padding: "2px 5px",
    backgroundColor: "#ccc",
    borderRadius: "4px",
    display: "flex",
    alignItems: "center",
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
  },
};

export default CalendarAppForm;
