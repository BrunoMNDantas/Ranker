import { getOption } from "../api/Option.api";
import { useExecute } from "../../../hooks/UseExecute";
import { useCallback } from "react";

export function useOption(optionId: string) {
    const getOptionCallback = useCallback(() => getOption(optionId) , [optionId])
    const { executing: fetching, result: option, error, execute: fetch } = useExecute(getOptionCallback, null)
    return { fetching, option, error, fetch }
}