import { Option } from "../model/Option.types"
import Store from "../../../services/store/Store"
import { OPTION_STORE } from "../../../services/store/Stores"
import { deleteAssignmentsOfOption } from "../../assignment/api/Assignment.api"

export class OptionApi {
    constructor(private store: Store<Option>) {}

    getAllOptions(): Promise<Option[]> {
        return this.store.getAll()
    }

    getOption(id: string): Promise<Option|null> {
        return this.store.get(id)
    }

    getOptionsByIds(ids: string[]): Promise<Option[]> {
        return this.store.getByIds(ids)
    }

    async getOptionsOfRank(rankId: string): Promise<Option[]> {
        const options = await this.store.getAll()
        return options.filter(option => option.rankId === rankId)
    }

    async getOptionsOfUser(ownerId: string): Promise<Option[]> {
        const options = await this.store.getAll()
        return options.filter(option => option.ownerId === ownerId)
    }

    createOption(option: Option): Promise<string> {
        return this.store.create(option)
    }

    updateOption(option: Option): Promise<void> {
        return this.store.update(option)
    }

    async deleteOption(id: string): Promise<void> {
        const option = await this.store.get(id)
        const optionsOfRank = await this.getOptionsOfRank(option?.rankId || "")
        const updateOrderPromises = optionsOfRank
            .filter(option => option.id !== id)
            .sort((optionA, optionB) => optionA.order - optionB.order)
            .map((option, index) => { return { ...option, order: index + 1 } })
            .map(this.updateOption.bind(this))
        await Promise.all(updateOrderPromises)

        await deleteAssignmentsOfOption(id)

        await this.store.delete(id)
    }

    async deleteOptionsOfRank(rankId: string): Promise<void> {
        const options = await this.getOptionsOfRank(rankId)
        await Promise.all(options.map(option => option.id).map(this.deleteOption.bind(this)))
    }

    async deleteOptionsOfUser(ownerId: string): Promise<void> {
        const options = await this.getOptionsOfUser(ownerId)
        await Promise.all(options.map(option => option.id).map(this.deleteOption.bind(this)))
    }
}

export const optionApi = new OptionApi(OPTION_STORE)

export const getAllOptions = optionApi.getAllOptions.bind(optionApi)
export const getOption = optionApi.getOption.bind(optionApi)
export const getOptionsByIds = optionApi.getOptionsByIds.bind(optionApi)
export const getOptionsOfRank = optionApi.getOptionsOfRank.bind(optionApi)
export const getOptionsOfUser = optionApi.getOptionsOfUser.bind(optionApi)
export const createOption = optionApi.createOption.bind(optionApi)
export const updateOption = optionApi.updateOption.bind(optionApi)
export const deleteOption = optionApi.deleteOption.bind(optionApi)
export const deleteOptionsOfRank = optionApi.deleteOptionsOfRank.bind(optionApi)
export const deleteOptionsOfUser = optionApi.deleteOptionsOfUser.bind(optionApi)