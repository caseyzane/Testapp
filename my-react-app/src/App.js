// src/App.js

import React, { useState } from 'react';
import SkiDashboardCard from './components/SkiDashboardCard';
import './App.css';

// Import logos
import belleayreLogo from './assets/logos/belleayre.png';
import goreLogo from './assets/logos/gore.png';
import windhamLogo from './assets/logos/windham.png';
import stoweLogo from './assets/logos/stowe.png';
import smugglersLogo from './assets/logos/smugglersnotch.png';
import jiminyPeakLogo from './assets/logos/jiminypeak.png';

// Import useWeather hook
import useWeather from './hooks/useWeather';

function App() {
  const [showBestConditions, setShowBestConditions] = useState(false);

  // Define resort locations with latitude and longitude
  const locations = {
    Belleayre: { lat: 42.0436, lon: -74.2062 },
    Gore: { lat: 42.3333, lon: -73.9022 },
    Windham: { lat: 41.3232, lon: -73.1250 },
    Stowe: { lat: 44.4919, lon: -72.7797 },
    Smugglers: { lat: 43.5753, lon: -72.6668 },
    JiminyPeak: { lat: 42.3925, lon: -72.8833 },
  };

  // Fetch weather data for each resort using the useWeather hook
  const {
    forecast: belleayreForecast,
    bestDays: belleayreBestDays,
    loading: belleayreLoading,
    error: belleayreError,
  } = useWeather('Belleayre Mountain', locations.Belleayre.lat, locations.Belleayre.lon);

  const {
    forecast: goreForecast,
    bestDays: goreBestDays,
    loading: goreLoading,
    error: goreError,
  } = useWeather('Gore Mountain', locations.Gore.lat, locations.Gore.lon);

  const {
    forecast: windhamForecast,
    bestDays: windhamBestDays,
    loading: windhamLoading,
    error: windhamError,
  } = useWeather('Windham Mountain', locations.Windham.lat, locations.Windham.lon);

  const {
    forecast: stoweForecast,
    bestDays: stoweBestDays,
    loading: stoweLoading,
    error: stoweError,
  } = useWeather('Stowe Mountain Resort', locations.Stowe.lat, locations.Stowe.lon);

  const {
    forecast: smugglersForecast,
    bestDays: smugglersBestDays,
    loading: smugglersLoading,
    error: smugglersError,
  } = useWeather('Smugglers Notch', locations.Smugglers.lat, locations.Smugglers.lon);

  const {
    forecast: jiminyPeakForecast,
    bestDays: jiminyPeakBestDays,
    loading: jiminyPeakLoading,
    error: jiminyPeakError,
  } = useWeather('Jiminy Peak', locations.JiminyPeak.lat, locations.JiminyPeak.lon);

  // Toggle handler for the button
  const handleToggle = () => {
    console.log('Toggle button clicked'); // Debugging log
    setShowBestConditions((prev) => !prev);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-title">Ski Weather Dashboard</h1>
        <button
          onClick={handleToggle}
          className={`App-toggle-button ${showBestConditions ? 'active' : ''}`}
          aria-pressed={showBestConditions}
          aria-label="Toggle best conditions view"
        >
          {showBestConditions ? 'Show All Days' : 'Show Best Conditions'}
        </button>
      </header>
      <main className="App-main">
        <div className="App-cards-container">
          <SkiDashboardCard
            resortName="Belleayre Mountain"
            forecast={belleayreForecast}
            bestDays={belleayreBestDays}
            showBestConditions={showBestConditions}
            logo={belleayreLogo}
            loading={belleayreLoading}
            error={belleayreError}
          />
          <SkiDashboardCard
            resortName="Gore Mountain"
            forecast={goreForecast}
            bestDays={goreBestDays}
            showBestConditions={showBestConditions}
            logo={goreLogo}
            loading={goreLoading}
            error={goreError}
          />
          <SkiDashboardCard
            resortName="Windham Mountain"
            forecast={windhamForecast}
            bestDays={windhamBestDays}
            showBestConditions={showBestConditions}
            logo={windhamLogo}
            loading={windhamLoading}
            error={windhamError}
          />
          <SkiDashboardCard
            resortName="Stowe Mountain Resort"
            forecast={stoweForecast}
            bestDays={stoweBestDays}
            showBestConditions={showBestConditions}
            logo={stoweLogo}
            loading={stoweLoading}
            error={stoweError}
          />
          <SkiDashboardCard
            resortName="Smugglers Notch"
            forecast={smugglersForecast}
            bestDays={smugglersBestDays}
            showBestConditions={showBestConditions}
            logo={smugglersLogo}
            loading={smugglersLoading}
            error={smugglersError}
          />
          <SkiDashboardCard
            resortName="Jiminy Peak"
            forecast={jiminyPeakForecast}
            bestDays={jiminyPeakBestDays}
            showBestConditions={showBestConditions}
            logo={jiminyPeakLogo}
            loading={jiminyPeakLoading}
            error={jiminyPeakError}
          />
        </div>
      </main>
    </div>
  );
}

export default App;
