import { Assignment } from "../entities/Assignment";
import { Vote } from "../entities/Vote";
import { createAssignment, createVote } from "./EntityFactory.service";

export function createNewVote({ id, assignments }: Vote = {}): Vote {
    return createVote({ id, assignments })
}

export function createNewAssignment({ optionId, tierId }: Assignment = {}): Assignment {
    return createAssignment({ optionId, tierId })
}