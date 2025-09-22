import { useCallback } from "react";
import { useExecute } from "../../../hooks/UseExecute";
import { getVotesOfRank } from "../api/Vote.api";

export function useVotesOfRank(rankId?: string | null) {
    const getVotesCallback = useCallback(() => rankId ? getVotesOfRank(rankId) : Promise.resolve([]), [rankId])
    const { executing: fetching, result: votes, error, execute: fetch } = useExecute(getVotesCallback)
    return { fetching, votes, error, fetch }
}