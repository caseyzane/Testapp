// src/components/SkiDashboardCard.jsx

import React from 'react';
import './SkiDashboardCard.css';

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

  console.log(`Rendering forecast for ${resortName}:`, daysToShow);

  return (
    <div className="ski-card">
      <div className="ski-card-content">
        <div className="ski-card-logo-container">
          <img src={logo} alt={`${resortName} Logo`} className="ski-card-logo" loading="lazy" />
        </div>
        <h2 className="ski-card-title">{resortName}</h2>
        {showBestConditions && (
          <div className="ski-card-best-days">
            <h3>Best Days:</h3>
            <ul>
              {daysToShow.map((day, index) => (
                <li key={index}>
                  {formatDate(day.date)} - {day.condition}, {day.temperature}°F
                </li>
              ))}
            </ul>
          </div>
        )}
        <h3 className="ski-card-forecast-title">Forecast</h3>
        <ul className="ski-card-forecast-list">
          {daysToShow.map((day, index) => (
            <li key={index} className="ski-card-forecast-item">
              <span>{formatDate(day.date)}</span>
              <span className="ski-card-forecast-text">
                {day.condition ? day.condition : 'No Data'}, {day.temperature}°F
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default React.memo(SkiDashboardCard);
