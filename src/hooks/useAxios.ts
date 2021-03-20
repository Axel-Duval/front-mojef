import { useContext } from "react";
import { UserContext } from "../contexts/user";

export function useAxios() {
  return useContext(UserContext).axios;
}
