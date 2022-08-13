<script lang="ts">
  import { fade, scale } from "svelte/transition";
  import Portal from "svelte-portal";

  export let isOpen = false;
  export let close = () => {};
  export let submit = () => {};
</script>

<Portal target="#modal-portal">
  {#if isOpen}
    <div class="fixed bg-black/50 left-0 top-0 right-0 bottom-0 flex items-center justify-center text-gray-800 backdrop-blur-sm z-50" out:fade>
      <div class="bg-white rounded-lg p-8 w-6/12 text-center shadow-md shadow-gray-500/10" transition:scale>
        <p class="text-lg">Are you sure you want to delete this entry?</p>
        <p class="text-lg mb-6 text-gray-500">You won't be able to restore this file.</p>
        <div class="flex justify-center">
          <button on:click={submit} class="shadow-md shadow-gray-500/10 bg-blue-500 rounded-lg py-2 px-6 text-white w-36 mr-4">
            Yes, delete it
          </button>
          <button on:click={close} class="shadow-md shadow-gray-500/10 bg-blue-200 py-2 px-6 rounded-lg w-36">
            No, cancel
          </button>
        </div>
      </div>
    </div>
  {/if}
</Portal>