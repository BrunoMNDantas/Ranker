import { Rank } from "../entities/Rank"
import { createRank } from "./EntityFactory.service"
import { generateId } from "./Services.utils"

export const createNewRank = (partial: Partial<Rank>): Rank => {
    return createRank({ id: generateId(), creationDate: new Date(), ...partial })
}