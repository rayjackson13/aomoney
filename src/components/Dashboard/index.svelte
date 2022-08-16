<script lang="ts">
  import { getContext } from 'svelte';
  import { _ } from 'svelte-i18n';
  
  import type { App } from 'app';
  import Grid from 'components/ui/Grid.svelte';
  import Main from 'components/ui/Main.svelte';
  import { FirebaseHelper } from 'helpers/FirebaseHelper';
  import type { TransactionSheet } from 'types/common';

  import NewSheetButton from './NewButton/index.svelte';
  import SheetButton from './ListItem/index.svelte';

  const { user } = getContext<App.Session>('session');
  export let list: TransactionSheet[] = [];

  const updateList = async () => {
    list = await FirebaseHelper.getPosts(user);
  };
</script>

<Main>
  <div class="container px-4 mx-auto">
    <h1 class="my-12 text-2xl md:text-4xl font-bold text-center text-gray-800">
      {$_('dashboard.title')}
    </h1>
    <Grid>
      <NewSheetButton />
      {#each list as item}
        <SheetButton {item} {updateList} />
      {/each}
    </Grid>
  </div>
</Main>
