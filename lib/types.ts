import type { User } from "better-auth";

import type { useForignSheetStore } from "~/stores/parse-forign-sheet";

declare module "h3"{
  // eslint-disable-next-line ts/consistent-type-definitions
  interface H3EventContext {
    user?: User;
  }
}

type undefinedStore = {
  type: undefined;
  data: undefined;
};

type cateringStoreType = {
  type: "ms-production-sheet";
  data: ReturnType<ReturnType<typeof useCateringSheet>["splitToFlights"]>;
};

type departureStoreType = {
  type: "daily-departure-flights";
  data: ReturnType<ReturnType<typeof useDepartureSheet>["init"]>;
};

type useForignSheetType = {
  type: "foreign-carriers-production-sheet";
  data: ReturnType<ReturnType<typeof useForignSheetStore>["init"]>;
};

type usePlaningSheetType = {
  type: "plan-daily-flights-sheet";
  data: ReturnType<ReturnType<typeof usePlaningSheetStore>["init"]>;
};

export type useSpecialMealDataType = ReturnType<ReturnType<typeof useSpecialMealStore>["init"]>;
type useSpecialMealType = {
  type: "special-meals";
  data: useSpecialMealDataType;
};

export type useScheduleDataType = ReturnType<ReturnType<typeof useScheduleStore>["init"]>;
type useScheduleType = {
  type: "schedule-for-d-and-a-flight";
  data: useScheduleDataType;
};

export type parseStoresTypes = cateringStoreType | departureStoreType | useForignSheetType | usePlaningSheetType | useSpecialMealType | useScheduleType | undefinedStore;
