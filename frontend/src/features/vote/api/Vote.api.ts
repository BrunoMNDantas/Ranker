import { Vote } from "../model/Vote.types"
import { deleteAssignmentsOfVote } from "../../assignment/api/Assignment.api"
import { VOTE_STORE } from "../../../services/store/Stores"


export const getAllVotes = (): Promise<Vote[]> => VOTE_STORE.getAll()

export const getVote = (id: string): Promise<Vote|null> => VOTE_STORE.get(id)

export const getVotesByIds = (ids: string[]): Promise<Vote[]> => VOTE_STORE.getByIds(ids)

export const getVotesOfRank = async (rankId: string): Promise<Vote[]> => {
    const votes = await VOTE_STORE.getAll()
    return votes.filter(vote => vote.rankId === rankId)
}

export const getVotesOfUser = async (ownerId: string): Promise<Vote[]> => {
    const votes = await VOTE_STORE.getAll()
    return votes.filter(vote => vote.ownerId === ownerId)
}

export const createVote = (vote: Vote): Promise<string> => VOTE_STORE.create(vote)

export const updateVote = (vote: Vote): Promise<void> => VOTE_STORE.update(vote)

export const deleteVote = async (id: string): Promise<void> => {
    await deleteAssignmentsOfVote(id)
    await VOTE_STORE.delete(id)
}

export const deleteVotesOfRank = async (rankId: string): Promise<void> => {
    const votes = await getVotesOfRank(rankId)
    await Promise.all(votes.map(vote => vote.id).map(deleteVote))
}

export const deleteVotesOfUser = async (ownerId: string): Promise<void> => {
    const votes = await getVotesOfUser(ownerId)
    await Promise.all(votes.map(vote => vote.id).map(deleteVote))
}