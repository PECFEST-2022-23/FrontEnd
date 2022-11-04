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
    const contentLengthMob = 300;

    const trimmedContent = desc.substring(0, contentLengthMob);
    setDescription(trimmedContent);
  };

  const processDescriptionPC = (desc) => {
    const contentLengthPC = 100;

    const trimmedContent = desc.substring(0, contentLengthPC);
    setDescription(trimmedContent);
  };

  const router = useRouter();
  return (
    <Grid item xs={10} sm={6} md={6} lg={4} xl={4}>
      <div
        onClick={() =>
          router.push({
            pathname: '/eventList/' + props.id,
            query: {
              eventDetails: props.eventDetails,
            },
          })
        }
        className={styles.flipCard}
      >
        <div className={`${styles.flipCardInner}`}>
          <div className={styles.flipCardFront}>
            <Card className={styles.eventCard}>
              <div className={styles.borderCardMediaDiv}>
                <CardMedia>
                  <Image
                    src={require('./border-frame-design.png')}
                    alt="borderFrame"
                  />
                </CardMedia>
                <div className={styles.imageCardMediaDiv}>
                  <CardMedia
                    component="img"
                    height={'220'}
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
                  <Image
                    src={require('./border-frame-design.png')}
                    alt="border frame design"
                  />
                </CardMedia>
                <div className={styles.imageCardMediaDiv}>
                  <CardContent>
                    <p className={styles.eventElementHeading}>
                      {props.eventDetails.name}
                    </p>
                    <div style={{ textAlign: 'center' }}>
                      <Button variant="contained" size="small">
                        ({props.eventType})
                      </Button>
                    </div>
                    <div className={styles.eventContentDiv}>
                      <p className={styles.eventContent}>
                        {props.eventDetails.description ? (
                          props.eventDetails.description
                        ) : (
                          <>
                            A night filled with melodious music, with
                            sensational and ....
                          </>
                        )}
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
                        title={new Intl.DateTimeFormat('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: '2-digit',
                          hour: '2-digit',
                          minute: '2-digit',
                        }).format(
                          new Date(Date.parse(props.eventDetails.datetime))
                        )}
                      >
                        <CalendarMonthIcon />
                      </Tooltip>
                      <Tooltip
                        title={
                          props.eventDetails.venue
                            ? props.eventDetails.venue
                            : 'College Auditoriam'
                        }
                      >
                        <LocationOnIcon />
                      </Tooltip>
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
