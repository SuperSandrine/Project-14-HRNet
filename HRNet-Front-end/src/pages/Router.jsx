import { createHashRouter } from 'react-router-dom';

import Home from './Home/Home';
import Error from './Error/Error';
import Modales from './Modales/Modales';
import Employee from './Employee/Employee';
import EmployeeList from './Employee/EmployeeList/EmployeeList';
import EmployeeCreate from './Employee/EmployeeCreate/EmployeeCreate';

export const router = createHashRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <Error />,
  },
  {
    path: '/modales',
    element: <Modales />,
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
  {
    path: '/*',
    element: <Error />,
    errorElement: <Error />,
  },
]);
