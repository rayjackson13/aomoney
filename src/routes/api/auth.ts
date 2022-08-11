import type { RequestHandler } from "@sveltejs/kit";
import * as Cookie from 'cookie';

import { FirebaseHelper } from "../../helpers/firebase";
import type { UserInfo } from "../../types/common";

export const POST: RequestHandler = async ({ request }) => {
  const user: UserInfo = await request.json();

  if (!user) {
    return {
      status: 422,
      body: {
        message: 'There was a problem with Firebase authentication.',
      },
    };
  }

  await FirebaseHelper.saveUser(user);

  const headers = {
    'Set-Cookie': Cookie.serialize('sessionId', user.accessToken, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7, // 7 days
      sameSite: 'lax',
      path: '/',
    })
  };

  return {
    status: 200,
    headers,
    body: {
      message: 'Authorisation successful.',
      user,
    }
  };
};
