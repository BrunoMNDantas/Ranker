import { useExecute } from "../../../hooks/UseExecute";
import { getAllUsers } from "../api/User.api";
import { User } from "../model/User.types";

export function useUsers() {
    const { executing: fetching, result: users, error, execute: fetch } = useExecute<User[]>(getAllUsers, [])
    return { fetching, users, error, fetch }
}