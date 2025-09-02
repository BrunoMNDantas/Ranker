const MOCKED_DATA = [
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

export const RANKS = MOCKED_DATA.map(rank => {
    return {
        id: rank.id,
        creationDate: new Date(),
        title: rank.title
    }
})

export const TIERS = MOCKED_DATA.map(rank => {
    return rank.tiers.map(tier => {
        return {
            id: rank.id + "-" + tier.id,
            creationDate: new Date(),
            rankId: rank.id,
            title: tier.title
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