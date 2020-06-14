import React from 'react';
import { Entry, Diagnosis } from '../types';
import { Segment, List, Header } from 'semantic-ui-react';
import { assertNever } from '../utils';
import HealthSpecific from './HealthSpecific';
import HospitalSpecific from './HospitalSpecific';
import OccupationSpecific from './OccupationSpecific';

interface EntryDetailsProps {
  entry: Entry;
  diagnoses: { [code: string]: Diagnosis };
}

const EntryDetails: React.FC<EntryDetailsProps> = ({
  entry,
  diagnoses,
}: EntryDetailsProps) => {
  const getEntrySpecificContent = (): JSX.Element | undefined => {
    switch (entry.type) {
      case 'HealthCheck':
        return <HealthSpecific healthCheckRating={entry.healthCheckRating} />;
      case 'Hospital':
        return <HospitalSpecific discharge={entry.discharge} />;
      case 'OccupationalHealthcare':
        return <OccupationSpecific employer={entry.employerName} />;
      default:
        assertNever(entry);
    }
  };

  return (
    <Segment key={entry.id} raised>
      {getEntrySpecificContent()}
      <Header as='h4'>{entry.date}</Header>
      <Header as='h5'>{entry.description}</Header>
      <List bulleted>
        {entry.diagnosisCodes?.map((diagnosisCode, i) => (
          <List.Item key={i}>
            {diagnosisCode} {diagnoses[diagnosisCode].name}
          </List.Item>
        ))}
      </List>
    </Segment>
  );
};

export default EntryDetails;
