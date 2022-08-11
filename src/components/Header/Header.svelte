<script lang="ts">
  import ArrowBack from '../../assets/icons/ArrowLeft.svelte';
  import HeaderButton from './HeaderButton.svelte';

  export let hasBackButton = true;
  export let classes = '';

  const onBackButtonPressed = () => {
    history.back();
  };
</script>

<header class="bg-blue-500 shadow px-10 py-3 text-white ${classes}">
  <div class="mx-auto">
    <div class="flex items-center">
      {#if hasBackButton}
        <HeaderButton on:click={onBackButtonPressed}>
          <ArrowBack />
        </HeaderButton>
      {:else}
        <HeaderButton>
          <!-- <Menu /> -->
        </HeaderButton>
      {/if}
      <div id="header-title-portal" class="text-xl" />
    </div>
    <div class="flex items-center ml-auto" />
  </div>
</header>
