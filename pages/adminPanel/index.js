import { useEffect, useState } from 'react';
import {
  Container,
  Box,
  CssBaseline,
  Typography,
  Button,
  Grid,
} from '@mui/material';
import Head from 'next/head';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import { useSession } from 'next-auth/react';
import getCookieData from '../../lib/auth/getCookieData';
import getServerCookieData from '../../lib/auth/getServerCookieData';
import styles from './adminPanel.module.css';

import EventDialog from '../../Components/EventDialog/EventDialog';
import EventCard from '../../Components/EventCard/EventCard';

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
  const event_list = props.evts;

  const handleAddEventOpen = () => {
    setEventDialogOpen(true);
  };

  const handleAddEventClose = () => {
    setEventDialogOpen(false);
  };

  return (
    <div className={styles.background}>
      <Head>
        <title>Admin Panel</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Container component={`main`}>
        <CssBaseline />
        <Box
          sx={{
            // maxWidth: '440px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '1em',
            margin: 'auto',
            marginTop: 8,
          }}
        >
          <Typography
            sx={{ width: `100%`, textAlign: `center` }}
            variant={`h5`}
            className={styles.pageheader}
          >
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
                  event_name={curr_event.name}
                  id={idx}
                  image={curr_event.image_url}
                  event_id={curr_event.id}
                />
              </div>
            ))}
        </Grid>
      </Container>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { data } = getServerCookieData(context);
  if (data == null || data.user == null || data.user.is_staff == false) {
    return {
      redirect: {
        permanent: false,
        destination: '/',
      },
    };
  }
  const { token } = data;
  const events = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}club/`, {
    method: `GET`,
    headers: {
      Authorization: `Token ${token}`,
    },
  }).then((res) => res.json());

  return {
    props: {
      evts: events,
    },
  };
}
