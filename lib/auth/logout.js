import { useSession, signOut } from 'next-auth/react';

const logout = async ({ router }) => {
  const { data: session } = useSession();

  const redirectPath = sessionStorage.getItem('redirectPath') || '/login';
  sessionStorage.removeItem('redirectPath');
  localStorage.removeItem('user');
  localStorage.removeItem('token');

  const res = await fetch(
    process.env.NEXT_PUBLIC_BACKEND_API + 'auth/logout/',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  ).then((res) => res.json());

  if (session) signOut();

  router.push(redirectPath);
  return res;
};

export default logout;
