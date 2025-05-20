<script lang="ts" setup>
const props = defineProps({
  parseData: String,
});
</script>

<template>
  <pre class="w-fit mx-auto">{{ props.parseData }}</pre>
</template>

<style scoped>
pre {
  font-size: 12.6px;
  font-family: "Roboto Mono", monospace;
  font-optical-sizing: auto;
  font-weight: 600;
  font-style: normal;
}

.roboto-mono-mostafa {
  font-family: "Roboto Mono", monospace;
  font-optical-sizing: auto;
  font-weight: 600;
  font-style: normal;
}

@media print {
  @page {
    size: A4 portrait; /* auto is default portrait; */
    margin: 0;
  }

  pre {
    color: black;
    padding-top: 20px;
    margin-top: -16px;
  }
}
</style>
