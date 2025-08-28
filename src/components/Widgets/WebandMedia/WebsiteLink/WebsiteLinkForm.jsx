import React, { useState } from "react";
import WebsiteLinkPopUp from "./WebsiteLinkPopUp";

function WebsiteLinkForm({ card }) {
  const [activeTab, setActiveTab] = useState("settings");
  const [showPopup, setShowPopup] = useState(false);
  const [dataFeed, setDataFeed] = useState(""); // input for tags
  const [appNameError, setAppNameError] = useState("");
  
  // Dropdown states
  const [showSecuritySettings, setShowSecuritySettings] = useState(false);
  const [showAdvancedSettings, setShowAdvancedSettings] = useState(false);

  // Configuration state
  const [appName, setAppName] = useState("");
  const [tags, setTags] = useState([]);
  const [pageUrl, setPageUrl] = useState("");
  const [transparentBackground, setTransparentBackground] = useState(false);
  const [displayMode, setDisplayMode] = useState("Default for platform");
  const [fullPageZoom, setFullPageZoom] = useState(100);
  const [allowInsecureHttps, setAllowInsecureHttps] = useState(false);
  const [allowUserInteraction, setAllowUserInteraction] = useState(false);
  const [enableAutocomplete, setEnableAutocomplete] = useState(false);
  const [allowCameraAccess, setAllowCameraAccess] = useState(false);
  const [allowMicrophoneAccess, setAllowMicrophoneAccess] = useState(false);
  const [restrictPageNavigation, setRestrictPageNavigation] = useState(false);
  const [allowedNavigationUrls, setAllowedNavigationUrls] = useState("");
  
  // Advanced Settings
  const [urlContainsTemplateVariables, setUrlContainsTemplateVariables] = useState(false);
  const [useDedicatedBrowserWindow, setUseDedicatedBrowserWindow] = useState(false);
  const [reloadPageInterval, setReloadPageInterval] = useState("");
  const [reloadBehavior, setReloadBehavior] = useState("Reload current page");
  const [runJavascriptOnLoad, setRunJavascriptOnLoad] = useState("");

  // Tag handlers
  const addTag = () => {
    if (dataFeed.trim()) {
      setTags((prev) => [...prev, dataFeed.trim()]);
      setDataFeed("");
    }
  };

  const removeTag = (index) => {
    setTags((prev) => prev.filter((_, i) => i !== index));
  };

  const handlePreview = () => {
    if (!appName.trim()) {
      setAppNameError("Please fill out this field.");
      return;
    }
    setAppNameError("");
    setShowPopup(true);
  };

  const handleSave = () => {
    console.log({
      appName,
      tags,
      pageUrl,
      transparentBackground,
      displayMode,
      fullPageZoom,
      allowInsecureHttps,
      allowUserInteraction,
      enableAutocomplete,
      allowCameraAccess,
      allowMicrophoneAccess,
      restrictPageNavigation,
      allowedNavigationUrls,
    });
    alert("Saved! Check console.");
  };

  return (
    <div style={styles.container}>
      {/* Left Portion */}
      <div style={styles.left}>
        <label style={{ ...styles.field, fontWeight: "bold" }}>{card?.title || "Website Link"}</label>
        {card?.imageSrc && <img src={card.imageSrc} alt={card?.title || "Website Link"} style={styles.image} />}
        <p>Configurable website link: URL, display settings, and security options.</p>
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
        </div>

        <div style={styles.tabContent}>
          {activeTab === "settings" && (
            <div>
              {/* App Name */}
              <div style={styles.field}>
                <label>App Name:</label>
                <input
                  type="text"
                  value={appName}
                  onChange={(e) => {
                    setAppName(e.target.value);
                    if (appNameError) setAppNameError("");
                  }}
                  style={{
                    ...styles.input,
                    borderColor: appNameError ? "#ff0000" : "#ccc"
                  }}
                />
                {appNameError && (
                  <div style={styles.errorMessage}>
                    <span style={styles.errorIcon}>⚠</span>
                    {appNameError}
                  </div>
                )}
              </div>

              {/* Tags (multiple) */}
              <div style={styles.field}>
                <label>Tags (multiple):</label>
                <div style={{ display: "flex", gap: "5px", flexWrap: "wrap" }}>
                  {tags?.map((tag, i) => (
                    <span key={i} style={styles.tag}>
                      {tag}
                      <button onClick={() => removeTag(i)} style={styles.removeTag}>x</button>
                    </span>
                  ))}
                  <input
                    type="text"
                    value={dataFeed}
                    onChange={(e) => setDataFeed(e.target.value)}
                    placeholder="Enter a tag and press Enter"
                    style={{ ...styles.input, flex: "1" }}
                    onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                  />
                </div>
              </div>

              {/* Page URL */}
              <div style={styles.field}>
                <label>Page URL:</label>
                <input
                  type="text"
                  value={pageUrl}
                  onChange={(e) => setPageUrl(e.target.value)}
                  style={styles.input}
                  placeholder="https://example.com"
                />
              </div>

              {/* Display Mode */}
              <div style={styles.field}>
                <label>Display Mode:</label>
                <select
                  value={displayMode}
                  onChange={(e) => setDisplayMode(e.target.value)}
                  style={styles.input}
                >
                  <option value="Default for platform">Default for platform</option>
                  <option value="Mobile">Mobile</option>
                  <option value="Desktop">Desktop</option>
                </select>
              </div>

              {/* Full Page Zoom */}
              <div style={styles.field}>
                <label>Full Page Zoom (%):</label>
                <input
                  type="number"
                  min="25"
                  max="500"
                  value={fullPageZoom}
                  onChange={(e) => setFullPageZoom(parseInt(e.target.value) || 100)}
                  style={styles.input}
                />
              </div>

              {/* Security Settings Dropdown */}
              <div style={styles.dropdownSection}>
                <div 
                  style={styles.dropdownHeader}
                  onClick={() => setShowSecuritySettings(!showSecuritySettings)}
                >
                  <span>Security Settings</span>
                  <span style={styles.dropdownToggle}>
                    {showSecuritySettings ? 'hide' : 'show'} ▼
                  </span>
                </div>
                
                {showSecuritySettings && (
                  <div style={styles.dropdownContent}>
                    {/* Allow Insecure HTTPS */}
                    <div style={styles.checkboxField}>
                      <label style={styles.checkboxLabel}>
                        <input
                          type="checkbox"
                          checked={allowInsecureHttps}
                          onChange={(e) => setAllowInsecureHttps(e.target.checked)}
                          style={styles.checkbox}
                        />
                        Allow insecure HTTPS connection
                      </label>
                      <div style={styles.helperText}>
                        Allows the player to connect to HTTPS pages without checking whether the certificate is valid.
                      </div>
                    </div>

                    {/* Allow User Interaction */}
                    <div style={styles.checkboxField}>
                      <label style={styles.checkboxLabel}>
                        <input
                          type="checkbox"
                          checked={allowUserInteraction}
                          onChange={(e) => setAllowUserInteraction(e.target.checked)}
                          style={styles.checkbox}
                        />
                        Allow user interaction
                      </label>
                      <div style={styles.helperText}>
                        Allows users to interact with the website through clicks, touches or keyboard input.
                      </div>
                    </div>

                    {/* Enable Autocomplete */}
                    <div style={styles.checkboxField}>
                      <label style={styles.checkboxLabel}>
                        <input
                          type="checkbox"
                          checked={enableAutocomplete}
                          onChange={(e) => setEnableAutocomplete(e.target.checked)}
                          style={styles.checkbox}
                        />
                        Enable Autocomplete on Page
                      </label>
                      <div style={styles.helperText}>
                        Enables support for autocompleting forms in the page.
                      </div>
                    </div>

                    {/* Allow Camera Access */}
                    <div style={styles.checkboxField}>
                      <label style={styles.checkboxLabel}>
                        <input
                          type="checkbox"
                          checked={allowCameraAccess}
                          onChange={(e) => setAllowCameraAccess(e.target.checked)}
                          style={styles.checkbox}
                        />
                        Allow Access to Camera
                      </label>
                      <div style={styles.helperText}>
                        Allows the webpage access to the device camera. Requires Android Player 10.2.14 or above.
                      </div>
                    </div>

                    {/* Allow Microphone Access */}
                    <div style={styles.checkboxField}>
                      <label style={styles.checkboxLabel}>
                        <input
                          type="checkbox"
                          checked={allowMicrophoneAccess}
                          onChange={(e) => setAllowMicrophoneAccess(e.target.checked)}
                          style={styles.checkbox}
                        />
                        Allow Access to Microphone
                      </label>
                      <div style={styles.helperText}>
                        Allows the webpage access to the device microphone. Requires Android Player 10.2.14 or above.
                      </div>
                    </div>

                    {/* Restrict Page Navigation */}
                    <div style={styles.checkboxField}>
                      <label style={styles.checkboxLabel}>
                        <input
                          type="checkbox"
                          checked={restrictPageNavigation}
                          onChange={(e) => setRestrictPageNavigation(e.target.checked)}
                          style={styles.checkbox}
                        />
                        Restrict Page Navigation
                      </label>
                      <div style={styles.helperText}>
                        By default it is possible to click links and navigate to pages other than the one configured above. When this option is enabled navigation is only allowed to the URLs specified below. Requires Android Player 10.2.16 or above.
                      </div>
                    </div>

                    {/* Allowed Navigation URLs */}
                    {restrictPageNavigation && (
                      <div style={styles.field}>
                        <label><strong>Allowed Navigation URLs</strong> <em>(optional)</em></label>
                        <textarea
                          rows="4"
                          value={allowedNavigationUrls}
                          onChange={(e) => setAllowedNavigationUrls(e.target.value)}
                          style={styles.textarea}
                          placeholder=""
                        />
                        <div style={styles.helperText}>
                          List of URLs that are allowed to be loaded in the app, <strong>one per line</strong>. 
                          You must specify the complete URL, but you can use a '*' character as a placeholder. 
                          For instance, to allow navigation to Google and Bing enter:
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Advanced Settings Dropdown */}
              <div style={styles.dropdownSection}>
                <div 
                  style={styles.dropdownHeader}
                  onClick={() => setShowAdvancedSettings(!showAdvancedSettings)}
                >
                  <span>Advanced Settings</span>
                  <span style={styles.dropdownToggle}>
                    {showAdvancedSettings ? 'hide' : 'show'} ▼
                  </span>
                </div>
                
                {showAdvancedSettings && (
                  <div style={styles.dropdownContent}>
                    {/* URL Contains Template Variables */}
                    <div style={styles.checkboxField}>
                      <label style={styles.checkboxLabel}>
                        <input
                          type="checkbox"
                          checked={urlContainsTemplateVariables}
                          onChange={(e) => setUrlContainsTemplateVariables(e.target.checked)}
                          style={styles.checkbox}
                        />
                        URL Contains Template Variables
                      </label>
                      <div style={styles.helperText}>
                        Replace variables on the given Page URL, such as <span style={{ color: '#d63384' }}>{'{{ player.id }}'}</span>, with their values.
                      </div>
                    </div>

                    {/* Use Dedicated Browser Window */}
                    <div style={styles.checkboxField}>
                      <label style={styles.checkboxLabel}>
                        <input
                          type="checkbox"
                          checked={useDedicatedBrowserWindow}
                          onChange={(e) => setUseDedicatedBrowserWindow(e.target.checked)}
                          style={styles.checkbox}
                        />
                        Use Dedicated Browser Window
                      </label>
                      <div style={styles.helperText}>
                        Use a separate browser window to display website in order to work around sites that cannot be embedded. When using this option the website will be displayed on top of all other content. Requires BrightSign, Windows, macOS and Linux version 10.7 or newer.
                      </div>
                    </div>

                    {/* Reload Page Interval */}
                    <div style={styles.field}>
                      <label><strong>Reload Page Interval</strong> <em>(optional)</em></label>
                      <input
                        type="text"
                        value={reloadPageInterval}
                        onChange={(e) => setReloadPageInterval(e.target.value)}
                        style={styles.input}
                        placeholder=""
                      />
                      <div style={styles.helperText}>
                        Reloads the page after the given time, in seconds, has elapsed.
                      </div>
                    </div>

                    {/* Reload Behavior */}
                    <div style={styles.field}>
                      <label><strong>Reload Behavior</strong></label>
                      <select
                        value={reloadBehavior}
                        onChange={(e) => setReloadBehavior(e.target.value)}
                        style={styles.input}
                      >
                        <option value="Reload current page">Reload current page</option>
                        <option value="Load original Page URL">Load original Page URL</option>
                      </select>
                      <div style={styles.helperText}>
                        When it is time to reload on interval, the page might have navigated to a different URL. Choose between reloading the current URL or reloading the original Page URL.
                      </div>
                    </div>

                    {/* Run Javascript On Load */}
                    <div style={styles.field}>
                      <label><strong>Run Javascript On Load</strong> <em>(optional)</em></label>
                      <textarea
                        rows="6"
                        value={runJavascriptOnLoad}
                        onChange={(e) => setRunJavascriptOnLoad(e.target.value)}
                        style={styles.textarea}
                        placeholder=""
                      />
                      <div style={styles.helperText}>
                        Run Javascript after loading the page.
                      </div>
                    </div>

                    {/* Transparent Background */}
                    <div style={styles.checkboxField}>
                      <label style={styles.checkboxLabel}>
                        <input
                          type="checkbox"
                          checked={transparentBackground}
                          onChange={(e) => setTransparentBackground(e.target.checked)}
                          style={styles.checkbox}
                        />
                        Transparent Background
                      </label>
                      <div style={styles.helperText}>
                        Enables page background transparency. Requires Player Version 10.2 or above.
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Buttons at bottom */}
        <div style={styles.bottomButtons}>
          <button onClick={handleSave} style={styles.saveBtn}>Save</button>
        </div>

        {/* Preview Popup */}
        {showPopup && (
          <WebsiteLinkPopUp
            onClose={() => setShowPopup(false)}
            appName={appName}
            tags={tags}
            pageUrl={pageUrl}
            transparentBackground={transparentBackground}
            displayMode={displayMode}
            fullPageZoom={fullPageZoom}
            allowInsecureHttps={allowInsecureHttps}
            allowUserInteraction={allowUserInteraction}
            enableAutocomplete={enableAutocomplete}
            allowCameraAccess={allowCameraAccess}
            allowMicrophoneAccess={allowMicrophoneAccess}
            restrictPageNavigation={restrictPageNavigation}
            allowedNavigationUrls={allowedNavigationUrls}
          />
        )}
      </div>
    </div>
  );
}

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
  sectionHeader: {
    marginTop: "20px",
    marginBottom: "10px",
    paddingBottom: "5px",
    borderBottom: "2px solid #005481",
  },
  checkboxLabel: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    cursor: "pointer",
  },
  checkbox: {
    margin: "0",
  },
  helperText: {
    color: "#666",
    fontSize: "12px",
    marginTop: "4px",
    lineHeight: "1.3",
  },
  bottomButtons: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "10px",
    marginTop: "20px",
    paddingTop: "15px",
    borderTop: "1px solid #eee",
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
  previewBtn: {
    padding: "8px 16px",
    backgroundColor: "#007acc",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontWeight: "500",
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
  errorMessage: {
    display: "flex",
    alignItems: "center",
    gap: "5px",
    color: "#ff0000",
    fontSize: "12px",
    marginTop: "5px",
    padding: "5px 8px",
    backgroundColor: "#fff3cd",
    border: "1px solid #ffeaa7",
    borderRadius: "4px",
  },
  errorIcon: {
    color: "#ff6b35",
    fontWeight: "bold",
  },
  dropdownSection: {
    marginBottom: "15px",
    border: "1px solid #ddd",
    borderRadius: "4px",
  },
  dropdownHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 15px",
    backgroundColor: "#f8f9fa",
    cursor: "pointer",
    borderRadius: "4px",
    fontSize: "14px",
    fontWeight: "500",
    color: "#333",
  },
  dropdownToggle: {
    fontSize: "12px",
    color: "#007acc",
    fontWeight: "normal",
  },
  dropdownContent: {
    padding: "15px",
    borderTop: "1px solid #eee",
    backgroundColor: "#fff",
  },
  checkboxField: {
    marginBottom: "15px",
  },
  checkboxLabel: {
    display: "flex",
    alignItems: "flex-start",
    gap: "8px",
    cursor: "pointer",
    fontSize: "14px",
    color: "#333",
    marginBottom: "5px",
  },
  checkbox: {
    marginTop: "2px",
    flexShrink: 0,
  },
  helperText: {
    color: "#666",
    fontSize: "12px",
    marginTop: "4px",
    marginLeft: "24px",
    lineHeight: "1.4",
  },
  textarea: {
    padding: "8px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    resize: "vertical",
    fontFamily: "inherit",
    fontSize: "14px",
    width: "100%",
    boxSizing: "border-box",
  },
};

export default WebsiteLinkForm;