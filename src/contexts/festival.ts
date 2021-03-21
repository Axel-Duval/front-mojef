import React from "react";

export type FestivalData = string | null;

export interface FestivalContextValue {
  festivalId: FestivalData;
  setWorkingFestival: Function;
}

export const FestivalContext = React.createContext<FestivalContextValue>({
  festivalId: null,
  setWorkingFestival: () => {},
});
