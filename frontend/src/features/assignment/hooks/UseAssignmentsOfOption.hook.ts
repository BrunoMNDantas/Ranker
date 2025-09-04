import { useExecute } from "../../../hooks/UseExecute";
import { getAssignmentsOfOption } from "../api/Assignment.api";
import { Assignment } from "../model/Assignment.types";

export function useAssignmentsOfOption(optionId: string) {
    const { executing: fetching, result: assignments, error } = useExecute<Assignment[]>(() => getAssignmentsOfOption(optionId))
    return { fetching, assignments, error }
}