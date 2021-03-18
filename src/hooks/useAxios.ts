import { useContext } from "react";
import { UserContext } from "../context/user-context";

export function useAxios() {
    return useContext(UserContext).axios;
}