import { User } from "../model/User.types"
import Store from "../../../services/store/Store"
import { USER_STORE } from "../../../services/store/Stores"
import { deleteRanksOfUser } from "../../rank/api/Rank.api"
import { deleteTiersOfUser } from "../../tier/api/Tier.api"
import { deleteOptionsOfUser } from "../../option/api/Option.api"
import { deleteVotesOfUser } from "../../vote/api/Vote.api"
import { deleteAssignmentsOfUser } from "../../assignment/api/Assignment.api"

export class UserApi {
    constructor(private store: Store<User>) {}

    getAllUsers(): Promise<User[]> {
        return this.store.getAll()
    }

    getUser(id: string): Promise<User|null> {
        return this.store.get(id)
    }

    getUsersByIds(ids: string[]): Promise<User[]> {
        return this.store.getByIds(ids)
    }

    createUser(user: User): Promise<string> {
        return this.store.create(user)
    }

    updateUser(user: User): Promise<void> {
        return this.store.update(user)
    }

    async deleteUser(id: string): Promise<void> {
        await deleteAssignmentsOfUser(id)
        await deleteVotesOfUser(id)
        await deleteOptionsOfUser(id)
        await deleteTiersOfUser(id)
        await deleteRanksOfUser(id)

        await this.store.delete(id)
    }
}

export const userApi = new UserApi(USER_STORE)

export const getAllUsers = userApi.getAllUsers.bind(userApi)
export const getUser = userApi.getUser.bind(userApi)
export const getUsersByIds = userApi.getUsersByIds.bind(userApi)
export const createUser = userApi.createUser.bind(userApi)
export const updateUser = userApi.updateUser.bind(userApi)
export const deleteUser = userApi.deleteUser.bind(userApi)