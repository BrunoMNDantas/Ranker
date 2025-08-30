import { Tier } from "../entities/Tier"
import { createTier } from "./EntityFactory.service"
import { generateId } from "./Services.utils"

export const DEFAULT_TIER_TITLE = "Tier"

export const createNewTier = (partial: Partial<Tier>): Tier => {
    return createTier({ id: generateId(), creationDate: new Date(), title: DEFAULT_TIER_TITLE, ...partial })
}