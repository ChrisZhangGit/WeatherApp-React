import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import SmallLabel from './SmallLabel';
import device from '../responsive/Device';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudSunRain, faCloudMoonRain } from '@fortawesome/free-solid-svg-icons';

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

export const ForecastMinutes = props => {
  const { dt, precipitation } = props;
  const date = new Date(dt * 1000).toLocaleString().slice(12, 17);
  //   console.log(date.slice(0, 2));

  return (
    <ForecastWrapper>
      <SmallLabel fontSize="30px" align="center">
        <FontAwesomeIcon
          icon={(date.slice(0, 2) > 6) & (date.slice(0, 2) < 18) ? faCloudSunRain : faCloudMoonRain}
        />
      </SmallLabel>
      <SmallLabel align="center" weight="200">
        {precipitation.toString().slice(0, 4)}mm
      </SmallLabel>
      <SmallLabel fontSize="17px" weight="400" align="center">
        {date}
      </SmallLabel>
    </ForecastWrapper>
  );
};

ForecastMinutes.propTypes = {
  precipitation: PropTypes.number.isRequired,
  dt: PropTypes.number.isRequired,
};
