import { Rank } from "../model/Rank.types"
import DelayedStore from "../../../services/store/Delayed.store"
import { deleteOptionsOfRank } from "../../option/api/Option.api"
import { deleteTiersOfRank } from "../../tier/api/Tier.api"
import { deleteVotesOfRank } from "../../vote/api/Vote.api"
import FirestoreStore, { AUTH } from "../../../services/store/Firestore.store"
import Store from "../../../services/store/Store"
import { API_RESPONSE_TIME } from "../../../app/Constants"
import EntityStore from "../../../services/store/Entity.store"
import AuthStore from "../../../services/store/Auth.store"

export const RANK_STORE: Store<Rank> = new DelayedStore(
    new AuthStore(
        new EntityStore(new FirestoreStore("ranks")),
        () => AUTH.currentUser?.uid || ""
    ),
    API_RESPONSE_TIME
)


export const getAllRanks = (): Promise<Rank[]> => RANK_STORE.getAll()

export const getRank = (id: string): Promise<Rank|null> => RANK_STORE.get(id)

export const createRank = (rank: Rank): Promise<string> => RANK_STORE.create(rank)

export const updateRank = (rank: Rank): Promise<void> => RANK_STORE.update(rank)

export const deleteRank = async (id: string): Promise<void> => {
    await deleteTiersOfRank(id)
    await deleteOptionsOfRank(id)
    await deleteVotesOfRank(id)

    await RANK_STORE.delete(id)
}