import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './weather.css';
import clearImage from './img/clear.png';
import cloudyImage from './img/cloud.png';
import snowImage from './img/snow.png';
import rainImage from './img/rain.png';

const Weather = () => {
    const [city, setCity] = useState('London');
    const [weatherData, setWeatherData] = useState(null);
    const [weatherImage, setWeatherImage] = useState(clearImage);

    const fetchData = async () => {
        try {
            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=92ec1d8b3be36232fb35285b65597501&units=metric`
            );
            setWeatherData(response.data);
            console.log(response.data)
        }
        catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (weatherData) {
            const mainCondition = weatherData.weather[0].main;
            switch (mainCondition) {
                case 'Clear':
                    setWeatherImage(clearImage);
                    break;
                case 'Clouds':
                    setWeatherImage(cloudyImage);
                    break;
                case 'Snow':
                    setWeatherImage(snowImage);
                    break;
                case 'Rain':
                    setWeatherImage(rainImage);
                    break;
                default:
                    setWeatherImage(clearImage);
            }
        }
    }, [weatherData]);

    useEffect(() => {
        fetchData();
    }, []);

    const handleInputChange = (e) => {
        setCity(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchData();
    };

    return (
        <div>
            {weatherData ? (
                <div class="container">
                    <div class="search-box">
                        <i class="fa-solid fa-location-dot"></i>
                        <input
                            type="text"
                            placeholder="Enter your location"
                            value={city}
                            onChange={handleInputChange} />
                        <button class="fa-solid fa-magnifying-glass" onClick={handleSubmit}></button>
                    </div>
                    <div class="weather-box">
                        <img src={weatherImage} alt='weather' />
                        <p class="temperature">{parseInt(weatherData.main.temp)}°C</p>
                        <p class="description">{weatherData.weather[0].description}</p>
                    </div>
                    <div class="weather-details">
                        <div class="humidity">
                            <i class="fa-solid fa-water"></i>
                            <div class="text">
                                <span>{weatherData.main.humidity}</span>
                                <p>Humidity</p>
                            </div>
                        </div>
                        <div class="wind">
                            <i class="fa-solid fa-wind"></i>
                            <div class="text">
                                <span>{weatherData.main.temp_max}</span>
                                <p>Wind Speed</p>
                            </div>
                        </div>
                    </div>

                </div>
            ) : (
                <p>Enter city to see weather</p>
            )}
        </div>
    );
};

export default Weather;