import { useCallback } from "react";
import { useExecute } from "../../../hooks/UseExecute";
import { getAssignmentsOfOption } from "../api/Assignment.api";

export function useAssignmentsOfOption(optionId?: string | null) {
    const getAssignmentsCallback = useCallback(() => optionId  ? getAssignmentsOfOption(optionId) : Promise.resolve([]), [optionId])
    const { executing: fetching, result: assignments, error, execute: fetch } = useExecute(getAssignmentsCallback)
    return { fetching, assignments, error, fetch }
}