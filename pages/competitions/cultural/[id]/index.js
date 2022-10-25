import { Grid } from '@mui/material';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Box, shadows, textAlign } from '@mui/system';
import CardHeader from '@mui/material/CardHeader';

const EventDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const eventDetails = {
    poster:
      'https://instagram.fixc1-4.fna.fbcdn.net/v/t51.2885-15/311841280_614547173705772_6012393022881994115_n.jpg?stp=dst-jpg_e35&_nc_ht=instagram.fixc1-4.fna.fbcdn.net&_nc_cat=100&_nc_ohc=3RJc1avr6iYAX_tr7yb&edm=ALQROFkBAAAA&ccb=7-5&ig_cache_key=Mjk1MTg4ODU5MDYwODI4ODg1Ng%3D%3D.2-ccb7-5&oh=00_AT_bXr1aFb6Edr3ttogkBaOPqHWjThyLF8fXEobsSuQAEw&oe=635C5C0F&_nc_sid=30a2ef',
    name: 'Lorem Ipsum',
    desc: `Hi, Sports enthusiasts 👋\n We are back with the first sports event- MARATHON 🏃‍♂️🏃‍♀️\n 92.7 FM Chandigarh is organising Chandigarh Marathon season-7 on 2nd October, 2022 (Sunday) at Chandigarh Club from 6 am till 9am.\n To promote this event, PEC is organising a session on 28 September, 2022 (Wednesday) in the PEC Auditorium at 5pm. An RJ from BIG FM will be conducting some exciting activities after the session, such as Skipping, pushups, etc. \n Goodies and gift vouchers will be provided to the attendees.🎁 \n Everybody is encouraged to attend this event and contribute to the cause. \n See you all.\n  For any queries contact:\n Anubhav Tuknayat- 7011015656\n Ayushi Bagga- 9876753080`,
    id: id,
    date: '29th October 2001, 5:30 PM',
    location: 'Cyber Security center 2nd floor sector 15, Chandigarh',
    isRegisterationOpen: true,
    rulebookUrl:
      'https://i.picsum.photos/id/237/536/354.jpg?hmac=i0yVXW1ORpyCZpQ-CknuyV-jbtU7_x9EBQVhvT5aRr0',
    isTeamEvent: true,
  };
  return (
    <div style={{ margin: '30px' }}>
      <Grid container spacing={2} direction="row-reverse">
        <Grid
          item
          xs={12}
          md={6}
          style={{
            position: 'relative',
            height: '80vh',
            margin: 'auto',
          }}
        >
          <Image
            priority
            layout="fill"
            alt="Cultural Image"
            src={eventDetails.poster}
          />
        </Grid>
        <Grid item xs={12} md={5} style={{ margin: '0 auto' }}>
          <Card>
            <CardHeader
              title={eventDetails.name}
              subheader={
                <span>
                  {eventDetails.date} <br />
                  {eventDetails.location}
                </span>
              }
            />
            <CardContent>
              <hr />
              <br />
              <br />
              <Typography variant="body2" style={{ textAlign: 'justify' }}>
                {eventDetails.desc}
                {/* <div style={{ textAlign: 'justify' }}>{eventDetails.desc}</div> */}
                <br />
              </Typography>
            </CardContent>
            <br />
            <CardActions>
              <a href={eventDetails.rulebookUrl}>
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
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default EventDetails;
