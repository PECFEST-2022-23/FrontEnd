import NextLink from 'next/link';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
<<<<<<< HEAD
import styles from './Login.module.css';
import { useRouter } from 'next/router';
import { useSession, signIn, signOut } from 'next-auth/react';

export default function Login() {
  const router = useRouter();
  const { data: session } = useSession();
=======
import { useRouter } from 'next/router';

export default function Login() {
  const router = useRouter();
>>>>>>> eb0403a31258d47abfa5b161e1e71e7b924f7ccd

  function onSignIn(googleUser) {
    var id_token = googleUser.getAuthResponse().id_token;
    var xhr = new XMLHttpRequest();
    xhr.open('POST', process.env.NEXT_PUBLIC_BACKEND_API + '/goolgeauth');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function () {
      if (xhr.responseText === 'success') {
        router.push('/');
      } else if (xhr.responseText === 'incomplete') {
        router.push('/profile');
      }
    };
    xhr.send(JSON.stringify({ token: id_token }));
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get;
    const res = await fetch(process.env.NEXT_PUBLIC_BACKEND_API + '/login', {
      method: 'POST',
      body: JSON.stringify({
        email: data.get('email'),
        password: data.get('password'),
      }),
    }).then((res) => res.json());
    if (res.message === 'success') {
      router.push('/');
    } else if (res.message === 'incomplete') {
      router.push('/profile');
    } else {
      router.push('/register');
    }
  };

<<<<<<< HEAD
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
            </Grid>
          </Box>
        </Box>
      </Container>
    );
=======
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
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
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
          <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            style={{ minHeight: '40px' }}
          >
            <Grid item xs={3}>
              <div className="g-signin2" data-onsuccess="onSignIn">
                Sign inSigned in
              </div>
            </Grid>
          </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <NextLink href={'/signup'}>
                <Link variant="body2">{"Don't have an account? Sign Up"}</Link>
              </NextLink>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
>>>>>>> eb0403a31258d47abfa5b161e1e71e7b924f7ccd
}
