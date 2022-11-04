import { Chip, Grid } from '@mui/material';
import Image from 'next/image';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Box, shadows, textAlign } from '@mui/system';
import CardHeader from '@mui/material/CardHeader';
import RoomIcon from '@mui/icons-material/Room';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import EventIcon from '@mui/icons-material/Event';
import { useRouter } from 'next/router';
import classes from './Event.module.css';

const Event = (props) => {
  return (
    <div style={{ paddingTop: '50px', margin: '0 20px' }}>
      <Grid container spacing={1} direction="row-reverse">
        <Grid
          item
          xs={12}
          sm={9}
          md={6}
          style={{ margin: 'auto', marginTop: '10px' }}
        >
          <Grid item xs={12} sm={12} md={12} className={classes.imageGridItem}>
            <Image
              priority
              layout="fill"
              alt="Cultural Image"
              src={
                props.eventDetails?.image_url ||
                'https://image.shutterstock.com/image-vector/urban-techno-music-event-background-600w-47546335.jpg'
              }
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12} className={classes.chipsGridItem}>
            <Chip
              label={props.eventDetails.type?.toUpperCase()}
              color="info"
              variant="filled"
              className={classes.chip}
            />
            <Chip
              label={props.eventDetails.subtype?.toUpperCase()}
              color="info"
              variant="filled"
              className={classes.chip}
            />
          </Grid>
        </Grid>
        <Grid
          item
          sm={12}
          md={6}
          style={{
            margin: 'auto',
            marginBottom: '30px',
            marginTop: '5px',
            width: '100%',
          }}
        >
          <Card raised className={classes.Card}>
            <CardHeader
              title={
                <span style={{ fontWeight: 'bold', fontSize: '40px' }}>
                  {props.eventDetails?.name.toUpperCase()}
                </span>
              }
              subheader={
                <span style={{ color: 'rgb(102, 255, 255)' }}>
                  <br />
                  <EventIcon
                    style={{ verticalAlign: '-5px', color: 'white' }}
                  />{' '}
                  {new Date(props.eventDetails?.datetime)
                    .toUTCString()
                    .slice(0, 16)}{' '}
                  <br />
                  <AccessTimeIcon
                    style={{ verticalAlign: '-5px', color: 'white' }}
                  />{' '}
                  {new Date(props.eventDetails?.datetime)
                    .toUTCString()
                    .slice(-12)}
                  <br />
                  <RoomIcon
                    style={{ color: 'red', verticalAlign: '-5px' }}
                  />{' '}
                  {props.eventDetails?.venue}
                </span>
              }
            />
            <CardActions style={{ overflow: 'auto' }}>
              <a href={props.eventDetails?.rulebookUrl}>
                <Button variant="contained" size="small">
                  Rulebook
                </Button>
              </a>
              <a href="#">
                <Button variant="contained" size="small">
                  Register
                </Button>
              </a>
              <div style={{ right: '3%', position: 'absolute' }}>
                <Chip
                  label={
                    'Team Size: ' +
                    (props.eventDetails.type == 'INDIVIDUAL'
                      ? '1'
                      : props.eventDetails.min_team_size +
                        ' - ' +
                        props.eventDetails.max_team_size)
                  }
                  color="info"
                  variant="filled"
                />
              </div>
            </CardActions>
            <CardContent>
              <hr />
              <br />
              <Typography variant="body2" className={classes.eventDescription}>
                {props.eventDetails?.description}
              </Typography>
            </CardContent>
            <br />
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};
export default Event;
