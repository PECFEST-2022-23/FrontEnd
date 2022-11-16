import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
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
import { DropzoneArea } from 'mui-file-dropzone';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { DateTimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import styles from './EventDialog.module.css';

const EventDialog = ({ onClose, open, user_token }) => {
  const defaultMapProps = {
    center: {
      lat: 30.76830387478322,
      lng: 76.7867558814253,
    },
    zoom: 11,
  };

  const [eventName, setEventName] = useState();
  const [eventStart, setEventStart] = useState(
    new Date(`2022-11-25T00:00:00Z`)
  );
  const [eventEnd, setEventEnd] = useState(new Date(`2022-11-28T00:00:00Z`));
  const [eventVenue, setEventVenue] = useState();
  const [minTeamSize, setMinTeamSize] = useState();
  const [maxTeamSize, setMaxTeamSize] = useState();
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
  const [teamSizeError, setTeamSizeError] = useState();
  const [isLoading, setIsLoading] = useState(false);

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
          if (maxTeamSize && maxTeamSize < target_value) {
            setTeamSizeError(true);
          } else {
            setTeamSizeError(false);
          }
          setMinTeamSize(target_value);
          break;
        case 'maxTeamSize':
          if (minTeamSize && Number(minTeamSize) > Number(target_value)) {
            setTeamSizeError(true);
          } else {
            setTeamSizeError(false);
          }
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
    setRulesLink();
  };

  const handleEventSubmit = async (e) => {
    e.preventDefault();
    if (!dateError && !teamSizeError && eventPoster) {
      // make POST request

      setIsLoading(true);

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
      if (rulesLink && rulesLink.trim() !== '') {
        formData.append(`rulebook_url`, rulesLink);
      }

      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}club/`, {
        method: `POST`,
        headers: {
          Authorization: `Token ${user_token}`,
        },
        body: formData,
      });

      setIsLoading(false);

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
        Add a New Event
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
                  MenuProps={{ PaperProps: { sx: { maxHeight: 200 } } }}
                >
                  <MenuItem value={`DANCE`}>Dance</MenuItem>
                  <MenuItem value={`MUSIC`}>Music</MenuItem>
                  <MenuItem value={`CODING`}>Coding</MenuItem>
                  <MenuItem value={`HARDWARE`}>Hardware</MenuItem>
                  <MenuItem value={`ART`}>Art</MenuItem>
                  <MenuItem value={`PHOTOGRAPHY`}>Photography</MenuItem>
                  <MenuItem value={`CINEMATOGRAPHY`}>Cinematography</MenuItem>
                  <MenuItem value={`LITERARY`}>Literary</MenuItem>
                  <MenuItem value={`QUIZ`}>Quiz</MenuItem>
                  <MenuItem value={`DRAMATICS`}>Dramatics</MenuItem>
                  <MenuItem value={`GAMING`}>Gaming</MenuItem>
                  <MenuItem value={`FUN`}>Fun</MenuItem>
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
            {eventType == `TEAM` && teamSizeError && (
              <Grid item>
                <Alert severity="error">
                  Min Team Size should be less than Max Team Size. 😐
                </Alert>
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
              <DropzoneArea
                acceptedFiles={['image/*']}
                dropzoneText={'Attach Event Poster'}
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
            <Grid item xs={12} sm={12}>
              <Button fullWidth variant="contained" type="submit">
                {!isLoading ? (
                  `Add Event`
                ) : (
                  <RestartAltIcon className={styles.loader} />
                )}
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

export default EventDialog;
