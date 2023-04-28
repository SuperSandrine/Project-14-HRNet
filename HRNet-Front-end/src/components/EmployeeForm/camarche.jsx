import { Box, Grid, TextField, Button, Paper } from '@mui/material';
import { useState } from 'react';
import EmployeeFormSelect from './EmployeeFormSelect';
import { departmentArray, statesArray } from './EmployeeFormData';
import Modal from '../Modal/Modal';

const initialValuesForm = {
  firstName: {
    value: '',
    errorMessage: 'You must enter a first name with 2 caractere minimum',
  },
  lastName: {
    value: '',
    errorMessage: 'You must enter a last name with 2 caractere minimum',
  },
  birthDate: {
    value: '',
    errorMessage: 'You must choose a birth Date',
  },
  startDate: {
    value: '',
    errorMessage: 'You must choose a start Date',
  },
  streetAddress: {
    value: '',
    errorMessage:
      'You must enter a street for your address with 2 caractere minimum',
  },
  cityAddress: {
    value: '',
    errorMessage:
      'You must enter a city for your address with 2 caractere minimum',
  },
  stateAddress: {
    value: '',
    errorMessage: 'You must choose a state for your address',
  },
  zipCodeAddress: {
    value: '',
    errorMessage: 'You must enter a zip code for your address with 5 digits',
  },
  department: {
    value: '',
    errorMessage: 'You must choose a department',
  },
};

const EmployeeForm = () => {
  const [showModal, setShowModal] = useState(false);
  const [formValues, setFormValues] = useState(initialValuesForm);
  const [errors, setErrors] = useState({});

  const today = new Date(); // récupère la date d'aujourd'hui
  const maxAgeDate = new Date(
    today.getFullYear() - 18,
    today.getMonth(),
    today.getDate()
  );
  const maxDate = maxAgeDate.toISOString().slice(0, 10);
  const minAgeDate = new Date(
    today.getFullYear() - 100,
    today.getMonth(),
    today.getDate()
  );
  const minDate = minAgeDate.toISOString().slice(0, 10);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: {
        ...formValues[name],
        value,
      },
    });
    validate({ [name]: value });
  };

  const validate = (fieldValue = formValues) => {
    let watchingError = { ...errors };

    if ('firstName' in fieldValue) {
      watchingError.firstName =
        fieldValue?.firstName.length >= 5 ? false : true;
    }
    if ('lastName' in fieldValue) {
      watchingError.lastName = fieldValue?.lastName.length >= 2 ? false : true;
    }
    if ('birthDate' in fieldValue) {
      watchingError.birthDate = fieldValue.birthDate ? false : true;
    }
    if ('startDate' in fieldValue) {
      watchingError.startDate = fieldValue.startDate ? false : true;
    }
    if ('streetAddress' in fieldValue) {
      watchingError.streetAddress =
        fieldValue?.streetAddress.length >= 2 ? false : true;
    }
    if ('cityAddress' in fieldValue) {
      watchingError.cityAddress =
        fieldValue?.cityAddress.length >= 2 ? false : true;
    }
    if ('stateAddress' in fieldValue) {
      watchingError.stateAddress = fieldValue.stateAddress ? false : true;
    }
    // if ('zipCodeAddress' in fieldValue) {
    //   const zipPattern = /[0-9]{5}/;
    //   watchingError.zipCodeAddress = zipPattern.test(fieldValue.zipCodeAddress)
    //     ? false
    //     : true;
    // }
    if ('zipCodeAddress' in fieldValue) {
      const zipPattern = /[0-9]{5}/;
      console.log('longueur', fieldValue);
      if (
        //zipPattern.test(fieldValue.zipCodeAddress) == false &&
        fieldValue?.zipCodeAddress.length > 5
      ) {
        watchingError.zipCodeAddress = true;
      } else {
        watchingError.zipCodeAddress = false;
      }
    }
    if ('department' in fieldValue) {
      watchingError.department = fieldValue.department ? false : true;
    }
    setErrors({ ...watchingError });
    console.log('fin fonction validate error= ', errors);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('debut handle submit formvalues', formValues); // les champs vident
    validate(formValues);
    console.log('début handle submit errors', errors);

    const formData = new FormData(event.target);

    const newEmployee = {
      id: Date.now(),
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      birthDate: formData.get('birthDate'),
      startDate: formData.get('startDate'),
      streetAddress: formData.get('streetAddress'),
      cityAddress: formData.get('cityAddress'),
      stateAddress: formData.get('stateAddress'),
      zipCodeAddress: formData.get('zipCodeAddress'),
      department: formData.get('department'),
    };

    console.log('après validate de handle, y a des erreurs?', errors);
    console.log(
      'que renvoi le if object',
      Object.values(errors).includes(true)
    );

    if (Object.values(errors).includes(true) == false) {
      const employees = JSON.parse(localStorage.getItem('employees')) || [];
      employees.push(newEmployee);
      localStorage.setItem('employees', JSON.stringify(employees));
      setShowModal(true);
      console.log('le premier employee', newEmployee);

      setFormValues(initialValuesForm);
    } else {
      console.log('il y a in problem à la soumission');
      console.log('voici les erreurs', errors);
    }
  };

  return (
    <>
      {' '}
      {showModal && (
        <Modal
          showModal
          onClose={() => setShowModal(false)}
          title="Employee creation done"
        >
          {'Your employee have been created !'}
        </Modal>
      )}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          '& > :not(style)': {
            m: 1,
            width: 4 / 5,
          },
        }}
      >
        <Paper
          elevation={3}
          sx={{
            paddingLeft: 2,
            paddingRight: 2,
          }}
        >
          <Box
            id="createEmployeeForm"
            component="form"
            noValidate // ne fait pas les vérifications navigateurs
            autoComplete="off"
            onSubmit={handleSubmit}
            sx={{
              mt: 3,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  type="text"
                  value={formValues.firstName.value}
                  onChange={handleChange}
                  //onBlur={}
                  error={errors.firstName}
                  helperText={
                    errors.firstName && formValues.firstName.errorMessage
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  type="text"
                  value={formValues.lastName.value}
                  onChange={handleChange}
                  //onBlur={}
                  error={errors.lastName}
                  helperText={
                    errors.lastName && formValues.lastName.errorMessage
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="birthDate"
                  label="Date of Birth"
                  name="birthDate"
                  type="date"
                  sx={{
                    '& .MuiFormLabel-root': { backgroundColor: 'white' },
                  }}
                  inputProps={{
                    min: `${minDate}`,
                    max: `${maxDate}`,
                  }}
                  value={formValues.birthDate.value}
                  onChange={handleChange}
                  //onBlur={}
                  error={errors.birthDate}
                  helperText={
                    errors.birthDate && formValues.birthDate.errorMessage
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="startDate"
                  label="Start Date"
                  name="startDate"
                  type="date"
                  sx={{
                    '& .MuiFormLabel-root': {
                      backgroundColor: 'white',
                      width: 'fit-content',
                      minWidth: '100px',
                    },
                  }}
                  inputProps={{
                    min: '2012-05-23',
                    //in the case the cie has been created this day
                  }}
                  value={formValues.startDate.value}
                  onChange={handleChange}
                  //onBlur={}
                  error={errors.startDate}
                  helperText={
                    errors.startDate && formValues.startDate.errorMessage
                  }
                />
              </Grid>

              <Grid item xs={12} sm={12}>
                <Box component="fieldset">
                  <legend>Address</legend>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={12}>
                      <TextField
                        required
                        fullWidth
                        id="streetAddress"
                        label="Street"
                        name="streetAddress"
                        type="text"
                        value={formValues.streetAddress.value}
                        onChange={handleChange}
                        //onBlur={}
                        error={errors.streetAddress}
                        helperText={
                          errors.streetAddress &&
                          formValues.streetAddress.errorMessage
                        }
                      />
                    </Grid>

                    <Grid item xs={12} sm={12}>
                      <TextField
                        required
                        fullWidth
                        id="cityAddress"
                        label="City"
                        name="cityAddress"
                        type="text"
                        value={formValues.cityAddress.value}
                        onChange={handleChange}
                        //onBlur={}
                        error={errors.cityAddress}
                        helperText={
                          errors.cityAddress &&
                          formValues.cityAddress.errorMessage
                        }
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <EmployeeFormSelect
                        name="stateAddress"
                        title="State"
                        options={statesArray}
                        required
                        value={formValues.stateAddress.value}
                        onChange={handleChange}
                        //onBlur={}
                        error={errors.stateAddress}
                        helpertext={
                          errors.stateAddress &&
                          formValues.stateAddress.errorMessage
                        }
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        fullWidth
                        id="zipCodeAddress"
                        label="Zip Code"
                        name="zipCodeAddress"
                        type="text"
                        inputMode="numeric" //pour le responsive
                        inputProps={{ pattern: '[0-9]{5}', max: '5' }}
                        value={formValues.zipCodeAddress.value}
                        onChange={handleChange}
                        //onBlur={}
                        error={errors.zipCodeAddress}
                        helperText={
                          errors.zipCodeAddress &&
                          formValues.zipCodeAddress.errorMessage
                        }
                      />
                    </Grid>
                  </Grid>
                </Box>
              </Grid>

              <Grid item xs={12}>
                <EmployeeFormSelect
                  name="department"
                  title="Department"
                  options={departmentArray}
                  required
                  value={formValues.department.value}
                  onChange={handleChange}
                  //onBlur={}
                  error={errors.department}
                  helpertext={
                    errors.department && formValues.department.errorMessage
                  }
                />
              </Grid>
            </Grid>
            <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
              Save
            </Button>
          </Box>
        </Paper>
      </Box>
    </>
  );
};

export default EmployeeForm;
