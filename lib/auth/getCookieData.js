import Cookies from 'universal-cookie';

const getCookieData = (session) => {
  const cookies = new Cookies();
  let data = cookies.get('session-token');
  if (session) data = session;
  const redirectPath = cookies.get('redirectPath') || '/';
  const isProfileCompleted = cookies.get('isCompleted') || 'false';
  console.log(cookies.get('isCompleted'));
  return { data, redirectPath, isProfileCompleted };
};

export default getCookieData;
