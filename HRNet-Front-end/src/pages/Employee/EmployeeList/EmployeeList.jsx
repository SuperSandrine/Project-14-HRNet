import { Box, Paper } from '@mui/material';
import EmployeeTable from '../../../components/EmployeeTable/EmployeeTable';

const EmployeeList = () => {
  return (
    <div>
      <h2>Current Employees</h2>
      <EmployeeTable />
    </div>
  );
};

export default EmployeeList;
