
import React, { useState } from 'react';
import './weather.css';
export default function CityWeather() {
  const [city, setCity] = useState('');
  const [temperature, setTemperature] = useState(null);
  const [location, setLocation] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [weatherCondition, setWeatherCondition] = useState('');

  const changeHandler = (e) => {
    setCity(e.target.value);
  };

  const getDaySuffix = (day) => {
    switch (day) {
      case 1:
      case 21:
      case 31:
        return 'st';
      case 2:
      case 22:
        return 'nd';
      case 3:
      case 23:
        return 'rd';
      default:
        return 'th';
    }
  };

  const formatDate = (date) => {
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();
    const daySuffix = getDaySuffix(day);

    return `${day}${daySuffix} ${month} ${year}`;
  };

  const determineWeatherCondition = (cloudiness) => {
    return cloudiness < 30 ? 'Sunny' : 'Cloudy';
  };

  const submitHandler = (e) => {
    e.preventDefault();

    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=e849ec378296aae22dc243a8b9d84def`)
      .then((result) => result.json())
      .then((data) => {
        const kelvin = data.main.temp;
        const celsius = kelvin - 273.15;
        setTemperature(Math.round(celsius));
        setLocation(data.name);
        const currentDate = formatDate(new Date());
        setCurrentDate(currentDate);
        const condition = determineWeatherCondition(data.clouds.all);
        setWeatherCondition(condition);
      })
      .catch((error) => {
        console.error('Error fetching weather data:', error);
      });
  };

  return (
    <>
      <div className='bg_img'>
        <form className="weather-form" onSubmit={submitHandler}>
          <input
            type="text"
            value={city}
            onChange={changeHandler}
            placeholder="Enter city"
            className="input-city"
          />
        </form>
        {temperature !== null && (
          <div className="box-container">
            <div className="location boxes">
              <div style={{fontSize:'2rem',color:'pink'}}> City</div>
              <div style={{fontSize:'1.4rem'}}>{location}</div>
            </div>
            <div className="date boxes">
              <div style={{fontSize:'2rem',color:'pink'}}> Date</div>
              <div style={{fontSize:'1.4rem'}}>{currentDate}</div>
            </div>
            <div className="temperature boxes">
              <div style={{fontSize:'2rem',color:'pink'}}> Temperature</div>
              <div style={{fontSize:'1.4rem'}}>{temperature}°C</div>
            </div>
            <div className="condition boxes">
              <div style={{fontSize:'2rem',color:'pink'}}> Weather</div>
              <div style={{fontSize:'1.4rem'}}>{weatherCondition}</div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}