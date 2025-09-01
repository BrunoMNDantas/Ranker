import { Rank } from "../entities/Rank"
import Store, { MOCKED_DATA } from "./Store"

export const RANK_STORE: Store<Rank> = new Store()

export const getAllRanks = (): Promise<Rank[]> => RANK_STORE.getAll()

export const getRank = (id: string): Promise<Rank|null> => RANK_STORE.get(id)

export const createRank = (rank: Rank): Promise<void> => RANK_STORE.create(rank)

export const updateRank = (rank: Rank): Promise<void> => RANK_STORE.update(rank)

export const deleteRank = (id: string): Promise<void> => RANK_STORE.delete(id)

MOCKED_DATA.forEach(rank => RANK_STORE.create({
    id: rank.id,
    creationDate: new Date(),
    title: rank.title
}))