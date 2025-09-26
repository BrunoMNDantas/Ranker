import { useCallback } from "react";
import { useExecute } from "../../../hooks/UseExecute";
import { getTier } from "../api/Tier.api";

export function useTier(tierId: string) {
    const getTierCallback = useCallback(() => getTier(tierId), [tierId])
    const { executing: fetching, result: tier, error, execute: fetch } = useExecute(getTierCallback, null)
    return { fetching, tier, error, fetch }
}