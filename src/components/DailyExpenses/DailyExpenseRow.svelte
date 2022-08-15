<script lang="ts">
  import type { ExtendedTransaction } from '../../types/common';
  import Add from '../../assets/icons/Add.svelte';
  import Close from '../../assets/icons/Close.svelte';

  import Column from '../Table/Column.svelte';
  import Row from '../Table/Row.svelte';
  import Input from '../Input.svelte';

  export let item: ExtendedTransaction;
  export let date: string;
  export let addRow = () => {};
  export let deleteRow = () => {};
  export let update = () => {};

  let maskValue = item.amount || undefined;
  const onAccept = (ev: Event) => {
    const { detail } = ev as CustomEvent;
    item.amount = detail.typedValue;
    update();
  };
</script>

<Row>
  <Column padding classes="text-center">{!item.additive ? date : ''}</Column>
  <Column>
    <Input type="text" classes="border-0 w-full" bind:value={item.title} />
  </Column>
  <Column>
    <Input
      isNumber
      type="text"
      classes="border-0 w-full text-right"
      bind:value={maskValue}
      on:accept={onAccept}
    />
  </Column>
  <Column padding classes="text-right {Math.round(item.budget) < 0 && 'text-red-700'}">
    {Number(Math.round(item.budget) + '').toLocaleString()}
  </Column>
  <Column padding classes="text-right {Math.round(item.balance) < 0 && 'text-red-700'}">
    {Number(Math.round(item.balance) + '').toLocaleString()}
  </Column>
  <Column classes="w-10">
    {#if !item.additive}
      <button
        type="button"
        class="p-2 text-gray-400 hover:opacity-75 active:opacity-50 transition-all button-icon"
        on:click={addRow}
      >
        <Add />
      </button>
    {:else}
      <button
        type="button"
        class="p-2 text-gray-400 hover:opacity-75 active:opacity-50 transition-all button-icon"
        on:click={deleteRow}
      >
        <Close />
      </button>
    {/if}
  </Column>
</Row>

<style>
  .button-icon {
    width: 2.3125rem;
  }
</style>
