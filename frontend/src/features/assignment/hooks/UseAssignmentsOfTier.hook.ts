import { useCallback } from "react";
import { useExecute } from "../../../hooks/UseExecute";
import { getAssignmentsOfTier } from "../api/Assignment.api";

export function useAssignmentsOfTier(tierId?: string | null) {
    const getAssignmentsCallback = useCallback(() => tierId ? getAssignmentsOfTier(tierId) : Promise.resolve([]), [tierId])
    const { executing: fetching, result: assignments, error } = useExecute(getAssignmentsCallback)
    return { fetching, assignments, error }
}