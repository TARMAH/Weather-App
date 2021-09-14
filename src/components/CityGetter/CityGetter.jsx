import './CityGetter.css';
import { csvToJSON } from '../../utils/csvToJson';
import { useState,useEffect } from "react"; 
import axios from 'axios';
import "antd/dist/antd.css";
import { AutoComplete } from "antd";
const { Option } = AutoComplete;

export  const CityGetter = ({setCityDetails}) =>{

    const [headers , setHeaders] = useState([]);
    const [result, setResult] = useState([]);
    const [data, setData] = useState([]);

    useEffect(() => {
        console.log("CITY GETTER LOADED")
        axios.get('/data/german_cities_latlon.csv')
        .then(res => {
            let d = res.data;
            const {result , headers} = csvToJSON(d);
            //console.log(result);
            setHeaders(headers);
            setData(result);
        })
      }, []);

      const handleSearch = (value) => {
        if (value.length > 3) {
          let res = [];
    
          for (const d of data) {
            if(d[headers[0]].toLowerCase().includes(value.toLowerCase()))res.push(d);
          }
    
          console.log(res);
          setResult(res);
        }
        else {
            setResult([]);
        }
       
      };

  
    return (
      <div className="search">
        <AutoComplete
                style={{
                    width: '50%',
                }}
                onSearch={handleSearch}
                placeholder="Search City"
                >
                {result.map((d,idx) => (
                    <Option key={idx} value={d[headers[0]]} >
                    <div onClick={ () => setCityDetails({'name':d[headers[0]],'lat':Number(d[headers[2]]),'lon':Number(d[headers[3]])})}>{d[headers[0]]}</div>
                    </Option >
                ))}
                        
            </AutoComplete>
      </div>
    )
  }
  