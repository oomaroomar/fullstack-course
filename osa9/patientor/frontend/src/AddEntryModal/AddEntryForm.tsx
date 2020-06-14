import React from 'react';
import {
  EntryType,
  Diagnosis,
  HealthCheckRating,
  SickLeave,
  Discharge,
} from '../types';
import { Formik, Form, Field } from 'formik';
import {
  TextField,
  NumberField,
  TypeOption,
  SelectField,
} from '../AddPatientModal/FormField';
import { Grid, Button } from 'semantic-ui-react';

export type EntryFormValues = {
  description: string;
  date: string;
  specialist: string;
  type: EntryType;
  diagnosisCodes?: Array<Diagnosis['code']>;
  healthCheckRating: HealthCheckRating;
  employerName: string;
  sickLeave?: SickLeave;
  discharge: Discharge;
};

interface EntryFormProps {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

const typeOptions: TypeOption[] = [
  { label: 'Health Check', value: 'HealthCheck' },
  { label: 'Hospital', value: 'Hospital' },
  { label: 'Occupational Healthcare', value: 'OccupationalHealthcare' },
];

const AddEntryForm: React.FC<EntryFormProps> = ({ onSubmit, onCancel }) => {
  return (
    <Formik
      initialValues={{
        description: '',
        date: '',
        specialist: '',
        type: 'HealthCheck',
        diagnosisCodes: [],
        healthCheckRating: 0,
        employerName: '',
        sickLeave: { startDate: '', endDate: '' },
        discharge: { date: '', criteria: '' },
      }}
      onSubmit={onSubmit}
      validate={values => {
        const requiredError = 'Field is required';
        const errors: { [field: string]: string } = {};
        if (!values.date) errors.date = requiredError;
        if (!values.specialist) errors.specialist = requiredError;
        if (!values.description) errors.description = requiredError;
        if (!values.type) errors.type = requiredError;
        if (values.type === 'HealthCheck' && !values.healthCheckRating)
          errors.healthCheckRating = requiredError;
        if (values.type === 'Hospital' && !values.discharge.criteria)
          errors.criteria = requiredError;
        if (values.type === 'Hospital' && !values.discharge.date)
          errors.dischargeDate = requiredError;
        if (values.type === 'OccupationalHealthcare' && !values.employerName)
          errors.employername = requiredError;
        return errors;
      }}
    >
      {({ isValid, dirty, values }) => (
        <Form className='form ui'>
          <SelectField label='Type' name='type' options={typeOptions} />
          <Field
            label='Description'
            placeholder='description'
            name='description'
            component={TextField}
          />
          <Field
            label='Date of entry'
            placeholder='YYYY-MM-DD'
            name='date'
            component={TextField}
          />
          <Field
            label='Specialist'
            placeholder='specialist'
            name='specialist'
            component={TextField}
          />
          {values.type === 'HealthCheck' && (
            <Field
              label='Health check rating'
              name='healthCheckRating'
              min={0}
              max={3}
              component={NumberField}
            />
          )}
          {values.type === 'OccupationalHealthcare' && (
            <Field
              label='Employer name'
              name='employerName'
              placeholder='employer name'
              component={TextField}
            />
          )}{' '}
          {values.type === 'OccupationalHealthcare' && (
            <Field
              label='Sick leave start date'
              name='sickLeave.startDate'
              placeholder='start date'
              component={TextField}
            />
          )}
          {values.type === 'OccupationalHealthcare' && (
            <Field
              label='Sick leave end date'
              name='sickLeave.endDate'
              placeholder='end date'
              component={TextField}
            />
          )}
          {values.type === 'Hospital' && (
            <Field
              label='Discharge date'
              name='discharge.date'
              placeholder='discharge date'
              component={TextField}
            />
          )}
          {values.type === 'Hospital' && (
            <Field
              label='Discharge criteria'
              name='discharge.criteria'
              placeholder='discharge criteria'
              component={TextField}
            />
          )}
          <Grid>
            <Grid.Column floated='left' width={5}>
              <Button type='button' onClick={onCancel} color='red'>
                Cancel
              </Button>
            </Grid.Column>
            <Grid.Column floated='right' width={5}>
              <Button
                type='submit'
                floated='right'
                color='green'
                disabled={!dirty || !isValid}
              >
                Add
              </Button>
            </Grid.Column>
          </Grid>
        </Form>
      )}
    </Formik>
  );
};

export default AddEntryForm;
