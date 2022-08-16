<script context="module" lang="ts">
  import type { Load } from "@sveltejs/kit";

  import type { App } from "app";
  import { FirebaseHelper } from "helpers/FirebaseHelper";

  export const load: Load = async ({ session, props }) => {
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
  import Header from 'components/Header/index.svelte';
  import SheetList from 'components/Dashboard/index.svelte';
  import { AppName } from 'constants/defaults';
  import type { TransactionSheet } from "types/common";

  export let list: TransactionSheet[] = [];
</script>

<svelte:head>
  <title>Dashboard | {AppName}</title>
</svelte:head>

<Header hasBackButton={false} />
<SheetList {list} />
