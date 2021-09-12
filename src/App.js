import { useState } from 'react';
import './App.css';

import { CityGetter  } from './components/CityGetter/CityGetter';

function App() {

  const [data, setData] = useState([]);

  return (
    <div className="App">
      <CityGetter data={data} setData={setData}/>
      {console.log(data)}
    </div>
  );
}

export default App;
