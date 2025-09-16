import React, { useState } from "react";
import TopSearch from "./Navbar/TopSearch";
import CommonCard from "../Common/CommonCard";
import { Grid } from "@mui/material";
import CommonCardForm from "../Common/CommonCardForm";
  

const HomeContent = ({ categories, onClose }) => {
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [selectedCard, setSelectedCard] = useState(null);


   if (selectedCard) {
    return (
      <CommonCardForm
      categories={categories}
        card={selectedCard}
        onClose={() => setSelectedCard(null)}
        onBack={() => setSelectedCard(null)} 
      />
    );
  }



  return (
<>
    <TopSearch onClose={onClose} />

<div style={styles.container}>

      {/* Left Sidebar */}
      <div style={styles.sidebar}>
        {categories?.map((cat, index) => (
          <div
            key={index}
            style={{
              ...styles.categoryItem,
              backgroundColor: activeCategory?.id === cat.id ? "whitesmoke" : "white",
              color: activeCategory?.id === cat.id ? "#005481" : "#333",
              borderLeft: activeCategory?.id === cat.id ? "4px solid #005481" : "none",
            }}
            onClick={() => setActiveCategory(cat)}
          >
{cat.name}
          </div>
        ))}
      </div>

      <div style={styles.content}>

 <Grid container spacing={2}>
    {activeCategory?.cards?.map((card, index) => (
      <Grid item xs={12} sm={6} md={4} lg={4}  key={index}>
            <div onClick={() => setSelectedCard(card)}>
              <CommonCard
                title={card.title}
                showWorldIcon={card.showWorldIcon}
                showDatabaseIcon={card.showDatabaseIcon}
                textContainer={card.textContainer}
                imageSrc={card.imageSrc}
              />
            </div>
      </Grid>
    ))}
  </Grid>
      </div>
    </div>
    </>
  );
};

const styles = {
  container: {
    display: "flex",
    // width: "100%",
    // height: "400px",
    border: "1px solid #ddd",
    borderRadius: "8px",
  },
  sidebar: {
    width: "200px",
    borderRight: "1px solid #ddd",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#f5f5f5",
    overflowY: "auto",   
    overflowX: "hidden"
  },
  categoryItem: {
    padding: "10px 15px",
    cursor: "pointer",
    borderBottom: "1px solid #ddd",
    transition: "all 0.2s ease",
  },
  content: {
    flex: 1,
    padding: "20px",
    fontSize: "24px",
    fontWeight: "bold",
  },
};

export default HomeContent;
