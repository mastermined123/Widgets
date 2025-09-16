import React, { useState } from "react";
import { 
  FaCloudUploadAlt, 
  FaRocket, 
  FaDesktop, 
  FaFolder, 
  FaPollH, 
  FaLayerGroup, 
  FaBullseye, 
  FaFileAlt 
} from 'react-icons/fa';

const MediaCards = ({onAppClick}) => {

const baseURL = "https://dev.app.hd2.menu";

const cardData = [
  { 
    icon: FaCloudUploadAlt, 
    title: "Upload", 
    route: `${baseURL}/admin/admin_files/display/view/grid_view/all`, 
    color: "#e3f2fd" 
  },  
  { 
    icon: FaRocket, 
    title: "App", 
    color: "#f3e5f5", 
    onClick: () => onAppClick?.() 
  },  
  { 
    icon: FaDesktop, 
    title: "Campaign", 
    route: `https://hd2.dev.app.hd2.menu`, 
    color: "#e8f5e9" 
  },  
  { 
    icon: FaFolder, 
    title: "Composition", 
    route: `https://editor.app.hd2.menu/`, 
    color: "#fff3e0" 
  },  
  { 
    icon: FaPollH, 
    title: "Data Feed", 
    color: "#ede7f6" 
  },  
  { 
    icon: FaLayerGroup, 
    title: "Folder", 
    color: "#fce4ec" 
  },  
  { 
    icon: FaBullseye, 
    title: "Playlist", 
    color: "#ffebee" 
  },  
  { 
    icon: FaFileAlt, 
    title: "Audio Playlist", 
    color: "#e0f7fa" 
  }  
];




const [activeCard, setActiveCard] = useState(null); 



  return (
    <div className="container-fluid py-1 mt-2" style={{marginBottom:'10px'}}>
      <div style={styles.mediaCards}>
        {cardData.map((card, index) => {
          const IconComponent = card.icon;
          return (
<div
  key={index}
  style={{
    ...styles.mediaCard,
    backgroundColor: activeCard === card.title ? "#ffe6e6" : "white",
    border: activeCard === card.title ? "2px solid #d32f2f" : "none",
  }}
>
<div style={{ ...styles.cardIcon, backgroundColor: card.color }}>
  <IconComponent size={24} color="#555" /> {/* neutral dark icon */}
</div>

<button
  onClick={() => {
    setActiveCard(card.title);
    if (card.route) {
      window.location.href = card.route;
    } else {
      card.onClick?.();
    }
  }}
  style={{
    ...styles.addBtn,
    border: `2px solid ${card.color}`,
    backgroundColor:
      activeCard === card.title ? card.color : "white",
    color: activeCard === card.title ? "#000" : "#555",
    transition: "background-color 0.3s, color 0.3s",
  }}
  onMouseEnter={(e) => {
    if (activeCard !== card.title) {
      e.target.style.backgroundColor = card.color;
      e.target.style.color = "#000";
    }
  }}
  onMouseLeave={(e) => {
    if (activeCard !== card.title) {
      e.target.style.backgroundColor = "white";
      e.target.style.color = "#555";
    }
  }}
>
  <span style={{ marginRight: "5px" }}>+</span>
  {card.title}
</button>


            </div>
          );
        })}
      </div>
    </div>
  );
};

const styles = {
  mediaCards: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(125px, 1fr))',
    gap: '8px',
    padding: '0px 0',
    maxWidth: '1100px',
    margin: '0 auto'
  },
  mediaCard: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '5px 5px',
    borderRadius: '8px',
    backgroundColor: 'white',
    textAlign: 'center',
    transition: 'transform 0.2s',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    cursor: 'pointer',
  },
  cardIcon: {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    backgroundColor: '#d32f2f',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '10px',
    overflow: 'hidden'
  },
  addBtn: {
    padding: '5px 8px',
    border: '2px solid #d32f2f',
    borderRadius: '50px',
    color: '#d32f2f',
    cursor: 'pointer',
    fontSize: '11px',
    textDecoration: 'none',
    display: 'inline-block',
    background: 'white',
    transition: 'all 0.3s ease',
    outline: 'none'
  }
};

export default MediaCards;