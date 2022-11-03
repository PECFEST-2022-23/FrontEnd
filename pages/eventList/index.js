import { Grid, TextField } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import styles from './eventList.module.css';
import EventListingCard from '../../Components/EventListingCard/EventListingCard';
import Box from '@mui/material/Box';
import { useRouter } from 'next/router';
import Filters from '../../Components/Filters/Filter';

const MegaShowEvent = (props) => {
  const [events, setEvents] = useState([]);
  const [filters, setFilters] = useState([]);
  const router = useRouter();
  const availableFilters = useRef([
    'megashows',
    'workshops',
    'technical',
    'cultural',
  ]);

  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_BACKEND_API + 'events')
      .then(
        (response) => {
          if (response.ok) {
            return response;
          } else {
            var error = new Error(
              'Error ' + response.status + ': ' + response.statusText
            );
            error.response = response;
            throw error;
          }
        },
        (error) => {
          var errmess = new Error(error.message);
          throw errmess;
        }
      )
      .then((response) => response.json())
      .then((evts) => setEvents(evts))
      .catch((error) => console.log(error.message));
  }, []);

  return (
    <div className={styles.background}>
      <Grid container>
        <Grid item xs={10} mt={4} mb={2} justifyContent="center">
          <h2 className={styles.mainHeading}>EVENT LIST</h2>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12} md={3}>
          <div className={styles.search}>
            <TextField
              style={{ width: '80%' }}
              sx={{
                input: { color: 'white' },
              }}
              InputLabelProps={{
                style: { color: '#f1a661' },
                underline: { color: 'white' },
              }}
              id="filled-primary"
              label="Search"
              variant="filled"
              color="secondary"
            />
          </div>
          <div style={{ textAlign: 'center' }}>
            <Filters />
          </div>
        </Grid>
        <Grid item xs={12} md={8} mr={1}>
          <div className={styles.eventCards}>
            <Grid
              container
              columns={12}
              columnSpacing={2}
              direction="row"
              justifyContent="center"
              alignItems="center"
            >
              {events.map((event, id) => (
                <EventListingCard
                  id={event.id}
                  key={id}
                  eventType={event.type}
                  eventDetails={event}
                />
              ))}
            </Grid>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default MegaShowEvent;
