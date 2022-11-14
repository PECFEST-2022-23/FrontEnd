import { Grid, TextField, Container } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import styles from './eventList.module.css';
import EventListingCard from '../../Components/EventListingCard/EventListingCard';
import { useRouter } from 'next/router';
import Filters from '../../Components/Filters/Filter';
import Head from 'next/head';

const MegaShowEvent = (props) => {
  const router = useRouter();

  const {
    query: { typeOfEvent },
  } = router;

  const [events, setEvents] = useState([]);
  const [allEvents, setAllEvents] = useState([]);
  const [allFilters, setAllFilters] = useState([]);
  const [allSubFilters, setAllSubFilters] = useState([]);
  const [filters, setFilters] = useState([]);
  const [subFilters, setSubFilters] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (!props.error && props.evts && props.evts.length) {
      setAllEvents(props.evts);
      setEvents(props.evts);
      const filtersAvailable = [];
      const subFiltersAvailable = [];

      filtersAvailable.push("TECHNICAL");
      filtersAvailable.push("CULTURAL");
      filtersAvailable.push("WORKSHOPS");
      filtersAvailable.push("MEGASHOWS");
      
      props.evts.forEach((evt) => {
        filtersAvailable.push(evt.category.toUpperCase());
        filtersAvailable.push(evt.type.toUpperCase());
        subFiltersAvailable.push(evt.subcategory.toUpperCase());
      });


      setAllFilters([...new Set(filtersAvailable)]);
      setAllSubFilters([...new Set(subFiltersAvailable)]);

      selectFilters(typeOfEvent);
    }
  }, []);

  const filterPass = (event) => {
    return (
      filters.includes(event.category.toUpperCase()) ||
      subFilters.includes(event.subcategory.toUpperCase()) ||
      filters.includes(event.type.toUpperCase()) ||
      filters.includes(event.club_name.toUpperCase())
    );
  };

  const selectFilters = (filterVal) => {
    if (filterVal == undefined) return;
    const selectedFilters = filters;
    selectedFilters.push(filterVal);

    setFilters([...new Set(selectedFilters)]);

    if (filters.length || subFilters.length) {
      const filteredEvents = [];
      props.evts.forEach((evt) => {
        if (filterPass(evt)) {
          filteredEvents.push(evt);
        }
      });

      setEvents(filteredEvents);
    } else {
      setEvents(allEvents);
    }
  };

  const deselectFilters = (filterVal) => {
    if (filterVal == undefined) return;
    const selectedFilters = filters;
    selectedFilters.splice(selectedFilters.indexOf(filterVal), 1);
    setFilters([...new Set(selectedFilters)]);

    if (filters.length || subFilters.length) {
      const filteredEvents = [];

      props.evts.forEach((evt) => {
        if (filterPass(evt)) filteredEvents.push(evt);
      });

      setEvents(filteredEvents);
    } else {
      setEvents(allEvents);
    }
  };

  const selectSubFilters = (filterVal) => {
    if (filterVal == undefined) return;
    const selectedFilters = subFilters;
    selectedFilters.push(filterVal);
    setSubFilters([...new Set(selectedFilters)]);

    if (filters.length || subFilters.length) {
      const filteredEvents = [];

      props.evts.forEach((evt) => {
        if (filterPass(evt)) filteredEvents.push(evt);
      });

      setEvents(filteredEvents);
    } else {
      setEvents(allEvents);
    }
  };

  const deselectSubFilters = (filterVal) => {
    if (filterVal == undefined) return;
    const selectedFilters = subFilters;
    selectedFilters.splice(selectedFilters.indexOf(filterVal), 1);
    setSubFilters([...new Set(selectedFilters)]);

    if (filters.length || subFilters.length) {
      const filteredEvents = [];

      props.evts.forEach((evt) => {
        if (filterPass(evt)) filteredEvents.push(evt);
      });

      setEvents(filteredEvents);
    } else {
      setEvents(allEvents);
    }
  };

  const inputHandler = (e) => {
    var upperCase = e.target.value.toUpperCase();
    setSearchQuery(upperCase);
  };

  const searchFilterFunction = (el) => {
    //if no input the return the original
    if (props.input === '') {
      return el;
    }
    //return the item which contains the user input
    else {
      const corpus = `${el.name} ${el.description}`;
      return corpus.toUpperCase().includes(searchQuery);
    }
  };

  if (props.error) {
    const statusCode = props.status ? props.status : '500';

    return (
      <div className={styles.background}>
        <Head>
          <title>Events</title>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>
        <Grid container>
          <Grid item xs={12} mt={4} mb={2} justifyContent="center">
            <h2 className={styles.mainHeading}>EVENTS</h2>
          </Grid>
        </Grid>
        <Container fluid className={styles.main_container} maxWidth={false}>
          <Grid container>
            <Grid item xs={12} md={3}>
              <div className={styles.search}>
                <TextField
                  style={{ width: '90%' }}
                  sx={{
                    input: { color: 'white' },
                  }}
                  InputLabelProps={{
                    style: { color: 'white' },
                    underline: { color: 'white' },
                  }}
                  id="filled-primary"
                  label="Search Here ..."
                  variant="filled"
                  onChange={inputHandler}
                />
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
                  <h2 className={styles.mainHeading}>
                    {'Server Error :- ' + statusCode}
                  </h2>
                </Grid>
              </div>
            </Grid>
          </Grid>
        </Container>
      </div>
    );
  }

  let heading;

  if (
    !typeOfEvent ||
    typeOfEvent == undefined ||
    typeOfEvent == 'WORKSHOPS' ||
    typeOfEvent == 'MEGASHOWS'
  ) {
    heading = 'Events';
  } else {
    heading = 'Competitions';
  }

  return (
    <div className={styles.background}>
      <Head>
        <title>Events</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Grid container>
        <Grid item xs={12} mt={4} mb={2} justifyContent="center">
          <h2 className={styles.mainHeading}>{heading}</h2>
        </Grid>
      </Grid>
      <Container fluid className={styles.main_container} maxWidth={false}>
        <Grid container>
          <Grid item xs={12} md={3}>
            <div className={styles.search}>
              <TextField
                style={{ width: '90%' }}
                sx={{
                  input: { color: 'white' },
                }}
                InputLabelProps={{
                  style: { color: 'white' },
                  underline: { color: 'white' },
                }}
                id="filled-primary"
                label="Search Here ..."
                variant="filled"
                onChange={inputHandler}
              />
            </div>
            <div style={{ textAlign: 'center', marginBottom: 40 }}>
              {allFilters.map((filter, id) => (
                <Filters
                  key={filter}
                  filterValue={filter}
                  onSelectFilters={selectFilters}
                  onDeSelectFilters={deselectFilters}
                  color={'primary'}
                  eventType={typeOfEvent}
                />
              ))}
              {allSubFilters.map((filter, id) => (
                <Filters
                  key={filter}
                  filterValue={filter}
                  onSelectFilters={selectSubFilters}
                  onDeSelectFilters={deselectSubFilters}
                  color={'primary'}
                  eventType={typeOfEvent}
                />
              ))}
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
                {events.filter(searchFilterFunction).map((event, id) => (
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
      </Container>
    </div>
  );
};

export async function getStaticProps(context) {
  const res = await fetch(process.env.NEXT_PUBLIC_BACKEND_API + 'events/');
  if (!res || res.status != 200) {
    return {
      props: {
        status: res.status,
        error: true,
      },
      revalidate: 100,
    };
  }
  const events = await res.json();
  return {
    props: {
      evts: events,
      status: res.status,
      error: false,
    },
    revalidate: 100,
  };
}

export default MegaShowEvent;
