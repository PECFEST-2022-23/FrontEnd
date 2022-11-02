export default async function handler(req, res) {
  const { token } = req.query;
  const backendRes = await fetch(
    process.env.NEXT_PUBLIC_BACKEND_API + 'auth/verify/',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token: token }),
    }
  ).then((res) => res.json());
  if (backendRes.message === 'Account Sucessfully Verified') {
    res.redirect(307, '/notify/verification/verified');
  } else {
    res.redirect(307, '/notify/verification/timeout');
  }
}
