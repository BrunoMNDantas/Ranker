import type { Rank } from "../features/rank/model/Rank.types";
import type { Tier } from "../features/tier/model/Tier.types";
import type { Option } from "../features/option/model/Option.types";
import type { Vote } from "../features/vote/model/Vote.types";
import type { Assignment } from "../features/assignment/model/Assignment.types";

export const createRank = (partial: Partial<Rank>): Rank => {
    return { id: null, creationDate: null, title: null, description: null, imageUrl: null, color: null, ...partial }
}

export const createTier = (partial: Partial<Tier>): Tier => {
    return { id: null, creationDate: null, rankId: null, order: 0, title: null, description: null, imageUrl: null, color: null, ...partial }
}

export const createOption = (partial: Partial<Option>): Option => {
    return { id: null, creationDate: null, rankId: null, order: 0, title: null, description: null, imageUrl: null, color: null, ...partial }
}

export const createVote = (partial: Partial<Vote>): Vote => {
    return { id: null, creationDate: null, rankId: null, ...partial }
}

export const createAssignment = (partial: Partial<Assignment>): Assignment => {
    return { id: null, creationDate: null, voteId: null, order: 0, optionId: null, tierId: null, ...partial}
}