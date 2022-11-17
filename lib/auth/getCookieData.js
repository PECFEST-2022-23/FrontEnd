import Cookies from 'universal-cookie';

const getCookieData = (session) => {
  const cookies = new Cookies();
  let data = cookies.get('session-token');
  if (session) data = session;
  const redirectPath = cookies.get('redirectPath') || '/';
  const isProfileCompleted = cookies.get('isProfileCompleted') || 'false';
  return { data, redirectPath, isProfileCompleted };
};

export default getCookieData;
