import React from 'react';
import {
  useStateValue,
  updatePatient,
  setDiagnosisList,
  addEntry,
} from '../state';
import { useParams } from 'react-router-dom';
import {
  ParamTypes,
  Patient,
  Diagnosis,
  HealthCheckEntry,
  BaseEntry,
  HospitalEntry,
  OccupationalHealthCareEntry,
  NoIdEntry,
  Entry,
} from '../types';
import { isFetched, assertNever } from '../utils';
import axios from 'axios';
import { apiBaseUrl } from '../constants';
import { Container, Header, Icon, Button } from 'semantic-ui-react';
import EntryDetails from './EntryDetails';
import AddEntryModal from '../AddEntryModal';
import { EntryFormValues } from '../AddEntryModal/AddEntryForm';

const SinglePatientPage: React.FC = () => {
  const [patient, setPatient] = React.useState<Patient>();
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();
  const { id } = useParams<ParamTypes>();
  const [{ patients, diagnoses }, dispatch] = useStateValue();

  React.useEffect(() => {
    const fetchPatient = async () => {
      try {
        const { data: patientFromApi } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        dispatch(updatePatient(patientFromApi));
      } catch (err) {
        console.error(err);
      }
    };
    const wantedPatient = patients[id];
    if (isFetched(wantedPatient)) {
      setPatient(wantedPatient);
    } else {
      void fetchPatient();
    }
  }, [patients, dispatch, id]);

  React.useEffect(() => {
    const fetchDiagnoses = async () => {
      try {
        const { data: diagnosesFromApi } = await axios.get<Diagnosis[]>(
          `${apiBaseUrl}/diagnoses`
        );
        dispatch(setDiagnosisList(diagnosesFromApi));
      } catch (err) {
        console.error(err);
      }
    };

    if (JSON.stringify(diagnoses) === '{}') {
      void fetchDiagnoses();
    }
  }, [diagnoses, dispatch]);

  if (patient === undefined) return <Header as='h2'>Loading... </Header>;

  const gender =
    patient.gender === 'male'
      ? 'mars'
      : patient.gender === 'female'
      ? 'venus'
      : 'transgender alternate';

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const openModal = (): void => setModalOpen(true);

  const dispatchEntry = async (id: string, entry: NoIdEntry) => {
    const { data: newEntry } = await axios.post<Entry>(
      `${apiBaseUrl}/patients/${id}/entries`,
      entry
    );
    dispatch(addEntry(id, newEntry));
  };

  const submitNewEntry = (values: EntryFormValues) => {
    try {
      const {
        description,
        date,
        specialist,
        diagnosisCodes,
        healthCheckRating,
        employerName,
        sickLeave,
        discharge,
        type,
      } = values;
      const newEntryBase: Omit<BaseEntry, 'id'> = {
        description,
        date,
        specialist,
        diagnosisCodes,
        type,
      };
      console.log(values.type);
      switch (values.type) {
        case 'HealthCheck':
          const newHCEntry: Omit<HealthCheckEntry, 'id'> = {
            ...newEntryBase,
            healthCheckRating,
            type: 'HealthCheck',
          };
          console.log(id);
          console.log(newHCEntry);
          void dispatchEntry(id, newHCEntry);
          break;
        case 'Hospital':
          const newHEntry: Omit<HospitalEntry, 'id'> = {
            ...newEntryBase,
            discharge,
            diagnosisCodes,
            type: 'Hospital',
          };
          console.log(newHEntry);
          void dispatchEntry(id, newHEntry);
          break;
        case 'OccupationalHealthcare':
          const newOHEntry: Omit<OccupationalHealthCareEntry, 'id'> = {
            ...newEntryBase,
            employerName,
            sickLeave,
            type: 'OccupationalHealthcare',
          };
          console.log(newOHEntry);
          void dispatchEntry(id, newOHEntry);
          break;
        default:
          assertNever(values.type);
          break;
      }

      closeModal();
    } catch (e) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      console.error(e.response.data);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      setError(e.response.data.error);
    }
  };
  return (
    <div>
      <Container>
        <Header as='h2'>
          {patient.name} <Icon name={gender}></Icon>{' '}
        </Header>
        <p>ssn: {patient.ssn}</p>
        <p>occupation: {patient.occupation}</p>
        <Header as='h3'>entries</Header>
        {console.log(patient.entries)}
        {patient.entries.map(entry => {
          return (
            <EntryDetails diagnoses={diagnoses} key={entry.id} entry={entry} />
          );
        })}
        <Button onClick={() => openModal()}>Add a new entry</Button>
      </Container>
      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        onClose={closeModal}
        error={error}
      />
    </div>
  );
};

export default SinglePatientPage;
