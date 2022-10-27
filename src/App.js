
import './App.css';
import { ClockComponent } from './ClockComponent';
import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {

  const [city, setCity] = useState('');
  const [tempCity, setTempCity] = useState('');
  const [temp, setTemp] = useState(0);
  const [errorMsg, setErrorMsg] = useState('');


  function getWeatherInfo(cityname) {
    if (!cityname) { return }
    const weatherapiurl = `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=f56f24967aaf51182d1d4df628297c6d`;
    axios.get(weatherapiurl)
      .then(response => {
        console.log(response)
        if (response.status === 200) {
          setCity(response.data.name)
          setTemp((response.data.main.temp - 273.15).toFixed(2))
          setErrorMsg('');
        }
      })
      .catch(err =>{
        console.log(err)
        setErrorMsg(`Error: 404, ${cityname} not found`)
      })
  }

  useEffect(() => {
    getWeatherInfo('hyderabad')
  }, [])

  const handleChange = (e) => {
    setTempCity(e.target.value);
  }

  const handleSearch = () => {
    getWeatherInfo(tempCity);
  }

  return (
    <div className='headerSection container-fluid'>
      <div className='row'>

        <div className='col-12 weatherBg'>
          <ClockComponent />
          <label className='form-label'><h1 className='text-white'>Enter the city Name</h1></label>
          <div className='input-group input-group-lg searchBox'>
            <input type="text" className='form-control shadow-none border-0' onChange={handleChange} placeholder="Search any city..." />
            <button type="button" className='btn btn-warning' onClick={handleSearch}><span className='bi bi-search'>&nbsp;</span>Search</button>
          </div>
        </div>

        <div className='col-12 showResult'>
          <img src="assets/images/partly-cloudy-day.png" alt='partly-cloudy-day-pic'/>
          <div className='fs-2 fw-2'>{city}</div>
          <div className='fs-4'>{temp}°C</div>
          <div className='text-danger'>{errorMsg}</div>
        </div>

      </div>
    </div>
  );
}

export default App;
