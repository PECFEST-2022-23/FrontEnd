export default async function handler(req, res) {
  const { token } = req.query;
  const backendRes = await fetch(
    process.env.NEXT_PUBLIC_BACKEND_API + '/auth/verify/reset-pass',
    {
      method: 'POST',
      body: JSON.stringify({ token: token }),
    }
  ).then((res) => res.json());
  if (backendRes.message === 'password changed') {
    res.redirect(307, '/notify/password-reset/successfull');
  } else {
    res.redirect(307, '/notify/password-reset/timeout');
  }
}
