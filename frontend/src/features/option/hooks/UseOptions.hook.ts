import { getAllOptions } from "../api/Option.api";
import { Option } from "../model/Option.types";
import { useExecute } from "../../../hooks/UseExecute";

export function useOptions() {
    const { executing: fetching, result: options, error, execute: fetch } = useExecute<Option[]>(getAllOptions, [])
    return { fetching, options, error, fetch }
}