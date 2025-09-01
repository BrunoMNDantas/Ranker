import { API_RESPONSE_TIME } from "../../Constants";

export interface Entity {
    id: string | null;
}

export default class Store<T extends Entity> {

    entities: T[] = []

    getAll(): Promise<T[]> {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(this.entities.map(entity => { return {...entity} }))
            }, API_RESPONSE_TIME)
        });
    }

    get(id: string): Promise<T|null> {
        return new Promise((resolve) => {
            setTimeout(() => {
                const entity = this.entities.find(entity => entity.id === id)
                resolve(entity ? {...entity} : null)
            }, API_RESPONSE_TIME)
        });
    }

    create(entity: T): Promise<void> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if(this.entities.findIndex(e => e.id === entity.id) !== -1) {
                    reject("DUPPLICATED_ENTITY")
                } else {
                    this.entities.push({...entity})
                    resolve()
                }
            }, API_RESPONSE_TIME)
        });
    }

    update(entity: T): Promise<void> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const index = this.entities.findIndex(e => e.id === entity.id)
                if(index === -1) {
                    reject("NON_EXISTENT_ENTITY")
                } else {
                    this.entities[index] = {...entity}
                    resolve()
                }
            }, API_RESPONSE_TIME)
        });
    }

    delete(id: string): Promise<void> {
        return new Promise((resolve) => {
            setTimeout(() => {
                this.entities = this.entities.filter(entity => entity.id !== id)
                resolve()
            }, API_RESPONSE_TIME)
        });
    }

}

export const MOCKED_DATA = [
    {
        id: "1",
        title: "Bands",
        tiers: [
            {id: "1", title: "First"},
            {id: "2", title: "Second"},
            {id: "3", title: "Third"}
        ],
        options: [
            {id: "1", title: "Scorpions"},
            {id: "2", title: "Linkin Park"},
            {id: "3", title: "U2"}
        ],
        votes: [
            {id: "1", assignments: [{id: "1", tierId: "2", optionId: "1"}, {id: "2", tierId: "1", optionId: "2"}, {id: "3", tierId: "3", optionId: "3"}]},
            {id: "2", assignments: [{id: "1", tierId: "1", optionId: "2"}, {id: "2", tierId: "2", optionId: "3"}, {id: "3", tierId: "3", optionId: "1"}]}
        ]
    },
    {
        id: "2",
        title: "Foods",
        tiers: [
            {id: "1", title: "Good"},
            {id: "2", title: "Medium"},
            {id: "3", title: "Bad"}
        ],
        options: [
            {id: "1", title: "Hamburguer"},
            {id: "2", title: "Pizza"},
            {id: "3", title: "Rice"}
        ],
        votes: [
            {id: "1", assignments: [{id: "1", tierId: "2", optionId: "1"}, {id: "2", tierId: "1", optionId: "2"}, {id: "3", tierId: "3", optionId: "3"}]},
            {id: "2", assignments: [{id: "1", tierId: "1", optionId: "2"}, {id: "2", tierId: "2", optionId: "3"}, {id: "3", tierId: "3", optionId: "1"}]}
        ]
    },
    {
        id: "3",
        title: "Countries",
        tiers: [
            {id: "1", title: "Big"},
            {id: "2", title: "Normal"},
            {id: "3", title: "Small"}
        ],
        options: [
            {id: "1", title: "USA"},
            {id: "2", title: "Portugal"},
            {id: "3", title: "Spain"}
        ],
        votes: [
            {id: "1", assignments: [{id: "1", tierId: "2", optionId: "1"}, {id: "2", tierId: "1", optionId: "2"}, {id: "3", tierId: "3", optionId: "3"}]},
            {id: "2", assignments: [{id: "1", tierId: "1", optionId: "2"}, {id: "2", tierId: "2", optionId: "3"}, {id: "3", tierId: "3", optionId: "1"}]}
        ]
    }
];

MOCKED_DATA.forEach(rank => {
    rank.tiers.forEach(tier => tier.id = rank.id + "-" + tier.id)
    rank.options.forEach(option => option.id = rank.id + "-" + option.id)
    rank.votes.forEach(vote => {
        vote.id = rank.id + "-" + vote.id
        vote.assignments.forEach(assignment => {
            assignment.id = vote.id + "-" + assignment.id
            assignment.tierId = rank.id + "-" + assignment.tierId
            assignment.optionId = rank.id + "-" + assignment.optionId
        })
    })
})