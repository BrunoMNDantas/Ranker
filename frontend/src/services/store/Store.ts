export interface Entity {
    id: string
}

export default interface Store<T extends Entity> {
    getAll(): Promise<T[]>

    get(id: string): Promise<T|null>

    create(entity: T): Promise<string>

    update(entity: T): Promise<void>

    delete(id: string): Promise<void>
}