import { signOut } from 'next-auth/react';
import Cookies from 'universal-cookie';

const logout = async (router, session) => {
  const cookies = new Cookies();
  const redirectPath = router.pathname;

  let data = '';
  if (session) {
    console.log('session', session);
    data = session;
    signOut();
  } else {
    data = cookies.get('session-token');
    console.log('data', data);
    cookies.remove('redirectPath');
    cookies.remove('session-token');
  }

  const res = await fetch(
    process.env.NEXT_PUBLIC_BACKEND_API + 'auth/logout/',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${data.token}`,
      },
    }
  ).then((res) => res.json());

  router.push(redirectPath);
  return res;
};

export default logout;
