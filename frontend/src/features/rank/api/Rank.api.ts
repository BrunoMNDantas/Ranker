import { Rank } from "../model/Rank.types"
import DelayedStore from "../../../services/store/Delayed.store"
import { deleteOptionsOfRank } from "../../option/api/Option.api"
import { deleteTiersOfRank } from "../../tier/api/Tier.api"
import { deleteVotesOfRank } from "../../vote/api/Vote.api"
import FirestoreStore from "../../../services/store/Firestore.store"
import Store from "../../../services/store/Store"
import { API_RESPONSE_TIME } from "../../../app/Constants"

export const RANK_STORE: Store<Rank> = new DelayedStore<Rank>(new FirestoreStore<Rank>("ranks"), API_RESPONSE_TIME)


export const getAllRanks = (): Promise<Rank[]> => RANK_STORE.getAll()

export const getRank = (id: string): Promise<Rank|null> => RANK_STORE.get(id)

export const createRank = async (rank: Rank): Promise<string> => {
    rank.creationDate = new Date()
    rank.lastUpdateDate = new Date()
    return await RANK_STORE.create(rank)
}

export const updateRank = (rank: Rank): Promise<void> => {
    rank.lastUpdateDate = new Date()
    return RANK_STORE.update(rank)
}

export const deleteRank = async (id: string): Promise<void> => {
    await deleteTiersOfRank(id)
    await deleteOptionsOfRank(id)
    await deleteVotesOfRank(id)

    await RANK_STORE.delete(id)
}