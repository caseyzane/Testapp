import { useState, useEffect } from 'react';
import axios from 'axios';

const API_KEY = '9211eef1c79b24c336f1407ca714703e'; // Replace with your actual API key

function useSkiWeather(resortName, lat, lon) {
  // Local states for weather data and skiing decision
  const [weather, setWeather] = useState(null);
  const [decision, setDecision] = useState('Loading weather data...');

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        console.log(`Fetching weather for ${resortName}...`); // Debug log

        const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
          params: {
            lat,
            lon,
            appid: API_KEY,
            units: 'imperial',
          },
        });

        const data = response.data;
        console.log(`Weather data for ${resortName}:`, data); // Debug log
        setWeather(data);

        // Decision logic for ski conditions
        const isSnowing = data.weather.some((condition) => condition.main === 'Snow');
        const isBelowFreezing = data.main.temp <= 32;

        if (isSnowing && isBelowFreezing) {
          setDecision(`It's snowy and cold at ${resortName}! Perfect for skiing! ⛷️`);
        } else {
          setDecision(`Conditions are not ideal for skiing at ${resortName}.`);
        }
      } catch (error) {
        console.error(`Error fetching weather data for ${resortName}:`, error.message);
        setDecision(`Could not fetch weather data for ${resortName}.`);
      }
    };

    fetchWeather();
  }, [resortName, lat, lon]); // Dependencies ensure this runs when these values change

  // Return the weather data and the decision
  return { weather, decision };
}

export default useSkiWeather;
