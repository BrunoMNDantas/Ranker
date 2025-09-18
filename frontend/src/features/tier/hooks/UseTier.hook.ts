import { useCallback } from "react";
import { useExecute } from "../../../hooks/UseExecute";
import { getTier } from "../api/Tier.api";

export function useTier(tierId?: string | null) {
    const getTierCallback = useCallback(() => tierId ? getTier(tierId) : Promise.resolve(null), [tierId])
    const { executing: fetching, result: tier, error } = useExecute(getTierCallback)
    return { fetching, tier, error }
}