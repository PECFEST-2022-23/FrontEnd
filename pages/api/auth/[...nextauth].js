import NextAuth from 'next-auth/next';
import GoogleProvider from 'next-auth/providers/google';
import { encrypt } from '../../../lib/auth/enctryption';
import Cookies from 'universal-cookie';

const nextAuthOptions = () => {
  const cookies = new Cookies();

  return {
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      }),
    ],
    callbacks: {
      async signIn({ profile }) {
        const user = {
          email: profile.email,
          first_name: profile.given_name,
          last_name: profile.family_name,
        };
        console.log(JSON.stringify(user));
        const backendRes = await fetch(
          process.env.NEXT_PUBLIC_BACKEND_API + 'auth/oauth/',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
          }
        ).then((backendRes) => backendRes.json());
        console.log(backendRes);
        if (backendRes.user_status === 1) {
          return false;
        } else {
          const user = backendRes.user,
            token = backendRes.token;
          cookies.set('user', encrypt(JSON.stringify(user)));
          cookies.set('token', encrypt(JSON.stringify(token)));
          return true;
        }
      },

      async redirect({ baseUrl }) {
        const url = baseUrl;
        return baseUrl;
      },
    },
  };
};

export default (req, res) => NextAuth(req, res, nextAuthOptions());
