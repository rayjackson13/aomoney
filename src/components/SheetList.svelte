<script lang="ts">
  import { getContext } from 'svelte';
  
  import type { App } from 'app';
  import { FirebaseHelper } from 'helpers/FirebaseHelper';
  import type { TransactionSheet } from 'types/common';

  import Grid from './Grid.svelte';
  import NewSheetButton from './NewSheetButton.svelte';
  import SheetButton from './SheetButton.svelte';

  const { user } = getContext<App.Session>('session');
  export let list: TransactionSheet[] = [];

  const updateList = async () => {
    list = await FirebaseHelper.getPosts(user);
  };
</script>

<div class="container px-4 mx-auto">
  <h1 class="my-12 text-2xl md:text-4xl font-bold text-center text-gray-800">Your Budget Sheets</h1>
  <Grid>
    <NewSheetButton />
    {#each list as item}
      <SheetButton {item} {updateList} />
    {/each}
  </Grid>
</div>
