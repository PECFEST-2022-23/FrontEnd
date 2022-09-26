import React, { useState } from 'react';
import styles from './ContactUs.module.css';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
// import TeamMemberCard from '../../Components/TeamTiles/TeamMemberCard';

function ContactUs() {
  const initialState = {
    name: '',
    message: '',
    query: '',
    email: '',
  };
  const [queryobject, setqueryobject] = useState(initialState);
  const [validQueryType, setValidQueryType] = useState(true);
  const queries = [
    {
      value: 'General Feedback',
      label: 'General Feedback',
    },
    {
      value: 'Registration Query',
      label: 'Registration Query',
    },
    {
      value: 'Competition Query',
      label: 'Competition Query',
    },
    {
      value: 'Website Bug',
      label: 'Website Bug',
    },
    {
      value: 'Other',
      label: 'Other',
    },
  ];

  const handleChange = (e) => {
    setqueryobject({ ...queryobject, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (queryobject.query === '') {
      setValidQueryType(false);
      return;
    } else {
      setValidQueryType(true);
    }
  };

  return (
    <section className={styles.contact}>
      <Container
        className={`d-flex flex-column overflow-hidden ${styles.main_container}`}
      >
        <Box className={`d-flex flex-column flex-grow-1`}>
          <Grid
            className={`d-flex justify-content-center ${styles.pageheader}`}
          >
            ContactUs
          </Grid>
        </Box>
        <Box className={styles.container}>
          <Grid container spacing={1} className={styles.contactInfo}>
            <Grid container item className={styles.box}>
              <div className={styles.icon}>
                <a href="tel:+91-6283730175" target="_blank" rel="noreferrer">
                  <PhoneIcon className={styles.contactIcon} />
                </a>
              </div>
              <div className={styles.text}>
                <h3>Call us directly at:</h3>
                <p></p>
              </div>
            </Grid>
            <Grid container item className={styles.box}>
              <div className={styles.icon}>
                <a
                  href="mailTo:pecfest2022.webmaster@gmail.com"
                  target="_blank"
                  rel="noreferrer"
                >
                  <EmailIcon className={styles.contactIcon} />
                </a>
              </div>
              <div className={styles.text}>
                <h3>Reach out via email at</h3>
                <p></p>
              </div>
            </Grid>
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
          <Grid className={styles.contactForm}>
            <h2>Send Message</h2>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <Grid item xs={12} sm={6} className={styles.inputBox}>
                <TextField
                  required
                  fullWidth
                  id="name"
                  label="Full Name"
                  name="name"
                  value={queryobject.name}
                  onChange={handleChange}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6} className={styles.inputBox}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  value={queryobject.email}
                  onChange={handleChange}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6} className={styles.inputBox}>
                <TextField
                  fullWidth
                  id="query"
                  select
                  label="Select Query Type"
                  name="query"
                  value={queryobject.query}
                  onChange={handleChange}
                >
                  {queries.map((query) => (
                    <MenuItem key={query.value} value={query.value}>
                      {query.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6} className={styles.inputBox}>
                <TextField
                  fullWidth
                  id="message"
                  label="Type your message"
                  name="message"
                  value={queryobject.message}
                  onChange={handleChange}
                  multiline
                  rows={2}
                />
              </Grid>
              <Grid item xs={12} sm={6} className={styles.inputButtonBox}>
                <Button variant="contained" type="submit">
                  Submit
                </Button>
              </Grid>
            </Box>
          </Grid>
        </Box>
      </Container>
    </section>
  );
}

export default ContactUs;
