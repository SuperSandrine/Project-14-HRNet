import * as React from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Menu,
  Container,
  Button,
  MenuItem,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { NavLink } from 'react-router-dom';

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              <MenuItem onClick={handleCloseNavMenu}>
                <Button color="inherit" component={NavLink} to="/">
                  Home
                </Button>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Button
                  color="inherit"
                  component={NavLink}
                  to="/employee/create"
                >
                  Create Employee
                </Button>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Button color="inherit" component={NavLink} to="/employee/list">
                  Employee List
                </Button>
              </MenuItem>
            </Menu>
          </Box>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: 'none', md: 'flex' },
              justifyContent: 'flex-end',
            }}
          >
            <Button color="inherit" component={NavLink} to="/">
              Home
            </Button>
            <Button color="inherit" component={NavLink} to="/employee/create">
              Create Employee
            </Button>
            <Button color="inherit" component={NavLink} to="/employee/list">
              Employee List
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;

// import * as React from 'react';
// import { AppBar, Box, Toolbar, Button } from '@mui/material';
// import { NavLink } from 'react-router-dom';

// //TODO mettre un logo ou un titre HRNET
// export default function Navbar() {
//   return (
//     <nav>
//       <Box sx={{ flexGrow: 1 }}>
//         <AppBar position="static">
//           <Toolbar style={{ justifyContent: 'flex-end' }}>
//             {/* <IconButton
//               size="medium"
//               edge="start"
//               color="inherit"
//               aria-label="menu"
//               sx={{ mr: 2 }}
//             > */}
//             {/* <MenuIcon /> */}
//             {/* ceci est un style appliqué  */}
//             {/* </IconButton> */}
//             {/* si jamais on va ajouter un bouton avec un icon dedans */}
//             <Button color="inherit" component={NavLink} to="/">
//               Home
//             </Button>
//             <Button color="inherit" component={NavLink} to="/employee/create">
//               Create Employee
//             </Button>
//             <Button color="inherit" component={NavLink} to="/employee/list">
//               Employee List
//               {/* TODO changer dynamiquement employee avec s ou pas en fonction du nombre d'employe dans le store */}
//             </Button>
//           </Toolbar>
//         </AppBar>
//       </Box>
//     </nav>
//   );
// }
