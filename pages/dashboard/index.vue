<script setup lang="ts">
const dataType = [
  { display: "DAILY DEPARTURE FLIGHTS", value: "daily-departure-flights" },
  { display: "SCHEDULE FOR D & A FLIGHT", value: "schedule-for-d-and-a-flight" },
  { display: "PLAN DAILY FLIGHTS SHEET", value: "plan-daily-flights-sheet" },
  { display: "FOREIGN CARRIERS PRODUCTION SHEET", value: "foreign-carriers-production-sheet" },
  { display: "MS PRODUCTION SHEET", value: "ms-production-sheet" },
  { display: "Special Meals", value: "special-meals" },
];
</script>

<template>
  <div class="container mx-auto px-7">
    <div>
      <h1 class="text-2xl font-bold">
        Parse your data
      </h1>
      <p class="mt-4">
        Please choose the type of data you want to parse.
      </p>
    </div>

    <form class="mt-6">
      <div class="space-y-6">
        <div class="space-y-2">
          <UiLabel for="content">
            Sheet Data
          </UiLabel>
          <UiTextarea name="content" placeholder="Please Past {CTRL + V} Your Data Here" class="min-h-45" />
        </div>

        <div class="flex justify-between items-end">
          <div class="space-y-2 flex gap-4">
            <UiLabel for="content">
              Data Type :
            </UiLabel>
            <UiSelect name="type">
              <UiSelectTrigger class-name="w-[180px]">
                <UiSelectValue placeholder="Choose Sheet Data Type" />
              </UiSelectTrigger>
              <UiSelectContent>
                <UiSelectItem v-for="type in dataType" :key="type.value" :value="type.value">
                  {{ type.display }}
                </UiSelectItem>
              </UiSelectContent>
            </UiSelect>
          </div>

          <div class="space-y-2">
            <UiButton type="submit" variant="default">
              Parse Data
            </UiButton>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>
