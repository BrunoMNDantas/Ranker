import { useCallback } from "react";
import { useExecute } from "../../../hooks/UseExecute";
import { getRank } from "../api/Rank.api";

export function useRank(rankId: string) {
    const getRankCallback = useCallback(() => getRank(rankId), [rankId])
    const { executing: fetching, result: rank, error, execute: fetch } = useExecute(getRankCallback, null)
    return { fetching, rank, error, fetch }
}