import { useCallback } from "react";
import { useExecute } from "../../../hooks/UseExecute";
import { getTiersOfUser } from "../api/Tier.api";

export function useTiersOfUser(userId: string) {
    const getTiersCallback = useCallback(() => getTiersOfUser(userId), [userId])
    const { executing: fetching, result: tiers, error, execute: fetch } = useExecute(getTiersCallback, [])
    return { fetching, tiers, error, fetch }
}