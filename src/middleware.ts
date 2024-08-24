import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { updateSession } from '@/util/supabase/middleware';

const protectedRoutes = ['/dashboard'];

export async function middleware(request: NextRequest) {
  const { supabase, supabaseResponse } = await updateSession(request);

  // Check if the requested URL is a protected route
  if (protectedRoutes.includes(request.nextUrl.pathname)) {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    // If no user is found, redirect to the sign-in page
    if (!user) {
      const signInURL = new URL('/sign-in', request.nextUrl.origin);
      return NextResponse.redirect(signInURL);
    }
  }

  // If user is authenticated or the route is not protected, continue
  return supabaseResponse;
}

export const config = {
  matcher: ['/dashboard', '/((?!_next/static|_next/image|favicon.ico).*)'],
};
