import type { GetSession, Handle } from "@sveltejs/kit";
import Cookie from 'cookie';

import type { App } from "./app";
import { FirebaseHelper } from "./helpers/FirebaseHelper";

export const handle: Handle = async ({ event, resolve }) => {
  const { headers } = event.request;
  const { sessionId = undefined } = Cookie.parse(headers.get('cookie') || '');
  if (sessionId) {
    const user = await FirebaseHelper.findUser(sessionId);
    (event.locals as App.Locals).user = user;
  }

  return resolve(event);
};

export const getSession: GetSession = async (event) => {
  const { user } = event.locals as App.Locals;
  return user ? { user } : {};
};
