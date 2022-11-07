import { Grid } from '@mui/material';
import EventListingCard from '../../../Components/EventListingCard/EventListingCard';
// import styles from '../events.module.css';

const MegaShowEvent = () => {
  return (
    <div>
      <h2 className={styles.mainHeading}>MEGA SHOW EVENTS</h2>
      <Grid
        container
        columns={11}
        rowSpacing={6}
        columnSpacing={4}
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <EventListingCard />
        <EventListingCard />
        <EventListingCard />
        <EventListingCard />
        <EventListingCard />
        <EventListingCard />
        <EventListingCard />
      </Grid>
    </div>
  );
};

export default MegaShowEvent;
