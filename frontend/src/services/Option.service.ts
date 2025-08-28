import { Option } from "../entities/Option"
import { createOption } from "./EntityFactory.service"
import { generateId } from "./Services.utils"

export const DEFAULT_OPTION_TITLE = "Option"

export function createNewOption({ id = generateId(), title = DEFAULT_OPTION_TITLE }: Option = {}): Option {
    return createOption({ id, title })
}