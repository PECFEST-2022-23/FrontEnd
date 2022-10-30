import { Grid } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import styles from './eventList.module.css';
import EventListingCard from '../../Components/EventListingCard/EventListingCard';
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
    if (!router.isReady) return;
    if (
      router?.query.filter &&
      availableFilters.current.includes(router.query.filter.toLowerCase())
    )
      setFilters([router.query.filter]);
  }, [router.isReady, router?.query.filter, availableFilters]);
  useEffect(() => {
    setEvents([
      { eventType: 'workshops', id: '1' },
      { eventType: 'megashows', id: '2' },
      { eventType: 'megashows', id: '3' },
      { eventType: 'cultural', id: '4' },
      { eventType: 'cultural', id: '5' },
      { eventType: 'cultural', id: '6' },
      { eventType: 'technical', id: '7' },
      { eventType: 'technical', id: '8' },
      { eventType: 'technical', id: '9' },
      { eventType: 'technical', id: '10' },
    ]);
  }, []);
  const filterChangeHandler = (event) => {
    const {
      target: { value },
    } = event;
    setFilters(typeof value === 'string' ? value.split(',') : value);
  };

  const applyFilters = (event) => {
    return filters.includes(event.eventType.toLowerCase());
  };
  return (
    <div>
      <h2 className={styles.mainHeading}>EVENT LIST</h2>
      <div style={{ width: '100%', textAlign: 'center' }}>
        <Filters
          filters={filters}
          availableFilters={availableFilters}
          filterChangeHandler={filterChangeHandler}
        />
      </div>
      <Grid
        container
        columns={11}
        rowSpacing={6}
        columnSpacing={4}
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        {events.filter(applyFilters).map((event, id) => (
          <EventListingCard
            id={event.id}
            key={id}
            eventType={event.eventType}
          />
        ))}
      </Grid>
    </div>
  );
};

export default MegaShowEvent;
