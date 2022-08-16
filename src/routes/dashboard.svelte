<script context="module" lang="ts">
  import type { Load } from "@sveltejs/kit";

  import type { App } from "app";
  import { FirebaseHelper } from "helpers/FirebaseHelper";
  import { setHeaderProps } from "stores/header";

  export const load: Load = async ({ session, props }) => {
    setHeaderProps({ visible: true, hasBackButton: false });
    const { user } = session as App.Session;

    const list = await FirebaseHelper.getPosts(user);
    return {
      props: {
        ...props,
        list,
      }
    };
  };
</script>

<script lang="ts">
  import SheetList from 'components/Dashboard/index.svelte';
  import { AppName } from 'constants/defaults';
  import type { TransactionSheet } from "types/common";
  
  setHeaderProps({ visible: true, hasBackButton: false });

  export let list: TransactionSheet[] = [];
</script>

<svelte:head>
  <title>Dashboard | {AppName}</title>
</svelte:head>

<SheetList {list} />
