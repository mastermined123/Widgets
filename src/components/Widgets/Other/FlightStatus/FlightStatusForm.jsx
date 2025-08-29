/* eslint-disable no-unused-vars */
// FlightStatusForm.jsx
import React, { useState } from "react";
import FlightStatusPopUp from "./FlightStatusPopup";

const FlightStatusForm = ({ card }) => {
  console.log('card', card);
  const [activeTab, setActiveTab] = useState("settings");
  const [tags, setTags] = useState([]);
  const [appName, setAppName] = useState("");
  const [dataFeed, setDataFeed] = useState("");
  const [airportCode, setAirportCode] = useState("");
  const [airlineCode, setAirlineCode] = useState("");
  const [displayType, setDisplayType] = useState("departures");
  const [flightsPerScreen, setFlightsPerScreen] = useState(8);
  const [duration, setDuration] = useState("");
  const [textFont, setTextFont] = useState("Arial");
  const [titleColor, setTitleColor] = useState("#000000");
  const [textColor, setTextColor] = useState("#000000");
  const [textShadow, setTextShadow] = useState(false);
  const [customBgColor, setCustomBgColor] = useState("#ffffff");
  const [customBgImage, setCustomBgImage] = useState(null);
  const [transitionAnimation, setTransitionAnimation] = useState(true);
  
  const [language, setLanguage] = useState("en");
  const [appLabels, setAppLabels] = useState({
    arrivals: "",
    departures: "",
    scheduled: "",
    flight: "",
    origin: "",
    destination: "",
    estimated: "",
    status: "",
    arrived: "",
    delayed: "",
    cancelled: "",
    landed: "",
    enRoute: "",
    taxiing: "",
    unknown: "",
    noFlights: "",
    noCurrentFlights: ""
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
      airportCode,
      airlineCode,
      displayType,
      flightsPerScreen,
      duration,
      textFont,
      titleColor,
      textColor,
      textShadow,
      customBgColor,
      customBgImage,
      transitionAnimation,
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
        {card.imageSrc && <img src={card.imageSrc} alt={card.title} style={styles.image} />}
        <p>This app will display flight status information for the selected airport.</p>
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
                <label>Airport code:</label>
                <select
                  value={airportCode}
                  onChange={e => setAirportCode(e.target.value)}
                  style={styles.input}
                >
                  <option value="">Select airport code</option>
                  <option value="SFO">SFO - San Francisco</option>
                  <option value="LAX">LAX - Los Angeles</option>
                  <option value="JFK">JFK - New York</option>
                  <option value="CDG">CDG - Paris</option>
                  <option value="LHR">LHR - London</option>
                  <option value="DXB">DXB - Dubai</option>
                  <option value="SIN">SIN - Singapore</option>
                  <option value="SYD">SYD - Sydney</option>
                </select>
                <p style={styles.description}>
                  Enter the three-letter IATA code for the target airport. Ex: SFO, LAX, JFK, CDG.
                  <br />
                  Find airport code at <a href="http://www.iata.org/publications/Pages/code-search.aspx" target="_blank" rel="noopener noreferrer">http://www.iata.org/publications/Pages/code-search.aspx</a>
                </p>
              </div>

              <div style={styles.field}>
                <label>Airline code (optional):</label>
                <input
                  type="text"
                  value={airlineCode}
                  onChange={e => setAirlineCode(e.target.value)}
                  placeholder="e.g., UAL, AAL, DAL"
                  style={styles.input}
                  maxLength={3}
                />
                <p style={styles.description}>
                  Enter the three-letter code for the airline.
                </p>
              </div>

              <div style={styles.field}>
                <label>Display:</label>
                <select
                  value={displayType}
                  onChange={e => setDisplayType(e.target.value)}
                  style={styles.input}
                >
                  <option value="departures">Departures</option>
                  <option value="arrivals">Arrivals</option>
                </select>
              </div>

              <div style={styles.field}>
                <label>Number of flights per screen:</label>
                <input
                  type="number"
                  value={flightsPerScreen}
                  onChange={e => setFlightsPerScreen(parseInt(e.target.value))}
                  min={5}
                  max={12}
                  style={styles.input}
                />
                <p style={styles.description}>
                  Present 5 to 12 flights per screen.
                </p>
              </div>

              <div style={styles.field}>
                <label>Show each page for (seconds):</label>
                <input
                  type="number"
                  value={duration}
                  onChange={e => setDuration(e.target.value)}
                  style={styles.input}
                  placeholder="Seconds"
                />
              </div>

              <div style={styles.field}>
                <label>Text font (optional):</label>
                <select
                  value={textFont}
                  onChange={e => setTextFont(e.target.value)}
                  style={styles.input}
                >
                  <option value="Arial">Arial</option>
                  <option value="Courier New">Courier New</option>
                  <option value="Georgia">Georgia</option>
                  <option value="Times New Roman">Times New Roman</option>
                  <option value="Verdana">Verdana</option>
                </select>
                <p style={styles.description}>
                  Change the font used to show the text
                </p>
              </div>

              <div style={styles.field}>
                <label>Title color (optional):</label>
                <input
                  type="color"
                  value={titleColor}
                  onChange={e => setTitleColor(e.target.value)}
                />
              </div>

              <div style={styles.field}>
                <label>Text color (optional):</label>
                <input
                  type="color"
                  value={textColor}
                  onChange={e => setTextColor(e.target.value)}
                />
              </div>

              <div style={styles.checkboxGroup}>
                <label>
                  <input
                    type="checkbox"
                    checked={textShadow}
                    onChange={e => setTextShadow(e.target.checked)}
                  />{" "}
                  Text shadow
                </label>
              </div>

              <div style={styles.field}>
                <label>Background color (optional):</label>
                <input
                  type="color"
                  value={customBgColor}
                  onChange={e => setCustomBgColor(e.target.value)}
                />
              </div>

              <div style={styles.field}>
                <label>Background image (optional):</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={e => setCustomBgImage(e.target.files[0])}
                />
              </div>

              <div style={styles.checkboxGroup}>
                <label>
                  <input
                    type="checkbox"
                    checked={transitionAnimation}
                    onChange={e => setTransitionAnimation(e.target.checked)}
                  />{" "}
                  Transition animation
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
                  <option value="en">English</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                  <option value="de">German</option>
                  <option value="ja">Japanese</option>
                </select>
                <p style={styles.description}>
                  Changing the language will affect any text displayed on the app as well as how dates and numbers are formatted.
                </p>
              </div>

              <div style={styles.field}>
                <label style={{ fontWeight: "bold" }}>App Labels</label>
                <p>
                  These labels will be displayed in the app. You can choose to override them if the default translation shown below does not fit your needs.
                </p>
              </div>

              {[
                { key: "arrivals", label: "Arrivals", placeholder: "Arrivals" },
                { key: "departures", label: "Departures", placeholder: "Departures" },
                { key: "scheduled", label: "Scheduled", placeholder: "Scheduled" },
                { key: "flight", label: "Flight", placeholder: "Flight" },
                { key: "origin", label: "Origin", placeholder: "Origin" },
                { key: "destination", label: "Destination", placeholder: "Destination" },
                { key: "estimated", label: "Estimated", placeholder: "Estimated" },
                { key: "status", label: "Status", placeholder: "Status" },
                { key: "arrived", label: "Arrived", placeholder: "Arrived" },
                { key: "delayed", label: "Delayed", placeholder: "Delayed" },
                { key: "cancelled", label: "Cancelled", placeholder: "Cancelled" },
                { key: "landed", label: "Landed", placeholder: "Landed" },
                { key: "enRoute", label: "En Route", placeholder: "En Route" },
                { key: "taxiing", label: "Taxiing", placeholder: "Taxiing" },
                { key: "unknown", label: "Unknown", placeholder: "Unknown" },
                { key: "noFlights", label: "There are no flights for this airport code", placeholder: "There are no flights for this airport code" },
                { key: "noCurrentFlights", label: "There are no current flights for this airport code", placeholder: "There are no current flights for this airport code" }
              ].map((item) => (
                <div key={item.key} style={styles.field}>
                  <label>{item.label}:</label>
                  <input
                    type="text"
                    value={appLabels[item.key]}
                    onChange={e => setAppLabels({...appLabels, [item.key]: e.target.value})}
                    placeholder={item.placeholder}
                    style={styles.input}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={styles.fixedButtons}>
          <button onClick={handleSave} style={styles.saveBtn}>Save</button>
          <button onClick={() => setShowPopup(true)} style={styles.previewBtn}>Preview</button>
        </div>

        {showPopup && (
          <FlightStatusPopUp
            image={customBgImage ? URL.createObjectURL(customBgImage) : card.imageSrc}
            duration={duration ? parseInt(duration) : 5}
            onClose={() => setShowPopup(false)}
            airportCode={airportCode}
            displayType={displayType}
            textFont={textFont}
            titleColor={titleColor}
            textColor={textColor}
            textShadow={textShadow}
            customBgColor={customBgColor}
            transitionAnimation={transitionAnimation}
            appLabels={appLabels}
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
  checkboxGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "5px",
    marginTop: "10px",
    marginBottom: "10px"
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
    color: "white",
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

export default FlightStatusForm;