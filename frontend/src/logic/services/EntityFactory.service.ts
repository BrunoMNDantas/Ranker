import type { Rank } from "../entities/Rank";
import type { Tier } from "../entities/Tier";
import type { Option } from "../entities/Option";
import type { Vote } from "../entities/Vote";
import type { Assignment } from "../entities/Assignment";

export function createRank({ id, title, tiersIds = [], optionsIds = [], votesIds = [] }: Rank = {}): Rank {
    return { id, title, tiersIds, optionsIds, votesIds }
}

export function createTier({ id, title }: Tier = {}): Tier {
    return { id, title }
}

export function createOption({ id, title }: Option = {}): Option {
    return { id, title }
}

export function createVote({ id, assignments = [] }: Vote = {}): Vote {
    return { id, assignments }
}

export function createAssignment({ optionId, tierId }: Assignment = {}): Assignment {
    return { optionId, tierId }
}