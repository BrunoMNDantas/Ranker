import { Tier } from "../model/Tier.types"
import { deleteAssignmentsOfTier } from "../../assignment/api/Assignment.api"
import DelayedStore from "../../../services/store/Delayed.store"
import Store from "../../../services/store/Store"
import FirestoreStore from "../../../services/store/Firestore.store"
import { API_RESPONSE_TIME } from "../../../app/Constants"

export const TIER_STORE: Store<Tier> = new DelayedStore<Tier>(new FirestoreStore<Tier>("tiers"), API_RESPONSE_TIME)


export const getAllTiers = (): Promise<Tier[]> => TIER_STORE.getAll()

export const getTier = (id: string): Promise<Tier|null> => TIER_STORE.get(id)

export const getTiersOfRank = async (rankId: string): Promise<Tier[]> => {
    const tiers = await TIER_STORE.getAll()
    return tiers.filter(tier => tier.rankId === rankId)
}

export const createTier = async (tier: Tier): Promise<string> => {
    tier.creationDate = new Date()
    tier.lastUpdateDate = new Date()
    return await TIER_STORE.create(tier)
}

export const updateTier = (tier: Tier): Promise<void> => {
    tier.lastUpdateDate = new Date()
    return TIER_STORE.update(tier)
}

export const deleteTier = async (id: string): Promise<void> => {
    const tier = await TIER_STORE.get(id)
    const tiersOfRank = await getTiersOfRank(tier?.rankId || "")
    const updateOrderPromises = tiersOfRank
        .filter(tier => tier.id !== id)
        .sort((tierA, tierB) => tierA.order - tierB.order)
        .map((tier, index) => { return { ...tier, order: index + 1 } })
        .map(updateTier)
    await Promise.all(updateOrderPromises)

    await deleteAssignmentsOfTier(id)

    await TIER_STORE.delete(id)
}

export const deleteTiersOfRank = async (rankId: string): Promise<void> => {
    const tiers = await getTiersOfRank(rankId)
    await Promise.all(tiers.map(tier => tier.id).map(deleteTier))
}