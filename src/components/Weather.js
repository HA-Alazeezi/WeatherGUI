import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import './Weather.css'
import drizzle from '../assets/drizzle.png'
import humid from '../assets/humid.png'
import wind from '../assets/wind.png'
import list from '../assets/list.png'
import rain from '../assets/rain.png'
import snowfall from '../assets/snowfall.png'
import sunclouds from '../assets/sunclouds2.png'
import sunny from '../assets/sunny.png'
import tracker from '../assets/mental-state.png'
import lungs from '../assets/lungs.png'
import self from '../assets/self-love.png'
import sleep from '../assets/sleeping.png'
import support from '../assets/customer-service-agent.png'


const Weather = () => {

    const [weatherData, setWeatherData] = useState(null);
    const [forecastData, setforecastData] = useState(null);
    const [error, setError] = useState(null);

    const allIcons = {
        "01d": sunny,
        "01n": sunny,
        "02d": sunclouds,
        "02n": sunclouds,
        "03d": sunclouds,
        "03n": sunclouds,
        "04d": sunclouds,
        "04n": sunclouds,
        "09d": rain,
        "09n": rain,
        "10d": rain,
        "10n": rain,
        "11d": rain,
        "11n": rain,
        "13d": snowfall,
        "13n": snowfall,
        "50d": drizzle,
        "50n": drizzle
    }
    const fetchWeather = async (lat, lon)=>{
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${process.env.REACT_APP_APIKEY}`;
            
            const response = await fetch(url);
            const data = await response.json();

            if (data.cod !== 200){
                throw new Error(data.message);
            }

            console.log(data);
            const icon = allIcons[data.weather[0].icon] || sunny;

            setWeatherData({
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                temperature: Math.floor(data.main.temp),
                location: data.name,
                status: data.weather[0].description,
                icon: icon
            });

            // Fetching hourly weather data 
            const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${process.env.REACT_APP_APIKEY}`;
            const forecastResponse = await fetch(forecastUrl);
            const forecastData = await forecastResponse.json();
            console.log(forecastData);

            // Save hourly forecast
            if (forecastData && forecastData.list){
                console.log("success");
                setforecastData(forecastData.list);
            }
            else {
                setError("Error in fetching forecast data");
            }
            
            setError(null);

        } catch (error){
            console.error("error fetching data:", error);
            console.error("Error in fetching data");
            setError(error.message);

        }
    };

    // Geolocation API to get user's current location
    useEffect(() => {
        if ('geolocation' in navigator) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const { latitude, longitude } = position.coords;
              fetchWeather(latitude, longitude);
            },
            (error) => {
              console.error('Error getting location:', error);
              setError('Unable to retrieve location');
            }
          );
        } else {
          setError('Geolocation not supported by your browser');
        }
      }, []);

      const activities = {
        sunny : ['Go for a walk', 'Try outdoor sports, you got this!', 'Have a picnic, the sun is out!'],
        rainy : ['Read a book', 'Watch a movie', 'Do a quick workout, get those gains!'],
        cloudy : ['Try a new recipe', 'Have a movie marathon', 'Do some yoga'],
        snowy : ['Build a snowman', 'Make a snow angel', 'Have a snowball fight'],
      };

      const weatherCondition = weatherData?.status?.toLowerCase() ? weatherData.status.toLowerCase() : 'sunny';
      const suggestedActivities = activities[weatherCondition] || activities.sunny;

      const randomActivity = suggestedActivities[Math.floor(Math.random() * suggestedActivities.length)];


    return (
        <div className='weather'>
            {/* Display error if any */}
            {error && <p className="error">{error}</p>}
            {/* Display weather data if available */}
            {weatherData && !error ? (
                <>
                    <p className="location">{weatherData.location}</p>
                    <p className="status">{weatherData.status}</p>
                    <p className="temperature">{weatherData.temperature} ℃</p>
                    <img src={weatherData.icon} alt="" className='weather-icon' />
                    <div className="weather-data">
                        <div className="col">
                            <div>
                                <p>{weatherData.windSpeed} km/h</p>
                                <span>Wind Speed</span>
                            </div>
                            <img src={wind} alt="" />
                        </div>
                        <div className="col">
                            <div>
                                <p>{weatherData.humidity} %</p>
                                <span>Humidity</span>
                            </div>
                            <img src={humid} alt="" />
                        </div>
                    </div>
                </>
            ) : null}

            <div className="forecast-header">
                <h3 className="today">Today</h3>
                <div className="see-all">
                    <Link to="/more-forecast" className="see-all-link">
                        See All
                    </Link>
                </div>
            </div>

            {/* Forecast */}
            {forecastData && (
                <div>
                    <div className='forecast-boxes'>
                        {forecastData.slice(0,5).map((forecast, index)=>(
                            <div key={index} className="forecast-box">
                                <p>{new Date(forecast.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                                <img src={allIcons[forecast.weather[0].icon]} alt="weather icon" className="forecast-icon" />
                                <p>{Math.floor(forecast.main.temp)} ℃</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            <div className="check-in">
                <div className="check-in-header">
                    <h3>Mental Wellness Check-in</h3>
                </div>
                <div className="check-in-boxes">
                    <div className="check-in-box">
                        <Link to="/mood-tracker" className="check-in-box">
                            <img src= {tracker} alt="tracker" />
                            <p>Mood Tracker</p>
                        </Link>
                    </div>
                    <div className="check-in-box">
                        <Link to="/wellness#breathing" className="check-in-box">
                            <img src= {lungs} alt="lungs" />
                            <p>Breathing Exercises</p>
                        </Link>
                    </div>
                    <div className="check-in-box">
                        <Link to="/wellness#self-care" className="check-in-box">
                            <img src= {self} alt="self" />
                            <p>Self-Care Tips</p>
                        </Link> 
                    </div>
                    <div className= "check-in-box">
                        <Link to="/wellness#mindfullness" className="check-in-box">
                            <img src= {sleep} alt="sleep" />
                            <p>Mindfulness and Sleep </p>
                        </Link>
                    </div>
                    <div className= "check-in-box">
                        <Link to="/wellness#support" className="check-in-box">
                            <img src= {support} alt="support" />
                            <p>University Support Services</p>
                        </Link>
                    </div>
                </div>

            </div>
            <div className="activities-strip">
                <div className="activity-item">{randomActivity}</div>
            </div>
        </div>
    );
};

export default Weather;