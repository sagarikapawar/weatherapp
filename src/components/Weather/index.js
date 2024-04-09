import React from 'react'
import {useState} from 'react'
import axios from 'axios'
import { FaWater } from "react-icons/fa";
import { FaWind } from "react-icons/fa";
import { FaSistrix } from "react-icons/fa"
import rain from '../Assets/rain.png'
import clear from '../Assets/clear.png'
import cloudy from '../Assets/cloudy.png'
import weather_app from '../Assets/weather-app.png'
import snowfall from '../Assets/snowfall.png'
import drizzle from '../Assets/drizzle.png'
import sunny from '../Assets/Sunny.png'

import './index.css'

const Weather=()=>{
    const [data,setData]=useState({
        celcius:10,
        name:'London',
        humidity:10,
        speed:2,
        description:''

        
    })
    
    const [name,setName]=useState('');
    const [wicon,setWicon]=useState(weather_app)
    const [error,setError]=useState()

    
    
    
    const onChangeInput=(event)=>{
        setName(event.target.value)
    
    }
    

    const onClickHandler= ()=>{
        if(name!==""){
        
     const apiUrl=(`https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=0bfbdf70882f30e9367c969cb0fba3f5&&units=metric`)
     axios.get(apiUrl)
     .then(res=>{
        console.log(res.data)
         
         if(res.data.weather[0].icon==='01d'|| res.data.weather[0].icon==='01n'){
            setWicon(clear)
         }else if(res.data.weather[0].icon==='02d'|| res.data.weather[0].icon==='02n'){
            setWicon(cloudy)

         }else if(res.data.weather[0].icon==='03d'|| res.data.weather[0].icon==='03n'){
               setWicon(snowfall)
         }else if(res.data.weather[0].icon==='04d'|| res.data.weather[0].icon==='04n'){
            setWicon(sunny)

         }
         else if(res.data.weather[0].icon==='09d'|| res.data.weather[0].icon==='09n'){
            setWicon(rain)
         }
      else if(res.data.weather[0].icon==='10d'|| res.data.weather[0].icon==='10n'){
         setWicon(drizzle)
      }
      
         
         
         else{
            setWicon(weather_app)
         }

console.log(data.res)
     setData({...data ,celcius:res.data.main.temp,name:res.data.name,humidity:res.data.main.humidity,speed:res.data.wind.speed,description:res.data.weather.description,
    wicon})
    setError('');
     })
    
     .catch(err => {
      if(err.response.status===404){
         setError("Invalid City Name")
      }else{
         setError('');
      }
   })   
        
    } 

}

    
    return(
        <div className="app-container">
        <div className="weather-app-container">
        
            
            <div className="input-container">
            <input type="text" placeholder="Enter City Name" className="input-element"  onChange={onChangeInput} />
            <button className="search-icon" type='button'onClick={onClickHandler} >
            <FaSistrix  /> 
            </button>
            </div>
            <div className='error-container'>
               <p>{error}</p>
            </div>
            <div className='result-element'>
            <img src={data.wicon} alt='weather' className='weatherimage'/>
            
            <h1>{Math.round(data.celcius)}°C</h1>
            <p>{data.description}</p>
            
            <h2>{data.name}</h2>
            
            </div> 
            <div className='inner-app-container'>
            
            <div className='humidity-container'>
                <FaWater  className='humidity'/>
                <div className='humidity-para'>                
                <p className='para'>{Math.round(data.humidity)}%</p>
                <h3>Humidity</h3>
                </div>

            </div>
            <div className='humidity-container'>
                <FaWind className='humidity'/>
                <div className='humidity-para'>
                <p className='para'>{Math.round(data.speed)} Km/hr</p>
                <h3>Wind </h3>
                </div>  
                </div>
            </div>
            </div>
            </div>
            
        
    )
    
}
export default Weather