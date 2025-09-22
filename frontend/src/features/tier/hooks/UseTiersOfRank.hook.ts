import { useCallback } from "react";
import { useExecute } from "../../../hooks/UseExecute";
import { getTiersOfRank } from "../api/Tier.api";

export function useTiersOfRank(rankId?: string | null) {
    const getTiersCallback = useCallback(() => rankId ? getTiersOfRank(rankId) : Promise.resolve([]), [rankId])
    const { executing: fetching, result: tiers, error, execute: fetch } = useExecute(getTiersCallback)
    return { fetching, tiers, error, fetch }
}