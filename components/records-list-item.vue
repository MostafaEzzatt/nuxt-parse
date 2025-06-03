<script lang="ts" setup>
import type { parseSchemaType } from "@/lib/db/schema/parse";

import { parseType } from "~/lib/types";

const props = defineProps<{ allData: parseSchemaType[] | null }>();

const pageType = {
  [parseType.msProductionSheet]: "catering",
  [parseType.dailyDepartureFlights]: "departure",
  [parseType.foreignCarriersProductionSheet]: "foreign",
  [parseType.planDailyFlightsSheet]: "plan",
  [parseType.scheduleForDAndAFlight]: "schedual",
};

function formateDate(num: number) {
  const mm = new Date(num).getMinutes();
  const ss = new Date(num).getSeconds();
  const minutes = mm < 10 ? `0${mm.toString()}` : mm;
  const seconds = ss < 10 ? `0${ss.toString()}` : ss;
  return `${new Date(num).getHours()} : ${minutes} : ${seconds}`;
}

function getSheetDate(sheetObject: parseSchemaType) {
  const content = sheetObject.content;
  const lines = content.split("\n");
  let date = "";
  for (const line of lines) {
    if (pageType[sheetObject.type as keyof typeof pageType] === "plan") {
      // search for date by pattern useing regex
      const dateMatch = line.match(/(\d{2}\/\d{2}\/\d{4})/);
      if (dateMatch) {
        date = dateMatch[0];
        break;
      }
    }
    else if (line.includes("DATED")) {
      date = line.split("DATED")[1].trim();
    }
    else if (line.includes("DATE")) {
      date = line.split("DATE")[1].replace(":", "").trim();
    }
  }

  return date;
}
</script>

<template>
  <div v-if="!props.allData" class="flex items-center justify-center h-screen">
    <UiLoading />
  </div>
  <div v-else class="grid grid-cols-3 gap-4 mt-6">
    <a
      v-for="data in props.allData"
      :key="data.id"
      :href="`/dashboard/records/${pageType[data.type as keyof typeof pageType]}/${data.id.toString()}`"
      class="flex flex-col  gap-2 border-2 rounded px-4 py-2 col-span-1 bg-slate-100/0 hover:bg-slate-100/5 transition-all duration-200 font-semibold"
    >
      <div>Sheet Date : {{ getSheetDate(data) }}</div>
      <div class="flex items-center gap-2">
        Created : {{ new Date(data.createdAt).toLocaleDateString() }} <Icon
          name="tabler:arrow-right-rhombus-filled"
          size="20"
        /> {{ formateDate(data.createdAt) }}
      </div>
    </a>
  </div>
</template>
