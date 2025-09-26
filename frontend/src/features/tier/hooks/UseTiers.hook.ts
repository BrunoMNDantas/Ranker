import { useExecute } from "../../../hooks/UseExecute";
import { getAllTiers } from "../api/Tier.api";
import { Tier } from "../model/Tier.types";

export function useTiers() {
    const { executing: fetching, result: tiers, error, execute: fetch } = useExecute<Tier[]>(getAllTiers, [])
    return { fetching, tiers, error, fetch }
}