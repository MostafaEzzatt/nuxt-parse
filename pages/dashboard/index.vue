<script setup lang="ts">
import type { FetchError } from "ofetch";

import { RenderParseForeign, RenderParsePlaning, UiButton } from "#components";

import type { parseStoresTypes } from "~/lib/types";

import { defaultVariant } from "~/components/ui/textarea";
import { parseInsertSchema } from "~/lib/db/schema";
import { cn } from "~/lib/utils";
import { useForignSheetStore } from "~/stores/parse-forign-sheet";

const cateringStore = useCateringSheet();
const departureStore = useDepartureSheet();
const forignStore = useForignSheetStore();
const planingStore = usePlaningSheetStore();
const parsedData = ref<parseStoresTypes>({ type: undefined, data: undefined });

const { $csrfFetch } = useNuxtApp();
const submitErrors = ref("");
const loading = ref(false);
const dataType = [
  { display: "DAILY DEPARTURE FLIGHTS", value: "daily-departure-flights" },
  { display: "MS PRODUCTION SHEET", value: "ms-production-sheet" },
  { display: "FOREIGN CARRIERS PRODUCTION SHEET", value: "foreign-carriers-production-sheet" },
  { display: "PLAN DAILY FLIGHTS SHEET", value: "plan-daily-flights-sheet" },
  { display: "Special Meals", value: "special-meals" },
  { display: "SCHEDULE FOR D & A FLIGHT", value: "schedule-for-d-and-a-flight" },
];

const { handleSubmit, errors, setErrors } = useForm({
  validationSchema: toTypedSchema(parseInsertSchema),
});

const onSubmit = handleSubmit(async (values) => {
  loading.value = true;
  try {
    if (values.type === "ms-production-sheet") {
      parsedData.value = {
        type: "ms-production-sheet",
        data: cateringStore.splitToFlights(values.content),
      };
    }
    else if (values.type === "daily-departure-flights") {
      parsedData.value = {
        type: values.type,
        data: departureStore.init(values.content),
      };
    }
    else if (values.type === "foreign-carriers-production-sheet") {
      parsedData.value = {
        type: values.type,
        data: forignStore.init(values.content),
      };
    }
    else if (values.type === "plan-daily-flights-sheet") {
      parsedData.value = {
        type: values.type,
        data: planingStore.init(values.content),
      };
    }

    await $csrfFetch("/api/parse", {
      method: "post",
      body: values,
    });
  }
  catch (e) {
    const error = e as FetchError;
    if (error.data?.data) {
      setErrors(error.data?.data);
    }
    submitErrors.value = error.statusMessage || "Oh Unknown Error";
  }

  loading.value = false;
});
</script>

<template>
  <div>
    <div class="container mx-auto px-7 print:hidden">
      <div>
        <h1 class="text-2xl font-bold">
          Parse your data
        </h1>
        <p class="mt-4">
          Please choose the type of data you want to parse.
        </p>
      </div>

      <div>
        <UiAlert v-if="submitErrors" variant="destructive" class="mb-4">
          <Icon
            name="lucide:octagon-x"
            size="20"
          />

          <UiAlertTitle class="ml-7">
            Heads up!
          </UiAlertTitle>
          <UiAlertDescription class="ml-7">
            {{ submitErrors }}
          </UiAlertDescription>
        </UiAlert>
      </div>

      <form class="mt-6" @submit.prevent="onSubmit">
        <div class="space-y-6">
          <div class="space-y-2">
            <UiLabel for="content">
              Sheet Data
            </UiLabel>
            <Field
              :disabled="loading"
              as="textarea"
              name="content"
              placeholder="Please Past {CTRL + V} Your Data Here"
              :class="cn(defaultVariant, 'min-h-40 max-h-40')"
            />

            <p v-if="errors.content" class="text-red-400">
              {{ errors.content }}
            </p>
          </div>

          <div class="flex justify-between items-end">
            <div class="space-y-2 flex gap-4">
              <UiLabel for="content" class="text-nowrap">
                Data Type :
              </UiLabel>
              <Field
                :disabled="loading"
                name="type"
                as="select"
                placeholder="Choose Sheet"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-[#020618] dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 disabled:cursor-not-allowed"
              >
                <option selected disabled>
                  Choose Sheet Data Type
                </option>

                <option
                  v-for="type in dataType"
                  :key="type.value"
                  :value="type.value"
                  class="bg-transparent"
                >
                  {{ type.display }}
                </option>
              </Field>

              <p v-if="errors.type" class="text-red-400">
                {{ errors.type }}
              </p>
            </div>

            <div class="space-y-2">
              <UiButton type="submit" :disabled="loading" variant="default">
                Parse Data
              </UiButton>
            </div>
          </div>
        </div>
      </form>
    </div>
    <!-- Render Here -->
    <RenderParseCatering v-if="parsedData.type === 'ms-production-sheet'" :parse-data="parsedData.data" />
    <RenderParseDeparture v-if="parsedData.type === 'daily-departure-flights'" :results="parsedData.data" />
    <RenderParseForeign v-if="parsedData.type === 'foreign-carriers-production-sheet'" :parse-data="parsedData.data" />
    <RenderParsePlaning v-if="parsedData.type === 'plan-daily-flights-sheet'" :results="parsedData.data" />
  </div>
</template>
