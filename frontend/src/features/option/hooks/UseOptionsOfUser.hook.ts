import { getOptionsOfUser } from "../api/Option.api";
import { useExecute } from "../../../hooks/UseExecute";
import { useCallback } from "react";

export function useOptionsOfUser(userId: string) {
    const getOptionsCallback = useCallback(() => getOptionsOfUser(userId), [userId])
    const { executing: fetching, result: options, error, execute: fetch } = useExecute(getOptionsCallback, [])
    return { fetching, options, error, fetch }
}