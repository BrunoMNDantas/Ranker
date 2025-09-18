import { getOptionsOfRank } from "../api/Option.api";
import { useExecute } from "../../../hooks/UseExecute";
import { useCallback } from "react";

export function useOptionsOfRank(rankId?: string | null) {
    const getOptionsCallback = useCallback(() => rankId ? getOptionsOfRank(rankId) : Promise.resolve([]), [rankId])
    const { executing: fetching, result: options, error } = useExecute(getOptionsCallback)
    return { fetching, options, error }
}