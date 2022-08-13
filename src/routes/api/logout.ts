import type { RequestHandler } from "@sveltejs/kit";
import * as Cookie from 'cookie';
import parse from "date-fns/parse";

export const POST: RequestHandler = async () => {
  const headers = {
    'Set-Cookie': Cookie.serialize('sessionId', 'invalid', {
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
      expires: parse('1970-01-01', 'yyyy-MM-dd', new Date()),
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
