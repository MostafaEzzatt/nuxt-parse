<script setup lang="ts">
import type { parseStoresTypes } from "~/lib/types";

import { parseType, requestTypes } from "~/lib/types";

// Define SerializeObject if not imported from elsewhere

const route = useRoute();
const [type, id] = route.params.type as [string, string];

const requestTypesKeys = Object.keys(requestTypes) as (keyof typeof requestTypes)[];
if (!requestTypesKeys.includes(type as keyof typeof requestTypes)) {
  throw new Error(`Invalid type: ${type}`);
}

const dataParsed = ref<parseStoresTypes>({ type: undefined, data: undefined });

const cateringStore = useCateringSheet();
const departureStore = useDepartureSheet();
const forignStore = useForignSheetStore();
const planingStore = usePlaningSheetStore();
const sechdualStore = useScheduleStore();

async function getParsedDataList() {
  const { data, status } = await useFetch("/api/parse-by-id", {
    method: "GET",
    params: {
      type: requestTypes[type as keyof typeof requestTypes],
      id,
    },
    lazy: true,
  });

  if (status.value !== "success") {
    throw new Error(`Failed to fetch data: ${status.value}`);
  }

  if (!data.value || !Array.isArray(data.value)) {
    throw new Error("Invalid data format received from API");
  }

  if (data.value.length === 0) {
    throw new Error("No data found for the given type and id");
  }

  data.value.forEach((item: any) => {
    if (!item.type || !item.content) {
      throw new Error("Invalid data item format");
    }
  });

  const firstData = data.value[0];
  if (firstData.type === requestTypes.catering) {
    dataParsed.value = {
      type: parseType.msProductionSheet,
      data: cateringStore.splitToFlights(firstData.content),
    };
  }
  else if (firstData.type === requestTypes.departure) {
    dataParsed.value = {
      type: parseType.dailyDepartureFlights,
      data: departureStore.init(firstData.content),
    };
  }
  else if (firstData.type === requestTypes.foreign) {
    dataParsed.value = {
      type: parseType.foreignCarriersProductionSheet,
      data: forignStore.init(firstData.content),
    };
  }
  else if (firstData.type === requestTypes.plan) {
    dataParsed.value = {
      type: parseType.planDailyFlightsSheet,
      data: planingStore.init(firstData.content),
    };
  }
  else if (firstData.type === requestTypes.schedual) {
    dataParsed.value = {
      type: parseType.scheduleForDAndAFlight,
      data: sechdualStore.init(firstData.content),
    };
  }
}

await getParsedDataList();
</script>

<template>
  <div>
    <RenderParseCatering v-if="dataParsed.type === 'ms-production-sheet'" :parse-data="dataParsed.data" />
    <RenderParseDeparture v-if="dataParsed.type === 'daily-departure-flights'" :results="dataParsed.data" />
    <RenderParseForeign v-if="dataParsed.type === 'foreign-carriers-production-sheet'" :parse-data="dataParsed.data" />
    <RenderParsePlaning v-if="dataParsed.type === 'plan-daily-flights-sheet'" :results="dataParsed.data" />
    <RenderParseSepcialMeal v-if="dataParsed.type === 'special-meals'" :data="dataParsed.data" />
    <RenderParseSchedual v-if="dataParsed.type === 'schedule-for-d-and-a-flight'" :parse-data="dataParsed.data" />
  </div>
</template>
