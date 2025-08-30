import type { Rank } from "../entities/Rank";
import type { Tier } from "../entities/Tier";
import type { Option } from "../entities/Option";
import type { Vote } from "../entities/Vote";
import type { Assignment } from "../entities/Assignment";

export const createRank = ({ id, creationDate, title }: Rank = {}): Rank => {
    return { id, creationDate, title }
}

export const createTier = ({ id, creationDate, rankId, title }: Tier = {}): Tier => {
    return { id, creationDate, rankId, title }
}

export const createOption = ({ id, creationDate, rankId, title }: Option = {}): Option => {
    return { id, creationDate, rankId, title }
}

export const createVote = ({ id, creationDate, rankId }: Vote = {}): Vote => {
    return { id, creationDate, rankId }
}

export const createAssignment = ({ id, creationDate, voteId, optionId, tierId }: Assignment = {}): Assignment => {
    return { id, creationDate, voteId, optionId, tierId }
}