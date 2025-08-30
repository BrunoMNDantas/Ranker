import { Option } from "../entities/Option"
import { createOption } from "./EntityFactory.service"
import { generateId } from "./Services.utils"

export const DEFAULT_OPTION_TITLE = "Option"

export const createNewOption = (partial: Partial<Option>): Option => {
    return createOption({ id: generateId(), creationDate: new Date(), title: DEFAULT_OPTION_TITLE, ...partial })
}