<script lang="ts">
  import { scale } from 'svelte/transition';
</script>

<button
  type="button"
  class="shrink-0 basis-12 w-12 h-12 p-2 mr-4 flex items-center transition-all bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg"
  on:click
  transition:scale
>
  <slot />
</button>
