<script lang="ts" setup>
const props = defineProps({
  results: {
    type: Object as () => { header: string; result: string[][] },
    required: true,
  },
});

const { header, result } = props.results;
</script>

<template>
  <div v-for="index in result" :key="index[0]" class="last-of-type:mb-10">
    <pre class="w-fit mx-auto">{{ `${header}\n${index.join("\n")}` }}</pre>
  </div>
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
