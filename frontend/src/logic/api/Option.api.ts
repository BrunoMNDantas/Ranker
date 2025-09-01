import { Option } from "../entities/Option"
import Store, { MOCKED_DATA } from "./Store"

export const OPTION_STORE: Store<Option> = new Store()

export const getAllOptions = (): Promise<Option[]> => OPTION_STORE.getAll()

export const getOption = (id: string): Promise<Option|null> => OPTION_STORE.get(id)

export const getOptionsOfRank = async (rankId: string): Promise<Option[]> => {
    const options = await OPTION_STORE.getAll()
    return options.filter(option => option.rankId === rankId)
}

export const createOption = (option: Option): Promise<void> => OPTION_STORE.create(option)

export const updateOption = (option: Option): Promise<void> => OPTION_STORE.update(option)

export const deleteOption = (id: string): Promise<void> => OPTION_STORE.delete(id)

MOCKED_DATA.forEach(rank => {
    rank.options.forEach(option => OPTION_STORE.create({
        id: option.id,
        creationDate: new Date(),
        rankId: rank.id,
        title: option.title,
    }))
})