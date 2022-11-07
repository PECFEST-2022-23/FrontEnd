export default async function handler(req, res) {
  const { token } = req.query;
  const backendRes = await fetch(
    process.env.NEXT_PUBLIC_BACKEND_API + 'auth/verify/reset-pass/',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token: token }),
    }
  ).then((res) => res.json());
  if (backendRes.message === 'Password Verified Successfully') {
    res.redirect(307, '/notify/password-reset/successfull');
  } else {
    res.redirect(307, '/notify/password-reset/timeout');
  }
}
