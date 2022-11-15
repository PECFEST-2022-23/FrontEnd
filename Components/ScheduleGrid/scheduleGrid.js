import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import styles from './ScheduleGrid.module.css';
import { Button } from '@mui/material';
import Link from 'next/link';

function ScheduleGrid(props) {
  return (
    <Grid className={styles.scheduleInfo}>
      <Grid container item className={styles.box}>
        <div className={styles.time}>
          <h3>{new Date(props.date).toLocaleDateString('en-GB')}</h3>
          <p>
            {new Date(props.date).toLocaleTimeString('en-US', {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </p>
        </div>
        <div className={styles.text}>
<<<<<<< HEAD
          <h3>
            `{props.name.slice(0, 22)}-{props.type}`
          </h3>
=======
          <h3>{props.name.slice(0, 22)}</h3>
>>>>>>> ea17c33611a86922eb089676ccd21ed16422293c
          <p>{props.venue}</p>
        </div>
        <div className={styles.button}>
          <Link href={`/eventList/${props.id}`}>
            <Button>View</Button>
          </Link>
        </div>
      </Grid>
    </Grid>
  );
}

export default ScheduleGrid;
