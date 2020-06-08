import React from 'react';
import { useStateValue, updatePatient, setDiagnosisList } from '../state';
import { useParams } from 'react-router-dom';
import { ParamTypes, Patient, Diagnosis } from '../types';
import { isFetched } from '../utils';
import Axios from 'axios';
import { apiBaseUrl } from '../constants';
import { Container, Header, Icon } from 'semantic-ui-react';
import EntryDetails from './EntryDetails';

const SinglePatientPage: React.FC = () => {
  const [patient, setPatient] = React.useState<Patient>();
  const { id } = useParams<ParamTypes>();
  const [{ patients, diagnoses }, dispatch] = useStateValue();

  React.useEffect(() => {
    const wantedPatient = patients[id];
    if (isFetched(wantedPatient)) {
      setPatient(wantedPatient);
    } else {
      void fetchPatient();
    }
  }, [patients]);

  React.useEffect(() => {
    if (JSON.stringify(diagnoses) === '{}') {
      void fetchDiagnoses();
    }
  }, [diagnoses]);

  const fetchPatient = async () => {
    try {
      const { data: patientFromApi } = await Axios.get<Patient>(
        `${apiBaseUrl}/patients/${id}`
      );
      dispatch(updatePatient(patientFromApi));
    } catch (err) {
      console.error(err);
    }
  };
  const fetchDiagnoses = async () => {
    try {
      const { data: diagnosesFromApi } = await Axios.get<Diagnosis[]>(
        `${apiBaseUrl}/diagnoses`
      );
      dispatch(setDiagnosisList(diagnosesFromApi));
    } catch (err) {
      console.error(err);
    }
  };

  if (patient === undefined) return <Header as='h2'>Loading... </Header>;

  const gender =
    patient.gender === 'male'
      ? 'mars'
      : patient.gender === 'female'
      ? 'venus'
      : 'transgender alternate';

  return (
    <Container>
      <Header as='h2'>
        {patient.name} <Icon name={gender}></Icon>{' '}
      </Header>
      <p>ssn: {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>
      <Header as='h3'>entries</Header>
      {patient.entries.map(entry => (
        <EntryDetails diagnoses={diagnoses} key={entry.id} entry={entry} />
      ))}
    </Container>
  );
};

export default SinglePatientPage;
