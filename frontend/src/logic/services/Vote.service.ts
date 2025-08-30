import { Vote } from "../entities/Vote";
import { createVote } from "./EntityFactory.service";
import { generateId } from "./Services.utils";

export const createNewVote = (partial: Partial<Vote>): Vote => {
    return createVote({ id: generateId(), creationDate: new Date(), ...partial })
}