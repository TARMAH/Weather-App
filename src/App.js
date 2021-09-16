import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';

import { CityGetter  } from './components/CityGetter/CityGetter';
import {WeatherDetails} from './components/WeatherDetails/WeatherDetails';
import {Map} from './components/Map/Map';

function App() {

  const [cityDetails, setCityDetails] = useState({name:"Berlin",lat:52.52437, lon:13.41053});
  const [weatherInfo , setWeatherInfo] = useState({});
  const [units , setUnits] = useState({});

  useEffect(() => {
    axios.get('https://api.met.no/weatherapi/locationforecast/2.0/compact?lat='+cityDetails.lat+'&lon='+cityDetails.lon)
      .then((response) => {
        setUnits(response.data.properties.meta.units)
        setWeatherInfo(response.data.properties.timeseries[0].data.instant.details);
    });
  }, [cityDetails]);

  return (
    <div className="App">
      <CityGetter setCityDetails={setCityDetails}/>
      <WeatherDetails weatherInfo={weatherInfo} units={units} cityName={cityDetails.name}/>
      <Map coordinates={{ lat: cityDetails.lat, lng: cityDetails.lon }} cityName={ cityDetails.name} setCityDetails={setCityDetails}/>
    </div>
  );
}

export default App;
