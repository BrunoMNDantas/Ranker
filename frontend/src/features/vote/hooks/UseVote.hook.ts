import { useExecute } from "../../../hooks/UseExecute";
import { getVote } from "../api/Vote.api";
import { Vote } from "../model/Vote.types";

export function useVote(voteId: string) {
    const { executing: fetching, result: vote, error } = useExecute<Vote|null>(() => getVote(voteId))
    return { fetching, vote, error }
}