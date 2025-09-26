import { useCallback } from "react";
import { useExecute } from "../../../hooks/UseExecute";
import { getAssignmentsOfOption } from "../api/Assignment.api";

export function useAssignmentsOfOption(optionId: string) {
    const getAssignmentsCallback = useCallback(() => getAssignmentsOfOption(optionId), [optionId])
    const { executing: fetching, result: assignments, error, execute: fetch } = useExecute(getAssignmentsCallback, [])
    return { fetching, assignments, error, fetch }
}