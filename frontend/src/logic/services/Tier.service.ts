import { Tier } from "../entities/Tier"
import { createTier } from "./EntityFactory.service"
import { generateId } from "./Services.utils"

export const DEFAULT_TIER_TITLE = "Tier"

export const createNewTier = ({ id = generateId(), title = DEFAULT_TIER_TITLE }: Tier = {}): Tier => {
    return createTier({ id, title })
}