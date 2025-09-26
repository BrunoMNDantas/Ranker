import { useCallback } from "react";
import { useExecute } from "../../../hooks/UseExecute";
import { getVote } from "../api/Vote.api";

export function useVote(voteId: string) {
    const getVoteCallback = useCallback(() => getVote(voteId), [voteId])
    const { executing: fetching, result: vote, error, execute: fetch } = useExecute(getVoteCallback, null)
    return { fetching, vote, error, fetch }
}