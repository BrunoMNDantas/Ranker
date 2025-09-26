import { useCallback } from "react";
import { useExecute } from "../../../hooks/UseExecute";
import { getAssignment } from "../api/Assignment.api";

export function useAssignment(assignmentId: string) {
    const getAssignmentCallback = useCallback(() => getAssignment(assignmentId), [assignmentId])
    const { executing: fetching, result: assignment, error, execute: fetch } = useExecute(getAssignmentCallback, null)
    return { fetching, assignment, error, fetch }
}