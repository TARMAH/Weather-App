import './CityGetter.css';
import { useState } from "react"; 
import "antd/dist/antd.css";
import { useFetchCSVHook } from '../hooks/useFetchHook';
import { AutoComplete } from "antd";
const { Option } = AutoComplete;

const SKIP = ['ü','ö'];  // add values to skip

export  const CityGetter = ({setCityDetails}) =>{

    const [filteredResult, setFilteredResult] = useState([]);
    const [value, setValue] = useState('');
    const { headers, data } = useFetchCSVHook('/data/german_cities_latlon.csv');

    const handleSearch = (value) => {
        if (value.length > 2) {
          let res = [];
    
          for (const d of data) {
            if(d[headers[0]].toLowerCase().includes(value.toLowerCase()))res.push(d);
          }
    
          console.log(res);
          setFilteredResult(res);
        }
        else {
          setFilteredResult([]);
        }
       
    };
  
  const handleChange = (v) => {
      for (let i = 0; i < v.length; i++) {
        if (SKIP.includes(v[i])) {
          v = v.replace(v[i], '');
        }
      }
      setValue(v);
    }

  
    return (
      <div className="search">
            <AutoComplete
                style={{
                    width: '50%',
                }}
                onSearch={handleSearch}
                value={value}
                onChange={handleChange}
                placeholder="Search City"
                >
                {filteredResult?.map((d,idx) => (
                    <Option key={idx} value={d[headers[0]]} >
                    <div onClick={ () => setCityDetails({'name':d[headers[0]],'lat':Number(d[headers[2]]),'lon':Number(d[headers[3]])})}>{d[headers[0]]}</div>
                    </Option >
                ))}
                        
            </AutoComplete>
      </div>
    )
  }
  