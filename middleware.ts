import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
  '/market(.*)',
  '/studio(.*)',
  '/publish(.*)',
  '/history(.*)',
  '/settings(.*)',
  '/api/(.*)',
]);

export default clerkMiddleware(async (auth, req) => {
  // Exclude webhook routes from protection
  if (req.nextUrl.pathname.startsWith('/api/webhooks')) {
    return;
  }

  if (isProtectedRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
