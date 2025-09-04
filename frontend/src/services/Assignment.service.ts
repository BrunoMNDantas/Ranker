import { Assignment } from "../features/assignment/model/Assignment.types";
import { createAssignment } from "./EntityFactory.service";
import { generateId } from "./Services.utils";

export const createNewAssignment = (partial: Partial<Assignment>): Assignment => {
    return createAssignment({ id: generateId(), creationDate: new Date(), ...partial})
}