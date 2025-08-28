import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";

const ConfigureNewsRssPopUp = ({ 
  appName,
  rssFeedUrl,
  showEachArticleFor,
  articleOptions,
  publicationDateFormat,
  textFont,
  backgroundColor,
  backgroundImage,
  animateArticleTransition,
  animateArticleImage,
  articleBarHeight,
  fontSize,
  displayCapitalizedText,
  topLeftCornerImage,
  bottomLeftCornerImage,
  bottomRightCornerImage,
  expectedViewportSize,
  numberOfPosts,
  tags,
  onClose 
}) => {
  const [progress, setProgress] = useState(0);
  const [currentArticleIndex, setCurrentArticleIndex] = useState(0);

  // Dummy RSS articles data
  const dummyArticles = [
    {
      title: "Breaking: Technology Advances in 2025",
      description: "Latest developments in artificial intelligence and machine learning are reshaping industries worldwide. Companies are investing heavily in AI research to stay competitive.",
      author: "Tech News Reporter",
      publishDate: "2025-08-27",
      imageUrl: "https://via.placeholder.com/400x200/4A90E2/FFFFFF?text=Tech+News",
      category: "Technology"
    },
    {
      title: "Global Climate Summit Announces New Initiatives",
      description: "World leaders gather to discuss sustainable energy solutions and environmental policies. New green technology initiatives are being implemented across major cities.",
      author: "Environmental Correspondent",
      publishDate: "2025-08-26",
      imageUrl: "https://via.placeholder.com/400x200/50C878/FFFFFF?text=Climate+News",
      category: "Environment"
    },
    {
      title: "Sports Championship Finals This Weekend",
      description: "The most anticipated championship of the year is set to take place this weekend. Teams from around the world will compete for the ultimate title.",
      author: "Sports Editor",
      publishDate: "2025-08-25",
      imageUrl: "https://via.placeholder.com/400x200/FF6B6B/FFFFFF?text=Sports+News",
      category: "Sports"
    },
    {
      title: "Economic Markets Show Positive Growth",
      description: "Financial analysts report steady growth in global markets. New investment opportunities are emerging in the technology and healthcare sectors.",
      author: "Finance Reporter",
      publishDate: "2025-08-24",
      imageUrl: "https://via.placeholder.com/400x200/FFD93D/000000?text=Finance+News",
      category: "Finance"
    }
  ];

  const displayArticles = numberOfPosts ? dummyArticles.slice(0, numberOfPosts) : dummyArticles;
  const currentArticle = displayArticles[currentArticleIndex] || displayArticles[0];

  useEffect(() => {
    const duration = showEachArticleFor || 5;
    if (!duration) return;
    let elapsed = 0;
    const interval = setInterval(() => {
      elapsed += 100;
      setProgress((elapsed / (duration * 1000)) * 100);
      if (elapsed >= duration * 1000) {
        // Move to next article or close
        if (currentArticleIndex < displayArticles.length - 1) {
          setCurrentArticleIndex(prev => prev + 1);
          setProgress(0);
          elapsed = 0;
        } else {
          clearInterval(interval);
          onClose && onClose();
        }
      }
    }, 100);
    return () => clearInterval(interval);
  }, [showEachArticleFor, onClose, currentArticleIndex, displayArticles.length]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    switch (publicationDateFormat) {
      case "DD/MM/YYYY":
        return date.toLocaleDateString("en-GB");
      case "YYYY-MM-DD":
        return date.toISOString().split('T')[0];
      case "DD MMM YYYY":
        return date.toLocaleDateString("en-GB", { day: '2-digit', month: 'short', year: 'numeric' });
      case "MMM DD, YYYY":
        return date.toLocaleDateString("en-US", { month: 'short', day: '2-digit', year: 'numeric' });
      default:
        return date.toLocaleDateString("en-US");
    }
  };

  const textTransform = displayCapitalizedText ? 'uppercase' : 'none';
  const transitionStyle = animateArticleTransition ? 'all 0.5s ease-in-out' : 'none';
  const imageAnimation = animateArticleImage ? 'pulse 2s infinite' : 'none';

  return (
    <div style={styles.overlay}>
      <div style={{
        ...styles.popup,
        backgroundColor: backgroundColor || '#ffffff',
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        fontFamily: textFont || 'Arial',
        fontSize: `${fontSize || 16}px`
      }}>
        {/* Top bar */}
        <div style={styles.topBar}>
          <span style={styles.appTitle}>{appName || "RSS News Feed"}</span>
          <button onClick={onClose} style={styles.closeBtn}>
            <IoMdClose />
          </button>
        </div>

        {/* Corner Images */}
        {topLeftCornerImage && (
          <img src={topLeftCornerImage} alt="Top Left" style={styles.topLeftImage} />
        )}
        {bottomLeftCornerImage && (
          <img src={bottomLeftCornerImage} alt="Bottom Left" style={styles.bottomLeftImage} />
        )}
        {bottomRightCornerImage && (
          <img src={bottomRightCornerImage} alt="Bottom Right" style={styles.bottomRightImage} />
        )}

        {/* Main Content */}
        <div style={styles.contentContainer}>
          
          {/* Article Bar */}
          <div style={{
            ...styles.articleBar,
            height: articleBarHeight ? `${articleBarHeight}px` : 'auto',
            textTransform: textTransform,
            transition: transitionStyle
          }}>
            <span style={styles.articleCounter}>
              Article {currentArticleIndex + 1} of {displayArticles.length}
            </span>
            <span style={styles.feedUrl}>
              {rssFeedUrl || "Sample RSS Feed"}
            </span>
          </div>

          {/* Article Content */}
          <div style={{
            ...styles.articleContent,
            transition: transitionStyle
          }}>
            
            {/* Article Image */}
            <div style={styles.imageSection}>
              <img 
                src={currentArticle.imageUrl} 
                alt={currentArticle.title}
                style={{
                  ...styles.articleImage,
                  animation: imageAnimation
                }}
              />
            </div>

            {/* Article Text */}
            <div style={styles.textSection}>
              <h2 style={{
                ...styles.articleTitle,
                textTransform: textTransform,
                fontSize: `${(fontSize || 16) * 1.5}px`
              }}>
                {currentArticle.title}
              </h2>

              <div style={styles.articleMeta}>
                <span style={styles.category}>{currentArticle.category}</span>
                <span style={styles.date}>{formatDate(currentArticle.publishDate)}</span>
                <span style={styles.author}>By {currentArticle.author}</span>
              </div>

              <p style={{
                ...styles.articleDescription,
                textTransform: textTransform
              }}>
                {currentArticle.description}
              </p>

              {/* Tags Display */}
              {tags && tags.length > 0 && (
                <div style={styles.tagsContainer}>
                  {tags.map((tag, index) => (
                    <span key={index} style={styles.tagDisplay}>
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div style={styles.progressWrapper}>
          <div style={{ ...styles.progressBar, width: `${progress}%` }}></div>
        </div>

        {/* Animations */}
        <style>{`
          @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.02); }
            100% { transform: scale(1); }
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
    width: "100vw",
    height: "100vh",
    background: "#fff",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    position: "relative"
  },
  topBar: {
    background: "#f1f1f1",
    padding: "12px 20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "2px solid #ddd",
    minHeight: "50px"
  },
  appTitle: {
    fontSize: "18px",
    fontWeight: "bold",
    color: "#333"
  },
  closeBtn: {
    border: "none",
    background: "transparent",
    fontSize: "24px",
    cursor: "pointer",
    color: "#666",
    padding: "8px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  topLeftImage: {
    position: "absolute",
    top: "60px",
    left: "20px",
    width: "80px",
    height: "80px",
    objectFit: "cover",
    borderRadius: "8px",
    zIndex: 10
  },
  bottomLeftImage: {
    position: "absolute",
    bottom: "40px",
    left: "20px",
    width: "80px",
    height: "80px",
    objectFit: "cover",
    borderRadius: "8px",
    zIndex: 10
  },
  bottomRightImage: {
    position: "absolute",
    bottom: "40px",
    right: "20px",
    width: "80px",
    height: "80px",
    objectFit: "cover",
    borderRadius: "8px",
    zIndex: 10
  },
  contentContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    margin: "20px",
    borderRadius: "12px",
    overflow: "hidden",
    boxShadow: "0 8px 32px rgba(0,0,0,0.1)"
  },
  articleBar: {
    background: "linear-gradient(135deg, #005481, #0066a1)",
    color: "#fff",
    padding: "15px 25px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontWeight: "bold"
  },
  articleCounter: {
    fontSize: "14px"
  },
  feedUrl: {
    fontSize: "12px",
    opacity: 0.8,
    maxWidth: "300px",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap"
  },
  articleContent: {
    flex: 1,
    display: "flex",
    padding: "30px",
    gap: "30px",
    alignItems: "center"
  },
  imageSection: {
    flex: "0 0 40%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  articleImage: {
    width: "100%",
    maxWidth: "500px",
    height: "300px",
    objectFit: "cover",
    borderRadius: "12px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.15)"
  },
  textSection: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "20px"
  },
  articleTitle: {
    margin: 0,
    color: "#222",
    fontWeight: "bold",
    lineHeight: 1.3
  },
  articleMeta: {
    display: "flex",
    gap: "15px",
    alignItems: "center",
    fontSize: "14px",
    color: "#666"
  },
  category: {
    backgroundColor: "#005481",
    color: "#fff",
    padding: "4px 12px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "bold"
  },
  date: {
    fontWeight: "500"
  },
  author: {
    fontStyle: "italic"
  },
  articleDescription: {
    margin: 0,
    color: "#444",
    lineHeight: 1.6,
    fontSize: "16px"
  },
  tagsContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
    marginTop: "10px"
  },
  tagDisplay: {
    backgroundColor: "#f0f8ff",
    color: "#005481",
    padding: "4px 10px",
    borderRadius: "15px",
    fontSize: "12px",
    fontWeight: "500"
  },
  progressWrapper: {
    height: "8px",
    background: "#eee",
    width: "100%"
  },
  progressBar: {
    height: "100%",
    background: "linear-gradient(90deg, #005481, #0066a1)",
    transition: "width 0.1s linear"
  }
};

export default ConfigureNewsRssPopUp;