import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import React from 'react';

const EmployeeFormSelect = (props) => {
  const [value, setValue] = React.useState('');
  const { name, title, options, required, error, helpertext } = props;

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <FormControl required={required} fullWidth error={error}>
      <InputLabel id="name">{title}</InputLabel>
      <Select
        labelId={name}
        id={name}
        name={name}
        label={title}
        value={value}
        onChange={handleChange}
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
      <FormHelperText>{helpertext}</FormHelperText>
    </FormControl>
  );
};

export default EmployeeFormSelect;
