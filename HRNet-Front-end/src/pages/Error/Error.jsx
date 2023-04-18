import { Link } from 'react-router-dom';
import { useRouteError } from 'react-router-dom';
import RootLayout from '../../components/Layout/RootLayout';

const Error = () => {
  const error = useRouteError();
  console.error(error);
  return (
    <RootLayout>
      <h1>Welcome on Error Page </h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <i>{error.statusText || error.message}</i>
      <br />
      <Link to="/">Back home</Link>
    </RootLayout>
  );
};

export default Error;
