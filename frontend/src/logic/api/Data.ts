const MOCKED_DATA = [
    {
        id: "1",
        title: "Rank of bands Bands with a realy long name to check what happens with the UI",
        description: "The aim of this Rank is to classify Bands. Each band should be assigned to a tier on the list. You can then compare your vote with other user's votes to check if you are like the norm.",
        tiers: [
            {id: "1", title: "First", description: null},
            {id: "2", title: "Second", description: null},
            {id: "3", title: "Third", description: null},
            {id: "3", title: "Fourth Fourth Fourth Fourth Fourth Fourth Fourth Fourth Fourth Fourth", description: "Fourth Fourth Fourth Fourth Fourth Fourth Fourth Fourth Fourth Fourth"},
        ],
        options: [
            {id: "1", title: "Scorpions", description: null},
            {id: "2", title: "Linkin Park", description: null},
            {id: "3", title: "U2", description: null},
            {id: "3", title: "GunsN'Roses GunsN'Roses GunsN'Roses GunsN'Roses GunsN'Roses GunsN'Roses GunsN'Roses", description: "GunsN'Roses GunsN'Roses GunsN'Roses GunsN'Roses GunsN'Roses GunsN'Roses GunsN'Roses"}
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
        tiers: [
            {id: "1", title: "Good", description: null},
            {id: "2", title: "Medium", description: null},
            {id: "3", title: "Bad", description: null}
        ],
        options: [
            {id: "1", title: "Hamburguer", description: null},
            {id: "2", title: "Pizza", description: null},
            {id: "3", title: "Rice", description: null}
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
        tiers: [
            {id: "1", title: "Big", description: null},
            {id: "2", title: "Normal", description: null},
            {id: "3", title: "Small", description: null}
        ],
        options: [
            {id: "1", title: "USA", description: null},
            {id: "2", title: "Portugal", description: null},
            {id: "3", title: "Spain", description: null}
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
        description: rank.description
    }
})

export const TIERS = MOCKED_DATA.map(rank => {
    return rank.tiers.map(tier => {
        return {
            id: rank.id + "-" + tier.id,
            creationDate: new Date(),
            rankId: rank.id,
            title: tier.title,
            description: tier.description
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
            description: option.description
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

export const ASSIGNEMENTS = MOCKED_DATA.map(rank => {
    return rank.votes.map(vote => {
        return vote.assignments.map(assignment => {
            return {
                id: rank.id + "-" + vote.id + "-" + assignment.id,
                creationDate: new Date(),
                voteId: vote.id,
                optionId: rank.id + "-" + assignment.optionId,
                tierId: rank.id + "-" + assignment.tierId
            }
        })
    }).flat()
}).flat()