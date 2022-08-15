<script lang="ts">
  import { getContext } from "svelte";
  import { scale, slide } from "svelte/transition";
  import { _ } from 'svelte-i18n';

  import Dashboard from 'assets/icons/Dashboard.svelte';
  import Expand from 'assets/icons/Expand.svelte';
  import Logout from 'assets/icons/Logout.svelte';
  import type { UserContext } from "types/common";

  import HeaderLang from "./HeaderLang.svelte";

  const { user } = getContext('session') as UserContext;

  let menuOpen = false;

  const toggleMenu = () => menuOpen = !menuOpen;
</script>

<div class="absolute flex flex-col right-0 top-0 md:backdrop-blur-sm rounded-lg transition-all text-white {menuOpen ? 'shadow bg-gray-800' : 'md:bg-white/10 hover:md:bg-white/20'}">
  <button class="w-full overflow-hidden" on:click={toggleMenu}>
    <span class="flex items-center justify-end w-full anim-btn {menuOpen && 'anim-btn_open'}">
      <object
        aria-label="User photo"
        class="rounded-lg w-12 h-12 overflow-hidden"
        data={user.picture}
        type="image/png"
      >
        <img class="w-full h-full" src="https://avatars.dicebear.com/api/initials/{user.name.replace(/\s/, '+')}.svg" alt="User initials">
      </object>
      <span class="items-center flex">
        <p class="font-medium ml-4 select-none">{user.name}</p>
        <span class="w-12 p-3 transition-transform {menuOpen && '-rotate-180'}">
          <Expand />
        </span>
      </span>
    </span>
  </button>

  {#if menuOpen}
  <span class="flex flex-col py-2 text-left" transition:slide|local>
    <HeaderLang />
    <a href="/dashboard" class="px-12 flex items-center justify-start w-full h-10 rounded-lg hover:opacity-50 transition-opacity" transition:scale|local>
      <i class="w-4 mr-2"><Dashboard /></i>
      {$_('menu.dashboard')}
    </a>
    <a
      href="/logout"
      class="px-12 flex items-center justify-start w-full h-10 rounded-lg hover:opacity-50 transition-opacity"
      target="_self"
      transition:scale|local>
      <i class="w-4 mr-2"><Logout /></i>
      {$_('menu.logout')}
    </a>
  </span>
  {/if}
</div>

<style>
  .anim-btn {
    transition: all .25s ease;
    transform: translateX(calc(100% - 3rem));
  }

  .anim-btn_open {
    transform: translateX(0);
  }

  @media (min-width: 768px) {
    .anim-btn, .anim-btn_open {
      transform: none;
    }
  }
</style>