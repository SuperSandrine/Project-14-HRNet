import Footer from './Footer/Footer';
import { Container } from '@mui/material';
import { MainStyled } from './RootLayout.styled';
import ResponsiveAppBar from './Navbar/Navbar';

const RootLayout = ({ children }) => {
  return (
    <Container
      maxWidth="lg"
      sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}
    >
      <ResponsiveAppBar />
      <MainStyled>
        <h1>HRnet</h1>
        {children}
      </MainStyled>
      <Footer />
    </Container>
  );
};

export default RootLayout;
