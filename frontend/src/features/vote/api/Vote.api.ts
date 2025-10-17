import { Vote } from "../model/Vote.types"
import Store from "../../../services/store/Store"
import { VOTE_STORE } from "../../../services/store/Stores"
import { deleteAssignmentsOfVote } from "../../assignment/api/Assignment.api"

export class VoteApi {
    constructor(private store: Store<Vote>) {}

    getAllVotes(): Promise<Vote[]> {
        return this.store.getAll()
    }

    getVote(id: string): Promise<Vote|null> {
        return this.store.get(id)
    }

    getVotesByIds(ids: string[]): Promise<Vote[]> {
        return this.store.getByIds(ids)
    }

    async getVotesOfRank(rankId: string): Promise<Vote[]> {
        const votes = await this.store.getAll()
        return votes.filter(vote => vote.rankId === rankId)
    }

    async getVotesOfUser(ownerId: string): Promise<Vote[]> {
        const votes = await this.store.getAll()
        return votes.filter(vote => vote.ownerId === ownerId)
    }

    createVote(vote: Vote): Promise<string> {
        return this.store.create(vote)
    }

    updateVote(vote: Vote): Promise<void> {
        return this.store.update(vote)
    }

    async deleteVote(id: string): Promise<void> {
        await deleteAssignmentsOfVote(id)
        await this.store.delete(id)
    }

    async deleteVotesOfRank(rankId: string): Promise<void> {
        const votes = await this.getVotesOfRank(rankId)
        await Promise.all(votes.map(vote => vote.id).map(this.deleteVote.bind(this)))
    }

    async deleteVotesOfUser(ownerId: string): Promise<void> {
        const votes = await this.getVotesOfUser(ownerId)
        await Promise.all(votes.map(vote => vote.id).map(this.deleteVote.bind(this)))
    }
}

export const voteApi = new VoteApi(VOTE_STORE)

export const getAllVotes = voteApi.getAllVotes.bind(voteApi)
export const getVote = voteApi.getVote.bind(voteApi)
export const getVotesByIds = voteApi.getVotesByIds.bind(voteApi)
export const getVotesOfRank = voteApi.getVotesOfRank.bind(voteApi)
export const getVotesOfUser = voteApi.getVotesOfUser.bind(voteApi)
export const createVote = voteApi.createVote.bind(voteApi)
export const updateVote = voteApi.updateVote.bind(voteApi)
export const deleteVote = voteApi.deleteVote.bind(voteApi)
export const deleteVotesOfRank = voteApi.deleteVotesOfRank.bind(voteApi)
export const deleteVotesOfUser = voteApi.deleteVotesOfUser.bind(voteApi)