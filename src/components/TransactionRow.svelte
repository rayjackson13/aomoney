<script lang="ts">
  import { scale } from 'svelte/transition';
  import Close from '../assets/icons/Close.svelte';
  import type { Transaction } from '../types/common';
  import Column from './Table/Column.svelte';
  import Input from './Input.svelte';

  export let title: Transaction['title'];
  export let amount: Transaction['amount'];
  export let onChange: (row: Transaction) => void;
  export let onRemoveRow: () => void;

  let maskValue = amount || '';
  const onAccept = (ev: Event) => {
    const { detail } = ev as CustomEvent;
    amount = detail.typedValue;
    onChange({ title, amount });
  };

  const handleChange = () => onChange({ title, amount });
</script>

<tr class="border-y-2 first:border-t-0 last:border-b-0" transition:scale|local>
  <Column>
    <Input
      type="text"
      classes="border-0 w-full"
      placeholder="Description"
      bind:value={title}
      on:input={handleChange}
    />
  </Column>
  <Column>
    <Input
      isNumber
      type="text"
      classes="border-0 w-full text-right"
      placeholder="Amount"
      bind:value={maskValue}
      on:accept={onAccept}
    />
  </Column>
  <Column classes="w-10">
    <button
      type="button"
      class="p-2 text-gray-400 hover:opacity-75 active:opacity-50 transition-all"
      on:click={onRemoveRow}
    >
      <Close />
    </button>
  </Column>
</tr>
