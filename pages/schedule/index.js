import React, { useState } from 'react';
import Head from 'next/head';
import styles from './Schedule.module.css';
import Container from '@mui/material/Container';
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
      <Head>
        <title>Pecfest 2022|Schedule</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Container className={styles.main_container}>
        <div className={styles.pageheader}>Schedule</div>
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
                  type={evt.type}
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
                  type={evt.type}
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
                  type={evt.type}
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
  events.sort(function (e1, e2) {
    if (new Date(e1.startdatetime) > new Date(e2.startdatetime)) return 1;
    if (new Date(e1.startdatetime) < new Date(e2.startdatetime)) return -1;
    return 0;
  });
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
