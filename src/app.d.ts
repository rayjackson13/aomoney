import UserType from './types/common';

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
  interface Locals {
    sessionId: string,
    user: UserType,
  }

  // interface Platform {}

  // interface PrivateEnv {}

  // interface PublicEnv {}

  interface Session {
    user: UserType,
  }

  // interface Stuff {}
}
