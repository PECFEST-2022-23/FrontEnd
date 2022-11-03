const redirectToLogin = ({ router }) => {
  const currentPath = router.pathname;
  sessionStorage.setItem('redirectPath', currentPath);
  router.push('/login');
};

export default redirectToLogin;
