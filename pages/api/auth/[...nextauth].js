import NextAuth from 'next-auth/next';
import GoogleProvider from 'next-auth/providers/google';
import { toast } from 'react-toastify';

export default NextAuth({
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
      const res = await fetch(
        process.env.NEXT_PUBLIC_BACKEND_API + '/auth/register/',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: data.get('email'),
            password: data.get('password'),
            first_name: data.get('firstName'),
            last_name: data.get('lastName'),
          }),
        }
      ).then((res) => res.json());
      if (res.user_status === 1) {
        toast.error(res.message);
        return false;
      } else {
        const user = res.user,
          token = res.token;
        localStorage.setItem('user', encrypt(JSON.stringify(user)));
        localStorage.setItem('token', encrypt(JSON.stringify(token)));
        return true;
      }
    },

    async redirect({ url, baseUrl }) {
      return baseUrl;
      // Allows relative callback URLs
      if (url.startsWith('/')) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },
});
