import './Map.css';
import { ifExists } from '../utils/checkIfExists';
import { useEffect } from "react";
import GoogleMapReact from "google-map-react";
import { CaretDownOutlined } from '@ant-design/icons';
import { useFetchCSVHook } from '../hooks/useFetchHook';

export const Map = ({coordinates,cityName,setCityDetails}) => {

    const { setData, data } = useFetchCSVHook('/data/german_capitals_latlon.csv');

    useEffect(() => {
        let result = data;
        if (result?.length >0 && !ifExists(cityName, result)) {
            result?.push({ name: cityName, latitude: coordinates.lat, longitude: coordinates.lng });
            setData(result);
        }
    }, [cityName,coordinates,data,setData]);
    
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