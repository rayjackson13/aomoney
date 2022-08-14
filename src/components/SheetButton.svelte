<script lang="ts">
  import { getContext } from 'svelte';
  import { blur } from 'svelte/transition';
  import formatDistanceToNow from 'date-fns/formatDistanceToNow';

  import Delete from 'assets/icons/Delete.svelte';
  import { FirebaseHelper } from 'helpers/FirebaseHelper';
  import type { TransactionSheet, UserContext } from 'types/common';

  import DeleteModal from './DeleteModal.svelte';

  export let item: TransactionSheet;
  export let updateList = async () => {};

  const { user } = getContext('session') as UserContext;

  let isModalOpen = false;

  const toggleModal = (isOpen: boolean) => {
    isModalOpen = isOpen;
  };

  const onDeletePressed = (ev: Event) => {
    ev.preventDefault();
    toggleModal(true);
  };

  const onDelete = async () => {
    await FirebaseHelper.deletePost(user, item.id.toString());
    await updateList();
    toggleModal(false);
  };
</script>

<a
  class="text-gray-800 border-2 rounded-lg shadow-md shadow-gray-500/10 border-gray-500 transition-all hover:bg-gray-500 hover:text-white active:opacity-75 z-50"
  href={`sheet/${item.id}`}
  out:blur|local
>
  <h5 class="card-title text-primary py-8 px-6 text-lg max-w-full whitespace-nowrap overflow-hidden text-ellipsis">
    {item.name}
  </h5>

  <div
    class="opacity-75 border-gray-500 text-sm text-end p-3 border-t border-dashed flex items-center justify-between"
  >
    <button class="p-0 w-6 hover:opacity-50 transition-opacity z-10" on:click={onDeletePressed}>
      <Delete />
    </button>
    <span>
      last updated {formatDistanceToNow(item.updatedAt, {
        addSuffix: true
      })}
    </span>
  </div>
</a>

<DeleteModal isOpen={isModalOpen} close={() => toggleModal(false)} submit={onDelete} />