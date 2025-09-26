import { getOptionsOfRank } from "../api/Option.api";
import { useExecute } from "../../../hooks/UseExecute";
import { useCallback } from "react";

export function useOptionsOfRank(rankId: string) {
    const getOptionsCallback = useCallback(() => getOptionsOfRank(rankId), [rankId])
    const { executing: fetching, result: options, error, execute: fetch } = useExecute(getOptionsCallback, [])
    return { fetching, options, error, fetch }
}