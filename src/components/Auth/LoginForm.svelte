<script lang="ts">
  import Logo from "../../assets/icons/Logo.svelte";

  export let onLogin = () => {};
</script>

<div class="flex-1 flex flex-col text-gray-800">
  <div class="flex-1 px-5 sm:px-5 flex items-center auth-bg">
    <div class="flex flex-col items-center w-5/12 ml-auto mr-24 h-min">
      <span class="mb-8 w-48 icon-shadow">
        <Logo />
      </span>
      <div class="flex items-center justify-center flex-col p-16 bg-white shadow rounded-xl mb-48">
        <h1 class="text-3xl font-semibold uppercase text-center mb-12">
          Don't worry about{' '}
          <span class="text-blue-500">finances</span>.
          <br>
          <span class="text-gray-500">We got you covered.</span>
        </h1>
        <button
          type="button"
          on:click={onLogin}
          class="rounded-3xl text-lg bg-blue-500 border-2 text-white px-16 py-4 hover:opacity-50 transition-opacity"
        >
          Sign in with Google
        </button>
      </div>
    </div>
  </div>
</div>

<style>
  .auth-bg {
    background-image: linear-gradient(45deg, rgba(110, 139, 174, .3), rgba(174, 110, 110, .3)),url('img/Auth.jpg');
    background-position: right;
    background-size: cover;
  }

  .icon-shadow {
    filter: drop-shadow(0 1px 3px rgba(0,0,0,0.12));
  }
</style>