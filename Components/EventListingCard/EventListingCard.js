import React, { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { Button } from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ShareIcon from '@mui/icons-material/Share';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import borderFrame from './border-frame-design.png';
import styles from './EventListingCard.module.css';
import { useRouter } from 'next/router';
import Image from 'next/image';

function EventListingCard(props) {
  const [description, setDescription] = useState(
    'A night filled with melodious music, with sensational and A night filled with melodious music, with sensational and A night filled with melodious music, with sensational and ....'
  );

  const processDescriptionMob = (desc) => {
    let contentLengthMob = 300;

    let trimmedContent = desc.substring(0, contentLengthMob);
    setDescription(trimmedContent);
  };

  const processDescriptionPC = (desc) => {
    let contentLengthPC = 100;

    let trimmedContent = desc.substring(0, contentLengthPC);
    setDescription(trimmedContent);
  };

  const router = useRouter();
  return (
    <Grid item xs={10} sm={6} md={6} lg={4} xl={4}>
      <div
        onClick={() => router.push('/eventList/' + props.id)}
        className={styles.flipCard}
      >
        <div className={`${styles.flipCardInner}`}>
          <div className={styles.flipCardFront}>
            <Card className={styles.eventCard}>
              {/* <div className={styles.borderCardMediaDiv}>
            <div className={styles.imageCardMediaDiv}>
                  <CardMedia
                    component="img"
                    height="250"
                    image="https://image.shutterstock.com/image-vector/urban-techno-music-event-background-600w-47546335.jpg"
                    alt="green iguana"
                    className={styles.imageCardMedia}
                  />
                </div>
              </div> */}
              <div className={styles.borderCardMediaDiv}>
                <CardMedia>
                  <Image src={require('./border-frame-design.png')} />
                </CardMedia>
                <div className={styles.imageCardMediaDiv}>
                  <CardMedia
                    component="img"
                    height="250"
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
                <CardMedia>
                  <Image src={require('./border-frame-design.png')} />
                </CardMedia>
                <div className={styles.imageCardMediaDiv}>
                  <CardContent>
                    <p className={styles.eventElementHeading}>Musical Night</p>
                    <div style={{ textAlign: 'center' }}>
                      <Button variant="contained" size="small">
                        ({props.eventType})
                      </Button>
                    </div>
                    <div className={styles.eventContentDiv}>
                      <p className={styles.eventContent}>
                        A night filled with melodious music, with sensational
                        and ....
                      </p>
                    </div>
                    <div className={styles.icons}>
                      <a
                        href={'https://www.google.com'}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <ExitToAppIcon />
                      </a>
                      <Tooltip
                        style={{ color: 'white' }}
                        title="2nd Nov 22, 5.30 PM"
                      >
                        <CalendarMonthIcon />
                      </Tooltip>
                      <Tooltip title="2nd Nov 22, 5.30 PM">
                        <CalendarMonthIcon />
                      </Tooltip>
                      <Tooltip title="College Auditorium  ">
                        <LocationOnIcon />
                      </Tooltip>
                      <a
                        style={{ color: 'white' }}
                        href={'https://www.google.com'}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <ShareIcon />
                      </a>
                      <a
                        href={'https://www.google.com'}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <ShareIcon />
                      </a>
                    </div>
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
