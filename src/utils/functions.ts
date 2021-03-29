import { FilterState } from "./types";

/**
 * Function used to get the state of an input as a boolean
 * If the input is typeof FilterState returns a boolean value corresponding to it
 * else returns null
 * @param i input string
 * @returns The state of the filter
 */
export const getState = (i: string): boolean | null => {
  switch (i) {
    case FilterState.ON:
      return true;
    case FilterState.OFF:
      return false;
    default:
      return null;
  }
};
