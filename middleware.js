import { NextResponse } from 'next/server';

export async function middleware(request) {
  const res = await fetch(
    process.env.NEXT_PUBLIC_BACKEND_API + '/user-status',
    {
      method: 'GET',
    }
  ).then((res) => res.json());
  if (res.message === 'verified') {
    if (
      request.nextUrl.pathname.startsWith('/login') ||
      request.nextUrl.pathname.startsWith('/register')
    )
      return NextResponse.rewrite(new URL('/', request.url));
  } else if (res.message === 'incomplete') {
    request.nextUrl.pathname.startsWith('/profile');
  } else {
  }
}
