import { Outlet } from 'react-router-dom';
import RootLayout from '../../Layout/RootLayout';

const Employee = () => {
  return (
    <RootLayout>
      <Outlet />
    </RootLayout>
  );
};

export default Employee;
