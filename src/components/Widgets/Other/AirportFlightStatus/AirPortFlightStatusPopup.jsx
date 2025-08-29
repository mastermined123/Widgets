/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { MdFlightTakeoff } from "react-icons/md";

const AirPortFlightStatusPopUp = ({ 
  onClose, 
  settings = {}
}) => {
  const {
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
    appBackgroundImage,
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
  } = settings;

  const [currentTime, setCurrentTime] = useState(new Date());
  const [currentDate, setCurrentDate] = useState(new Date());

  // Sample flight data matching your image
  const sampleFlights = [
    {
      time: "2:05 AM",
      destination: "Athens",
      airline: "OZ6977",
      flight: "OZ6977",
      terminal: "A",
      gate: "-",
      status: "Arrived"
    },
{
      time: "3:35 AM",
      destination: "Dubai",
      airline: "OEWK-543",
      flight: "KMJH-4322",
      terminal: "B",
      gate: "-",
      status: "Landed"
    },
{
      time: "12:25 AM",
      destination: "Australia",
      airline: "MKLK-543",
      flight: "QWE-4322",
      terminal: "A",
      gate: "-",
      status: "Taxiing"
    },

    {
      time: "2:10 AM",
      destination: "Manchester",
      airline: "NZ4285",
      flight: "NZ4285",
      terminal: "A",
      gate: "-",
      status: "Cancelled"
    },
    {
      time: "2:10 AM",
      destination: "Dammam",
      airline: "NH6366",
      flight: "NH6366",
      terminal: "A",
      gate: "-",
      status: "Scheduled"
    },
    {
      time: "2:10 AM",
      destination: "lesburg - O.R. Tambo International",
      airline: "MU4389",
      flight: "MU4389",
      terminal: "A",
      gate: "-",
      status: "Gate Change"
    },
    {
      time: "2:10 AM",
      destination: "Milano Malpensa Airport",
      airline: "JU8704",
      flight: "JU8704",
      terminal: "A",
      gate: "-",
      status: "Boarding"
    },
    {
      time: "2:10 AM",
      destination: "urt am Main - Frankfurt Airport",
      airline: "Fr",
      flight: "UX2707",
      terminal: "A",
      gate: "-",
      status: "Delayed"
    }
  ];

  useEffect(() => {
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date());
      setCurrentDate(new Date());
    }, 1000);
    return () => clearInterval(timeInterval);
  }, []);

  const formatTime = (time) => {
    if (timeFormat === "24H") {
      return time.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: false 
      });
    } else {
      return time.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
      });
    }
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusColor = (status) => {
    if (disableStatusBoxesColors) return flightTextFontColor || "#000000";
    
    switch (status.toLowerCase()) {
      case 'scheduled':
        return '#28a745';
      case 'delayed':
        return '#dc3545';
      case 'boarding':
        return '#007bff';
      case 'gate change':
        return '#ffc107';
      case 'arrived':
        return '#28a745';
      case 'cancelled':
        return '#dc3545';
      case 'landed':
        return '#28a745';
      case 'en route':
        return '#007bff';
      case 'taxiing':
        return '#ffc107';
      default:
        return flightTextFontColor || "#000000";
    }
  };

  const popupStyles = {
    ...styles.popup,
    backgroundColor: appBackgroundColor || "#ffffff",
    fontFamily: flightFontFamily || "Arial",
    backgroundImage: appBackgroundImage ? `url(${appBackgroundImage})` : undefined,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  const headerStyles = {
    fontFamily: headerFontFamily || "Arial",
    fontSize: headerFontSize ? `${headerFontSize}pt` : "24px",
    color: headerTextColor || "#000000",
    backgroundColor: headerBackgroundColor || "transparent",
  };

  const subtitleStyles = {
    fontFamily: subtitleFontFamily || "Arial",
    fontSize: subtitleFontSize ? `${subtitleFontSize}pt` : "18px",
    color: subtitlesTextColor || "#000000",
    backgroundColor: subtitlesBackgroundColor || "transparent",
  };

  const textStyles = {
    fontFamily: flightFontFamily || "Arial",
    fontSize: flightFontSize ? `${flightFontSize}pt` : "16px",
    color: flightTextFontColor || "#000000",
  };

  const getRowBackgroundColor = (index) => {
    if (flightsRowBackgroundColor1 && flightsRowBackgroundColor2) {
      return index % 2 === 0 ? flightsRowBackgroundColor1 : flightsRowBackgroundColor2;
    }
    return index % 2 === 0 ? "#f9f9f9" : "#ffffff";
  };

  return (
    <div style={styles.overlay}>
      <div style={popupStyles}>
        {/* Top bar */}
        <div style={styles.topBar}>
          <button onClick={onClose} style={styles.closeBtn}>
            <IoMdClose />
          </button>
        </div>

        {/* Main Content */}
        <div style={styles.content}>
          {/* Header Section */}
          <div style={{...styles.header, backgroundColor: headerBackgroundColor}}>

            <div style={{display:'flex',justifyContent:'center',    alignItems:'center',gap:'10px'}}>
              <MdFlightTakeoff size={100} />

            <h1 style={{...styles.title, ...headerStyles}}>
              {displayType === 'Departure' ? 
                (appLabels.Departures || 'Departures') : 
                (appLabels.Arrivals || 'Arrivals')
              }
            </h1>
            </div>

            <div style={styles.dateTimeRow}>
              <span style={{...styles.dateTimeLabel, ...subtitleStyles}}>Date:</span>
              <span style={{...styles.dateTimeValue, ...textStyles}}>{formatDate(currentDate)}</span>
            </div>
            <div style={styles.dateTimeRow}>
              <span style={{...styles.dateTimeLabel, ...subtitleStyles}}>Time:</span>
              <span style={{...styles.dateTimeValue, ...textStyles}}>{formatTime(currentTime)}</span>
            </div>
          </div>

          <div style={styles.divider}></div>

          {/* Flight Table */}
          <div style={styles.tableContainer}>
            <table style={styles.table}>
              <thead>
                <tr style={{...styles.tableHeader, backgroundColor: subtitlesBackgroundColor}}>
                  <th style={{...styles.th, ...subtitleStyles}}>{appLabels.Time || "Time"}</th>
                  <th style={{...styles.th, ...subtitleStyles}}>{appLabels.Destination || "Destination"}</th>
                  <th style={{...styles.th, ...subtitleStyles}}>{appLabels.Airline || "Airline"}</th>
                  <th style={{...styles.th, ...subtitleStyles}}>{appLabels.Flight || "Flight"}</th>
                  <th style={{...styles.th, ...subtitleStyles}}>{appLabels.Terminal || "Terminal"}</th>
                  <th style={{...styles.th, ...subtitleStyles}}>{appLabels.Gate || "Gate"}</th>
                  <th style={{...styles.th, ...subtitleStyles}}>{appLabels.Status || "Status"}</th>
                </tr>
              </thead>
              <tbody>
                {sampleFlights.map((flight, index) => (
                  <tr 
                    key={index} 
                    style={{
                      ...styles.tableRow,
                      backgroundColor: getRowBackgroundColor(index),
                    }}
                  >
                    <td style={{...styles.td, ...textStyles}}>{flight.time}</td>
                    <td style={{...styles.td, ...textStyles}}>{flight.destination}</td>
                    <td style={{...styles.td, ...textStyles}}>{flight.airline}</td>
                    <td style={{...styles.td, ...textStyles}}>{flight.flight}</td>
                    <td style={{
                      ...styles.td, 
                      ...textStyles,
                      color: terminalTextAndBorderColor,
                      borderColor: terminalTextAndBorderColor,
                      backgroundColor: terminalBackgroundColor
                    }}>
                      {flight.terminal}
                    </td>
                    <td style={{...styles.td, ...textStyles}}>{flight.gate}</td>
                    <td style={{
                      ...styles.td, 
                      color: getStatusColor(flight.status),
                      fontWeight: 'bold'
                    }}>
                      {appLabels[flight.status] || flight.status}
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
                {appLabels.NoFlightsAvailable || 'No flights available'}
              </p>
            </div>
          )}
        </div>

        {/* Loading Indicator */}
        <div style={styles.loadingContainer}>
          <div style={{
            ...styles.loadingIndicator,
            backgroundColor: loadingIndicatorColor || "#005481"
          }}></div>
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
    background: "rgba(0,0,0,0.6)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2000,
  },
  popup: {
    width: "100%",
    height: "100%",
    background: "#fff",
    boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
  },
  topBar: {
    display: "flex",
    justifyContent: "flex-end",
    padding: "10px",
    backgroundColor: "#f1f1f1",
  },
  closeBtn: {
    border: "none",
    background: "transparent",
    fontSize: "24px",
    cursor: "pointer",
  },
  content: {
    flex: 1,
    padding: "20px",
    overflow: "auto",
  },
  header: {
    // textAlign: "center",
    // marginBottom: "20px",
    // padding: "15px",
    // borderRadius: "5px",
    alignItems:'center',
    display:'flex',
    justifyContent:'space-around'
  },
  title: {
    margin: 0,
    fontSize: "32px",
    fontWeight: "bold",
  },
  dateTimeSection: {
    marginBottom: "20px",
  },
  dateTimeRow: {
    display: "flex",
    marginBottom: "10px",
  },
  dateTimeLabel: {
    fontWeight: "bold",
    minWidth: "60px",
    marginRight: "10px",
  },
  dateTimeValue: {
    fontWeight: "normal",
  },
  divider: {
    height: "1px",
    backgroundColor: "#ddd",
    margin: "20px 0",
  },
  tableContainer: {
    overflow: "auto",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  tableHeader: {
    borderBottom: "2px solid #ddd",
  },
  th: {
    padding: "12px 8px",
    textAlign: "left",
    fontWeight: "bold",
  },
  tableRow: {
    borderBottom: "1px solid #eee",
  },
  td: {
    padding: "12px 8px",
    border: "1px solid #eee",
  },
  noFlights: {
    textAlign: "center",
    padding: "40px",
  },
  loadingContainer: {
    padding: "10px",
    backgroundColor: "#f1f1f1",
  },
  loadingIndicator: {
    height: "4px",
    width: "100%",
    borderRadius: "2px",
    animation: "loading 2s infinite",
  },
};

// Add keyframes for animation
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = `
  @keyframes loading {
    0% { width: 0%; }
    50% { width: 70%; }
    100% { width: 100%; }
  }
`;
document.head.appendChild(styleSheet);

export default AirPortFlightStatusPopUp;