import React from "react";

// A simple forecast component for demonstration. You can enhance this further.
const Forecast = ({ icon, weather }) => {
  // You can add more detailed forecast data here if available from the API
  return (
    <div className="forecast">
      <div className="forecast-icon">
        {/* You can use a weather icon library or static images here */}
        <span style={{ fontSize: 48 }}>{icon === "RAIN" ? "🌧️" : icon === "CLOUDY" ? "☁️" : icon === "SNOW" ? "❄️" : icon === "WIND" ? "💨" : icon === "FOG" ? "🌫️" : "☀️"}</span>
      </div>
      <div className="today-weather">
        <h3>{weather}</h3>
        <ul>
          <li>Forecast: <span>More details soon</span></li>
        </ul>
      </div>
    </div>
  );
};

export default Forecast;
