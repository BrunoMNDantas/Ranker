import Store, { Entity as StoreEntity } from "../Store";

export interface Entity extends StoreEntity {
    creationDate: Date
    lastUpdateDate: Date
}

export const DEFAULT_ID_GENERATOR = <T extends Entity>(entity: T) => crypto.randomUUID().toString()

export default class EntityStore<T extends Entity> implements Store<T> {

    sourceStore: Store<T>
    idGenerator: (entity: T) => string


    constructor(sourceStore: Store<T>, idGenerator: (entity: T)=>string = DEFAULT_ID_GENERATOR) {
        this.sourceStore = sourceStore
        this.idGenerator = idGenerator
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
        entity.id = this.idGenerator(entity)
        entity.creationDate = new Date()
        entity.lastUpdateDate = entity.creationDate

        return this.sourceStore.create(entity)
    }

    update(entity: T): Promise<void> {
        entity.lastUpdateDate = new Date()
        return this.sourceStore.update(entity)
    }

    delete(id: string): Promise<void> {
        return this.sourceStore.delete(id)
    }

}