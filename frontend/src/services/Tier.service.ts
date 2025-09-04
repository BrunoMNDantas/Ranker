import { Tier } from "../features/tier/model/Tier.types"
import { createTier } from "./EntityFactory.service"
import { generateId } from "./Services.utils"
export const createNewTier = (partial: Partial<Tier>): Tier => {
    return createTier({ id: generateId(), creationDate: new Date(), ...partial })
}