import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";

const FlightStatusPopUp = ({ 
  image, 
  duration, 
  onClose, 
  airportCode,
  displayType,
  textFont,
  titleColor,
  textColor,
  textShadow,
  customBgColor,
  transitionAnimation,
  appLabels 
}) => {
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Sample flight data - in real app this would come from API
  const sampleFlights = [
    {
      scheduled: "08:30",
      flight: "UA123",
      destination: "LAX",
      estimated: "08:35",
      status: "On Time"
    },
    {
      scheduled: "09:15",
      flight: "AA456",
      destination: "JFK",
      estimated: "09:20",
      status: "Delayed"
    },
    {
      scheduled: "10:00",
      flight: "DL789",
      destination: "ORD",
      estimated: "10:00",
      status: "Boarding"
    },
    {
      scheduled: "10:45",
      flight: "SW234",
      destination: "LAS",
      estimated: "10:45",
      status: "On Time"
    },
    {
      scheduled: "11:30",
      flight: "UA567",
      destination: "SFO",
      estimated: "11:40",
      status: "Delayed"
    },
    {
      scheduled: "12:15",
      flight: "AA890",
      destination: "MIA",
      estimated: "12:15",
      status: "Gate Change"
    }
  ];

  useEffect(() => {
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
  }, [duration, onClose]);

  useEffect(() => {
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timeInterval);
  }, []);

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'on time':
        return '#28a745';
      case 'delayed':
        return '#dc3545';
      case 'boarding':
        return '#007bff';
      case 'gate change':
        return '#ffc107';
      default:
        return textColor;
    }
  };

  const formatTime = (time) => {
    return time.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
  };

  if (!image) return null;

  const popupStyles = {
    ...styles.popup,
    backgroundColor: customBgColor,
    fontFamily: textFont
  };

  const textStyles = {
    color: textColor,
    textShadow: textShadow ? '2px 2px 4px rgba(0,0,0,0.5)' : 'none'
  };

  const titleStyles = {
    ...textStyles,
    color: titleColor,
    fontSize: '24px',
    fontWeight: 'bold'
  };

  return (
    <div style={styles.overlay}>
      <div style={popupStyles}>
        {/* Top bar like browser tab */}
        <div style={styles.topBar}>
          <button onClick={onClose} style={styles.closeBtn}>
            <IoMdClose />
          </button>
        </div>

        {/* Flight Status Display */}
        <div style={styles.content}>
          {/* Header Section */}
          <div style={styles.header}>
            <div style={styles.leftHeader}>
              {/* Airline Icon Placeholder */}
              <div style={styles.airlineIcon}>
                ✈️
              </div>
              <div style={styles.headerText}>
                <h2 style={titleStyles}>
                  {displayType === 'departures' ? 
                    (appLabels.departures || 'DEPARTURES') : 
                    (appLabels.arrivals || 'ARRIVALS')
                  }
                </h2>
                <p style={textStyles}>Airport: {airportCode || 'N/A'}</p>
              </div>
            </div>
            <div style={styles.rightHeader}>
              <div style={styles.timeDisplay}>
                <span style={titleStyles}>{formatTime(currentTime)}</span>
              </div>
            </div>
          </div>

          {/* Flight Table */}
          <div style={styles.tableContainer}>
            <table style={styles.table}>
              <thead>
                <tr style={styles.tableHeader}>
                  <th style={{...styles.th, ...textStyles}}>
                    {appLabels.scheduled || 'SCHEDULED'}
                  </th>
                  <th style={{...styles.th, ...textStyles}}>
                    {appLabels.flight || 'FLIGHT'}
                  </th>
                  <th style={{...styles.th, ...textStyles}}>
                    {displayType === 'departures' ? 
                      (appLabels.destination || 'DESTINATION') : 
                      (appLabels.origin || 'ORIGIN')
                    }
                  </th>
                  <th style={{...styles.th, ...textStyles}}>
                    {appLabels.estimated || 'ESTIMATED'}
                  </th>
                  <th style={{...styles.th, ...textStyles}}>
                    {appLabels.status || 'STATUS'}
                  </th>
                </tr>
              </thead>
              <tbody>
                {sampleFlights.map((flight, index) => (
                  <tr 
                    key={index} 
                    style={{
                      ...styles.tableRow,
                      animation: transitionAnimation ? `fadeIn 0.5s ease-in-out ${index * 0.1}s` : 'none'
                    }}
                  >
                    <td style={{...styles.td, ...textStyles}}>{flight.scheduled}</td>
                    <td style={{...styles.td, ...textStyles, fontWeight: 'bold'}}>{flight.flight}</td>
                    <td style={{...styles.td, ...textStyles}}>{flight.destination}</td>
                    <td style={{...styles.td, ...textStyles}}>{flight.estimated}</td>
                    <td style={{
                      ...styles.td, 
                      color: getStatusColor(flight.status),
                      fontWeight: 'bold'
                    }}>
                      {flight.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* No Flights Message (if needed) */}
          {sampleFlights.length === 0 && (
            <div style={styles.noFlights}>
              <p style={textStyles}>
                {displayType === 'departures' ? 
                  (appLabels.noCurrentFlights || 'There are no current flights for this airport code') :
                  (appLabels.noFlights || 'There are no flights for this airport code')
                }
              </p>
            </div>
          )}
        </div>

        {/* Progress bar */}
        <div style={styles.progressWrapper}>
          <div style={{ ...styles.progressBar, width: `${progress}%` }}></div>
        </div>
      </div>
    </div>
  );
};

const styles = {
overlay: {
    position: "fixed",
    top: 0, left: 0,
    width: "100%", 
    height: "100%",
    background: "rgba(0,0,0,0.6)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2000,
    padding: "0",
  },
  popup: {
    width: "100%",
    height: "100%",
    background: "#fff",
    borderRadius: "0",           // remove rounded corners for full-screen
    boxShadow: "none",           // remove shadow
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
  },
  content: {
    flex: 1,
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    height: "100%",               // take full height
  },
  tableContainer: {
    flex: 1,
    overflow: "auto",
    width: "100%",                // full width
  },
    topBar: {
    background: "#f1f1f1",
    padding: "5px 10px",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    borderBottom: "1px solid #ccc",
  },
  closeBtn: {
    border: "none",
    background: "transparent",
    fontSize: "18px",
    cursor: "pointer",
    padding: "5px",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "30px",
    borderBottom: "2px solid #005481",
    paddingBottom: "15px",
  },
  leftHeader: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
  },
  airlineIcon: {
    fontSize: "40px",
    width: "60px",
    height: "60px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#005481",
    borderRadius: "50%",
    color: "white",
  },
  headerText: {
    display: "flex",
    flexDirection: "column",
  },
  rightHeader: {
    textAlign: "right",
  },
  timeDisplay: {
    fontSize: "28px",
    fontWeight: "bold",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    backgroundColor: "rgba(255,255,255,0.9)",
  },
  tableHeader: {
    backgroundColor: "#005481",
  },
  th: {
    padding: "12px 8px",
    textAlign: "left",
    color: "white",
    fontWeight: "bold",
    borderBottom: "2px solid #003d5c",
  },
  tableRow: {
    borderBottom: "1px solid #ddd",
    transition: "background-color 0.3s ease",
  },
  td: {
    padding: "12px 8px",
    fontSize: "16px",
    borderRight: "1px solid #eee",
  },
  noFlights: {
    textAlign: "center",
    padding: "40px",
    fontSize: "18px",
  },
  progressWrapper: {
    height: "6px",
    background: "#eee",
    width: "100%",
  },
  progressBar: {
    height: "100%",
    background: "#005481",
    transition: "width 0.1s linear",
  },
};

// Add keyframes for animation
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;
document.head.appendChild(styleSheet);

export default FlightStatusPopUp;