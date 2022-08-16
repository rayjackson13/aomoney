<script lang="ts">
  import { TableColumnClasses } from "constants/classes";

  export let disabled = false;
  export let padding = false;
  export let classes = '';

  const {
    base,
    disabled: disabledClass,
    padding: paddingClass
  } = TableColumnClasses;
</script>

<td class="{base} {disabled && disabledClass} {padding && paddingClass} {classes}">
  <slot />
</td>
