import { useEffect, useState } from 'react';
import {
  Container,
  Box,
  CssBaseline,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  TextField,
  Grid,
  DialogContent,
  Input,
  FormHelperText,
  Card,
  CardContent,
  CardActions,
  CardMedia,
  CardHeader,
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

const EventDialog = ({ onClose, open, eventId }) => {
  const eventObj = {
    eventName: '',
    eventStart: Date(),
    eventEnd: Date(),
    eventVenue: '',
    minTeamSize: '',
    maxTeamSize: '',
    rulesLink: '',
    eventPoster: '',
    eventDescription: '',
  };

  const [eventName, setEventName] = useState();
  const [eventStart, setEventStart] = useState();
  const [eventEnd, setEventEnd] = useState();
  const [eventVenue, setEventVenue] = useState();
  const [minTeamSize, setMinTeamSize] = useState();
  const [maxTeamSize, setMaxTeamSize] = useState();
  const [rulesLink, setRulesLink] = useState();
  const [eventPoser, setEventPoster] = useState();
  const [eventDescription, setEventDescription] = useState();

  const [event, setEvent] = useState(eventObj);
  const [dateError, setDateError] = useState(false);

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
        default:
          break;
      }
    } else {
      setEventPoster(e[0]);
    }
  };

  const handleEventSubmit = (e) => {
    e.preventDefault();
    if (!dateError) {
      // make POST request
      console.log(event);
      setEvent(eventObj);
      onClose();
    }
  };

  useEffect(() => {
    // get data from backend for a particular event
    eventId &&
      (async () => {
        // tinker with date formats
        const startDateTimeObj = new Date(SampleData.eventStart * 1000);
        const endDateTimeObj = new Date(SampleData.eventEnd * 1000);
        setEventName(SampleData.eventName);
        setEventStart(startDateTimeObj);
        setEventEnd(endDateTimeObj);
        setEventVenue(SampleData.eventVenue);
        setMinTeamSize(SampleData.minTeamSize);
        setMaxTeamSize(SampleData.maxTeamSize);
        setRulesLink(SampleData.rulesLink);
        setEventDescription(SampleData.eventDescription);
      })();
  }, [eventId, event]);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
        {eventId ? `Edit Event Details` : `Add a New Event`}
        {eventId && (
          <Button>
            <DeleteOutlineIcon />
          </Button>
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
            <Grid item xs={12} sm={6}>
              <DropzoneArea
                acceptedFiles={['image/*']}
                dropzoneText={'Attach Event Poster'}
                filesLimit={1}
                Icon={UploadFileIcon}
                maxFileSize={10485760}
                onChange={(e) => handleEventChange(e)}
                name="eventPoster"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
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
            <Grid item xs={12} sm={12}>
              <Button fullWidth variant="contained" type="submit">
                {eventId ? `Edit Event` : `Add Event`}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

const EventCard = ({ id, openDialog }) => {
  // Design will be changed, This is a basic one
  return (
    <Card variant="outlined">
      <CardContent>
        <CardHeader>
          <Typography sx={{ fontSize: 20 }}>Event Name</Typography>
        </CardHeader>
        <CardMedia
          component="img"
          height="194"
          image="https://smaller-pictures.appspot.com/images/dreamstime_xxl_65780868_small.jpg"
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

const AdminPanel = () => {
  const [currentUser, setCurrentUser] = useState(
    "Speakers' Association and Study Circle"
  );
  const [eventDialogOpen, setEventDialogOpen] = useState(false);
  const [eventEditDialogOpen, setEventEditDialogOpen] = useState(false);

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
        <Typography variant={`h5`}>Events by: {currentUser}</Typography>
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
          eventId={null}
        />
      </Box>
      <Grid
        sx={{ mt: 8, justifyContent: 'center', gap: '2em', mb: 4 }}
        container
        fullWidth
      >
        {[1, 2, 3, 4, 5, 6].map((event, idx) => (
          <div key={idx}>
            <EventCard openDialog={handleEditEventOpen} id={idx} />
            <EventDialog
              open={eventEditDialogOpen}
              onClose={handleEditEventClose}
              eventId={idx}
            />
          </div>
        ))}
      </Grid>
    </Container>
  );
};

export default AdminPanel;
