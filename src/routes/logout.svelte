<script context="module" lang="ts">
  import type { Load } from "@sveltejs/kit";

  import type { App } from "app";

  export const load: Load = async ({ fetch, session }) => {
    if (!(session as App.Session).user) {
      return { status: 302, redirect: 'auth' };
    }

    try {
      await fetch('api/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      return { status: 302, redirect: 'auth' };
    } catch (e) {
      console.error('There was a problem.');
      return { status: 302, redirect: 'auth' };
    }
  };
</script>

<p>Redirecting...</p>
