import { Option } from "../features/option/model/Option.types"
import { createOption } from "./EntityFactory.service"
import { generateId } from "./Services.utils"

export const createNewOption = (partial: Partial<Option>): Option => {
    return createOption({ id: generateId(), creationDate: new Date(), ...partial })
}