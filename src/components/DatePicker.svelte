<script lang="ts">
  import type { SheetDraft } from 'types/common';

  import Column from './Table/Column.svelte';
  import Row from './Table/Row.svelte';
  import Table from './Table/Table.svelte';
  import Input from './Input.svelte';
import { TableColumnClasses } from 'constants/classes';

  export let sheet: SheetDraft;
  const inputClass = 'border-0 w-full';
  const { base, disabled, padding } = TableColumnClasses;
</script>

<!-- <Table>
  <Row>
    <Column disabled padding>From:</Column>
    <Column>
      <Input
        classes={inputClass}
        type="date"
        max={sheet.end}
        bind:value={sheet.start}
      />
    </Column>
    <Column disabled padding>To:</Column>
    <Column>
      <Input 
        classes={inputClass}
        type="date"
        min={sheet.start}
        bind:value={sheet.end}
      />
    </Column>
  </Row>
</Table> -->

<div class="grid grid-cols-12 border-y-2 first:border-t-0 last:border-b-0">
  <div class="{base} {disabled} {padding} col-span-3 sm:col-span-2 border-b-2 sm:border-b-0">From:</div>
  <div class="{base} col-span-9 sm:col-span-4 border-x-0 border-b-2 sm:border-b-0">
    <Input
      classes={inputClass}
      type="date"
      max={sheet.end}
      bind:value={sheet.start}
    />
  </div>
  <div class="{base} {disabled} {padding} col-span-3 sm:col-span-2 border-l-0 sm:border-l-2">To:</div>
  <div class="{base} col-span-9 sm:col-span-4 border-x-0">
    <Input 
      classes={inputClass}
      type="date"
      min={sheet.start}
      bind:value={sheet.end}
    />
  </div>
</div>
