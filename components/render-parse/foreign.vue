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
  font-size: 14.9px;
  font-family: "Roboto Mono", monospace;
  font-optical-sizing: auto;
  font-weight: 600;
  font-style: normal;
}

.content {
  max-width: 772px;
  width: 772px;
}

@media print {
  @page {
    size: A4 portrait; /* auto is default portrait; */
    margin: 0;
  }

  pre:first-of-type {
    margin-top: -16px;
  }
}
.content pre {
  padding-top: 36px;
}

.raw {
  font-size: 18px;
  font-family: "Roboto Mono", monospace;
  font-optical-sizing: auto;
  font-weight: 600;
  font-style: normal;
}

.raw div {
  display: inline-block;
}

.customer-number {
  margin-left: 11px;
}

.flight-number {
  margin-left: 19px;
}

.registery {
  margin-left: 30px;
  min-width: 20px;
}
.route {
  margin-left: 48px;
  width: 70px;
}
.route-ar {
  text-align: right;
  width: 205px;
}

.ac {
  margin-left: 43px;
}

.atd {
  margin-left: 38px;
}
/* 32 */
.sector {
  margin-left: 60px;
}
</style>
