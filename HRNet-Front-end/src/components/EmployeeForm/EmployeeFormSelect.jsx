import React, { useEffect, useState } from 'react';
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';

const EmployeeFormSelect = (props) => {
  const [newValue, setNewValue] = useState('');
  const [newError, setNewError] = useState(false);
  const [alertText, setAlertText] = useState('');

  const { name, title, options, required, helpertext, error, clear } = props;
  useEffect(() => {
    if (error) {
      setNewError(true);
      setAlertText(helpertext);
    } else {
      setNewError(false);
      setAlertText('');
    }
    if (clear) {
      setNewError(false);
      setAlertText('');
      setNewValue('');
    }
  }, [error, clear]);

  const handleChangeSelect = (event) => {
    setNewValue(event.target.value);
    setNewError(false);
  };

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
