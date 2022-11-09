import { useRouter } from 'next/router';
import styles from './Notify.module.css';
import globalStyles from '../../../styles/Home.module.css';
import Button from '@mui/material/Button';

export default function Notify() {
  const router = useRouter();
  const { type, status } = router.query;

  function toTitleCase(str) {
    if (typeof str === 'string')
      return str.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      });
    return 'Error';
  }

  let msg = '';
  let redirectPath = '/';
  let buttonText = 'Home';
  if (type === 'password-reset') {
    msg =
      status === 'successfull'
        ? 'Password succesfully updated, kindly login with new password.'
        : 'Link for reseting password was expired, kindly try to reset password again.';
    redirectPath = status === 'successfull' ? '/login' : '/reset-password';
    buttonText = status === 'successfull' ? 'Login' : 'Reset Password';
  } else if (type === 'verification') {
    msg =
      status === 'verified'
        ? 'Your email was successfully verified. Please Login.'
        : 'Link for verification was expired, kindly try to Login again to send a new verification link.';
    redirectPath = '/login';
    buttonText = 'Login';
  }

  return (
    <div className={styles.main}>
      <div className={`${globalStyles.festThemeBlur} ${styles.alignCenter}`}>
        <h1 className={styles.title}>{toTitleCase(status)}</h1>
        <p className={styles.msg}>{msg}</p>

        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          className={styles.btn}
          onClick={() => router.push(redirectPath)}
        >
          {buttonText}
        </Button>
      </div>
    </div>
  );
}
