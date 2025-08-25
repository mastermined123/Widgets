// CommonCardForm.jsx
import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import BirthdayAnnouncement from "../Widgets/Featured/Birthday/BirthdayAnnouncement";
import AmericanFootball from "../Widgets/Featured/American/AmericanFootbal";
import WeatherApp from "../Widgets/Weather/ModernWeatherForecast/WeatherApp";
import FormEntertainMent from "../Widgets/Entertainments/AmericanEnter1to5/FormEntertainMent1to5";
import FamousQuotes from "../Widgets/Entertainments/FamousQuotes/FamousQuotes";
import FinacneExchangeRate from "../Widgets/Finance/7DaysExchange/Exchange/7FinacneExchangeRate";
import ExchangeSellerTwo from "../Widgets/Finance/ExchangeSellerTwo/ExchangeSellerTwo";
import ExchangeRateForm from "../Widgets/Finance/ExchangeRate/ExchangeRateForm";
import AudioWidgetForm from "../Widgets/Other/AudioWidget/AudioWidgetForm";
import WeatherExchangeForm from "../Widgets/Other/WeatherExchange/WeatherExchangeForm";
import EmployeeForm from "../Widgets/Office/Employee/EmployeeForm";
import NewEmployee from "../Widgets/Office/NewEmployee/NewEmployee";
import CalendarAppForm from "../Widgets/Meeting_Room_Calendar/CalendarApp/CalendarAppForm";
import CafeTeriaForm from "../Widgets/MenuBoard/Cafetria/CafeteiraForm";
import AnalogRoundClockForm from "../Widgets/Clock/AnalogRoundClock/AnalogRoundClockForm";
import AnalogSquareClockForm from "../Widgets/Clock/AnalogSquareClock/AnalogSquareClockForm";
import DigitalClockSimpleForm from "../Widgets/Clock/DigitalClockSimple/DigitalClockSimpleForm";
//import ModernWeatherForecastForm from "../Widgets/Weather/ModernWeatherForecast/ModernWeatherForecastForm";
import ModernWeatherForecastTallandBarMain from "../Widgets/Weather/ModernWeatherForecastTallandBar/ModernWeatherForecastTallandBarMain";

const CommonCardForm = ({ categories, card, onClose, onBack }) => {
  if (!card) return null;




  const category = categories.find(cat =>
    cat.cards?.some(c => c.id === card.id)
  );

  console.log("2121", card.cardType);
const renderDynamicContent = () => {
  if (!category) return <p>Unknown Category</p>;

  switch (category.type) {
    case "featured":
      switch (card.cardType) {
        case "birthday_announcement":
          return <BirthdayAnnouncement card={card} />;
        case "american_football":
          return <AmericanFootball card={card} />;
        case "simple_weather_app":
          return <WeatherApp card={card} />;
        default:
          return (
           <AmericanFootball card={card} />
          );
      }


    case "clock":
      switch (card.cardType) {
        case "analog_round_clock":
          return <AnalogRoundClockForm card={card} />;
         case "analog_square_clock":
           return <AnalogSquareClockForm card={card} />;
        case "digital_clock_simple":
          return <DigitalClockSimpleForm card={card} />;
        default:
          return (
           <AmericanFootball card={card} />
          );
      }

    
     case "weather":
        switch (card.cardType) {
          case "modern_weather_forecast":
            return <WeatherApp card={card} />;
            case "modern_weather_forecast_tall_bar":
              return <ModernWeatherForecastTallandBarMain card={card} />;
          // case "digital_clock_simple":
          //   return <DigitalClockSimpleForm card={card} />;
          default:
            return (
             <AmericanFootball card={card} />
            );
        }

      case "entertainment":
          switch (card.cardType) {
              case "american_football_entertainment":
                  return <FormEntertainMent card={card} />;
              case "animal_facts":
                  return <FormEntertainMent card={card} />;
              case "baseball_curiosities":
                  return <FormEntertainMent card={card} />;
              case "basketball":
                  return <FormEntertainMent card={card} />;
              case "cricket_facts":
                  return <FormEntertainMent card={card} />;
              case "famous_quotes_1":
                  return <FamousQuotes card={card} />;
              case "famous_quotes_2":
                  return <FamousQuotes card={card} />;
              case "famous_quotes_3":
                  return <FamousQuotes card={card} />;
              case "health_tips":
                  return <FormEntertainMent card={card} />;
              case "ice_hockey_facts":
                  return <FormEntertainMent card={card} />;
              case "quiz_trivia":
                  return <FormEntertainMent card={card} />;
              case "rugby_facts":
                  return <FormEntertainMent card={card} />;
              case "scientific_curiosities":
                  return <FormEntertainMent card={card} />;
              case "today_in_history":
                  return <FormEntertainMent card={card} />;
              case "travel":
                  return <FormEntertainMent card={card} />;
              case "upcoming_movies":
                  return <FormEntertainMent card={card} />;
              case "volleyball":
                  return <FormEntertainMent card={card} />;
              default:
                  return (
           <AmericanFootball card={card} />
                  );
          }
   case "finance":
          switch (card.cardType) {
              case "seven_days_exchange_rate":
                  return <FinacneExchangeRate card={card} />;
              case "currency_exchange_scroller":
                  return <ExchangeSellerTwo card={card} />;
              case "exchange_rate":
                  return <ExchangeRateForm card={card} />;
              default:
                  return (
           <AmericanFootball card={card} />
                  );
          }

    case "other":
      switch (card.cardType) {
        case "audio_announcement_app":
          return <AudioWidgetForm card={card} />;
        case "weather_exchange_ticker":
          return <WeatherExchangeForm card={card} />;
        default:
          return (
          <AmericanFootball card={card} />
          );
      }

    case "office":
      switch (card.cardType) {
        case "employee_of_the_month":
          return <EmployeeForm card={card} />;
        case "new_employee":
          return <NewEmployee card={card} />;          
        case "our_team":
          return <NewEmployee card={card} />;          
        case "success_cases":
          return <NewEmployee card={card} />;          
        case "testimonials":
          return <NewEmployee card={card} />;          
          default:
          return (
<AmericanFootball card={card} />
          );
      }

      


      
      
    case "meeting_room_calendar":
      switch (card.cardType) {
        case "calendar_app":
          return <CalendarAppForm card={card} />;
        case "birthday_announcement_1":
          return <BirthdayAnnouncement card={card} />;
        case "birthday_announcement_2":
          return <BirthdayAnnouncement card={card} />;

          default:
          return (
<AmericanFootball card={card} />
          );
      }

    case "menu_boards_tables":
      switch (card.cardType) {
        case "cafeteria":
          return <CafeTeriaForm card={card} />;
        // case "directory_list":
        //   return <CafeTeriaForm card={card} />;
        case "menu_board_basic":
          return <CafeTeriaForm card={card} />;
        case "menu_board_casual":
          return <CafeTeriaForm card={card} />;
        case "sales_app_modern":
          return <CafeTeriaForm card={card} />;
          default:
          return (
<AmericanFootball card={card} />
          );
      }



      
   
      default:
      return (
<AmericanFootball card={card} />
      );
  }
};


  return (
    <div style={styles.container}>
      {/* Top Header */}
      <div style={styles.topHeader}>
        <FaArrowLeft style={styles.backIcon} onClick={onBack} />
        <h2 style={styles.title}>Customize App</h2>
        <button style={styles.closeBtn} onClick={onClose}>Close</button>
      </div>

      {/* Content */}
      <div style={styles.content}>
        {renderDynamicContent()}
      </div>
    </div>
  );
};

const styles = {
  container: {
    width: "100%",
    minHeight: "400px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "10px",
    backgroundColor: "#fff",
    display: "flex",
    flexDirection: "column",
    gap: "10px"
  },
  topHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottom: "1px solid #eee",
    padding: "5px 10px"
  },
  backIcon: {
    fontSize: "18px",
    cursor: "pointer"
  },
  title: {
    textAlign: "center",
    flex: 1,
    margin: 0,
    fontSize: "16px"
  },
  closeBtn: {
    padding: "5px 10px",
    backgroundColor: "#d32f2f",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    marginRight: "10px",
  },
  content: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    marginTop: "10px"
  },
  defaultCard: {
    padding: "20px",
    border: "1px dashed #ccc",
    borderRadius: "6px",
    textAlign: "center",
    backgroundColor: "#f9f9f9"
  }
};

export default CommonCardForm;
