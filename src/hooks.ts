import type { GetSession, Handle } from "@sveltejs/kit";
import Cookie from 'cookie';

import type { App } from "./app";
import { FirebaseHelper } from "./helpers/firebase";

export const handle: Handle = async ({ event, resolve }) => {
  const { headers } = event.request;
  const cookies = Cookie.parse(headers.get('cookie') || '');
  
  (event.locals as App.Locals).sessionId = cookies.sessionId;
  return resolve(event);
};

export const getSession: GetSession = async (event) => {
  const { sessionId } = event.locals as App.Locals;
  FirebaseHelper.initialize();
  const user = await FirebaseHelper.findUser(sessionId);
  if (!user)  return {};
  
  return { user };
};
