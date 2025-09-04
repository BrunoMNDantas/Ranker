import { useExecute } from "../../../hooks/UseExecute";
import { getRank } from "../api/Rank.api";
import { Rank } from "../model/Rank.types";

export function useRank(rankId: string) {
    const { executing: fetching, result: rank, error } = useExecute<Rank|null>(() => getRank(rankId))
    return { fetching, rank, error }
}