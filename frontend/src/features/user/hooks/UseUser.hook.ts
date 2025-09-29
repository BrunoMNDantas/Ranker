import { useCallback } from "react";
import { useExecute } from "../../../hooks/UseExecute";
import { getUser } from "../api/User.api";

export function useUser(userId: string) {
    const getUserCallback = useCallback(() => getUser(userId), [userId])
    const { executing: fetching, result: user, error, execute: fetch } = useExecute(getUserCallback, null)
    return { fetching, user, error, fetch }
}