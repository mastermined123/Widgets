import React, { useState } from "react";
import Galley from './components/Gallery/Gallery';
import HomeContent from './components/Home/HomeContent';
import MediaCards from './components/TopBar/MediaCard';
import { Dialog } from "@mui/material";
import { analog_round_clock ,clock_bar_classic, clock_bar_modern, countdown_app, digital_clock_simple, watch1,watch2,
  watch3, watch4, watch5, watch6, watch7, watch8, directory_list, rich_text_widget, seven_days_exchange_rate, currency_exchange_scroller,
  exchange_rate, simple_weather_app, modern_weather_forecast, multi_city_weather, flight_status, airport_flight_status, audio_announcement_app,
  match_score_widget, soccer_league_table, lcd_clock,timer,weather_clock,employee_of_the_month, testimonials, single_exchange_rate_chart, ticker,
  birthday_announcement_1, happy_birthday,happy_birthday_elegant, happy_birthday_enterprise, sales_grid, configurable_rss_news, creative_news_feed,
  flexible_news_ticker, modern_rss, news_wall, slideshow
} from './constant/clockURL.js';


const categories = [
{
  id: 1,
  name: "Featured",
  type: "featured",
  cards: [
    {
      id: 10,
      cardType: "birthday_announcement",
      title: "Birthday Announcement",
      showWorldIcon: true,
      showDatabaseIcon: true,
      textContainer: "Data Feed Enabled",
      imageSrc: "https://images.unsplash.com/photo-1558636508-e0db3814bd1d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YmlydGhkYXl8ZW58MHx8MHx8fDA%3D"
    },
    {
      id: 11,
      cardType: "american_football",
      title: "American Football",
      showWorldIcon: true,
      showDatabaseIcon: true,
      textContainer: "Data Feed Enabled",
      imageSrc: "https://images.unsplash.com/photo-1485313260896-6e6edf486858?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YW1lcmljYW4lMjBmb290YmFsbHxlbnwwfHwwfHx8MA%3D%3D"
    },
    {
      id: 12,
      cardType: "simple_weather_app",
      title: "Simple Weather App",
      showWorldIcon: true,
      showDatabaseIcon: true,
      textContainer: "Data Feed Enabled",
      imageSrc: "https://images.unsplash.com/photo-1597132825820-094d481f1c4b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHRlbXBlcmF0dXJlfGVufDB8fDB8fHww"
    }
  ]
},
{
  id: 2,
  name: "Clock",
  type: "clock",
  cards: [
    {
      id: 20,
      cardType: "analog_round_clock",
      title: "Analog Round Clock",
      showWorldIcon: true,
      showDatabaseIcon: true,
      textContainer: "Data Feed Enabled",
      imageSrc: analog_round_clock,
    },
    {
      id: 21,
      cardType: "analog_square_clock",
      title: "Analog Square Clock",
      showWorldIcon: true,
      showDatabaseIcon: true,
      textContainer: "Data Feed Enabled",
      imageSrc: watch4,
    },
    {
      id: 22,
      cardType: "clock_bar_classic",
      title: "Clock Bar - Classic",
      showWorldIcon: true,
      showDatabaseIcon: true,
      textContainer: "Data Feed Enabled",
      imageSrc: clock_bar_classic
    },
    {
      id: 23,
      cardType: "clock_bar_modern",
      title: "Clock Bar - Modern",
      showWorldIcon: true,
      showDatabaseIcon: true,
      textContainer: "Data Feed Enabled",
      imageSrc: clock_bar_modern
    },
    {
      id: 24,
      cardType: "countdown_app",
      title: "Countdown App",
      showWorldIcon: true,
      showDatabaseIcon: true,
      textContainer: "Data Feed Enabled",
      imageSrc: countdown_app
    },
    {
      id: 25,
      cardType: "digital_clock_simple",
      title: "Digital Clock - Simple",
      showWorldIcon: true,
      showDatabaseIcon: true,
      textContainer: "Data Feed Enabled",
      imageSrc: digital_clock_simple
    },
    {
      id: 26,
      cardType: "event_countdown",
      title: "Event Countdown",
      showWorldIcon: true,
      showDatabaseIcon: true,
      textContainer: "Data Feed Enabled",
      imageSrc: watch1
    },
    {
      id: 27,
      cardType: "glow_clock",
      title: "Glow Clock",
      showWorldIcon: true,
      showDatabaseIcon: true,
      textContainer: "Data Feed Enabled",
      imageSrc: watch2
    },
    {
      id: 28,
      cardType: "holiday_clock",
      title: "Holiday Clock",
      showWorldIcon: true,
      showDatabaseIcon: true,
      textContainer: "Data Feed Enabled",
      imageSrc: watch3
    },
    {
      id: 29,
      cardType: "lcd_clock",
      title: "LCD Clock",
      showWorldIcon: true,
      showDatabaseIcon: true,
      textContainer: "Data Feed Enabled",
      imageSrc: lcd_clock,
    },
    {
      id: 290,
      cardType: "multi_city_clock",
      title: "Multi City Clock",
      showWorldIcon: true,
      showDatabaseIcon: true,
      textContainer: "Data Feed Enabled",
      imageSrc: watch5   },
    {
      id: 291,
      cardType: "round_clock_modern",
      title: "Round Clock - Modern",
      showWorldIcon: true,
      showDatabaseIcon: true,
      textContainer: "Data Feed Enabled",
      imageSrc: watch6
    },
    {
      id: 292,
      cardType: "time_app",
      title: "Time App",
      showWorldIcon: true,
      showDatabaseIcon: true,
      textContainer: "Data Feed Enabled",
      imageSrc: watch7
    },
    {
      id: 293,
      cardType: "time_elapsed",
      title: "Time Elapsed",
      showWorldIcon: true,
      showDatabaseIcon: true,
      textContainer: "Data Feed Enabled",
      imageSrc: watch8
    },
    {
      id: 294,
      cardType: "timer",
      title: "Timer",
      showWorldIcon: true,
      showDatabaseIcon: true,
      textContainer: "Data Feed Enabled",
      imageSrc: timer,
    },
    {
      id: 295,
      cardType: "todays_date",
      title: "Today's Date",
      showWorldIcon: true,
      showDatabaseIcon: true,
      textContainer: "Data Feed Enabled",
      imageSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJDe4G3TP615h5teScXVYiYYlbcrGVSbY4rg&s"
    },
    {
      id: 296,
      cardType: "weather_clock",
      title: "Weather Clock",
      showWorldIcon: true,
      showDatabaseIcon: true,
      textContainer: "Data Feed Enabled",
      imageSrc: weather_clock,
    }
  ]
}
,
{
  id: 3,
  name: "Entertainment",
  type: "entertainment",
  cards: [
    {
      id: 31,
      cardType: "american_football_entertainment",
      title: "American Football",
      showWorldIcon: true,
      showDatabaseIcon: true,
      textContainer: "Data Feed Enabled",
      imageSrc: "https://images.unsplash.com/photo-1485313260896-6e6edf486858?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YW1lcmljYW4lMjBmb290YmFsbHxlbnwwfHwwfHx8MA%3D%3D"
    },
    {
      id: 32,
      cardType: "animal_facts",
      title: "Animal Facts",
      showWorldIcon: true,
      showDatabaseIcon: true,
      textContainer: "Data Feed Enabled",
      imageSrc: "https://cdn.pixabay.com/photo/2020/06/11/18/18/guinea-pig-5287749_1280.jpg"
       },
    {
      id: 33,
      cardType: "baseball_curiosities",
      title: "Baseball Curiosities",
      showWorldIcon: true,
      showDatabaseIcon: true,
      textContainer: "Data Feed Enabled",
      imageSrc: "https://images.unsplash.com/photo-1529768167801-9173d94c2a42?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmFzZWJhbGx8ZW58MHx8MHx8fDA%3D"
    },
    {
      id: 34,
      cardType: "basketball",
      title: "Basketball",
      showWorldIcon: true,
      showDatabaseIcon: true,
      textContainer: "Data Feed Enabled",
      imageSrc: "https://plus.unsplash.com/premium_photo-1661872981731-54199736e0e1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGJhc2tldGJhbGx8ZW58MHx8MHx8fDA%3D"
    },
    {
      id: 35,
      cardType: "cricket_facts",
      title: "Cricket Facts",
      showWorldIcon: true,
      showDatabaseIcon: true,
      textContainer: "Data Feed Enabled",
      imageSrc: "https://images.unsplash.com/photo-1552435053-01c010307582?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjZ8fGNyaWNrZXR8ZW58MHx8MHx8fDA%3D"
    },
    {
      id: 36,
      cardType: "famous_quotes_1",
      title: "Famous Quotes 1",
      showWorldIcon: true,
      showDatabaseIcon: true,
      textContainer: "Data Feed Enabled",
      imageSrc: "https://plus.unsplash.com/premium_photo-1726837224365-226ca0f5d266?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8ZmFtb3VzJTIwcXVvdGV8ZW58MHx8MHx8fDA%3D"
    },
    {
      id: 37,
      cardType: "famous_quotes_2",
      title: "Famous Quotes 2",
      showWorldIcon: true,
      showDatabaseIcon: true,
      textContainer: "Data Feed Enabled",
      imageSrc: "https://plus.unsplash.com/premium_photo-1748351930031-712c6a8040f9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8ZmFtb3VzJTIwcXVvdGV8ZW58MHx8MHx8fDA%3D"
    },
    {
      id: 38,
      cardType: "famous_quotes_3",
      title: "Famous Quotes 3",
      showWorldIcon: true,
      showDatabaseIcon: true,
      textContainer: "Data Feed Enabled",
      imageSrc: "https://images.unsplash.com/photo-1511067087965-c1b6ce6454d3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGZhbW91cyUyMHF1b3RlfGVufDB8fDB8fHww"
    },
    {
      id: 39,
      cardType: "health_tips",
      title: "Health Tips",
      showWorldIcon: true,
      showDatabaseIcon: true,
      textContainer: "Data Feed Enabled",
      imageSrc: "https://plus.unsplash.com/premium_photo-1666299901723-b886bb118d67?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aGVhbHRoJTIwdGlwc3xlbnwwfHwwfHx8MA%3D%3D"
    },
    {
      id: 301,
      cardType: "ice_hockey_facts",
      title: "Ice Hockey Facts",
      showWorldIcon: true,
      showDatabaseIcon: true,
      textContainer: "Data Feed Enabled",
      imageSrc: "https://images.unsplash.com/photo-1747543313746-e99e1b9079ad?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8SWNlJTIwSG9ja2V5JTIwRmFjdHN8ZW58MHx8MHx8fDA%3D"
    },
    {
      id: 311,
      cardType: "quiz_trivia",
      title: "Quiz and Trivia",
      showWorldIcon: true,
      showDatabaseIcon: true,
      textContainer: "Data Feed Enabled",
      imageSrc: "https://images.unsplash.com/photo-1643706755594-d0e8d8d42a09?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fFF1aXolMjBhbmQlMjBUcml2aWF8ZW58MHx8MHx8fDA%3D"
    },
    {
      id: 321,
      cardType: "rugby_facts",
      title: "Rugby Facts",
      showWorldIcon: true,
      showDatabaseIcon: true,
      textContainer: "Data Feed Enabled",
      imageSrc: "https://images.unsplash.com/photo-1652107940093-f874d4f545ad?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fFJ1Z2J5JTIwRmFjdHN8ZW58MHx8MHx8fDA%3D"
    },
    {
      id: 331,
      cardType: "scientific_curiosities",
      title: "Scientific Curiosities",
      showWorldIcon: true,
      showDatabaseIcon: true,
      textContainer: "Data Feed Enabled",
      imageSrc: "https://images.unsplash.com/photo-1562411052-105105232432?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8U2NpZW50aWZpYyUyMEN1cmlvc2l0aWVzfGVufDB8fDB8fHww"
    },
    {
      id: 332,
      cardType: "today_in_history",
      title: "Today In History",
      showWorldIcon: true,
      showDatabaseIcon: true,
      textContainer: "Data Feed Enabled",
      imageSrc: "https://plus.unsplash.com/premium_photo-1661855590183-87806182951b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8VG9kYXklMjBJbiUyMEhpc3Rvcnl8ZW58MHx8MHx8fDA%3D"
    },
    {
      id: 333,
      cardType: "travel",
      title: "Travel",
      showWorldIcon: true,
      showDatabaseIcon: true,
      textContainer: "Data Feed Enabled",
      imageSrc: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8VHJhdmVsfGVufDB8fDB8fHww"
    },
    {
      id: 334,
      cardType: "upcoming_movies",
      title: "Upcoming Movies",
      showWorldIcon: true,
      showDatabaseIcon: true,
      textContainer: "Data Feed Enabled",
      imageSrc: "https://images.unsplash.com/photo-1753944847480-92f369a5f00e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8VXBjb21pbmclMjBtb3ZpZXN8ZW58MHx8MHx8fDA%3D"
    },
    {
      id: 335,
      cardType: "volleyball",
      title: "Volleyball",
      showWorldIcon: true,
      showDatabaseIcon: true,
      textContainer: "Data Feed Enabled",
      imageSrc: "https://plus.unsplash.com/premium_photo-1708696216326-0317bac37b82?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fFZvbGxleWJhbGx8ZW58MHx8MHx8fDA%3D"
    }
  ]
}

,
{
  id: 4,
  name: "Finance",
  type: "finance",
  cards: [
    {
      id: 40,
      cardType: "seven_days_exchange_rate",
      title: "7 Days Exchange Rate",
      showWorldIcon: true,
      showDatabaseIcon: true,
      textContainer: "Data Feed Enabled",
      imageSrc: seven_days_exchange_rate,
    },
    {
      id: 41,
      cardType: "currency_exchange_scroller",
      title: "Currency Exchange Scroller",
      showWorldIcon: true,
      showDatabaseIcon: true,
      textContainer: "Data Feed Enabled",
      imageSrc: currency_exchange_scroller,
    },
    {
      id: 42,
      cardType: "exchange_rate",
      title: "Exchange Rate",
      showWorldIcon: true,
      showDatabaseIcon: true,
      textContainer: "Data Feed Enabled",
      imageSrc: exchange_rate,
    },
    {
      id: 43,
      cardType: "exchange_rate_chart",
      title: "Exchange Rate Chart",
      showWorldIcon: true,
      showDatabaseIcon: true,
      textContainer: "Data Feed Enabled",
      imageSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRZ84bFtHBkAVRW5o0HGOuoJgqAyvDB9zpeg&s"
    },
    {
      id: 44,
      cardType: "exchange_rate_table",
      title: "Exchange Rate Table",
      showWorldIcon: true,
      showDatabaseIcon: true,
      textContainer: "Data Feed Enabled",
      imageSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBV3Tiw5hrUesmWk7qBTrgUWY0UBSTq6Qrqg&s"
    },
    {
      id: 45,
      cardType: "mini_chart",
      title: "Mini Chart",
      showWorldIcon: true,
      showDatabaseIcon: true,
      textContainer: "Data Feed Enabled",
      imageSrc: "data:image/jpeg;base64,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"
    },
    {
      id: 46,
      cardType: "multi_currency_exchange_rate",
      title: "Multi-currency Exchange Rate",
      showWorldIcon: true,
      showDatabaseIcon: true,
      textContainer: "Data Feed Enabled",
      imageSrc: "data:image/jpeg;base64,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"
    },
    {
      id: 47,
      cardType: "single_exchange_rate",
      title: "Single Exchange Rate",
      showWorldIcon: true,
      showDatabaseIcon: true,
      textContainer: "Data Feed Enabled",
      imageSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZ_PUQCxOJ61JvSHkgDZt5JyJ8D3vUYKER1A&s"
    },
    {
      id: 48,
      cardType: "single_exchange_rate_chart",
      title: "Single Exchange Rate Chart",
      showWorldIcon: true,
      showDatabaseIcon: true,
      textContainer: "Data Feed Enabled",
      imageSrc: single_exchange_rate_chart,
    },
    {
      id: 49,
      cardType: "single_ticker",
      title: "Single Ticker",
      showWorldIcon: true,
      showDatabaseIcon: true,
      textContainer: "Data Feed Enabled",
      imageSrc: "data:image/jpeg;base64,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"
    },
    {
      id: 401,
      cardType: "symbol_info",
      title: "Symbol Info",
      showWorldIcon: true,
      showDatabaseIcon: true,
      textContainer: "Data Feed Enabled",
      imageSrc: "data:image/png;base64,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"
    },
    {
      id: 402,
      cardType: "symbol_overview",
      title: "Symbol Overview",
      showWorldIcon: true,
      showDatabaseIcon: true,
      textContainer: "Data Feed Enabled",
      imageSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSC32_zLsYsI2NnR8YTBz12eQUgqGUnAg66dw&s"
    },
    {
      id: 403,
      cardType: "ticker",
      title: "Ticker",
      showWorldIcon: true,
      showDatabaseIcon: true,
      textContainer: "Data Feed Enabled",
      imageSrc: ticker,
    },
    {
      id: 404,
      cardType: "ticker_tape",
      title: "Ticker Tape",
      showWorldIcon: true,
      showDatabaseIcon: true,
      textContainer: "Data Feed Enabled",
      imageSrc: "data:image/png;base64,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"
    },
  ]
}
,
{
  id: 5,
  name: "Meeting Room & Calendar",
  type: "meeting_room_calendar",
  cards: [
    {
      id: 50,
      cardType: "birthday_announcement_1",
      title: "Birthday Announcement",
      showWorldIcon: true,
      showDatabaseIcon: true,
      textContainer: "Data Feed Enabled",
      imageSrc: birthday_announcement_1,
    },
    {
      id: 51,
      cardType: "birthday_announcement_2",
      title: "Birthday Announcement",
      showWorldIcon: true,
      showDatabaseIcon: true,
      textContainer: "Data Feed Enabled",
      imageSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0jrmAJ0BFsUAXwCkGaAj5FDnGx_-HbHWpyQ&s"
    },
    {
      id: 52,
      cardType: "calendar_app",
      title: "Calendar App",
      showWorldIcon: true,
      showDatabaseIcon: true,
      textContainer: "Data Feed Enabled",
      imageSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQb9t0D_l6_ZVm19s8G5AAWwJPpXCVpmDv9mA&s"
    },
    {
      id: 53,
      cardType: "events_calendar",
      title: "Events Calendar",
      showWorldIcon: true,
      showDatabaseIcon: true,
      textContainer: "Data Feed Enabled",
      imageSrc: "data:image/jpeg;base64,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"
    },
    {
      id: 54,
      cardType: "happy_birthday",
      title: "Happy Birthday",
      showWorldIcon: true,
      showDatabaseIcon: true,
      textContainer: "Data Feed Enabled",
      imageSrc: happy_birthday,
    },
    {
      id: 55,
      cardType: "happy_birthday_elegant",
      title: "Happy Birthday - Elegant",
      showWorldIcon: true,
      showDatabaseIcon: true,
      textContainer: "Data Feed Enabled",
      imageSrc: happy_birthday_elegant,
    },
    {
      id: 56,
      cardType: "happy_birthday_enterprise",
      title: "Happy Birthday - Enterprise",
      showWorldIcon: true,
      showDatabaseIcon: true,
      textContainer: "Data Feed Enabled",
      imageSrc: happy_birthday_enterprise,
    },
    {
      id: 57,
      cardType: "meeting_room_calendar_app",
      title: "Meeting Room Calendar App",
      showWorldIcon: true,
      showDatabaseIcon: true,
      textContainer: "Data Feed Enabled",
      imageSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQ7QTObxkah5IkawWCl8dtZrchvg-g--ZX7w&s"
    },
    // {
    //   id: 58,
    //   cardType: "meeting_room_calendar_bar_app",
    //   title: "Meeting Room Calendar Bar App",
    //   showWorldIcon: true,
    //   showDatabaseIcon: true,
    //   textContainer: "Data Feed Enabled",
    //   imageSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRumrDgEIYnZVxT4T2YHcRu4rahqLHycjhH1w&s"
    // },
    // {
    //   id: 59,
    //   cardType: "calendar_custom",
    //   title: "Calendar Custom Widget",
    //   showWorldIcon: true,
    //   showDatabaseIcon: true,
    //   textContainer: "Data Feed Enabled",
    //   imageSrc: "https://plus.unsplash.com/premium_photo-1681487144031-d502ea9abefc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bWVldGluZyUyMHJvb218ZW58MHx8MHx8fDA%3D"
    // },
    // {
    //   id: 501,
    //   cardType: "calendar_extra_1",
    //   title: "Calendar Extra 1",
    //   showWorldIcon: true,
    //   showDatabaseIcon: true,
    //   textContainer: "Data Feed Enabled",
    //   imageSrc: "https://images.unsplash.com/photo-1633526543814-9718c8922b7a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Q2FsZW5kYXJ8ZW58MHx8MHx8fDA%3D"
    // },
    // {
    //   id: 502,
    //   cardType: "calendar_extra_2",
    //   title: "Calendar Extra 2",
    //   showWorldIcon: true,
    //   showDatabaseIcon: true,
    //   textContainer: "Data Feed Enabled",
    //   imageSrc: "https://images.unsplash.com/photo-1506784365847-bbad939e9335?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Q2FsZW5kYXJ8ZW58MHx8MHx8fDA%3D"
    // },
    // {
    //   id: 503,
    //   cardType: "calendar_extra_3",
    //   title: "Calendar Extra 3",
    //   showWorldIcon: true,
    //   showDatabaseIcon: true,
    //   textContainer: "Data Feed Enabled",
    //   imageSrc: "https://images.unsplash.com/photo-1611988615248-5d4f0b9ac31e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Q2FsZW5kYXJ8ZW58MHx8MHx8fDA%3D"
    // }
  ]
}
,
{
  id: 6,
  name: "Menu Boards & Tables",
  type: "menu_boards_tables",
  cards: [
    {
      id: 60,
      cardType: "cafeteria",
      title: "Cafeteria",
      showWorldIcon: true,
      showDatabaseIcon: true,
      textContainer: "Data Feed Enabled",
      imageSrc:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTF-yaJJhnwBfenNh1GSwevMImIgk3ixf_UEg&s",
    },
    {
      id: 61,
      cardType: "directory_list",
      title: "Directory List",
      showWorldIcon: true,
      showDatabaseIcon: true,
      textContainer: "Data Feed Enabled",
      imageSrc:
        directory_list,
    },
    {
      id: 67,
      cardType: "simple_table",
      title: "Simple Table",
      showWorldIcon: true,
      showDatabaseIcon: true,
      textContainer: "Data Feed Enabled",
      imageSrc:
        "https://images.unsplash.com/photo-1743811928684-f134eba5e956?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fE1lbnUlMjBib2FyZHxlbnwwfHwwfHx8MA%3D%3D",
    },

    {

      id: 62,
      cardType: "menu_board_basic",
      title: "Menu Board - Basic",
      showWorldIcon: true,
      showDatabaseIcon: true,
      textContainer: "Data Feed Enabled",
      imageSrc:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcoGqRJzNQ7lEkgTX6K8xRKFDeS0l6oqwOIw&s",
    },
    {
      id: 63,
      cardType: "menu_board_casual",
      title: "Menu Board - Casual",
      showWorldIcon: true,
      showDatabaseIcon: true,
      textContainer: "Data Feed Enabled",
      imageSrc:
        "https://images.unsplash.com/photo-1599250300435-b9693f21830d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8TWVudSUyMGJvYXJkfGVufDB8fDB8fHww",
    },
    {
      id: 64,
      cardType: "sales_app_modern",
      title: "Sales App - Modern",
      showWorldIcon: true,
      showDatabaseIcon: true,
      textContainer: "Data Feed Enabled",
      imageSrc:
        "data:image/jpeg;base64,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",
    },
    {
      id: 65,
      cardType: "sales_app_simple",
      title: "Sales App - Simple",
      showWorldIcon: true,
      showDatabaseIcon: true,
      textContainer: "Data Feed Enabled",
      imageSrc:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRALd8EjFOVE8gsRgC4BQg7m4H-Dw6xYUg3AQ&s",
    },
    {
      id: 66,
      cardType: "sales_grid",
      title: "Sales Grid",
      showWorldIcon: true,
      showDatabaseIcon: true,
      textContainer: "Data Feed Enabled",
      imageSrc:
        sales_grid,
    },
    {
      id: 68,
      cardType: "extra_card_601",
      title: "Extra Card 601",
      showWorldIcon: true,
      showDatabaseIcon: true,
      textContainer: "Data Feed Enabled",
      imageSrc:
        "https://images.unsplash.com/photo-1599250300435-b9693f21830d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8TWVudSUyMGJvYXJkfGVufDB8fDB8fHww",
    
    },
    {
      id: 69,
      cardType: "extra_card_602",
      title: "Extra Card 602",
      showWorldIcon: true,
      showDatabaseIcon: true,
      textContainer: "Data Feed Enabled",
      imageSrc:
        "https://images.unsplash.com/photo-1743811928684-f134eba5e956?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fE1lbnUlMjBib2FyZHxlbnwwfHwwfHx8MA%3D%3D",
    
    },
  ],
}
,  

{
  id: 7,
  name: "News & RSS Feeds",
  type: "news_rss_feeds",
  cards: [
    {
      id: 70,
      cardType: "configurable_news",
      title: "Configurable News",
      showWorldIcon: true,
      showDatabaseIcon: true,
      textContainer: "Data Feed Enabled",
      imageSrc:
        "https://i.guim.co.uk/img/media/f304bf6c0544dc9939c3cf3497756eb9cd387faa/0_0_2000_1200/master/2000.jpg?width=465&dpr=1&s=none&crop=none",
    },
    {
      id: 71,
      cardType: "configurable_rss_news",
      title: "Configurable RSS News",
      showWorldIcon: true,
      showDatabaseIcon: true,
      textContainer: "Data Feed Enabled",
      imageSrc: configurable_rss_news,
    },
        {
      id: 702,
      cardType: "news_scroller_1",
      title: "News Scroller",
      showWorldIcon: true,
      showDatabaseIcon: true,
      textContainer: "Data Feed Enabled",
      imageSrc: "https://plus.unsplash.com/premium_photo-1688561383203-31fed3d85417?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fG5ld3N8ZW58MHx8MHx8fDA%3D",
    },

    {
      id: 72,
      cardType: "creative_news_feed",
      title: "Creative News Feed",
      showWorldIcon: true,
      showDatabaseIcon: true,
      textContainer: "Data Feed Enabled",
      imageSrc: creative_news_feed,
    },
    {
      id: 73,
      cardType: "creative_rss",
      title: "Creative RSS",
      showWorldIcon: true,
      showDatabaseIcon: true,
      textContainer: "Data Feed Enabled",
      imageSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYmYkh-3-sa4NyOmihaWMQI79KKqaO7jSkIg&s",
    },
    {
      id: 74,
      cardType: "cycling_media_rss",
      title: "Cycling Media RSS",
      showWorldIcon: true,
      showDatabaseIcon: true,
      textContainer: "Data Feed Enabled",
      imageSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRt00_cibleED0nomOUhK0GskZUuVMl6MqZ8Q&s",
    },
    {
      id: 75,
      cardType: "flexible_news_ticker",
      title: "Flexible News Ticker",
      showWorldIcon: true,
      showDatabaseIcon: true,
      textContainer: "Data Feed Enabled",
      imageSrc: flexible_news_ticker,
    },
    {
      id: 76,
      cardType: "media_rss",
      title: "Media RSS",
      showWorldIcon: true,
      showDatabaseIcon: true,
      textContainer: "Data Feed Enabled",
      imageSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRt00_cibleED0nomOUhK0GskZUuVMl6MqZ8Q&s",
    },
    {
      id: 77,
      cardType: "modern_news",
      title: "Modern News",
      showWorldIcon: true,
      showDatabaseIcon: true,
      textContainer: "Data Feed Enabled",
      imageSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgCCBj6PkkUsEuzSbIzvWHFSsUTaFG1ln8uQ&s",
    },
    {
      id: 78,
      cardType: "modern_rss",
      title: "Modern RSS",
      showWorldIcon: true,
      showDatabaseIcon: true,
      textContainer: "Data Feed Enabled",
      imageSrc: modern_rss,
    },
    {
      id: 79,
      cardType: "news_circle",
      title: "News Circle",
      showWorldIcon: true,
      showDatabaseIcon: true,
      textContainer: "Data Feed Enabled",
      imageSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-ZTD8Su0wJUNsMvID4jnHWrQbAIf-Il-9-Q&s",
    },
    {
      id: 700,
      cardType: "news_feed_1",
      title: "News Feed 1",
      showWorldIcon: true,
      showDatabaseIcon: true,
      textContainer: "Data Feed Enabled",
      imageSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRylAxwJHPT2gOwSdCMqJvxSETm7lFllxTc3A&s",
    },
    {
      id: 701,
      cardType: "news_feed_3",
      title: "News Feed 3",
      showWorldIcon: true,
      showDatabaseIcon: true,
      textContainer: "Data Feed Enabled",
      imageSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHhL3HJGymMUPlRBPafTpJATwOlfRN1gX49g&s",
    },
    {
      id: 703,
      cardType: "news_scroller_2",
      title: "News Scroller",
      showWorldIcon: true,
      showDatabaseIcon: true,
      textContainer: "Data Feed Enabled",
      imageSrc: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAA2FBMVEX///+sCQm9OjodGhoAAAAYFRUzMDCwsbGrAAD45uamAADAXFzMc3O8MzOyCAjExMRkYmIRDQ1MFhYXGhq9ODjo5+exJSW5IiLfrq45NjatDQ0oJSUuKyuyHh63LCwfHBzAQ0OwFRXlwsLR0NBCPz8OGxtIRkaPjo5+ERHw8PBtbGyfn5/d3d2xAAB2dXX19fWEg4OsrKzHx8ednJxRUFDBZGRlY2N9YWHNdHQIDQ1HBwdGRESAf38fIiI7AADNr693AAC5R0e8U1PVmprJfHzUl5fu1taGKSn796FBAAAIkUlEQVR4nO2aC3fiNhaAZSwZhYkTvHXcMcYmLi4UcHgEMttuZx8zszv9//+oVzZv62Exuz3bc+53EvMwWHy+uteSgBAEQRAEQRAEQRAEQRAEQRAEQRAEQRAEQRAEQRAEQRAEQRAEQRAEQRAEQRAEQRAEQRAEQRAEQRAEQRAEQf7cjHf9ig/z5fzDct438Nd3B97uVbxrxxugea04/s+H4ynbqvn57G7D8JEGFfFwNIxZPAq0/PK3F17jhL6ClPPDizQ42cCJ8jxS7c/gSGHORSucp6q2DnSO90KJoQuMCo+5LE6Soavlu788ODVhR0Wap2nqGMj93HEGPk8H0t08FUfKOPeVzVzyvL8NOwpDCJ8Lhga/M0NuaDHtca1hlMJ+7sv9HKcS7Igz0dLwoKg0dOPYdZNi1N4wM7SYZamjkcxFZ06znmL3QMQu4y3aOSmGekNQTIrEJGhhKE5qlqsdQTHNVCEU3TSMuAP5qM4GqaLGUCgaBU+G5t4Tin7jp0rH3I/UgsIR4ptl7QVrRZ2ha2U4aNOi2PiqjujkmS5VodqmFnaHBrWGrjELzwx7bZqvFNUSyhD2eB75NtE7NhhKDRkAhfS4rW/E5uLPZQE7u1q0quPPdbmwJbrFbq8oM4wnE4+yeutNAMaKyZCNJh5LdsmkYJNJMJy41JtP6MmwXR1/1oRQhXXnvGxQYvgI2xntHreEUkK6NIb/2YqSEh7tpmQ0hT2v9GTYro4bL/1NvkUQ6pvEsEvomiw3hE3JfEMSSoMdmZXUI4sp+ZWSMRhu1oQ+zeiG/P1k2OqjZDy3FWw9jJEbymJYGfY3hC6FYUApnRJ45JEuWdDKsFx9rAwn67Ne6vQic4Pgl2uvCU3qGhbCkOG/aAgzDIjPU7UlZEpfyyXZDaudlWFl/PS0K8uLGA6MBSEUZcbKkFd5GMLFIk1bnMG2hpBm6w1Zv5LJhvSh4Ky6jEwT6KoQUWH4cbwShsn4speaFetCaqFYJ3dY301vqDkKwyAhiw0ZzUU2jihl1fMjsplDPIXhek2EId1eGepmGBXWdaYu0PtTkokZhmVaKgy3jyKGwyX5uCGL7RZM46cZg1oK1bXqpVBsgpIsS0KvDB19+5YpWBuGp3dxGNnaBVJquB2X4y2dlsNduZyOy3L8sWR0UQ7LqXhyvKHlknbLJB7Pyg+/XBtyXbKEN1zt08gRI+79o56wDC3GN6FsBlzhQucMaFA/oEw8rJ8U20DcgXs0+O7aED5OrozjDeMZcIMJdJbl50/x9oHUj0tb0DQUH0F1im+43B8vEReTkvazxD/Y0DoNz02qRYABr6cmbQX/V4aq5qw76cWcLEvzrJNFaZqr88DaEDKN0aDKxkDkpcjBoMrLW2Jo3Um1ZauSNvZWgyF9HPfjsr8eA8synpdrWs5349m4YPaG2UA591UJqupJ6OzVYZhrcDQZzshjTOYLsllsl+TDgjx6pL+aLWF+YWfoRzmXdVH9soW6YB6bELU7jTTzR6PhilSGHqUTsu6Ssk8S0JsuLA0jVQbmGkPNhDM62MP1J+W9Hh9EitQ0Ga4eYZQNht1Nn5LFuJzBnGIBs8Lja9r2UpXFQK2oXVU7rrllYac+BJefEKNh97EUhpCGYDvbksWKwtRqFevzsHE+1Zd6taJ2zSA968Lh9RkJT71Wtk7zehnDORGGMZTSsiQTMi7pr25hysOGoTpS6o6qXb3zz9f3o/0b9kuNWY8fijDMumSjttG5Id0bUrG4Ua1mwN/TytJQI6iOos5QnLPj/UO9qr2qnOf1RC6HQiQxTI6KFCL6KgwBMRmmTzDLfyUrsrUz1I+4VYpaQ//YjcPT2/MquvsPUa14wxBWlodHRbYrguEuiXcA83aToNgNGd0tC0OluTZURUmraFhjBpPqNjtvODwNKw4BlRqeKTKXBfAXBKxaHhX/rnigN7y6CqtX8nWKpulDKnzCi2OLlaLjoepPoTA8KZowGkaZ+mKoVzSuvzpReH3u8ouxb0eE9EVxtWiraDbkTj1YMwzZmorGb5n86qvjy/ecpXwvj+CDhIoYtlY091JfPJNmhi+WZFE0znKjNAsvr7Tc36dh5MNMRAz8lDFsq2g2FJUg9/OBb5hZNBVbrTldvWt/GqPMSf1qlyoPWytKDXtnhtU5jlInS88XIqTcouhLc7zni5NafaGsM2ylKDeMLj8Ah+6Uqr+jPyCJohh+hX6kXgtW/K7Bz/1B/XWk1rCNotTwdCkTPXMg5uTpIFJ+R69RFEvenPfgRl52ZNchnqeQ93meVWkhNbTiHzB3afLyfYXYxwcvDy8c/mWvu0Z6sJrvJeTSth9eBpw/POyP1TRcPdlx9/9Ow/DuvZx/dv+kNAx/uOo3h2D/y6737leSA+qNXDpk7d8SmF+iIaGjJKHUO3tKYniZuPuv+x5++rHFxeMKViQsLjzx66PWjFr8AkRJUrhuEXuFd/oIrsKQV0Ws+omO8y2GUI0Tz/jbsQu+RTERiw9DLzlNDVSG3A/54FOW8U/Rp8+d2wyZ+GljzMwvvOZWRfEzvCK5alBl2Hv/Qy8k93fZ6svdvz+LsZC1IRuKABZ/nGJ1Ohu/VNMZZqRHvrz/z92XAYdctDUEQQ9aHJ2lRHtuUQTBeNhUVBt+vf9Mel/J85evb584lBtLQzaEGipO6qjtTPMCe0XooiwpQPGqPWUePr/dd97xzhv83YMhjIqtDEUEoTWrInqBraKI4EgoNnaoa2ldSZ3DLDO3MoQcrE5ofFMEBXaKIgc9yPukkRNSQ+nPrF9++pG1J04YGxUji3c0SSxe6xaMBVC7mwSsaehEUn6LvfbsxIuLicU7JFg0GO/EdlLI9jUMEQRBEARBEARBEARBEARBEARBEARBEARBEARBEARBEARBEARBEARBEARBEARBEARBEARBEBt+B6M4GRvMV/3qAAAAAElFTkSuQmCC",
    },
    {
      id: 704,
      cardType: "news_ticker",
      title: "News Ticker",
      showWorldIcon: true,
      showDatabaseIcon: true,
      textContainer: "Data Feed Enabled",
      imageSrc: "https://i.ytimg.com/vi/0sDOJVKCcXA/maxresdefault.jpg",
    },
    {
      id: 705,
      cardType: "news_ticker_2",
      title: "News Ticker 2",
      showWorldIcon: true,
      showDatabaseIcon: true,
      textContainer: "Data Feed Enabled",
      imageSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzzaDJlZ7pdCDf6LXRy_TvhDjuQNg5Si5m0uUPxYG-XMMhmW7X21OqF6uGY29d-hxBwtY&usqp=CAU",
    },
    {
      id: 706,
      cardType: "news_wall",
      title: "News Wall",
      showWorldIcon: true,
      showDatabaseIcon: true,
      textContainer: "Data Feed Enabled",
      imageSrc: news_wall,
    },
    {
      id: 707,
      cardType: "rss_news_1",
      title: "RSS News 1",
      showWorldIcon: true,
      showDatabaseIcon: true,
      textContainer: "Data Feed Enabled",
      imageSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZsPi6fweARuDu12xt4wKTSdSyx6nhRYW0ww&s",
    },
    {
      id: 708,
      cardType: "rss_news_2",
      title: "RSS News 2",
      showWorldIcon: true,
      showDatabaseIcon: true,
      textContainer: "Data Feed Enabled",
      imageSrc: "https://thumbs.dreamstime.com/b/news-header-background-title-abstract-colorful-global-map-text-hightech-design-blue-colorful-template-90494676.jpg",
    },
    {
      id: 709,
      cardType: "rss_news_3",
      title: "RSS News 3",
      showWorldIcon: true,
      showDatabaseIcon: true,
      textContainer: "Data Feed Enabled",
      imageSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRzqH9ZET9KzdJQyjeozXaWnqvcH2bnpQI3l0InNVjYQ98ZkxK8tMTwck7RoYRiPqWYGo&usqp=CAU",
    },
    {
      id: 710,
      cardType: "rss_news_circle",
      title: "RSS News Circle",
      showWorldIcon: true,
      showDatabaseIcon: true,
      textContainer: "Data Feed Enabled",
      imageSrc: "https://images.unsplash.com/photo-1508921340878-ba53e1f016ec?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fG5ld3N8ZW58MHx8MHx8fDA%3D",
    },
    {
      id: 711,
      cardType: "rss_news_scroller",
      title: "RSS News Scroller",
      showWorldIcon: true,
      showDatabaseIcon: true,
      textContainer: "Data Feed Enabled",
      imageSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEOPa7VdKNVJGy6DcPs8Ud6lB7SzxX0QhY-X0dzYovvwzG5hSV1iA1iveMmH4aph1m19g&usqp=CAU",    },
    {
      id: 712,
      cardType: "rss_news_ticker",
      title: "RSS News Ticker",
      showWorldIcon: true,
      showDatabaseIcon: true,
      textContainer: "Data Feed Enabled",
      imageSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyHPEbg2jdPhCQ6yzRxsWl5AveTa7sgflzKPQMBf8Sfe9_PkTEmJv67aGLVvxcfmoF6B8&usqp=CAU",
    },
    {
      id: 713,
      cardType: "rss_slideshow",
      title: "RSS Slideshow",
      showWorldIcon: true,
      showDatabaseIcon: true,
      textContainer: "Data Feed Enabled",
      imageSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZuBdxZJnF7UziB2SZF78xL56S213w8za0eA&s",
    },
    {
      id: 714,
      cardType: "slideshow",
      title: "Slideshow",
      showWorldIcon: true,
      showDatabaseIcon: true,
      textContainer: "Data Feed Enabled",
      imageSrc: slideshow,
    },
  ],
}

 ,
{
  id: 8,
  name: "Office",
  type: "office",
  cards: [
    {
      id: 80,
      cardType: "employee_of_the_month",
      title: "Employee of the Month",
      showWorldIcon: true,
      showDatabaseIcon: false,
      textContainer: "Highlighting best employee",
      imageSrc: employee_of_the_month,
    },
    {
      id: 83,
      cardType: "new_employee",
      title: "New Employees",
      showWorldIcon: true,
      showDatabaseIcon: false,
      textContainer: "Welcome new joiners",
      imageSrc:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-Seqf2kSCXZP-BSuo5-weryCgpWZJH301Ng&s",
    },
    {
      id: 84,
      cardType: "our_team",
      title: "Our Team",
      showWorldIcon: false,
      showDatabaseIcon: false,
      textContainer: "Meet our amazing team",
      imageSrc:
        "https://www.slideegg.com/image/catalog/79862-our-team-ppt-template-free.png",
    },
    {
      id: 85,
      cardType: "success_cases",
      title: "Success Cases",
      showWorldIcon: false,
      showDatabaseIcon: true,
      textContainer: "Stories of achievement",
      imageSrc:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSdIp1eqySAF7CYgXXU3qc1FXR9q_jhB0mHQ&s",
    },
    {
      id: 86,
      cardType: "testimonials",
      title: "Testimonials",
      showWorldIcon: false,
      showDatabaseIcon: false,
      textContainer: "What people say about us",
      imageSrc: testimonials,
    },
    {
      id: 87,
      cardType: "wifi_zone",
      title: "Wi-Fi Zone",
      showWorldIcon: true,
      showDatabaseIcon: false,
      textContainer: "Stay connected",
      imageSrc:
        "data:image/png;base64,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",
    },
  ],
}

   ,
{ 
  id: 9, 
  name: "Other", 
  type: "other",
  cards: [    
    {
      id: 92,
      cardType: "audio_announcement_app",
      title: "Audio Announcement App",
      showWorldIcon: false,
      showDatabaseIcon: true,
      textContainer: "Automated announcements",
      imageSrc: audio_announcement_app,
    },
        {
      id: 95,
      cardType: "weather_exchange_ticker",
      title: "Weather + Exchange - Ticker",
      showWorldIcon: true,
      showDatabaseIcon: true,
      textContainer: "Live weather & currency",
      imageSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeIGsdF3S62W8eOqFJZB3zzadTqf3uX82HUQ&s",
    },
    {
      id: 93,
      cardType: "flight_status",
      title: "Flight Status",
      showWorldIcon: true,
      showDatabaseIcon: false,
      textContainer: "Real-time updates",
      imageSrc: flight_status,
    },


    {
      id: 91,
      cardType: "airport_flight_status",
      title: "Airport Flight Status",
      showWorldIcon: true,
      showDatabaseIcon: false,
      textContainer: "Stay connected",
      imageSrc: airport_flight_status,
    },
    {
      id: 94,
      cardType: "hdmi_input",
      title: "HDMI Input",
      showWorldIcon: false,
      showDatabaseIcon: false,
      textContainer: "External source enabled",
      imageSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLifEzS0VtGR2hxM91msDulwtJMLVcdyTQdA&s",
    }
  ]
}

,
{
  id: 10,
  name: "Social Network",
  type: "social_network",
  cards: [
        {
      id: 103,
      cardType: "facebook_page",
      title: "Facebook Page",
      showWorldIcon: true,
      showDatabaseIcon: false,
      textContainer: "Facebook",
      imageSrc: "https://img.freepik.com/free-vector/facebook-mobile-post-with-flat-design_23-2147820035.jpg?semt=ais_hybrid&w=740&q=80",
    },
    {
      id: 101,
      cardType: "animated_facebook_app",
      title: "Animated Facebook App",
      showWorldIcon: true,
      showDatabaseIcon: true,
      textContainer: "Facebook",
      imageSrc: "https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZmFjZWJvb2t8ZW58MHx8MHx8fDA%3D",
    },

        {
      id: 107,
      cardType: "youtube_video",
      title: "YouTube Video",
      showWorldIcon: true,
      showDatabaseIcon: false,
      textContainer: "YouTube",
      imageSrc: "https://images.unsplash.com/photo-1521302200778-33500795e128?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8eW91dHViZXxlbnwwfHwwfHx8MA%3D%3D",
    },

    {
      id: 102,
      cardType: "facebook_modern",
      title: "Facebook Modern",
      showWorldIcon: true,
      showDatabaseIcon: true,
      textContainer: "Facebook",
      imageSrc: "https://images.unsplash.com/photo-1594670297948-e910d5964979?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8RmFjZWJvb2t8ZW58MHx8MHx8fDA%3D",
    },
    {
      id: 104,
      cardType: "follow_us",
      title: "Follow Us",
      showWorldIcon: true,
      showDatabaseIcon: false,
      textContainer: "Follow",
      imageSrc: "https://images.unsplash.com/photo-1675352162363-ac40c3bb8265?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTJ8fEZhY2Vib29rfGVufDB8fDB8fHww",
    },
    {
      id: 105,
      cardType: "taggbox_display",
      title: "Taggbox Display",
      showWorldIcon: true,
      showDatabaseIcon: false,
      textContainer: "Taggbox",
      imageSrc: "https://plus.unsplash.com/premium_photo-1719958438164-48aa1176ab7b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8RGlzcGxheXxlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      id: 106,
      cardType: "walls_io",
      title: "Walls.io",
      showWorldIcon: true,
      showDatabaseIcon: false,
      textContainer: "Walls.io",
      imageSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnkWvHzJw4_v_M_kVuqIHcrfUm3TnP3hV55Q&s",
    },
  ]
}

,
{
  id: 11,
  name: "Sports",
  type: "sports",
  cards: [
    {
      id: 111,
      cardType: "match_score_widget",
      title: "Match scores widget",
      showWorldIcon: true,
      showDatabaseIcon: true,
      textContainer: "Match scores widget",
      imageSrc: match_score_widget,
    },
    {
      id: 112,
      cardType: "match_scores_widget_ii",
      title: "Match Scores Widget",
      showWorldIcon: true,
      showDatabaseIcon: true,
      textContainer: "Match Scores Widget",
      imageSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXUDew7q_xi957Tkd27alOeNj5dumIYXffnw&s",
    },
    {
      id: 113,
      cardType: "soccer_league_table",
      title: "Soccer league table",
      showWorldIcon: true,
      showDatabaseIcon: true,
      textContainer: "Soccer league table",
      imageSrc: soccer_league_table,
    },
    {
      id: 115,
      cardType: "soccer_scores",
      title: "Soccer Scores",
      showWorldIcon: true,
      showDatabaseIcon: true,
      textContainer: "Soccer Scores",
      imageSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYgiD4LcoQDtctsYzTzBaP1anKo6hPRVK-ug&s",
    },
    {
      id: 116,
      cardType: "soccer_tables",
      title: "Soccer Tables",
      showWorldIcon: true,
      showDatabaseIcon: true,
      textContainer: "Soccer Tables",
      imageSrc: "https://ninjatables.com/wp-content/uploads/2024/05/Soccer-League-Table-2-1.png",
    },
    {
      id: 114,
      cardType: "soccer_league_table_2",
      title: "Soccer league table",
      showWorldIcon: true,
      showDatabaseIcon: true,
      textContainer: "Soccer league table",
      imageSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSd2TgfjE6PG_PmdgWhP_B23fN7omJyA1uty7U1Bo6-nvExfTe4zyxZcmQqQwExv_c3jZs&usqp=CAU",
    },

  ],
}
,
{
  id: 12,
  name: "Text and Scrollers",
  type: "text_and_scrollers",
  cards: [
    {
      id: 122,
      cardType: "qr_code",
      title: "QR Code",
      showWorldIcon: true,
      showDatabaseIcon: true,
      textContainer: "QR Code",
      imageSrc: "https://cdn.pixabay.com/photo/2023/02/28/01/50/qr-code-7819652_1280.jpg",
    },

    {
      id: 121,
      cardType: "message_app",
      title: "Message App",
      showWorldIcon: true,
      showDatabaseIcon: true,
      textContainer: "Message App",
      imageSrc: "https://cdn.pixabay.com/photo/2018/05/18/15/16/message-3411360_1280.jpg",
    },
    {
      id: 124,
      cardType: "text_scroller",
      title: "Text Scroller",
      showWorldIcon: true,
      showDatabaseIcon: true,
      textContainer: "Text Scroller",
      imageSrc: "https://cdn.pixabay.com/photo/2015/06/01/09/00/adwords-793034_1280.jpg",
    },
    {
      id: 125,
      cardType: "text_ticker",
      title: "Text Ticker",
      showWorldIcon: true,
      showDatabaseIcon: true,
      textContainer: "Text Ticker",
      imageSrc: "https://cdn.pixabay.com/photo/2020/02/07/14/22/dream-4827288_1280.jpg",
    },
    {
      id: 126,
      cardType: "vertical_text_ticker",
      title: "Vertical Text Ticker",
      showWorldIcon: true,
      showDatabaseIcon: true,
      textContainer: "Vertical Text Ticker",
      imageSrc: "https://www.bwillcreative.com/wp-content/uploads/2022/08/how-to-create-vertical-text-in-photoshop-9.jpg",
    },

    {
      id: 123,
      cardType: "rich_text_widget",
      title: "Rich Text Widget",
      showWorldIcon: true,
      showDatabaseIcon: true,
      textContainer: "Rich Text Widget",
      imageSrc: rich_text_widget,
    },
  ],
}
,
{
  id: 13,
  name: "Third Party",
  type: "third_party",
  cards: [
    {
      id: 131,
      cardType: "geckoboard",
      title: "GeckoBoard",
      showWorldIcon: true,
      showDatabaseIcon: true,
      textContainer: "GeckoBoard",
      imageSrc: "data:image/png;base64,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",
    },
    {
      id: 132,
      cardType: "google_slides",
      title: "Google Slides",
      showWorldIcon: true,
      showDatabaseIcon: true,
      textContainer: "Google Slides",
      imageSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRb6w8wCujGQDQvcbb84DvlJso5jDmCA5nPRQ&s",
    },
    {
      id: 133,
      cardType: "klipfolio",
      title: "Klipfolio",
      showWorldIcon: true,
      showDatabaseIcon: true,
      textContainer: "Klipfolio",
      imageSrc: "data:image/png;base64,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",
    },
    {
      id: 134,
      cardType: "screenfeed",
      title: "Screenfeed",
      showWorldIcon: true,
      showDatabaseIcon: true,
      textContainer: "Screenfeed",
      imageSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDMZ-urnfL-A43RlgWUb0iZMKv04QWNH0m1g&s",
    },
    {
      id: 135,
      cardType: "streama",
      title: "Strea.ma",
      showWorldIcon: true,
      showDatabaseIcon: true,
      textContainer: "Strea.ma",
      imageSrc: "data:image/png;base64,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",
    },
  ],
}
,
{
  id: 14,
  name: "Weather",
  type: "weather",
  cards: [
    {
      id: 141,
      cardType: "modern_weather_forecast",
      title: "Modern Weather Forecast",
      showWorldIcon: true,
      showDatabaseIcon: true,
      textContainer: "Modern Weather Forecast",
      imageSrc: modern_weather_forecast,
    },
    {
      id: 142,
      cardType: "modern_weather_forecast_tall_bar",
      title: "Modern Weather Forecast Tall and Bar",
      showWorldIcon: true,
      showDatabaseIcon: true,
      textContainer: "Modern Weather Forecast Tall and Bar",
      imageSrc: "https://d4.alternativeto.net/TIJbKlKV2ctGfGxCfZwUVTc4p_EGKyaHxTRBTtr7i7s/rs:fill:309:197:1/g:no:0:0/YWJzOi8vZGlzdC9zL25pbWJ1cy13ZWF0aGVyXzU5MTAzMF9mdWxsLnBuZw.jpg",
    },
        {
      id: 147,
      cardType: "simple_weather_app",
      title: "Simple Weather App",
      showWorldIcon: true,
      showDatabaseIcon: true,
      textContainer: "Simple Weather App",
      imageSrc: simple_weather_app,
    },

    {
      id: 143,
      cardType: "multi_city_weather",
      title: "Multi City Weather",
      showWorldIcon: true,
      showDatabaseIcon: true,
      textContainer: "Multi City Weather",
      imageSrc: multi_city_weather,
    },
    {
      id: 144,
      cardType: "multi_city_weather_widget",
      title: "Multi City Weather Widget",
      showWorldIcon: true,
      showDatabaseIcon: true,
      textContainer: "Multi City Weather Widget",
      imageSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAHD0fBaYS9bKXRQPflaYsfT5b3NVGvhLB1w&s",
    },
    {
      id: 145,
      cardType: "multi_day_scrolling_weather",
      title: "Multi Day Scrolling Weather",
      showWorldIcon: true,
      showDatabaseIcon: true,
      textContainer: "Multi Day Scrolling Weather",
      imageSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAHD0fBaYS9bKXRQPflaYsfT5b3NVGvhLB1w&s",
    },
    {
      id: 146,
      cardType: "multi_day_weather",
      title: "Multi Day Weather",
      showWorldIcon: true,
      showDatabaseIcon: true,
      textContainer: "Multi Day Weather",
      imageSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAHD0fBaYS9bKXRQPflaYsfT5b3NVGvhLB1w&s",
    },
    {
      id: 148,
      cardType: "single_day_graph_weather",
      title: "Single Day Graph Weather",
      showWorldIcon: true,
      showDatabaseIcon: true,
      textContainer: "Single Day Graph Weather",
      imageSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAHD0fBaYS9bKXRQPflaYsfT5b3NVGvhLB1w&s",
    },
    {
      id: 149,
      cardType: "small_weather_app",
      title: "Small Weather App",
      showWorldIcon: true,
      showDatabaseIcon: true,
      textContainer: "Small Weather App",
      imageSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAHD0fBaYS9bKXRQPflaYsfT5b3NVGvhLB1w&s",
    },
    {
      id: 150,
      cardType: "themable_weather_forecast",
      title: "Themable Weather Forecast",
      showWorldIcon: true,
      showDatabaseIcon: true,
      textContainer: "Themable Weather Forecast",
      imageSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAHD0fBaYS9bKXRQPflaYsfT5b3NVGvhLB1w&s",
    },
    {
      id: 151,
      cardType: "weather",
      title: "Weather",
      showWorldIcon: true,
      showDatabaseIcon: true,
      textContainer: "Weather",
      imageSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAHD0fBaYS9bKXRQPflaYsfT5b3NVGvhLB1w&s",
    },
    {
      id: 152,
      cardType: "weather_forecast",
      title: "Weather Forecast",
      showWorldIcon: true,
      showDatabaseIcon: true,
      textContainer: "Weather Forecast",
      imageSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAHD0fBaYS9bKXRQPflaYsfT5b3NVGvhLB1w&s",
    },
    {
      id: 153,
      cardType: "weather_forecast_tall_bar",
      title: "Weather Forecast Tall and Bar",
      showWorldIcon: true,
      showDatabaseIcon: true,
      textContainer: "Weather Forecast Tall and Bar",
      imageSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAHD0fBaYS9bKXRQPflaYsfT5b3NVGvhLB1w&s",
    }
  ]
}
,
{
  id: 15,
  name: "Web & Media",
  type: "web_media",
  cards: [
        {
      id: 156,
      cardType: "website_link",
      title: "Website Link",
      showWorldIcon: true,
      showDatabaseIcon: true,
      textContainer: "Streaming Video Link",
      imageSrc: "https://images.unsplash.com/photo-1594394489098-74ac04c0fc2e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c3RyZWFtaW5nfGVufDB8fDB8fHww",
    }
,
    {
      id: 153,
      cardType: "media_cycling_app",
      title: "Media Cycling App",
      showWorldIcon: true,
      showDatabaseIcon: true,
      textContainer: "Media Cycling App",
      imageSrc: "https://images.unsplash.com/photo-1627301021815-3a04366c7d07?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWVkaWElMjBjeWNsaW5nJTIwYXBwfGVufDB8fDB8fHww",
    },
    {
      id: 154,
      cardType: "photos",
      title: "Photos",
      showWorldIcon: true,
      showDatabaseIcon: true,
      textContainer: "Photos",
      imageSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyji0OOZzom5SKy1HkszGHVr6jKVCoBQVOkA&s",
    },
    {
      id: 155,
      cardType: "streaming_video_link_1",
      title: "Streaming Video Link",
      showWorldIcon: true,
      showDatabaseIcon: true,
      textContainer: "Streaming Video Link",
      imageSrc: "https://images.unsplash.com/photo-1594394489098-74ac04c0fc2e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c3RyZWFtaW5nfGVufDB8fDB8fHww",
    },
  ]
}
,
  { id: 16, name: "Retired Apps", type: "retired_apps",
    cards: [    {
      id: 161,
      cardType: "twitter_modern",
      title: "Twitter Modern",
      showWorldIcon: true,
      showDatabaseIcon: true,
      textContainer: "Twitter Modern",
      imageSrc: "data:image/png;base64,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",
    }
]
   }
];



function App() {
  const [openHomeContent, setOpenHomeContent] = useState(false);

  return (
    <>
      <MediaCards onAppClick={() => setOpenHomeContent(true)} />

      <Galley />

      <Dialog
        open={openHomeContent}
        onClose={() => setOpenHomeContent(false)}
        maxWidth="md"
        fullWidth
      >
        <HomeContent categories={categories} onClose={() => setOpenHomeContent(false)} />
      </Dialog>
    </>
  );
}

export default App;
