import Navbar from './Navbar/Navbar';
import Footer from './Footer/Footer';
import { Container } from '@mui/material';
import { MainStyled } from './RootLayout.styled';

const RootLayout = ({ children }) => {
  return (
    <Container
      maxWidth="lg"
      sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}
    >
      <header>
        <Navbar />
      </header>
      <MainStyled>
        <h1>HRnet</h1>
        {children}
      </MainStyled>
      <Footer />
    </Container>
  );
};

export default RootLayout;
