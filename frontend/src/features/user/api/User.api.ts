import DelayedStore from "../../../services/store/Delayed.store"
import Store from "../../../services/store/Store"
import FirestoreStore from "../../../services/store/Firestore.store"
import { API_RESPONSE_TIME } from "../../../app/Constants"
import { User } from "../model/User.types"

export const USER_STORE: Store<User> = new DelayedStore<User>(new FirestoreStore<User>("users", (user: User) => user.id), API_RESPONSE_TIME)


export const getAllUsers = (): Promise<User[]> => USER_STORE.getAll()

export const getUser = (id: string): Promise<User|null> => USER_STORE.get(id)

export const createUser = async (user: User): Promise<string> => {
    user.creationDate = new Date()
    user.lastUpdateDate = new Date()
    return await USER_STORE.create(user)
}

export const updateUser = (user: User): Promise<void> => {
    user.lastUpdateDate = new Date()
    return USER_STORE.update(user)
}

export const deleteUser = async (id: string): Promise<void> => USER_STORE.delete(id)