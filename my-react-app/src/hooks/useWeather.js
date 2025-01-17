// src/hooks/useWeather.js

import { useState, useEffect } from 'react';
import axios from 'axios';

const useWeather = (resortName, lat, lon) => {
  const [forecast, setForecast] = useState([]);
  const [bestDays, setBestDays] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true);
        setError(false);
        
        // Fetch weather data from Open-Meteo API with temperature in Fahrenheit
        const response = await axios.get('https://api.open-meteo.com/v1/forecast', {
          params: {
            latitude: lat,
            longitude: lon,
            daily: 'weathercode,temperature_2m_max',
            temperature_unit: 'fahrenheit', // Request temperatures in Fahrenheit
            timezone: 'auto',
          },
        });

        // Example response structure (based on Open-Meteo)
        const dailyData = response.data.daily;

        // Parse weather code to condition description
        const weatherConditions = dailyData.weathercode.map((code) => weatherCodeToCondition(code));

        const parsedForecast = dailyData.time.map((date, index) => ({
          date,
          condition: weatherConditions[index],
          temperature: dailyData.temperature_2m_max[index],
        }));

        setForecast(parsedForecast);

        // Determine best days based on specified criteria
        const bestDaysSelected = determineBestDays(parsedForecast);
        setBestDays(bestDaysSelected);

        setLoading(false);
      } catch (err) {
        console.error(`Error fetching weather data for ${resortName}:`, err);
        setError(true);
        setLoading(false);
      }
    };

    fetchWeather();
  }, [resortName, lat, lon]);

  // Function to convert weather code to condition description (Open-Meteo)
  const weatherCodeToCondition = (code) => {
    const mapping = {
      0: 'Clear',
      1: 'Mainly Clear',
      2: 'Partly Cloudy',
      3: 'Overcast',
      45: 'Fog',
      48: 'Depositing Rime Fog',
      51: 'Light Drizzle',
      53: 'Moderate Drizzle',
      55: 'Dense Drizzle',
      56: 'Light Freezing Drizzle',
      57: 'Dense Freezing Drizzle',
      61: 'Slight Rain',
      63: 'Moderate Rain',
      65: 'Heavy Rain',
      66: 'Light Freezing Rain',
      67: 'Heavy Freezing Rain',
      71: 'Slight Snow Fall',
      73: 'Moderate Snow Fall',
      75: 'Heavy Snow Fall',
      77: 'Snow Grains',
      80: 'Slight Rain Showers',
      81: 'Moderate Rain Showers',
      82: 'Violent Rain Showers',
      85: 'Slight Snow Showers',
      86: 'Heavy Snow Showers',
      95: 'Thunderstorm',
      96: 'Thunderstorm with Slight Hail',
      99: 'Thunderstorm with Heavy Hail',
    };

    return mapping[code] || 'Unknown';
  };

  // Function to determine best days based on specified criteria
  const determineBestDays = (dailyData) => {
    const bestDaysSet = new Set();

    dailyData.forEach((day, index) => {
      // Criteria:
      // 1. Day after snowfall
      // 2. Day with sunny skies (Clear or Mainly Clear) and temperature >= 15°F
      // 3. Day with snowfall and temperature >= 15°F

      // Check if today is after a snowfall day
      const previousDay = dailyData[index - 1];
      if (previousDay && isSnowfall(previousDay.condition)) {
        bestDaysSet.add(day.date);
      }

      // Check if today has sunny skies and temperature >= 15°F
      if (
        (day.condition === 'Clear' || day.condition === 'Mainly Clear') &&
        day.temperature >= 15
      ) {
        bestDaysSet.add(day.date);
      }

      // Check if today has snowfall and temperature >= 15°F
      if (isSnowfall(day.condition) && day.temperature >= 15) {
        bestDaysSet.add(day.date);
      }
    });

    // Convert Set to Array and sort by temperature descending
    const bestDaysArray = Array.from(bestDaysSet)
      .map((date) => {
        const day = dailyData.find((d) => d.date === date);
        return day;
      })
      .filter((day) => day) // Ensure day exists
      .sort((a, b) => b.temperature - a.temperature)
      .slice(0, 3) // Limit to top 3
      .map((day) => day.date);

    return bestDaysArray;
  };

  // Helper function to determine if a condition is snowfall
  const isSnowfall = (condition) => {
    const snowfallConditions = [
      'Slight Snow Fall',
      'Moderate Snow Fall',
      'Heavy Snow Fall',
      'Snow Grains',
      'Slight Snow Showers',
      'Heavy Snow Showers',
    ];
    return snowfallConditions.includes(condition);
  };

  return { forecast, bestDays, loading, error };
};

export default useWeather;
