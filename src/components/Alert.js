import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import SmallLabel from './SmallLabel';
import MediumLabel from './MediumLabel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckSquare } from '@fortawesome/free-solid-svg-icons';

const ForecastWrapper = styled.div`
  padding: 20px;
  margin: 0 5px;
  border-radius: 5px;
  background-color: rgba(255, 0, 0, 0.322);
  transition-property: transform;
  transition-duration: 0.2s;
  transition-timing-function: ease-in-out;
  &:hover {
    transform: translateY(-10px);
  }
  &:first-child {
    margin-left: 0;
  }
  &:last-child {
    margin-right: 0;
  }
`;

const AlertsWrapper = styled.div`
  width: 100%;
  padding: 10px;
  margin: 0 5px;
  border-radius: 5px;
  background-color: rgba(0, 255, 0, 0.322);
  transition-property: transform;
  transition-duration: 0.2s;
  transition-timing-function: ease-in-out;
  &:hover {
    transform: translateY(-10px);
  }
`;

export const AlertIsNull = () => {
  return (
    <AlertsWrapper>
      <MediumLabel align="center">
        <FontAwesomeIcon icon={faCheckSquare} />
        &nbsp; There is no weather alert in this area
      </MediumLabel>
    </AlertsWrapper>
  );
};

export const AlertContent = props => {
  const { address, description, sender, start, end, type } = props;
  const startTime = new Date(start * 1000).toLocaleString();
  const endTime = new Date(end * 1000).toLocaleString();
  let typeConvert = type;
  let descriptionConvert = description;
  let senderConvert = sender;
  let addressConvert = address;
  let addressIndex = addressConvert.indexOf(',');
  addressConvert = addressConvert.slice(addressIndex + 1);

  const checkEng = param => {
    const regExp = /[^A-Za-z]/;
    if (regExp.test(param)) return false;
    return true;
  };

  const infoCheck = () => {
    if (typeConvert === '' || !checkEng(typeConvert)) {
      typeConvert = 'Natural Disaster';
    }
    if (descriptionConvert === '' || !checkEng(descriptionConvert)) {
      descriptionConvert = 'Unknown Natural Disaster';
    }
    if (senderConvert === '' || !checkEng(typeConvert)) {
      senderConvert = 'Bureau of Meteorology ' + addressConvert;
    }
  };

  return (
    <ForecastWrapper>
      {infoCheck()}
      <SmallLabel>{typeConvert}</SmallLabel>
      <SmallLabel>
        Start
        <br />
        {startTime}
      </SmallLabel>
      <SmallLabel>
        End
        <br />
        {endTime}
      </SmallLabel>
      <SmallLabel>
        Sender
        <br />
        {senderConvert}
      </SmallLabel>
      <SmallLabel>
        Description
        <br />
        {descriptionConvert}
      </SmallLabel>
    </ForecastWrapper>
  );
};

AlertContent.propTypes = {
  address: PropTypes.string,
  description: PropTypes.string,
  sender: PropTypes.string,
  start: PropTypes.string,
  end: PropTypes.string,
  type: PropTypes.string,
};
