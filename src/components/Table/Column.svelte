<script lang="ts">
  export let disabled = false;
  export let padding = false;
  export let classes = '';
</script>

<td
  class="border-x-2 border-gray-200 first:border-l-0 last:border-r-0 {disabled &&
    'bg-gray-200/50'} {padding && 'px-3 py-2'} {classes}"
>
  <slot />
</td>
