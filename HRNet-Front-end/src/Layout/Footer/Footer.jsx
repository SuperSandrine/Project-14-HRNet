import { Typography } from '@mui/material';
import { FooterStyled } from '../RootLayout.styled';

const Footer = () => {
  return (
    <FooterStyled>
      <Typography variant="body2" gutterBottom>
        Tous droits réservés © Wealth Health 2023
      </Typography>
    </FooterStyled>
  );
};

export default Footer;
