<script lang="ts">
  import Header from 'components/Header/index.svelte';
  import type { TransactionSheet } from 'types/common';

  import Form from './Form/index.svelte';
  import SheetNotFound from './NotFound/index.svelte';

  export let sheet: TransactionSheet | undefined = undefined;
  export let isNew = false;
</script>

<Header />

<main class="bg-white pt-4 sm:pt-8">
  {#if !sheet && !isNew}
    <SheetNotFound />
  {:else}
    <Form data={sheet} />
  {/if}
</main>
