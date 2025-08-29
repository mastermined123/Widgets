/* eslint-disable no-unused-vars */
import React from "react";
import { GiAmericanFootballHelmet } from "react-icons/gi";
import { IoIosFootball, IoMdClose } from "react-icons/io";
import { IoFootball } from "react-icons/io5";
import { RiFootballLine } from "react-icons/ri";

const SoccerLeaugueTablePopUp = ({
  onClose,
  isScoreWidgetTwo = false,
  settings = {},
}) => {
  const {
    appName,
    tags,
    title,
    subtitle,
    group,
    firstTeamScore,
    secondTeamScore,
    thirdTeamScore,
    fourthTeamScore,
    fifthTeamScore,
    language,
    championshipLogo,
    customBackgroundImage,
  } = settings;



const teams = [
  { 
    position: 1,
    name: "Liverpool", 
    matchesPlayed: 12, 
    wins: 10, 
    draws: 1, 
    losses: 1, 
    goalsFor: 30, 
    goalsAgainst: 9, 
    goalsDifference: 21, 
    points: 31,
    icon: <IoIosFootball />
  },
  { 
    position: 2,
    name: "FC Barcelona", 
    matchesPlayed: 12, 
    wins: 9, 
    draws: 2, 
    losses: 1, 
    goalsFor: 27, 
    goalsAgainst: 10, 
    goalsDifference: 17, 
    points: 29,
    icon: <IoIosFootball />
  },
  { 
    position: 3,
    name: "Real Madrid", 
    matchesPlayed: 12, 
    wins: 9, 
    draws: 1, 
    losses: 2, 
    goalsFor: 26, 
    goalsAgainst: 12, 
    goalsDifference: 14, 
    points: 28,
    icon: <IoIosFootball />
  },
  { 
    position: 4,
    name: "Manchester City", 
    matchesPlayed: 12, 
    wins: 8, 
    draws: 2, 
    losses: 2, 
    goalsFor: 25, 
    goalsAgainst: 11, 
    goalsDifference: 14, 
    points: 26,
    icon: <IoIosFootball />
  },
  { 
    position: 5,
    name: "Bayern Munich", 
    matchesPlayed: 12, 
    wins: 7, 
    draws: 3, 
    losses: 2, 
    goalsFor: 29, 
    goalsAgainst: 15, 
    goalsDifference: 14, 
    points: 24,
    icon: <IoIosFootball />
  },
];

  return (
    <div style={styles.overlay}>
      <div
        style={{
          ...styles.popup,
          backgroundImage: customBackgroundImage ? `url(${customBackgroundImage})` : null,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Top bar */}
        <div style={styles.topBar}>
          <button onClick={onClose} style={styles.closeBtn}>
            <IoMdClose />
          </button>
        </div>

        {/* Header Section */}
        <div style={styles.headerSection}>
          {/* Championship Logo */}
          {championshipLogo && (
            <div style={styles.logoContainer}>
              <img src={championshipLogo} alt="Championship Logo" style={styles.logo} />
            </div>
          )}
          
          {/* Title and Subtitle */}
          <div style={styles.titleContainer}>
            <div style={styles.titleBox}>
              <h1 style={styles.mainTitle}>
                {title || "COPA AMERICA LEAGUE"}
              </h1>
            </div>
            {subtitle && (
              <div style={styles.subtitleBox}>
                <h2 style={styles.subtitle}>
                  {subtitle}
                </h2>
              </div>
            )}
          </div>
        </div>

        {/* Group Header */}
        <div style={styles.groupHeader}>
          <span style={styles.hash}>#</span>
          <span style={styles.groupText}>GROUP {group || "1"}</span>
          <span style={styles.statLabels}>MP</span>
          <span style={styles.statLabels}>W</span>
          <span style={styles.statLabels}>D</span>
          <span style={styles.statLabels}>L</span>
          <span style={styles.statLabels}>F</span>
          <span style={styles.statLabels}>A</span>
          <span style={styles.statLabels}>GD</span>
          <span style={styles.statLabels}>Pts</span>
        </div>

        {/* Teams Table */}
        <div style={styles.teamsContainer}>
          {teams.map((team, index) => (
            <div key={index} style={styles.teamRow}>
              <span style={styles.position}>{team.position}</span>
              <div style={styles.teamInfo}>
                <span style={styles.teamIcon}>{team.icon}</span>
                <span style={styles.teamName}>{team.name}</span>
              </div>
              <span style={styles.stat}>{team.matchesPlayed}</span>
              <span style={styles.stat}>{team.wins}</span>
              <span style={styles.stat}>{team.draws}</span>
              <span style={styles.stat}>{team.losses}</span>
              <span style={styles.stat}>{team.goalsFor}</span>
              <span style={styles.stat}>{team.goalsAgainst}</span>
              <span style={styles.stat}>{team.goalsDifference}</span>
              <span style={styles.pointsStat}>{team.points}</span>
            </div>
          ))}
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
    borderRadius: "15px",
    boxShadow: "0px 10px 30px rgba(0,0,0,0.5)",
    overflowY: "auto",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    position: "relative",
    backgroundColor: "rgba(0,0,0,0.8)",
  },
  topBar: {
    display: "flex",
    justifyContent: "flex-end",
    marginBottom: "20px",
  },
  closeBtn: {
    border: "none",
    background: "transparent",
    fontSize: "28px",
    cursor: "pointer",
    color: "#fff",
  },
  headerSection: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "30px",
    position: "relative",
  },
  logoContainer: {
    position: "absolute",
    left: "0",
    top: "50%",
    transform: "translateY(-50%)",
  },
  logo: {
    width: "60px",
    height: "60px",
    objectFit: "contain",
  },
  titleContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  titleBox: {
    backgroundColor: "#d32f2f",
    padding: "10px 30px",
    borderRadius: "5px",
    marginBottom: "5px",
  },
  mainTitle: {
    color: "#fff",
    fontSize: "24px",
    fontWeight: "bold",
    margin: "0",
    textAlign: "center",
  },
  subtitleBox: {
    backgroundColor: "#fff",
    padding: "5px 20px",
    borderRadius: "5px",
  },
  subtitle: {
    color: "#d32f2f",
    fontSize: "16px",
    fontWeight: "bold",
    margin: "0",
    textAlign: "center",
  },
  groupHeader: {
    display: "grid",
    gridTemplateColumns: "40px 1fr 50px 50px 50px 50px 50px 50px 60px 60px",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.3)",
    padding: "15px 20px",
    borderRadius: "8px",
    marginBottom: "10px",
    color: "#fff",
    fontWeight: "bold",
    fontSize: "18px",
  },
  hash: {
    color: "#ffeb3b",
    fontSize: "24px",
    fontWeight: "bold",
  },
  groupText: {
    color: "#fff",
    fontSize: "20px",
    fontWeight: "bold",
  },
  statLabels: {
    textAlign: "center",
    fontSize: "16px",
    fontWeight: "bold",
  },
  teamsContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  teamRow: {
    display: "grid",
    gridTemplateColumns: "40px 1fr 50px 50px 50px 50px 50px 50px 60px 60px",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.1)",
    padding: "12px 20px",
    borderRadius: "8px",
    color: "#fff",
    fontSize: "16px",
  },
  position: {
    fontWeight: "bold",
    fontSize: "18px",
  },
  teamInfo: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  teamIcon: {
    fontSize: "20px",
  },
  teamName: {
    fontWeight: "500",
  },
  stat: {
    textAlign: "center",
    fontWeight: "500",
  },
  pointsStat: {
    textAlign: "center",
    fontWeight: "bold",
    color: "#ffeb3b",
    fontSize: "18px",
  },
};

export default SoccerLeaugueTablePopUp;