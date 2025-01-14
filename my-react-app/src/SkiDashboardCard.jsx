import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const SkiDashboardCard = ({ resortName, weather, decision }) => {
  return (
    <Card sx={{ maxWidth: 345, margin: 'auto', boxShadow: 3 }}>
      <CardContent>
        {/* Display the resort name */}
        <Typography variant="h5" component="div" style={{ textAlign: 'center' }}>
          {resortName}
        </Typography>

        {/* Display weather information */}
        {weather ? (
          <>
            <Typography variant="body2" color="text.secondary">
              <strong>Weather:</strong> {weather.weather[0].description}, {Math.round(weather.main.temp)}°F
            </Typography>
            <Typography variant="body2" color="primary" sx={{ marginTop: '8px' }}>
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

export default SkiDashboardCard;
