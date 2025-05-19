import type { User } from "better-auth";

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

export type parseStoresTypes = cateringStoreType | departureStoreType | undefinedStore;
