import * as React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import validator from 'validator';
import styles from './ResetPassword.module.css';
import Head from 'next/head';

export default function ResetPassword() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (
      !validator.isEmail(email) ||
      !validator.isStrongPassword(password) ||
      confirmPassword !== password
    ) {
      toast.error('Please enter valid values');
      return;
    }
    const data = new FormData(event.currentTarget);
    const res = await fetch(
      process.env.NEXT_PUBLIC_BACKEND_API + 'auth/register',
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: data.get('email'),
          password: data.get('password'),
        }),
      }
    ).then((res) => res.json());
    toast.info(res.message);

    router.push('/login');
  };

  return (
    <div className={styles.main}>
      <Head>
        <title>Pecfest 2022|Reset Password</title>
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
            Reset password
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
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
                  label="New Password"
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
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Confirm Password"
                  type="password"
                  id="confirm-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  error={confirmPassword !== password}
                  helperText={
                    confirmPassword !== password
                      ? 'Must match the new password'
                      : ''
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
              Reset
            </Button>
          </Box>
        </Box>
      </Container>
    </div>
  );
}
