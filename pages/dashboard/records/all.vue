<script setup lang="ts">
import type { parseTypeEnum } from "~/lib/types";

import { parseType } from "~/lib/types";

async function getParsedDataList(type: parseTypeEnum) {
  const { data, status } = await useFetch("/api/parse", {
    params: { type },
    lazy: true,
  });
  return { data, status };
}

const { data: catering, status: cateringStatus } = await getParsedDataList(parseType.msProductionSheet);
const { data: departure, status: departureStatus } = await getParsedDataList(parseType.dailyDepartureFlights);
const { data: eng, status: engStatus } = await getParsedDataList(parseType.foreignCarriersProductionSheet);
const { data: plan, status: planStatus } = await getParsedDataList(parseType.planDailyFlightsSheet);
const { data: schedule, status: schedualStatus } = await getParsedDataList(parseType.scheduleForDAndAFlight);
</script>

<template>
  <div v-if="cateringStatus === 'pending' || departureStatus === 'pending' || engStatus === 'pending' || planStatus === 'pending' || schedualStatus === 'pending'" class="flex items-center justify-center h-screen">
    <UiLoading />
  </div>

  <div v-else class="container mx-auto">
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
        <RecordsListItem :all-data="catering" />
      </UiTabsContent>
      <UiTabsContent value="departure">
        <RecordsListItem :all-data="departure" />
      </UiTabsContent>
      <UiTabsContent value="eng">
        <RecordsListItem :all-data="eng" />
      </UiTabsContent>
      <UiTabsContent value="plan">
        <RecordsListItem :all-data="plan" />
      </UiTabsContent>
      <UiTabsContent value="schedule">
        <RecordsListItem :all-data="schedule" />
      </UiTabsContent>
    </UiTabs>
  </div>
</template>
