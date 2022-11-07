import { useEffect, useState } from 'react';
import {
  Container,
  Box,
  CssBaseline,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
  TextField,
  Grid,
  Input,
  FormHelperText,
  Card,
  CardContent,
  CardActions,
  CardMedia,
  CardHeader,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  Snackbar,
  Divider,
} from '@mui/material';
import { DropzoneArea } from 'mui-file-dropzone';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import { DateTimePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import SampleData from './sample.json';
import GoogleMapReact from 'google-map-react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { SignalCellularNullOutlined } from '@mui/icons-material';
import getCookieData from '../../lib/auth/getCookieData';
import getServerCookieData from '../../lib/auth/getServerCookieData';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

const EventDialog = ({ onClose, open, eventInfo, user_token }) => {
  const defaultMapProps = {
    center: {
      lat: 30.76830387478322,
      lng: 76.7867558814253,
    },
    zoom: 11,
  };

  const [eventName, setEventName] = useState(eventInfo ? eventInfo.name : null);
  const [eventStart, setEventStart] = useState(
    eventInfo ? eventInfo.startdatetime : `2022-11-25T00:00:00Z`
  );
  const [eventEnd, setEventEnd] = useState(
    eventInfo ? eventInfo.enddatetime : `2022-11-28T00:00:00Z`
  );
  const [eventVenue, setEventVenue] = useState(
    eventInfo ? eventInfo.venue : null
  );
  const [minTeamSize, setMinTeamSize] = useState(
    eventInfo ? eventInfo.min_team_size : 1
  );
  const [maxTeamSize, setMaxTeamSize] = useState(
    eventInfo ? eventInfo.max_team_size : 1
  );
  const [rulesLink, setRulesLink] = useState(
    eventInfo ? eventInfo.rulebook_url : null
  );
  const [eventPoster, setEventPoster] = useState(
    eventInfo ? eventInfo.image_url : null
  );
  const [eventDescription, setEventDescription] = useState(
    eventInfo ? eventInfo.description : null
  );
  const [eventType, setEventType] = useState(
    eventInfo ? eventInfo.type : `INDIVIDUAL`
  );
  const [eventCategory, setEventCategory] = useState(
    eventInfo ? eventInfo.category : `CULTURAL`
  );
  const [eventCategorySubType, setEventCategorySubType] = useState(
    eventInfo ? eventInfo.subcategory : `DANCE`
  );
  const [pocName, setPocName] = useState();
  const [pocNumber, setPocNumber] = useState();
  // work-around for file clear in dropzone
  const [dropzoneKey, setDropzoneKey] = useState(true);
  const [imgDimError, setImgDimError] = useState(false);

  const [dateError, setDateError] = useState(false);
  const [eventCreationStatus, setEventCreationStatus] = useState();
  const [delDialogOpen, setDelDialogOpen] = useState(false);

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

  const clearState = () => {
    setEventName();
    setEventStart();
    setEventEnd();
    setEventVenue();
    setMinTeamSize();
    setMaxTeamSize();
    setEventPoster();
    setEventDescription();
    setEventType();
    setEventCategory();
    setEventCategorySubType();
    setPocName();
    setPocNumber();
    setDropzoneKey();
    setImgDimError();
    setDateError();
    setEventCreationStatus();
    setRulesLink();
  };

  const handleDelDialogOpen = () => {
    setDelDialogOpen((prev => !prev));
  }

  const handleEventDelete = async (e) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API}club/${eventInfo.id}`,
      {
        method: `DELETE`,
        headers: {
          Authorization: `Token ${user_token}`,
        },
      }
    );

    const data = await res.json();

    window.location.reload();
  };

  const handleEventSubmit = async (e) => {
    e.preventDefault();
    if (!dateError) {
      // make POST request
      const formData = new FormData();
      formData.append(`name`, eventName);
      formData.append(`type`, eventType.toUpperCase());
      formData.append(`category`, eventCategory.toUpperCase());
      formData.append(`subcategory`, eventCategorySubType.toUpperCase());
      formData.append(
        `description`,
        `${eventDescription}\n\nPoint of Contact:\n${pocName}:${pocNumber}`
      );
      formData.append(`startdatetime`, eventStart.toISOString());
      formData.append(`enddatetime`, eventEnd.toISOString());
      formData.append(`venue`, eventVenue);
      formData.append(`min_team_size`, minTeamSize);
      formData.append(`max_team_size`, maxTeamSize);
      formData.append(`image_url`, eventPoster);
      formData.append(`latitude`, defaultMapProps.center.lat);
      formData.append(`longitude`, defaultMapProps.center.lng);
      formData.append(`rulebook_url`, rulesLink);

      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}club/`, {
        method: `POST`,
        headers: {
          Authorization: `Token ${user_token}`,
        },
        body: formData,
      });

      if (!res) {
        setEventCreationStatus(`FAILURE: Event Creation Failed.`);
      }

      const data = await res.json();

      if (data && data.event_id && data.message) {
        setEventCreationStatus(`SUCCESS: Event Creation Successful`);
      }

      setTimeout(() => {
        onClose();
        clearState();
        window.location.reload();
      }, 2000);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
        {eventInfo ? `Edit Event Details` : `Add a New Event`}
        {eventInfo && (
          <>
            <Button onClick={handleDelDialogOpen}>
              <DeleteOutlineIcon />
            </Button>
            <Dialog
              open={delDialogOpen}
              onClose={handleDelDialogOpen}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                Are you sure you want to delete this event?
              </DialogTitle>
              <DialogActions>
                <Button onClick={handleDelDialogOpen} autoFocus>No</Button>
                <Button onClick={handleEventDelete}>
                  Yes
                </Button>
              </DialogActions>
            </Dialog>
          </>
        )}
      </DialogTitle>
      <DialogContent>
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { mt: 1 },
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
              <FormControl fullWidth>
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
              />
            </Grid>
            {eventType == `TEAM` && (
              <Grid item xs={6} sm={3}>
                <TextField
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
                required
                fullWidth
                onChange={(e) => handleEventChange(e)}
                label="Link to the Rulebook"
                name="rulesLink"
                value={rulesLink}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <DropzoneArea
                acceptedFiles={['image/*']}
                dropzoneText={'Attach Event Poster'}
                filesLimit={1}
                Icon={UploadFileIcon}
                maxFileSize={2097152}
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
              />
            </Grid>
            <Grid item style={{ width: '100%' }}>
              <div style={{ height: '250px', width: '100%' }}>
                <InputLabel id="google-map-label">Select Location</InputLabel>
                <GoogleMapReact
                  bootstrapURLKeys={{
                    key: 'AIzaSyD5vRetEsh-ytb4Te898z89vWl6H_giTzI',
                  }}
                  defaultCenter={defaultMapProps.center}
                  defaultZoom={defaultMapProps.zoom}
                >
                  <AnyReactComponent
                    lat={59.955413}
                    lng={30.337844}
                    text="My Marker"
                  />
                </GoogleMapReact>
              </div>
            </Grid>
            <Grid item xs={12} sm={12}>
              <Button fullWidth variant="contained" type="submit">
                {eventInfo ? `Edit Event` : `Add Event`}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
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
    </Dialog>
  );
};

const EventCard = ({ id, openDialog, image, event_name }) => {
  return (
    <Card variant="outlined">
      <CardContent>
        <CardHeader
          titleTypographyProps={{ fontSize: `1rem`, textAlign: `center` }}
          title={event_name}
        ></CardHeader>
        <CardMedia
          component="img"
          height="194"
          image={`${process.env.NEXT_PUBLIC_BACKEND_API}${image}`}
          alt="Event Photo"
        />
      </CardContent>
      <CardActions sx={{ justifyContent: 'center' }}>
        <Button variant="contained" size="small" onClick={openDialog}>
          Edit Information
        </Button>
      </CardActions>
    </Card>
  );
};

export default function AdminPanel(props) {
  const [currentUser, setCurrentUser] = useState();
  const [currentToken, setCurrentToken] = useState();
  const { data: session } = useSession();
  useEffect(() => {
    const { data } = getCookieData(session);
    // const user = JSON.parse(decrypt(cookies.get('user')));
    // setUser(() => user);
    if (data) {
      setCurrentUser(() => data.user);
      setCurrentToken(() => data.token);
    }
  }, []);

  const [eventDialogOpen, setEventDialogOpen] = useState(false);
  const [eventEditDialogOpen, setEventEditDialogOpen] = useState(false);
  const event_list = props.evts;

  const handleAddEventOpen = () => {
    setEventDialogOpen(true);
  };

  const handleAddEventClose = () => {
    setEventDialogOpen(false);
  };

  const handleEditEventOpen = () => {
    setEventEditDialogOpen(true);
  };

  const handleEditEventClose = () => {
    setEventEditDialogOpen(false);
  };

  return (
    <Container component={`main`}>
      <CssBaseline />
      <Box
        sx={{
          maxWidth: '440px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: '1em',
          margin: 'auto',
          marginTop: 8,
        }}
      >
        <Typography sx={{ width: `100%`, textAlign: `center` }} variant={`h5`}>
          Events by: {currentUser && currentUser.first_name}
        </Typography>
        <Button
          sx={{ display: 'flex', gap: '1em', alignItems: 'center' }}
          variant={`contained`}
          onClick={handleAddEventOpen}
        >
          Add an Event <AddBoxOutlinedIcon />
        </Button>
        <EventDialog
          open={eventDialogOpen}
          onClose={handleAddEventClose}
          eventInfo={null}
          user_token={currentToken}
        />
      </Box>
      <Grid
        sx={{ mt: 8, justifyContent: 'center', gap: '2em', mb: 4 }}
        container
        fullWidth
      >
        {event_list &&
          event_list.map((curr_event, idx) => (
            <div key={idx}>
              <EventCard
                openDialog={handleEditEventOpen}
                event_name={curr_event.name}
                id={idx}
                image={curr_event.image_url}
              />
              <EventDialog
                open={eventEditDialogOpen}
                onClose={handleEditEventClose}
                eventInfo={curr_event}
                user_token={currentToken}
              />
            </div>
          ))}
      </Grid>
    </Container>
  );
}

export async function getServerSideProps(context) {
  const { data } = getServerCookieData(context);
  const { token } = data;

  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}club/`, {
    method: `GET`,
    headers: {
      Authorization: `Token ${token}`,
    },
  });

  if (!res || res.status != 200) {
    return {
      props: {
        status: res.status,
        error: true,
      },
    };
  }
  const events = await res.json();

  return {
    props: {
      evts: events,
      status: res.status,
      error: false,
    },
  };
}
