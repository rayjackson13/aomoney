<script lang="ts">
  import { getContext } from 'svelte';
  import { blur } from 'svelte/transition';
  import formatDistanceToNow from 'date-fns/formatDistanceToNow/index';
  import { _ } from 'svelte-i18n';
  import enLocale from 'date-fns/locale/en-GB/index';
  import ruLocale from 'date-fns/locale/ru/index';

  import Delete from 'assets/icons/Delete.svelte';
  import { FirebaseHelper } from 'helpers/FirebaseHelper';
  import { lang } from 'lang/lang';
  import type { TransactionSheet, UserContext } from 'types/common';

  import DeleteModal from '../DeleteModal/index.svelte';

  export let item: TransactionSheet;
  export let updateList = async () => {};

  const { user } = getContext('session') as UserContext;

  let isModalOpen = false;

  const locales = {
    en: enLocale,
    ru: ruLocale,
  };

  const toggleModal = (isOpen: boolean) => {
    isModalOpen = isOpen;
  };

  const onDeletePressed = (ev: Event) => {
    ev.preventDefault();
    ev.stopPropagation();
    toggleModal(true);
  };

  const onDelete = async () => {
    await FirebaseHelper.deletePost(user, item.id.toString());
    await updateList();
    toggleModal(false);
  };
</script>

<a
  class="text-gray-800 border-2 rounded-lg shadow-md shadow-gray-500/10 border-gray-500 hover:opacity-75 transition-all active:opacity-50"
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
      {$_('dashboard.lastUpdated')} {formatDistanceToNow(item.updatedAt, {
        addSuffix: true,
        locale: locales[$lang] || locales.en,
      })}
    </span>
  </div>
</a>

<DeleteModal isOpen={isModalOpen} close={() => toggleModal(false)} submit={onDelete} />
