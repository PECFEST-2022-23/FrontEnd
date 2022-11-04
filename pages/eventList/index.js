import { Grid, TextField, Container } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import styles from './eventList.module.css';
import EventListingCard from '../../Components/EventListingCard/EventListingCard';
import Box from '@mui/material/Box';
import { useRouter } from 'next/router';
import Filters from '../../Components/Filters/Filter';

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
      .then((evts) => {
        setAllEvents(evts);
        setEvents(evts);
        const filtersAvailable = [];
        const subFiltersAvailable = [];
        evts.forEach((evt) => {
          filtersAvailable.push(evt.type);
          subFiltersAvailable.push(evt.subtype);
        });

        setAllFilters([...new Set(filtersAvailable)]);
        setAllSubFilters([...new Set(subFiltersAvailable)]);

        selectFilters(typeOfEvent);

        return filtersAvailable;
      })
      .catch((error) => console.log(error.message));
  }, []);

  const filterPass = (event) => {
    return (
      filters.includes(event.type.toUpperCase()) ||
      subFilters.includes(event.subtype.toUpperCase())
    );
  };

  const selectFilters = (filterVal) => {
    let selectedFilters = filters;
    selectedFilters.push(filterVal);
    setFilters(selectedFilters);

    console.log(filters);
    console.log(subFilters);

    let filteredEvents = [];

    allEvents.forEach((evt) => {
      console.log(filterPass(evt));
      if (filterPass(evt)) filteredEvents.push(evt);
    });

    setEvents(filteredEvents);
  };

  const deselectFilters = (filterVal) => {
    let selectedFilters = filters;
    selectedFilters.splice(selectedFilters.indexOf(filterVal), 1);
    setFilters(selectedFilters);

    console.log(filters);
    console.log(subFilters);

    let filteredEvents = [];

    allEvents.forEach((evt) => {
      console.log(filterPass(evt));
      if (filterPass(evt)) filteredEvents.push(evt);
    });

    setEvents(filteredEvents);
  };

  const selectSubFilters = (filterVal) => {
    let selectedFilters = subFilters;
    selectedFilters.push(filterVal);
    setSubFilters(selectedFilters);

    console.log(filters);
    console.log(subFilters);

    let filteredEvents = [];

    allEvents.forEach((evt) => {
      console.log(filterPass(evt));
      if (filterPass(evt)) filteredEvents.push(evt);
    });

    setEvents(filteredEvents);
  };

  const deselectSubFilters = (filterVal) => {
    let selectedFilters = subFilters;
    selectedFilters.splice(selectedFilters.indexOf(filterVal), 1);
    setSubFilters(selectedFilters);

    console.log(filters);
    console.log(subFilters);

    let filteredEvents = [];

    allEvents.forEach((evt) => {
      console.log(filterPass(evt));
      if (filterPass(evt)) filteredEvents.push(evt);
    });

    setEvents(filteredEvents);
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
      let corpus = `${el.name} ${el.description}`;
      return corpus.toUpperCase().includes(searchQuery);
    }
  };

  return (
    <div className={styles.background}>
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
                // color="secondary"
              />
            </div>
            <div style={{ textAlign: 'center', marginBottom: 40 }}>
              {allFilters.map((filter, id) => (
                <Filters
                  key={filter.val}
                  filterValue={filter}
                  onSelectFilters={selectFilters}
                  onDeSelectFilters={deselectFilters}
                  color={'primary'}
                />
              ))}
              {allSubFilters.map((filter, id) => (
                <Filters
                  key={filter.val}
                  filterValue={filter}
                  onSelectFilters={selectSubFilters}
                  onDeSelectFilters={deselectSubFilters}
                  color={'primary'}
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

export default MegaShowEvent;
