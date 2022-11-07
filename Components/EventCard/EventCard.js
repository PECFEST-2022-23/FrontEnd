import {
  Button,
  Card,
  CardContent,
  CardActions,
  CardMedia,
  CardHeader,
} from '@mui/material';
import { useRouter } from 'next/router';

const EventCard = ({ id, openDialog, image, event_name, event_id }) => {
  const router = useRouter();

  const openEvent = () => {
    router.push(`/eventList/${event_id}`);
  };

  const openEditEvent = () => {
    router.push(`/adminPanel/${event_id}`);
  };

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
        <Button
          variant="contained"
          size="small"
          onClick={openDialog}
          id={id}
          onClick={openEditEvent}
        >
          Edit Information
        </Button>
        <Button
          variant="contained"
          name={`${event_id}`}
          size="small"
          onClick={openEvent}
        >
          View Event
        </Button>
      </CardActions>
    </Card>
  );
};

export default EventCard;
