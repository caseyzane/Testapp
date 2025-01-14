// Import necessary libraries
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, Grid } from '@mui/material';

// SkiDashboardCard component to display ski information in a card format
const SkiDashboardCard = ({ resortName, weather, decision }) => {
  return (
    <Card sx={{ maxWidth: 345, margin: 'auto', boxShadow: 3 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {resortName}
        </Typography>
        {weather ? (
          <>
            <Typography variant="body2" color="text.secondary">
              <strong>Temperature:</strong> {weather.main.temp}°F
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <strong>Condition:</strong> {weather.weather[0].description}
            </Typography>
            {weather.weather[0].icon && (
              <img
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt={weather.weather[0].description}
                style={{ width: '100px', height: '100px' }}
              />
            )}
            <Typography variant="body2" color="primary">
              {decision}
            </Typography>
          </>
        ) : (
          <Typography variant="body2" color="text.secondary">
            Loading weather data...
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

// Main App component
const App = () => {
  const [belleayreWeather, setBelleayreWeather] = useState(null);
  const [goreWeather, setGoreWeather] = useState(null);
  const [belleayreDecision, setBelleayreDecision] = useState('');
  const [goreDecision, setGoreDecision] = useState('');

  // OpenWeatherMap API details
  const API_KEY = '9211eef1c79b24c336f1407ca714703e'; // Replace with your API key

  const locations = {
    Belleayre: { lat: 42.1351, lon: -74.5132 },
    Gore: { lat: 43.6799, lon: -73.9910 },
  };

  useEffect(() => {
    const fetchWeather = async (resort, lat, lon, setWeather, setDecision) => {
      try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
          params: {
            lat,
            lon,
            appid: API_KEY,
            units: 'imperial',
          },
        });

        const data = response.data;
        setWeather(data);

        if (data.weather.some((condition) => condition.main === 'Snow') && data.main.temp <= 32) {
          setDecision(`It's snowy and cold at ${resort}! Perfect for skiing! ⛷️`);
        } else {
          setDecision(`Conditions are not ideal for skiing at ${resort}.`);
        }
      } catch (error) {
        console.error(`Error fetching weather data for ${resort}:`, error.message);
        setDecision(`Could not fetch weather data for ${resort}.`);
      }
    };

    fetchWeather(
      'Belleayre',
      locations.Belleayre.lat,
      locations.Belleayre.lon,
      setBelleayreWeather,
      setBelleayreDecision
    );
    fetchWeather(
      'Gore',
      locations.Gore.lat,
      locations.Gore.lon,
      setGoreWeather,
      setGoreDecision
    );
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'Forum, sans-serif', backgroundColor: '#f5f5f5' }}>
      <h1 style={{ textAlign: 'center' }}>Ski Weather Comparison</h1>
      <Grid container spacing={3} justifyContent="center">
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
      </Grid>
    </div>
  );
};

export default App;
