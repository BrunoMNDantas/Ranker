import { useExecute } from "../../../hooks/UseExecute";
import { getAssignment } from "../api/Assignment.api";
import { Assignment } from "../model/Assignment.types";

export function useAssignment(assignmentId: string) {
    const { executing: fetching, result: assignment, error } = useExecute<Assignment|null>(() => getAssignment(assignmentId))
    return { fetching, assignment, error }
}