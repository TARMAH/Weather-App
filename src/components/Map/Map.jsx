import './Map.css';
import { csvToJSON } from '../../utils/csvToJson';
import { useState, useEffect } from "react";
import axios from 'axios';
import GoogleMapReact from "google-map-react";
import {CaretDownOutlined} from '@ant-design/icons';

export const Map = ({defaultCoordinates}) => {

    const [data, setData] = useState([]);

    useEffect(() => {
        console.log("CITY GETTER LOADED")
        axios.get('/data/german_capitals_latlon.csv')
        .then (res => {
            let d = res.data;
            const {result , headers_} = csvToJSON(d);
            console.log(result);
            setData(result);
        })
    }, []);
    
    return (
        <div className="map-container">
            <GoogleMapReact
                bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY}}
                defaultCenter={defaultCoordinates}
                defaultZoom={6}
                // onChildClick={(child) => setChildClicked(child)}
            >
                {data?.map((place, i) => (
                    <div
                        className="markerContainer"
                        lat={place.latitude}
                        lng={place.longitude}
                        key={i}
                    ><CaretDownOutlined className="icon"/></div>
                ))}
            </GoogleMapReact>
        </div>
    );
};