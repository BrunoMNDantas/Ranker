import type { Rank } from "../entities/Rank";
import type { Tier } from "../entities/Tier";
import type { Option } from "../entities/Option";
import type { Vote } from "../entities/Vote";
import type { Assignment } from "../entities/Assignment";

export const createRank = ({ id, title, tiersIds = [], optionsIds = [], votesIds = [] }: Rank = {}): Rank => {
    return { id, title, tiersIds, optionsIds, votesIds }
}

export const createTier = ({ id, title }: Tier = {}): Tier => {
    return { id, title }
}

export const createOption = ({ id, title }: Option = {}): Option => {
    return { id, title }
}

export const createVote = ({ id, assignments = [] }: Vote = {}): Vote => {
    return { id, assignments }
}

export const createAssignment = ({ optionId, tierId }: Assignment = {}): Assignment => {
    return { optionId, tierId }
}