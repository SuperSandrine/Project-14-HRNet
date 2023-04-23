import {
  Box,
  Grid,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { useEffect, useState } from 'react';
import EmployeeFormSelect from './EmployeeFormSelect';
import { departmentArray, statesArray } from './EmployeeFormData';

// TODO=  problème affichae pour les dates
// qu'est ce qu'on fait onsubmit le form?
// faire une fonctionnalité qui change uniquement les champs qui sont modifié pour éviter d'avoir 10 states différents comment je fais ça?
// TODO = mettre en place des validations de formulaires ou se renseigner sur les bonne praitques
// TODO =  mettre la modale en place
// TODO =  au save,
//    - enregistrer les infos
//    - les envoyer à la page suivant qui va les afficher
//    - afficher la modale
// TODO = modale:
//    - modale de confirmation
//    - quand on appuie sur croix ferme la modale
// TODO = selectbox: une avec les etats
// TODO = selectbox: avec les fonctions

const initialFormValues = {
  id: 0,
  firstName: '',
  lastName: '',
  birthDate: '',
  startDate: '',
  streetAddress: '',
  cityAddress: '',
  stateAddress: '',
  zipCodeAddress: '',
  department: '',
};

//const EmployeeForm = () => {
// const [formData, setFormData] = useState({
//   id: 0,
//   firstName: '',
//   lastName: '',
//   birthDate: '',
//   startDate: '',
//   addressStreet: '',
//   addressCity: '',
//   addressState: '',
//   addressZipCode: '',
//   department: '',
// });

// useEffect(() => {
//   const savedData = localStorage.getItem('formData');
//   if (savedData) {
//     setFormData(JSON.parse(savedData));
//   }
// }, []); // permet de charger automatiquement les donnees sauvegardées dans le formulaire après fermeture de la page

// const handleInputChange = (event) => {
//   const { name, value } = event.target;
//   setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
// };

// useEffect(() => {
//   localStorage.setItem('formData', JSON.stringify(formData));
// }, [formData]);

const EmployeeForm = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    //console.log('cecie est event brut', event);
    console.log('ceci est formData brut', formData);
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
    console.log('voici un nouvel employé de handlesubmit', newEmployee);

    const employees = JSON.parse(localStorage.getItem('employees')) || [];
    employees.push(newEmployee);
    localStorage.setItem('employees', JSON.stringify(employees));
  };

  return (
    <Box
      component="form"
      noValidate
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
            //autoComplete="given-name"
            // onChange={handleInputChange}
            // value={formData.firstName}
            name="firstName"
            required
            fullWidth
            id="firstName"
            label="First Name"
            autoFocus
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            id="lastName"
            label="Last Name"
            name="lastName"
            // onChange={handleInputChange}
            //autoComplete="family-name"
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
            // onChange={handleInputChange}
            //ajouter une valeur min et max en fonction du droit du pays
            // TODO valeur minimale dynamique en fonction de la date du jour moins 18ans
            // TODO ajouter un fond à label pour eviter le problème de superposition des titres
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
            // onChange={handleInputChange}
            //ajouter une valeur min et max en fonction du droit du pays
            // TODO valeur minimale dynamique en fonction de la date du jour moins 1jour (pas de date avant création de la boite)
            // TODO ajouter un fond à label pour eviter le problème de superposition des titres
          />
        </Grid>

        <Grid
          item
          //fullWidth
        >
          <Box
            component="fieldset"
            // fullWidth
          >
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
                  //ajouter une valeur min et max en fonction du droit du pays
                  // TODO valeur minimale dynamique en fonction de la date du jour moins 1jour (pas de date avant création de la boite)
                  // TODO ajouter un fond à label pour eviter le problème de superposition des titres
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
                  //ajouter une valeur min et max en fonction du droit du pays
                  // TODO valeur minimale dynamique en fonction de la date du jour moins 1jour (pas de date avant création de la boite)
                  // TODO ajouter un fond à label pour eviter le problème de superposition des titres
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <EmployeeFormSelect
                  name="stateAddress"
                  title="State"
                  options={statesArray}
                  required
                />
                {/* <FormControl fullWidth>
                  <InputLabel id="stateAddress">State</InputLabel>
                  <Select
                    labelId="stateAddress"
                    id="stateAddress"
                    name="stateAddress"
                    value={''}
                    //label="Age"
                    //onChange={handleChange}
                  >
                    <MenuItem value="">None</MenuItem>

                    <MenuItem value="AL">Alabama</MenuItem>
                    <MenuItem value="AS">Alaska</MenuItem>
                    <MenuItem value="AS">American Samao</MenuItem>
                  </Select>
                </FormControl> */}
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="zipCodeAddress"
                  label="Zip Code"
                  name="zipCodeAddress"
                  type="number"
                  //ajouter une valeur min et max en fonction du droit du pays
                  // TODO valeur minimale dynamique en fonction de la date du jour moins 1jour (pas de date avant création de la boite)
                  // TODO ajouter un fond à label pour eviter le problème de superposition des titres
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
          />
          {/* <FormControl fullWidth>
            <InputLabel id="department">Department</InputLabel>
            <Select
              labelId="department"
              id="department"
              name="department"

              //value={age}
              //label="Age"
              //onChange={handleChange}
            >
              <MenuItem value="Sales">Sales</MenuItem>
              <MenuItem value="Engineering">Engineering</MenuItem>
              <MenuItem value="Human Ressources">Human Ressource</MenuItem>
            </Select>
          </FormControl> */}
        </Grid>
      </Grid>
      <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
        Save
      </Button>
    </Box>
  );
};

export default EmployeeForm;