<script lang="ts">
  import type { TransactionSheet } from '../types/common';
  import Column from './Table/Column.svelte';
  import Row from './Table/Row.svelte';
  import Table from './Table/Table.svelte';
  import Input from './Input.svelte';

  export let sheet: TransactionSheet;
  export let handleStartChange = () => {};
</script>

<Table>
  <Row>
    <Column disabled padding>From:</Column>
    <Column>
      <Input
        classes="border-0 w-full"
        type="date"
        bind:value={sheet.start}
        on:change={handleStartChange}
      />
    </Column>
    <Column disabled padding>To:</Column>
    <Column>
      <Input type="date" classes="border-0 w-full" min={sheet.start} bind:value={sheet.end} />
    </Column>
  </Row>
</Table>
