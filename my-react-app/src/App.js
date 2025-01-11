// Import necessary libraries
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SkiWeatherApp = () => {
  // State to store weather data fetched from the API
  const [weather, setWeather] = useState(null);
  // State to store the skiing decision message
  const [decision, setDecision] = useState('');

  // OpenWeatherMap API details
  const API_KEY = '9211eef1c79b24c336f1407ca714703e'; // Replace with your weather API key
  const LAT = 42.1351; // Latitude for Belleayre
  const LON = -74.5132; // Longitude for Belleayre

  useEffect(() => {
    // Function to fetch weather data from the API
    const fetchWeather = async () => {
      try {
        console.log('Fetching weather data...'); // Debug: Indicate the fetch process has started

        // Make an API call to OpenWeatherMap to get current weather
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
          params: {
            lat: LAT, // Latitude for Belleayre Mountain
            lon: LON, // Longitude for Belleayre Mountain
            appid: API_KEY, // API key for authentication
            units: 'metric', // Use metric system for temperature (Celsius)
          },
        });

        console.log('Weather data fetched successfully:', response.data); // Debug: Log the entire API response

        // Extract the weather data from the API response
        const data = response.data;
        setWeather(data); // Update the weather state with the fetched data

        // Check if the weather conditions are suitable for skiing
        if (data.weather.some(condition => condition.main === 'Snow') && data.main.temp <= 0) {
          console.log('Conditions are ideal for skiing.'); // Debug: Log that skiing conditions are good
          setDecision("It's snowy and cold! Perfect for skiing! ⛷️💃"); // Update the decision state with a positive message
        } else {
          console.log('Conditions are not ideal for skiing.'); // Debug: Log that skiing conditions are not good
          setDecision("Conditions are not ideal for skiing."); // Update the decision state with a negative message
        }
      } catch (error) {
        // Handle errors during the API call
        console.error('Error fetching weather data:', error.response?.data || error.message); // Debug: Log error details
        setDecision('Could not fetch weather data.'); // Update the decision state with an error message
      }
    };

    fetchWeather(); // Call the fetchWeather function when the component loads
  }, []); // Empty dependency array means this effect runs only once

  return (
    <div style={{ padding: '20px', fontFamily: 'Courier New, monospace' }}>
      <h1>Belleayre Ski Weather Checker</h1>
      {weather ? (
        <div>
          <h2>Current Weather in Belleayre:</h2>
          <p><strong>Temperature:</strong> {weather.main.temp}°C</p>
          <p><strong>Condition:</strong> {weather.weather[0].description}</p>
          <h3>{decision}</h3>
        </div>
      ) : (
        <p>Loading weather data...</p>
      )}
    </div>
  );
};

export default SkiWeatherApp;
