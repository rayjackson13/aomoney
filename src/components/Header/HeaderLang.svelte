<script lang="ts">
  import { scale } from "svelte/transition";
  import { lang, Languages } from 'lang/lang';

  const buttonClass = 'bg-gray-700 hover:bg-gray-500 shadow-md rounded-lg transition-colors';

  const setLang = (language: Languages) => {
    $lang = language;
  };
</script>

<span class="px-6 grid grid-cols-2 gap-1 h-8 mb-2" transition:scale|local>
  <button
    type="button"
    class="{buttonClass} {$lang === Languages.English && 'bg-gray-500'}"
    on:click={() => setLang(Languages.English)}
  >
    En
  </button>
  <button
    type="button"
    class="{buttonClass} {$lang === Languages.Russian && 'bg-gray-500'}"
    on:click={() => setLang(Languages.Russian)}
  >
    Ру
  </button>
</span>