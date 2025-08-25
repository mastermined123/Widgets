import React from "react";
import { FaGlobe, FaDatabase } from "react-icons/fa";

const CommonCard = ({ 
  title, 
  showWorldIcon = false, 
  showDatabaseIcon = false, 
  textContainer, 
  imageSrc 
}) => {


    
  return (
    <div style={styles.card}>
      <div style={styles.navbar}>
        <span style={styles.title}>{title}</span>
        <div style={styles.icons}>
          {showWorldIcon && <FaGlobe style={styles.icon} />}
          {showDatabaseIcon && <FaDatabase style={styles.icon} />}
        </div>
      </div>

      {textContainer && (
        <div style={styles.textContainer}>
          {textContainer}
        </div>
      )}


      {imageSrc && (
        <img src={imageSrc} alt={title} style={styles.image} />
      )}
    </div>
  );
};

const styles = {
  card: {
    cursor:'pointer',

    // border: "1px solid #ddd",
    // borderRadius: "8px",
    // overflow: "hidden",
    // boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
    // width: "100%",
    // backgroundColor: "white",

  },
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "5px 10px",
    borderBottom: "1px solid #eee",
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontWeight: "bold",
    fontSize: "12px",
  },
  icons: {
    display: "flex",
    gap: "9px"
  },
  icon: {
    fontSize: "10px",
    color: "#555",
    cursor: "pointer"
  },
  textContainer: {
    padding: "6px 10px",
    backgroundColor: "lightgreen",
    fontSize: "10px",
    textAlign:'center',
  },
  image: {
    width: "100%",
    height: "120px",
    objectFit: "cover"
  }
};

export default CommonCard;
