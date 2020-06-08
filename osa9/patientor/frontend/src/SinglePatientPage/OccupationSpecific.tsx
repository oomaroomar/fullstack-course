import React from 'react';
import { Icon } from 'semantic-ui-react';

interface OccupationSpcificProps {
  employer: string;
}

const OccupationSpecific: React.FC<OccupationSpcificProps> = ({
  employer,
}: OccupationSpcificProps) => {
  return (
    <React.Fragment>
      <Icon name='hospital' />
      <p>{employer}</p>
    </React.Fragment>
  );
};

export default OccupationSpecific;
