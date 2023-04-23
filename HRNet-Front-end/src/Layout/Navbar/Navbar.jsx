// import { NavLink } from 'react-router-dom';

// const Navbar = () => {
//   return (
//     <nav>
//       <NavLink to="/">Home</NavLink>
//       <NavLink to="/employee/create">Create employee</NavLink>
//       <NavLink to="/employee/list">Employee(s) list</NavLink>
//     </nav>
//   );
// };

// export default Navbar;

import * as React from 'react';
import { AppBar, Box, Toolbar, Button } from '@mui/material';
//import Box from '@mui/material/Box';
//import Toolbar from '@mui/material/Toolbar';
//import Button from '@mui/material/Button';
//import IconButton from '@material-ui/core/IconButton';
//import MenuIcon from '@material-ui/icons/Menu';
import { NavLink } from 'react-router-dom';

//TODO mettre un logo ou un titre HRNET
export default function Navbar() {
  return (
    <nav>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar style={{ justifyContent: 'flex-end' }}>
            {/* <IconButton
              size="medium"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            > */}
            {/* <MenuIcon /> */}
            {/* ceci est un style appliqué  */}
            {/* </IconButton> */}
            {/* si jamais on va ajouter un bouton avec un icon dedans */}
            <Button color="inherit" component={NavLink} to="/">
              Home
            </Button>
            <Button color="inherit" component={NavLink} to="/employee/create">
              Create Employee
            </Button>
            <Button color="inherit" component={NavLink} to="/employee/list">
              Employee List
              {/* TODO changer dynamiquement employee avec s ou pas en fonction du nombre d'employe dans le store */}
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
    </nav>
  );
}
