import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Head from 'next/head';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useRouter } from 'next/router';
import styles from './Profile.module.css';

export default function Profile() {
  const router = useRouter();
  const [collegeName, setCollegeName] = useState('');
  const [contactNumber, setContactNumber] = useState('');

  useEffect(() => {
    (async () => {
      const res = await fetch(
        process.env.NEXT_PUBLIC_BACKEND_API + '/profile',
        {
          method: 'GET',
        }
      ).then((res) => res.json());
      setCollegeName(res.collegeName);
      setContactNumber(res.contactNumber);
    })();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const res = await fetch(
      process.env.NEXT_PUBLIC_BACKEND_API + '/update-profile',
      {
        method: 'POST',
        body: JSON.stringify({
          college: data.get('college'),
          contact: data.get('contact'),
        }),
      }
    ).then((res) => res.json());
    if (res.message === 'success') {
      router.push('/');
    } else {
      router.push('/profile');
    }
  };

  return (
    <div className={styles.main}>
      <Head>
        <title>Profile</title>
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
                  value={collegeName}
                  onChange={(e) => setCollegeName(e.target.value)}
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
                  value={contactNumber}
                  onChange={(e) => setContactNumber(e.target.value)}
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
