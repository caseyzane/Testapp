import React from 'react';
import { Grid } from '@mui/material';
import SkiDashboardCard from './SkiDashboardCard';
import useSkiWeather from './useSkiWeather';

const App = () => {
  const locations = {
    Belleayre: { lat: 42.1364, lon: -74.5083 },
    Gore: { lat: 43.6793, lon: -73.9916 },
    Windham: { lat: 42.3079, lon: -74.2560 },
    Stowe: { lat: 44.4654, lon: -72.6874 },
    SmugglersNotch: { lat: 44.5887, lon: -72.7867 },
    JiminyPeak: { lat: 42.5559, lon: -73.2929 },
  };

  // Existing Resorts
  const {
    weather: belleayreWeather,
    decision: belleayreDecision,
  } = useSkiWeather('Belleayre Mountain', locations.Belleayre.lat, locations.Belleayre.lon);

  const {
    weather: goreWeather,
    decision: goreDecision,
  } = useSkiWeather('Gore Mountain', locations.Gore.lat, locations.Gore.lon);

  // New Resorts
  const {
    weather: windhamWeather,
    decision: windhamDecision,
  } = useSkiWeather('Windham Mountain', locations.Windham.lat, locations.Windham.lon);

  const {
    weather: stoweWeather,
    decision: stoweDecision,
  } = useSkiWeather('Stowe Mountain', locations.Stowe.lat, locations.Stowe.lon);

  const {
    weather: smugglersNotchWeather,
    decision: smugglersNotchDecision,
  } = useSkiWeather('Smugglers’ Notch', locations.SmugglersNotch.lat, locations.SmugglersNotch.lon);

  const {
    weather: jiminyPeakWeather,
    decision: jiminyPeakDecision,
  } = useSkiWeather('Jiminy Peak', locations.JiminyPeak.lat, locations.JiminyPeak.lon);

  return (
    <div
      style={{
        padding: '20px',
        fontFamily: 'Forum, sans-serif',
        backgroundColor: '#f5f5f5',
        minHeight: '100vh',
      }}
    >
      {/* Main title */}
      <h1 style={{ textAlign: 'center' }}>Skiing in the Catskills and Beyond</h1>

      <Grid container spacing={3} justifyContent="center">
        {/* Existing Resorts */}
        <Grid item>
          <SkiDashboardCard
            resortName="Belleayre Mountain"
            weather={belleayreWeather}
            decision={belleayreDecision}
          />
        </Grid>
        <Grid item>
          <SkiDashboardCard
            resortName="Gore Mountain"
            weather={goreWeather}
            decision={goreDecision}
          />
        </Grid>

        {/* New Resorts */}
        <Grid item>
          <SkiDashboardCard
            resortName="Windham Mountain"
            weather={windhamWeather}
            decision={windhamDecision}
          />
        </Grid>
        <Grid item>
          <SkiDashboardCard
            resortName="Stowe Mountain"
            weather={stoweWeather}
            decision={stoweDecision}
          />
        </Grid>
        <Grid item>
          <SkiDashboardCard
            resortName="Smugglers’ Notch"
            weather={smugglersNotchWeather}
            decision={smugglersNotchDecision}
          />
        </Grid>
        <Grid item>
          <SkiDashboardCard
            resortName="Jiminy Peak"
            weather={jiminyPeakWeather}
            decision={jiminyPeakDecision}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default App;
