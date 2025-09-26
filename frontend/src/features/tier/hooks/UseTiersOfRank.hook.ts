import { useCallback } from "react";
import { useExecute } from "../../../hooks/UseExecute";
import { getTiersOfRank } from "../api/Tier.api";

export function useTiersOfRank(rankId: string) {
    const getTiersCallback = useCallback(() => getTiersOfRank(rankId), [rankId])
    const { executing: fetching, result: tiers, error, execute: fetch } = useExecute(getTiersCallback, [])
    return { fetching, tiers, error, fetch }
}