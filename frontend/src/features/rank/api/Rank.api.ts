import { Rank } from "../model/Rank.types"
import Store from "../../../services/store/Store"
import { RANK_STORE } from "../../../services/store/Stores"
import { deleteOptionsOfRank } from "../../option/api/Option.api"
import { deleteTiersOfRank } from "../../tier/api/Tier.api"
import { deleteVotesOfRank } from "../../vote/api/Vote.api"

export class RankApi {
    constructor(private store: Store<Rank>) {}

    getAllRanks(): Promise<Rank[]> {
        return this.store.getAll()
    }

    getRank(id: string): Promise<Rank|null> {
        return this.store.get(id)
    }

    getRanksByIds(ids: string[]): Promise<Rank[]> {
        return this.store.getByIds(ids)
    }

    async getRanksOfUser(ownerId: string): Promise<Rank[]> {
        const ranks = await this.store.getAll()
        return ranks.filter(rank => rank.ownerId === ownerId)
    }

    createRank(rank: Rank): Promise<string> {
        return this.store.create(rank)
    }

    updateRank(rank: Rank): Promise<void> {
        return this.store.update(rank)
    }

    async deleteRank(id: string): Promise<void> {
        await deleteTiersOfRank(id)
        await deleteOptionsOfRank(id)
        await deleteVotesOfRank(id)

        await this.store.delete(id)
    }

    async deleteRanksOfUser(ownerId: string): Promise<void> {
        const ranks = await this.getRanksOfUser(ownerId)
        await Promise.all(ranks.map(rank => rank.id).map(this.deleteRank.bind(this)))
    }
}

export const rankApi = new RankApi(RANK_STORE)

export const getAllRanks = rankApi.getAllRanks.bind(rankApi)
export const getRank = rankApi.getRank.bind(rankApi)
export const getRanksByIds = rankApi.getRanksByIds.bind(rankApi)
export const getRanksOfUser = rankApi.getRanksOfUser.bind(rankApi)
export const createRank = rankApi.createRank.bind(rankApi)
export const updateRank = rankApi.updateRank.bind(rankApi)
export const deleteRank = rankApi.deleteRank.bind(rankApi)
export const deleteRanksOfUser = rankApi.deleteRanksOfUser.bind(rankApi)
