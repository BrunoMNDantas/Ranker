import { useCallback } from "react";
import { useExecute } from "../../../hooks/UseExecute";
import { getVote } from "../api/Vote.api";

export function useVote(voteId?: string | null) {
    const getVoteCallback = useCallback(() => voteId ? getVote(voteId) : Promise.resolve(null), [voteId])
    const { executing: fetching, result: vote, error } = useExecute(getVoteCallback)
    return { fetching, vote, error }
}