<script lang="ts" context="module">
  import type { Load,  } from "@sveltejs/kit";
  import { setHeaderProps } from "stores/header";

  export const load: Load = async () => {
    setHeaderProps({ visible: true, hasBackButton: true });
  };
</script>

<script lang="ts">
  import SheetPage from "components/EditPage/index.svelte";
  import { AppName } from "constants/defaults";
</script>

<svelte:head>
  <title>New Sheet | {AppName}</title>
</svelte:head>

<SheetPage isNew />