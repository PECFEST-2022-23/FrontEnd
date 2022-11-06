import Cookies from 'universal-cookie';

const redirectToLogin = ({ router }) => {
  const cookies = new Cookies();
  const currentPath = router.pathname;
  cookies.set('redirectPath', currentPath);
  router.push('/login');
};

export default redirectToLogin;
