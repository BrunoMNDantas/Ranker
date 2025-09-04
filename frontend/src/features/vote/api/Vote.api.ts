import { Vote } from "../model/Vote.types"
import { deleteAssignmentsOfVote } from "../../assignment/api/Assignment.api"
import { VOTES } from "../../../services/Data"
import { delay, Delayed } from "../../../services/DelayedStore"
import Store from "../../../services/Store"

export const VOTE_STORE: Delayed<Store<Vote>> = delay(new Store(VOTES))


export const getAllVotes = (): Promise<Vote[]> => VOTE_STORE.getAll()

export const getVote = (id: string): Promise<Vote|null> => VOTE_STORE.get(id)

export const getVotesOfRank = async (rankId: string): Promise<Vote[]> => {
    const votes = await VOTE_STORE.getAll()
    return votes.filter(vote => vote.rankId === rankId)
}

export const createVote = async (vote: Vote): Promise<string> => {
    vote.creationDate = new Date()
    return await VOTE_STORE.create(vote)
}

export const updateVote = (vote: Vote): Promise<void> => VOTE_STORE.update(vote)

export const deleteVote = async (id: string): Promise<void> => {
    await deleteAssignmentsOfVote(id)
    await VOTE_STORE.delete(id)
}

export const deleteVotesOfRank = async (rankId: string): Promise<void> => {
    const votes = await getVotesOfRank(rankId)
    await Promise.all(votes.map(vote => vote.id ? deleteVote(vote.id) : Promise.resolve()))
}