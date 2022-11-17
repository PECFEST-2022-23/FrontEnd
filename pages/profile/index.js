import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { toast } from 'react-toastify';
import Head from 'next/head';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useRouter } from 'next/router';
import styles from './Profile.module.css';
import Cookies from 'universal-cookie';
import getServerCookieData from '../../lib/auth/getServerCookieData';
import { useSession } from 'next-auth/react';
import validator from 'validator';

export default function Profile() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const cookies = new Cookies();
  let sessdata = '';
  if (session) {
    sessdata = session;
  } else {
    sessdata = cookies.get('session-token');
  }
  const [collegeName, setCollegeName] = useState();
  const [contact, setContact] = useState();
  const [update, setUpdate] = useState(false);
  useEffect(() => {
    (async () => {
      if (sessdata) {
        const res = await fetch(
          process.env.NEXT_PUBLIC_BACKEND_API + 'auth/profile/',
          {
            method: 'GET',
            headers: {
              Authorization: `Token ${sessdata.token}`,
            },
          }
        ).then((res) => res.json());
        if (res.message == "Additional Details doesn't exist") {
          toast.info('Update Additional details');
          return;
        }
        setCollegeName(res.college);
        setContact(res.mobile);
        setUpdate(true);
      }
    })();
  }, []);

  const handleEventChange = (e) => {
    const target_name = e.target.name;
    const target_value = e.target.value;
    switch (target_name) {
      case 'college':
        setCollegeName(target_value);
        break;
      case 'contact':
        setContact(target_value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formdata = new FormData(event.currentTarget);
    if (!validator.isMobilePhone(formdata.get('contact'))) {
      toast.error('Please enter valid Contact Number');
      return;
    }
    if (formdata.get('college') == '') {
      toast.error('Please enter College Name');
      return;
    }
    if (update) {
      const res = await fetch(
        process.env.NEXT_PUBLIC_BACKEND_API + 'auth/profile/',
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${sessdata.token}`,
          },
          body: JSON.stringify({
            college: formdata.get('college'),
            mobile: formdata.get('contact'),
          }),
        }
      ).then((res) => res.json());
      if (res.message === 'Additional Details updated') {
        toast.info(res.message);
        router.push('/');
      } else toast.error(res.message);
    } else {
      const res = await fetch(
        process.env.NEXT_PUBLIC_BACKEND_API + 'auth/profile/',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${sessdata.token}`,
          },
          body: JSON.stringify({
            college: formdata.get('college'),
            mobile: formdata.get('contact'),
          }),
        }
      ).then((res) => res.json());
      if (res.message === 'Additional Details added') {
        cookies.set('isCompleted', 'true');
        toast.info(res.message);
        router.push('/');
      } else toast.error(res.message);
    }
  };

  return (
    <div className={styles.main}>
      <Head>
        <title>Pecfest 2022|Profile</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <Container component="main" maxWidth="xs" className={styles.main__frame}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5" className={styles.pageheader}>
            Profile
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 1 }}
            id="profile_form"
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="college"
                  label="College"
                  name="college"
                  autoComplete="college"
                  autoFocus
                  onChange={(e) => handleEventChange(e)}
                  value={collegeName}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="contact"
                  label="Contact Number"
                  name="contact"
                  autoComplete="contact"
                  autoFocus
                  onChange={(e) => handleEventChange(e)}
                  value={contact}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Update Profile
            </Button>
          </Box>
        </Box>
      </Container>
    </div>
  );
}

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
  return {
    props: {},
  };
}
