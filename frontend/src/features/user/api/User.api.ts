import DelayedStore from "../../../services/store/delayed/Delayed.store"
import Store from "../../../services/store/Store"
import FirestoreStore from "../../../services/store/firebase/Firestore.store"
import { API_RESPONSE_TIME } from "../../../app/Constants"
import { User } from "../model/User.types"
import EntityStore from "../../../services/store/entity/Entity.store"
import { deleteRanksOfUser } from "../../rank/api/Rank.api"
import { deleteTiersOfUser } from "../../tier/api/Tier.api"
import { deleteOptionsOfUser } from "../../option/api/Option.api"
import { deleteVotesOfUser } from "../../vote/api/Vote.api"
import { deleteAssignmentsOfUser } from "../../assignment/api/Assignment.api"

export const USER_STORE: Store<User> = new DelayedStore(
    new EntityStore(new FirestoreStore("users"), user => user.id),
    API_RESPONSE_TIME
)


export const getAllUsers = (): Promise<User[]> => USER_STORE.getAll()

export const getUser = (id: string): Promise<User|null> => USER_STORE.get(id)

export const getUsersByIds = (ids: string[]): Promise<User[]> => USER_STORE.getByIds(ids)

export const createUser = (user: User): Promise<string> => USER_STORE.create(user)

export const updateUser = (user: User): Promise<void> => USER_STORE.update(user)

export const deleteUser = async (id: string): Promise<void> => {
    await deleteAssignmentsOfUser(id)
    await deleteVotesOfUser(id)
    await deleteOptionsOfUser(id)
    await deleteTiersOfUser(id)
    await deleteRanksOfUser(id)

    await USER_STORE.delete(id)
}