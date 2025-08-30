import { Vote } from "../entities/Vote";
import { createVote } from "./EntityFactory.service";
import { generateId } from "./Services.utils";

export const createNewVote = ({
    id = generateId(),
    creationDate = new Date(),
    rankId
}: Vote = {}): Vote => {
    return createVote({ id, creationDate, rankId })
}