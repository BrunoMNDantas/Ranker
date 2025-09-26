import { useCallback } from "react";
import { useExecute } from "../../../hooks/UseExecute";
import { getAssignmentsOfVote } from "../api/Assignment.api";

export function useAssignmentsOfVote(voteId: string) {
    const getAssignmentsCallback = useCallback(() => getAssignmentsOfVote(voteId), [voteId])
    const { executing: fetching, result: assignments, error, execute: fetch } = useExecute(getAssignmentsCallback, [])
    return { fetching, assignments, error, fetch }
}