import React, { useState } from "react";

const HdmiInputForm = ({ card }) => {

    console.log('card',card)
  const [tags, setTags] = useState([]);
  const [appName, setAppName] = useState("");
  const [dataFeed, setDataFeed] = useState("");
  const [hdmiInputNumber, setHdmiInputNumber] = useState("");
  const [fallbackImage, setFallbackImage] = useState(null);

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
      hdmiInputNumber,
      fallbackImage
    });
    alert("Saved! Check console.");
  };

  const hdmiInputOptions = [
    { value: "", label: "Select HDMI Input" },
    { value: "HDMI1", label: "HDMI1" },
    { value: "HDMI2", label: "HDMI2" }
  ];

  return (
    <div style={styles.container}>
      {/* Left Portion */}
      <div style={styles.left}>
        <label style={{ ...styles.field, fontWeight: "bold" }} >{card.title}</label>
        {card.imageSrc && <img src={card.imageSrc} alt={card.title} style={styles.image} />}
        <p>This app will display HDMI input with fallback options when no signal is detected.</p>
        <p>Better Viewed Like This:</p>
        <div style={styles.previewBoxes}>
          <div style={{ ...styles.box, width: "100px", height: "60px" }}></div>
          <div style={{ ...styles.box, width: "60px", height: "100px" }}></div>
        </div>
      </div>

      {/* Right Portion */}
      <div style={styles.right}>
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
              <label>HDMI Input Number:</label>
              <select
                value={hdmiInputNumber}
                onChange={e => setHdmiInputNumber(e.target.value)}
                style={styles.input}
              >
                {hdmiInputOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>

            <div style={styles.field}>
              <label>Fallback Image (optional):</label>
              <input
                type="file"
                accept="image/*"
                onChange={e => setFallbackImage(e.target.files[0])}
                style={styles.fileInput}
              />
              <p style={styles.description}>
                Image to be displayed when no signal is detected on this HDMI input. Supported on players version 10.2 or above.
              </p>
            </div>
          </div>
        </div>

        <div style={styles.fixedButtons}>
          <button onClick={handleSave} style={styles.saveBtn}>Save</button>
        </div>
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
  tabContent: {
    flex: 1,
    overflowY: "auto",
    paddingBottom: "70px"
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
    padding: "8px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    fontSize: "14px",
    backgroundColor: "#fff"
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
    padding: "10px 16px",
    backgroundColor: "#005481",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "bold"
  },
  tag: {
    padding: "4px 8px",
    backgroundColor: "#e0e0e0",
    borderRadius: "4px",
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
  }
};

export default HdmiInputForm;