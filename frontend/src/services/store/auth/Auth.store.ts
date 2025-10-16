import Store, { Entity as StoreEntity } from "../Store";

export interface Entity extends StoreEntity {
    ownerId: string
}

export default class AuthStore<T extends Entity> implements Store<T> {

    sourceStore: Store<T>
    ownerIdGetter: (entity: T) => string


    constructor(sourceStore: Store<T>, ownerIdGetter: (entity: T)=>string) {
        this.sourceStore = sourceStore
        this.ownerIdGetter = ownerIdGetter
    }


    getAll(): Promise<T[]> {
        return this.sourceStore.getAll()
    }

    get(id: string): Promise<T|null> {
        return this.sourceStore.get(id)
    }

    getByIds(ids: string[]): Promise<T[]> {
        return this.sourceStore.getByIds(ids)
    }

    create(entity: T): Promise<string> {
        entity.ownerId = this.ownerIdGetter(entity)
        return this.sourceStore.create(entity)
    }

    update(entity: T): Promise<void> {
        return this.sourceStore.update(entity)
    }

    delete(id: string): Promise<void> {
        return this.sourceStore.delete(id)
    }

}