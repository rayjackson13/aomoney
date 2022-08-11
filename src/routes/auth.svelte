<script context="module" lang="ts">
  import type { Load } from "@sveltejs/kit";
  import type { App } from "../app";

  export const load: Load = async ({ session, props }) => {
    if (!(session as App.Session).user) {
      return { props };
    }
 
    return { redirect: 'dashboard', status: 302 };
  };
</script>

<script lang="ts">
  import { goto } from "$app/navigation";

  import { FirebaseHelper } from '../helpers/firebase';
  import LoginForm from '../components/Auth/LoginForm.svelte';

  const onLogin = async () => {
    const callback = () => goto('/');
    await FirebaseHelper.signIn(callback);
  };
</script>

<LoginForm {onLogin} />
