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
    const { value } = this.state;
    localStorage.setItem('value', value);

    const APIkey = 'fff52b3fc3996aa9a6cd2f21aeea9a58';

    const weather = `https://api.openweathermap.org/data/2.5/weather?q=${value}&APPID=${APIkey}&units=metric`;
    const forecast = `https://api.openweathermap.org/data/2.5/forecast?q=${value}&APPID=${APIkey}&units=metric`;

    axios
      .all([axios.get(weather), axios.get(forecast)])
      .then(
        axios.spread((res1, res2) => {
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
          //console.log(currentDate);
          //console.log('.............');
          console.log(res1);
          const time = currentDate.toString().slice(16, 24);
          const date = `${days[currentDate.getDay()]} ${currentDate.getDate()} ${
            months[currentDate.getMonth()]
          }`;

          const sunset = new Date(res1.data.sys.sunset * 1000).toLocaleString().slice(11, 17);
          const sunrise = new Date(res1.data.sys.sunrise * 1000).toLocaleString().slice(11, 17);

          const weatherInfo = {
            city: res1.data.name,
            country: res1.data.sys.country,
            date,
            description: res1.data.weather[0].description,
            main: res1.data.weather[0].main,
            icon: res1.data.weather[0].icon,
            temp: res1.data.main.temp,
            highestTemp: res1.data.main.temp_max,
            lowestTemp: res1.data.main.temp_min,
            feelsLikeTemp: res1.data.main.feels_like,
            sunrise,
            sunset,
            clouds: res1.data.clouds.all,
            humidity: res1.data.main.humidity,
            wind: res1.data.wind.speed,
            pressure: res1.data.main.pressure,
            visibility: res1.data.visibility,
            forecast: res2.data.list,
            time,
          };
          console.log(weatherInfo);
          localStorage.setItem('localWeatherData', weatherInfo);
          localStorage.setItem('isDataStored', true);

          this.setState({
            weatherInfo,
            error: false,
            // isDataStored: true,
          });
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
    const localWeatherData = localStorage.getItem('localWeatherData');
    const isDataStored = localStorage.getItem('isDateStored');
    console.log('1 :' + weatherInfo);
    console.log('2 :' + localWeatherData);
    console.log('3 :' + isDataStored);
    return (
      <>
        {/* <AppTitle showLabel={(weatherInfo || error) && true}>Weather appp</AppTitle> */}
        <AppTitle showLabel={weatherInfo || error}>Weather app</AppTitle>

        <WeatherWrapper>
          <AppTitle secondary showResult={weatherInfo || error}>
            Weather App
          </AppTitle>
          <SearchCity
            value={value}
            showResult={weatherInfo || error}
            change={this.handleInputChange}
            submit={this.handleSearchCity}
          />
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
