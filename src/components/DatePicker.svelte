<script lang="ts">
  import type { SheetDraft } from 'types/common';

  import Column from './Table/Column.svelte';
  import Row from './Table/Row.svelte';
  import Table from './Table/Table.svelte';
  import Input from './Input.svelte';

  export let sheet: SheetDraft;
  const inputClass = 'border-0 w-full';
</script>

<Table>
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
</Table>
