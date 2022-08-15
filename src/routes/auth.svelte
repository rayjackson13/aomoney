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
  import { FirebaseHelper } from 'helpers/FirebaseHelper';
  import LoginForm from 'components/Auth/LoginForm.svelte';
  import { AppName } from 'constants/defaults';

  const onLogin = async () => {
    const callback = () => location.pathname = '/dashboard';
    await FirebaseHelper.signIn(callback);
  };
</script>

<svelte:head>
  <title>Log in | {AppName}</title>
</svelte:head>

<LoginForm {onLogin} />
