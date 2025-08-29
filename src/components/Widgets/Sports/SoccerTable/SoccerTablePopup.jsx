/* eslint-disable no-unused-vars */
import React from "react";
import { GiAmericanFootballHelmet } from "react-icons/gi";
import { IoIosFootball, IoMdClose } from "react-icons/io";
import { IoFootball } from "react-icons/io5";
import { RiFootballLine } from "react-icons/ri";

const SoccerTablePopUp = ({
  onClose,
  isScoreWidgetTwo = false,
  settings = {},
  language = {},
}) => {
  const {
    appName,
    tags,
    showEachPage,
    teamsPerPage,
    league,
    customLeague,
    animation,
    textFont,
    textColor,
    textShadow,
    backgroundColor,
    backgroundImage,
    tableCellColor,
    tableHeaderColor,
    animateBgImage,
    hideBgImage,
  } = settings;

  const {
    appLabelTeams = "Teams",
    appLabelPoints = "Points",
    appLabelMatches = "Matches",
    appLabelWins = "Wins",
    appLabelRound = "Round",
    appLabelInfoNA = "Information not available",
    appLabelSample = "",
    language: currentLanguage,
  } = language;

  // Sample teams data for display
  const teams = [
    { name: "Team Alpha", points: 64, matches: 45, wins: 19, icon: <IoIosFootball /> },
    { name: "Team Beta", points: 62, matches: 22, wins: 19, icon: <IoFootball /> },
    { name: "Team Gamma", points: 58, matches: 44, wins: 15, icon: <RiFootballLine /> },
    { name: "Team Delta", points: 54, matches: 40, wins: 14, icon: <GiAmericanFootballHelmet /> },
  ];

  const appliedBgImage = hideBgImage ? null : backgroundImage;

  return (
    <div style={styles.overlay}>
      <div
        style={{
          ...styles.popup,
          backgroundColor: backgroundColor || "rgba(0,0,0,0.5)",
          backgroundImage: appliedBgImage ? `url(${appliedBgImage})` : undefined,
          backgroundSize: "cover",
          backgroundPosition: "center",
          fontFamily: textFont || "sans-serif",
          color: textColor || "#fff",
          textShadow: textShadow ? "1px 1px 2px rgba(0,0,0,0.8)" : "none",
        }}
      >
        {/* Top bar */}
        <div style={styles.topBar}>
          <button onClick={onClose} style={styles.closeBtn}>
            <IoMdClose />
          </button>
        </div>

        {/* Header */}
        <div style={styles.headerContainer}>
          <div style={styles.header}>
            <h1 style={styles.title}>{customLeague || league || "League Sample"}</h1>
            <span style={styles.round}>
               {teams[0]?.matches || 0} {appLabelRound}
            </span>
          </div>
        </div>

        {/* Table */}
        <table style={{ ...styles.table, borderColor: tableHeaderColor || "#fff" }}>
          <thead style={{ backgroundColor: tableHeaderColor || "rgba(255,255,255,0.2)" }}>
            <tr>
              <th>#</th>
              <th>{appLabelTeams}</th>
              <th>{appLabelPoints}</th>
              <th>{appLabelMatches}</th>
              <th>{appLabelWins}</th>
            </tr>
          </thead>
          <tbody>
            {teams.slice(0, teamsPerPage || teams.length).map((team, index) => (
              <tr
                key={index}
                style={{
                  backgroundColor: tableCellColor || "rgba(0,0,0,0.3)",
                  padding: "12px 20px",
                  margin: "5px 0",
                  borderRadius: "8px",
                }}
              >
                <td style={{ padding: "12px 10px" }}>{index + 1}</td>
<td style={{ display: "flex", alignItems: "center", gap: "10px", padding: "12px 10px" }}>
  {team.icon && (
    <span style={{ fontSize: "24px", color: "#fff" }}>
      {team.icon}
    </span>
  )}
  {team.name}
</td>
                <td style={{ padding: "12px 10px" }}>{team.points}</td>
                <td style={{ padding: "12px 10px" }}>{team.matches}</td>
                <td style={{ padding: "12px 10px" }}>{team.wins}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {animateBgImage && appliedBgImage && <div style={styles.animatedOverlay}></div>}
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
    borderRadius: "15px",
    boxShadow: "0px 10px 30px rgba(0,0,0,0.5)",
    overflowY: "auto",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    position: "relative",
  },
  topBar: {
    display: "flex",
    justifyContent: "flex-end",
    marginBottom: "15px",
  },
  closeBtn: {
    border: "none",
    background: "transparent",
    fontSize: "28px",
    cursor: "pointer",
    color: "#fff",
  },
  headerContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    marginBottom: "20px",
  },
  header: {
    textAlign: "center",
    backgroundColor: "rgba(128,128,128,0.5)",
    padding: "15px 30px",
    borderRadius: "10px",
    color: "#fff",
        width: "100%",

  },
  title: {
    fontSize: "28px",
    fontWeight: "bold",
    margin: "0",
  },
  round: {
    display: "block",
    fontSize: "16px",
    marginTop: "5px",
  },
  table: {
    width: "100%",
    borderCollapse: "separate",
    borderSpacing: "0 8px",
    color: "#fff",
    textAlign: "center",
    marginBottom: "20px",
    fontSize: "16px",
  },
  animatedOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(255,255,255,0.05)",
    animation: "moveBg 5s linear infinite",
  },
};

export default SoccerTablePopUp;
