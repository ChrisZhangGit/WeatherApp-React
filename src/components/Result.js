import React from 'react';
import PropTypes from 'prop-types';
import uuid from 'react-uuid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCloud,
  faBolt,
  faCloudRain,
  faCloudShowersHeavy,
  faSnowflake,
  faSun,
  faSmog,
  faClock,
  faBell,
  faCalendarAlt,
  faExclamationTriangle,
} from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import device from '../responsive/Device';
import { ForecastMinutes } from './ForecastMinutes';
import { ForecastHours } from './ForecastHours';
import { ForecastDays } from './ForecastDays';
import { AlertIsNull, AlertContent } from './Alert';
import ResultFadeIn from './ResultFadeIn';
import BigLabel from './BigLabel';
import MediumLabel from './MediumLabel';
import SmallLabel from './SmallLabel';
import Text from './Text';

const Results = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 40px 0;
  opacity: 0;
  visibility: hidden;
  position: relative;
  top: 20px;
  animation: ${ResultFadeIn} 1.5s 0.3s forwards;
`;

const LocationWrapper = styled.div`
  flex-basis: 100%;
  &:hover {
    transition-property: transform;
    transform: translateX(20px);
    transition-duration: 0.3s;
    transition-timing-function: ease-in-out;
  }
`;

const CurrentWeatherWrapper = styled.div`
  flex-basis: 100%;
  display: grid;
  justify-content: center;
  align-items: center;
  grid-template-columns: auto 1fr;
  margin: 20px 0;
  grid-gap: 30px;
  @media ${device.mobileL} {
    flex-basis: 50%;
    padding-right: 10px;
  }
  @media ${device.tablet} {
    grid-template-columns: 1fr 1fr;
    padding-right: 20px;
  }
`;

const WeatherIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 70px;
  color: #ffffff;
  @media ${device.tablet} {
    font-size: 100px;
    justify-content: flex-end;
  }
  @media ${device.laptop} {
    font-size: 120px;
  }
  @media ${device.laptopL} {
    font-size: 140px;
  }
`;

const TemperatureWrapper = styled.div``;

const Temperature = styled.h3`
  display: block;
  font-size: 50px;
  font-weight: 400;
  color: #ffffff;
  @media ${device.tablet} {
    font-size: 70px;
  }
  @media ${device.laptop} {
    font-size: 90px;
  }
  @media ${device.laptopL} {
    font-size: 110px;
  }
`;

const WeatherDetailsWrapper = styled.div`
  flex-basis: 100%;
  display: flex;
  flex-wrap: wrap;
  padding: 10px 0;
  margin: 20px 0;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  align-self: flex-start;
  @media ${device.mobileL} {
    flex-basis: 50%;
  }
`;

const WeatherDetail = styled.div`
  flex-basis: calc(100% / 3);
  padding: 10px;
  &:hover {
    transition-property: transform;
    transform: translateY(-10px);
    transition-duration: 0.2s;
    transition-timing-function: ease-in-out;
  }
  @media ${device.laptop} {
    padding: 20px 10px;
  }
`;

const ForecastWrapper = styled.div`
  flex-basis: 100%;
  margin: 20px 0;
  overflow: hidden;
`;

const Forecast = styled.div`
  position: relative;
  display: flex;
  overflow-x: scroll;
  overflow-y: hidden;
  margin-top: 20px;
  padding-bottom: 20px;
  &::-webkit-scrollbar {
    overflow-x: hidden;
    background: rgba(255, 255, 255, 0);
    border-radius: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.2);
    border-radius: 10px;
  }
  &::-webkit-scrollbar-thumb:active {
    background: rgba(255, 255, 255, 0.7);
  }
  @media ${device.laptop} {
    order: 4;
  }
`;

export const AlertsLabel = styled.h3`
  color: ${({ color }) => color || '#FFFFFF'};
  display: block;
  font-weight: ${({ weight }) => weight || '600'};
  font-size: ${({ fontSize }) => fontSize || '20px'};
  text-align: ${({ align }) => align || 'left'};
  padding: 5px 0;
  @media ${device.mobileS} {
    font-size: 15px;
  }
  @media ${device.mobileM} {
    font-size: 17px;
  }
  @media ${device.tablet} {
    font-size: 20px;
  }
  @media ${device.laptop} {
    font-size: 25px;
  }
  @media ${device.laptopL} {
    font-size: 30px;
  }
`;

const Result = ({ weather }) => {
  const {
    address,
    city,
    country,
    date,
    description,
    main,
    temp,
    sunset,
    sunrise,
    humidity,
    wind,
    highestTemp,
    lowestTemp,
    feelsLikeTemp,
    pressure,
    visibility,
    //time,
    forecastMinutely,
    forecastHourly,
    forecastDaily,
    alerts,
  } = weather;

  const forecastsMinutely = forecastMinutely.map(item => (
    <ForecastMinutes key={item.dt} dt={item.dt} precipitation={item.precipitation} />
  ));

  const forecastsHourly = forecastHourly.map(item => (
    <ForecastHours
      key={item.dt}
      dt={item.dt}
      temp={Math.round(item.temp)}
      icon={item.weather[0].icon}
    />
  ));

  const forecastsDaily = forecastDaily.map(item => (
    <ForecastDays
      key={item.dt}
      dt={item.dt}
      temp={Math.round(item.temp.day)}
      icon={item.weather[0].icon}
    />
  ));

  let weatherIcon = null;

  const weatherList = {
    Clear: faSun,
    Thunderstorm: faBolt,
    Drizzle: faCloudRain,
    Rain: faCloudShowersHeavy,
    Snow: faSnowflake,
    Clouds: faCloud,
    Atmosphere: faSmog,
  };

  weatherIcon = weatherList[main] ? (
    <FontAwesomeIcon icon={weatherList[main]} />
  ) : (
    <FontAwesomeIcon icon={weatherList['Atmosphere']} />
  );

  const backgroundChange = () => {
    switch (main) {
      case 'Clear':
        document.body.setAttribute('class', '');
        document.body.classList.add('clear');
        break;
      case 'ThunderStorm':
        document.body.setAttribute('class', '');
        document.body.classList.add('thunderstorm');
        break;
      case 'Drizzle':
        document.body.setAttribute('class', '');
        document.body.classList.add('drizzle');
        break;
      case 'Rain':
        document.body.setAttribute('class', '');
        document.body.classList.add('rain');
        break;
      case 'Snow':
        document.body.setAttribute('class', '');
        document.body.classList.add('snow');
        break;
      case 'Clouds':
        document.body.setAttribute('class', '');
        document.body.classList.add('clouds');
        break;
      default:
        document.body.setAttribute('class', '');
        document.body.classList.add('atmosphere');
        break;
    }
  };

  let alertInfo;
  const showAlert = () => {
    alerts !== undefined
      ? (alertInfo = alerts.map(item => (
          <AlertContent
            address={address}
            key={uuid()}
            description={item.description}
            sender={item.sender_name}
            start={item.start}
            end={item.end}
            type={item.event}
          />
        )))
      : (alertInfo = <AlertIsNull />);
  };

  return (
    <Results>
      {backgroundChange()}
      {showAlert()}
      <LocationWrapper>
        <BigLabel>
          {city}, {country} {/*time*/}
        </BigLabel>
        <SmallLabel weight="400">{date}</SmallLabel>
      </LocationWrapper>
      <CurrentWeatherWrapper>
        <WeatherIcon>{weatherIcon}</WeatherIcon>
        <TemperatureWrapper>
          <Temperature>{Math.round(temp)}&#176;</Temperature>
          <SmallLabel weight="400" firstToUpperCase>
            {description}
          </SmallLabel>
        </TemperatureWrapper>
      </CurrentWeatherWrapper>
      <WeatherDetailsWrapper>
        <WeatherDetail>
          <SmallLabel align="center" weight="400">
            {Math.round(highestTemp)}&#176;
          </SmallLabel>
          <Text align="center">Hight</Text>
        </WeatherDetail>
        <WeatherDetail>
          <SmallLabel align="center" weight="400">
            {wind}mph
          </SmallLabel>
          <Text align="center">Wind</Text>
        </WeatherDetail>
        <WeatherDetail>
          <SmallLabel align="center" weight="400">
            {sunrise}
          </SmallLabel>
          <Text align="center">Sunrise</Text>
        </WeatherDetail>
        <WeatherDetail>
          <SmallLabel align="center" weight="400">
            {Math.round(lowestTemp)}&#176;
          </SmallLabel>
          <Text align="center">Low</Text>
        </WeatherDetail>
        <WeatherDetail>
          <SmallLabel align="center" weight="400">
            {humidity}%
          </SmallLabel>
          <Text align="center">Humidity</Text>
        </WeatherDetail>
        <WeatherDetail>
          <SmallLabel align="center" weight="400">
            {sunset}
          </SmallLabel>
          <Text align="center">Sunset</Text>
        </WeatherDetail>
        <WeatherDetail>
          <SmallLabel align="center" weight="400">
            {Math.round(feelsLikeTemp)}&#176;
          </SmallLabel>
          <Text align="center">Feels Like</Text>
        </WeatherDetail>
        <WeatherDetail>
          <SmallLabel align="center" weight="400">
            {pressure}hPa
          </SmallLabel>
          <Text align="center">Pressure</Text>
        </WeatherDetail>
        <WeatherDetail>
          <SmallLabel align="center" weight="400">
            {Math.round(visibility) / 1000}km
          </SmallLabel>
          <Text align="center">Visibility</Text>
        </WeatherDetail>
      </WeatherDetailsWrapper>
      <ForecastWrapper>
        <MediumLabel weight="600">
          <FontAwesomeIcon icon={faBell} /> Minutely Forecast (Precipitation)
        </MediumLabel>
        <Forecast>{forecastsMinutely}</Forecast>
      </ForecastWrapper>
      <ForecastWrapper>
        <MediumLabel weight="600">
          <FontAwesomeIcon icon={faClock} /> Hourly Forecast
        </MediumLabel>
        <Forecast>{forecastsHourly}</Forecast>
      </ForecastWrapper>
      <ForecastWrapper>
        <MediumLabel weight="600">
          <FontAwesomeIcon icon={faCalendarAlt} /> Daily Forecast
        </MediumLabel>
        <Forecast>{forecastsDaily}</Forecast>
      </ForecastWrapper>
      <ForecastWrapper>
        <AlertsLabel>
          <FontAwesomeIcon icon={faExclamationTriangle} />
          &nbsp;&nbsp;Alerts
        </AlertsLabel>
        <Forecast>{alertInfo}</Forecast>
      </ForecastWrapper>
    </Results>
  );
};

Result.propTypes = {
  weather: PropTypes.shape({
    city: PropTypes.string,
    country: PropTypes.string,
    date: PropTypes.string,
    description: PropTypes.string,
    main: PropTypes.string,
    temp: PropTypes.number,
    icon: PropTypes.string,
    sunrise: PropTypes.string,
    sunset: PropTypes.string,
    humidity: PropTypes.number,
    wind: PropTypes.number,
    highestTemp: PropTypes.number,
    lowestTemp: PropTypes.number,
    feelsLikeTemp: PropTypes.number,
    pressure: PropTypes.number,
    visibility: PropTypes.number,
    forecast: PropTypes.array,
    time: PropTypes.string,
  }).isRequired,
};

export default Result;
