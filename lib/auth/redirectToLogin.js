import Cookies from 'universal-cookie';
import { encrypt } from './enctryption';

const redirectToLogin = ({ router }) => {
  const cookies = new Cookies();
  const currentPath = router.pathname;
  cookies.set('redirectPath', encrypt(currentPath));
  router.push('/login');
};

export default redirectToLogin;
