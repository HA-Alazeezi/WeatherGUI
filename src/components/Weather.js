import React, { useEffect, useRef, useState } from 'react'
import './Weather.css'
import searchIcon from '../assets/search.png'
import drizzle from '../assets/drizzle.png'
import humid from '../assets/humid.png'
import wind from '../assets/wind.png'
import list from '../assets/list.png'
import rain from '../assets/rain.png'
import snowfall from '../assets/snowfall.png'
import sunclouds from '../assets/sunclouds2.png'
import sunny from '../assets/sunny.png'

const Weather = () => {

    const inputRef = useRef();
    const [weatherData, setWeatherData] = useState(false);

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
    const search = async (city)=>{
        if(city === ""){
            alert("Enter name of a city");
            return;
        }
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.REACT_APP_APIKEY}`;

            const response = await fetch(url);
            const data = await response.json();

            console.log(data);
            const icon = allIcons[data.weather[0].icon] || sunny;
            setWeatherData({
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                temperature: Math.floor(data.main.temp),
                location: data.name,
                status: data.weather[0].description,
                icon: icon
            })
        }
        catch (error){
            console.error("error fetching data:", error);
            console.error("Error in fetching data");
            alert("City not found");

        }
    }

    useEffect(()=>{
        search("New York");

    },[])

    return (
        <div className='weather'>
            <div className="search-bar">
                <input ref={inputRef} type="text" placeholder='Search'/>
                <img src={searchIcon} alt="" onClick={()=>search(inputRef.current.value)}/>
            </div>
            {weatherData? <>
                <p className="location">{weatherData.location}</p>
                <p className="status">{weatherData.status}</p>
                <p className="temperature">{weatherData.temperature} ℃</p>
                <img src= {weatherData.icon} alt="" className='weather-icon' />
                <div className="weather-data">
                    <div className="col">
                        <div>
                            <p>{weatherData.windSpeed} km/h</p>
                            <span>Wind Speed</span>
                        </div>
                        <img src={wind} alt=""/>
                    </div>
                    <div className="col">
                    <div>
                        <p>{weatherData.humidity} %</p>
                        <span>Humidity</span>
                    </div>
                    <img src={humid} alt=""/>
                </div>
            </div>  
            </>:<></>}


        </div>
    )
}

export default Weather;