import { useContext } from "react";
import { UserContext } from "../utils/user-context";

export function useAxios() {
  return useContext(UserContext).axios;
}
