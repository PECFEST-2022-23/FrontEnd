import React, { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import IconButton from '@mui/material/IconButton';
import { Button } from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ShareIcon from '@mui/icons-material/Share';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import styles from './EventListingCard.module.css';

function EventListingCard({}) {
  return (
    <Grid item xs={10} sm={6} md={4} lg={3} xl={3}>
      <div className={styles.flipCard}>
        <div className={`${styles.flipCardInner}`}>
          <div className={styles.flipCardFront}>
            <Card className={styles.eventCard}>
              <div className={styles.borderCardMediaDiv}>
                <CardMedia
                  component="img"
                  height="10%"
                  image="https://www.kindpng.com/picc/m/93-933681_border-frame-golden-transparent-clip-art-image-gallery.png"
                  alt="green iguana"
                  className={styles.borderCardMedia}
                />
                <div className={styles.imageCardMediaDiv}>
                  <CardMedia
                    component="img"
                    height="400"
                    image="https://image.shutterstock.com/image-vector/urban-techno-music-event-background-600w-47546335.jpg"
                    alt="green iguana"
                    className={styles.imageCardMedia}
                  />
                </div>
              </div>
            </Card>
          </div>
          <div className={styles.flipCardBack}>
            <Card className={styles.eventCard}>
              <div className={styles.borderCardMediaDiv}>
                <CardMedia
                  component="img"
                  height="10%"
                  image="https://www.kindpng.com/picc/m/93-933681_border-frame-golden-transparent-clip-art-image-gallery.png"
                  alt="green iguana"
                  className={styles.borderCardMedia}
                />
                <div className={styles.imageCardMediaDiv}>
                  <CardContent>
                    <p className={styles.eventElementHeading}>Musical Night</p>

                    <div className={styles.eventContentDiv}>
                      <p className={styles.eventContent}>
                        A night filled with melodious music, with sensational
                        and worth listening performances. Don't miss the chance
                        to wistness it go and get registered. Share this with
                        your friends to chime them in !
                      </p>
                    </div>
                    <Grid container spacing={2}>
                      <Grid xs={12}>
                        <IconButton disabled className={styles.iconButton}>
                          <CalendarMonthIcon />
                        </IconButton>
                        <span className={styles.eventTimePlace}>
                          2nd Nov 22, 5.30 PM
                        </span>
                      </Grid>
                      <Grid xs={12}>
                        <IconButton disabled className={styles.iconButton}>
                          <LocationOnIcon />
                        </IconButton>
                        <span className={styles.eventTimePlace}>
                          College Auditorium{' '}
                        </span>
                      </Grid>
                    </Grid>
                    <Grid
                      container
                      columns={10}
                      columnSpacing={4}
                      direction="row"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <Grid item xs={5} mt={3} mb={3}>
                        <Button
                          variant="contained"
                          className="eventButton"
                          onClick={() => openInNewTab('https://www.google.com')}
                          size="large"
                          color="primary"
                          startIcon={<ExitToAppIcon />}
                        >
                          Register
                        </Button>
                      </Grid>
                      <Grid item xs={5} mt={3} mb={3}>
                        <Button
                          variant="contained"
                          className="eventButton"
                          onClick={() => openInNewTab('https://www.google.com')}
                          size="large"
                          color="primary"
                          startIcon={<ShareIcon />}
                        >
                          Share
                        </Button>
                      </Grid>
                    </Grid>
                  </CardContent>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </Grid>
  );
}

const openInNewTab = (url) => {
  const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
  if (newWindow) newWindow.opener = null;
};

export default EventListingCard;
