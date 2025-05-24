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

export type parseStoresTypes = cateringStoreType | departureStoreType | useForignSheetType | usePlaningSheetType | undefinedStore;
