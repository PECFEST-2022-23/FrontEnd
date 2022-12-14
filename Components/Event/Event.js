import { Chip, Grid, Tooltip } from '@mui/material';
import Image from 'next/image';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Fade from '@mui/material/Fade';
import TextField from '@mui/material/TextField';
import RoomIcon from '@mui/icons-material/Room';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PermPhoneMsgIcon from '@mui/icons-material/PermPhoneMsg';
import EventIcon from '@mui/icons-material/Event';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import PersonIcon from '@mui/icons-material/Person';
import {
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  RedditIcon,
  RedditShareButton,
  TelegramIcon,
  TelegramShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from 'react-share';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import Cookies from 'universal-cookie';
import getCookieData from '../../lib/auth/getCookieData';
import redirectToLogin from '../../lib/auth/redirectToLogin';
import logout from '../../lib/auth/logout';
import ShareComponent from '../Share';
import { useState, useEffect } from 'react';
import classes from './Event.module.css';
import { toast } from 'react-toastify';
import { ContentCopy } from '@mui/icons-material';

const Event = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [cookieData, setCookieData] = useState(null);
  const [teamData, setTeamData] = useState(null);
  const [teamName, setTeamName] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCompleted, setIsCompleted] = useState(true);
  const [shareModalOpen, setShareModalOpen] = useState(false);

  const shareModalHandler = () => {
    setShareModalOpen(!shareModalOpen);
  };
  // const [isCompleted, setIsCompleted] = useState(true);
  const router = useRouter();
  const { data: session } = useSession();
  const cookies = new Cookies();

  const resFetch = async (req) => {
    const res = await fetch(...req);
    if (!(res.ok || res.created)) {
      throw new Error(res.status);
    }
    return res.json();
  };

  const fetchTeamData = async (ID) => {
    if (ID) {
      resFetch([
        `${process.env.NEXT_PUBLIC_BACKEND_API}events/team/${ID}`,
        {
          method: 'GET',
        },
      ])
        .then((res) => {
          setTeamData((prevState) => ({ ...prevState, ...res, id: ID }));
        })
        .catch((error) => {
          console.log(error.message);
        });
    } else if (teamData?.id) {
      resFetch([
        `${process.env.NEXT_PUBLIC_BACKEND_API}events/team/${teamData.id}`,
        {
          method: 'GET',
        },
      ])
        .then((res) => {
          setTeamData((prevState) => ({ ...prevState, ...res }));
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  };

  useEffect(() => {
    const { data, isProfileCompleted } = getCookieData(session);
    if (typeof data == 'undefined' || data.user == null) {
      setIsLoggedIn(false);
      setLoading(false);
    } else {
      setCookieData(data);
      setIsLoggedIn(true);
    }
    if (data && data.user_status != 3 && isProfileCompleted === 'false') {
      setIsCompleted(false);
    }
  }, [session, props]);

  useEffect(() => {
    if (props.teamId && !teamData?.is_registered) {
      resFetch([
        `${process.env.NEXT_PUBLIC_BACKEND_API}events/team/${props.teamId}`,
        {
          method: 'GET',
        },
      ])
        .then((res) => {
          setTeamData((prevState) => ({
            ...prevState,
            ...res,
            id: props.teamId,
          }));
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  }, [props]);

  useEffect(() => {
    if (isLoggedIn) {
      setLoading(true);
      resFetch([
        `${process.env.NEXT_PUBLIC_BACKEND_API}events/${props.eventDetails.id}/team`,
        {
          method: 'GET',
          headers: {
            Authorization: `Token ${cookieData.token}`,
          },
        },
      ])
        .then((res) => {
          setTeamData((prevState) => ({ ...prevState, ...res }));
          setLoading(false);
        })
        .catch((error) => {
          if (error.message == 401) {
            logout(router, session);
          }
        });
    }
  }, [isLoggedIn, cookieData, props, router, session]);

  useEffect(() => {
    if (!loading) {
      if (isLoggedIn && teamData && !teamData.is_registered)
        toast.info(
          'Make sure that you have enabled cookies in your browser in order to register and then login again'
        );
    }
  }, [loading]);

  const handleRegisterClick = () => {
    if (props.eventDetails.type == 'INDIVIDUAL') {
      if (isLoggedIn) {
        if (teamData?.is_registered) {
          resFetch([
            `${process.env.NEXT_PUBLIC_BACKEND_API}events/add/${teamData.id}/`,
            {
              method: 'DELETE',
              headers: {
                Authorization: `Token ${cookieData.token}`,
              },
            },
          ])
            .then((res) => {
              setTeamData((prevState) => ({
                ...prevState,
                is_registered: false,
              }));
              toast.success('Unregistered Successfully');
            })
            .catch((error) => {
              if (error.message == 401) {
                logout(router, session);
                toast.error('Please login again');
              }
            });
        } else {
          if (!isCompleted) {
            redirectToLogin(router, '/profile');
          } else {
            resFetch([
              `${process.env.NEXT_PUBLIC_BACKEND_API}events/register/${props.eventDetails.id}/`,
              {
                method: 'POST',
                headers: {
                  Authorization: `Token ${cookieData.token}`,
                },
              },
            ])
              .then((res) => {
                setTeamData({ ...teamData, is_registered: true, id: res.id });
                toast.success('Registered Successfully');
              })
              .catch((error) => {
                if (error.message == 401) {
                  logout(router, session);
                  toast.error('Please login again');
                }
              });
          }
        }
      } else redirectToLogin(router);
    } else {
      fetchTeamData();
      if (isLoggedIn && teamData?.is_registered) {
        resFetch([
          `${process.env.NEXT_PUBLIC_BACKEND_API}events/add/${teamData.id}/`,
          {
            method: 'DELETE',
            headers: {
              Authorization: `Token ${cookieData.token}`,
            },
          },
        ])
          .then((res) => {
            setTeamData({ ...teamData, is_registered: false });
            toast.success('Unregistered Successfully');
          })
          .catch((error) => {
            if (error.message == 401) {
              logout(router, session);
              toast.error('Please login again');
            }
          });
        fetchTeamData();
      } else if (!isLoggedIn && !teamData?.id) {
        redirectToLogin(router);
      } else setIsModalOpen(true);
    }
  };

  const handleTeamRegisterClick = () => {
    if (isLoggedIn) {
      if (!teamData.is_registered && props.eventDetails.type == 'TEAM') {
        if (!isCompleted) {
          redirectToLogin(router, '/profile');
        } else if (teamData.id) {
          resFetch([
            `${process.env.NEXT_PUBLIC_BACKEND_API}events/add/${teamData.id}/`,
            {
              method: 'POST',
              headers: {
                Authorization: `Token ${cookieData.token}`,
              },
            },
          ])
            .then((res) => {
              fetchTeamData();
              setTeamData((prevState) => ({
                ...prevState,
                is_registered: true,
              }));
              toast.success('Registered Successfully');
            })
            .catch((error) => {
              if (error.message == 401) {
                logout(router, session);
                toast.error('Please login again');
              }
            });
        } else if (teamName.trim().length > 0) {
          resFetch([
            `${process.env.NEXT_PUBLIC_BACKEND_API}events/register/${props.eventDetails.id}/`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${cookieData.token}`,
              },
              body: JSON.stringify({
                team_name: `${teamName.trim()}`,
              }),
            },
          ])
            .then((res) => {
              console.log(res);
              fetchTeamData(res.id);
              setTeamData((prevState) => ({
                ...prevState,
                is_registered: true,
                id: res.id,
                team_name: teamName,
              }));
              toast.success('Registered Successfully');
            })
            .catch((error) => {
              if (error.message == 401) {
                logout(router, session);
                toast.error('Please login again');
              }
            });
        }
      }
    } else redirectToLogin(router);
  };

  const styles = {
    newTeamModal: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 300,
      bgcolor: '#fff',
      borderRadius: '0.5rem',
      boxShadow: 24,
      p: 4,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      gap: '1.5rem',
    },
    modalInput: {
      width: '200px',
    },
    teamDetailsModal: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 500,
      maxWidth: '95%',
      bgcolor: '#fff',
      borderRadius: '0.5rem',
      boxShadow: 24,
      p: 4,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      gap: '1.5rem',
    },
  };

  return (
    <div style={{ paddingTop: '50px', margin: '0 30px' }}>
      <Modal
        aria-labelledby="register-modal-team"
        aria-describedby="register-modal-team"
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={isModalOpen}>
          {teamData?.is_registered ? (
            <Box sx={styles.teamDetailsModal}>
              <div className={classes.teamName}>
                Hi Team {teamData.team_name}
              </div>
              <div style={{ textAlign: 'center' }}>
                Share link with your team-mates to join team -{' '}
                <ContentCopy
                  sx={{
                    color: '#000',
                    fontSize: '1.5rem',
                    padding: 0,
                    margin: '0 0 -0.4rem 0.4rem',
                    cursor: 'pointer',
                  }}
                  onClick={() => {
                    navigator.clipboard.writeText(
                      process.env.NEXT_PUBLIC_URL +
                        `eventList/${props.eventDetails.id}` +
                        '/?tid=' +
                        teamData.id
                    );
                    toast.success('Team link Copied to clipboard.');
                  }}
                />
                <br />
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 20,
                  }}
                >
                  <FacebookShareButton
                    url={
                      process.env.NEXT_PUBLIC_URL +
                      `eventList/${props.eventDetails.id}` +
                      '/?tid=' +
                      teamData.id
                    }
                    title={'Join my team !!\n'}
                    quote={'Join my team !!\n'}
                    hashtag={'#Pecfest22'}
                  >
                    <FacebookIcon round={true}></FacebookIcon>
                  </FacebookShareButton>
                  <LinkedinShareButton
                    url={
                      process.env.NEXT_PUBLIC_URL +
                      `eventList/${props.eventDetails.id}` +
                      '/?tid=' +
                      teamData.id
                    }
                    title={'Join my team !!\n'}
                  >
                    <LinkedinIcon round></LinkedinIcon>
                  </LinkedinShareButton>
                  <WhatsappShareButton
                    url={
                      process.env.NEXT_PUBLIC_URL +
                      `eventList/${props.eventDetails.id}` +
                      '/?tid=' +
                      teamData.id
                    }
                    title={'Join my team !!\n'}
                    separator={'\n'}
                  >
                    <WhatsappIcon round={true}></WhatsappIcon>
                  </WhatsappShareButton>
                  <TelegramShareButton
                    url={
                      process.env.NEXT_PUBLIC_URL +
                      `eventList/${props.eventDetails.id}` +
                      '/?tid=' +
                      teamData.id
                    }
                    title={'Join my team !!\n'}
                  >
                    <TelegramIcon round></TelegramIcon>
                  </TelegramShareButton>
                  <RedditShareButton
                    url={
                      process.env.NEXT_PUBLIC_URL +
                      `eventList/${props.eventDetails.id}` +
                      '/?tid=' +
                      teamData.id
                    }
                    title={'Join my team !!\n'}
                  >
                    <RedditIcon round></RedditIcon>
                  </RedditShareButton>
                </div>
              </div>
              <List>
                {teamData?.members ? (
                  teamData.members.map((member) => {
                    return (
                      <ListItem
                        disablePadding
                        key={`${member.first_name}${member.last_name}${member.user_id}`}
                      >
                        <ListItemIcon>
                          <PersonIcon />
                        </ListItemIcon>
                        <ListItemText
                          primary={`${member.first_name} ${member.last_name}`}
                        />
                      </ListItem>
                    );
                  })
                ) : (
                  <div></div>
                )}
              </List>
            </Box>
          ) : teamData?.id ? (
            <Box sx={styles.teamDetailsModal}>
              <div className={classes.teamName}>
                Hi Team {teamData.team_name}
              </div>
              <div style={{ textAlign: 'center' }}>
                Share link with your team-mates to join team -{' '}
                <ContentCopy
                  sx={{
                    color: '#000',
                    fontSize: '1.5rem',
                    padding: 0,
                    margin: '0 0 -0.4rem 0.4rem',
                    cursor: 'pointer',
                  }}
                  onClick={() => {
                    navigator.clipboard.writeText(
                      process.env.NEXT_PUBLIC_URL +
                        `eventList/${props.eventDetails.id}` +
                        '/?tid=' +
                        teamData.id
                    );
                    toast.success('Team link Copied to clipboard.');
                  }}
                />
                <br />
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 20,
                  }}
                >
                  <FacebookShareButton
                    url={
                      process.env.NEXT_PUBLIC_URL +
                      `eventList/${props.eventDetails.id}` +
                      '/?tid=' +
                      teamData.id
                    }
                    title={'Join my team !!\n'}
                    quote={'Join my team !!\n'}
                    hashtag={'#Pecfest22'}
                  >
                    <FacebookIcon round={true}></FacebookIcon>
                  </FacebookShareButton>
                  <LinkedinShareButton
                    url={
                      process.env.NEXT_PUBLIC_URL +
                      `eventList/${props.eventDetails.id}` +
                      '/?tid=' +
                      teamData.id
                    }
                    title={'Join my team !!\n'}
                  >
                    <LinkedinIcon round></LinkedinIcon>
                  </LinkedinShareButton>
                  <WhatsappShareButton
                    url={
                      process.env.NEXT_PUBLIC_URL +
                      `eventList/${props.eventDetails.id}` +
                      '/?tid=' +
                      teamData.id
                    }
                    title={'Join my team !!\n'}
                    separator={'\n'}
                  >
                    <WhatsappIcon round={true}></WhatsappIcon>
                  </WhatsappShareButton>
                  <TelegramShareButton
                    url={
                      process.env.NEXT_PUBLIC_URL +
                      `eventList/${props.eventDetails.id}` +
                      '/?tid=' +
                      teamData.id
                    }
                    title={'Join my team !!\n'}
                  >
                    <TelegramIcon round></TelegramIcon>
                  </TelegramShareButton>
                  <RedditShareButton
                    url={
                      process.env.NEXT_PUBLIC_URL +
                      `eventList/${props.eventDetails.id}` +
                      '/?tid=' +
                      teamData.id
                    }
                    title={'Join my team !!\n'}
                  >
                    <RedditIcon round></RedditIcon>
                  </RedditShareButton>
                </div>
              </div>
              <List>
                {teamData?.members ? (
                  teamData.members.map((member) => {
                    return (
                      <ListItem
                        disablePadding
                        key={`${member.first_name}${member.last_name}${member.user_id}`}
                      >
                        <ListItemIcon>
                          <PersonIcon />
                        </ListItemIcon>
                        <ListItemText
                          primary={`${member.first_name} ${member.last_name}`}
                        />
                      </ListItem>
                    );
                  })
                ) : (
                  <div></div>
                )}
              </List>
              {!(
                teamData?.members?.length >= props.eventDetails?.max_team_size
              ) && (
                <Button
                  variant="contained"
                  onClick={handleTeamRegisterClick}
                  size="small"
                >
                  Register
                </Button>
              )}
            </Box>
          ) : (
            <Box sx={styles.newTeamModal}>
              <TextField
                id="teamName"
                label="Team Name"
                variant="standard"
                sx={styles.modalInput}
                value={teamName}
                onChange={(evt) => {
                  if (evt.target.value.length <= 25)
                    setTeamName(evt.target.value);
                }}
              />
              {!(
                teamData?.members?.length >= props.eventDetails?.max_team_size
              ) && (
                <Button
                  variant="contained"
                  onClick={handleTeamRegisterClick}
                  size="small"
                >
                  Register
                </Button>
              )}
            </Box>
          )}
        </Fade>
      </Modal>
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
                <span style={{ color: '#FFF' }}>
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
                    <Tooltip
                      title={props.eventDetails?.club_name?.toUpperCase()}
                      arrow
                    >
                      <Chip
                        size="small"
                        label={
                          props.eventDetails?.club_name?.length > 40
                            ? props.eventDetails?.club_name
                                ?.toUpperCase()
                                .slice(0, 40) + '...'
                            : props.eventDetails?.club_name?.toUpperCase()
                        }
                        color="info"
                        variant="filled"
                        className={classes.chip}
                      />
                    </Tooltip>
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
                  <br />
                  <PermPhoneMsgIcon
                    style={{ color: 'white', verticalAlign: '-5px' }}
                  />{' '}
                  {
                    props.eventDetails?.description.split(
                      'Point of Contact:'
                    )[1]
                  }
                </span>
              }
            />
            <CardActions className={classes.cardActions}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                }}
              >
                {props.eventDetails.rulebook_url ? (
                  <Button
                    variant="contained"
                    style={{ border: '1px solid white', margin: '5px' }}
                    size="small"
                    target="_blank"
                    href={props.eventDetails.rulebook_url}
                  >
                    Rulebook
                  </Button>
                ) : (
                  <></>
                )}
                {!loading && (
                  <Button
                    variant="contained"
                    style={{ border: '1px solid white', margin: '5px' }}
                    onClick={handleRegisterClick}
                    size="small"
                  >
                    {isLoggedIn && teamData?.is_registered
                      ? 'Unregister'
                      : 'Register'}
                  </Button>
                )}
                {!loading &&
                  isLoggedIn &&
                  props.eventDetails.type == 'TEAM' &&
                  teamData?.is_registered && (
                    <PeopleAltIcon
                      sx={{
                        color: '#fff',
                        fontSize: '2.4rem',
                        padding: 0,
                        margin: '5px',
                        cursor: 'pointer',
                      }}
                      onClick={() => {
                        fetchTeamData();
                        setIsModalOpen(true);
                      }}
                    />
                  )}
              </div>
              <div className={classes.teamSize}>
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
