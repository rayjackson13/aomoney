import type { RequestHandler } from "@sveltejs/kit";
import * as Cookie from 'cookie';

export const POST: RequestHandler = async () => {
  const headers = {
    'Set-Cookie': Cookie.serialize('sessionId', 'invalid', {
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
      expires: new Date(0),
    })
  };

  return {
    status: 200,
    headers,
    body: {
      message: 'Logged out successfully.',
    },
  };
};
