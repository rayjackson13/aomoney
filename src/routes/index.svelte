<script context="module" lang="ts">
  import type { Load } from "@sveltejs/kit";

  export const load: Load = async () => {
    return { redirect: 'dashboard', status: 302 };
  };
</script>