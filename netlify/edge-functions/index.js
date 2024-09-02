// netlify/edge-functions/iconHandler.ts

export default async (request: Request) => {
  const url = new URL(request.url);

  // Handle /:iconSlug/:color?/:darkModeColor?/
  const match = url.pathname.match(/^\/([^/]+)(?:\/([^/]+))?(?:\/([^/]+))?\/?$/);
  
  if (match) {
    const [, iconSlug, color, darkModeColor] = match;

    // Example response logic
    return new Response(
      JSON.stringify({
        message: 'Icon Request',
        iconSlug,
        color: color || 'defaultColor',
        darkModeColor: darkModeColor || 'defaultDarkModeColor',
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  // Handle /api/index
  if (url.pathname === '/api/index') {
    return new Response(
      JSON.stringify({ message: 'API Index', status: 200 }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  // Fallback for unmatched routes
  return new Response('Not Found', { status: 404 });
};
