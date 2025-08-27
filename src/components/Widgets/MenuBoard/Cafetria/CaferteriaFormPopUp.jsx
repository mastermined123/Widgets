import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";

const CafeTeriaFormPopUp = ({ 
  image, 
  duration, 
  onClose, 
  itemsFontColor, 
  mealFontColor, 
  highlightColor, 
  cardBgColor, 
  customBgColor, 
  textFont 
}) => {
  const [progress, setProgress] = useState(0);
  const [currentDayIndex, setCurrentDayIndex] = useState(0);

  // Sample meal data for each day
  const daysData = [
    {
      day: "Monday",
      breakfast: {
        title: "Breakfast",
        time: "7am - 9am",
        items: ["French Toast", "Boiled Eggs", "Fresh Fruits", "Orange Juice", "Coffee"]
      },
      lunch: {
        title: "Lunch",
        time: "12pm - 2pm",
        items: ["Rice and Beans", "Grilled Chicken", "Seasoned Salad", "Garlic Bread", "Soda"]
      },
      dinner: {
        title: "Dinner",
        time: "6pm - 8pm",
        items: ["Steak", "Mashed Potatoes", "Steamed Vegetables", "Dinner Rolls", "Iced Tea"]
      }
    },
    {
      day: "Tuesday",
      breakfast: {
        title: "Breakfast",
        time: "7am - 9am",
        items: ["Pancakes", "Scrambled Eggs", "Fresh Fruits", "Apple Juice", "Coffee"]
      },
      lunch: {
        title: "Lunch",
        time: "12pm - 2pm",
        items: ["Spaghetti", "Meatballs", "Caesar Salad", "Garlic Bread", "Lemonade"]
      },
      dinner: {
        title: "Dinner",
        time: "6pm - 8pm",
        items: ["Grilled Salmon", "Rice Pilaf", "Steamed Broccoli", "Dinner Rolls", "Iced Tea"]
      }
    },
    {
      day: "Wednesday",
      breakfast: {
        title: "Breakfast",
        time: "7am - 9am",
        items: ["Waffles", "Bacon", "Fresh Fruits", "Grape Juice", "Coffee"]
      },
      lunch: {
        title: "Lunch",
        time: "12pm - 2pm",
        items: ["Chicken Sandwich", "French Fries", "Coleslaw", "Cookie", "Soda"]
      },
      dinner: {
        title: "Dinner",
        time: "6pm - 8pm",
        items: ["Roast Beef", "Baked Potato", "Green Beans", "Dinner Rolls", "Iced Tea"]
      }
    },
    {
      day: "Thursday",
      breakfast: {
        title: "Breakfast",
        time: "7am - 9am",
        items: ["Omelette", "Sausage", "Fresh Fruits", "Pineapple Juice", "Coffee"]
      },
      lunch: {
        title: "Lunch",
        time: "12pm - 2pm",
        items: ["Beef Tacos", "Mexican Rice", "Refried Beans", "Churros", "Soda"]
      },
      dinner: {
        title: "Dinner",
        time: "6pm - 8pm",
        items: ["Baked Chicken", "Wild Rice", "Steamed Carrots", "Dinner Rolls", "Iced Tea"]
      }
    },
    {
      day: "Friday",
      breakfast: {
        title: "Breakfast",
        time: "7am - 9am",
        items: ["Cereal", "Yogurt", "Fresh Fruits", "Cranberry Juice", "Coffee"]
      },
      lunch: {
        title: "Lunch",
        time: "12pm - 2pm",
        items: ["Fish and Chips", "Tartar Sauce", "Garden Salad", "Brownie", "Soda"]
      },
      dinner: {
        title: "Dinner",
        time: "6pm - 8pm",
        items: ["Pizza", "Garlic Knots", "Antipasto Salad", "Ice Cream", "Soda"]
      }
    },
    {
      day: "Saturday",
      breakfast: {
        title: "Breakfast",
        time: "8am - 10am",
        items: ["French Toast", "Hash Browns", "Fresh Fruits", "Orange Juice", "Coffee"]
      },
      lunch: {
        title: "Lunch",
        time: "12pm - 2pm",
        items: ["Cheeseburgers", "Onion Rings", "Pasta Salad", "Cookie", "Milkshake"]
      },
      dinner: {
        title: "Dinner",
        time: "6pm - 8pm",
        items: ["Grilled Steak", "Baked Potato", "Corn on the Cob", "Cheesecake", "Iced Tea"]
      }
    },
    {
      day: "Sunday",
      breakfast: {
        title: "Breakfast",
        time: "8am - 10am",
        items: ["Pancakes", "Bacon", "Fresh Fruits", "Apple Juice", "Coffee"]
      },
      lunch: {
        title: "Lunch",
        time: "12pm - 2pm",
        items: ["Roast Chicken", "Mashed Potatoes", "Gravy", "Dinner Rolls", "Soda"]
      },
      dinner: {
        title: "Dinner",
        time: "6pm - 8pm",
        items: ["Lasagna", "Garlic Bread", "Ceasar Salad", "Tiramisu", "Iced Tea"]
      }
    }
  ];

  useEffect(() => {
    if (!duration) return;
    
    let elapsed = 0;
    const interval = setInterval(() => {
      elapsed += 100;
      setProgress((elapsed / (duration * 1000)) * 100);
      
      if (elapsed >= duration * 1000) {
        // Move to next day
        setCurrentDayIndex((prev) => (prev + 1) % daysData.length);
        setProgress(0);
        elapsed = 0;
      }
    }, 100);
    
    return () => clearInterval(interval);
  }, [duration, currentDayIndex]);

  const currentDay = daysData[currentDayIndex];

  return (
    <div style={styles.overlay}>
      <div style={{...styles.popup, backgroundColor: customBgColor, fontFamily: textFont}}>
        {/* Top bar like browser tab */}
        <div style={styles.topBar}>
          <button onClick={onClose} style={styles.closeBtn}>
            <IoMdClose />
          </button>
        </div>

        {/* Day Tabs */}
        <div style={styles.dayTabs}>
          {daysData.map((day, index) => (
            <div
              key={index}
              style={{
                ...styles.dayTab,
                ...(index === currentDayIndex ? styles.activeDayTab : {}),
                backgroundColor: index === currentDayIndex ? highlightColor : "#f1f1f1"
              }}
              onClick={() => setCurrentDayIndex(index)}
            >
              {day.day.substring(0, 3)}
            </div>
          ))}
        </div>

        {/* Content */}
        <div style={styles.content}>
          <h2 style={{...styles.dayTitle, color: itemsFontColor}}>
            {currentDay.day} Menu
          </h2>
          
          <div style={styles.cardsContainer}>
            {/* Breakfast Card */}
            <div style={{...styles.mealCard, backgroundColor: cardBgColor}}>
              <h3 style={{...styles.mealTitle, color: itemsFontColor}}>
                {currentDay.breakfast.title}
              </h3>
              <p style={{...styles.mealTime, color: itemsFontColor}}>
                {currentDay.breakfast.time}
              </p>
              <ul style={styles.mealItems}>
                {currentDay.breakfast.items.map((item, index) => (
                  <li key={index} style={{...styles.mealItem, color: mealFontColor}}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Lunch Card */}
            <div style={{...styles.mealCard, backgroundColor: cardBgColor}}>
              <h3 style={{...styles.mealTitle, color: itemsFontColor}}>
                {currentDay.lunch.title}
              </h3>
              <p style={{...styles.mealTime, color: itemsFontColor}}>
                {currentDay.lunch.time}
              </p>
              <ul style={styles.mealItems}>
                {currentDay.lunch.items.map((item, index) => (
                  <li key={index} style={{...styles.mealItem, color: mealFontColor}}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Dinner Card */}
            <div style={{...styles.mealCard, backgroundColor: cardBgColor}}>
              <h3 style={{...styles.mealTitle, color: itemsFontColor}}>
                {currentDay.dinner.title}
              </h3>
              <p style={{...styles.mealTime, color: itemsFontColor}}>
                {currentDay.dinner.time}
              </p>
              <ul style={styles.mealItems}>
                {currentDay.dinner.items.map((item, index) => (
                  <li key={index} style={{...styles.mealItem, color: mealFontColor}}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div style={styles.progressWrapper}>
          <div style={{ ...styles.progressBar, width: `${progress}%`, backgroundColor: highlightColor }}></div>
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
    width: "100vw",       // full browser width
    height: "100vh",      // full browser height
    background: "#fff",
    borderRadius: "0px",  // optional: remove rounding for full screen
    boxShadow: "none",    // optional: remove shadow
    overflow: "auto",     // scroll if content exceeds screen
    display: "flex",
    flexDirection: "column",
  },  topBar: {
    background: "#f1f1f1",
    padding: "8px 10px",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    borderBottom: "1px solid #ccc",
  },
  closeBtn: {
    border: "none",
    background: "transparent",
    fontSize: "18px",
    cursor: "pointer",
  },
  dayTabs: {
    display: "flex",
    justifyContent: "center",
    background: "#f1f1f1",
    padding: "10px 0",
    borderBottom: "1px solid #ddd",
  },
  dayTab: {
    padding: "8px 12px",
    margin: "0 5px",
    borderRadius: "4px",
    cursor: "pointer",
    fontWeight: "bold",
    minWidth: "60px",
    textAlign: "center",
  },
  activeDayTab: {
    color: "#fff",
  },
  content: {
    padding: "20px",
    flex: 1,
    overflowY: "auto",
  },
  dayTitle: {
    textAlign: "center",
    marginTop: 0,
    marginBottom: "20px",
    fontSize: "24px",
    fontWeight: "bold",
  },
  cardsContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: "20px",
  },
  mealCard: {
    flex: "1",
    minWidth: "250px",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
  },
  mealTitle: {
    marginTop: 0,
    marginBottom: "10px",
    textAlign: "center",
    fontSize: "20px",
    fontWeight: "bold",
  },
  mealTime: {
    textAlign: "center",
    marginTop: 0,
    marginBottom: "15px",
    fontSize: "14px",
    fontStyle: "italic",
  },
  mealItems: {
    paddingLeft: "20px",
    margin: 0,
  },
  mealItem: {
    marginBottom: "8px",
    fontSize: "14px",
  },
  progressWrapper: {
    height: "6px",
    background: "#eee",
    width: "100%",
  },
  progressBar: {
    height: "100%",
    transition: "width 0.1s linear",
  },
};

export default CafeTeriaFormPopUp;