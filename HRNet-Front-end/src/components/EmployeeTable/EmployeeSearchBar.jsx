import React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useState } from 'react';

// function filterDuplicates(options) {
//   const optionRow = new Set();
//   const filteredOptions = [];

//   for (const option of options) {
//     if (!optionRow.has(option)) {
//       optionRow.add(option);
//       const optionString =
//         option.lastName + (option.firstName ? ` (${option.firstName})` : '');
//       filteredOptions.push(optionString);
//     }
//   }

//   return filteredOptions;
// }

// const SearchBar = ({ options }) => {
//   const [searchTerm, setSearchTerm] = React.useState('');

//   const filteredOptions = React.useMemo(
//     () => filterDuplicates(options),
//     [options]
//   );

//   const filteredOptionsBySearchTerm = React.useMemo(
//     () =>
//       filteredOptions.filter((option) =>
//         option.toLowerCase().includes(searchTerm.toLowerCase())
//       ),
//     [filteredOptions, searchTerm]
//   );

function searchTable(input, array) {
  const results = [];
  for (let i = 0; i < array.length; i++) {
    for (const key in array[i]) {
      const value = array[i][key].toString().toLowerCase();
      console.log('value', value);
      console.log('input', input);
      if (
        //typeof value === 'string' &&
        value.includes(input)
      ) {
        results.push(array[i]);
      }
      break;
    }
  }
  console.log('results', results);
  return results;
}

export const SearchBar1 = ({ options }) => {
  const [searchTerm, setSearchTerm] = React.useState('');

  const filteredOptionsBySearchTerm = React.useMemo(
    () =>
      searchTable(searchTerm, options).map((option) => {
        console.log('une date', option.starDate);
        const optionString =
          option.firstName +
          (option.lastName ? ` (${option.lastName})` : '') +
          (option.starDate ? ` (${option.starDate})` : '') +
          (option.department ? ` (${option.department})` : '') +
          (option.stateAddress ? ` (${option.stateAddress})` : '');
        return optionString;
      }),
    [options, searchTerm]
  );

  return (
    <Autocomplete
      freeSolo
      disableClearable
      options={filteredOptionsBySearchTerm}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Recherche"
          margin="normal"
          onChange={(event) => setSearchTerm(event.target.value)}
        />
      )}
    />
  );
};

//autre test from stack overflow:

// function searchTable(input, array) {
//   const results = [];
//   for (let i = 0; i < array.length; i++) {
//     for (const key in array[i]) {
//       const value = array[i][key].toString().toLowerCase();
//       console.log('value', value);
//       console.log('input', input);
//       if (
//         //typeof value === 'string' &&
//         value.includes(input)
//       ) {
//         results.push(array[i]);
//       }
//       break;
//     }
//   }
//   console.log('results', results);
//   return results;
// }

export const SearchBar2 = ({ options }) => {
  const [copyList, setCopyList] = useState(options);

  const requestSearch = (searched) => {
    setCopyList(options.filter((item) => item.name.includes(searched)));
  };

  return (
    <Autocomplete
      freeSolo
      disableClearable
      options={options}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Recherche"
          placeholder="search something"
          type="search"
          margin="normal"
          onInput={(event) => requestSearch(event.target.value)}
        />
      )}
    />
  );
};
