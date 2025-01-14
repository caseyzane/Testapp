import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const SkiDashboardCard = () => {
  return (
    <Card sx={{ maxWidth: 345, margin: 'auto', boxShadow: 3 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          Ski Resort Name
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Weather: Sunny, -2°C
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Snow Depth: 120 cm
        </Typography>
      </CardContent>
    </Card>
  );
};

export default SkiDashboardCard;
