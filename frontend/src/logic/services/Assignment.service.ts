import { Assignment } from "../entities/Assignment";
import { createAssignment } from "./EntityFactory.service";
import { generateId } from "./Services.utils";

export const createNewAssignment = ({
    id = generateId(),
    creationDate = new Date(),
    voteId,
    optionId,
    tierId
}: Assignment = {}): Assignment => {
    return createAssignment({ id, creationDate, voteId, optionId, tierId })
}