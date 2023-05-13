import { Outlet } from 'react-router-dom';
import { Provider } from 'react-redux';
import RootLayout from '../../Layout/RootLayout';
import { store } from '../../redux/redux';

const Employee = () => {
  return (
    <Provider store={store}>
      <RootLayout>
        <Outlet />
      </RootLayout>
    </Provider>
  );
};

export default Employee;
