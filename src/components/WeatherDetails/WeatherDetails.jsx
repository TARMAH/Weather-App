import React from 'react';
import './WeatherDetails.css';
import windLogo from './wind.png';
import humidityLogo from './humidity.png';
import windDirection from './windDirection.png';
import clouds from './clouds.png';

export const WeatherDetails = ({weatherInfo,units,cityName}) => {
    const {air_temperature,wind_speed,relative_humidity,cloud_area_fraction,wind_from_direction} = weatherInfo;
    return (
        <div className="weather-container">
            <div className="title">{cityName}</div>
            <div className="temp">{air_temperature} {units.air_temperature}</div>
            <div className="details">
                <div className="details-data">
                    <div>wind speed</div>
                    <img src={windLogo} alt="#" />
                    <div>{wind_speed} {units.wind_speed}</div>
                </div>
                <div className="details-data">
                    <div>humidity</div>
                    <img src={humidityLogo} alt="#" />
                    <div>{relative_humidity} {units.relative_humidity}</div>
                </div>
                <div className="details-data">
                    <div>Wind Direction</div>
                    <img src={windDirection} alt="#" />
                    <div>{wind_from_direction} {units.wind_from_direction}</div>
                </div>
                <div className="details-data">
                    <div>clouds</div>
                    <img src={clouds} alt="#" />
                    <div>{cloud_area_fraction} {units.cloud_area_fraction}</div>
                </div>
            </div>
        </div>
    );
};
