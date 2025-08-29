import React from "react";
import { IoMdClose } from "react-icons/io";

const MatchScorePopUp = ({ 
  onClose, 
  title, 
  firstMatchScore, 
  secondMatchScore, 
  thirdMatchScore, 
  fourthMatchScore, 
  backgroundTheme, 
  championshipLogo, 
  customBgImage ,
  isScoreWidgetTwo = false,
}) => {
  // Background images for each theme
  const backgroundImages = {
    Baseball: "https://c4.wallpaperflare.com/wallpaper/411/915/693/baseball-mlb-yankees-york-wallpaper-preview.jpg",
    BasketBall: "https://c4.wallpaperflare.com/wallpaper/530/621/150/slam-dunk-basketball-comic-art-hd-wallpaper-preview.jpg",
    Soccer: "https://c4.wallpaperflare.com/wallpaper/859/452/942/galatasaray-soccer-sports-wallpaper-preview.jpg",
    Football: "https://c4.wallpaperflare.com/wallpaper/837/385/136/barcelona-fc-barcelona-stadium-camp-nou-wallpaper-preview.jpg"
  };

  // Parse match scores
  const parseMatchScore = (scoreString) => {
    if (!scoreString) return null;
    const parts = scoreString.split(',');
    if (parts.length !== 4) return null;
    
    return {
      team1: parts[0].trim(),
      score1: parts[1].trim(),
      team2: parts[2].trim(),
      score2: parts[3].trim()
    };
  };

  const matches = [
    parseMatchScore(firstMatchScore),
    parseMatchScore(secondMatchScore),
    parseMatchScore(thirdMatchScore),
    parseMatchScore(fourthMatchScore)
  ].filter(match => match !== null);

  const backgroundImage = customBgImage || backgroundImages[backgroundTheme] || backgroundImages.Baseball;

  return (
    <div style={styles.overlay}>
      <div style={{
        ...styles.popup,
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}>
        {/* Top bar like browser tab */}
        <div style={styles.topBar}>
          <button onClick={onClose} style={styles.closeBtn}>
            <IoMdClose />
          </button>
        </div>

        {/* Content */}
        <div style={styles.content}>
          {/* Title and Championship Logo */}
          <div style={styles.header}>
            {championshipLogo && (
              <img src={championshipLogo} alt="Championship Logo" style={styles.championshipLogo} />
            )}
            <h1 style={styles.title}>{title || "MYTHOLOGICAL LEAGUE"}</h1>
          </div>

          {/* Match Scores */}
          <div style={styles.scoresContainer}>
            {matches.map((match, index) => (
              <div key={index} style={styles.scoreCard}>
                <div style={styles.team}>
                  <span style={styles.teamName}>{match.team1}</span>
                  <span style={styles.teamScore}>{match.score1}</span>
                </div>
                <div style={styles.vs}>{isScoreWidgetTwo ? "x" : "-"}</div>
                <div style={styles.team}>
                  <span style={styles.teamName}>{match.team2}</span>
                  <span style={styles.teamScore}>{match.score2}</span>
                </div>
              </div>
            ))}
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
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
  },
  topBar: {
    background: "rgba(0,0,0,0.7)",
    padding: "10px",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  closeBtn: {
    border: "none",
    background: "transparent",
    fontSize: "20px",
    cursor: "pointer",
    color: "#fff",
  },
  content: {
    flex: 1,
    padding: "30px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    background: "rgba(0,0,0,0.5)",
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "40px",
    gap: "15px",
  },
  championshipLogo: {
    height: "60px",
    width: "auto",
  },
  title: {
    color: "#fff",
    fontSize: "32px",
    fontWeight: "bold",
    textShadow: "2px 2px 4px rgba(0,0,0,0.8)",
    margin: 0,
  },
  scoresContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    width: "100%",
    maxWidth: "600px",
  },
  scoreCard: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.7)",
    padding: "20px",
    borderRadius: "10px",
    border: "2px solid rgba(255,255,255,0.2)",
  },
  team: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    flex: 1,
  },
  teamName: {
    color: "#fff",
    fontSize: "18px",
    fontWeight: "bold",
    marginBottom: "10px",
    textShadow: "1px 1px 2px rgba(0,0,0,0.8)",
  },
  teamScore: {
    color: "#fff",
    fontSize: "24px",
    fontWeight: "bold",
    textShadow: "1px 1px 2px rgba(0,0,0,0.8)",
  },
  vs: {
    color: "#fff",
    fontSize: "20px",
    fontWeight: "bold",
    margin: "0 20px",
    textShadow: "1px 1px 2px rgba(0,0,0,0.8)",
  },
};

export default MatchScorePopUp;