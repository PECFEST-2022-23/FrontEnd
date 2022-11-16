import { useEffect, useState } from 'react';
import {
  Container,
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  TextField,
  Grid,
  FormHelperText,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  Snackbar,
} from '@mui/material';
import Head from 'next/head';
import { DropzoneArea } from 'mui-file-dropzone';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { DateTimePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Image from 'next/image';
import getServerCookieData from '../../../lib/auth/getServerCookieData';
import { useRouter } from 'next/router';
import styles from './adminevent.module.css';

const EditEvent = ({ eventInfo, user_token }) => {
  const defaultMapProps = {
    center: {
      lat: 30.76830387478322,
      lng: 76.7867558814253,
    },
    zoom: 11,
  };

  const router = useRouter();
  const [eventName, setEventName] = useState();
  const [eventStart, setEventStart] = useState(dayjs(`2022-11-25T00:00:00Z`));
  const [eventEnd, setEventEnd] = useState(dayjs(`2022-11-28T00:00:00Z`));
  const [eventVenue, setEventVenue] = useState();
  const [minTeamSize, setMinTeamSize] = useState(1);
  const [maxTeamSize, setMaxTeamSize] = useState(1);
  const [rulesLink, setRulesLink] = useState();
  const [eventPoster, setEventPoster] = useState();
  const [eventDescription, setEventDescription] = useState();
  const [eventType, setEventType] = useState(`INDIVIDUAL`);
  const [eventCategory, setEventCategory] = useState(`CULTURAL`);
  const [eventCategorySubType, setEventCategorySubType] = useState(`DANCE`);
  const [pocName, setPocName] = useState();
  const [pocNumber, setPocNumber] = useState();
  // work-around for file clear in dropzone
  const [dropzoneKey, setDropzoneKey] = useState(true);
  const [imgDimError, setImgDimError] = useState(false);

  const [dateError, setDateError] = useState(false);
  const [eventCreationStatus, setEventCreationStatus] = useState();
  const [delDialogOpen, setDelDialogOpen] = useState(false);

  useEffect(() => {
    if (eventInfo) {
      const start = dayjs(eventInfo.startdatetime);
      const end = dayjs(eventInfo.enddatetime);
      setEventName(eventInfo.name);
      setEventStart(start);
      setEventEnd(end);
      setEventVenue(eventInfo.venue);
      setMinTeamSize(eventInfo.min_team_size);
      setMaxTeamSize(eventInfo.max_team_size);
      setEventPoster(eventInfo.image_url);
      setEventType(eventInfo.type);
      setEventCategory(eventInfo.category);
      setEventCategorySubType(eventInfo.subcategory);
      setRulesLink(eventInfo.rulebook_url);

      // Extract POC from description
      const re = /[A-Za-z\s]*:\d*/g;
      const contact_info = eventInfo.description.match(re);
      if (contact_info) {
        setPocName(contact_info.slice(-1)[0].split(':')[0]);
        setPocNumber(contact_info.slice(-1)[0].split(':')[1]);
      }

      setEventDescription(eventInfo.description.split('Point of Contact:')[0]);
    }
  }, [eventInfo]);

  const handleEventChange = (e, type) => {
    if ('$d' in e) {
      if (type == 0) {
        if (e['$d'] > eventEnd) {
          setDateError(true);
        } else {
          setDateError(false);
        }
        if (!dateError) {
          setEventStart(e['$d']);
        }
      } else {
        if (e['$d'] < eventStart) {
          setDateError(true);
        } else {
          setDateError(false);
        }
        if (!dateError) {
          setEventEnd(e['$d']);
        }
      }
    } else if ('target' in e) {
      const target_name = e.target.name;
      const target_value = e.target.value;

      switch (target_name) {
        case 'eventName':
          setEventName(target_value);
          break;
        case 'eventVenue':
          setEventVenue(target_value);
          break;
        case 'minTeamSize':
          setMinTeamSize(target_value);
          break;
        case 'maxTeamSize':
          setMaxTeamSize(target_value);
          break;
        case 'rulesLink':
          setRulesLink(target_value);
          break;
        case 'eventDescription':
          setEventDescription(target_value);
          break;
        case 'eventType':
          setEventType(target_value);
          break;
        case 'eventCategory':
          setEventCategory(target_value);
          break;
        case 'eventSubCategory':
          setEventCategorySubType(target_value);
          break;
        case 'pocName':
          setPocName(target_value);
          break;
        case 'pocNumber':
          setPocNumber(target_value);
          break;
        default:
          break;
      }
    } else {
      const img = document.createElement('img');
      let is_square = true;
      if (e && e.length) {
        img.onload = function (event) {
          if (img.width / img.height != 1) {
            is_square = false;
          }

          if (is_square) {
            setImgDimError(false);
            setEventPoster(e[0]);
          } else {
            setImgDimError(true);
            setDropzoneKey((prev) => !prev);
          }
        };
        img.src = URL.createObjectURL(e[0]);
      }
    }
  };

  const handleSnackbarClose = () => {
    setEventCreationStatus();
  };

  const handleEventSubmit = async (e) => {
    e.preventDefault();
    if (!dateError) {
      // make POST request
      const formDataObj = {
        name: eventName,
        type: eventType.toUpperCase(),
        category: eventCategory.toUpperCase(),
        subcategory: eventCategorySubType.toUpperCase(),
        description: `${eventDescription.trim()}\n\nPoint of Contact:\n${pocName.trim()}:${pocNumber}`,
        startdatetime: eventStart.toISOString(),
        enddatetime: eventEnd.toISOString(),
        venue: eventVenue,
        min_team_size: minTeamSize,
        max_team_size: maxTeamSize,
        latitude: defaultMapProps.center.lat,
        longitude: defaultMapProps.center.lng,
        rulebook_url: rulesLink,
      };

      const formData = new FormData();

      Object.keys(formDataObj).forEach((key) => {
        if (eventInfo[key] != formDataObj[key]) {
          formData.append(key, formDataObj[key]);
        }
      });

      if (typeof eventPoster !== 'string') {
        formData.append('image_url', eventPoster);
      }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API}club/${eventInfo.id}`,
        {
          method: `PATCH`,
          headers: {
            Authorization: `Token ${user_token}`,
          },
          body: formData,
        }
      );
      if (!res) {
        setEventCreationStatus(`FAILURE: Event Updation Failed.`);
      }

      const data = await res.json();
      if (data && data.event_id && data.message) {
        setEventCreationStatus(`SUCCESS: Event Updation Successful`);
      }

      setTimeout(() => {
        router.push('/adminPanel');
      }, 2000);
    }
  };

  return (
    <div className={styles.background}>
      <Head>
        <title>Pecfest 2022|Admin Panel</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Container>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '1em',
            margin: 'auto',
            marginTop: 8,
          }}
        >
          <Typography variant="h3" className={styles.pageheader}>
            Edit Event Details
          </Typography>
        </Box>
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { mt: 1 },
            backgroundColor: 'rgba(255, 255, 255, 0.5)',
            backdropFilter: 'blur(25px)',
            marginTop: '10px',
            padding: '10px',
            borderRadius: '5px',
            marginBottom: '10px',
          }}
          autoComplete="off"
          onSubmit={handleEventSubmit}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <TextField
                name="eventName"
                required
                fullWidth
                id="eventName"
                label="Event Name"
                autoFocus
                onChange={(e) => handleEventChange(e)}
                value={eventName}
                inputProps={{ maxLength: 50 }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                  label="Event Start Date and Time"
                  value={eventStart}
                  onChange={(e) => handleEventChange(e, 0)}
                  renderInput={(params) => (
                    <TextField
                      name="eventStart"
                      required
                      fullWidth
                      {...params}
                    />
                  )}
                />
                {dateError && (
                  <FormHelperText>
                    Event should start before it ends 😐
                  </FormHelperText>
                )}
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} sm={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                  label="Event End Date and Time"
                  value={eventEnd}
                  onChange={(e) => handleEventChange(e, 1)}
                  renderInput={(params) => (
                    <TextField name="eventEnd" fullWidth {...params} />
                  )}
                />
                {dateError && (
                  <FormHelperText>
                    Event should end after it starts 😐
                  </FormHelperText>
                )}
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl disabled fullWidth>
                <InputLabel id="demo-simple-select-label">Type</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={eventType}
                  label="Type"
                  name="eventType"
                  onChange={handleEventChange}
                >
                  <MenuItem value={`INDIVIDUAL`}>Individual</MenuItem>
                  <MenuItem value={`TEAM`}>Team</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={eventCategory}
                  label="Category"
                  name="eventCategory"
                  onChange={handleEventChange}
                >
                  <MenuItem value={`CULTURAL`}>Cultural</MenuItem>
                  <MenuItem value={`MEGASHOWS`}>Mega Shows</MenuItem>
                  <MenuItem value={`TECHNICAL`}>Technical</MenuItem>
                  <MenuItem value={`WORKSHOPS`}>Workshops</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Sub-Category
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={eventCategorySubType}
                  label="Sub-Category"
                  name="eventSubCategory"
                  onChange={handleEventChange}
                >
                  <MenuItem value={`DANCE`}>Dance</MenuItem>
                  <MenuItem value={`MUSIC`}>Music</MenuItem>
                  <MenuItem value={`CODING`}>Coding</MenuItem>
                  <MenuItem value={`HARDWARE`}>Hardware</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                onChange={(e) => handleEventChange(e)}
                label="Event Venue"
                name="eventVenue"
                value={eventVenue}
                inputProps={{ maxLength: 25 }}
              />
            </Grid>
            {eventType == `TEAM` && (
              <Grid item xs={6} sm={3}>
                <TextField
                  disabled
                  required
                  fullWidth
                  type={'number'}
                  label="Min Team Size"
                  onChange={(e) => handleEventChange(e)}
                  name="minTeamSize"
                  value={minTeamSize}
                />
              </Grid>
            )}
            {eventType == `TEAM` && (
              <Grid item xs={6} sm={3}>
                <TextField
                  disabled
                  required
                  fullWidth
                  type={'number'}
                  label="Max Team Size"
                  onChange={(e) => handleEventChange(e)}
                  name="maxTeamSize"
                  value={maxTeamSize}
                />
              </Grid>
            )}
            <Grid item xs={12} sm={12}>
              <TextField
                fullWidth
                onChange={(e) => handleEventChange(e)}
                label="Link to the Rulebook"
                name="rulesLink"
                value={rulesLink}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                fullWidth
                multiline
                label="Event Description"
                minRows={12}
                maxRows={12}
                required
                onChange={(e) => handleEventChange(e)}
                name="eventDescription"
                value={eventDescription}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                type={'text'}
                label="Point of Contact Name"
                onChange={(e) => handleEventChange(e)}
                name="pocName"
                value={pocName}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                type={'number'}
                label="Point of Contact Number"
                onChange={(e) => handleEventChange(e)}
                name="pocNumber"
                value={pocNumber}
              />
            </Grid>
            <Grid item sm={6}>
              <InputLabel id="google-map-label">Uploaded Image</InputLabel>
              <Image
                width={400}
                height={400}
                src={eventInfo.image_url}
                alt="Poster"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <DropzoneArea
                acceptedFiles={['image/*']}
                dropzoneText={'Change Event Poster'}
                filesLimit={1}
                Icon={UploadFileIcon}
                maxFileSize={204800}
                onChange={(e) => handleEventChange(e)}
                name="eventPoster"
                clearOnUnmount
                key={dropzoneKey}
              />
              {imgDimError && (
                <Alert severity="warning">
                  Please Upload Posters In A 1:1 Aspect Ratio
                </Alert>
              )}
            </Grid>
            <Grid item xs={12} sm={12}>
              <Button fullWidth variant="contained" type="submit">
                Edit Event
              </Button>
            </Grid>
          </Grid>
        </Box>
        <Snackbar
          open={eventCreationStatus}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
        >
          <Alert
            onClose={handleSnackbarClose}
            severity="success"
            sx={{ width: '100%' }}
          >
            {eventCreationStatus}
          </Alert>
        </Snackbar>
      </Container>
    </div>
  );
};

export default EditEvent;

export async function getServerSideProps(context) {
  const { data } = getServerCookieData(context);

  if (data == null) {
    return {
      redirect: {
        permanent: false,
        destination: '/',
      },
    };
  }

  const { token } = data;

  const eventId = context.params.event_id;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API}events/${eventId}`,
    {
      method: `GET`,
      headers: {
        Authorization: `Token ${token}`,
      },
    }
  );

  if (!res || res.status != 200) {
    return {
      props: {
        status: res.status,
        error: true,
      },
    };
  }
  const eventInfo = await res.json();

  return {
    props: {
      eventInfo: eventInfo,
      status: res.status,
      error: false,
      user_token: token,
    },
  };
}
