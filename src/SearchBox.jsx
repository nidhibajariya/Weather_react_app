import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import "./SearchBox.css";
import React, { useState } from 'react';

export default function SearchBox({updateInfo}){
  let [city , setCity] = useState("");
  let [error , setError] = useState(false); 
  const API_URL = "https://api.openweathermap.org/data/2.5/weather";
  const API_KEY = "6fd1647fab3541f25340ce1d82293fd0";

  let getWeatherInfo = async() =>{
    try{
    let response = await fetch(
      `${API_URL}?q=${city}&appid=${API_KEY}&units=metric`
    );

    let jsonResponse = await response.json(); 
    let result = {
      city: city ,
      temp: jsonResponse.main.temp ,
      tempMin: jsonResponse.main.temp_min,
      tempMax: jsonResponse.main.temp_max,
      humidity: jsonResponse.main.feels_like,
      weather: jsonResponse.weather[0].description,
    };
    console.log(result);
    return result;
    }catch(err){
      throw err;
      
    }
    
  };

    const handleChange =(evt) => {
    setCity(evt.target.value);
  };

    const handleSubmit = async(evt) => {
      try{
         evt.preventDefault();              
         console.log("Submitted city:", city);
         setCity(""); 
         let newInfo = await getWeatherInfo();  
         updateInfo(newInfo);
      }
   catch(err){
      setError(true);
   }
  };
    
    return (
        <div className='SearchBox'>
            
            <form onSubmit={handleSubmit}>
                <TextField 
                id="city" 
                label="City Name" 
                variant="outlined" 
                required value={city}
                onChange={handleChange} 
                />
                <br></br>
                <br></br>
                <Button variant="contained" type="Submit">Search</Button>
                {error && <p style={{color:"red"}}>No such place exist!</p>}
            </form>
        </div>
    )
}