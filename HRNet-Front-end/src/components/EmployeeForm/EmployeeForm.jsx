import { Box, Grid, TextField, Button, Paper } from '@mui/material';
import { useState } from 'react';
import EmployeeFormSelect from './EmployeeFormSelect';
import {
  departmentArray,
  statesArray,
  initialValuesForm,
} from './EmployeeFormData';
import { setDatePickerLimit } from '../../utils/functions';
import { Modal } from 'react-modal-tuv39';
import { useDispatch } from 'react-redux';
import { addEmployee } from '../../redux/redux';

const EmployeeForm = () => {
  const [showModal, setShowModal] = useState(false);
  const [formValues, setFormValues] = useState(initialValuesForm);
  const [errors, setErrors] = useState({});
  const [clear, setClear] = useState(false);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setClear(false);
    // récupère name et valeur de l'input de l'évènement écouté
    //console.log('*********dans handle change 2', e.target);
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: {
        ...formValues[name],
        value,
      },
    });
    // contrôle du champ avec validate
    //console.log('*********dans handle change', { [name]: value });
    validate({ [name]: value });
  };

  // fcn validate: tu prends la valeur qui est maintenant dans un état local,
  // TODOD = si la valeur est bonne (encart vert quand on change de case (on blur)
  //      - utilisez le input:invalid et input:valid pour ça?
  // OK - si la valeur n'est pas bonne rouge pendant le typing (onchange)
  // OK - définir comment une valeur est bonne ou pas , prénom: 2 caractères
  // OK - si le truc est vide, bloquer à la submission
  // TODO : traitement particulier de la select !!!
  const validate = (
    fieldValue
    //= formValues
  ) => {
    let watchingError = { ...errors };

    if ('firstName' in fieldValue) {
      watchingError.firstName =
        fieldValue?.firstName.length >= 2 ? false : true;
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
    if ('zipCodeAddress' in fieldValue) {
      const zipPattern = /[0-9]{5}/;
      if (zipPattern.test(fieldValue.zipCodeAddress) == false) {
        watchingError.zipCodeAddress = true;
      } else if (fieldValue?.zipCodeAddress === '00000') {
        watchingError.zipCodeAddress = true;
      } else if (fieldValue?.zipCodeAddress.length > 5) {
        watchingError.zipCodeAddress = true;
      } else {
        watchingError.zipCodeAddress = false;
      }
    }
    if ('department' in fieldValue) {
      //console.log('DEPARTEMENT', fieldValue.department);
      watchingError.department = fieldValue.department ? false : true;
    }
    setErrors({ ...watchingError });
    //console.log('fin fonction validate error= ', errors);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setClear(false);

    const formData = new FormData(event.target);
    //console.log('form data', formData);
    //console.log('form data 2', formData);

    // avant cette étape, vérifier les datas pour qu'il n'y ait pas de champs vide
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
    let isvalid = 0;
    for (const value of formData.values()) {
      value == '' || formValues === null ? isvalid : isvalid++;
    }
    validate(newEmployee);
    if (isvalid === 9) {
      //gestion employee avec local storage
      //const employees = JSON.parse(localStorage.getItem('employees')) || [];
      //employees.push(newEmployee);
      //localStorage.setItem('employees', JSON.stringify(employees));
      //------------------
      dispatch(addEmployee(newEmployee));
      setShowModal(true);
      //console.log('formvalue avant', formValues);
      setFormValues(initialValuesForm);
      //const form = document.querySelector('#createEmployeeForm');
      // console.log('$$$$$$$ est ce bien form', form);
      // form.reset();
      formData.delete('stateAddress');
      formData.delete('department');
      // var selectFields = form.querySelectorAll('.MuiSelect-select');
      // console.log('le selecfields', selectFields);
      // for (var i = 0; i < selectFields.length; i++) {
      //   selectFields[i].innerHTML = '';
      // }
      setClear(true);

      //console.log('initial value', initialValuesForm);
      //console.log('forma value après', formValues);
    }
    //else {
    //console.log('il y a in problem à la soumission');
    //console.error('voici les erreurs', errors);
    // const body = document.getElementsByTagName('body');
    // body[0].style.backgroundColor = 'green';
    //}
  };
  return (
    <>
      <Modal
        showModal={showModal}
        onClose={() => setShowModal(false)}
        title="Employee creation done"
        backDropClickAndClose
        fadeIn
        animationDuration="2.5"
        fadeOut
      >
        {'Your employee has been created ! '}
      </Modal>
      <Box
        id="formContainer"
        sx={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          '& > :not(style)': {
            m: 1,
            width: { sm: 4 / 5, xs: '100vw' },
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
                    min: `${setDatePickerLimit(100)}`,
                    max: `${setDatePickerLimit(18)}`,
                  }}
                  value={formValues.birthDate.value}
                  onChange={handleChange}
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
                    //admitting the cie has been created on mai 2012
                  }}
                  value={formValues.startDate.value}
                  onChange={handleChange}
                  error={errors.startDate}
                  helperText={
                    errors.startDate && formValues.startDate.errorMessage
                  }
                />
              </Grid>

              <Grid item xs={12} sm={12} sx={{ textAlign: 'left' }}>
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
                        clear={clear}
                        required
                        value={formValues.stateAddress.value}
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
                        inputProps={{ pattern: '[0-9]{5}' }}
                        value={formValues.zipCodeAddress.value}
                        onChange={handleChange}
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

              <Grid item xs={12} sx={{ textAlign: 'left' }}>
                <EmployeeFormSelect
                  name="department"
                  title="Department"
                  options={departmentArray}
                  required
                  clear={clear}
                  value={formValues.department.value}
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
