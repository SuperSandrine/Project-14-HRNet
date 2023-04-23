import Navbar from './Navbar/Navbar';
import Footer from './Footer/Footer';
import { Container } from '@mui/material';

const RootLayout = ({ children }) => {
  return (
    <Container maxWidth="lg">
      <header>
        <Navbar />
      </header>
      <main>
        <h1>HRnet</h1>
        {children}
      </main>
      <Footer />
    </Container>
  );
};

export default RootLayout;
