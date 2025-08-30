import { Tier } from "../entities/Tier"
import { createTier } from "./EntityFactory.service"
import { generateId } from "./Services.utils"

export const DEFAULT_TIER_TITLE = "Tier"

export const createNewTier = ({
    id = generateId(),
    creationDate = new Date(),
    rankId,
    title = DEFAULT_TIER_TITLE
}: Tier = {}): Tier => {
    return createTier({ id, creationDate, rankId, title })
}