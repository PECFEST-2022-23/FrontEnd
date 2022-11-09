import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import styles from './ScheduleGrid.module.css';
import { Button } from '@mui/material';
import Link from 'next/link';

function ScheduleGrid(props) {
  return (
    <Grid container className={styles.event}>
      <Grid container item md={3} className={styles.eventobject}>
        {props.name.slice(0, 22)}
      </Grid>
      <Grid container item md={2} className={styles.eventobject}>
        {new Date(props.date).toLocaleDateString('en-GB')}
      </Grid>
      <Grid container item md={2} className={styles.eventobject}>
        {new Date(props.date).toLocaleTimeString('en-US')}
      </Grid>
      <Grid container item md={3} className={styles.eventobject}>
        {props.venue}
      </Grid>
      <Grid container item md={2} className={styles.eventobject}>
        <Link href={`/eventList/${props.id}`}>
          <Button>View</Button>
        </Link>
      </Grid>
    </Grid>
  );
}

export default ScheduleGrid;
