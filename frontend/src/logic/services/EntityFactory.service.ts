import type { Rank } from "../entities/Rank";
import type { Tier } from "../entities/Tier";
import type { Option } from "../entities/Option";
import type { Vote } from "../entities/Vote";
import type { Assignment } from "../entities/Assignment";

export const createRank = (partial: Partial<Rank>): Rank => {
    return { id: null, creationDate: null, title: null, ...partial }
}

export const createTier = (partial: Partial<Tier>): Tier => {
    return { id: null, creationDate: null, rankId: null, title: null, ...partial }
}

export const createOption = (partial: Partial<Option>): Option => {
    return { id: null, creationDate: null, rankId: null, title: null, ...partial }
}

export const createVote = (partial: Partial<Vote>): Vote => {
    return { id: null, creationDate: null, rankId: null, ...partial }
}

export const createAssignment = (partial: Partial<Assignment>): Assignment => {
    return { id: null, creationDate: null, voteId: null, optionId: null, tierId: null, ...partial}
}