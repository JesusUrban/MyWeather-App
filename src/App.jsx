import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './App.css'
import {
  signature,
  atmosphereSvg,
  drizzleSvg,
  rainSvg,
  snowSvg,
  clearSvg,
  cloudSvg,
  
} from'./assets/images'

const key = '157ca4c91e1eec2e2137e8aeb0cd70f0'
const url = 'https://api.openweathermap.org/data/2.5/weather'


const initialStates = {
  latitude: 0,
  longitude: 0,
}

const conditionCodes = {

  thunderstorm: [200, 201, 202, 210, 211, 212, 221, 230, 231, 232],

  drizzle: [300, 301, 302, 310, 311, 312, 313, 314, 321],

  rain: [500, 501, 502, 503, 504, 511, 520, 521, 522, 531],

  snow: [600, 601, 602, 611, 612, 613, 615, 616, 620, 621, 622],

  atmosphere: [701, 711, 721, 731, 741, 751, 761, 762, 771, 781],

  clear: [800],

  clouds: [801, 802, 803, 804]

}

const icons = {
  thunderstorm: atmosphereSvg,
  drizzle: drizzleSvg,
  rain: rainSvg,
  snow: snowSvg,
  atmosphere: atmosphereSvg,
  clear:clearSvg,
  clouds: cloudSvg


}
function App() {

  const [coords, setCoords] =  useState(initialStates)
   const [weather, setWeather]=useState({})
   const [toggle, seToggle] = useState(false)

  useEffect(()=>{

   console.log( navigator.geolocation.getCurrentPosition((position)=>{
        const{latitude, longitude} = position.coords
      
        setCoords({latitude, longitude})
        console.log('The user allow the location')
      
      }, (error =>{
         console.log('You must allow the location')
      })))  
  },[])

  useEffect(()=>{

    if(coords){
    axios.get(`${url}?lat=${coords.latitude}&lon=${coords.longitude}&appid=${key}`)
    .then(res =>{
            
         
            const keys = Object.keys(conditionCodes)
            const IconName= keys.find(key => conditionCodes[key].includes(res.data?.weather[0]?.id))
           
            setWeather({
            city: res.data?.name,
            country: res.data?.sys?.country,
            incon:icons[IconName],
            main: res.data?.weather[0]?.main,
            wind: res.data?.wind?.speed,
            clouds: res.data?.clouds?.all,
            pressure: res.data?.main?.pressure,
            temperature: Math.floor(res.data?.main?.temp -273.15)
         
          })




    }).catch(err=>{
      console.log(err)
    })
    }
    
  },[coords])

   const temp = toggle ?  parseInt((weather.temperature*9/5) + 32 ): weather.temperature
  
  return (
    <div>
    <div className='card'>
     
         <h1 className='card__title'>Weather App</h1>
         <h2 className='card__subtitle'>{weather.city}, {weather.country}</h2>
    
    <div className='card__body'>
           <img src={weather.incon} alt={weather.main} width={150}/>
       <div className="card__info">
        <h3 className="card__main">"{weather.main}"</h3>
        <p className='card__wind-speed'>Wind speed {weather.wind}m/s</p>
        <p className='card__clouds'>Clouds {weather.clouds}%</p>
        <p className='card__pressure'>Pressure {weather.pressure}hPa</p>

       </div>
    
  
    </div>

       <h2 className='card__temperature'>{temp}{toggle ? '°F': '°C'}</h2>
       
      

       <button onClick={() => seToggle(!toggle)} className='card__button'>
        Change to {!toggle ? '°F': '°C'}</button>
    <img src={signature} alt="Signature" className='Signature__logo' width={100} />
 
         </div>

    <div>
  </div>
    </div>
  )
}

export default App