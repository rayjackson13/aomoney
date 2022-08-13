<script lang="ts" context="module">
  import type { LoadEvent, LoadOutput } from "@sveltejs/kit";

  export const ssr = false;
  export const handle = async ({ params }: LoadEvent): Promise<LoadOutput> => ({
    props: {
      id: params.id,
    }
  });
</script>

<script lang="ts">
  import SheetPage from "../../components/SheetPage.svelte";

  const id = location.pathname.split('/sheet/').at(-1);
</script>

<SheetPage {id} />