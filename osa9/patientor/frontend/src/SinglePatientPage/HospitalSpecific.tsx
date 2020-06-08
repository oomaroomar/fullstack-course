import React from 'react';
import { Icon } from 'semantic-ui-react';
import { Discharge } from '../types';

interface HospitalSpcificProps {
  discharge: Discharge;
}

const HospitalSpecific: React.FC<HospitalSpcificProps> = ({
  discharge,
}: HospitalSpcificProps) => {
  return (
    <React.Fragment>
      <Icon name='ambulance' />
      <p>Discharge date: {discharge.date}</p>
      <p>Discharge criteria: {discharge.criteria}</p>
    </React.Fragment>
  );
};

export default HospitalSpecific;
