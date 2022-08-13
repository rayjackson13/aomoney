import type { GetSession, Handle } from "@sveltejs/kit";
import Cookie from 'cookie';

import type { App } from "./app";
import { FirebaseHelper } from "./helpers/firebase";

export const handle: Handle = async ({ event, resolve }) => {
  const { url, request } = event;
  const { headers } = request;
  const cookies = Cookie.parse(headers.get('cookie') || '');
  
  (event.locals as App.Locals).sessionId = cookies.sessionId;

  if (url.pathname.startsWith('/sheet')) {
    return resolve(event, { ssr: false });
  }
  return resolve(event);
};

export const getSession: GetSession = async (event) => {
  const { sessionId } = event.locals as App.Locals;
  FirebaseHelper.initialize();
  const user = await FirebaseHelper.findUser(sessionId);
  if (!user)  return {};
  
  return { user };
};
