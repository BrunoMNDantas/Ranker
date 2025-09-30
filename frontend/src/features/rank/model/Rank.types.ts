export interface Rank {
    id: string
    creationDate: Date
    lastUpdateDate: Date
    ownerId: string
    title: string
    description: string | null
    imageUrl: string | null
    color: string | null
}