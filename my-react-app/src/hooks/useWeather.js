// src/hooks/useWeather.js

import { useState, useEffect } from 'react';
import axios from 'axios';

/**
 * Custom hook to fetch weather data from Open-Meteo API.
 *
 * @param {string} resortName - Name of the ski resort.
 * @param {number} lat - Latitude of the resort.
 * @param {number} lon - Longitude of the resort.
 * @returns {Object} - Contains forecast data, best days, loading state, and error state.
 */
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

        // Construct the Open-Meteo API URL
        const API_URL = 'https://api.open-meteo.com/v1/forecast';

        // Define the request parameters
        const params = {
          latitude: lat,
          longitude: lon,
          daily: 'temperature_2m_max,temperature_2m_min,snowfall_sum,precipitation_sum',
          timezone: 'America/New_York', // Adjust timezone as needed
        };

        // Make the API request
        const response = await axios.get(API_URL, { params });

        // Log the entire response for debugging
        console.log(`Open-Meteo API Response for ${resortName}:`, response.data);

        // Parse the response data based on Open-Meteo's structure
        if (!response.data || !response.data.daily || !response.data.daily.time) {
          throw new Error('Invalid response structure from Open-Meteo API.');
        }

        const { daily } = response.data;

        // Ensure all required arrays are present and of equal length
        const { time, temperature_2m_max, temperature_2m_min, snowfall_sum, precipitation_sum } = daily;

        if (
          !time ||
          !temperature_2m_max ||
          !temperature_2m_min ||
          !snowfall_sum ||
          !precipitation_sum ||
          time.length !== temperature_2m_max.length ||
          time.length !== temperature_2m_min.length ||
          time.length !== snowfall_sum.length ||
          time.length !== precipitation_sum.length
        ) {
          throw new Error('Incomplete forecast data received from Open-Meteo API.');
        }

        // Map the forecast data into a structured format
        const forecastData = time.map((date, index) => ({
          date,
          tempMax: temperature_2m_max[index],
          tempMin: temperature_2m_min[index],
          snowfall: snowfall_sum[index],
          precipitation: precipitation_sum[index],
        }));

        setForecast(forecastData);

        // Determine best days based on criteria
        const best = forecastData
          .filter(
            (day) =>
              day.snowfall >= 2 && // At least 2 inches of snowfall
              day.precipitation <= 0.5 // Less than or equal to 0.5 inches of precipitation
          )
          .map((day) => day.date);

        setBestDays(best);
      } catch (err) {
        console.error(`Error fetching weather data for ${resortName}:`, err.message);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [resortName, lat, lon]);

  return { forecast, bestDays, loading, error };
};

export default useWeather;
