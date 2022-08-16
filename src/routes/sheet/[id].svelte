<script lang="ts" context="module">
  import type { Load } from "@sveltejs/kit";

  import type { App } from "app";
  import { FirebaseHelper } from "helpers/FirebaseHelper";
  import { setHeaderProps } from "stores/header";

  export const load: Load = async ({ session, params }) => {
    setHeaderProps({ visible: true, hasBackButton: true });
    const { user } = session as App.Session;
    const sheet = await FirebaseHelper.getPost(user, params.id);

    return { props: { sheet } };
  };
</script>

<script lang="ts">
  import SheetPage from "components/EditPage/index.svelte";
  import type { TransactionSheet } from "types/common";
  
  setHeaderProps({ visible: true, hasBackButton: true });

  export let sheet: TransactionSheet | undefined;
</script>

<SheetPage {sheet} />