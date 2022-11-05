import {
  Typography,
  Button,
  Card,
  CardContent,
  CardActions,
  CardMedia,
  CardHeader,
} from '@mui/material';

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
        <Button variant="outlined" size="small">
          Delete Event
        </Button>
      </CardActions>
    </Card>
  );
};

export default EventCard;
