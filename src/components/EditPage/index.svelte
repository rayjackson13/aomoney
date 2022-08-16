<script lang="ts">
  import Main from 'components/ui/Main.svelte';
  import type { TransactionSheet } from 'types/common';

  import Form from './Form/index.svelte';
  import SheetNotFound from './NotFound/index.svelte';

  export let sheet: TransactionSheet | undefined = undefined;
  export let isNew = false;
</script>

<Main>
  {#if !sheet && !isNew}
    <SheetNotFound />
  {:else}
    <Form data={sheet} />
  {/if}
</Main>
