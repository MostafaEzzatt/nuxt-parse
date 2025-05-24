<script lang="ts" setup>
import type { PropType } from "vue";

import type { useSpecialMealDataType } from "~/lib/types";

import { cn } from "~/lib/utils";

const props = defineProps({
  data: {
    type: Object as PropType<useSpecialMealDataType>,
    required: true,
  },
});
</script>

<template>
  <div class="mx-auto max-w-fit mt-25 space-y-0.5 scale-150">
    <div
      class="grid grid-cols-2 gap-0.5 uppercase max-w-fit font-bold min-w-45"
    >
      <div class="col-span-1 px-4 text-center bg-teal-900">
        Meal
      </div>
      <div class="col-span-1 px-4 text-center bg-teal-900">
        Count
      </div>
    </div>
    <div
      v-for="sm in props.data"
      :key="sm['meal-type']"
      class="grid grid-cols-2 gap-0.5 uppercase max-w-fit font-bold min-w-45"
    >
      <div
        :class="cn('col-span-1 px-4 text-center', { 'bg-sky-600': sm.class === 'H', 'bg-emerald-600': sm.class === 'Y' })"
      >
        {{ sm["meal-type"] }}
      </div>
      <div
        :class="cn('col-span-1 px-4 text-center', { 'bg-sky-600': sm.class === 'H', 'bg-emerald-600': sm.class === 'Y' })"
      >
        {{ sm.count }}
      </div>
    </div>
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
