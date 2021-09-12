import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';

import { CityGetter  } from './components/CityGetter/CityGetter';

function App() {

  const [cityCoordinates, setCityCoordinates] = useState({lat:50.1109, lon:8.6821});

  useEffect(() => {
    console.log(cityCoordinates);
    axios.get('https://api.met.no/weatherapi/locationforecast/2.0/compact?lat='+cityCoordinates.lat+'&lon='+cityCoordinates.lon)
    .then((response) => {
      console.log(response.data);
    });
  }, [cityCoordinates]);

  return (
    <div className="App">
      <CityGetter setCityCoordinates={setCityCoordinates}/>
    </div>
  );
}

export default App;
