/* eslint-disable no-unused-vars */
// FlightStatusForm.jsx
import React, { useState } from "react";
import AirPortFlightStatusPopUp from "./AirPortFlightStatusPopup";

const AirPortFlightStatusForm = ({ card }) => {
  console.log('card', card);
  const [activeTab, setActiveTab] = useState("settings");
  const [tags, setTags] = useState([]);
  const [appName, setAppName] = useState("");
  const [dataFeed, setDataFeed] = useState("");
  const [airportCode, setAirportCode] = useState("");
  const [displayType, setDisplayType] = useState("Departure");
  const [flightsDisplayOffset, setFlightsDisplayOffset] = useState("");
  const [showEachPage, setShowEachPage] = useState("");
  const [showEachCodeShare, setShowEachCodeShare] = useState("");
  const [showFixedFlightsPage, setShowFixedFlightsPage] = useState("");
  const [englishLanguageEnabled, setEnglishLanguageEnabled] = useState(false);
  const [alternateLanguageEach, setAlternateLanguageEach] = useState("");
  const [timeFormat, setTimeFormat] = useState("AM/PM");
  
  // Collapsible sections
  const [openSections, setOpenSections] = useState({
    appHeader: false,
    appBackground: false,
    flightHeader: false,
    flightRow: false
  });
  
  // App Header Appearance
  const [headerFontFamily, setHeaderFontFamily] = useState("Arial");
  const [headerFontSize, setHeaderFontSize] = useState("");
  const [headerTextColor, setHeaderTextColor] = useState("#000000");
  const [headerBackgroundColor, setHeaderBackgroundColor] = useState("");
  
  // App Background Appearance
  const [appBackgroundColor, setAppBackgroundColor] = useState("#ffffff");
  const [appBackgroundImage, setAppBackgroundImage] = useState(null);
  const [loadingIndicatorColor, setLoadingIndicatorColor] = useState("#000000");
  
  // Flight Header Appearance
  const [subtitleFontFamily, setSubtitleFontFamily] = useState("Arial");
  const [subtitleFontSize, setSubtitleFontSize] = useState("");
  const [subtitlesTextColor, setSubtitlesTextColor] = useState("#000000");
  const [subtitlesBackgroundColor, setSubtitlesBackgroundColor] = useState("");
  
  // Flight Row Appearance
  const [flightFontFamily, setFlightFontFamily] = useState("Arial");
  const [flightFontSize, setFlightFontSize] = useState("");
  const [flightTextFontColor, setFlightTextFontColor] = useState("#000000");
  const [flightsRowBackgroundColor1, setFlightsRowBackgroundColor1] = useState("");
  const [flightsRowBackgroundColor2, setFlightsRowBackgroundColor2] = useState("");
  const [terminalTextAndBorderColor, setTerminalTextAndBorderColor] = useState("#000000");
  const [terminalBackgroundColor, setTerminalBackgroundColor] = useState("");
  const [disableStatusBoxesColors, setDisableStatusBoxesColors] = useState(false);
  
  // Language Tab
  const [language, setLanguage] = useState("English");
  const [appLabels, setAppLabels] = useState({
    Time: "",
    Destination: "",
    Airline: "",
    Flight: "",
    CodeShare: "",
    Terminal: "",
    Gate: "",
    Status: "",
    Departures: "",
    Arrivals: "",
    Date: "",
    Arrived: "",
    Delayed: "",
    Cancelled: "",
    Landed: "",
    EnRoute: "",
    Scheduled: "",
    Taxiing: "",
    Unknown: "",
    NoFlightsAvailable: ""
  });

  const [showPopup, setShowPopup] = useState(false);

  const toggleSection = (section) => {
    setOpenSections({
      ...openSections,
      [section]: !openSections[section]
    });
  };

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
      appName,
      tags,
      airportCode,
      displayType,
      flightsDisplayOffset,
      showEachPage,
      showEachCodeShare,
      showFixedFlightsPage,
      englishLanguageEnabled,
      alternateLanguageEach,
      timeFormat,
      // App Header Appearance
      headerFontFamily,
      headerFontSize,
      headerTextColor,
      headerBackgroundColor,
      // App Background Appearance
      appBackgroundColor,
      appBackgroundImage,
      loadingIndicatorColor,
      // Flight Header Appearance
      subtitleFontFamily,
      subtitleFontSize,
      subtitlesTextColor,
      subtitlesBackgroundColor,
      // Flight Row Appearance
      flightFontFamily,
      flightFontSize,
      flightTextFontColor,
      flightsRowBackgroundColor1,
      flightsRowBackgroundColor2,
      terminalTextAndBorderColor,
      terminalBackgroundColor,
      disableStatusBoxesColors,
      // Language
      language,
      appLabels
    };
    console.log(data);
    alert("Saved! Check console.");
  };

  const handleAppLabelChange = (key, value) => {
    setAppLabels({
      ...appLabels,
      [key]: value
    });
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
                <label>Airport Code:</label>
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
                <label>Display:</label>
                <select
                  value={displayType}
                  onChange={e => setDisplayType(e.target.value)}
                  style={styles.input}
                >
                  <option value="Departure">Departure</option>
                  <option value="Arrivals">Arrivals</option>
                </select>
              </div>

              <div style={styles.field}>
                <label>Flights display offset (minutes):</label>
                <input
                  type="number"
                  value={flightsDisplayOffset}
                  onChange={e => setFlightsDisplayOffset(e.target.value)}
                  style={styles.input}
                />
                <p style={styles.description}>
                  Show flights within the current time minus the offset
                </p>
              </div>

              <div style={styles.field}>
                <label>Show each page for (seconds) (optional):</label>
                <input
                  type="number"
                  value={showEachPage}
                  onChange={e => setShowEachPage(e.target.value)}
                  style={styles.input}
                />
              </div>

              <div style={styles.field}>
                <label>Show each code share for (seconds):</label>
                <input
                  type="number"
                  value={showEachCodeShare}
                  onChange={e => setShowEachCodeShare(e.target.value)}
                  style={styles.input}
                />
              </div>

              <div style={styles.field}>
                <label>Show fixed flights page (optional):</label>
                <input
                  type="number"
                  value={showFixedFlightsPage}
                  onChange={e => setShowFixedFlightsPage(e.target.value)}
                  style={styles.input}
                />
              </div>

              <div style={styles.checkboxGroup}>
                <label>
                  <input
                    type="checkbox"
                    checked={englishLanguageEnabled}
                    onChange={e => setEnglishLanguageEnabled(e.target.checked)}
                  />{" "}
                  English Language Enabled
                </label>
                <p style={styles.description}>
                  Alternate between main language and English
                </p>
              </div>

              <div style={styles.field}>
                <label>Alternate language each (seconds):</label>
                <input
                  type="number"
                  value={alternateLanguageEach}
                  onChange={e => setAlternateLanguageEach(e.target.value)}
                  style={styles.input}
                />
                <p style={styles.description}>
                  You must specify this option in case of more than one language.
                </p>
              </div>

              <div style={styles.field}>
                <label>Time Format:</label>
                <select
                  value={timeFormat}
                  onChange={e => setTimeFormat(e.target.value)}
                  style={styles.input}
                >
                  <option value="AM/PM">AM/PM</option>
                  <option value="24H">24H</option>
                </select>
              </div>

              {/* Collapsible Sections */}
              <div style={styles.collapsibleSection}>
                <div style={styles.sectionHeader} onClick={() => toggleSection('appHeader')}>
                  <h3>App header Appearance</h3>
                  <span>{openSections.appHeader ? '−' : '+'}</span>
                </div>
                {openSections.appHeader && (
                  <div style={styles.sectionContent}>
                    <div style={styles.field}>
                      <label>Header Font Family:</label>
                      <select
                        value={headerFontFamily}
                        onChange={e => setHeaderFontFamily(e.target.value)}
                        style={styles.input}
                      >
                        <option value="Arial">Arial</option>
                        <option value="Helvetica">Helvetica</option>
                        <option value="Times New Roman">Times New Roman</option>
                        <option value="Courier New">Courier New</option>
                        <option value="Verdana">Verdana</option>
                      </select>
                    </div>
                    <div style={styles.field}>
                      <label>Header Font Size (pts):</label>
                      <input
                        type="number"
                        value={headerFontSize}
                        onChange={e => setHeaderFontSize(e.target.value)}
                        style={styles.input}
                      />
                    </div>
                    <div style={styles.field}>
                      <label>Header Text Color:</label>
                      <input
                        type="color"
                        value={headerTextColor}
                        onChange={e => setHeaderTextColor(e.target.value)}
                      />
                    </div>
                    <div style={styles.field}>
                      <label>Header Background Color (optional):</label>
                      <input
                        type="color"
                        value={headerBackgroundColor}
                        onChange={e => setHeaderBackgroundColor(e.target.value)}
                      />
                    </div>
                  </div>
                )}
              </div>

              <div style={styles.collapsibleSection}>
                <div style={styles.sectionHeader} onClick={() => toggleSection('appBackground')}>
                  <h3>App background Appearance</h3>
                  <span>{openSections.appBackground ? '−' : '+'}</span>
                </div>
                {openSections.appBackground && (
                  <div style={styles.sectionContent}>
                    <div style={styles.field}>
                      <label>App Background Color:</label>
                      <input
                        type="color"
                        value={appBackgroundColor}
                        onChange={e => setAppBackgroundColor(e.target.value)}
                      />
                    </div>
                    <div style={styles.field}>
                      <label>App Background Image (optional):</label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={e => setAppBackgroundImage(e.target.files[0])}
                      />
                    </div>
                    <div style={styles.field}>
                      <label>Loading Indicator Color:</label>
                      <input
                        type="color"
                        value={loadingIndicatorColor}
                        onChange={e => setLoadingIndicatorColor(e.target.value)}
                      />
                    </div>
                  </div>
                )}
              </div>

              <div style={styles.collapsibleSection}>
                <div style={styles.sectionHeader} onClick={() => toggleSection('flightHeader')}>
                  <h3>Flight header Appearance</h3>
                  <span>{openSections.flightHeader ? '−' : '+'}</span>
                </div>
                {openSections.flightHeader && (
                  <div style={styles.sectionContent}>
                    <div style={styles.field}>
                      <label>Subtitle Font Family:</label>
                      <select
                        value={subtitleFontFamily}
                        onChange={e => setSubtitleFontFamily(e.target.value)}
                        style={styles.input}
                      >
                        <option value="Arial">Arial</option>
                        <option value="Helvetica">Helvetica</option>
                        <option value="Times New Roman">Times New Roman</option>
                        <option value="Courier New">Courier New</option>
                        <option value="Verdana">Verdana</option>
                      </select>
                    </div>
                    <div style={styles.field}>
                      <label>Subtitle Font Size (pts):</label>
                      <input
                        type="number"
                        value={subtitleFontSize}
                        onChange={e => setSubtitleFontSize(e.target.value)}
                        style={styles.input}
                      />
                    </div>
                    <div style={styles.field}>
                      <label>Subtitles Text Color:</label>
                      <input
                        type="color"
                        value={subtitlesTextColor}
                        onChange={e => setSubtitlesTextColor(e.target.value)}
                      />
                    </div>
                    <div style={styles.field}>
                      <label>Subtitles Background Color (optional):</label>
                      <input
                        type="color"
                        value={subtitlesBackgroundColor}
                        onChange={e => setSubtitlesBackgroundColor(e.target.value)}
                      />
                    </div>
                  </div>
                )}
              </div>

              <div style={styles.collapsibleSection}>
                <div style={styles.sectionHeader} onClick={() => toggleSection('flightRow')}>
                  <h3>Flight Row Appearance</h3>
                  <span>{openSections.flightRow ? '−' : '+'}</span>
                </div>
                {openSections.flightRow && (
                  <div style={styles.sectionContent}>
                    <div style={styles.field}>
                      <label>Flight Font Family:</label>
                      <select
                        value={flightFontFamily}
                        onChange={e => setFlightFontFamily(e.target.value)}
                        style={styles.input}
                      >
                        <option value="Arial">Arial</option>
                        <option value="Helvetica">Helvetica</option>
                        <option value="Times New Roman">Times New Roman</option>
                        <option value="Courier New">Courier New</option>
                        <option value="Verdana">Verdana</option>
                      </select>
                    </div>
                    <div style={styles.field}>
                      <label>Flight Font Size (pts):</label>
                      <input
                        type="number"
                        value={flightFontSize}
                        onChange={e => setFlightFontSize(e.target.value)}
                        style={styles.input}
                      />
                    </div>
                    <div style={styles.field}>
                      <label>Flight Text Font Color:</label>
                      <input
                        type="color"
                        value={flightTextFontColor}
                        onChange={e => setFlightTextFontColor(e.target.value)}
                      />
                    </div>
                    <div style={styles.field}>
                      <label>Flights Row Background Color 1 (optional):</label>
                      <input
                        type="color"
                        value={flightsRowBackgroundColor1}
                        onChange={e => setFlightsRowBackgroundColor1(e.target.value)}
                      />
                    </div>
                    <div style={styles.field}>
                      <label>Flights Row Background Color 2 (optional):</label>
                      <input
                        type="color"
                        value={flightsRowBackgroundColor2}
                        onChange={e => setFlightsRowBackgroundColor2(e.target.value)}
                      />
                    </div>
                    <div style={styles.field}>
                      <label>Terminal Text and Border Color:</label>
                      <input
                        type="color"
                        value={terminalTextAndBorderColor}
                        onChange={e => setTerminalTextAndBorderColor(e.target.value)}
                      />
                    </div>
                    <div style={styles.field}>
                      <label>Terminal Background Color (optional):</label>
                      <input
                        type="color"
                        value={terminalBackgroundColor}
                        onChange={e => setTerminalBackgroundColor(e.target.value)}
                      />
                    </div>
                    <div style={styles.checkboxGroup}>
                      <label>
                        <input
                          type="checkbox"
                          checked={disableStatusBoxesColors}
                          onChange={e => setDisableStatusBoxesColors(e.target.checked)}
                        />{" "}
                        Disable Status Boxes Colors
                      </label>
                      <p style={styles.description}>
                        Select to deactivate status boxes color.
                      </p>
                    </div>
                  </div>
                )}
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
                  <option value="English">English</option>
                  <option value="Spanish">Spanish</option>
                  <option value="French">French</option>
                  <option value="German">German</option>
                  <option value="Japanese">Japanese</option>
                </select>
              </div>

              <div style={styles.field}>
                <label style={{ fontWeight: "bold" }}>App Labels</label>
                <p style={styles.description}>
                  These labels will be displayed in the app. You can choose to override them if the default translation shown below does not fit your needs.
                </p>
              </div>

              {[
                "Time", "Destination", "Airline", "Flight", "CodeShare", 
                "Terminal", "Gate", "Status", "Departures", "Arrivals", 
                "Date", "Arrived", "Delayed", "Cancelled", "Landed", 
                "EnRoute", "Scheduled", "Taxiing", "Unknown", "NoFlightsAvailable"
              ].map((label) => (
                <div key={label} style={styles.field}>
                  <label>{label}:</label>
                  <input
                    type="text"
                    value={appLabels[label] || ""}
                    onChange={e => handleAppLabelChange(label, e.target.value)}
                    placeholder={label}
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
          <AirPortFlightStatusPopUp
            onClose={() => setShowPopup(false)}
            settings={{
              appName,
              tags,
              airportCode,
              displayType,
              flightsDisplayOffset,
              showEachPage,
              showEachCodeShare,
              showFixedFlightsPage,
              englishLanguageEnabled,
              alternateLanguageEach,
              timeFormat,
              headerFontFamily,
              headerFontSize,
              headerTextColor,
              headerBackgroundColor,
              appBackgroundColor,
              appBackgroundImage: appBackgroundImage ? URL.createObjectURL(appBackgroundImage) : null,
              loadingIndicatorColor,
              subtitleFontFamily,
              subtitleFontSize,
              subtitlesTextColor,
              subtitlesBackgroundColor,
              flightFontFamily,
              flightFontSize,
              flightTextFontColor,
              flightsRowBackgroundColor1,
              flightsRowBackgroundColor2,
              terminalTextAndBorderColor,
              terminalBackgroundColor,
              disableStatusBoxesColors,
              language,
              appLabels
            }}
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
    overflowY: "auto",
    paddingBottom: "60px" // Space for fixed buttons
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
    // position: "fixed",
    // bottom: "20px",
    // right: "190px",
    display: "flex",
    justifyContent:'flex-end',
    gap: "10px",
    backgroundColor: "white",
    padding: "10px",
    borderRadius: "5px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
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
  },
  collapsibleSection: {
    border: "1px solid #ddd",
    borderRadius: "5px",
    marginBottom: "15px",
    overflow: "hidden"
  },
  sectionHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 15px",
    backgroundColor: "#f5f5f5",
    cursor: "pointer",
    borderBottom: "1px solid #ddd"
  },
  sectionContent: {
    padding: "15px",
    backgroundColor: "#fff"
  }
};

export default AirPortFlightStatusForm;