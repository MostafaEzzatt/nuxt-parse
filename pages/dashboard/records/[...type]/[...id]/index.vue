<script setup lang="ts">
import type { parseStoresTypes } from "~/lib/types";

import { parseType } from "~/lib/types";

// Define SerializeObject if not imported from elsewhere
type SerializeObject<T> = T;

const route = useRoute();
const [type, id] = route.params.type as [string, string];

const requestTypes = {
  catering: parseType.msProductionSheet,
  departure: parseType.dailyDepartureFlights,
  foreign: parseType.foreignCarriersProductionSheet,
  plan: parseType.planDailyFlightsSheet,
  schedual: parseType.scheduleForDAndAFlight,
};

const requestTypesKeys = Object.keys(requestTypes) as (keyof typeof requestTypes)[];
if (!requestTypesKeys.includes(type as keyof typeof requestTypes)) {
  throw new Error(`Invalid type: ${type}`);
}

const data = ref<SerializeObject<{
  id: number;
  type: string;
  content: string;
  userId: string;
  createdAt: number;
  updatedAt: number;
}>[]>([]);

const dataParsed = ref<parseStoresTypes>({ type: undefined, data: undefined });

onMounted(async () => {
  data.value = await ($fetch as any)("/api/parse-by-id", {
    method: "GET",
    params: {
      type: requestTypes[type as keyof typeof requestTypes],
      id,
    },
  });
});
const cateringStore = useCateringSheet();
const departureStore = useDepartureSheet();
const forignStore = useForignSheetStore();
const planingStore = usePlaningSheetStore();
const sechdualStore = useScheduleStore();

watch(data, (newData) => {
  if (newData.length > 0) {
    const firstData = newData[0];
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
});
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
