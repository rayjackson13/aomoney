<script lang="ts">
  import { _ } from 'svelte-i18n';
</script>

<div class="sm:px-5 flex flex-wrap">
  <div class="w-full xl:w-5/12 sm:px-5 pt-24 text-center">
    <h1 class="text-xl mb-12">
      {$_('edit.not-found.title')}
    </h1>
    <a
      href="/dashboard"
      class="rounded-3xl shadow text-lg bg-blue-500 text-white px-16 py-4 hover:opacity-50 transition-opacity"
    >
    {$_('edit.not-found.cta')}
    </a>
  </div>
</div>