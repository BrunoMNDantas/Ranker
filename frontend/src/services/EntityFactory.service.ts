import type { Rank } from "../features/rank/model/Rank.types";
import type { Tier } from "../features/tier/model/Tier.types";
import type { Option } from "../features/option/model/Option.types";
import type { Vote } from "../features/vote/model/Vote.types";
import type { Assignment } from "../features/assignment/model/Assignment.types";

export const createRank = (partial: Partial<Rank>): Rank => {
    return { id: "", creationDate: new Date(), lastUpdateDate: new Date(), title: "", description: null, imageUrl: null, color: null, ...partial }
}

export const createTier = (partial: Partial<Tier>): Tier => {
    return { id: "", creationDate: new Date(), lastUpdateDate: new Date(), rankId: "", order: 0, title: "", description: null, imageUrl: null, color: null, ...partial }
}

export const createOption = (partial: Partial<Option>): Option => {
    return { id: "", creationDate: new Date(), lastUpdateDate: new Date(), rankId: "", order: 0, title: "", description: null, imageUrl: null, color: null, ...partial }
}

export const createVote = (partial: Partial<Vote>): Vote => {
    return { id: "", creationDate: new Date(), lastUpdateDate: new Date(), rankId: "", ...partial }
}

export const createAssignment = (partial: Partial<Assignment>): Assignment => {
    return { id: "", creationDate: new Date(), lastUpdateDate: new Date(), voteId: "", order: 0, optionId: "", tierId: "", ...partial}
}