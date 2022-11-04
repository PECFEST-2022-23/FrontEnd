import { decrypt } from './enctryption';
import Cookies from 'universal-cookie';

const getCookieData = (context) => {
  const cookies = new Cookies(context.req.headers.cookie);
  const user = JSON.parse(decrypt(cookies.get('user')));
  const token = JSON.parse(decrypt(cookies.get('token')));
  const redirectPath = decrypt(cookies.get('redirectPath')) || '/';
  return { user, token, redirectPath };
};

export default getCookieData;
