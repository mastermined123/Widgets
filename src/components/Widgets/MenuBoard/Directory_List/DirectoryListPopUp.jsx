import React from 'react';

const DirectoryListPopUp = ({
  image,
  logo,
  appName,
  title,
  headerBgColor,
  textFont,
  titleFontSize,
  bodyFontSize,
  titleColor,
  textColor,
  directoryContent,
  disableRowShadow,
  tags,
  onClose
}) => {
  return (
    <div style={styles.overlay}>
      <div style={styles.popup}>
        {/* Close button */}
        <button style={styles.closeBtn} onClick={onClose}>
          ×
        </button>
        
        {/* Header section with logo */}
        <div style={{
          ...styles.header,
          backgroundColor: headerBgColor,
          fontFamily: textFont
        }}>
          {logo && (
            <img 
              src={logo} 
              alt="Logo" 
              style={styles.logo}
            />
          )}
        </div>

        {/* Main content area */}
        <div style={{
          ...styles.content,
          backgroundImage: image ? `url(${image})` : 'none',
          backgroundColor: image ? 'transparent' : '#ffffff',
          fontFamily: textFont,
          color: textColor,
          fontSize: `${bodyFontSize}px`
        }}>
          
          {/* Title */}
          <h4 style={{
            ...styles.title,
            color: titleColor,
            fontSize: `${titleFontSize}px`,
            fontFamily: textFont
          }}>
            {title || 'Directory Title'}
          </h4>

          {/* Directory Content */}
          <div style={{
            ...styles.directoryContent,
            boxShadow: disableRowShadow ? 'none' : '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            {directoryContent ? (
              <pre style={styles.contentText}>
                {directoryContent}
              </pre>
            ) : (
              <p style={styles.placeholder}>
                No directory content provided
              </p>
            )}
          </div>

          {/* Tags display */}
          {tags && tags.length > 0 && (
            <div style={styles.tagsContainer}>
              {tags.map((tag, index) => (
                <span key={index} style={styles.tagDisplay}>
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000
  },
 popup: {
    width: "100vw",           
    height: "100vh",      
    background: "#fff",
    borderRadius: "0px",  
    boxShadow: "none",    
    overflow: "auto",     
    display: "flex",
    flexDirection: "column",
  },
  closeBtn: {
    position: 'absolute',
    top: '10px',
    right: '15px',
    background: 'none',
    border: 'none',
    fontSize: '24px',
    cursor: 'pointer',
    zIndex: 1001,
    color: '#666',
    fontWeight: 'bold'
  },
  header: {
    height: '60px',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    padding: '0 20px'
  },
  logo: {
    height: '40px',
    width: 'auto',
    objectFit: 'contain'
  },
  content: {
    height: 'calc(100% - 60px)',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    overflowY: 'auto',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
  },
  title: {
    textAlign: 'center',
    margin: '0 0 20px 0',
    fontWeight: 'bold'
  },
  directoryContent: {
    width: '100%',
    maxWidth: '500px',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: '8px',
    padding: '15px',
    marginBottom: '20px'
  },
  contentText: {
    whiteSpace: 'pre-wrap',
    margin: 0,
    fontFamily: 'inherit',
    fontSize: 'inherit',
    color: 'inherit'
  },
  placeholder: {
    margin: 0,
    fontStyle: 'italic',
    color: '#666'
  },
  tagsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
    justifyContent: 'center',
    marginTop: '10px'
  },
  tagDisplay: {
    padding: '4px 8px',
    backgroundColor: 'rgba(0, 84, 129, 0.1)',
    border: '1px solid #005481',
    borderRadius: '4px',
    fontSize: '12px',
    color: '#005481'
  }
};

export default DirectoryListPopUp;