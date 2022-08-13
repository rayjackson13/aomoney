<script context="module" lang="ts">
  import { setContext } from "svelte";
  import type { Load } from "@sveltejs/kit";

  import type { App } from "app";
  import { FirebaseHelper } from "helpers/firebase";

  export const load: Load = async ({ session, routeId }) => {
    FirebaseHelper.initialize();

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
  export let session: App.Session;
  setContext('session', session);
</script>

<slot session={session} />

<style>
  @import '../app.css';
</style>
