import { Option } from "../entities/Option"
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

export const createOption = (option: Option): Promise<string> => OPTION_STORE.create(option)

export const updateOption = (option: Option): Promise<void> => OPTION_STORE.update(option)

export const deleteOption = (id: string): Promise<void> => OPTION_STORE.delete(id)