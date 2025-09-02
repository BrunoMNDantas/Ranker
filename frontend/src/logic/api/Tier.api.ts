import { Tier } from "../entities/Tier"
import { TIERS } from "./Data"
import { delay, Delayed } from "./DelayedStore"
import Store from "./Store"

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

export const deleteTier = (id: string): Promise<void> => TIER_STORE.delete(id)