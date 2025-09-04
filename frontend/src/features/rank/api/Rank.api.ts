import { Rank } from "../model/Rank.types"
import { RANKS } from "../../../services/Data"
import { delay, Delayed } from "../../../services/DelayedStore"
import { deleteOptionsOfRank } from "../../option/api/Option.api"
import Store from "../../../services/Store"
import { deleteTiersOfRank } from "../../tier/api/Tier.api"
import { deleteVotesOfRank } from "../../vote/api/Vote.api"

export const RANK_STORE: Delayed<Store<Rank>> = delay(new Store(RANKS))


export const getAllRanks = (): Promise<Rank[]> => RANK_STORE.getAll()

export const getRank = (id: string): Promise<Rank|null> => RANK_STORE.get(id)

export const createRank = async (rank: Rank): Promise<string> => {
    rank.creationDate = new Date()
    return await RANK_STORE.create(rank)
}

export const updateRank = (rank: Rank): Promise<void> => RANK_STORE.update(rank)

export const deleteRank = async (id: string): Promise<void> => {
    await deleteTiersOfRank(id)
    await deleteOptionsOfRank(id)
    await deleteVotesOfRank(id)

    await RANK_STORE.delete(id)
}