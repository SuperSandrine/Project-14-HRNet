import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React from 'react';

const EmployeeFormSelect = (props) => {
  const [value, setValue] = React.useState('');
  console.log('les props de selc', props);
  const { name, title, options, required } = props;

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <FormControl required={required} fullWidth>
      <InputLabel id="department">{title}</InputLabel>
      <Select
        labelId={name}
        id={name}
        name={name}
        label={title}
        value={value}
        onChange={handleChange}
      >
        {options.map((item) => (
          <MenuItem key={item.id} value={item.id}>
            {item.title}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default EmployeeFormSelect;
