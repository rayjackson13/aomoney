<script context="module" lang="ts">
  import { setContext } from "svelte";
  import type { Load } from "@sveltejs/kit";
  import { waitLocale } from 'svelte-i18n';

  import type { App } from "app";
  import { FirebaseHelper } from "helpers/FirebaseHelper";
  import 'lang/lang';

  export const preload = async () => {
    return await waitLocale();
  };

  export const load: Load = async ({ session, routeId }) => {
    await FirebaseHelper.initialize();

    if (routeId !== 'auth' && !(session as App.Session).user) {
      return { redirect: 'auth', status: 302 };
    }
 
    return {
      props: {
        session
      }
    };
  };
</script>

<script lang="ts">
  import { AppName } from "constants/defaults";

  export let session: App.Session;
  setContext('session', session);
</script>

<svelte:head>
  <title>{AppName}</title>
</svelte:head>

<slot />

<div id="modal-portal" />

<style>
  @import '../app.css';
</style>
