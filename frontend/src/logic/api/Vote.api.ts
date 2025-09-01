import { Vote } from "../entities/Vote"
import Store, { MOCKED_DATA } from "./Store"

export const VOTE_STORE: Store<Vote> = new Store()

export const getAllVotes = (): Promise<Vote[]> => VOTE_STORE.getAll()

export const getVote = (id: string): Promise<Vote|null> => VOTE_STORE.get(id)

export const getVotesOfRank = async (rankId: string): Promise<Vote[]> => {
    const votes = await VOTE_STORE.getAll()
    return votes.filter(vote => vote.rankId === rankId)
}

export const createVote = (vote: Vote): Promise<void> => VOTE_STORE.create(vote)

export const updateVote = (vote: Vote): Promise<void> => VOTE_STORE.update(vote)

export const deleteVote = (id: string): Promise<void> => VOTE_STORE.delete(id)

MOCKED_DATA.forEach(rank => {
    rank.votes.forEach(vote => VOTE_STORE.create({
        id: vote.id,
        creationDate: new Date(),
        rankId: rank.id
    }))
})