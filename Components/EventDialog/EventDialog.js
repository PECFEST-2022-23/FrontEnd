import { useState } from 'react';
import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  Grid,
  TextField,
  FormHelperText,
  FormControl,
  InputLabel,
  Button,
  Select,
  MenuItem,
} from '@mui/material';
import { DropzoneArea } from 'mui-file-dropzone';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { DateTimePicker } from '@mui/x-date-pickers';
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
    eventCategoryOne: '',
    eventCategoryTwo: '',
  };

  const [event, setEvent] = useState(eventObj);
  const [dateError, setDateError] = useState(false);

  const handleEventChange = (e, type) => {
    if ('$d' in e) {
      if (type == 0) {
        if (e['$d'] > event.eventEnd) {
          setDateError(true);
        } else {
          setDateError(false);
        }
        if (!dateError) {
          setEvent({
            ...event,
            eventStart: e['$d'],
          });
        }
      } else {
        if (e['$d'] < event.eventStart) {
          setDateError(true);
        } else {
          setDateError(false);
        }
        if (!dateError) {
          setEvent({
            ...event,
            eventEnd: e['$d'],
          });
        }
      }
    } else if ('target' in e) {
      setEvent({
        ...event,
        [e.target.name]: e.target.value,
      });
    } else {
      setEvent({
        ...event,
        eventPoster: e[0],
      });
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
        setEvent({
          ...SampleData,
          eventStart: startDateTimeObj,
          eventEnd: endDateTimeObj,
        });
      })();
  }, [eventId, event]);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle sx={{ textAlign: 'center' }}>
        {eventId ? `Edit Event Details` : `Add a New Event`}
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
                value={event.eventName}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                  label="Event Start Date and Time"
                  value={event.eventStart}
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
                  value={event.eventEnd}
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
                value={event.eventVenue}
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
                value={event.minTeamSize}
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
                value={event.maxTeamSize}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                required
                fullWidth
                onChange={(e) => handleEventChange(e)}
                label="Link to the Rulebook"
                name="rulesLink"
                value={event.rulesLink}
              />
            </Grid>
            <Grid>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Age</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={age}
                  label="Age"
                  onChange={handleChange}
                >
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
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
                value={event.eventDescription}
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

export default EventDialog;
