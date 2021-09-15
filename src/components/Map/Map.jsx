import './Map.css';
import { csvToJSON } from '../../utils/csvToJson';
import { ifExists } from '../../utils/checkIfExists';
import { useState, useEffect } from "react";
import axios from 'axios';
import GoogleMapReact from "google-map-react";
import {CaretDownOutlined} from '@ant-design/icons';

export const Map = ({coordinates,cityName,setCityDetails}) => {

    const [data, setData] = useState([]);

    useEffect(() => {
        console.log("CITY GETTER LOADED")
        axios.get('/data/german_capitals_latlon.csv')
        .then (async res => {
            let d = res.data;
            const {result } = await csvToJSON(d);
            console.log(result);
            setData(result);
        })
    }, []);

    useEffect(() => {
        let result = data;
        if (result?.length >0 && !ifExists(cityName, result)) {
            result?.push({ name: cityName, latitude: coordinates.lat, longitude: coordinates.lng });
            setData(result);
        }
    }, [cityName]);
    
    return (
        <div className="map-container">
            <GoogleMapReact
                bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY}}
                defaultCenter={coordinates}
                center={coordinates}
                defaultZoom={6}
            >
                {data?.map((place, i) => (
                    <div
                        onClick={( ) => setCityDetails({'name':place.name,'lat':place.latitude,'lon':place.longitude})}
                        className="markerContainer"
                        lat={place.latitude}
                        lng={place.longitude}
                        key={i}
                    ><CaretDownOutlined className={( ((Number(coordinates.lng) === Number(place.longitude))&& (Number(coordinates.lat) ===  Number(place.latitude))) ? 'selected' : 'icon')} title="Click to see weather details"/></div>
                ))}
            </GoogleMapReact>
        </div>
    );
};