<script lang="ts">
  import SheetPage from "components/EditPage/index.svelte";
  import { AppName } from "constants/defaults";
</script>

<svelte:head>
  <title>New Sheet | {AppName}</title>
</svelte:head>

<SheetPage isNew />