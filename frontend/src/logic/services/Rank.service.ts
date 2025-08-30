import { Rank } from "../entities/Rank"
import { createRank } from "./EntityFactory.service"
import { generateId } from "./Services.utils"

export const DEFAULT_RANK_TITLE = "Rank"

export const createNewRank = ({
    id = generateId(),
    creationDate = new Date(),
    title = DEFAULT_RANK_TITLE
}: Rank = {}): Rank => {
    return createRank({ id, creationDate, title })
}