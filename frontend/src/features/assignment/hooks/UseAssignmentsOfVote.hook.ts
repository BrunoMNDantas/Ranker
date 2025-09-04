import { useExecute } from "../../../hooks/UseExecute";
import { getAssignmentsOfVote } from "../api/Assignment.api";
import { Assignment } from "../model/Assignment.types";

export function useAssignmentsOfVote(voteId: string) {
    const { executing: fetching, result: assignments, error } = useExecute<Assignment[]>(() => getAssignmentsOfVote(voteId))
    return { fetching, assignments, error }
}