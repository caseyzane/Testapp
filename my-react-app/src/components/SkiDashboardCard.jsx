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

  const daysToShow = showBestConditions ? bestDays : forecast;

  return (
    <div className="ski-card">
      <div className="ski-card-content">
        <div className="ski-card-logo-container">
          <img src={logo} alt={`${resortName} Logo`} className="ski-card-logo" />
        </div>
        <h2 className="ski-card-title">{resortName}</h2>
        {showBestConditions && (
          <p className="ski-card-best-days">Best Days: {bestDays.join(', ')}</p>
        )}
        <h3 className="ski-card-forecast-title">Forecast</h3>
        <ul className="ski-card-forecast-list">
          {daysToShow.map((day, index) => (
            <li key={index} className="ski-card-forecast-item">
              {/* Example forecast item: Date and condition */}
              <span>{day.date}</span>
              <span className="ski-card-forecast-text">{day.condition}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SkiDashboardCard;
