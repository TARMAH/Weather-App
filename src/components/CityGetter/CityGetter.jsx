import { useState,useEffect } from "react"; 
import axios from 'axios';
import "antd/dist/antd.css";
import { AutoComplete } from "antd";
const { Option } = AutoComplete;


function csvJSON(csvStr){
    let lines=csvStr.split("\n");
    let result = [];

    let headers=lines[0].split(",");
  
    for(let i=1;i<lines.length;i++){
  
        let obj = {};
        let currentline=lines[i].split(",");
  
        for(let j=0;j<headers.length;j++){
            obj[headers[j]] = currentline[j];
            
        }
  
        result.push(obj);
  
    }
    return {headers,result};
  }


export function CityGetter({data,setData}){

    const [headers , setHeaders] = useState([]);
    const [result, setResult] = useState([]);
    const [city, setCity] = useState({});

    useEffect(() => {
        axios.get('/data/german_cities_latlon.csv')
        .then(res => {
            let data = res.data;
            const {result , headers} = csvJSON(data);
            console.log(result[0][headers[2]]);
            console.log(result[0]);
            console.log(headers);
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
            setCity({});
        }
       
      };

  
    return (
      <div>
        <AutoComplete
                style={{
                    width: 200
                }}
                onSearch={handleSearch}
                placeholder="Search City"
                >
                {result.map((d,idx) => (
                    <Option key={idx} value={d[headers[0]]} >
                    <div onClick={ () => setCity(d)}>{d[headers[0]]}</div>
                    </Option >
                ))}
                        {console.log(city)}
            </AutoComplete>
      </div>
    )
  }
  