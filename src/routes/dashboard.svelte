<script context="module" lang="ts">
  import type { Load } from "@sveltejs/kit";

  import type { App } from "app";
  import { FirebaseHelper } from "helpers/firebase";
  import type { TransactionSheet } from "types/common";

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
  import Header from '../components/Header/Header.svelte';
  import SheetList from '../components/SheetList.svelte';

  export let list: TransactionSheet[];
</script>

<Header classes="mb-4 sm:mb-8" hasBackButton={false} />
<SheetList {list} />
