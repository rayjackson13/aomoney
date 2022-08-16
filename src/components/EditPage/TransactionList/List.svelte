<script lang="ts">
  import Add from 'assets/icons/Add.svelte';
  import Card from 'components/ui/Card/Card.svelte';
  import CardHeader from 'components/ui/Card/CardHeader.svelte';
  import Table from 'components/ui/Table/Table.svelte';
  import { DefaultTransaction } from 'constants/defaults';
  import type { Transaction } from 'types/common';

  import TransactionRow from './Row.svelte';
  
  export let title = '';
  export let totalSum = 0;
  export let transactions: Transaction[];
  export let save = () => {};

  const onChange = (index: number) => (row: Transaction) => {
    transactions[index] = row;
  };

  const getMaxId = () => {
    const ids = transactions.map(val => val.id);
    return Math.max(...ids);
  };

  const addRow = () => {
    const id = getMaxId() + 1;
    transactions = [...transactions, { ...DefaultTransaction, id }];
    save();
  };

  const removeRow = (index: number) => {
    transactions = transactions.filter((_, idx) => idx !== index);
    save();
  };
</script>

<Card>
  <CardHeader>
    <p class="text-md md:text-xl">
      {title}{' '}
      <span class="text-color-500">| </span>
      <span class="text-blue-500 font-semibold">{totalSum.toLocaleString()} ₽</span>
    </p>
    <button
      type="button"
      class="w-6 text-blue-500 hover:opacity-75 active:opacity-50 transition-all"
      on:click={addRow}
    >
      <Add />
    </button>
  </CardHeader>
  <Table>
    {#each transactions as row, index (row.id)}
      <TransactionRow
        {...row}
        onChange={onChange(index)}
        onRemoveRow={() => removeRow(index)}
      />
    {/each}
  </Table>
</Card>
