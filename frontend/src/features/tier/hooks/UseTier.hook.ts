import { useExecute } from "../../../hooks/UseExecute";
import { getTier } from "../api/Tier.api";
import { Tier } from "../model/Tier.types";

export function useTier(tierId: string) {
    const { executing: fetching, result: tier, error } = useExecute<Tier|null>(() => getTier(tierId))
    return { fetching, tier, error }
}