<script lang="ts">
  import { fly } from "svelte/transition";

  export let url = "";
  const pageTransitionDuration = 250;
</script>

<div class="relative flex-1 flex flex-col bg-white">
  {#key url}
    <div
      class="flex-1 flex flex-col bg-white"
      in:fly={{ y: 100, duration: pageTransitionDuration, delay: pageTransitionDuration }}
      out:fly={{ y: -100, duration: pageTransitionDuration }}
    >
      <slot />
    </div>
  {/key}
</div>
