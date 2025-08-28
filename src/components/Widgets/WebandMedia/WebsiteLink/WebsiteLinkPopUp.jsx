import React from "react";
import { IoMdClose } from "react-icons/io";

const WebsiteLinkPopUp = ({
  onClose,
  appName = "Website Link",
  pageUrl = "",
  transparentBackground = false,
  displayMode = "Default for platform",
  fullPageZoom = 100,
  allowInsecureHttps = false,
  allowUserInteraction = false,
  enableAutocomplete = false,
  allowCameraAccess = false,
  allowMicrophoneAccess = false,
  restrictPageNavigation = false,
  allowedNavigationUrls = "",
}) => {
  return (
    <div style={styles.overlay}>
      <div style={styles.popup}>
        {/* Close button */}
        <button onClick={onClose} style={styles.closeBtn}>
          <IoMdClose />
        </button>

        {/* Header */}
        <div style={styles.header}>
          <h2 style={styles.title}>{appName} - Preview</h2>
        </div>

        {/* Website Preview */}
        <div style={styles.content}>
          {pageUrl ? (
            <div style={styles.previewContainer}>
              <iframe
                src={pageUrl}
                style={{
                  ...styles.iframe,
                  transform: `scale(${fullPageZoom / 100})`,
                  transformOrigin: 'top left',
                  width: `${10000 / fullPageZoom}%`,
                  height: `${10000 / fullPageZoom}%`,
                  backgroundColor: transparentBackground ? 'transparent' : '#fff',
                }}
                title={`${appName} Preview`}
                sandbox={
                  allowUserInteraction 
                    ? "allow-scripts allow-same-origin allow-forms allow-popups"
                    : "allow-scripts allow-same-origin"
                }
              />
            </div>
          ) : (
            <div style={styles.noUrl}>
              <p>No URL provided for preview</p>
            </div>
          )}
        </div>

        {/* Settings Summary */}
        <div style={styles.settingsSummary}>
          <h4>Current Settings:</h4>
          <div style={styles.settingsGrid}>
            <div><strong>Display Mode:</strong> {displayMode}</div>
            <div><strong>Zoom:</strong> {fullPageZoom}%</div>
            <div><strong>Transparent BG:</strong> {transparentBackground ? 'Yes' : 'No'}</div>
            <div><strong>User Interaction:</strong> {allowUserInteraction ? 'Enabled' : 'Disabled'}</div>
            <div><strong>Insecure HTTPS:</strong> {allowInsecureHttps ? 'Allowed' : 'Blocked'}</div>
            <div><strong>Autocomplete:</strong> {enableAutocomplete ? 'Enabled' : 'Disabled'}</div>
            <div><strong>Camera Access:</strong> {allowCameraAccess ? 'Allowed' : 'Blocked'}</div>
            <div><strong>Microphone Access:</strong> {allowMicrophoneAccess ? 'Allowed' : 'Blocked'}</div>
            <div><strong>Navigation Restricted:</strong> {restrictPageNavigation ? 'Yes' : 'No'}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  popup: {
    backgroundColor: "#fff",
    borderRadius: "12px",
    width: "90%",
    maxWidth: "1200px",
    height: "90%",
    maxHeight: "800px",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
  },
  closeBtn: {
    position: "absolute",
    top: "15px",
    right: "15px",
    background: "none",
    border: "none",
    fontSize: "24px",
    cursor: "pointer",
    color: "#666",
    zIndex: 1001,
    padding: "5px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "35px",
    height: "35px",
  },
  header: {
    padding: "20px 20px 10px 20px",
    borderBottom: "1px solid #eee",
  },
  title: {
    margin: 0,
    fontSize: "20px",
    color: "#333",
    fontWeight: "600",
  },
  content: {
    flex: 1,
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
  },
  previewContainer: {
    flex: 1,
    border: "2px solid #ddd",
    borderRadius: "8px",
    overflow: "hidden",
    position: "relative",
    backgroundColor: "#f9f9f9",
  },
  iframe: {
    border: "none",
    borderRadius: "6px",
  },
  noUrl: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#666",
    fontSize: "16px",
    border: "2px dashed #ddd",
    borderRadius: "8px",
  },
  settingsSummary: {
    padding: "15px 20px",
    borderTop: "1px solid #eee",
    backgroundColor: "#f8f9fa",
    borderBottomLeftRadius: "12px",
    borderBottomRightRadius: "12px",
  },
  settingsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "8px",
    fontSize: "12px",
    color: "#555",
    marginTop: "8px",
  },
};

export default WebsiteLinkPopUp;
