import { useCallback } from "react";
import { useExecute } from "../../../hooks/UseExecute";
import { getAssignmentsOfVote } from "../api/Assignment.api";

export function useAssignmentsOfVote(voteId?: string | null) {
    const getAssignmentsCallback = useCallback(() => voteId ? getAssignmentsOfVote(voteId) : Promise.resolve([]), [voteId])
    const { executing: fetching, result: assignments, error, execute: fetch } = useExecute(getAssignmentsCallback)
    return { fetching, assignments, error, fetch }
}