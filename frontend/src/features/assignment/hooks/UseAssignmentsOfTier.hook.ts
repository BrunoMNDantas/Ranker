import { useExecute } from "../../../hooks/UseExecute";
import { getAssignmentsOfTier } from "../api/Assignment.api";
import { Assignment } from "../model/Assignment.types";

export function useAssignmentsOfTier(tierId: string) {
    const { executing: fetching, result: assignments, error } = useExecute<Assignment[]>(() => getAssignmentsOfTier(tierId))
    return { fetching, assignments, error }
}