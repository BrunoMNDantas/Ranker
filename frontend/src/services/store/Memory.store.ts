import Store, { Entity } from "./Store";

export default class MemoryStore<T extends Entity> implements Store<T> {

    entities: T[] = []


    constructor(entities: T[]) {
        this.entities = entities
    }


    getAll(): Promise<T[]> {
        const entities = this.entities.map(entity => structuredClone(entity))
        return Promise.resolve(entities)
    }

    get(id: string): Promise<T|null> {
        const entity = this.entities.find(entity => entity.id === id)
        return Promise.resolve(structuredClone(entity) || null)
    }

    async getByIds(ids: string[]): Promise<T[]> {
        const promises = ids.map(id => this.get(id))
        const results = await Promise.all(promises)
        return results.filter(entity => entity !== null) as T[]
    }

    create(entity: T): Promise<string> {
        this.entities.push(structuredClone(entity))
        return Promise.resolve(entity.id)
    }

    update(entity: T): Promise<void> {
        const index = this.entities.findIndex(e => e.id === entity.id)
        if(index === -1) {
            throw new Error("NON_EXISTENT_ENTITY")
        }

        this.entities[index] = structuredClone(entity)

        return Promise.resolve()
    }

    delete(id: string): Promise<void> {
        this.entities = this.entities.filter(entity => entity.id !== id)
        return Promise.resolve()
    }

}