<script lang="ts">
  import { getContext } from 'svelte';
  import { scale, slide } from 'svelte/transition';

  import ArrowBack from 'assets/icons/ArrowLeft.svelte';
  import Dashboard from 'assets/icons/dashboard.svelte';
  import Expand from 'assets/icons/Expand.svelte';
  import Logout from 'assets/icons/Logout.svelte';
  import type { UserContext } from 'types/common';

  import HeaderButton from './HeaderButton.svelte';

  export let hasBackButton = true;
  export let classes = '';

  const { user } = getContext('session') as UserContext;

  let menuOpen = false;

  const toggleMenu = () => menuOpen = !menuOpen;

  const onBackButtonPressed = () => {
    history.back();
  };
</script>

<header class="bg-blue-500 shadow px-10 py-3 text-white ${classes}">
  <div class="mx-auto flex items-center relative">
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
    <div class="absolute right-0 top-0 bg-blue-200 rounded-lg text-gray-800 {menuOpen && 'shadow'}">
      <button class="flex items-center" on:click={toggleMenu}>
        <img class="rounded-lg w-12" src={user.avatar} alt="" />
        <p class="font-medium ml-4 select-none">{user.name}</p>
        <span class="w-12 p-3 transition-transform {menuOpen && '-rotate-180'}">
          <Expand />
        </span>
      </button>

      {#if menuOpen}
      <span class="flex flex-col py-2" transition:slide|local>
        <a href="/dashboard" class="flex items-center justify-center w-full h-10 rounded-lg hover:opacity-50 transition-opacity" transition:scale|local>
          <i class="w-4 mr-2"><Dashboard /></i>
          Dashboard
        </a>
        <a href="/logout" class="flex items-center justify-center w-full h-10 rounded-lg hover:opacity-50 transition-opacity" transition:scale|local>
          <i class="w-4 mr-2"><Logout /></i>
          Log out
        </a>
      </span>
      {/if}
    </div>
  </div>
</header>
