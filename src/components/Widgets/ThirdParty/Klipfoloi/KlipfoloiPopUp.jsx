import React from "react";
import { IoMdClose } from "react-icons/io";

const KlipfoloiPopUp = ({
  onClose,
  appName = "Klipfolio",
  tags = [],
  klipfolioUrl = "",
}) => {
  return (
    <div style={styles.overlay}>
      <div style={styles.popup}>
        {/* Close button */}
        <button onClick={onClose} style={styles.closeBtn}>
          <IoMdClose />
        </button>

        {/* Website Preview Only */}
        <div style={styles.content}>
          {klipfolioUrl ? (
            <iframe
              src={klipfolioUrl}
              style={styles.iframe}
              title="Preview"
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
            />
          ) : (
            <div style={styles.noUrl}>
              <p>No URL provided</p>
            </div>
          )}
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
    background: "rgba(255, 255, 255, 0.9)",
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
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
  },
  content: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    borderRadius: "12px",
  },
  iframe: {
    width: "100%",
    height: "100%",
    border: "none",
    borderRadius: "12px",
  },
  noUrl: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#666",
    fontSize: "16px",
    backgroundColor: "#f9f9f9",
    borderRadius: "12px",
  },
};

export default KlipfoloiPopUp;