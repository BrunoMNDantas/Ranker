import { Rank } from "../entities/Rank"
import { createRank } from "./EntityFactory.service"
import { generateId } from "./Services.utils"

export const DEFAULT_RANK_TITLE = "Rank"

export function createNewRank({ id = generateId(), title = DEFAULT_RANK_TITLE, tiersIds, optionsIds, votesIds}: Rank = {}): Rank {
    return createRank({ id, title, tiersIds, optionsIds, votesIds })
}