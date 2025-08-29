import React, { useState } from "react";
import Galley from './components/Gallery/Gallery';
import HomeContent from './components/Home/HomeContent';
import MediaCards from './components/TopBar/MediaCard';
import { Dialog } from "@mui/material";
import { analog_round_clock ,clock_bar_classic, clock_bar_modern, countdown_app, digital_clock_simple, watch1,watch2,
  watch3, watch4, watch5, watch6, watch7, watch8, directory_list, rich_text_widget, seven_days_exchange_rate, currency_exchange_scroller,
  exchange_rate, simple_weather_app, modern_weather_forecast, multi_city_weather, flight_status, airport_flight_status, audio_announcement_app,
  match_score_widget, soccer_league_table
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
      imageSrc: watch4
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
      imageSrc: watch8
    },
    {
      id: 295,
      cardType: "todays_date",
      title: "Today's Date",
      showWorldIcon: true,
      showDatabaseIcon: true,
      textContainer: "Data Feed Enabled",
      imageSrc: watch2
    },
    {
      id: 296,
      cardType: "weather_clock",
      title: "Weather Clock",
      showWorldIcon: true,
      showDatabaseIcon: true,
      textContainer: "Data Feed Enabled",
      imageSrc: watch3
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
      imageSrc: "https://plus.unsplash.com/premium_photo-1661443781814-333019eaad2d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8ZmluYW5jZXxlbnwwfHwwfHx8MA%3D%3D"
    },
    {
      id: 46,
      cardType: "multi_currency_exchange_rate",
      title: "Multi-currency Exchange Rate",
      showWorldIcon: true,
      showDatabaseIcon: true,
      textContainer: "Data Feed Enabled",
      imageSrc: "https://plus.unsplash.com/premium_photo-1661443781814-333019eaad2d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8ZmluYW5jZXxlbnwwfHwwfHx8MA%3D%3D"
    },
    {
      id: 47,
      cardType: "single_exchange_rate",
      title: "Single Exchange Rate",
      showWorldIcon: true,
      showDatabaseIcon: true,
      textContainer: "Data Feed Enabled",
      imageSrc: "https://plus.unsplash.com/premium_photo-1661443781814-333019eaad2d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8ZmluYW5jZXxlbnwwfHwwfHx8MA%3D%3D"
    },
    {
      id: 48,
      cardType: "single_exchange_rate_chart",
      title: "Single Exchange Rate Chart",
      showWorldIcon: true,
      showDatabaseIcon: true,
      textContainer: "Data Feed Enabled",
      imageSrc: "https://plus.unsplash.com/premium_photo-1661443781814-333019eaad2d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8ZmluYW5jZXxlbnwwfHwwfHx8MA%3D%3D"
    },
    {
      id: 49,
      cardType: "single_ticker",
      title: "Single Ticker",
      showWorldIcon: true,
      showDatabaseIcon: true,
      textContainer: "Data Feed Enabled",
      imageSrc: "https://plus.unsplash.com/premium_photo-1661443781814-333019eaad2d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8ZmluYW5jZXxlbnwwfHwwfHx8MA%3D%3D"
    },
    {
      id: 401,
      cardType: "symbol_info",
      title: "Symbol Info",
      showWorldIcon: true,
      showDatabaseIcon: true,
      textContainer: "Data Feed Enabled",
      imageSrc: "https://plus.unsplash.com/premium_photo-1661443781814-333019eaad2d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8ZmluYW5jZXxlbnwwfHwwfHx8MA%3D%3D"
    },
    {
      id: 402,
      cardType: "symbol_overview",
      title: "Symbol Overview",
      showWorldIcon: true,
      showDatabaseIcon: true,
      textContainer: "Data Feed Enabled",
      imageSrc: "https://plus.unsplash.com/premium_photo-1661443781814-333019eaad2d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8ZmluYW5jZXxlbnwwfHwwfHx8MA%3D%3D"
    },
    {
      id: 403,
      cardType: "ticker",
      title: "Ticker",
      showWorldIcon: true,
      showDatabaseIcon: true,
      textContainer: "Data Feed Enabled",
      imageSrc: "https://plus.unsplash.com/premium_photo-1661443781814-333019eaad2d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8ZmluYW5jZXxlbnwwfHwwfHx8MA%3D%3D"
    },
    {
      id: 404,
      cardType: "ticker_tape",
      title: "Ticker Tape",
      showWorldIcon: true,
      showDatabaseIcon: true,
      textContainer: "Data Feed Enabled",
      imageSrc: "https://plus.unsplash.com/premium_photo-1661443781814-333019eaad2d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8ZmluYW5jZXxlbnwwfHwwfHx8MA%3D%3D"
    },
    {
      id: 405,
      cardType: "american_football_entertainment",
      title: "American Football",
      showWorldIcon: true,
      showDatabaseIcon: true,
      textContainer: "Data Feed Enabled",
      imageSrc: "https://plus.unsplash.com/premium_photo-1661443781814-333019eaad2d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8ZmluYW5jZXxlbnwwfHwwfHx8MA%3D%3D"
    },
    {
      id: 406,
      cardType: "finance_custom",
      title: "Finance Custom Widget",
      showWorldIcon: true,
      showDatabaseIcon: true,
      textContainer: "Data Feed Enabled",
      imageSrc: "https://plus.unsplash.com/premium_photo-1661443781814-333019eaad2d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8ZmluYW5jZXxlbnwwfHwwfHx8MA%3D%3D"
    }
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
      imageSrc: "https://images.unsplash.com/photo-1573167507387-6b4b98cb7c13?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fG1lZXRpbmclMjByb29tfGVufDB8fDB8fHww"
    },
    {
      id: 51,
      cardType: "birthday_announcement_2",
      title: "Birthday Announcement",
      showWorldIcon: true,
      showDatabaseIcon: true,
      textContainer: "Data Feed Enabled",
      imageSrc: "https://images.unsplash.com/photo-1431540015161-0bf868a2d407?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWVldGluZyUyMHJvb218ZW58MHx8MHx8fDA%3D"
    },
    {
      id: 52,
      cardType: "calendar_app",
      title: "Calendar App",
      showWorldIcon: true,
      showDatabaseIcon: true,
      textContainer: "Data Feed Enabled",
      imageSrc: "https://plus.unsplash.com/premium_photo-1681487144031-d502ea9abefc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bWVldGluZyUyMHJvb218ZW58MHx8MHx8fDA%3D"
    },
    {
      id: 53,
      cardType: "events_calendar",
      title: "Events Calendar",
      showWorldIcon: true,
      showDatabaseIcon: true,
      textContainer: "Data Feed Enabled",
      imageSrc: "https://images.unsplash.com/photo-1633526543814-9718c8922b7a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Q2FsZW5kYXJ8ZW58MHx8MHx8fDA%3D"
    },
    {
      id: 54,
      cardType: "happy_birthday",
      title: "Happy Birthday",
      showWorldIcon: true,
      showDatabaseIcon: true,
      textContainer: "Data Feed Enabled",
      imageSrc: "https://images.unsplash.com/photo-1506784365847-bbad939e9335?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Q2FsZW5kYXJ8ZW58MHx8MHx8fDA%3D"
    },
    {
      id: 55,
      cardType: "happy_birthday_elegant",
      title: "Happy Birthday - Elegant",
      showWorldIcon: true,
      showDatabaseIcon: true,
      textContainer: "Data Feed Enabled",
      imageSrc: "https://images.unsplash.com/photo-1611988615248-5d4f0b9ac31e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Q2FsZW5kYXJ8ZW58MHx8MHx8fDA%3D"
    },
    {
      id: 56,
      cardType: "happy_birthday_enterprise",
      title: "Happy Birthday - Enterprise",
      showWorldIcon: true,
      showDatabaseIcon: true,
      textContainer: "Data Feed Enabled",
      imageSrc: "https://images.unsplash.com/photo-1493934558415-9d19f0b2b4d2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fENhbGVuZGFyfGVufDB8fDB8fHww"
    },
    {
      id: 57,
      cardType: "meeting_room_calendar_app",
      title: "Meeting Room Calendar App",
      showWorldIcon: true,
      showDatabaseIcon: true,
      textContainer: "Data Feed Enabled",
      imageSrc: "https://images.unsplash.com/photo-1573167507387-6b4b98cb7c13?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fG1lZXRpbmclMjByb29tfGVufDB8fDB8fHww"
    },
    {
      id: 58,
      cardType: "meeting_room_calendar_bar_app",
      title: "Meeting Room Calendar Bar App",
      showWorldIcon: true,
      showDatabaseIcon: true,
      textContainer: "Data Feed Enabled",
      imageSrc: "https://images.unsplash.com/photo-1431540015161-0bf868a2d407?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWVldGluZyUyMHJvb218ZW58MHx8MHx8fDA%3D"
    },
    {
      id: 59,
      cardType: "calendar_custom",
      title: "Calendar Custom Widget",
      showWorldIcon: true,
      showDatabaseIcon: true,
      textContainer: "Data Feed Enabled",
      imageSrc: "https://plus.unsplash.com/premium_photo-1681487144031-d502ea9abefc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bWVldGluZyUyMHJvb218ZW58MHx8MHx8fDA%3D"
    },
    {
      id: 501,
      cardType: "calendar_extra_1",
      title: "Calendar Extra 1",
      showWorldIcon: true,
      showDatabaseIcon: true,
      textContainer: "Data Feed Enabled",
      imageSrc: "https://images.unsplash.com/photo-1633526543814-9718c8922b7a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Q2FsZW5kYXJ8ZW58MHx8MHx8fDA%3D"
    },
    {
      id: 502,
      cardType: "calendar_extra_2",
      title: "Calendar Extra 2",
      showWorldIcon: true,
      showDatabaseIcon: true,
      textContainer: "Data Feed Enabled",
      imageSrc: "https://images.unsplash.com/photo-1506784365847-bbad939e9335?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Q2FsZW5kYXJ8ZW58MHx8MHx8fDA%3D"
    },
    {
      id: 503,
      cardType: "calendar_extra_3",
      title: "Calendar Extra 3",
      showWorldIcon: true,
      showDatabaseIcon: true,
      textContainer: "Data Feed Enabled",
      imageSrc: "https://images.unsplash.com/photo-1611988615248-5d4f0b9ac31e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Q2FsZW5kYXJ8ZW58MHx8MHx8fDA%3D"
    }
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
        "https://images.unsplash.com/photo-1599250300435-b9693f21830d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8TWVudSUyMGJvYXJkfGVufDB8fDB8fHww",
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
        "https://images.unsplash.com/photo-1743811928684-f134eba5e956?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fE1lbnUlMjBib2FyZHxlbnwwfHwwfHx8MA%3D%3D",
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
        "https://images.unsplash.com/photo-1542557821-c1e414d44fdf?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8TWVudSUyMGJvYXJkfGVufDB8fDB8fHww",
    },
    {
      id: 65,
      cardType: "sales_app_simple",
      title: "Sales App - Simple",
      showWorldIcon: true,
      showDatabaseIcon: true,
      textContainer: "Data Feed Enabled",
      imageSrc:
        "https://images.unsplash.com/photo-1743811928684-f134eba5e956?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fE1lbnUlMjBib2FyZHxlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      id: 66,
      cardType: "sales_grid",
      title: "Sales Grid",
      showWorldIcon: true,
      showDatabaseIcon: true,
      textContainer: "Data Feed Enabled",
      imageSrc:
        "https://images.unsplash.com/photo-1599250300435-b9693f21830d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8TWVudSUyMGJvYXJkfGVufDB8fDB8fHww",
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
        "https://images.unsplash.com/photo-1560957123-e8e019c66980?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDd8fG5ld3N8ZW58MHx8MHx8fDA%3D",
    },
    {
      id: 71,
      cardType: "configurable_rss_news",
      title: "Configurable RSS News",
      showWorldIcon: true,
      showDatabaseIcon: true,
      textContainer: "Data Feed Enabled",
      imageSrc: "https://images.unsplash.com/photo-1495020689067-958852a7765e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bmV3c3xlbnwwfHwwfHx8MA%3D%3D",
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
      imageSrc: "https://images.unsplash.com/photo-1508921340878-ba53e1f016ec?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fG5ld3N8ZW58MHx8MHx8fDA%3D",
    },
    {
      id: 73,
      cardType: "creative_rss",
      title: "Creative RSS",
      showWorldIcon: true,
      showDatabaseIcon: true,
      textContainer: "Data Feed Enabled",
      imageSrc: "https://plus.unsplash.com/premium_photo-1688561383203-31fed3d85417?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fG5ld3N8ZW58MHx8MHx8fDA%3D",
    },
    {
      id: 74,
      cardType: "cycling_media_rss",
      title: "Cycling Media RSS",
      showWorldIcon: true,
      showDatabaseIcon: true,
      textContainer: "Data Feed Enabled",
      imageSrc: "https://images.unsplash.com/photo-1444653614773-995cb1ef9efa?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fG5ld3N8ZW58MHx8MHx8fDA%3D",
    },
    {
      id: 75,
      cardType: "flexible_news_ticker",
      title: "Flexible News Ticker",
      showWorldIcon: true,
      showDatabaseIcon: true,
      textContainer: "Data Feed Enabled",
      imageSrc: "https://plus.unsplash.com/premium_photo-1691223714409-b0cb1629f0f7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjV8fG5ld3N8ZW58MHx8MHx8fDA%3D",
    },
    {
      id: 76,
      cardType: "media_rss",
      title: "Media RSS",
      showWorldIcon: true,
      showDatabaseIcon: true,
      textContainer: "Data Feed Enabled",
      imageSrc: "https://images.unsplash.com/photo-1585776245991-cf89dd7fc73a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzJ8fG5ld3N8ZW58MHx8MHx8fDA%3D",
    },
    {
      id: 77,
      cardType: "modern_news",
      title: "Modern News",
      showWorldIcon: true,
      showDatabaseIcon: true,
      textContainer: "Data Feed Enabled",
      imageSrc: "https://images.unsplash.com/photo-1557804506-e969d7b32a4b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzR8fG5ld3N8ZW58MHx8MHx8fDA%3D",
    },
    {
      id: 78,
      cardType: "modern_rss",
      title: "Modern RSS",
      showWorldIcon: true,
      showDatabaseIcon: true,
      textContainer: "Data Feed Enabled",
      imageSrc: "https://images.unsplash.com/photo-1503428593586-e225b39bddfe?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzZ8fG5ld3N8ZW58MHx8MHx8fDA%3D",
    },
    {
      id: 79,
      cardType: "news_circle",
      title: "News Circle",
      showWorldIcon: true,
      showDatabaseIcon: true,
      textContainer: "Data Feed Enabled",
      imageSrc: "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bmV3c3xlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      id: 700,
      cardType: "news_feed_1",
      title: "News Feed 1",
      showWorldIcon: true,
      showDatabaseIcon: true,
      textContainer: "Data Feed Enabled",
      imageSrc: "https://images.unsplash.com/photo-1495020689067-958852a7765e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bmV3c3xlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      id: 701,
      cardType: "news_feed_3",
      title: "News Feed 3",
      showWorldIcon: true,
      showDatabaseIcon: true,
      textContainer: "Data Feed Enabled",
      imageSrc: "https://images.unsplash.com/photo-1508921340878-ba53e1f016ec?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fG5ld3N8ZW58MHx8MHx8fDA%3D",
    },
    {
      id: 703,
      cardType: "news_scroller_2",
      title: "News Scroller",
      showWorldIcon: true,
      showDatabaseIcon: true,
      textContainer: "Data Feed Enabled",
      imageSrc: "https://images.unsplash.com/photo-1444653614773-995cb1ef9efa?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fG5ld3N8ZW58MHx8MHx8fDA%3D",
    },
    {
      id: 704,
      cardType: "news_ticker",
      title: "News Ticker",
      showWorldIcon: true,
      showDatabaseIcon: true,
      textContainer: "Data Feed Enabled",
      imageSrc: "https://plus.unsplash.com/premium_photo-1691223714409-b0cb1629f0f7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjV8fG5ld3N8ZW58MHx8MHx8fDA%3D",
    },
    {
      id: 705,
      cardType: "news_ticker_2",
      title: "News Ticker 2",
      showWorldIcon: true,
      showDatabaseIcon: true,
      textContainer: "Data Feed Enabled",
      imageSrc: "https://images.unsplash.com/photo-1585776245991-cf89dd7fc73a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzJ8fG5ld3N8ZW58MHx8MHx8fDA%3D",
    },
    {
      id: 706,
      cardType: "news_wall",
      title: "News Wall",
      showWorldIcon: true,
      showDatabaseIcon: true,
      textContainer: "Data Feed Enabled",
      imageSrc: "https://images.unsplash.com/photo-1557804506-e969d7b32a4b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzR8fG5ld3N8ZW58MHx8MHx8fDA%3D",
    },
    {
      id: 707,
      cardType: "rss_news_1",
      title: "RSS News 1",
      showWorldIcon: true,
      showDatabaseIcon: true,
      textContainer: "Data Feed Enabled",
      imageSrc: "https://images.unsplash.com/photo-1503428593586-e225b39bddfe?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzZ8fG5ld3N8ZW58MHx8MHx8fDA%3D",
    },
    {
      id: 708,
      cardType: "rss_news_2",
      title: "RSS News 2",
      showWorldIcon: true,
      showDatabaseIcon: true,
      textContainer: "Data Feed Enabled",
      imageSrc: "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bmV3c3xlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      id: 709,
      cardType: "rss_news_3",
      title: "RSS News 3",
      showWorldIcon: true,
      showDatabaseIcon: true,
      textContainer: "Data Feed Enabled",
      imageSrc: "https://images.unsplash.com/photo-1495020689067-958852a7765e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bmV3c3xlbnwwfHwwfHx8MA%3D%3D",
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
      imageSrc: "https://plus.unsplash.com/premium_photo-1688561383203-31fed3d85417?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fG5ld3N8ZW58MHx8MHx8fDA%3D",
    },
    {
      id: 712,
      cardType: "rss_news_ticker",
      title: "RSS News Ticker",
      showWorldIcon: true,
      showDatabaseIcon: true,
      textContainer: "Data Feed Enabled",
      imageSrc: "https://images.unsplash.com/photo-1444653614773-995cb1ef9efa?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fG5ld3N8ZW58MHx8MHx8fDA%3D",
    },
    {
      id: 713,
      cardType: "rss_slideshow",
      title: "RSS Slideshow",
      showWorldIcon: true,
      showDatabaseIcon: true,
      textContainer: "Data Feed Enabled",
      imageSrc: "https://plus.unsplash.com/premium_photo-1691223714409-b0cb1629f0f7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjV8fG5ld3N8ZW58MHx8MHx8fDA%3D",
    },
    {
      id: 714,
      cardType: "slideshow",
      title: "Slideshow",
      showWorldIcon: true,
      showDatabaseIcon: true,
      textContainer: "Data Feed Enabled",
      imageSrc: "https://images.unsplash.com/photo-1585776245991-cf89dd7fc73a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzJ8fG5ld3N8ZW58MHx8MHx8fDA%3D",
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
      imageSrc:
        "https://plus.unsplash.com/premium_photo-1661962240004-811203de822f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZW1wbG95ZWUlMjBvZiUyMHRoZSUyMG1vbnRofGVufDB8fDB8fHww",
    },
    {
      id: 83,
      cardType: "new_employee",
      title: "New Employees",
      showWorldIcon: true,
      showDatabaseIcon: false,
      textContainer: "Welcome new joiners",
      imageSrc:
        "https://plus.unsplash.com/premium_photo-1678917827802-721b5f5b4bf0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8TmV3JTIwRW1wbG95ZWV8ZW58MHx8MHx8fDA%3D",
    },
    {
      id: 84,
      cardType: "our_team",
      title: "Our Team",
      showWorldIcon: false,
      showDatabaseIcon: false,
      textContainer: "Meet our amazing team",
      imageSrc:
        "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=500&auto=format&fit=crop&q=60",
    },
    {
      id: 85,
      cardType: "success_cases",
      title: "Success Cases",
      showWorldIcon: false,
      showDatabaseIcon: true,
      textContainer: "Stories of achievement",
      imageSrc:
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=500&auto=format&fit=crop&q=60",
    },
    {
      id: 86,
      cardType: "testimonials",
      title: "Testimonials",
      showWorldIcon: false,
      showDatabaseIcon: false,
      textContainer: "What people say about us",
      imageSrc:
        "https://images.unsplash.com/photo-1518893494013-481c1d8ed3fd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8TmV3JTIwRW1wbG95ZWV8ZW58MHx8MHx8fDA%3D",
    },
    {
      id: 87,
      cardType: "wifi_zone",
      title: "Wi-Fi Zone",
      showWorldIcon: true,
      showDatabaseIcon: false,
      textContainer: "Stay connected",
      imageSrc:
        "https://images.unsplash.com/photo-1504384764586-bb4cdc1707b0?w=500&auto=format&fit=crop&q=60",
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
      imageSrc: "https://plus.unsplash.com/premium_photo-1675518471364-643730a474a9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8R2Vja29Cb2FyZHxlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      id: 132,
      cardType: "google_slides",
      title: "Google Slides",
      showWorldIcon: true,
      showDatabaseIcon: true,
      textContainer: "Google Slides",
      imageSrc: "https://plus.unsplash.com/premium_photo-1675518471364-643730a474a9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8R2Vja29Cb2FyZHxlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      id: 133,
      cardType: "klipfolio",
      title: "Klipfolio",
      showWorldIcon: true,
      showDatabaseIcon: true,
      textContainer: "Klipfolio",
      imageSrc: "https://plus.unsplash.com/premium_photo-1675518471364-643730a474a9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8R2Vja29Cb2FyZHxlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      id: 134,
      cardType: "screenfeed",
      title: "Screenfeed",
      showWorldIcon: true,
      showDatabaseIcon: true,
      textContainer: "Screenfeed",
      imageSrc: "https://plus.unsplash.com/premium_photo-1675518471364-643730a474a9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8R2Vja29Cb2FyZHxlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      id: 135,
      cardType: "streama",
      title: "Strea.ma",
      showWorldIcon: true,
      showDatabaseIcon: true,
      textContainer: "Strea.ma",
      imageSrc: "https://plus.unsplash.com/premium_photo-1675518471364-643730a474a9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8R2Vja29Cb2FyZHxlbnwwfHwwfHx8MA%3D%3D",
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
