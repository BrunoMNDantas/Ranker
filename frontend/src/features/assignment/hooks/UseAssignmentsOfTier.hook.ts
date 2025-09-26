import { useCallback } from "react";
import { useExecute } from "../../../hooks/UseExecute";
import { getAssignmentsOfTier } from "../api/Assignment.api";

export function useAssignmentsOfTier(tierId: string) {
    const getAssignmentsCallback = useCallback(() => getAssignmentsOfTier(tierId), [tierId])
    const { executing: fetching, result: assignments, error, execute: fetch } = useExecute(getAssignmentsCallback, [])
    return { fetching, assignments, error, fetch }
}