import { getSimpleIcon, getIconSvg } from './icon.js';

const app = async (event, context) => {
  // Set Cache-Control headers
  const headers = {
    'Cache-Control': 'public, max-age=86400, s-maxage=31536000, stale-while-revalidate=604800',
  };

  // Only allow GET requests
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 404,
      headers,
      body: JSON.stringify({ status: 404 }),
    };
  }

  // Extract query parameters
  const { iconSlug, color, darkModeColor, viewbox } = event.queryStringParameters || {};

  // Fetch the icon based on the slug
  const icon = getSimpleIcon(iconSlug);

  if (icon) {
    const iconSvg = getIconSvg(icon, color, darkModeColor, viewbox);
    // Set the content type for SVG
    headers['Content-Type'] = 'image/svg+xml';
    return {
      statusCode: 200,
      headers,
      body: iconSvg,
    };
  }

  // Icon not found
  return {
    statusCode: 404,
    headers,
    body: JSON.stringify({ status: 404 }),
  };
};

export { app as handler }; // Correctly export the handler for serverless
