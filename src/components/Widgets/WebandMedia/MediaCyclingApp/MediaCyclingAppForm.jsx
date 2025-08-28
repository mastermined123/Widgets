import React, { useState } from "react";

function MediaCyclingAppForm({ card }) {
  const [appName, setAppName] = useState("");
  const [tags, setTags] = useState([]);
  const [dataFeed, setDataFeed] = useState("");
  const [mute, setMute] = useState(false);
  const [mediaFile, setMediaFile] = useState(null);

  console.log("current card", card);
  // Tag Handlers
  const addTag = () => {
    if (dataFeed.trim()) {
      setTags((prev) => [...prev, dataFeed.trim()]);
      setDataFeed("");
    }
  };

  const removeTag = (index) => {
    setTags((prev) => prev.filter((_, i) => i !== index));
  };

  const handleFileChange = (e) => {
    setMediaFile(e.target.files[0]);
  };

  const handleSave = () => {
    console.log({
      appName,
      tags,
      mute,
      mediaFile,
    });
    alert("Saved! Check console.");
  };

  return (
    <div style={styles.container}>
      {/* Left Portion */}
      <div style={styles.left}>
        <label style={{ ...styles.field, fontWeight: "bold" }}>
          {card?.title || "Media Cycling App"}
        </label>
        {card?.imageSrc && (
          <img
            src={card.imageSrc}
            alt={card?.title || "Media App"}
            style={styles.image}
          />
        )}
        <p>Cycle through media files with mute and tagging options.</p>
      </div>

      {/* Right Portion */}
      <div style={styles.right}>
        <h3 style={styles.heading}>Settings</h3>

        {/* App Name */}
        <div style={styles.field}>
          <label>App name</label>
          <input
            type="text"
            value={appName}
            onChange={(e) => setAppName(e.target.value)}
            placeholder="Enter a name for this app"
            style={styles.input}
          />
        </div>

        {/* Tags */}
        <div style={styles.field}>
          <label>
            Tags <span style={styles.optional}>(optional)</span>
          </label>
          <div style={{ display: "flex", gap: "5px", flexWrap: "wrap" }}>
            {tags.map((tag, i) => (
              <span key={i} style={styles.tag}>
                {tag}
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
              placeholder="Select a tag or enter a new one"
              style={{ ...styles.input, flex: "1" }}
              onKeyDown={(e) =>
                e.key === "Enter" && (e.preventDefault(), addTag())
              }
            />
          </div>
        </div>

        {/* Mute Checkbox */}
        <div style={{ ...styles.field, flexDirection: "row", alignItems: "center" }}>
          <input
            type="checkbox"
            checked={mute}
            onChange={(e) => setMute(e.target.checked)}
            style={{ marginRight: "8px" }}
          />
          <label>Mute</label>
        </div>

        {/* Media Upload */}
        <div style={styles.field}>
          <label>Medias</label>
          <input
            type="file"
            onChange={handleFileChange}
            style={styles.fileInput}
          />
        </div>

        {/* Save Button */}
        <div style={styles.buttonContainer}>
          <button onClick={handleSave} style={styles.saveBtn}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    width: "96%",
    height: "500px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    overflow: "hidden",
    marginTop: "10px",
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
  },
  image: {
    width: "100%",
    height: "200px",
    objectFit: "cover",
    borderRadius: "8px",
    marginBottom: "10px",
  },
  heading: {
    marginBottom: "15px",
    fontSize: "16px",
    fontWeight: "bold",
  },
  field: {
    display: "flex",
    flexDirection: "column",
    marginBottom: "15px",
  },
  input: {
    padding: "8px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    marginTop: "5px",
  },
  fileInput: {
    padding: "6px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    marginTop: "5px",
  },
  optional: {
    fontSize: "12px",
    color: "#666",
    fontStyle: "italic",
  },
  tag: {
    padding: "2px 5px",
    backgroundColor: "#ccc",
    borderRadius: "4px",
    display: "flex",
    alignItems: "center",
    gap: "4px",
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
    lineHeight: "16px",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: "20px",
  },
  saveBtn: {
    padding: "8px 16px",
    backgroundColor: "#ff8c00",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontWeight: "500",
  },
};

export default MediaCyclingAppForm;
