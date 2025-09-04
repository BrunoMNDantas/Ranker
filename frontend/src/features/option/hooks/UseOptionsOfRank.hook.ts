import { getOptionsOfRank } from "../api/Option.api";
import { Option } from "../model/Option.types";
import { useExecute } from "../../../hooks/UseExecute";

export function useOptionsOfRank(rankId: string) {
    const { executing: fetching, result: options, error } = useExecute<Option[]>(() => getOptionsOfRank(rankId))
    return { fetching, options, error }
}