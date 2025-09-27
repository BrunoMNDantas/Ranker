import Store, { Entity } from "./Store";

export default class DelayedStore<T extends Entity> implements Store<T> {

    sourceStore: Store<T>
    delay: number


    constructor(sourceStore: Store<T>, delay: number) {
        this.sourceStore = sourceStore
        this.delay = delay
    }


    execute = <K,>(func: () => Promise<K>): Promise<K> => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                func()
                    .then(resolve)
                    .catch(reject)
            }, this.delay)
        })
    }

    getAll(): Promise<T[]> {
        return this.execute(() => this.sourceStore.getAll())
    }

    get(id: string): Promise<T|null> {
        return this.execute(() => this.sourceStore.get(id))
    }

    create(entity: T): Promise<string> {
        return this.execute(() => this.sourceStore.create(entity))
    }

    update(entity: T): Promise<void> {
        return this.execute(() => this.sourceStore.update(entity))
    }

    delete(id: string): Promise<void> {
        return this.execute(() => this.sourceStore.delete(id))
    }

}