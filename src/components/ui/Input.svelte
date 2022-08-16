<script lang="ts">
  // eslint-disable-next-line
  // @ts-nocheck
  import { imask } from '@imask/svelte';

  export let value = '';
  export let type = 'text';
  export let classes = '';
  export let placeholder = '';
  export let isNumber = false;

  function setType(node: HTMLInputElement) {
    node.type = type;
  }

  const inputClass =
    'flex-auto py-2 px-3 focus:outline-none focus:border-blue-500 hover:border-blue-500/50 transition-colors hover:z-10 focus:z-10';
  const maskOptions = isNumber
    ? {
      mask: Number,
      thousandsSeparator: ','
    }
    : { mask: String };
</script>

<input
  use:setType
  use:imask={maskOptions}
  inputmode={isNumber ? 'numeric' : 'text'}
  class="{inputClass} {classes}"
  bind:value
  {placeholder}
  on:change
  on:input
  on:accept
  {...$$restProps}
/>
