<script lang="ts">
  export let scrollable = false;

  const classes = {
    default: 'border-t-2 border-gray-200 w-full',
    scrollable: 'w-auto block whitespace-nowrap overflow-x-auto'
  };
</script>

<table class="{classes.default} {scrollable && classes.scrollable}">
  <slot />
</table>
