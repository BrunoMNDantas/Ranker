import { Tier } from "../model/Tier.types"
import { deleteAssignmentsOfTier } from "../../assignment/api/Assignment.api"
import { TIERS } from "../../../services/Data"
import { delay, Delayed } from "../../../services/DelayedStore"
import Store from "../../../services/Store"

export const TIER_STORE: Delayed<Store<Tier>> = delay(new Store(TIERS))


export const getAllTiers = (): Promise<Tier[]> => TIER_STORE.getAll()

export const getTier = (id: string): Promise<Tier|null> => TIER_STORE.get(id)

export const getTiersOfRank = async (rankId: string): Promise<Tier[]> => {
    const tiers = await TIER_STORE.getAll()
    return tiers.filter(tier => tier.rankId === rankId)
}

export const createTier = async (tier: Tier): Promise<string> => {
    tier.creationDate = new Date()
    return await TIER_STORE.create(tier)
}

export const updateTier = (tier: Tier): Promise<void> => TIER_STORE.update(tier)

export const deleteTier = async (id: string): Promise<void> => {
    await deleteAssignmentsOfTier(id)
    await TIER_STORE.delete(id)
}

export const deleteTiersOfRank = async (rankId: string): Promise<void> => {
    const tiers = await getTiersOfRank(rankId)
    await Promise.all(tiers.map(tier => tier.id ? deleteTier(tier.id) : Promise.resolve()))
}