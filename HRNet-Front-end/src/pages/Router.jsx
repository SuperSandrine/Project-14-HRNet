import { createHashRouter } from 'react-router-dom';

import Home from './Home/Home';
import Error from './Error/Error';
import Employee from './Employee/Employee';
import EmployeeList from './Employee/EmployeeList/EmployeeList';
import EmployeeCreate from './Employee/EmployeeCreate/EmployeeCreate';

// two way to code router:
export const router = createHashRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <Error />,
  },
  {
    path: '/employee',
    element: <Employee />,
    errorElement: <Error />,
    children: [
      {
        path: 'create',
        element: <EmployeeCreate />,
        errorElement: <Error />,
      },
      {
        path: 'list',
        element: <EmployeeList />,
        errorElement: <Error />,
      },
    ],
  },
]);
