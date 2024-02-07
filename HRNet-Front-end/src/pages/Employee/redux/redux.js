import { configureStore, createSlice } from '@reduxjs/toolkit';
import { initialEmployeeList } from './initialReduxData';

//a slice of global state
const employeeSlice = createSlice({
  name: 'employee',
  initialState: initialEmployeeList,
  reducers: {
    addEmployee: (state, action) => {
      //{voici action: type: "employee/addEmployee", payload:"nouvel employee"}
      console.log('action', action);
      console.log('state', state);
      const newEmployee = {
        id: action.payload.id,
        birthDate: action.payload.birthDate,
        cityAddress: action.payload.cityAddress,
        department: action.payload.department,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        startDate: action.payload.startDate,
        stateAddress: action.payload.stateAddress,
        streetAddress: action.payload.streetAddress,
        zipCodeAddress: action.payload.zipCodeAddress,
      };
      state.push(newEmployee);
    },
  },
});

//global store
export const store = configureStore({
  reducer: {
    employee: employeeSlice.reducer,
  },
});

//actions creator
export const { addEmployee } = employeeSlice.actions;

//persist store
