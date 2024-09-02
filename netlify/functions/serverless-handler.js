// serverless-handler.js
import app from '../../source/app.js'; // Importing the existing app logic

// Serverless function handler
export const handler = async (event) => {
  const headers = {
    'Cache-Control': 'public, max-age=86400, s-maxage=31536000, stale-while-revalidate=604800',
  };

  // Handling only GET requests
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 404,
      headers,
      body: JSON.stringify({ status: 404 }),
    };
  }

  // Simulating the request and response objects for serverless
  const request = {
    method: event.httpMethod,
    query: event.queryStringParameters || {},
  };

  // Mocking a response object
  let response = {
    headers: {},
    status: 200,
    body: '',
    setHeader(name, value) {
      this.headers[name] = value;
    },
    status(statusCode) {
      this.status = statusCode;
      return this;
    },
    send(body) {
      this.body = typeof body === 'object' ? JSON.stringify(body) : body;
      return this;
    },
  };

  // Invoking the existing app function
  await app(request, response);

  // Constructing the serverless response
  return {
    statusCode: response.status || 200,
    headers: { ...headers, ...response.headers },
    body: response.body,
  };
};
