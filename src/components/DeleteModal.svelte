<script lang="ts">
  import { fade, scale } from "svelte/transition";
  import Portal from "svelte-portal";

  export let isOpen = false;
  export let close = () => {};
  export let submit = () => {};

  const onKeyDown = (ev: KeyboardEvent) => {
    if (ev.key === 'Escape') close();
  };
</script>

<svelte:window on:keydown={onKeyDown} />

<Portal target="#modal-portal">
  {#if isOpen}
    <div class="fixed bg-black/50 left-0 top-0 right-0 bottom-0 flex items-center justify-center text-white backdrop-blur-sm z-50" out:fade>
      <div class="bg-gray-800 rounded-lg p-8 w-full sm:w-128 text-center shadow-md shadow-gray-500/10" transition:scale>
        <p class="sm:text-lg mb-4 sm:mb-0">Are you sure you want to delete this&nbsp;entry?</p>
        <p class="text-sm sm:text-lg mb-6 text-gray-500">You won't be able to restore this&nbsp;file.</p>
        <div class="flex justify-center flex-col sm:flex-row">
          <button on:click={submit} class="shadow-md shadow-gray-500/10 bg-blue-500 rounded-lg py-2 px-6 text-white w-full sm:w-36 hover:opacity-75 active:opacity-50 transition-opacity mb-4 sm:mb-0 sm:mr-4">
            Yes, delete it
          </button>
          <button on:click={close} class="shadow-md shadow-gray-500/10 bg-blue-200 text-gray-800 py-2 px-6 rounded-lg w-full sm:w-36 hover:opacity-75 active:opacity-50 transition-opacity">
            No, cancel
          </button>
        </div>
      </div>
    </div>
  {/if}
</Portal>