import NextAuth from 'next-auth/next';
import GoogleProvider from 'next-auth/providers/google';
import Cookies from 'universal-cookie';

const nextAuthOptions = (req, res) => {
  const cookies = new Cookies(req.headers.cookie);

  return {
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      }),
    ],
    callbacks: {
      async session({ session }) {
        session.user.first_name = session.user.name.split(' ')[0];
        session.user.last_name = session.user.name
          .split(' ')
          .slice(1)
          .join(' ');
        const userObj = {
          email: session.user.email,
          first_name: session.user.first_name,
          last_name: session.user.last_name,
        };
        const backendRes = await fetch(
          process.env.NEXT_PUBLIC_BACKEND_API + 'auth/oauth/',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(userObj),
          }
        ).then((backendRes) => {
          return backendRes.json();
        });
        session.token = backendRes.token;
        session.user = backendRes.user;
        return session;
      },

      async redirect({ baseUrl }) {
        const redirectPath = cookies.get('redirectPath') || '/';
        return baseUrl + redirectPath;
      },
    },
    secret: process.env.NEXTAUTH_SECRET,
  };
};

export default (req, res) => NextAuth(req, res, nextAuthOptions(req, res));
