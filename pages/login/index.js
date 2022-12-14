import NextLink from 'next/link';
import Head from 'next/head';
import { useEffect } from 'react';
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
import Cookies from 'universal-cookie';
import getServerCookieData from '../../lib/auth/getServerCookieData';
import validator from 'validator';

export default function Login() {
  const router = useRouter();
  const { data: session } = useSession();
  const cookies = new Cookies();

  useEffect(() => {
    if (session) router.push('/');
  }, [session]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (
      !validator.isEmail(data.get('email')) ||
      !validator.isStrongPassword(data.get('password'))
    ) {
      toast.error('Please enter valid email and password');
      return;
    }
    const res = await fetch(
      process.env.NEXT_PUBLIC_BACKEND_API + 'auth/login/',
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
        token = res.token,
        user_status = res.user_status;
      const data = { user: user, token: token, user_status: user_status };
      cookies.set('session-token', JSON.stringify(data));
      const redirectPath = cookies.get('redirectPath') || '/';
      cookies.remove('redirectPath');
      router.push(redirectPath);
    }
  };

  if (session) return <div></div>;
  else
    return (
      <div className={styles.main}>
        <Head>
          <title>Pecfest 2022|Login</title>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>

        <Container
          component="main"
          maxWidth="xs"
          className={styles.main__frame}
        >
          <CssBaseline />
          <Box
            sx={{
              marginTop: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography
              component="h1"
              variant="h5"
              className={styles.pageheader}
            >
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
                className={styles.btn}
              >
                Login
              </Button>

              <Button
                fullWidth
                variant="contained"
                onClick={() => signIn('google')}
                className={styles.google_btn}
              >
                Login With Google
              </Button>

              <Grid container sx={{ marginTop: 2 }}>
                <Grid item>
                  <NextLink href={'/signup'}>
                    <Link variant="body2" className={styles.links}>
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </NextLink>
                </Grid>
                <Grid item>
                  <NextLink href={'/reset-password'}>
                    <Link variant="body2" className={styles.links}>
                      {'Forgot Password? Reset password'}
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
