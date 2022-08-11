<script lang="ts">
  import { onMount } from 'svelte';

  import type { TransactionSheet } from '../types/common';
  import Grid from './Grid.svelte';
  import NewSheetButton from './NewSheetButton.svelte';
  import SheetButton from './SheetButton.svelte';

  let list: TransactionSheet[] = [];

  const getList = () => {
    const keys = Object.keys(localStorage).filter((val) => val.match('sheet-'));
    const list = keys.map((key) => JSON.parse(localStorage.getItem(key)) as TransactionSheet);
    list.sort((item1, item2) => item2.id - item1.id);
    return list;
  };

  onMount(() => {
    list = getList();
  });
</script>

<div class="container mx-auto">
  <h1 class="my-12 text-4xl font-bold text-center text-gray-800">Your Budget Sheets</h1>
  <Grid>
    <NewSheetButton />
    {#each list as item}
      <SheetButton {item} />
    {/each}
  </Grid>
</div>
