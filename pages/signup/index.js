import * as React from 'react';
import { useState } from 'react';
import Head from 'next/head';
import NextLink from 'next/link';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import styles from './Signup.module.css';
import getServerCookieData from '../../lib/auth/getServerCookieData';
import validator from 'validator';

export default function SignUp() {
  const router = useRouter();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (
      firstName === '' ||
      lastName === '' ||
      !validator.isEmail(email) ||
      !validator.isStrongPassword(password)
    ) {
      toast.error('Please enter valid values');
      return;
    }
    const data = new FormData(event.currentTarget);
    const res = await fetch(
      process.env.NEXT_PUBLIC_BACKEND_API + 'auth/register/',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: data.get('email'),
          password: data.get('password'),
          first_name: data.get('firstName'),
          last_name: data.get('lastName'),
        }),
      }
    ).then((res) => res.json());
    toast.info(res.message);
    router.push('/login');
  };

  return (
    <div className={styles.main}>
      <Head>
        <title>Pecfest 2022|SignUp</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <Container component="main" maxWidth="xs" className={styles.main__frame}>
        <CssBaseline />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5" className={styles.pageheader}>
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  error={firstName === ''}
                  helperText={firstName === '' ? 'Must not be empty' : ''}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  error={lastName === ''}
                  helperText={lastName === '' ? 'Must not be empty' : ''}
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  error={!validator.isEmail(email)}
                  helperText={
                    !validator.isEmail(email)
                      ? 'Please enter a valid email'
                      : ''
                  }
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  error={!validator.isStrongPassword(password)}
                  helperText={
                    !validator.isStrongPassword(password) ? (
                      <>
                        Please use a strong password <br />
                        Must contain a lower case character, an upper case
                        character, a number and a symbol <br /> Must have
                        minimum length of 8 character
                      </>
                    ) : (
                      ''
                    )
                  }
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              className={styles.btn}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <NextLink href={'/login'}>
                  <Link href="#" variant="body2" className={styles.links}>
                    Already have an account? Login
                  </Link>
                </NextLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { data } = getServerCookieData(context);
  if (data != null) {
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
