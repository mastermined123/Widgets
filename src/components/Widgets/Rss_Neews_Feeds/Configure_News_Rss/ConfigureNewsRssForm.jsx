/* eslint-disable no-unused-vars */
// ConfigureNewsRssForm.jsx
import React, { useState } from "react";
import ConfigureNewsRssPopUp from "./ConfigureNewsRssPopup";

const ConfigureNewsRssForm = ({ card }) => {
  console.log('card', card);

  const [tags, setTags] = useState([]);
  const [appName, setAppName] = useState("");
  const [dataFeed, setDataFeed] = useState("");
  const [rssFeedUrl, setRssFeedUrl] = useState("");
  const [showEachArticleFor, setShowEachArticleFor] = useState("");
  const [articleOptions, setArticleOptions] = useState("latest");
  const [publicationDateFormat, setPublicationDateFormat] = useState("MM/DD/YYYY");
  const [textFont, setTextFont] = useState("Arial");
  const [backgroundColor, setBackgroundColor] = useState("#ffffff");
  const [backgroundImage, setBackgroundImage] = useState(null);
  const [animateArticleTransition, setAnimateArticleTransition] = useState(true);
  const [animateArticleImage, setAnimateArticleImage] = useState(true);
  const [articleBarHeight, setArticleBarHeight] = useState("");
  const [fontSize, setFontSize] = useState("");
  const [displayCapitalizedText, setDisplayCapitalizedText] = useState(false);
  const [topLeftCornerImage, setTopLeftCornerImage] = useState(null);
  const [bottomLeftCornerImage, setBottomLeftCornerImage] = useState(null);
  const [bottomRightCornerImage, setBottomRightCornerImage] = useState(null);
  const [expectedViewportSize, setExpectedViewportSize] = useState("");
  const [numberOfPosts, setNumberOfPosts] = useState("");

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
      rssFeedUrl,
      showEachArticleFor,
      articleOptions,
      publicationDateFormat,
      textFont,
      backgroundColor,
      backgroundImage,
      animateArticleTransition,
      animateArticleImage,
      articleBarHeight,
      fontSize,
      displayCapitalizedText,
      topLeftCornerImage,
      bottomLeftCornerImage,
      bottomRightCornerImage,
      expectedViewportSize,
      numberOfPosts
    });
    alert("Saved! Check console.");
  };

  return (
    <div style={styles.container}>
      {/* Left Portion */}
      <div style={styles.left}>
        <label style={{ ...styles.field, fontWeight: "bold" }}>{card.title}</label>
        {card.imageSrc && <img src={card.imageSrc} alt={card.title} style={styles.image} />}
        <p>This app will display RSS/Atom feed articles with customizable settings.</p>
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
              <label>RSS or Atom Feed URL:</label>
              <input
                type="url"
                value={rssFeedUrl}
                onChange={e => setRssFeedUrl(e.target.value)}
                style={styles.input}
                placeholder="Enter RSS/Atom feed URL"
              />
            </div>

            <div style={styles.field}>
              <label>Show each article for (seconds):</label>
              <input 
                type="number" 
                value={showEachArticleFor} 
                onChange={e => setShowEachArticleFor(e.target.value)} 
                style={styles.input}
                placeholder="Duration in seconds"
              />
            </div>

            <div style={styles.field}>
              <label>Article options:</label>
              <select 
                value={articleOptions} 
                onChange={e => setArticleOptions(e.target.value)} 
                style={styles.input}
              >
                <option value="latest">Latest Articles</option>
                <option value="oldest">Oldest Articles</option>
                <option value="random">Random Articles</option>
                <option value="trending">Trending Articles</option>
              </select>
            </div>

            <div style={styles.field}>
              <label>Publication date format:</label>
              <select 
                value={publicationDateFormat} 
                onChange={e => setPublicationDateFormat(e.target.value)} 
                style={styles.input}
              >
                <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                <option value="DD MMM YYYY">DD MMM YYYY</option>
                <option value="MMM DD, YYYY">MMM DD, YYYY</option>
              </select>
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
                <option value="Helvetica">Helvetica</option>
                <option value="Roboto">Roboto</option>
              </select>
            </div>

            <div style={styles.field}>
              <label>Background color:</label>
              <input 
                type="color" 
                value={backgroundColor} 
                onChange={e => setBackgroundColor(e.target.value)} 
              />
            </div>

            <div style={styles.field}>
              <label>Background image (optional):</label>
              <input 
                type="file" 
                accept="image/*"
                onChange={e => setBackgroundImage(e.target.files[0])} 
              />
            </div>

            <div style={styles.checkboxGroup}>
              <label>
                <input 
                  type="checkbox" 
                  checked={animateArticleTransition} 
                  onChange={e => setAnimateArticleTransition(e.target.checked)} 
                /> Animate article transition
              </label>
              <label>
                <input 
                  type="checkbox" 
                  checked={animateArticleImage} 
                  onChange={e => setAnimateArticleImage(e.target.checked)} 
                /> Animate article image
              </label>
            </div>

            <div style={styles.field}>
              <label>Article bar height (optional):</label>
              <input 
                type="number" 
                value={articleBarHeight} 
                onChange={e => setArticleBarHeight(e.target.value)} 
                style={styles.input}
                placeholder="Height in pixels"
              />
            </div>

            <div style={styles.field}>
              <label>Font size (optional):</label>
              <input 
                type="number" 
                value={fontSize} 
                onChange={e => setFontSize(e.target.value)} 
                style={styles.input}
                placeholder="Font size in pixels"
              />
            </div>

            <div style={styles.checkboxGroup}>
              <label>
                <input 
                  type="checkbox" 
                  checked={displayCapitalizedText} 
                  onChange={e => setDisplayCapitalizedText(e.target.checked)} 
                /> Check here to display capitalized text
              </label>
            </div>

            <div style={styles.field}>
              <label>Top left corner image (optional):</label>
              <input 
                type="file" 
                accept="image/*"
                onChange={e => setTopLeftCornerImage(e.target.files[0])} 
              />
            </div>

            <div style={styles.field}>
              <label>Bottom left corner image (optional):</label>
              <input 
                type="file" 
                accept="image/*"
                onChange={e => setBottomLeftCornerImage(e.target.files[0])} 
              />
            </div>

            <div style={styles.field}>
              <label>Bottom right corner square image (optional):</label>
              <input 
                type="file" 
                accept="image/*"
                onChange={e => setBottomRightCornerImage(e.target.files[0])} 
              />
            </div>

            <div style={styles.field}>
              <label>Expected viewport size (optional):</label>
              <select 
                value={expectedViewportSize} 
                onChange={e => setExpectedViewportSize(e.target.value)} 
                style={styles.input}
              >
                <option value="">Select viewport size</option>
                <option value="1920x1080">1920x1080 (Full HD)</option>
                <option value="1366x768">1366x768 (HD)</option>
                <option value="1280x720">1280x720 (HD)</option>
                <option value="1024x768">1024x768 (XGA)</option>
                <option value="800x600">800x600 (SVGA)</option>
                <option value="custom">Custom</option>
              </select>
            </div>

            <div style={styles.field}>
              <label>Number of posts (optional):</label>
              <input 
                type="number" 
                value={numberOfPosts} 
                onChange={e => setNumberOfPosts(e.target.value)} 
                style={styles.input}
                placeholder="Number of posts to display"
              />
            </div>
          </div>
        </div>

        <div style={styles.fixedButtons}>
          <button onClick={handleSave} style={styles.saveBtn}>Save</button>
          <button onClick={() => setShowPopup(true)} style={styles.previewBtn}>Preview</button>
        </div>

        {showPopup && (
          <ConfigureNewsRssPopUp
            appName={appName}
            rssFeedUrl={rssFeedUrl}
            showEachArticleFor={showEachArticleFor ? parseInt(showEachArticleFor) : 5}
            articleOptions={articleOptions}
            publicationDateFormat={publicationDateFormat}
            textFont={textFont}
            backgroundColor={backgroundColor}
            backgroundImage={backgroundImage ? URL.createObjectURL(backgroundImage) : card.imageSrc}
            animateArticleTransition={animateArticleTransition}
            animateArticleImage={animateArticleImage}
            articleBarHeight={articleBarHeight ? parseInt(articleBarHeight) : null}
            fontSize={fontSize ? parseInt(fontSize) : 16}
            displayCapitalizedText={displayCapitalizedText}
            topLeftCornerImage={topLeftCornerImage ? URL.createObjectURL(topLeftCornerImage) : null}
            bottomLeftCornerImage={bottomLeftCornerImage ? URL.createObjectURL(bottomLeftCornerImage) : null}
            bottomRightCornerImage={bottomRightCornerImage ? URL.createObjectURL(bottomRightCornerImage) : null}
            expectedViewportSize={expectedViewportSize}
            numberOfPosts={numberOfPosts ? parseInt(numberOfPosts) : 10}
            tags={tags}
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
    color: "#fff", 
    border: "none", 
    borderRadius: "50%", 
    width: "16px", 
    height: "16px", 
    cursor: "pointer" 
  }
};

export default ConfigureNewsRssForm;