import { Rank } from "../entities/Rank"
import { RANKS } from "./Data"
import { delay, Delayed } from "./DelayedStore"
import Store from "./Store"

export const RANK_STORE: Delayed<Store<Rank>> = delay(new Store(RANKS))


export const getAllRanks = (): Promise<Rank[]> => RANK_STORE.getAll()

export const getRank = (id: string): Promise<Rank|null> => RANK_STORE.get(id)

export const createRank = async (rank: Rank): Promise<string> => {
    rank.creationDate = new Date()
    return await RANK_STORE.create(rank)
}

export const updateRank = (rank: Rank): Promise<void> => RANK_STORE.update(rank)

export const deleteRank = (id: string): Promise<void> => RANK_STORE.delete(id)