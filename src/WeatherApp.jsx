import React, { useState, useEffect } from "react";
import WeatherDetails from "./WeatherDetails";
import WeatherSearch from "./WeatherSearch";
import apiKeys from "./apiKeys";
import "./App.css";

const WeatherApp = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // On mount, get user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchWeatherByCoords(position.coords.latitude, position.coords.longitude);
        },
        () => {
          // Default to Delhi if denied
          fetchWeatherByCity("Delhi");
        }
      );
    } else {
      fetchWeatherByCity("Delhi");
    }
  }, []);

  const fetchWeatherByCoords = async (lat, lon) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(
        `${apiKeys.base}weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKeys.key}`
      );
      if (!res.ok) throw new Error("Failed to fetch weather");
      const data = await res.json();
      setWeather(data);
    } catch (err) {
      setError("Could not fetch weather for your location.");
    } finally {
      setLoading(false);
    }
  };

  const fetchWeatherByCity = async (city) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(
        `${apiKeys.base}weather?q=${encodeURIComponent(city)}&units=metric&appid=${apiKeys.key}`
      );
      if (!res.ok) throw new Error("City not found");
      const data = await res.json();
      setWeather(data);
    } catch (err) {
      setError("City not found. Try another.");
    } finally {
      setLoading(false);
    }
  };

  // Determine background image based on weather
  let bgImage = "/weather-bg/clear.jpg";
  if (weather && weather.weather && weather.weather[0]) {
    const main = weather.weather[0].main.toLowerCase();
    if (main.includes("cloud")) bgImage = "/weather-bg/cloudy.jpg";
    else if (main.includes("rain")) bgImage = "/weather-bg/rain.jpg";
    else if (main.includes("thunder")) bgImage = "/weather-bg/thunder.jpg";
    else if (main.includes("snow")) bgImage = "/weather-bg/snow.jpg";
    else if (main.includes("clear")) bgImage = "/weather-bg/clear.jpg";
    else if (main.includes("mist") || main.includes("fog")) bgImage = "/weather-bg/fog.jpg";
    else if (main.includes("drizzle")) bgImage = "/weather-bg/drizzle.jpg";
  }

  return (
    <div className="weather-app-bg" style={{
      backgroundImage: `linear-gradient(rgba(116,235,213,0.3),rgba(172,182,229,0.3)), url('${bgImage}')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '100vh',
      width: '100vw',
      position: 'fixed',
      top: 0,
      left: 0,
      zIndex: 0,
      transition: 'background-image 0.7s cubic-bezier(.4,2,.6,1)'
    }}>
      <div className="weather-app-container">
        <h1>SkyCast</h1>
        <WeatherSearch onSearch={fetchWeatherByCity} />
        {loading && <p className="loading">Loading weather...</p>}
        {error && <p className="error">{error}</p>}
        <WeatherDetails weather={weather} />
        <footer className="footer-info">
          <b>Made by: Pankaj</b>
        </footer>
      </div>
    </div>
  );
};

export default WeatherApp;
