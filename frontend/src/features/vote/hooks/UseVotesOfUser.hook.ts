import { useCallback } from "react";
import { useExecute } from "../../../hooks/UseExecute";
import { getVotesOfUser } from "../api/Vote.api";

export function useVotesOfUser(userId: string) {
    const getVotesCallback = useCallback(() => getVotesOfUser(userId), [userId])
    const { executing: fetching, result: votes, error, execute: fetch } = useExecute(getVotesCallback, [])
    return { fetching, votes, error, fetch }
}