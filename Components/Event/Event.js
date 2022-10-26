import { Grid } from '@mui/material';
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
import classes from './Event.module.css';

const Event = (props) => {
  return (
    <div style={{ paddingTop: '50px', margin: '0 30px' }}>
      <Grid container spacing={2} direction="row-reverse">
        <Grid item xs={11} sm={9} md={5} className={classes.imageGridItem}>
          <Image
            priority
            layout="fill"
            alt="Cultural Image"
            src={props.eventDetails?.poster}
          />
        </Grid>
        <Grid
          item
          sm={12}
          md={6}
          style={{
            margin: 'auto',
            marginBottom: '30px',
            marginTop: '5px',
          }}
        >
          <Card raised className={classes.Card}>
            <CardHeader
              title={
                <span style={{ fontWeight: 'bold', fontSize: '40px' }}>
                  {props.eventDetails?.name}
                </span>
              }
              subheader={
                <span style={{ color: 'rgb(102, 255, 255)' }}>
                  <br />
                  <EventIcon
                    style={{ verticalAlign: '-5px', color: 'white' }}
                  />{' '}
                  {props.eventDetails?.date} <br />
                  <AccessTimeIcon
                    style={{ verticalAlign: '-5px', color: 'white' }}
                  />{' '}
                  {props.eventDetails?.time}
                  <br />
                  <RoomIcon
                    style={{ color: 'red', verticalAlign: '-5px' }}
                  />{' '}
                  {props.eventDetails?.location}
                </span>
              }
            />
            <CardActions>
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
            </CardActions>
            <CardContent>
              <hr />
              <br />
              <Typography variant="body2" className={classes.eventDescription}>
                {props.eventDetails?.desc}
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
