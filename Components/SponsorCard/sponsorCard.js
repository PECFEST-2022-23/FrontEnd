import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Image from 'next/image';
import styles from './SponsorCard.module.css';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
// import puneet from './puneet.jpeg';

function SponsorCard(props) {
  // const lineColors = ['red', 'green', 'blue', 'yellow'];
  // const color = lineColors[index % 4];
  return (
    <Grid item xs={12} md={3} sm={6}>
      <div className={styles.container}>
        <div className={`${styles.center} ${styles.front_face}`}>
          <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image={props.image}
                alt={props.name}
              />
              <CardContent className={styles.name}>
                <Typography gutterBottom variant="subtitle2" component="div">
                  {props.name}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </div>
      </div>
    </Grid>
  );
}

export default SponsorCard;
