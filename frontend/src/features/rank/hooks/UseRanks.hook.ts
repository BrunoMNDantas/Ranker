import { useExecute } from "../../../hooks/UseExecute";
import { getAllRanks } from "../api/Rank.api";
import { Rank } from "../model/Rank.types";

export function useRanks() {
    const { executing: fetching, result: ranks, error, execute: fetch } = useExecute<Rank[]>(getAllRanks)
    return { fetching, ranks, error, fetch }
}