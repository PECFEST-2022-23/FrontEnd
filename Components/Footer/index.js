import React, { useState, useEffect } from 'react';
import InstagramIcon from '@mui/icons-material/Instagram';
import YoutubeIcon from '@mui/icons-material/YouTube';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import CallIcon from '@mui/icons-material/Call';
import MailIcon from '@mui/icons-material/Mail';
import styles from './Footer.module.css';

const Navbar = () => {
  return (
    <div className={styles.main}>
      <div className={styles.directions}>
        <div className={styles.directionsHeader}>How to reach?</div>
        <div className={styles.address}>
          <div>Punjab Engineering College</div>
          <div>Sector 12</div>
          <div>Chandigarh, 160012</div>
        </div>
        <div className={styles.icons}>
          <InstagramIcon />
          <YoutubeIcon />
          <FacebookIcon />
          <LinkedInIcon />
        </div>
      </div>
      <div className={styles.contact}>
        <div className={styles.contactHeader}>Contact Us</div>
        <div className={styles.contacts}>
          <CallIcon />
          <MailIcon />
        </div>
        <div className={styles.icons}></div>
      </div>
    </div>
  );
};

export default Navbar;
