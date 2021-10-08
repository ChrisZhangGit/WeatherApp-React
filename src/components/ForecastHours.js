import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import SmallLabel from './SmallLabel';
import Text from './Text';
import device from '../responsive/Device';

const ForecastWrapper = styled.div`
  flex-shrink: 0;
  flex-basis: 90px;
  padding: 10px;
  margin: 0 5px;
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 0.2);
  &:hover {
    transform: translateY(-10px);
  }
  @media ${device.tablet} {
    flex-basis: 110px;
  }
  @media ${device.laptop} {
    flex-basis: 125px;
  }
  @media ${device.laptopL} {
    flex-basis: 140px;
  }
`;
const WeatherIcon = styled.img`
  display: block;
  height: 50px;
  width: 50px;
  margin: 0 auto;
`;

export const ForecastHours = props => {
  const { dt, temp, icon } = props;
  const date = new Date(dt * 1000).toLocaleString().slice(12, 17);
  const iconUrl = `https://openweathermap.org/img/w/${icon}.png`;
  //console.log(date.slice(0, 2));

  return (
    <ForecastWrapper>
      <Text align="center">{date}</Text>

      <WeatherIcon src={iconUrl} />
      <SmallLabel align="center" weight="400">
        {temp}&#176;C
      </SmallLabel>
    </ForecastWrapper>
  );
};

ForecastHours.propTypes = {
  dt: PropTypes.number.isRequired,
  temp: PropTypes.number.isRequired,
  icon: PropTypes.string.isRequired,
};
