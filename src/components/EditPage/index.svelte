<script lang="ts">
  import Header from 'components/Header/index.svelte';
  import type { TransactionSheet } from 'types/common';

  import Form from './Form/index.svelte';
  import SheetNotFound from './NotFound/index.svelte';

  export let sheet: TransactionSheet | undefined = undefined;
  export let isNew = false;
</script>

<Header classes="mb-4 sm:mb-8" />

<main>
  {#if !sheet && !isNew}
    <SheetNotFound />
  {:else}
    <Form data={sheet} />
  {/if}
</main>
