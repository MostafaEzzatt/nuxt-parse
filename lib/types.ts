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

export enum parseType {
  msProductionSheet = "ms-production-sheet",
  dailyDepartureFlights = "daily-departure-flights",
  foreignCarriersProductionSheet = "foreign-carriers-production-sheet",
  planDailyFlightsSheet = "plan-daily-flights-sheet",
  specialMeals = "special-meals",
  scheduleForDAndAFlight = "schedule-for-d-and-a-flight",
}

// create a type of parseType enum
export type parseTypeEnum = (typeof parseType)[keyof typeof parseType];

type cateringStoreType = {
  type: parseType.msProductionSheet;
  data: ReturnType<ReturnType<typeof useCateringSheet>["splitToFlights"]>;
};

type departureStoreType = {
  type: parseType.dailyDepartureFlights;
  data: ReturnType<ReturnType<typeof useDepartureSheet>["init"]>;
};

type useForignSheetType = {
  type: parseType.foreignCarriersProductionSheet;
  data: ReturnType<ReturnType<typeof useForignSheetStore>["init"]>;
};

type usePlaningSheetType = {
  type: parseType.planDailyFlightsSheet;
  data: ReturnType<ReturnType<typeof usePlaningSheetStore>["init"]>;
};

export type useSpecialMealDataType = ReturnType<ReturnType<typeof useSpecialMealStore>["init"]>;
type useSpecialMealType = {
  type: parseType.specialMeals;
  data: useSpecialMealDataType;
};

export type useScheduleDataType = ReturnType<ReturnType<typeof useScheduleStore>["init"]>;
type useScheduleType = {
  type: parseType.scheduleForDAndAFlight;
  data: useScheduleDataType;
};

export type parseStoresTypes = cateringStoreType | departureStoreType | useForignSheetType | usePlaningSheetType | useSpecialMealType | useScheduleType | undefinedStore;

export const dataType = [
  { display: "DAILY DEPARTURE FLIGHTS", value: "daily-departure-flights" },
  { display: "MS PRODUCTION SHEET", value: "ms-production-sheet" },
  { display: "FOREIGN CARRIERS PRODUCTION SHEET", value: "foreign-carriers-production-sheet" },
  { display: "PLAN DAILY FLIGHTS SHEET", value: "plan-daily-flights-sheet" },
  { display: "Special Meals", value: "special-meals" },
  { display: "SCHEDULE FOR D & A FLIGHT", value: "schedule-for-d-and-a-flight" },
];

export const requestTypes = {
  catering: parseType.msProductionSheet,
  departure: parseType.dailyDepartureFlights,
  foreign: parseType.foreignCarriersProductionSheet,
  plan: parseType.planDailyFlightsSheet,
  schedual: parseType.scheduleForDAndAFlight,
};
