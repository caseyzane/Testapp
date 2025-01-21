// src/components/SkiDashboardCard.jsx

import React from 'react';
import { 
  WiDaySunny, 
  WiCloudy, 
  WiRain, 
  WiSnow, 
  WiThunderstorm, 
  WiFog, 
  WiDayCloudy 
} from 'react-icons/wi';
import './SkiDashboardCard.css';

// Mapping weather conditions to corresponding react-icons
const iconMapping = {
  Clear: <WiDaySunny className="weather-icon sunny" />,
  'Mainly Clear': <WiDayCloudy className="weather-icon partly-cloudy" />,
  'Partly Cloudy': <WiCloudy className="weather-icon cloudy" />,
  Overcast: <WiCloudy className="weather-icon overcast" />,
  Fog: <WiFog className="weather-icon fog" />,
  'Depositing Rime Fog': <WiFog className="weather-icon fog" />,
  'Light Drizzle': <WiRain className="weather-icon rain" />,
  'Moderate Drizzle': <WiRain className="weather-icon rain" />,
  'Dense Drizzle': <WiRain className="weather-icon rain" />,
  'Light Freezing Drizzle': <WiRain className="weather-icon sleet" />,
  'Dense Freezing Drizzle': <WiRain className="weather-icon sleet" />,
  'Slight Rain': <WiRain className="weather-icon rain" />,
  'Moderate Rain': <WiRain className="weather-icon rain" />,
  'Heavy Rain': <WiRain className="weather-icon rain" />,
  'Light Freezing Rain': <WiRain className="weather-icon sleet" />,
  'Heavy Freezing Rain': <WiRain className="weather-icon sleet" />,
  'Slight Snow Fall': <WiSnow className="weather-icon snow" />,
  'Moderate Snow Fall': <WiSnow className="weather-icon snow" />,
  'Heavy Snow Fall': <WiSnow className="weather-icon snow" />,
  'Snow Grains': <WiSnow className="weather-icon snow" />,
  'Slight Snow Showers': <WiSnow className="weather-icon snow" />,
  'Heavy Snow Showers': <WiSnow className="weather-icon snow" />,
  'Thunderstorm': <WiThunderstorm className="weather-icon thunderstorm" />,
  'Thunderstorm with Slight Hail': <WiThunderstorm className="weather-icon thunderstorm" />,
  'Thunderstorm with Heavy Hail': <WiThunderstorm className="weather-icon thunderstorm" />,
};

// Helper function to get the appropriate icon based on condition
const getWeatherIcon = (condition) => {
  return iconMapping[condition] || <WiCloudy className="weather-icon default" />;
};

// Helper function to determine if a condition is snowfall
const isSnowfall = (condition) => {
  const snowfallConditions = [
    'Slight Snow Fall',
    'Moderate Snow Fall',
    'Heavy Snow Fall',
    'Snow Grains',
    'Slight Snow Showers',
    'Heavy Snow Showers',
  ];
  return snowfallConditions.includes(condition);
};

const SkiDashboardCard = ({
  resortName,
  forecast,
  bestDays,
  showBestConditions,
  logo,
  loading,
  error,
}) => {
  if (loading) {
    return (
      <div className="ski-card">
        <div className="ski-card-content">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="ski-card">
        <div className="ski-card-content">
          <p>Error fetching data.</p>
        </div>
      </div>
    );
  }

  // Function to format date to "Mon Jan 16"
  const formatDate = (dateString) => {
    const options = { weekday: 'short', month: 'short', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', options);
  };

  // Determine which days to show based on toggle state
  const daysToShow = showBestConditions
    ? forecast.filter((day) => bestDays.includes(day.date))
    : forecast;

  return (
    <div className="ski-card">
      <div className="ski-card-content">
        <div className="ski-card-logo-container">
          <img
            src={logo}
            alt={`${resortName} Logo`}
            className="ski-card-logo"
            loading="lazy"
          />
        </div>
        <h2 className="ski-card-title">{resortName}</h2>

        {/* Conditionally render Best Days or Forecast */}
        {showBestConditions ? (
          <div className="ski-card-best-days">
            <h3>Best Days:</h3>
            {daysToShow.length > 0 ? (
              <ul className="best-days-list">
                {daysToShow.map((day, index) => {
                  const snow = isSnowfall(day.condition);
                  return (
                    <li
                      key={index}
                      className={`best-day-item ${snow ? 'highlight-snow' : ''}`}
                    >
                      {getWeatherIcon(day.condition)}
                      <span className="best-day-text">
                        {formatDate(day.date)} - {day.condition}, {day.temperature}°F
                      </span>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p>No best days available based on the criteria.</p>
            )}
          </div>
        ) : (
          <>
            <h3 className="ski-card-forecast-title">Forecast</h3>
            {daysToShow.length > 0 ? (
              <ul className="ski-card-forecast-list">
                {daysToShow.map((day, index) => {
                  const snow = isSnowfall(day.condition);
                  return (
                    <li
                      key={index}
                      className={`ski-card-forecast-item ${snow ? 'highlight-snow' : ''}`}
                    >
                      <div className="forecast-date">{formatDate(day.date)}</div>
                      <div className="forecast-divider"></div>
                      <div className="forecast-info">
                        {getWeatherIcon(day.condition)}
                        <span className="forecast-text">
                          {day.condition ? day.condition : 'No Data'}, {day.temperature}°F
                        </span>
                      </div>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p>No forecast data available.</p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default React.memo(SkiDashboardCard);
