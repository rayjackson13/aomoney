<script context="module" lang="ts">
  import type { Load } from "@sveltejs/kit";

  import type { App } from "app";
  import { setHeaderProps } from "stores/header";

  export const load: Load = async ({ session, props }) => {
    setHeaderProps({ visible: false });
    if (!(session as App.Session).user) {
      return { props };
    }
 
    return { redirect: 'dashboard', status: 302 };
  };
</script>

<script lang="ts">
  import { FirebaseHelper } from 'helpers/FirebaseHelper';
  import LoginForm from 'components/Auth/Form.svelte';
  import { AppName } from 'constants/defaults';
  
  setHeaderProps({ visible: false });

  const onLogin = async () => {
    const callback = () => location.pathname = '/dashboard';
    await FirebaseHelper.signIn(callback);
  };
</script>

<svelte:head>
  <title>Log in | {AppName}</title>
</svelte:head>

<LoginForm {onLogin} />
