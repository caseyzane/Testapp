// App.js
import React, { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import SkiDashboardCard from './SkiDashboardCard';
import useSkiWeather from './useSkiWeather';
import './App.css'; // Ensure this imports the CSS file

const App = () => {
  const locations = {
    Belleayre: { lat: 42.1364, lon: -74.5083 },
    Gore: { lat: 43.6793, lon: -73.9916 },
    Windham: { lat: 42.3079, lon: -74.2560 },
    Stowe: { lat: 44.4654, lon: -72.6874 },
    SmugglersNotch: { lat: 44.5887, lon: -72.7867 },
    JiminyPeak: { lat: 42.5559, lon: -73.2929 },
  };

  // Track which card should blink
  const [blinkingCard, setBlinkingCard] = useState('');

  // Fetch data for each resort
  const {
    forecast: belleayreForecast,
    bestDays: belleayreBestDays,
  } = useSkiWeather('Belleayre Mountain', locations.Belleayre.lat, locations.Belleayre.lon);

  const {
    forecast: goreForecast,
    bestDays: goreBestDays,
  } = useSkiWeather('Gore Mountain', locations.Gore.lat, locations.Gore.lon);

  const {
    forecast: windhamForecast,
    bestDays: windhamBestDays,
  } = useSkiWeather('Windham Mountain', locations.Windham.lat, locations.Windham.lon);

  const {
    forecast: stoweForecast,
    bestDays: stoweBestDays,
  } = useSkiWeather('Stowe Mountain', locations.Stowe.lat, locations.Stowe.lon);

  const {
    forecast: smugglersNotchForecast,
    bestDays: smugglersNotchBestDays,
  } = useSkiWeather('Smugglers’ Notch', locations.SmugglersNotch.lat, locations.SmugglersNotch.lon);

  const {
    forecast: jiminyPeakForecast,
    bestDays: jiminyPeakBestDays,
  } = useSkiWeather('Jiminy Peak', locations.JiminyPeak.lat, locations.JiminyPeak.lon);

  // Determine which card should blink on mount
  useEffect(() => {
    if (belleayreBestDays.length > 0) {
      setBlinkingCard('Belleayre Mountain');
    } else if (goreBestDays.length > 0) {
      setBlinkingCard('Gore Mountain');
    } else if (windhamBestDays.length > 0) {
      setBlinkingCard('Windham Mountain');
    } else if (stoweBestDays.length > 0) {
      setBlinkingCard('Stowe Mountain');
    } else if (smugglersNotchBestDays.length > 0) {
      setBlinkingCard('Smugglers’ Notch');
    } else if (jiminyPeakBestDays.length > 0) {
      setBlinkingCard('Jiminy Peak');
    }
  }, [
    belleayreBestDays,
    goreBestDays,
    windhamBestDays,
    stoweBestDays,
    smugglersNotchBestDays,
    jiminyPeakBestDays,
  ]);

  return (
    <div
      style={{
        padding: '20px',
        fontFamily: 'Forum, sans-serif',
        backgroundColor: '#f5f5f5',
        minHeight: '100vh',
      }}
    >
      <h1 style={{ textAlign: 'center' }}>Skiing in the Catskills and Beyond</h1>

      <Grid container spacing={3} justifyContent="center">
        <Grid item className={blinkingCard === 'Belleayre Mountain' ? 'blink' : ''}>
          <SkiDashboardCard
            resortName="Belleayre Mountain"
            forecast={belleayreForecast}
            bestDays={belleayreBestDays}
          />
        </Grid>
        <Grid item className={blinkingCard === 'Gore Mountain' ? 'blink' : ''}>
          <SkiDashboardCard
            resortName="Gore Mountain"
            forecast={goreForecast}
            bestDays={goreBestDays}
          />
        </Grid>
        <Grid item className={blinkingCard === 'Windham Mountain' ? 'blink' : ''}>
          <SkiDashboardCard
            resortName="Windham Mountain"
            forecast={windhamForecast}
            bestDays={windhamBestDays}
          />
        </Grid>
        <Grid item className={blinkingCard === 'Stowe Mountain' ? 'blink' : ''}>
          <SkiDashboardCard
            resortName="Stowe Mountain"
            forecast={stoweForecast}
            bestDays={stoweBestDays}
          />
        </Grid>
        <Grid item className={blinkingCard === 'Smugglers’ Notch' ? 'blink' : ''}>
          <SkiDashboardCard
            resortName="Smugglers’ Notch"
            forecast={smugglersNotchForecast}
            bestDays={smugglersNotchBestDays}
          />
        </Grid>
        <Grid item className={blinkingCard === 'Jiminy Peak' ? 'blink' : ''}>
          <SkiDashboardCard
            resortName="Jiminy Peak"
            forecast={jiminyPeakForecast}
            bestDays={jiminyPeakBestDays}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default App;
