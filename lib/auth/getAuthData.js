import { decrypt } from './enctryption';

const getAuthData = () => {
  const user = JSON.parse(decrypt(localStorage.getItem('user')));
  const token = JSON.parse(decrypt(localStorage.getItem('token')));
  return { user, token };
};

export default getAuthData;
