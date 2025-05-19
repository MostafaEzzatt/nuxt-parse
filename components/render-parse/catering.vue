<script lang="ts" setup>
const props = defineProps({
  parseData: String,
});
</script>

<template>
  <pre class="w-fit mx-auto">{{ props.parseData }}</pre>
</template>
