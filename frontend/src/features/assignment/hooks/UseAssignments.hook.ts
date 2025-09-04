import { useExecute } from "../../../hooks/UseExecute";
import { getAllAssignments } from "../api/Assignment.api";
import { Assignment } from "../model/Assignment.types";

export function useAssignments() {
    const { executing: fetching, result: assignments, error } = useExecute<Assignment[]>(getAllAssignments)
    return { fetching, assignments, error }
}