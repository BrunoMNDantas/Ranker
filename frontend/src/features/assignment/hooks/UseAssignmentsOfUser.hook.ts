import { useCallback } from "react";
import { useExecute } from "../../../hooks/UseExecute";
import { getAssignmentsOfUser } from "../api/Assignment.api";

export function useAssignmentsOfUser(userId: string) {
    const getAssignmentsCallback = useCallback(() => getAssignmentsOfUser(userId), [userId])
    const { executing: fetching, result: assignments, error, execute: fetch } = useExecute(getAssignmentsCallback, [])
    return { fetching, assignments, error, fetch }
}