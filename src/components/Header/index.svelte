<script lang="ts">
  import ArrowBack from 'assets/icons/ArrowLeft.svelte';
  import { headerProps } from 'stores/header';

  import HeaderButton from './HeaderButton.svelte';
  import HeaderProfile from './HeaderProfile.svelte';

  export let classes = '';
  
  $: header = $headerProps;

  const onBackButtonPressed = () => {
    history.back();
  };
</script>

{#if header.visible}
  <header class="sticky top-0 bg-gray-800 shadow px-4 sm:px-10 py-3 text-white z-10 {classes}">
    <div class="absolute left-0 right-0 top-0 bottom-0 overflow-hidden"><div class="header-bg w-full h-full"></div></div>
    <div class="mx-auto flex items-center relative h-12">
      {#if header.hasBackButton}
        <HeaderButton on:click={onBackButtonPressed}>
          <ArrowBack />
        </HeaderButton>
      {/if}
      <div id="header-title-portal" class="text-xl w-full md:w-auto" />
      
      <HeaderProfile />
    </div>
  </header>
{/if}

<style>
  .header-bg {
    background-image: url('/img/pattern.svg');
    background-size: contain;
    background-position: bottom;
    background-repeat: repeat-x;
  }
</style>
