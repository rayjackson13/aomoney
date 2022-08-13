<script lang="ts">
  import { onMount } from 'svelte';

  import type { TransactionSheet } from '../types/common';
  import Grid from './Grid.svelte';
  import NewSheetButton from './NewSheetButton.svelte';
  import SheetButton from './SheetButton.svelte';

  let list: TransactionSheet[] = [];

  const updateList = () => {
    const keys = Object.keys(localStorage).filter((val) => val.match('sheet-'));
    const items = keys.map((key) => {
      const item = localStorage.getItem(key);
      return JSON.parse(item || '{}') as TransactionSheet;
    });
    items.sort((item1, item2) => item2.id - item1.id);
    list = items;
  };

  onMount(() => {
    updateList();
  });
</script>

<div class="container mx-auto">
  <h1 class="my-12 text-4xl font-bold text-center text-gray-800">Your Budget Sheets</h1>
  <Grid>
    <NewSheetButton />
    {#each list as item}
      <SheetButton {item} {updateList} />
    {/each}
  </Grid>
</div>
