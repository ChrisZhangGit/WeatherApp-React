import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import SearchCity from './SearchCity';
import device from '../responsive/Device';
import Result from './Result';
import NotFound from './NotFound';

const AppTitle = styled.h1`
  display: block;
  height: 64px;
  margin: 0;
  padding: 20px 0;
  font-size: 20px;
  text-transform: uppercase;
  font-weight: 400;
  color: #ffffff;
  transition: 0.3s 1.4s;
  opacity: ${({ showLabel }) => (showLabel ? 1 : 0)};

  ${({ secondary }) =>
    secondary &&
    `
    opacity: 1;
    height: auto;
    position: relative;
    padding: 20px 0;
    font-size: 30px;
    top: 20%;
    text-align: center;
    transition: .5s;
    @media ${device.tablet} {
      font-size: 40px;
    }
    @media ${device.laptop} {
      font-size: 50px;
    }
    @media ${device.laptopL} {
      font-size: 60px;
    }
    @media ${device.desktop} {
      font-size: 70px;
    }
    
  `}

  ${({ showResult }) =>
    showResult &&
    `
    opacity: 0;
    visibility: hidden;
    top: 10%;
  `}
`;

const WeatherWrapper = styled.div`
  max-width: 1500px;
  margin: 0 auto;
  height: calc(100vh - 64px);
  width: 100%;
  position: relative;
`;

class App extends React.Component {
  state = {
    // isDataStored: false,
    value: '',
    weatherInfo: null,
    error: false,
  };

  handleInputChange = e => {
    this.setState({
      value: e.target.value,
    });
  };

  handleSearchCity = e => {
    e.preventDefault();
    localStorage.clear();
    const { value } = this.state;
    localStorage.setItem('value', value);

    // Geocoding API: Convert between addresses and geographic coordinates
    const geocodingAPIkey = 'AIzaSyCEykiqcs_JYhTw8pIBL5BGAwfdVWuLD6Y';
    const getLocation = `https://maps.googleapis.com/maps/api/geocode/json?address=${value}&key=${geocodingAPIkey}`;

    const APIkey = 'fff52b3fc3996aa9a6cd2f21aeea9a58';
    const weather = `https://api.openweathermap.org/data/2.5/weather?q=${value}&APPID=${APIkey}&units=metric`;
    const forecast = `https://api.openweathermap.org/data/2.5/forecast?q=${value}&APPID=${APIkey}&units=metric`;

    axios
      .all([axios.get(weather), axios.get(getLocation), axios.get(forecast)])
      .then(
        axios.spread((resCurrent, resLocation, res3) => {
          const months = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
          ];
          const days = [
            'Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
          ];
          const currentDate = new Date();
          // console.log(resCurrent);
          // console.log(resLocation);
          const date = `${days[currentDate.getDay()]} ${currentDate.getDate()} ${
            months[currentDate.getMonth()]
          }`;
          const sunset = new Date(resCurrent.data.sys.sunset * 1000).toLocaleString().slice(12, 17);
          const sunrise = new Date(resCurrent.data.sys.sunrise * 1000)
            .toLocaleString()
            .slice(12, 17);

          const lat = resLocation.data.results[0].geometry.location.lat;
          const lng = resLocation.data.results[0].geometry.location.lng;
          const getWeather = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&appid=${APIkey}&units=metric`;
          axios.get(getWeather).then(resForecast => {
            const weatherInfo = {
              city: resCurrent.data.name,
              country: resCurrent.data.sys.country,
              date,
              description: resCurrent.data.weather[0].description,
              main: resCurrent.data.weather[0].main,
              icon: resCurrent.data.weather[0].icon,
              temp: resCurrent.data.main.temp,
              highestTemp: resCurrent.data.main.temp_max,
              lowestTemp: resCurrent.data.main.temp_min,
              feelsLikeTemp: resCurrent.data.main.feels_like,
              sunrise,
              sunset,
              clouds: resCurrent.data.clouds.all,
              humidity: resCurrent.data.main.humidity,
              wind: resCurrent.data.wind.speed,
              pressure: resCurrent.data.main.pressure,
              visibility: resCurrent.data.visibility,
              forecast: res3.data.list,
              forecastMinutely: resForecast.data.minutely,
              forecastHourly: resForecast.data.hourly,
              forecastDaily: resForecast.data.daily,
              //time,
            };
            // console.log('???', weatherInfo);
            //console.log('weather', resForecast);
            localStorage.setItem('localWeatherData', JSON.stringify(weatherInfo));
            localStorage.setItem('isDataStored', true);

            this.setState({
              weatherInfo,
              error: false,
              // isDataStored: true,
            });
          });
          //console.log('resForecast', lat);
          // const googleGeoData = JSON.stringify(resForecast.data);
          // console.log(googleGeoData.geometry.location);
          // console.log('resForecast:' + resForecast.result);
          //const time = currentDate.toString().slice(16, 24);

          // console.log(weatherInfo);
          // console.log(weatherInfo.main);
        }),
      )
      .catch(error => {
        this.setState({
          error: true,
          weatherInfo: null,
        });
      });
  };

  render() {
    const { value, weatherInfo, error } = this.state;
    // const localWeatherData = localStorage.getItem('localWeatherData');
    const localWeatherData = JSON.parse(localStorage.getItem('localWeatherData') || '[]');
    // console.log(localWeatherData);
    // console.log(typeof localWeatherData);
    // console.log(localWeatherData.length);
    const isDataStored = localStorage.getItem('isDataStored');
    // console.log('1 :' + weatherInfo);
    // console.log(`2 :${localWeatherData.getLocation}`);
    // console.log('3 :' + isDataStored);
    return (
      <>
        {/* <AppTitle showLabel={(weatherInfo || error) && true}>Weather appp</AppTitle> */}
        {/* <AppTitle showLabel={weatherInfo || error || isDataStored} onClick={localStorage.clear()}> */}
        <AppTitle showLabel={weatherInfo || error || isDataStored}>Weather app</AppTitle>

        <WeatherWrapper>
          {!isDataStored && (
            <AppTitle secondary showResult={weatherInfo || error}>
              Weather App
            </AppTitle>
          )}
          {
            <SearchCity
              value={value}
              showResult={error || localWeatherData.length !== 0}
              change={this.handleInputChange}
              submit={this.handleSearchCity}
            />
          }
          {(weatherInfo || isDataStored) && <Result weather={weatherInfo || localWeatherData} />}
          {error && <NotFound error={error} />}
        </WeatherWrapper>
      </>
    );
  }
  componentDidMount() {
    //const localValue = localStorage.getItem('value');
    //this.setState({ value: localValue });
    //const localWeatherData = localStorage.getItem('localWeatherData');
    //this.setState({ localWeatherData });
  }
}

export default App;
