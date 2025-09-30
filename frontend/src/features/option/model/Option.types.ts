export interface Option {
    id: string
    creationDate: Date
    lastUpdateDate: Date
    ownerId: string
    rankId: string
    order: number
    title: string
    description: string | null
    imageUrl: string | null
    color: string | null
}