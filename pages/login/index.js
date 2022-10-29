import NextLink from 'next/link';
import { toast } from 'react-toastify';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import styles from './Login.module.css';
import { useRouter } from 'next/router';
import { useSession, signIn, signOut } from 'next-auth/react';
import { encrypt } from '../../lib/auth/enctryption';
import getAuthData from '../../lib/auth/getAuthData';

export default function Login() {
  const router = useRouter();
  const { data: session } = useSession();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const res = await fetch(
      process.env.NEXT_PUBLIC_BACKEND_API + '/auth/login/',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: data.get('email'),
          password: data.get('password'),
        }),
      }
    ).then((res) => res.json());
    if (res.user_status === '1') {
      if (res.message === 'Please Verify the link sent on your email')
        toast.info(res.message);
      else toast.error(res.message);
      const form = document.getElementById('login_form');
      form.reset();
    } else {
      toast.success('Login successful.');
      const user = res.user,
        token = res.token;
      localStorage.setItem('user', encrypt(JSON.stringify(user)));
      localStorage.setItem('token', encrypt(JSON.stringify(token)));
      router.push('/');
    }
  };

  if (session)
    return (
      <div>
        <p>Welcome {JSON.stringify(session.user)}</p>{' '}
        <Button onClick={() => signOut()}>Logout</Button>
      </div>
    );
  else
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
            id="login_form"
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>

            <Grid
              container
              spacing={0}
              direction="column"
              alignItems="center"
              justifyContent="center"
              style={{ minHeight: '40px' }}
            >
              <Grid item xs={3}>
                <Button
                  onClick={() => signIn('google')}
                  className={styles.google_btn}
                >
                  Sign In With Google
                </Button>
              </Grid>
            </Grid>

            <Grid container>
              <Grid item>
                <NextLink href={'/signup'}>
                  <Link variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </NextLink>
              </Grid>
              <Grid item>
                <NextLink href={'/reset-password'}>
                  <Link variant="body2">
                    {'Forgot Password? Reset password'}
                  </Link>
                </NextLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    );
}
