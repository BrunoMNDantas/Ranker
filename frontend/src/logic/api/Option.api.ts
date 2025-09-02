import { Option } from "../entities/Option"
import { deleteAssignmentsOfOption } from "./Assignment.api"
import { OPTIONS } from "./Data"
import { delay, Delayed } from "./DelayedStore"
import Store from "./Store"

export const OPTION_STORE: Delayed<Store<Option>> = delay(new Store(OPTIONS))


export const getAllOptions = (): Promise<Option[]> => OPTION_STORE.getAll()

export const getOption = (id: string): Promise<Option|null> => OPTION_STORE.get(id)

export const getOptionsOfRank = async (rankId: string): Promise<Option[]> => {
    const options = await OPTION_STORE.getAll()
    return options.filter(option => option.rankId === rankId)
}

export const createOption = async (option: Option): Promise<string> => {
    option.creationDate = new Date()
    return await OPTION_STORE.create(option)
}

export const updateOption = (option: Option): Promise<void> => OPTION_STORE.update(option)

export const deleteOption = async (id: string): Promise<void> => {
    await deleteAssignmentsOfOption(id)
    await OPTION_STORE.delete(id)
}

export const deleteOptionsOfRank = async (rankId: string): Promise<void> => {
    const options = await getOptionsOfRank(rankId)
    await Promise.all(options.map(option => option.id ? deleteOption(option.id) : Promise.resolve()))
}