<script lang="ts">
  import formatDistanceToNow from 'date-fns/formatDistanceToNow';

  import type { TransactionSheet } from '../types/common';
  import Delete from '../assets/icons/Delete.svelte';

  export let item: TransactionSheet;

  const onDelete = (ev: Event) => {
    ev.preventDefault();
  };
</script>

<a
  class="text-gray-800 border-2 rounded-lg shadow-md shadow-gray-500/10 border-gray-500 transition-all hover:bg-gray-500 hover:text-white active:opacity-75"
  href={`sheet/${item.id}`}
>
  <h5 class="card-title text-primary py-8 px-6 text-lg">{item.name}</h5>
  <div
    class="opacity-75 border-gray-500 text-sm text-end p-3 border-t border-dashed flex items-center justify-between"
  >
    <button class="p-0 w-6 hover:text-white transition-colors z-10" on:click={onDelete}>
      <Delete />
    </button>
    <span>
      last updated {formatDistanceToNow(item.updatedAt, {
        addSuffix: true
      })}
    </span>
  </div>
</a>
