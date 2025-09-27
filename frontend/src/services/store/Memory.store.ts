import { generateId } from "../Services.utils";
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

    create(entity: T): Promise<string> {
        const id = generateId()
        entity.id = id

        this.entities.push(structuredClone(entity))

        return Promise.resolve(id)
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