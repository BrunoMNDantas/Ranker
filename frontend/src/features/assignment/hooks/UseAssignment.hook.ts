import { useCallback } from "react";
import { useExecute } from "../../../hooks/UseExecute";
import { getAssignment } from "../api/Assignment.api";

export function useAssignment(assignmentId?: string | null) {
    const getAssignmentCallback = useCallback(() => assignmentId ? getAssignment(assignmentId) : Promise.resolve(null), [assignmentId])
    const { executing: fetching, result: assignment, error, execute: fetch } = useExecute(getAssignmentCallback)
    return { fetching, assignment, error, fetch }
}