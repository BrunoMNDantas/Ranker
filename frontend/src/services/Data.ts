const MOCKED_DATA = [
    {
        id: "1",
        title: "Rank of bands Bands with a realy long name to check what happens with the UI",
        description: "The aim of this Rank is to classify Bands. Each band should be assigned to a tier on the list. You can then compare your vote with other user's votes to check if you are like the norm.",
        imageUrl: "https://www.shyamh.com/images/blog/music.jpg",
        tiers: [
            {id: "1", title: "First", description: null, imageUrl: "https://www.pngmart.com/files/7/Good-PNG-Transparent.png"},
            {id: "2", title: "Second", description: null, imageUrl: null},
            {id: "3", title: "Third", description: null, imageUrl: null},
            {id: "3", title: "Fourth Fourth Fourth Fourth Fourth Fourth Fourth Fourth Fourth Fourth", description: "Fourth Fourth Fourth Fourth Fourth Fourth Fourth Fourth Fourth Fourth", imageUrl: null},
        ],
        options: [
            {id: "1", title: "Scorpions", description: null, imageUrl: "https://i.scdn.co/image/2f123bb26564d8a4cc63bc396a094cc4a74dc782"},
            {id: "2", title: "Linkin Park", description: null, imageUrl: null},
            {id: "3", title: "U2", description: null, imageUrl: null},
            {id: "3", title: "GunsN'Roses GunsN'Roses GunsN'Roses GunsN'Roses GunsN'Roses GunsN'Roses GunsN'Roses", description: "GunsN'Roses GunsN'Roses GunsN'Roses GunsN'Roses GunsN'Roses GunsN'Roses GunsN'Roses", imageUrl: null}
        ],
        votes: [
            {id: "1", assignments: [{id: "1", tierId: "2", optionId: "1"}, {id: "2", tierId: "1", optionId: "2"}, {id: "3", tierId: "3", optionId: "3"}]},
            {id: "2", assignments: [{id: "1", tierId: "1", optionId: "2"}, {id: "2", tierId: "2", optionId: "3"}, {id: "3", tierId: "3", optionId: "1"}]}
        ]
    },
    {
        id: "2",
        title: "Foods",
        description: null,
        imageUrl: null,
        tiers: [
            {id: "1", title: "Good", description: null, imageUrl: null},
            {id: "2", title: "Medium", description: null, imageUrl: null},
            {id: "3", title: "Bad", description: null, imageUrl: null}
        ],
        options: [
            {id: "1", title: "Hamburguer", description: null, imageUrl: null},
            {id: "2", title: "Pizza", description: null, imageUrl: null},
            {id: "3", title: "Rice", description: null, imageUrl: null}
        ],
        votes: [
            {id: "1", assignments: [{id: "1", tierId: "2", optionId: "1"}, {id: "2", tierId: "1", optionId: "2"}, {id: "3", tierId: "3", optionId: "3"}]},
            {id: "2", assignments: [{id: "1", tierId: "1", optionId: "2"}, {id: "2", tierId: "2", optionId: "3"}, {id: "3", tierId: "3", optionId: "1"}]}
        ]
    },
    {
        id: "3",
        title: "Countries",
        description: null,
        imageUrl: null,
        tiers: [
            {id: "1", title: "Big", description: null, imageUrl: null},
            {id: "2", title: "Normal", description: null, imageUrl: null},
            {id: "3", title: "Small", description: null, imageUrl: null}
        ],
        options: [
            {id: "1", title: "USA", description: null, imageUrl: null},
            {id: "2", title: "Portugal", description: null, imageUrl: null},
            {id: "3", title: "Spain", description: null, imageUrl: null}
        ],
        votes: [
            {id: "1", assignments: [{id: "1", tierId: "2", optionId: "1"}, {id: "2", tierId: "1", optionId: "2"}, {id: "3", tierId: "3", optionId: "3"}]},
            {id: "2", assignments: [{id: "1", tierId: "1", optionId: "2"}, {id: "2", tierId: "2", optionId: "3"}, {id: "3", tierId: "3", optionId: "1"}]}
        ]
    }
];

export const RANKS = MOCKED_DATA.map(rank => {
    return {
        id: rank.id,
        creationDate: new Date(),
        title: rank.title,
        description: rank.description,
        imageUrl: rank.imageUrl
    }
})

export const TIERS = MOCKED_DATA.map(rank => {
    return rank.tiers.map(tier => {
        return {
            id: rank.id + "-" + tier.id,
            creationDate: new Date(),
            rankId: rank.id,
            title: tier.title,
            description: tier.description,
            imageUrl: tier.imageUrl
        }
    })
}).flat()

export const OPTIONS = MOCKED_DATA.map(rank => {
    return rank.options.map(option => {
        return {
            id: rank.id + "-" + option.id,
            creationDate: new Date(),
            rankId: rank.id,
            title: option.title,
            description: option.description,
            imageUrl: option.imageUrl
        }
    })
}).flat()

export const VOTES = MOCKED_DATA.map(rank => {
    return rank.votes.map(vote => {
        return {
            id: rank.id + "-" + vote.id,
            creationDate: new Date(),
            rankId: rank.id
        }
    })
}).flat()

export const ASSIGNMENTS = MOCKED_DATA.map(rank => {
    return rank.votes.map(vote => {
        return vote.assignments.map(assignment => {
            return {
                id: rank.id + "-" + vote.id + "-" + assignment.id,
                creationDate: new Date(),
                voteId: rank + "-" + vote.id,
                optionId: rank.id + "-" + assignment.optionId,
                tierId: rank.id + "-" + assignment.tierId
            }
        })
    }).flat()
}).flat()