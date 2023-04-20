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

// todo problème affichae pour les dates
// qu'est ce qu'on fait onsubmit le form?
// faire une fonctionnalité qui change uniquement les champs qui sont modifié pour éviter d'avoir 10 states différents comment je fais ça?
const EmployeeForm = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    console.log('cecie est event brut', event);
    console.log('cecie est data brut', data);
    console.log({
      firstName: data.get('firstName'),
      lastName: data.get('lastName'),
    });
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
            autoComplete="given-name"
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
            autoComplete="family-name"
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
            //ajouter une valeur min et max en fonction du droit du pays
            // TODO valeur minimale dynamique en fonction de la date du jour moins 1jour (pas de date avant création de la boite)
            // TODO ajouter un fond à label pour eviter le problème de superposition des titres
          />
        </Grid>

        <Grid item fullWidth>
          <Box component="fieldset" fullWidth>
            <legend>Address</legend>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="streetAddress"
                  label="Street"
                  name="startAddress"
                  type="text"
                  //ajouter une valeur min et max en fonction du droit du pays
                  // TODO valeur minimale dynamique en fonction de la date du jour moins 1jour (pas de date avant création de la boite)
                  // TODO ajouter un fond à label pour eviter le problème de superposition des titres
                />
              </Grid>

              <Grid item xs={12} sm={6}>
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
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">State</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    //value={age}
                    //label="Age"
                    //onChange={handleChange}
                  >
                    <MenuItem value="AL">Alabama</MenuItem>
                    <MenuItem value="AS">Alaska</MenuItem>
                    <MenuItem value="AS">American Samao</MenuItem>
                  </Select>
                </FormControl>
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
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Department</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              //value={age}
              //label="Age"
              //onChange={handleChange}
            >
              <MenuItem>Sales</MenuItem>
              <MenuItem>Engineering</MenuItem>
              <MenuItem>Human Ressource</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
        Save
      </Button>
    </Box>
  );
};

export default EmployeeForm;
