// netlify/edge-functions/iconHandler.js

export default async (request) => {
  const url = new URL(request.url);

  // Match the dynamic route /:iconSlug/:color?/:darkModeColor?/
  const match = url.pathname.match(/^\/([^/]+)(?:\/([^/]+))?(?:\/([^/]+))?\/?$/);

  if (match) {
    // Rewrite the request to /api/index.js while keeping the original URL in the address bar
    return new URL('/api/index.js', request.url);
  }

  // Fallback: respond with a 404 if no match
  return new Response('Not Found', { status: 404 });
};
