import React from 'react';
import { Icon } from 'semantic-ui-react';
import { HealthCheckRating } from '../types';

interface HealthSpcificProps {
  healthCheckRating: HealthCheckRating;
}

const HealthSpecific: React.FC<HealthSpcificProps> = ({
  healthCheckRating,
}: HealthSpcificProps) => {
  const color =
    healthCheckRating === 0
      ? 'green'
      : healthCheckRating === 1
      ? 'yellow'
      : healthCheckRating === 2
      ? 'orange'
      : 'extreme';

  return (
    <React.Fragment>
      <Icon name='user md' />
      {color === 'extreme' ? (
        <Icon color='red' name='exclamation' />
      ) : (
        <Icon color={color} name='heart' />
      )}
    </React.Fragment>
  );
};

export default HealthSpecific;
