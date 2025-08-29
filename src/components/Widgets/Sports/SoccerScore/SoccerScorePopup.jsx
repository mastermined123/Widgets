import React, { useState, useEffect } from "react";
import { IoMdClose } from "react-icons/io";

const SoccerScorePopUp = ({ 
  onClose,
  intervalBetweenFixtures,
  leagueCup,
  customLeagueName,
  transition,
  round,
  textFont,
  textColor,
  textShadow,
  backgroundColor,
  backgroundImage,
  tableCellColor,
  animateBackgroundImage,
  hideBackgroundImage,
  language,
  appLabels,
  isScoreWidgetTwo = false,
}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [animationClass, setAnimationClass] = useState("");

  // Sample match data - La Liga style
  const matchData = [
    { team1: "GRA", team1Logo: "🏆", score1: "1", score2: "2", team2Logo: "⚽", team2: "ESP" },
    { team1: "GIJ", team1Logo: "🟠", score1: "2", score2: "2", team2Logo: "🟢", team2: "BET" },
    { team1: "CDL", team1Logo: "🟡", score1: "1", score2: "1", team2Logo: "🔵", team2: "ALA" },
    { team1: "DEP", team1Logo: "🔴", score1: "3", score2: "0", team2Logo: "🟡", team2: "LAP" },
    { team1: "SEV", team1Logo: "⭐", score1: "5", score2: "0", team2Logo: "🔴", team2: "OSA" },
    { team1: "ATL", team1Logo: "🟥", score1: "3", score2: "1", team2Logo: "🔵", team2: "ATH" },
    { team1: "VAL", team1Logo: "🟠", score1: "1", score2: "3", team2Logo: "🟡", team2: "VIL" },
    { team1: "CEL", team1Logo: "🔵", score1: "2", score2: "2", team2Logo: "⚪", team2: "RSO" },
    { team1: "BAR", team1Logo: "🔴", score1: "4", score2: "2", team2Logo: "🔵", team2: "EIB" },
    { team1: "MAL", team1Logo: "🟡", score1: "0", score2: "2", team2Logo: "⚪", team2: "RMA" }
  ];

  const matchesPerPage = 5;
  const totalPages = Math.ceil(matchData.length / matchesPerPage);
  const currentMatches = matchData.slice(currentPage * matchesPerPage, (currentPage + 1) * matchesPerPage);

  useEffect(() => {
    if (totalPages <= 1) return;
    
    const interval = setInterval(() => {
      // Apply exit animation
      setAnimationClass(getExitAnimation());
      
      setTimeout(() => {
        setCurrentPage(prev => (prev + 1) % totalPages);
        // Apply enter animation
        setAnimationClass(getEnterAnimation());
        
        setTimeout(() => {
          setAnimationClass("");
        }, 500);
      }, 250);
    }, parseInt(intervalBetweenFixtures) * 1000 || 5000);

    return () => clearInterval(interval);
  }, [intervalBetweenFixtures, totalPages]);

  const getExitAnimation = () => {
    switch(transition) {
      case "Slide from left": return "slideOutLeft";
      case "Slide from Right": return "slideOutRight";
      case "Slide Top": return "slideOutTop";
      case "Slide From Bottom": return "slideOutBottom";
      case "Fade": return "fadeOut";
      default: return "";
    }
  };

  const getEnterAnimation = () => {
    switch(transition) {
      case "Slide from left": return "slideInLeft";
      case "Slide from Right": return "slideInRight";
      case "Slide Top": return "slideInTop";
      case "Slide From Bottom": return "slideInBottom";
      case "Fade": return "fadeIn";
      default: return "";
    }
  };

  const getBackgroundStyle = () => {
    if (hideBackgroundImage) {
      return { backgroundColor: backgroundColor || "#f0f0f0" };
    }
    
    if (backgroundImage) {
      return {
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        animation: animateBackgroundImage ? 'backgroundPan 20s infinite linear' : 'none'
      };
    }
    
    return { backgroundColor: backgroundColor || "#f0f0f0" };
  };

  const displayTitle = customLeagueName || leagueCup || "La Liga";
  const displayRound = appLabels.round || round || "38 round";

  return (
    <div style={styles.overlay}>
      <div style={{
        ...styles.popup,
        ...getBackgroundStyle()
      }}>
        {/* Top bar */}
        <div style={styles.topBar}>
          <button onClick={onClose} style={styles.closeBtn}>
            <IoMdClose />
          </button>
        </div>

        {/* Content */}
        <div style={styles.content}>
          {/* Header */}
          <div style={styles.header}>
            <h1 style={{
              ...styles.title,
              fontFamily: textFont || 'Arial, sans-serif',
              color: textColor || '#333',
              textShadow: textShadow ? '2px 2px 4px rgba(0,0,0,0.5)' : 'none'
            }}>
              {displayTitle} - {appLabels.sample || "Sample"}
            </h1>
            <p style={{
              ...styles.roundText,
              fontFamily: textFont || 'Arial, sans-serif',
              color: textColor || '#666',
              textShadow: textShadow ? '1px 1px 2px rgba(0,0,0,0.3)' : 'none'
            }}>
              {displayRound}
            </p>
          </div>

          {/* Match Table */}
          <div style={{
            ...styles.matchTable,
            ...getAnimationClass(animationClass)
          }}>
            {currentMatches.map((match, index) => (
              <div key={index} style={{
                ...styles.matchRow,
                backgroundColor: tableCellColor || 'rgba(255,255,255,0.9)'
              }}>
                <div style={styles.teamSection}>
                  <span style={styles.teamCode}>{match.team1}</span>
                  <span style={styles.teamLogo}>{match.team1Logo}</span>
                </div>
                
                <div style={styles.scoreSection}>
                  <span style={styles.score}>{match.score1}</span>
                </div>
                
                <div style={styles.vsSection}>
                  <span style={styles.vs}>x</span>
                </div>
                
                <div style={styles.scoreSection}>
                  <span style={styles.score}>{match.score2}</span>
                </div>
                
                <div style={styles.teamSection}>
                  <span style={styles.teamLogo}>{match.team2Logo}</span>
                  <span style={styles.teamCode}>{match.team2}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Logo */}
          <div style={styles.bottomLogo}>
            <div style={styles.logoContainer}>
              <div style={styles.logoCircle}>
                <span style={styles.logoText}>UOL</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <style>{`
        @keyframes slideInLeft {
          from { transform: translateX(-100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOutLeft {
          from { transform: translateX(0); opacity: 1; }
          to { transform: translateX(-100%); opacity: 0; }
        }
        @keyframes slideInRight {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOutRight {
          from { transform: translateX(0); opacity: 1; }
          to { transform: translateX(100%); opacity: 0; }
        }
        @keyframes slideInTop {
          from { transform: translateY(-100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes slideOutTop {
          from { transform: translateY(0); opacity: 1; }
          to { transform: translateY(-100%); opacity: 0; }
        }
        @keyframes slideInBottom {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes slideOutBottom {
          from { transform: translateY(0); opacity: 1; }
          to { transform: translateY(100%); opacity: 0; }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fadeOut {
          from { opacity: 1; }
          to { opacity: 0; }
        }
        @keyframes backgroundPan {
          0% { background-position: 0% 0%; }
          25% { background-position: 100% 0%; }
          50% { background-position: 100% 100%; }
          75% { background-position: 0% 100%; }
          100% { background-position: 0% 0%; }
        }
      `}</style>
    </div>
  );
};

const getAnimationClass = (animationClass) => {
  const animationMap = {
    slideInLeft: { animation: 'slideInLeft 0.5s ease-out' },
    slideOutLeft: { animation: 'slideOutLeft 0.25s ease-in' },
    slideInRight: { animation: 'slideInRight 0.5s ease-out' },
    slideOutRight: { animation: 'slideOutRight 0.25s ease-in' },
    slideInTop: { animation: 'slideInTop 0.5s ease-out' },
    slideOutTop: { animation: 'slideOutTop 0.25s ease-in' },
    slideInBottom: { animation: 'slideInBottom 0.5s ease-out' },
    slideOutBottom: { animation: 'slideOutBottom 0.25s ease-in' },
    fadeIn: { animation: 'fadeIn 0.5s ease-out' },
    fadeOut: { animation: 'fadeOut 0.25s ease-in' }
  };
  
  return animationMap[animationClass] || {};
};

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.8)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2000,
  },
  popup: {
    width: "100%",
    height: "100%",
    borderRadius: "15px",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    position: "relative",
    object: 'cover',
  },
  topBar: {
    position: "absolute",
    top: "10px",
    right: "10px",
    zIndex: 10
  },
  closeBtn: {
    border: "none",
    background: "rgba(0,0,0,0.6)",
    fontSize: "24px",
    cursor: "pointer",
    color: "#fff",
    borderRadius: "50%",
    width: "40px",
    height: "40px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  content: {
    flex: 1,
    padding: "40px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    background: "rgba(0,0,0,0.3)"
  },
  header: {
    textAlign: "center",
    marginBottom: "40px"
  },
  title: {
    fontSize: "48px",
    fontWeight: "bold",
    margin: "0 0 10px 0",
    textTransform: "uppercase"
  },
  roundText: {
    fontSize: "24px",
    margin: "0",
    fontWeight: "500"
  },
  matchTable: {
    width: "100%",
    maxWidth: "800px",
    display: "flex",
    flexDirection: "column",
    gap: "8px"
  },
  matchRow: {
    display: "flex",
    alignItems: "center",
    padding: "12px 20px",
    borderRadius: "6px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
  },
  teamSection: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    flex: "1",
    justifyContent: "flex-start"
  },
  teamCode: {
    fontSize: "16px",
    fontWeight: "bold",
    color: "#333",
    minWidth: "40px"
  },
  teamLogo: {
    fontSize: "20px"
  },
  scoreSection: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minWidth: "40px"
  },
  score: {
    fontSize: "20px",
    fontWeight: "bold",
    color: "#333"
  },
  vsSection: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minWidth: "30px",
    margin: "0 10px"
  },
  vs: {
    fontSize: "18px",
    fontWeight: "bold",
    color: "#666"
  },
  bottomLogo: {
    position: "absolute",
    bottom: "20px",
    right: "20px"
  },
  logoContainer: {
    display: "flex",
    alignItems: "center",
    gap: "10px"
  },
  logoCircle: {
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    background: "linear-gradient(45deg, #ff6b35, #f7931e)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 4px 8px rgba(0,0,0,0.3)"
  },
  logoText: {
    color: "#fff",
    fontSize: "16px",
    fontWeight: "bold"
  }
};

export default SoccerScorePopUp;