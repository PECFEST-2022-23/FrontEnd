import React from 'react';
import styles from './ContactUs.module.css';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

function ContactUs() {
  return (
    <div className={styles.background}>
      <section className={styles.contact}>
        <Container className={styles.main_container}>
          <Grid className={styles.pageheader}>ContactUs</Grid>
          <Box className={styles.container}>
            <Grid container spacing={1} className={styles.contactInfo}>
              <Grid container item className={styles.box}>
                <div className={styles.icon}>
                  <a href="tel:+918146539939" target="_blank" rel="noreferrer">
                    <PhoneIcon className={styles.contactIcon} />
                  </a>
                </div>
                <div className={styles.text}>
                  <h3>Call us directly at:</h3>
                  <p>+91 81465 39939</p>
                </div>
              </Grid>
              <Grid container item className={styles.box}>
                <div className={styles.icon}>
                  <a
                    href="mailTo:convener.pecfest@pec.edu.in"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <EmailIcon className={styles.contactIcon} />
                  </a>
                </div>
                <div className={styles.text}>
                  <h3>Reach out via email at</h3>
                  <p>convener.pecfest@pec.edu.in</p>
                </div>
              </Grid>
            </Grid>
            <Grid container spacing={1} className={styles.contactInfo}>
              <Grid container item className={styles.box}>
                <div className={styles.icon}>
                  <a
                    href="https://goo.gl/maps/wEYQ7eW9UUmaj6pe8"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <LocationOnIcon className={styles.contactIcon} />
                  </a>
                </div>
                <div className={styles.text}>
                  <h3>Visit us at</h3>
                  <p>Punjab Engineering College, Sector 12, Chandigarh</p>
                </div>
              </Grid>
              <Grid container item className={styles.socialInfo}>
                Follow us:
                <Grid className={styles.social}>
                  <a
                    href="https://www.instagram.com/pec.pecfest/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <InstagramIcon
                      className={`${styles.instagram} ${styles.socialIcon}`}
                    />
                  </a>
                  <a
                    href="https://www.facebook.com/pecfestofficial/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <FacebookIcon
                      className={`${styles.facebook} ${styles.socialIcon}`}
                    />
                  </a>
                  <a
                    href="https://www.youtube.com/c/PECFESTOFFICIAL"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <YouTubeIcon
                      className={`${styles.youtube} ${styles.socialIcon}`}
                    />
                  </a>
                  <a
                    href="https://www.linkedin.com/company/pecfest/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <LinkedInIcon
                      className={`${styles.linkedin} ${styles.socialIcon}`}
                    />
                  </a>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </section>
    </div>
  );
}

export default ContactUs;
