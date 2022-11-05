import React, { useState } from 'react';
import styles from './Schedule.module.css';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ScheduleGrid from '../../Components/ScheduleGrid/scheduleGrid';

function Schedule(props) {
  const [alignment, setAlignment] = useState('ongoing');
  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };
  return (
    <div className={styles.background}>
      <Container className={styles.main_container}>
        <Box>
          <Grid className={styles.pageheader}>Schedule</Grid>
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
        {alignment == 'past' ? (
          <Box className={styles.eventlist}>
            {props.past.map((evt) => {
              return (
                <ScheduleGrid
                  key={evt.name}
                  id={evt.id}
                  name={evt.name}
                  date={evt.startdatetime}
                  venue={evt.venue}
                />
              );
            })}
          </Box>
        ) : (
          <Box className={styles.eventlist}></Box>
        )}
        {alignment == 'ongoing' ? (
          <Box className={styles.eventlist}>
            {props.ongoing.map((evt) => {
              return (
                <ScheduleGrid
                  key={evt.name}
                  id={evt.id}
                  name={evt.name}
                  date={evt.startdatetime}
                  venue={evt.venue}
                />
              );
            })}
          </Box>
        ) : (
          <Box className={styles.eventlist}></Box>
        )}
        {alignment == 'upcoming' ? (
          <Box className={styles.eventlist}>
            {props.upcoming.map((evt) => {
              return (
                <ScheduleGrid
                  key={evt.name}
                  id={evt.id}
                  name={evt.name}
                  date={evt.startdatetime}
                  venue={evt.venue}
                />
              );
            })}
          </Box>
        ) : (
          <Box className={styles.eventlist}></Box>
        )}
      </Container>
    </div>
  );
}
export async function getStaticProps() {
  const events = await fetch(
    process.env.NEXT_PUBLIC_BACKEND_API + 'events/'
  ).then((res) => res.json());
  const pastEvents = events.filter((evt) => {
    const enddate = new Date(evt.enddatetime);
    const presentdate = new Date(Date.now());
    return enddate < presentdate ? evt : null;
  });
  const upcomingEvents = events.filter((evt) => {
    const startdate = new Date(evt.startdatetime);
    const presentdate = new Date(Date.now());
    return startdate > presentdate ? evt : null;
  });
  const ongoingEvents = events.filter((evt) => {
    const startdate = new Date(evt.startdatetime);
    const enddate = new Date(evt.enddatetime);
    const presentdate = new Date(Date.now());
    return startdate < presentdate && presentdate < enddate ? evt : null;
  });
  return {
    props: {
      past: pastEvents,
      ongoing: ongoingEvents,
      upcoming: upcomingEvents,
    },
    revalidate: 100,
  };
}

export default Schedule;
