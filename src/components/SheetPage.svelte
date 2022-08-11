<script lang="ts">
  import Header from '../components/Header/Header.svelte';
  import Form from '../components/Form.svelte';

  export let id: string | undefined;

  const getSheet = () => {
    if (!id) return undefined;

    try {
      return JSON.parse(localStorage.getItem(`sheet-${id}`) || '{}');
    } catch (e) {
      console.error(e);
      return undefined;
    }
  };

  const sheet = getSheet();
</script>

<Header classes="mb-4 sm:mb-8" />

<main>
  <Form {sheet} />
</main>
