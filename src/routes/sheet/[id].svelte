<script lang="ts" context="module">
  import type { LoadEvent, LoadOutput } from "@sveltejs/kit";

  export const load = async ({ params }: LoadEvent): Promise<LoadOutput> => ({
    props: {
      id: params.id,
    }
  });
</script>

<script lang="ts">
  import SheetPage from "../../components/SheetPage.svelte";

  export let id: string;
</script>

<SheetPage {id} />