import React from "react";

const WeatherDetails = ({ weather }) => {
  if (!weather) return null;
  return (
    <div className="weather-details">
      <h2>{weather.name}, {weather.sys.country}</h2>
      <div className="weather-main">
        <img
          src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
          alt={weather.weather[0].description}
        />
        <div>
          <h1>{Math.round(weather.main.temp)}°C</h1>
          <p>{weather.weather[0].main}</p>
        </div>
      </div>
      <div className="weather-extra">
        <p>Humidity: {weather.main.humidity}%</p>
        <p>Wind: {Math.round(weather.wind.speed)} m/s</p>
        <p>Feels like: {Math.round(weather.main.feels_like)}°C</p>
        <p>Min: {Math.round(weather.main.temp_min)}°C / Max: {Math.round(weather.main.temp_max)}°C</p>
      </div>
    </div>
  );
};

export default WeatherDetails;
