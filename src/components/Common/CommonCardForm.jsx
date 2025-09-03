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
import YouTubeForm from "../Widgets/SocialNetwork/YouTube/YouTubeForm";
import FacebookPageForm from "../Widgets/SocialNetwork/FacebookPage/FacebookPageForm";
import AnimatedFacebookAppMain from "../Widgets/SocialNetwork/AnimatedFacebookApp/AnimatedFacebookAppMain";
import QRCodeForm from "../Widgets/TextAndScroller/QRCode/QRCodeForm";
import DirectoryForm from "../Widgets/MenuBoard/Directory_List/DirectoryListForm";
// import TextTickerForm from "../Widgets/TextAndScroller/TextTicker/TextTickerForm";
// import RichTextWidgetForm from "../Widgets/TextAndScroller/RichTextWidget/RichTextWidgetForm";
import TextScrollerForm from "../Widgets/TextAndScroller/TextScroller/TextScrollerForm";
import SimpleTableForm from "../Widgets/MenuBoard/Simple_Table/SimpleTableForm";
import ConfigureNewsRssForm from "../Widgets/Rss_Neews_Feeds/Configure_News_Rss/ConfigureNewsRssForm";
import TextTickerForm from "../Widgets/TextAndScroller/Text_Thicker/Text_TickerForm";
import WebsiteLinkForm from "../Widgets/WebandMedia/WebsiteLink/WebsiteLinkForm";
import VerticalTextForm from "../Widgets/TextAndScroller/Vertical_Text/VerticalTextForm";
import TwitterForm from "../Widgets/RetiredApps/TwitterForm/TwitterForm";
import SimpleWeatherForm from "../Widgets/Weather/SimpleWeather/SimpleWeatherForm";
import StreamingVideoLinkForm from "../Widgets/WebandMedia/StreamingVideoLink/StreamingVideoLinkForm";
import MediaCyclingAppForm from "../Widgets/WebandMedia/MediaCyclingApp/MediaCyclingAppForm";
import ScreenfeedForm from "../Widgets/ThirdParty/Screenfeed/ScreenfeedForm";
import GeckoBoardForm from "../Widgets/ThirdParty/GeckoBoard/GeckoBoardForm";
import KlipfoloiForm from "../Widgets/ThirdParty/Klipfoloi/KlipfoloiForm";
import StreamaForm from "../Widgets/ThirdParty/Streama/StreamaForm";
import FlightStatusForm from "../Widgets/Other/FlightStatus/FlightStatusForm";
import MatchScoreForm from "../Widgets/Sports/MatchScore/MatchScoreForm";
import SoccerScoreForm from "../Widgets/Sports/SoccerScore/SoccerScoreForm";
import SoccerTableFrom from "../Widgets/Sports/SoccerTable/SoccerTableForm";
import SoccerLeaugueTableForm from "../Widgets/Sports/SoccerLeaugueTable/SoccerLeaugueTableForm";
import AirPortFlightStatusForm from "../Widgets/Other/AirportFlightStatus/AirPortFlightStatusForm";
import CountDownClockForm from "../Widgets/Clock/CountDownClock/CountDownClockForm";
import MultiDayWeatherMain from "../Widgets/Weather/MultiDayWeather/MultiDayWeatherMain";
import HolidayClockForm from "../Widgets/Clock/HolidayClock/HolidayClockForm";
import LcdClockForm from "../Widgets/Clock/LCD_Clock/LCD_CLock_Form";
import ClockBarModernForm from "../Widgets/Clock/ClockBarModern/ClockBarModernForm";
import GlowClockForm from "../Widgets/Clock/GlowClock/GlowClockForm";
import RoundModernClockForm from "../Widgets/Clock/RoundModernClock/RoundModernClockForm";
import TodayDateForm from "../Widgets/Clock/TodayDate/TodayDateForm";
// import TimeAppForm from "../Widgets/Clock/TimeApp/TimeAppForm";
import TimerForm from "../Widgets/Clock/Timer/TimerForm";
import EventCountDownForm from "../Widgets/Clock/EventCountDownClock/EventCountDownForm";
import MultiCityClockForm from "../Widgets/Clock/MultiCityClock/MultiCityClockForm";
import WeatherAndClockForm from "../Widgets/Clock/Weather_And_Clock/WeatherAndClockForm";
import ClockBarClassicForm from "../Widgets/Clock/ClockBarClassic/ClockBarClassicForm";
import TimeElapsedForm from "../Widgets/Clock/TimeElapsedClock/TimeElapsedForm";
import TimeAppForm from "../Widgets/Clock/TimeApp/TimeAppForm"; 



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
          return <AmericanFootball card={card} />;
      }

    case "clock":
      switch (card.cardType) {
        case "analog_round_clock":
          return <AnalogRoundClockForm card={card} />;
        case "analog_square_clock":
          return <AnalogSquareClockForm card={card} />;
        case "digital_clock_simple":
          return <DigitalClockSimpleForm card={card} />;
        case "countdown_app":
           return <CountDownClockForm card={card} />;
         case "holiday_clock":
          return <HolidayClockForm card={card} />;
        case "lcd_clock" :
          return <LcdClockForm card={card} />;   
        case "clock_bar_modern":
            return <ClockBarModernForm card={card} />;
        case "glow_clock":
            return <GlowClockForm card={card} />;   
        case "round_clock_modern":
              return <RoundModernClockForm card={card} />; 
        case "todays_date":
              return <TodayDateForm card={card} />;  
        case "timer":
              return <TimerForm card={card} />; 
        case "event_countdown":
          return <EventCountDownForm card={card} />
        case "multi_city_clock":
          return <MultiCityClockForm card={card} />
        case "multi_city_clock_ii":
          return <MultiCityClockForm card={card} />
        case "weather_clock":
          return <WeatherAndClockForm card={card} />
        case "clock_bar_classic":
          return <ClockBarClassicForm card={card} />
        case "time_elapsed":
          return <TimeElapsedForm card={card} />
        case "time_app":
          return <TimeAppForm card={card} />;
        default:
          return <AmericanFootball card={card} />;
      }

    case "weather":
      switch (card.cardType) {
        case "modern_weather_forecast":
          return <WeatherApp card={card} />;
        case "modern_weather_forecast_tall_bar":
          return <ModernWeatherForecastTallandBarMain card={card} />;
        case "simple_weather_app":
          return <SimpleWeatherForm card={card} />;
        case "multi_day_weather":
          return <MultiDayWeatherMain card={card} />;
        default:
          return <AmericanFootball card={card} />;
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
          return <AmericanFootball card={card} />;
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
          return <AmericanFootball card={card} />;
      }

    case "social_network":
      switch (card.cardType) {
        case "youtube_video":
          return <YouTubeForm card={card} />;
        case "facebook_page":
          return <FacebookPageForm card={card} />;
        case "animated_facebook_app":
          return <AnimatedFacebookAppMain card={card} />;
        default:
          return <AmericanFootball card={card} />;
      }

    case "other":
      switch (card.cardType) {
        case "audio_announcement_app":
          return <AudioWidgetForm card={card} />;
        case "weather_exchange_ticker":
          return <WeatherExchangeForm card={card} />;
        case "flight_status":
          return <FlightStatusForm card={card} />;
        case "airport_flight_status":
          return <AirPortFlightStatusForm card={card} />;
        default:
          return <AmericanFootball card={card} />;
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
          return <AmericanFootball card={card} />;
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
          return <AmericanFootball card={card} />;
      }

    case "menu_boards_tables":
      switch (card.cardType) {
        case "cafeteria":
          return <CafeTeriaForm card={card} />;
        case "directory_list":
          return <DirectoryForm card={card} />;
        case "menu_board_basic":
          return <CafeTeriaForm card={card} />;
        case "menu_board_casual":
          return <CafeTeriaForm card={card} />;
        case "sales_app_modern":
          return <CafeTeriaForm card={card} />;
        case "simple_table":
          return <SimpleTableForm card={card} />;
        default:
          return <AmericanFootball card={card} />;
      }

    case "news_rss_feeds":
      switch (card.cardType) {
        case "configurable_news":
          return <ConfigureNewsRssForm card={card} />;
        case "configurable_rss_news":
          return <ConfigureNewsRssForm card={card} />;
        case "news_scroller_1":
          return <ExchangeSellerTwo card={card} />;
        default:
          return <AmericanFootball card={card} />;
      }

    case "text_and_scrollers":
      switch (card.cardType) {
        case "qr_code":
          return <QRCodeForm card={card} />;
        case "text_scroller":
          return <TextScrollerForm card={card} />;
        case "text_ticker":
          return <TextTickerForm card={card} />;
        case "vertical_text_ticker":
          return <VerticalTextForm card={card} />;

          // case "rich_text_widget":
        //   return <RichTextWidgetForm card={card} />;
        default:
          return <AmericanFootball card={card} />;
      }


          case "retired_apps":
      switch (card.cardType) {
        case "twitter_modern":
          return <TwitterForm card={card} />;
        default:
          return <AmericanFootball card={card} />;
      }
      
    case "web_media":
      switch (card.cardType) {
        case "website_link":
          return <WebsiteLinkForm onClose={onBack} />;
        case "streaming_video_link_1":
          return <StreamingVideoLinkForm card={card} />;
         case "media_cycling_app":
           return <MediaCyclingAppForm card={card} />;
        default:
          return <AmericanFootball card={card} />;
      }

    case "third_party":
      switch (card.cardType) {
        case "screenfeed":
          return <ScreenfeedForm card={card} />;
        case "geckoboard":
          return <GeckoBoardForm card={card} />;
        case "klipfolio":
          return <KlipfoloiForm card={card} />;
        case "streama":
          return <StreamaForm card={card} />;
        default:
          return <AmericanFootball card={card} />;
      }


    case "sports":
      switch (card.cardType) {
        case "match_score_widget":
          return <MatchScoreForm card={card} />;
        case "match_scores_widget_ii":
          return <MatchScoreForm isScoreWidgetTwo card={card} />;
       case "soccer_scores":
          return <SoccerScoreForm  card={card} />;
      case "soccer_tables":
          return <SoccerTableFrom  card={card} />;
      case "soccer_league_table":
          return <SoccerLeaugueTableForm  card={card} />;
      default:
          return <AmericanFootball card={card} />;
        }


      

    default:
      return <AmericanFootball card={card} />;
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
