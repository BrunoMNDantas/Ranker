import { getOption } from "../api/Option.api";
import { useExecute } from "../../../hooks/UseExecute";
import { useCallback } from "react";

export function useOption(optionId?: string | null) {
    const getOptionCallback = useCallback(() => optionId ? getOption(optionId) : Promise.resolve(null) , [optionId])
    const { executing: fetching, result: option, error } = useExecute(getOptionCallback)
    return { fetching, option, error }
}