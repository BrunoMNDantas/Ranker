import { useCallback } from "react";
import { useExecute } from "../../../hooks/UseExecute";
import { getRank } from "../api/Rank.api";

export function useRank(rankId?: string | null) {
    const getRankCallback = useCallback(() => rankId ? getRank(rankId) : Promise.resolve(null), [rankId])
    const { executing: fetching, result: rank, error, execute: fetch } = useExecute(getRankCallback)
    return { fetching, rank, error, fetch }
}