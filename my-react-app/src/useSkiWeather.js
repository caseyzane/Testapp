// useSkiWeather.js
import { useState, useEffect } from 'react';
import axios from 'axios';

const useSkiWeather = (resortName, lat, lon) => {
  const [forecast, setForecast] = useState(null);
  const [bestDays, setBestDays] = useState([]);

  useEffect(() => {
    const fetchForecast = async () => {
      try {
        console.log(`Fetching forecast for ${resortName}...`);

        // Open-Meteo API endpoint
        const response = await axios.get('https://api.open-meteo.com/v1/forecast', {
          params: {
            latitude: lat,
            longitude: lon,
            daily: 'temperature_2m_max,temperature_2m_min,snowfall_sum,precipitation_sum',
            timezone: 'America/New_York',
          },
        });

        console.log(`Raw API response for ${resortName}:`, response.data);

        const daily = response.data.daily;
        if (!daily || !daily.time) {
          console.error(`Incomplete data received for ${resortName}:`, daily);
          setForecast(null);
          setBestDays([]);
          return;
        }

        // Transform the data into a usable format
        const transformedForecast = daily.time.map((date, index) => ({
          date,
          tempMax: daily.temperature_2m_max[index],
          tempMin: daily.temperature_2m_min[index],
          snowfall: daily.snowfall_sum[index],
          precipitation: daily.precipitation_sum[index],
        }));

        console.log(`Transformed Forecast for ${resortName}:`, transformedForecast);

        setForecast(transformedForecast);

        // Determine best ski days: snowfall > 0 and tempMax <= 32°F
        const best = transformedForecast
          .filter((day) => day.snowfall > 0 && day.tempMax <= 32)
          .map((day) => day.date);

        console.log(`Best Ski Days for ${resortName}:`, best);

        setBestDays(best);
      } catch (error) {
        console.error(`Error fetching forecast for ${resortName}:`, error.message);
        setForecast(null);
        setBestDays([]);
      }
    };

    fetchForecast();
  }, [resortName, lat, lon]);

  return { forecast, bestDays };
};

export default useSkiWeather;
