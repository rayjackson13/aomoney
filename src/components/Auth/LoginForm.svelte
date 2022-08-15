<script lang="ts">
  import { _ } from 'svelte-i18n';
  import Logo from "assets/icons/Logo.svelte";

  export let onLogin = () => {};
  let title = $_('login.title').split(/@accent/);
</script>

<div class="flex-1 flex flex-col text-gray-800">
  <div class="flex-1 px-5 flex items-center auth-bg">
    <div class="flex flex-col items-center ml-auto h-min xl:mr-96 xl:w-5/12 mr-auto lg:w-10/12 w-full">
      <span class="mb-8 w-32 md:w-48 icon-shadow">
        <Logo />
      </span>
      <div class="flex items-center justify-center flex-col px-4 py-8 sm:p-8 lg:py-16 lg:px-8 w-full md:w-auto bg-white/70 backdrop-blur-sm shadow rounded-lg mb-48">
        <h1 class="text-lg md:text-2xl lg:text-3xl font-semibold uppercase text-center mb-6 md:mb-12">
          {title[0] || ''}
          <span class="text-blue-500">{$_('login.accent')}</span>{title[1] || ''}
          <br>
          <span class="text-gray-500">{$_('login.sub')}</span>
        </h1>
        <button
          type="button"
          on:click={onLogin}
          class="rounded-3xl text-sm md:text-lg bg-blue-500 border-2 text-white px-16 py-4 hover:opacity-50 transition-opacity"
        >
          {$_('login.cta')}
        </button>
      </div>
    </div>
  </div>
</div>

<style>
  .auth-bg {
    background-image: linear-gradient(45deg, rgba(110, 139, 174, .3), rgba(174, 110, 110, .3)),url('/img/Auth.jpg');
    background-position: right;
    background-size: cover;
  }

  .icon-shadow {
    filter: drop-shadow(0 1px 3px rgba(0,0,0,0.12));
  }
</style>