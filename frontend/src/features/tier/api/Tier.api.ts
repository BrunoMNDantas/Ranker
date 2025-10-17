import { Tier } from "../model/Tier.types"
import Store from "../../../services/store/Store"
import { TIER_STORE } from "../../../services/store/Stores"
import { deleteAssignmentsOfTier } from "../../assignment/api/Assignment.api"

export class TierApi {
    constructor(private store: Store<Tier>) {}

    getAllTiers(): Promise<Tier[]> {
        return this.store.getAll()
    }

    getTier(id: string): Promise<Tier|null> {
        return this.store.get(id)
    }

    getTiersByIds(ids: string[]): Promise<Tier[]> {
        return this.store.getByIds(ids)
    }

    async getTiersOfRank(rankId: string): Promise<Tier[]> {
        const tiers = await this.store.getAll()
        return tiers.filter(tier => tier.rankId === rankId)
    }

    async getTiersOfUser(ownerId: string): Promise<Tier[]> {
        const tiers = await this.store.getAll()
        return tiers.filter(tier => tier.ownerId === ownerId)
    }

    createTier(tier: Tier): Promise<string> {
        return this.store.create(tier)
    }

    updateTier(tier: Tier): Promise<void> {
        return this.store.update(tier)
    }

    async deleteTier(id: string): Promise<void> {
        const tier = await this.store.get(id)
        const tiersOfRank = await this.getTiersOfRank(tier?.rankId || "")
        const updateOrderPromises = tiersOfRank
            .filter(tier => tier.id !== id)
            .sort((tierA, tierB) => tierA.order - tierB.order)
            .map((tier, index) => { return { ...tier, order: index + 1 } })
            .map(this.updateTier.bind(this))
        await Promise.all(updateOrderPromises)

        await deleteAssignmentsOfTier(id)

        await this.store.delete(id)
    }

    async deleteTiersOfRank(rankId: string): Promise<void> {
        const tiers = await this.getTiersOfRank(rankId)
        await Promise.all(tiers.map(tier => tier.id).map(this.deleteTier.bind(this)))
    }

    async deleteTiersOfUser(ownerId: string): Promise<void> {
        const tiers = await this.getTiersOfUser(ownerId)
        await Promise.all(tiers.map(tier => tier.id).map(this.deleteTier.bind(this)))
    }
}

export const tierApi = new TierApi(TIER_STORE)

export const getAllTiers = tierApi.getAllTiers.bind(tierApi)
export const getTier = tierApi.getTier.bind(tierApi)
export const getTiersByIds = tierApi.getTiersByIds.bind(tierApi)
export const getTiersOfRank = tierApi.getTiersOfRank.bind(tierApi)
export const getTiersOfUser = tierApi.getTiersOfUser.bind(tierApi)
export const createTier = tierApi.createTier.bind(tierApi)
export const updateTier = tierApi.updateTier.bind(tierApi)
export const deleteTier = tierApi.deleteTier.bind(tierApi)
export const deleteTiersOfRank = tierApi.deleteTiersOfRank.bind(tierApi)
export const deleteTiersOfUser = tierApi.deleteTiersOfUser.bind(tierApi)
