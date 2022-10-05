import styles from './Navbar.module.css';
import pecfest from '../../public/PECFEST_Logo_Small.png';
import React, { useState } from 'react';
import Collapse from '@mui/material/Collapse';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Image from 'next/image';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import NavData from './links.json';
import Link from 'next/link';

const drawerWidth = 240;
const navItemsOne = NavData.slice(0, NavData.length / 2);
const navItemsTwo = NavData.slice(NavData.length / 2);

const Navbar = (props) => {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [open, setOpen] = useState(true);

  const handleClick = () => {
    setOpen(!open);
    setMobileOpen(true);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 20,
  });

  const drawer = (
    <Box
      className={styles.navbar_drawer}
      onClick={handleDrawerToggle}
      sx={{ textAlign: 'center' }}
    >
      <Link href={`/`}>
        <Image className={styles.menu_logo} src={pecfest} alt="PECFEST-Logo" />
      </Link>
      <Divider />
      <List>
        {navItemsOne.map((item) =>
          item.children ? (
            <>
              <ListItemButton onClick={handleClick}>
                <ListItemText primary={item.name} />
                {open ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse
                className={styles.navbar_collapse}
                in
                timeout="auto"
                unmountOnExit
              >
                {item.children.map((child) => (
                  <List key={child.name} component="div" disablePadding>
                    <Link href={`/${child.link}`}>
                      <ListItemButton sx={{ pl: 4 }}>
                        <ListItemText primary={child.name} />
                      </ListItemButton>
                    </Link>
                  </List>
                ))}
              </Collapse>
            </>
          ) : (
            <ListItem key={item.name} disablePadding>
              <Link href={`/${item.link}`}>
                <ListItemButton sx={{ textAlign: 'center' }}>
                  <ListItemText primary={item.name} />
                </ListItemButton>
              </Link>
            </ListItem>
          )
        )}
      </List>
      <Divider />
      <List>
        {navItemsTwo.map((item) =>
          item.children ? (
            <>
              <ListItemButton onClick={handleClick}>
                <ListItemText primary={item.name} />
                {open ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={open} timeout="auto" unmountOnExit>
                {item.children.map((child) => (
                  <List key={child.name} component="div" disablePadding>
                    <Link href={`/${child.link}`}>
                      <ListItemButton sx={{ pl: 4 }}>
                        <ListItemText primary={child.name} />
                      </ListItemButton>
                    </Link>
                  </List>
                ))}
              </Collapse>
            </>
          ) : (
            <ListItem key={item.name} disablePadding>
              <Link href={`/${item.link}`}>
                <ListItemButton sx={{ textAlign: 'center' }}>
                  <ListItemText primary={item.name} />
                </ListItemButton>
              </Link>
            </ListItem>
          )
        )}
      </List>
      <Divider />
      <Button>Register / Log In</Button>
      <Divider />
      <ListItem>
        <Link href={`/ambassador`}>
          <ListItemButton sx={{ textAlign: 'center' }}>
            <ListItemText primary={'Campus Ambassador'} />
          </ListItemButton>
        </Link>
      </ListItem>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box className={styles.appbar_box} sx={{ display: 'flex' }}>
      <AppBar component="nav" className={styles.appbar}>
        <Toolbar className={styles.toolbar}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Box
            className={styles.toolbar_box}
            sx={{ display: { xs: 'none', sm: 'none' } }}
          >
            {navItemsOne.map((item) => (
              <Button key={item.name} sx={{ color: '#fff' }}>
                <Link href={`/${item.link}`}>{item.name}</Link>
              </Button>
            ))}
          </Box>
          <Link href="/">
            <Image
              className={
                trigger ? styles.navbar_logo_shrunk : styles.navbar_logo
              }
              src={pecfest}
              alt="PECFEST-Logo"
            />
          </Link>
          <Box
            className={styles.toolbar_box}
            sx={{ display: { xs: 'none', sm: 'none' } }}
          >
            {navItemsTwo.map((item) =>
              item.children ? (
                <Button key={item.name} sx={{ color: '#fff' }}>
                  {item.name}
                </Button>
              ) : (
                <Button key={item.name} sx={{ color: '#fff' }}>
                  <Link href={`/${item.link}`}>{item.name}</Link>
                </Button>
              )
            )}
            <Button>
              <Link href={`/login`}>Register / Log In</Link>
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      {/* For mobile */}
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Button>
          <Link href={`/login`}>Register / Log In</Link>
        </Button>
      </Box>
      <Box component="main" sx={{ p: 3 }}>
        <Toolbar />
      </Box>
    </Box>
  );
};

export default Navbar;
