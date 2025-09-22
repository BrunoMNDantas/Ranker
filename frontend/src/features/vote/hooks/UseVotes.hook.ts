import { useExecute } from "../../../hooks/UseExecute";
import { getAllVotes } from "../api/Vote.api";
import { Vote } from "../model/Vote.types";

export function useVotes() {
    const { executing: fetching, result: votes, error, execute: fetch } = useExecute<Vote[]>(getAllVotes)
    return { fetching, votes, error, fetch }
}