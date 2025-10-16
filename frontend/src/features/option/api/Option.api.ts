import { Option } from "../model/Option.types"
import { deleteAssignmentsOfOption } from "../../assignment/api/Assignment.api"
import { OPTION_STORE } from "../../../services/store/Stores"


export const getAllOptions = (): Promise<Option[]> => OPTION_STORE.getAll()

export const getOption = (id: string): Promise<Option|null> => OPTION_STORE.get(id)

export const getOptionsByIds = (ids: string[]): Promise<Option[]> => OPTION_STORE.getByIds(ids)

export const getOptionsOfRank = async (rankId: string): Promise<Option[]> => {
    const options = await OPTION_STORE.getAll()
    return options.filter(option => option.rankId === rankId)
}

export const getOptionsOfUser = async (ownerId: string): Promise<Option[]> => {
    const options = await OPTION_STORE.getAll()
    return options.filter(option => option.ownerId === ownerId)
}

export const createOption = (option: Option): Promise<string> => OPTION_STORE.create(option)

export const updateOption = (option: Option): Promise<void> => OPTION_STORE.update(option)

export const deleteOption = async (id: string): Promise<void> => {
    const option = await OPTION_STORE.get(id)
    const optionsOfRank = await getOptionsOfRank(option?.rankId || "")
    const updateOrderPromises = optionsOfRank
        .filter(option => option.id !== id)
        .sort((optionA, optionB) => optionA.order - optionB.order)
        .map((option, index) => { return { ...option, order: index + 1 } })
        .map(updateOption)
    await Promise.all(updateOrderPromises)

    await deleteAssignmentsOfOption(id)

    await OPTION_STORE.delete(id)
}

export const deleteOptionsOfRank = async (rankId: string): Promise<void> => {
    const options = await getOptionsOfRank(rankId)
    await Promise.all(options.map(option => option.id).map(deleteOption))
}

export const deleteOptionsOfUser = async (ownerId: string): Promise<void> => {
    const options = await getOptionsOfUser(ownerId)
    await Promise.all(options.map(option => option.id).map(deleteOption))
}