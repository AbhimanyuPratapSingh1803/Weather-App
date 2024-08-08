import { useEffect, useRef, useState } from 'react'
import Cloud from '../Assets/Cloud.png'
import Cloudy from '../Assets/Cloudy.png'
import Drizzle from '../Assets/Drizzle.png'
import Humidity from '../Assets/Humidity.png'
import Rain from '../Assets/Rain.png'
import Snow from '../Assets/Snow.png'
import Sun from '../Assets/Sun.png'
import Wind from '../Assets/Wind.png'
import Search from '../Symbol/Search'
import React from 'react'

const Weather = () => {
    
    const [weatherData, setweatherData] = useState({});
    const inputRef = useRef();

    const icons = {
        "01d" : Sun,
        "01n" : Sun,
        "02d" : Cloudy,
        "02n" : Cloudy,
        "03d" : Cloud,
        "03n" : Cloud,
        "04d" : Drizzle,
        "04n" : Drizzle,
        "09d" : Rain,
        "09n" : Rain,
        "10d" : Rain,
        "10n" : Rain,
        "13d" : Snow,
        "13n" : Snow,
    }

    const search = async (city) => {
        if(city === ""){
            alert("Enter City name");
            return;
        }
        try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`
        const res = await fetch(url);
        const data = await res.json();

        if(!res.ok){
            alert(data.message);
            return;
        }
        console.log(data);
        
        const icon = icons[data.weather[0].icon] || Sun;
        const newData = {
            humidity: data.main.humidity,
            temperature: Math.floor(data.main.temp),
            wind: data.wind.speed,
            location: data.name,
            icon: icon,
            type: data.weather[0].main,
            };
            
            setweatherData(newData);
            console.log(newData)
        
        } catch (error) {
            setweatherData({});
            console.error("Error in fetching weather data");
        }
    }
    const input = document.querySelector(".input");

    useEffect(() => {
        search("Lucknow");
    }, []);

    return (
        <>
            <div className="main flex justify-center items-center relative h-screen w-screen">
                <div className="bgimg absolute size-full bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%">
                </div>

                <div className="container flex justify-center items-center flex-col fixed z-90 h-4/5 w-4/5 rounded-3xl backdrop-blur-3xl px-24">
                    <div className="flex items-center w-96 gap-3 h-12 mb-8">
                        <input 
                            ref = {inputRef}
                            className='input px-4 flex justify-start shadow-lg shadow-slate-800 items-center rounded-3xl size-full text-black bg-white outline-none'
                            type="text" 
                            placeholder='Enter City here'
                        />
                        <div className='h-[40px] w-[47px] flex items-center shadow-lg shadow-slate-800 justify-center rounded-full bg-white' onClick={() => search(inputRef.current.value)}>
                            <Search></Search>
                        </div>
                    </div>
                    <div className="place">
                      <h1 className='text-white font-bold text-4xl'>{weatherData.location}</h1>
                    </div>

                    <div className="flex mb-10 justify-center items-center flex-col items-center">
                        <div className="weather-icon text-white text-lg font-semibold flex gap-5 justify-center items-center mb-2 w-40 h-20 pr-5">
                            <div className='w-24'>
                              <img src={weatherData.icon} alt="" />
                            </div>
                            <p>{weatherData.type}</p>
                        </div>
                        <div className="temp text-white text-7xl font-bold">
                            <p>{weatherData.temperature}°C</p>
                        </div>
                    </div>
                    <div className='flex items-center justify-between text-white w-80 gap-7'>
                        <div className="col bg-white w-32 h-32 rounded-xl flex flex-col items-center bg-gray-200 shadow-lg shadow-slate-800 justify-center gap-3">
                            <div className="humid-icon w-12">
                            <img src="src\Assets\Humidity.png" alt="" />
                            </div>
                            <div className='text-black flex flex-col items-center font-semibold'>
                              <p>{weatherData.humidity}%</p>
                              <span>Humidity</span>

                            </div>
                        </div>
                        <div className="col bg-white tex-black w-32 h-32 rounded-xl flex flex-col bg-gray-200 shadow-lg shadow-slate-800 items-center justify-center gap-3">
                            <div className="wind-icon w-12">
                            <img src="src\Assets\Wind.png" alt="" />
                            </div>
                            <div className='text-black flex flex-col items-center font-semibold'>
                              <p>{weatherData.wind} Km/h</p>
                              <span>Wind Speed</span>

                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Weather
