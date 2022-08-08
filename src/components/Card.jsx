import React from 'react';
import { useState, useEffect} from 'react'
import cloud from '../assets/images/cloud-weather.png'
import axios from 'axios'
import LoadingData from './LoadingData';


const Card = ({lat, lon}) => {

    
    const [weather, setWeather] = useState()
    const [temperture, setTemperture] = useState()
    const [isCelsius, setIsCelsius] = useState(true)
    const [isLoading, setIsLoading] = useState(true)
    
    useEffect(() => {
        if(lon){
            const APIKey = 'cc168e3cf13325ab591fbcceaff1373c'
            const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&exclude={part}&appid=${APIKey}`

            axios.get(URL)
                .then(res => {
                    setWeather(res.data)
                    const temp = {
                        celsius: `${Math.round(res.data.main.temp - 273.15)} ºC`,
                        faren: `${Math.round((res.data.main.temp - 273.15)) * 9/5 + 32 } ºF`
                    }
                    setTemperture(temp)
                    setIsLoading(false)
                }
                    
                    )
                .catch(err => console.log(err))
        }

    }, [lat, lon])
    
    const handleClick = () => setIsCelsius(!isCelsius)

    if(isLoading){
        return <LoadingData />
    }else{

        return (
        
        <div className="container">
           
            <div className="title">
                <h1>Weather App</h1>
                <p>{`${weather?.name}, ${weather?.sys.country}`}</p>
            </div>
    
            <div className="weather-image">
                <img src={weather && `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="" />
                
                <h3>{isCelsius ? temperture?.celsius : temperture?.faren}</h3>
            </div>
            <div className="info">
                <p><b>{`"${weather?.weather[0].description}"`}</b></p>
                <p>Wind speed:  <b>{`${weather?.wind.speed} m/s`}</b></p>
                <p>Clouds: <b>{`${weather?.clouds.all}%`}</b></p>
                <p>Pressure: <b>{`${weather?.main.pressure}`} hPa</b></p>
                <p>Humidity: <b>{`${weather?.main.humidity}%`}</b></p>
            </div>
            <button onClick={handleClick}>{isCelsius ? 'Change to ºF' : 'Change to ºC'}</button>
    
         </div>
            
        );
    }

};

export default Card;