import * as React from 'react';
import { NavLink } from 'react-router-dom';
//lib
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
//img
import MenuIcon from '@mui/icons-material/Menu';

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="fixed">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: 'flex', sm: 'none' },
              justifyContent: { xs: 'flex-end' },
            }}
          >
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
                display: { xs: 'block', sm: 'none' },
              }}
            >
              <MenuItem onClick={handleCloseNavMenu}>
                <Button color="inherit" component={NavLink} to="/">
                  Home
                </Button>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Button color="inherit" component={NavLink} to="/modales">
                  Modales
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
              display: { xs: 'none', sm: 'flex' },
              justifyContent: 'flex-end',
              paddingRight: '7vw',
            }}
          >
            <Button color="inherit" component={NavLink} to="/">
              Home
            </Button>
            <Button color="inherit" component={NavLink} to="/modales">
              Modales
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
