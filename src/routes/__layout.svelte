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

  export const load: Load = async ({ session, routeId, url }) => {
    await FirebaseHelper.initialize();

    if (routeId !== 'auth' && !(session as App.Session).user) {
      return { redirect: 'auth', status: 302 };
    }
 
    return {
      props: {
        session,
        url
      }
    };
  };
</script>

<script lang="ts">
  import Header from 'components/Header/index.svelte';
  import PageTransition from "components/ui/PageTransition.svelte";
  import { AppName } from "constants/defaults";

  export let url: URL;
  export let session: App.Session;
  setContext('session', session);
</script>

<svelte:head>
  <title>{AppName}</title>
</svelte:head>

<Header />
<PageTransition url={url.toString()}>
  <slot />
</PageTransition>

<div id="modal-portal" />

<style>
  @import '../app.css';
</style>
