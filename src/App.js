import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';

import { CityGetter  } from './components/CityGetter/CityGetter';
import {WeatherDetails} from './components/WeatherDetails/WeatherDetails';
import {Map} from './components/Map/Map';

function App() {

  const [cityDetails, setCityDetails] = useState({name:"Frankfurt am Main",lat:50.1109, lon:8.6821});
  const [weatherInfo , setWeatherInfo] = useState({});
  const [units , setUnits] = useState({});

  useEffect(() => {
    console.log(cityDetails);
    axios.get('https://api.met.no/weatherapi/locationforecast/2.0/compact?lat='+cityDetails.lat+'&lon='+cityDetails.lon)
      .then((response) => {
        console.log(response.data.properties.timeseries[0].data.instant.details);
        setUnits(response.data.properties.meta.units)
        setWeatherInfo(response.data.properties.timeseries[0].data.instant.details);
    });
  }, [cityDetails]);

  return (
    <div className="App">
      <CityGetter setCityDetails={setCityDetails}/>
      <WeatherDetails weatherInfo={weatherInfo} units={units} cityName={cityDetails.name}/>
      <Map />
    </div>
  );
}

export default App;
