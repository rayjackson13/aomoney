<script lang="ts">
  export let label = '';
  export let value = '';
</script>

<div class="text-xl flex mb-1 items-baseline">
  <p class="text-gray-800">{label}:</p>
  <div class="border-b-2 border-dashed border-gray-500/50 flex-1 mx-4 h-0" />
  <p class="text-blue-500">{value}</p>
</div>
