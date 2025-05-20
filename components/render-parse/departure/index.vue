<script setup lang="ts">
import jsonData from "./data.json";

const props = defineProps({
  results: {
    type: Object as () => { header: string; result: string[][] },
    required: true,
  },
});

console.warn(jsonData);

function getDistenationInArabic(text: string) {
  if (text.includes(" ")) {
    const codeArr = text.replace(/\s+/g, " ").split(" ");
    const findFirst = jsonData.find(p => p.Code === codeArr[0]);
    const findSecond = jsonData.find(p => p.Code === codeArr[1]);
    return `${findFirst ? `${findFirst["cap-ar"]}/` : ""} ${findSecond ? findSecond["cap-ar"] : ""}`;
  }

  const isExist = jsonData.find(p => p.Code === text);

  if (!isExist) {
    return "*************";
  }

  return isExist["cap-ar"];
}

// const roundes = Math.ceil(props.results.result.length / 32);
function splitIntoGroups(arr: Array<string[]>, numberOfGroups = 32) {
  const result = [];
  const groupSize = Math.ceil(arr.length / numberOfGroups);

  for (let i = 0; i < groupSize; i++) {
    const start = i * numberOfGroups;
    const end = start + numberOfGroups;
    result.push(arr.slice(start, end - 1));
  }

  return result;
}
</script>

<template>
  <div
    v-for="(group, idx) in splitIntoGroups(props.results.result)"
    :key="`dep-${idx}`"
    :class="idx >= 1 ? 'groups' : ''"
  >
    <pre v-if="props.results.header" class="w-fit mx-auto">{{ props.results.header }}</pre>

    <div class="mx-auto max-w-fit flex flex-col">
      <div v-for="data in group" :key="data[0]" class="raw w-full flex print:text-black">
        <!-- Customer Number  -->
        <div class="ml-[11px]">
          {{ data[0] }}
        </div>

        <!-- Flight Number -->
        <div class="ml-[19px] min-w-[46px]">
          {{ data[1] }}
        </div>
        <!-- Register -->
        <div class="ml-[30px] min-w-[20px]">
          {{ data[2] }}
        </div>
        <!-- Route -->
        <div class="ml-[48px] w-[70px]">
          {{ data[3].replace("  ", "/") }}
        </div>
        <!-- Route Arabic -->
        <div class="text-right w-[252px]">
          {{ getDistenationInArabic(data[3]) }}
        </div>
        <!-- A/C -->
        <div class="ml-[43px] min-w-[46px]">
          {{ data[5] }}
        </div>
        <!-- ATD -->
        <div class="ml-[38px] min-w-[58px]">
          {{ data[6] }}
        </div>
        <!-- Sector -->
        <div class="ml-[36px] w-[29px]">
          {{ data[7] }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.groups {
  margin-top: 20px;
}

pre {
  font-size: 14px;
}

@media print {
  pre:first-of-type {
    margin-top: 10px;
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
</style>
