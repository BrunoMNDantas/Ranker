import { useExecute } from "../../../hooks/UseExecute";
import { getVotesOfRank } from "../api/Vote.api";
import { Vote } from "../model/Vote.types";

export function useVotesOfRank(rankId: string) {
    const { executing: fetching, result: votes, error } = useExecute<Vote[]>(() => getVotesOfRank(rankId))
    return { fetching, votes, error }
}