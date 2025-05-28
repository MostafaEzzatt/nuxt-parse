<script setup lang="ts">
import type { parseTypeEnum } from "~/lib/types";

import { parseType } from "~/lib/types";

async function getParsedDataList(type: parseTypeEnum) {
  return await $fetch("/api/parse", {
    method: "GET",
    params: {
      type,
    },
  });
}

type responseType = {
  id: number;
  type: string;
  content: string;
  userId: string;
  createdAt: number;
  updatedAt: number;
}[];
const catering = ref<responseType>([]);
const departure = ref<responseType>([]);
const eng = ref<responseType>([]);
const plan = ref<responseType>([]);
const schedule = ref<responseType>([]);

onMounted(async () => {
  catering.value = await getParsedDataList(parseType.msProductionSheet);
  departure.value = await getParsedDataList(parseType.dailyDepartureFlights);
  eng.value = await getParsedDataList(parseType.foreignCarriersProductionSheet);
  plan.value = await getParsedDataList(parseType.planDailyFlightsSheet);
  schedule.value = await getParsedDataList(parseType.scheduleForDAndAFlight);
});

function formateDate(num: number) {
  const mm = new Date(num).getMinutes();
  const ss = new Date(num).getSeconds();
  const minutes = mm < 10 ? `0${mm.toString()}` : mm;
  const seconds = ss < 10 ? `0${ss.toString()}` : ss;
  return `${new Date(num).getHours()} : ${minutes} : ${seconds}`;
}
</script>

<template>
  <div class="container mx-auto">
    <UiTabs default-value="account" class="w-full">
      <UiTabsList class="max-w-fit mx-auto">
        <UiTabsTrigger class="cursor-pointer" value="account">
          Catering
        </UiTabsTrigger>
        <UiTabsTrigger class="cursor-pointer" value="departure">
          Departure
        </UiTabsTrigger>
        <UiTabsTrigger class="cursor-pointer" value="eng">
          Foreign
        </UiTabsTrigger>
        <UiTabsTrigger class="cursor-pointer" value="plan">
          Plan Daily
        </UiTabsTrigger>
        <UiTabsTrigger class="cursor-pointer" value="schedule">
          Schedule
        </UiTabsTrigger>
      </UiTabsList>
      <UiTabsContent value="account">
        <div class="grid grid-cols-3 gap-4 mt-6">
          <a
            v-for="data in catering"
            :key="data.id"
            :href="`/dashboard/records/catering/${data.id.toString()}`"
            class="flex items-center justify-center gap-2 border-2 rounded px-4 py-2 col-span-1 bg-slate-100/0 hover:bg-slate-100/5 transition-all duration-200 font-semibold"
          >
            Created : {{ new Date(data.createdAt).toLocaleDateString() }} <Icon
              name="tabler:arrow-right-rhombus-filled"
              size="20"
            /> {{ formateDate(data.createdAt) }}
          </a>
        </div>
      </UiTabsContent>
      <UiTabsContent value="departure">
        <div class="grid grid-cols-3 gap-4 mt-6">
          <a
            v-for="data in departure"
            :key="data.id"
            :href="`/dashboard/records/departure/${data.id.toString()}`"
            class="flex items-center justify-center gap-2 border-2 rounded px-4 py-2 col-span-1 bg-slate-100/0 hover:bg-slate-100/5 transition-all duration-200 font-semibold"
          >
            Created : {{ new Date(data.createdAt).toLocaleDateString() }} <Icon
              name="tabler:arrow-right-rhombus-filled"
              size="20"
            /> {{ formateDate(data.createdAt) }}
          </a>
        </div>
      </UiTabsContent>
      <UiTabsContent value="eng">
        <div class="grid grid-cols-3 gap-4 mt-6">
          <a
            v-for="data in eng"
            :key="data.id"
            :href="`/dashboard/records/foreign/${data.id.toString()}`"
            class="flex items-center justify-center gap-2 border-2 rounded px-4 py-2 col-span-1 bg-slate-100/0 hover:bg-slate-100/5 transition-all duration-200 font-semibold"
          >
            Created : {{ new Date(data.createdAt).toLocaleDateString() }} <Icon
              name="tabler:arrow-right-rhombus-filled"
              size="20"
            /> {{ formateDate(data.createdAt) }}
          </a>
        </div>
      </UiTabsContent>
      <UiTabsContent value="plan">
        <div class="grid grid-cols-3 gap-4 mt-6">
          <a
            v-for="data in plan"
            :key="data.id"
            :href="`/dashboard/records/plan/${data.id.toString()}`"
            class="flex items-center justify-center gap-2 border-2 rounded px-4 py-2 col-span-1 bg-slate-100/0 hover:bg-slate-100/5 transition-all duration-200 font-semibold"
          >
            Created : {{ new Date(data.createdAt).toLocaleDateString() }} <Icon
              name="tabler:arrow-right-rhombus-filled"
              size="20"
            /> {{ formateDate(data.createdAt) }}
          </a>
        </div>
      </UiTabsContent>
      <UiTabsContent value="schedule">
        <div class="grid grid-cols-3 gap-4 mt-6">
          <a
            v-for="data in schedule"
            :key="data.id"
            :href="`/dashboard/records/schedual/${data.id.toString()}`"
            class="flex items-center justify-center gap-2 border-2 rounded px-4 py-2 col-span-1 bg-slate-100/0 hover:bg-slate-100/5 transition-all duration-200 font-semibold"
          >
            Created : {{ new Date(data.createdAt).toLocaleDateString() }} <Icon
              name="tabler:arrow-right-rhombus-filled"
              size="20"
            /> {{ formateDate(data.createdAt) }}
          </a>
        </div>
      </UiTabsContent>
    </UiTabs>
  </div>
</template>
