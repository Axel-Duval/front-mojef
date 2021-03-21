import React from "react";

export interface FestivalData {
  id: string;
  name: string;
  isActive: boolean;
}

export interface FestivalContextValue {
  festivals: FestivalData[];
  currentFestival: FestivalData | null;
  setCurrentFestival: (festival: FestivalData) => void;
  addFestival: (festival: FestivalData) => void;
}

export const FestivalContext = React.createContext<FestivalContextValue>({
  festivals: [],
  currentFestival: null,
  setCurrentFestival: () => {},
  addFestival: () => {},
});
