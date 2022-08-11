<script context="module" lang="ts">
  import type { Load } from "@sveltejs/kit";
  import type { App } from "../app";

  export const load: Load = async ({ session, routeId }) => {
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
  import { FirebaseHelper } from '../helpers/firebase';
  
  FirebaseHelper.initialize();
</script>

<slot />

<style>
  @import '../app.css';
</style>
