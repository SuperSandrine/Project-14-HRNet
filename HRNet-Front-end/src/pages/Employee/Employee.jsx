import { Outlet } from 'react-router-dom';
import RootLayout from '../../components/Layout/RootLayout';

const Employee = () => {
  return (
    <RootLayout>
      <h1>Employee</h1>
      <Outlet />
    </RootLayout>
  );
};

export default Employee;
