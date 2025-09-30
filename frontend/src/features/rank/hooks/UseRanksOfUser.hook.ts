import { useExecute } from "../../../hooks/UseExecute";
import { useCallback } from "react";
import { getRanksOfUser } from "../api/Rank.api";

export function useRanksOfUser(userId: string) {
    const getRanksCallback = useCallback(() => getRanksOfUser(userId), [userId])
    const { executing: fetching, result: ranks, error, execute: fetch } = useExecute(getRanksCallback, [])
    return { fetching, ranks, error, fetch }
}