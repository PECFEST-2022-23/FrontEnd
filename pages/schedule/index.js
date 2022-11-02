import React, { useState } from 'react';
import styles from './Schedule.module.css';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import GradientBackground from '../../components/Backgrounds/GradientBackground';
import { Button } from '@mui/material';
import Image from 'next/image';

function Schedule() {
  const [alignment, setAlignment] = useState('ongoing');

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };
  return (
    <section className={`${styles.schedule} ${styles.background}`}>
      <Container
        className={`d-flex flex-column overflow-hidden ${styles.main_container}`}
      >
        <Box className={`d-flex flex-column flex-grow-1`}>
          <Grid
            className={`d-flex justify-content-center ${styles.pageheader}`}
          >
            Schedule
          </Grid>
        </Box>
        <Box className={styles.tabs}>
          <ToggleButtonGroup
            color="primary"
            value={alignment}
            exclusive
            onChange={handleChange}
            aria-label="Platform"
          >
            <ToggleButton value="past">Past Events</ToggleButton>
            <ToggleButton value="ongoing">Ongoing Events</ToggleButton>
            <ToggleButton value="upcoming">Upcoming Events</ToggleButton>
          </ToggleButtonGroup>
        </Box>
        <Box className={styles.eventlist}>
          <Grid container className={styles.eventheader}>
            <Grid container item md={3} className={styles.eventobject}>
              Event Name
            </Grid>
            <Grid container item md={2} className={styles.eventobject}>
              Date
            </Grid>
            <Grid container item md={2} className={styles.eventobject}>
              Time
            </Grid>
            <Grid container item md={3} className={styles.eventobject}>
              Venue
            </Grid>
          </Grid>
        </Box>
        {alignment == 'ongoing' || alignment == 'upcoming' ? (
          <Box className={styles.eventlist}>
            <Grid container className={styles.event}>
              <Grid container item md={3} className={styles.eventobject}>
                Gaaneyan Guneyan ch ki rkheya
              </Grid>
              <Grid container item md={2} className={styles.eventobject}>
                26 november
              </Grid>
              <Grid container item md={2} className={styles.eventobject}>
                3:00 pm
              </Grid>
              <Grid container item md={3} className={styles.eventobject}>
                L-27
              </Grid>
              <Grid container item md={2} className={styles.eventobject}>
                <Button>Register</Button>
              </Grid>
            </Grid>
          </Box>
        ) : (
          <Box className={styles.eventlist}></Box>
        )}
        <Box className={styles.scheduleimage}>
          <Image src="" alt="Puneet" width={1200} height={700}></Image>
        </Box>
      </Container>
    </section>
  );
}

export default Schedule;
