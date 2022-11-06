import styles from './Navbar.module.css';
import pecfest from '../../public/PECFEST_Logo_Small.png';
import React, { useState, useEffect } from 'react';
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
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import MenuIcon from '@mui/icons-material/Menu';
import Menu, { MenuProps } from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Image from 'next/image';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import NavData from './links.json';
import Link from 'next/link';
import { decrypt } from '../../lib/auth/enctryption';
import Cookies from 'universal-cookie';
import logout from '../../lib/auth/logout';
import { useRouter } from 'next/router';
import { useSession } from "next-auth/react";
import getCookieData from '../../lib/auth/getCookieData';

const drawerWidth = 240;
const navItemsOne = NavData.slice(0, NavData.length / 2);
const navItemsTwo = NavData.slice(NavData.length / 2);

const Navbar = (props) => {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [open, setOpen] = useState(true);
  const router = useRouter();
  // For Dropdown
  const [anchorEl, setAnchorEl] = useState(null);
  const [dropDownOpen, setDropDownOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const [user, setUser] = useState(null);
  const { data: session } = useSession();

  const cookies = new Cookies();
  useEffect(() => {
    const { data } = getCookieData(session);
    console.log(data);
    // const user = JSON.parse(decrypt(cookies.get('user')));
    // setUser(() => user);
    if(data)  setUser(() => data.user);
  }, []);

  const handleAboutClick = (event) => {
    setAnchorEl(event.currentTarget);
    setDropDownOpen(true);
  };
  const handleAboutClose = () => {
    setAnchorEl(null);
    setDropDownOpen(false);
  };

  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
    setProfileOpen(true);
  };

  const handleProfileClose = () => {
    setAnchorEl(null);
    setProfileOpen(false);
  };

  const handleLogout = () => {
    handleProfileClose();
    logout(router, session);
  };

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
            <div key={item.name}>
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
            </div>
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
            <div key={item.name}>
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
            </div>
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
      {/* <Button>Enter</Button> */}
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
                <div key={item.name} className={styles.dropdown_div}>
                  <Button
                    key={item.name}
                    sx={{ color: '#fff' }}
                    disableElevation
                    onClick={handleAboutClick}
                    disableRipple
                    endIcon={<KeyboardArrowDownIcon />}
                    className={styles.dropdown_btn}
                  >
                    {item.name}
                  </Button>
                  <Menu
                    id="navbar-about-menu"
                    anchorEl={anchorEl}
                    open={dropDownOpen}
                    onClose={handleAboutClose}
                  >
                    {item.children.map((child) => (
                      <MenuItem
                        key={child.name}
                        onClick={handleAboutClose}
                        disableRipple
                      >
                        <Link href={child.link}>{child.name}</Link>
                      </MenuItem>
                    ))}
                  </Menu>
                </div>
              ) : (
                <Button key={item.name} sx={{ color: '#fff' }}>
                  <Link href={`/${item.link}`}>{item.name}</Link>
                </Button>
              )
            )}
            {user ? (
              <div>
                <Button
                  className={styles.enter_btn}
                  variant="filled"
                  disableRipple
                  onClick={handleProfileClick}
                >
                  {user.first_name}
                </Button>
                <Menu
                  id="navbar-about-menu"
                  anchorEl={anchorEl}
                  open={profileOpen}
                  onClose={handleProfileClose}
                >
                  <MenuItem onClick={handleProfileClose} disableRipple>
                    <Link href={`/profile`}>Profile</Link>
                  </MenuItem>
                  <MenuItem onClick={handleLogout} disableRipple>
                    Log Out
                  </MenuItem>
                </Menu>
              </div>
            ) : (
              <Button className={styles.enter_btn} variant="filled">
                <Link href={`/login`}>Log In</Link>
              </Button>
            )}
          </Box>
          {user ? (
            <div>
              <Button
                className={styles.enter_btn_mobile}
                variant="filled"
                disableRipple
                onClick={handleProfileClick}
              >
                {user.first_name}
              </Button>
              <Menu
                id="navbar-about-menu"
                anchorEl={anchorEl}
                open={profileOpen}
                onClose={handleProfileClose}
              >
                <MenuItem onClick={handleProfileClose} disableRipple>
                  <Link href={`/profile`}>Profile</Link>
                </MenuItem>
                <MenuItem onClick={handleLogout} disableRipple>
                  Log Out
                </MenuItem>
              </Menu>
            </div>
          ) : (
            <Button className={styles.enter_btn_mobile} variant="filled">
              <Link href={`/login`}>Log In</Link>
            </Button>
          )}
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
      </Box>
      <Box component="main" sx={{ p: 3 }}>
        <Toolbar />
      </Box>
    </Box>
  );
};

export default Navbar;
