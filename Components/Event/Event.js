import { Chip, Grid } from '@mui/material';
import Image from 'next/image';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';
import RoomIcon from '@mui/icons-material/Room';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import EventIcon from '@mui/icons-material/Event';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import classes from './Event.module.css';
import { useRouter } from 'next/router';
import { useSession, signIn, signOut } from 'next-auth/react';
import Cookies from 'universal-cookie';
import getServerCookieData from '../../lib/auth/getServerCookieData';
import getCookieData from '../../lib/auth/getCookieData';
import redirectToLogin from '../../lib/auth/redirectToLogin';
import { useState, useEffect } from 'react';
import useSWR from 'swr';

const Event = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [loading, setLoading] = useState(true);
  const [cookieData, setCookieData] = useState(null);
  const [teamData, setTeamData] = useState(null);
  const router = useRouter();
  const { data: session } = useSession();
  const cookies = new Cookies();

  // const fetcher = (url) => fetch(url, {
  //   method: "GET",
  //   headers: {
  //     'Authorization': `Token ${cookieData.token}`
  //   }
  // }).then((res) => res.json());

  // const { teamData, teamError } = useSWR(isLoggedIn ? `https://api.pecfest.co.in/events/${props.eventDetails.id}/team/` : null, fetcher, { refreshInterval: 5000 });

  const resFetch = async (req) => {
    const res = await fetch(...req);
    if (!res.ok) {
      return res.status;
    }
    return res.json();
  };

  useEffect(() => {
    const { data } = getCookieData(session);
    if (typeof data == 'undefined' || data.user == null) {
      setIsLoggedIn(false);
      setLoading(false);
    } else {
      setCookieData(data);
      setIsLoggedIn(true);
    }
  }, [session, props]);

  useEffect(() => {
    if (isLoggedIn) {
      setLoading(true);
      resFetch([
        `https://api.pecfest.co.in/events/${props.eventDetails.id}/team`,
        {
          method: 'GET',
          headers: {
            Authorization: `Token ${cookieData.token}`,
          },
        },
      ])
        .then((res) => {
          setLoading(false);
          setTeamData(res);
          setIsRegistered(teamData.is_registered);
        })
        .catch((status) => {
          if (status == 401) {
            signOut();
          }
        });
    }
  }, [isLoggedIn, cookieData, props]);

  const handleRegisterClick = () => {
    if (isLoggedIn) {
      if (!isRegistered) {
        if (props.eventDetails.type == 'INDIVIDUAL') {
          resFetch([
            `https://api.pecfest.co.in/events/register/${props.eventDetails.id}/ `,
            {
              method: 'POST',
              headers: {
                Authorization: `Token ${cookieData.token}`,
              },
            },
          ])
            .then((res) => {
              console.log(res);
              setIsRegistered(true);
            })
            .catch((status) => {
              if (status == 401) {
                signOut();
              }
            });
        }
      }
    } else redirectToLogin(router);
  };

  console.log(props);

  return (
    <div style={{ paddingTop: '50px', margin: '0 30px' }}>
      <Grid container spacing={2} direction="row-reverse">
        <Grid item xs={11} sm={9} md={5} className={classes.imageGridItem}>
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
                <span style={{ fontWeight: 'bold', fontSize: '35px' }}>
                  {props.eventDetails?.name.toUpperCase()}
                </span>
              }
              subheader={
                <span style={{ color: 'rgb(102, 255, 255)' }}>
                  <div>
                    <Chip
                      size="small"
                      label={props.eventDetails?.type?.toUpperCase()}
                      color="info"
                      variant="filled"
                      className={classes.chip}
                    />
                    <Chip
                      size="small"
                      label={props.eventDetails?.category?.toUpperCase()}
                      color="info"
                      variant="filled"
                      className={classes.chip}
                    />
                    <Chip
                      size="small"
                      label={props.eventDetails?.subcategory?.toUpperCase()}
                      color="info"
                      variant="filled"
                      className={classes.chip}
                    />
                    <Chip
                      size="small"
                      label={props.eventDetails?.club_name?.toUpperCase()}
                      color="info"
                      variant="filled"
                      className={classes.chip}
                    />
                  </div>
                  <br />
                  <EventIcon
                    style={{ verticalAlign: '-5px', color: 'white' }}
                  />{' '}
                  {new Date(props.eventDetails?.startdatetime).toDateString()}
                  {' - '}
                  {new Date(props.eventDetails?.enddatetime).toDateString()}
                  <br />
                  <AccessTimeIcon
                    style={{ verticalAlign: '-5px', color: 'white' }}
                  />{' '}
                  {new Date(
                    props.eventDetails?.startdatetime
                  ).toLocaleTimeString()}
                  {' - '}
                  {new Date(
                    props.eventDetails?.enddatetime
                  ).toLocaleTimeString()}
                  <br />
                  <RoomIcon
                    style={{ color: 'white', verticalAlign: '-5px' }}
                  />{' '}
                  {props.eventDetails?.venue}
                </span>
              }
            />
            <CardActions style={{ overflow: 'auto' }}>
              <Button
                variant="contained"
                style={{ border: '1px solid white' }}
                size="small"
                target="_blank"
                href={props.eventDetails.rulebook_url}
              >
                Rulebook
              </Button>
              {!loading && (
                <Button
                  variant="contained"
                  style={{ border: '1px solid white' }}
                  onClick={handleRegisterClick}
                  size="small"
                >
                  {isRegistered ? 'Registered' : 'Register'}
                </Button>
              )}
              {isRegistered && props.eventDetails.type == 'TEAM' && (
                <PeopleAltIcon
                  style={{
                    color: '#fff',
                    fontSize: '2.4rem',
                    padding: 0,
                    margin: '0 0 -0.3rem 0.5rem',
                  }}
                />
              )}
              <div style={{ right: '3%', position: 'absolute' }}>
                <Chip
                  label={
                    'Team size: ' +
                    (props.eventDetails?.type == 'INDIVIDUAL'
                      ? '1'
                      : props.eventDetails?.min_team_size +
                      ' - ' +
                      props.eventDetails?.max_team_size)
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
