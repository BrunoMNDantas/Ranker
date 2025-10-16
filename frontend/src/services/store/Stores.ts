import DelayedStore from "./delayed/Delayed.store"
import AuthStore from "./auth/Auth.store"
import EntityStore, { Entity as EntityStoreEntity } from "./entity/Entity.store"
import FirestoreStore, { AUTH } from "./firebase/Firestore.store"
import { API_RESPONSE_TIME } from "../../app/Constants"
import Store from "./Store"

import { Assignment } from "../../features/assignment/model/Assignment.types"
import { Rank } from "../../features/rank/model/Rank.types"
import { Tier } from "../../features/tier/model/Tier.types"
import { Option } from "../../features/option/model/Option.types"
import { Vote } from "../../features/vote/model/Vote.types"
import { User } from "../../features/user/model/User.types"

interface StoreEntity extends EntityStoreEntity {
    ownerId: string
}

function createStore<T extends StoreEntity>(collectionName: string): Store<T> {
    return new DelayedStore<T>(
        new AuthStore<T>(
            new EntityStore<T>(
                new FirestoreStore<T>(collectionName)
            ),
            () => AUTH.currentUser?.uid || ""
        ),
        API_RESPONSE_TIME
    )
}

function createEntityStore<T extends EntityStoreEntity>(
    collectionName: string,
    idGenerator?: (entity: T) => string
): Store<T> {
    return new DelayedStore<T>(
        new EntityStore<T>(
            new FirestoreStore<T>(collectionName),
            idGenerator
        ),
        API_RESPONSE_TIME
    )
}

export const ASSIGNMENT_STORE = createStore<Assignment>("assignments")
export const RANK_STORE = createStore<Rank>("ranks")
export const TIER_STORE = createStore<Tier>("tiers")
export const OPTION_STORE = createStore<Option>("options")
export const VOTE_STORE = createStore<Vote>("votes")
export const USER_STORE = createEntityStore<User>("users", user => user.id)