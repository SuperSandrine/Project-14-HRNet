// mettre en place un redux

import { Box, Paper } from '@mui/material';
import EmployeeForm from '../../../components/EmployeeForm/EmployeeForm';

// mettre en place des validations de formulaires ou se renseigner sur les bonne praitques
const EmployeeCreate = () => {
  return (
    <>
      <h2>Create Employee</h2>
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
          <EmployeeForm />
        </Paper>
      </Box>
    </>
    // <div>
    //   <h1>Create Employee page</h1>

    //   <div className="container">
    //     <a href="employee-list.html">View Current Employees</a>
    //     <h2>Create Employee</h2>
    //     <form action="#" id="create-employee">
    //       <label htmlFor="first-name">First Name</label>
    //       <input type="text" id="first-name" />

    //       <label htmlFor="last-name">Last Name</label>
    //       <input type="text" id="last-name" />

    //       <label htmlFor="date-of-birth">Date of Birth</label>
    //       <input id="date-of-birth" type="text" />

    //       <label htmlFor="start-date">Start Date</label>
    //       <input id="start-date" type="text" />

    //       <fieldset className="address">
    //         <legend>Address</legend>

    //         <label htmlFor="street">Street</label>
    //         <input id="street" type="text" />

    //         <label htmlFor="city">City</label>
    //         <input id="city" type="text" />

    //         <label htmlFor="state">State</label>
    //         <select name="state" id="state"></select>

    //         <label htmlFor="zip-code">Zip Code</label>
    //         <input id="zip-code" type="number" />
    //       </fieldset>

    //       <label htmlFor="department">Department</label>
    //       <select name="department" id="department">
    //         <option>Sales</option>
    //         <option>Marketing</option>
    //         <option>Engineering</option>
    //         <option>Human Resources</option>
    //         <option>Legal</option>
    //       </select>
    //     </form>
    //     <button>Save</button>
    //   </div>
    //   <div id="confirmation" className="modal">
    //     Employee Created!
    //   </div>
    // </div>
  );
};

export default EmployeeCreate;
