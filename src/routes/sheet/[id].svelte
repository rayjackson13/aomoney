<script lang="ts" context="module">
  import type { LoadEvent, LoadOutput } from "@sveltejs/kit";

  import type { App } from "app";
  import { FirebaseHelper } from "helpers/FirebaseHelper";

  export const load = async ({ session, params }: LoadEvent): Promise<LoadOutput> => {
    const { user } = session as App.Session;
    const sheet = await FirebaseHelper.getPost(user, params.id);

    return { props: { sheet } };
  };
</script>

<script lang="ts">
  import SheetPage from "components/SheetPage.svelte";
import type { TransactionSheet } from "types/common";

  export let sheet: TransactionSheet | undefined;
</script>

<SheetPage {sheet} />