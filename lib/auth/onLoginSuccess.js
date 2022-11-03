const onLoginSuccess = ({ router }) => {
  const redirectPath = sessionStorage.getItem('redirectPath') || '/';
  sessionStorage.removeItem('redirectPath');
  router.push(redirectPath);
};

export default onLoginSuccess;
