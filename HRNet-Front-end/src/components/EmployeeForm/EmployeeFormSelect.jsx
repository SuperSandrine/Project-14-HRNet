import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import React, { useEffect, useState } from 'react';

const EmployeeFormSelect = (props) => {
  const [newValue, setNewValue] = useState('');
  const [newError, setNewError] = useState(false);
  const [alertText, setAlertText] = useState('');

  const { name, title, options, required, helpertext, error, clear } = props;
  console.log('toutes les props de employee formselect', props);
  useEffect(() => {
    if (error) {
      console.log('LERREUR EST PRESENTE');
      setNewError(true);
      setAlertText(helpertext);
    } else {
      setNewError(false);
      setAlertText('');
    }
    if (clear) {
      console.log('JE NETOIE TOUT');
      setNewError(false);
      setAlertText('');
      setNewValue('');
    }
  }, [error, clear]);

  // Comme je ne peux pas supprimer la valeur une fois choisi, pas besoin de validate lors du handleCHange
  // const validateSelect = (value) => {
  //   if (!value || value == null || value == '') {
  //     setErrorTest(true);
  //     return;
  //   }
  //   setErrorTest(false);
  //   return null;
  // };

  const handleChangeSelect = (event) => {
    console.log('la nouvelle valeur sera:', event.target.value);
    setNewValue(event.target.value);
    setNewError(false);
  };
  console.log('******** new value : ', newValue);

  return (
    <FormControl required={required} fullWidth error={newError}>
      <InputLabel id="name">{title}</InputLabel>
      <Select
        labelId={name}
        id={name}
        name={name}
        label={title}
        value={newValue}
        onChange={handleChangeSelect}
        //error={errorTest}
        //helperText={errorTest}
        MenuProps={{
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'center',
          },
          style: {
            maxHeight: 200,
          },
        }}
      >
        {options.map((item) => (
          <MenuItem key={item.id} value={item.id}>
            {item.title}
          </MenuItem>
        ))}
      </Select>
      {newError && <FormHelperText>{alertText}</FormHelperText>}
    </FormControl>
  );
};

export default EmployeeFormSelect;
