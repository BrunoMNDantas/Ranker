import { generateId } from "./Services.utils";

export interface Entity {
    id: string
}

export default class Store<T extends Entity> {

    entities: T[] = []


    constructor(entities: T[]) {
        this.entities = entities
    }


    getAll(): T[] {
        return this.entities.map(entity => { return {...entity} })
    }

    get(id: string): T|null {
        const entity = this.entities.find(entity => entity.id === id)
        return entity ? {...entity} : null
    }

    create(entity: T): string {
        const id = generateId()
        entity.id = id

        this.entities.push({...entity})

        return id
    }

    update(entity: T): void {
        const index = this.entities.findIndex(e => e.id === entity.id)
        if(index === -1) {
            throw new Error("NON_EXISTENT_ENTITY")
        }

        this.entities[index] = {...entity}
    }

    delete(id: string): void {
        this.entities = this.entities.filter(entity => entity.id !== id)
    }

}