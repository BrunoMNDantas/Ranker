import { getOption } from "../api/Option.api";
import { Option } from "../model/Option.types";
import { useExecute } from "../../../hooks/UseExecute";

export function useOption(optionId: string) {
    const { executing: fetching, result: option, error } = useExecute<Option|null>(() => getOption(optionId))
    return { fetching, option, error }
}