<script lang="ts">
  import { _ } from 'svelte-i18n';

  import { TableColumnClasses } from 'constants/classes';
  import type { SheetDraft } from 'types/common';

  import Input from './Input.svelte';

  export let sheet: SheetDraft;
  const inputClass = 'border-0 w-full';
  const { base, disabled, padding } = TableColumnClasses;
</script>

<div class="grid grid-cols-12 border-y-2 first:border-t-0 last:border-b-0">
  <div class="{base} {disabled} {padding} col-span-3 sm:col-span-2 border-b-2 sm:border-b-0">
    {$_('edit.from')}:
  </div>
  <div class="{base} col-span-9 sm:col-span-4 border-x-0 border-b-2 sm:border-b-0 sm:border-x-0">
    <Input
      classes={inputClass}
      type="date"
      max={sheet.end}
      bind:value={sheet.start}
    />
  </div>
  <div class="{base} {disabled} {padding} col-span-3 sm:col-span-2 border-l-0 sm:border-l-2">
    {$_('edit.to')}:
  </div>
  <div class="{base} col-span-9 sm:col-span-4 border-x-0 sm:border-x-0">
    <Input 
      classes={inputClass}
      type="date"
      min={sheet.start}
      bind:value={sheet.end}
    />
  </div>
</div>
