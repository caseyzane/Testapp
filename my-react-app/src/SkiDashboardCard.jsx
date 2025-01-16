// SkiDashboardCard.jsx
import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';

const SkiDashboardCard = ({ resortName, forecast, bestDays }) => {
  console.log(`Rendering SkiDashboardCard for ${resortName}`);
  console.log(`Forecast:`, forecast);
  console.log(`Best Days:`, bestDays);

  return (
    <Card
      sx={{
        maxWidth: 400,
        margin: 'auto',
        boxShadow: 3,
        backgroundColor: '#ffffff',
      }}
    >
      <CardContent>
        {/* Resort Name */}
        <Typography variant="h5" component="div" sx={{ marginBottom: 2 }}>
          {resortName}
        </Typography>

        {/* Best ski days summary */}
        <Typography variant="body2" color="text.secondary" sx={{ marginBottom: 2 }}>
          <strong>Best Ski Days:</strong>{' '}
          {bestDays.length > 0 ? bestDays.join(', ') : 'None'}
        </Typography>

        {/* Weeklong forecast list */}
        <Typography variant="h6">7-Day Forecast:</Typography>
        {forecast && forecast.length > 0 ? (
          <List>
            {forecast.map((day, index) => (
              <ListItem key={index}>
                <ListItemText
                  primary={`${day.date}: High ${day.tempMax}°F / Low ${day.tempMin}°F`}
                  secondary={`Snowfall: ${day.snowfall} in | Precipitation: ${day.precipitation} in`}
                />
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography variant="body2" color="text.secondary">
            Loading forecast data...
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default SkiDashboardCard;
