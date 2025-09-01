import { Tier } from "../entities/Tier"
import Store, { MOCKED_DATA } from "./Store"

export const TIER_STORE: Store<Tier> = new Store()

export const getAllTiers = (): Promise<Tier[]> => TIER_STORE.getAll()

export const getTier = (id: string): Promise<Tier|null> => TIER_STORE.get(id)

export const getTiersOfRank = async (rankId: string): Promise<Tier[]> => {
    const tiers = await TIER_STORE.getAll()
    return tiers.filter(tier => tier.rankId === rankId)
}

export const createTier = (tier: Tier): Promise<void> => TIER_STORE.create(tier)

export const updateTier = (tier: Tier): Promise<void> => TIER_STORE.update(tier)

export const deleteTier = (id: string): Promise<void> => TIER_STORE.delete(id)

MOCKED_DATA.forEach(rank => {
    rank.tiers.forEach(tier => TIER_STORE.create({
        id: tier.id,
        creationDate: new Date(),
        rankId: rank.id,
        title: tier.title
    }))
})