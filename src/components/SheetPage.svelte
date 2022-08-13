<script lang="ts">
  import Header from 'components/Header/Header.svelte';
  import type { TransactionSheet } from 'types/common';

  import Form from './SheetForm/index.svelte';

  export let id: string | undefined;

  const getSheet = () => {
    if (!id) return undefined;

    try {
      const item = localStorage.getItem(`sheet-${id}`);
      return JSON.parse(item || '{}');
    } catch (e) {
      console.error(e);
      return undefined;
    }
  };

  let data: TransactionSheet | undefined = getSheet();
</script>

<Header classes="mb-4 sm:mb-8" />

<main>
  <Form data={data} />
</main>
