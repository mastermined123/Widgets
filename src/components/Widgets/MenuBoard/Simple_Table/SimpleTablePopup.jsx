import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";

const SimpleTablePopUp = ({ 
  image, 
  title,
  titleColor,
  textColor,
  backgroundColor,
  textFont,
  titleFontSize,
  bodyFontSize,
  disableAnimations,
  dontDisplayTitle,
  showEachPageFor,
  rowsPerTable,
  appLabels,
  onClose 
}) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = showEachPageFor || 5;
    if (!duration) return;
    let elapsed = 0;
    const interval = setInterval(() => {
      elapsed += 100;
      setProgress((elapsed / (duration * 1000)) * 100);
      if (elapsed >= duration * 1000) {
        clearInterval(interval);
        onClose && onClose();
      }
    }, 100);
    return () => clearInterval(interval);
  }, [showEachPageFor, onClose]);

  // Dummy timetable data
  const timetableData = [
    { time: "9:00 AM", monday: "Mathematics", tuesday: "English", wednesday: "Physics", thursday: "Chemistry", friday: "Biology" },
    { time: "10:00 AM", monday: "English", tuesday: "Physics", wednesday: "Mathematics", thursday: "Biology", friday: "Chemistry" },
    { time: "11:00 AM", monday: "Physics", tuesday: "Chemistry", wednesday: "English", thursday: "Mathematics", friday: "Computer Science" },
    { time: "12:00 PM", monday: "Chemistry", tuesday: "Biology", wednesday: "Computer Science", thursday: "English", friday: "Mathematics" },
    { time: "1:00 PM", monday: "Lunch Break", tuesday: "Lunch Break", wednesday: "Lunch Break", thursday: "Lunch Break", friday: "Lunch Break" },
    { time: "2:00 PM", monday: "Biology", tuesday: "Computer Science", wednesday: "Chemistry", thursday: "Physics", friday: "English" },
    { time: "3:00 PM", monday: "Computer Science", tuesday: "Mathematics", wednesday: "Biology", thursday: "English", friday: "Physics" },
    { time: "4:00 PM", monday: "Sports", tuesday: "Art", wednesday: "Music", thursday: "Sports", friday: "Art" }
  ];

  const displayData = rowsPerTable ? timetableData.slice(0, rowsPerTable) : timetableData;

  return (
    <div style={styles.overlay}>
      <div style={{
        ...styles.popup,
        backgroundColor: backgroundColor || '#ffffff',
        backgroundImage: image ? `url(${image})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        fontFamily: textFont || 'Arial'
      }}>
        {/* Top bar like browser tab */}
        <div style={styles.topBar}>
          <button onClick={onClose} style={styles.closeBtn}>
            <IoMdClose />
          </button>
        </div>

        {/* Content Container */}
        <div style={styles.contentContainer}>
          {/* Title */}
          {!dontDisplayTitle && title && (
            <h2 style={{
              ...styles.title,
              color: titleColor || '#000000',
              fontSize: `${titleFontSize || 24}px`,
              fontFamily: textFont || 'Arial'
            }}>
              {title}
            </h2>
          )}

          {/* Table Container */}
          <div style={styles.tableContainer}>
            <table style={{
              ...styles.table,
              color: textColor || '#000000',
              fontSize: `${bodyFontSize || 14}px`,
              fontFamily: textFont || 'Arial'
            }}>
              <thead>
                <tr style={styles.headerRow}>
                  <th style={{...styles.th, color: textColor || '#000000'}}>Time</th>
                  <th style={{...styles.th, color: textColor || '#000000'}}>Monday</th>
                  <th style={{...styles.th, color: textColor || '#000000'}}>Tuesday</th>
                  <th style={{...styles.th, color: textColor || '#000000'}}>Wednesday</th>
                  <th style={{...styles.th, color: textColor || '#000000'}}>Thursday</th>
                  <th style={{...styles.th, color: textColor || '#000000'}}>Friday</th>
                </tr>
              </thead>
              <tbody>
                {displayData.map((row, index) => (
                  <tr 
                    key={index} 
                    style={{
                      ...styles.dataRow,
                      animation: disableAnimations ? 'none' : `fadeIn 0.5s ease-in-out ${index * 0.1}s both`
                    }}
                  >
                    <td style={{...styles.td, fontWeight: 'bold', color: textColor || '#000000'}}>{row.time}</td>
                    <td style={{...styles.td, color: textColor || '#000000'}}>{row.monday}</td>
                    <td style={{...styles.td, color: textColor || '#000000'}}>{row.tuesday}</td>
                    <td style={{...styles.td, color: textColor || '#000000'}}>{row.wednesday}</td>
                    <td style={{...styles.td, color: textColor || '#000000'}}>{row.thursday}</td>
                    <td style={{...styles.td, color: textColor || '#000000'}}>{row.friday}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* No data message if needed */}
          {displayData.length === 0 && (
            <div style={styles.noDataContainer}>
              <p style={{
                color: textColor || '#666',
                fontSize: `${bodyFontSize || 14}px`,
                fontFamily: textFont || 'Arial'
              }}>
                {appLabels?.noDataAvailable || "No data available"}
              </p>
            </div>
          )}
        </div>

        {/* Progress bar */}
        <div style={styles.progressWrapper}>
          <div style={{ ...styles.progressBar, width: `${progress}%` }}></div>
        </div>

        {/* Animation keyframes */}
        <style>{`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}</style>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    background: "rgba(0,0,0,0.6)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2000,
  },
  popup: {
    width: "95vw",
    height: "95vh",
    background: "#fff",
    borderRadius: "12px",
    boxShadow: "0px 8px 32px rgba(0,0,0,0.3)",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    position: "relative"
  },
  topBar: {
    background: "#f1f1f1",
    padding: "8px 12px",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    borderBottom: "1px solid #ccc",
    minHeight: "40px"
  },
  closeBtn: {
    border: "none",
    background: "transparent",
    fontSize: "20px",
    cursor: "pointer",
    color: "#666",
    padding: "4px",
    borderRadius: "4px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  contentContainer: {
    flex: 1,
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    overflowY: "auto",
    backgroundColor: "rgba(255, 255, 255, 0.9)"
  },
  title: {
    textAlign: "center",
    marginBottom: "30px",
    fontWeight: "bold",
    textShadow: "1px 1px 2px rgba(0,0,0,0.1)"
  },
  tableContainer: {
    width: "100%",
    maxWidth: "1000px",
    overflowX: "auto",
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    borderRadius: "8px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    backgroundColor: "transparent"
  },
  headerRow: {
    backgroundColor: "rgba(0, 84, 129, 0.1)"
  },
  th: {
    padding: "12px 8px",
    textAlign: "center",
    fontWeight: "bold",
    borderBottom: "2px solid #005481",
    backgroundColor: "rgba(0, 84, 129, 0.05)"
  },
  dataRow: {
    borderBottom: "1px solid #e0e0e0",
    transition: "background-color 0.2s ease"
  },
  td: {
    padding: "10px 8px",
    textAlign: "center",
    borderRight: "1px solid #f0f0f0"
  },
  noDataContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "200px",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: "8px",
    width: "100%",
    maxWidth: "600px"
  },
  progressWrapper: {
    height: "6px",
    background: "#eee",
    width: "100%"
  },
  progressBar: {
    height: "100%",
    background: "#005481",
    transition: "width 0.1s linear"
  }
};

export default SimpleTablePopUp;