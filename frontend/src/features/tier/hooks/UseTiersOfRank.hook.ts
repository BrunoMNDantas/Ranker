import { useExecute } from "../../../hooks/UseExecute";
import { getTiersOfRank } from "../api/Tier.api";
import { Tier } from "../model/Tier.types";

export function useTiersOfRank(rankId: string) {
    const { executing: fetching, result: tiers, error } = useExecute<Tier[]>(() => getTiersOfRank(rankId))
    return { fetching, tiers, error }
}