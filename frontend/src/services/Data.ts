export const MOCKED_DATA = [
  {
    id: "1",
    title: "Programming Languages (General Purpose)",
    description: "Rank general-purpose languages by your preference and experience.",
    imageUrl: null,
    color: "#00000034",
    tiers: [
        { id: "1", order: 1, title: "S-Tier", description: "Elite for most use cases", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/b/ba/Star.svg", color: "#00000034" },
        { id: "2", order: 2, title: "A-Tier", description: null, imageUrl: "https://upload.wikimedia.org/wikipedia/commons/1/15/Gold_medal.svg", color: "#ff6f6f34"  },
        { id: "3", order: 3, title: "B-Tier", description: null, imageUrl: "https://upload.wikimedia.org/wikipedia/commons/0/03/Silver_medal.svg", color: "#5fff5934"  },
        { id: "4", order: 4, title: "C-Tier", description: "Situational", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/5/52/Bronze_medal.svg", color: "#00000034"  },
        { id: "5", order: 5, title: "D-Tier", description: "Rarely choose", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/5/5f/Red_X.svg", color: null }
    ],
    options: [
      { id: "1", order: 1, title: "Python", description: null, imageUrl: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg", color: "#00000034" },
      { id: "2", order: 2, title: "Java", description: null, imageUrl: "https://upload.wikimedia.org/wikipedia/en/3/30/Java_programming_language_logo.svg", color: "#00000034" },
      { id: "3", order: 3, title: "TypeScript", description: null, imageUrl: "https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg", color: "#00000034" },
      { id: "4", order: 4, title: "C#", description: null, imageUrl: "https://upload.wikimedia.org/wikipedia/commons/0/0d/C_Sharp_wordmark.svg", color: "#00000034" },
      { id: "5", order: 5, title: "Go", description: null, imageUrl: "https://upload.wikimedia.org/wikipedia/commons/0/05/Go_Logo_Blue.svg", color: "#2600ffff" },
      { id: "6", order: 6, title: "Rust", description: null, imageUrl: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Rust_programming_language_black_logo.svg", color: "#00000034" },
      { id: "7", order: 7, title: "C++", description: null, imageUrl: "https://upload.wikimedia.org/wikipedia/commons/1/18/ISO_C%2B%2B_Logo.svg", color: "#00b10034" },
      { id: "8", order: 8, title: "PHP", description: null, imageUrl: "https://upload.wikimedia.org/wikipedia/commons/2/27/PHP-logo.svg", color: "#00000034" },
      { id: "9", order: 9, title: "Kotlin", description: null, imageUrl: "https://upload.wikimedia.org/wikipedia/commons/7/74/Kotlin_Icon.png", color: "#000000ff" },
      { id: "10", order: 10, title: "Ruby", description: null, imageUrl: "https://upload.wikimedia.org/wikipedia/commons/7/73/Ruby_logo.svg", color: null }
    ],
    votes: [
      {
        id: "1",
        assignments: [
          { id: "1", order: 1, tierId: "1", optionId: "3" },
          { id: "2", order: 2, tierId: "1", optionId: "1" },
          { id: "3", order: 3, tierId: "2", optionId: "2" },
          { id: "4", order: 4, tierId: "2", optionId: "6" },
          { id: "5", order: 5, tierId: "3", optionId: "5" },
          { id: "6", order: 6, tierId: "3", optionId: "4" },
          { id: "7", order: 7, tierId: "4", optionId: "9" },
          { id: "8", order: 8, tierId: "4", optionId: "7" },
          { id: "9", order: 9, tierId: "5", optionId: "8" },
          { id: "10", order: 10, tierId: "5", optionId: "10" }
        ]
      },
      {
        id: "2",
        assignments: [
          { id: "1", order: 1, tierId: "1", optionId: "1" },
          { id: "2", order: 2, tierId: "1", optionId: "6" },
          { id: "3", order: 3, tierId: "2", optionId: "3" },
          { id: "4", order: 4, tierId: "2", optionId: "5" },
          { id: "5", order: 5, tierId: "3", optionId: "2" },
          { id: "6", order: 6, tierId: "3", optionId: "4" },
          { id: "7", order: 7, tierId: "4", optionId: "7" },
          { id: "8", order: 8, tierId: "4", optionId: "9" },
          { id: "9", order: 9, tierId: "5", optionId: "8" },
          { id: "10", order: 10, tierId: "5", optionId: "10" }
        ]
      }
    ]
  },
  {
    id: "2",
    title: "World Cuisines",
    description: "Which cuisines do you crave the most?",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/c/c4/Globe_icon.svg",
    color: null,
    tiers: [
        { id: "1", order: 1, title: "S-Tier", description: null, imageUrl: "https://upload.wikimedia.org/wikipedia/commons/b/ba/Star.svg", color: null },
        { id: "2", order: 2, title: "A-Tier", description: null, imageUrl: "https://upload.wikimedia.org/wikipedia/commons/1/15/Gold_medal.svg", color: null },
        { id: "3", order: 3, title: "B-Tier", description: null, imageUrl: "https://upload.wikimedia.org/wikipedia/commons/0/03/Silver_medal.svg", color: null },
        { id: "4", order: 4, title: "C-Tier", description: null, imageUrl: "https://upload.wikimedia.org/wikipedia/commons/5/52/Bronze_medal.svg", color: null },
        { id: "5", order: 5, title: "D-Tier", description: "Not my thing", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/5/5f/Red_X.svg", color: null }
    ],
    options: [
        { id: "1", order: 1, title: "Italian", description: null, imageUrl: null, color: null },
        { id: "2", order: 2, title: "Japanese", description: null, imageUrl: null, color: null },
        { id: "3", order: 3, title: "Mexican", description: null, imageUrl: null, color: null },
        { id: "4", order: 4, title: "Indian", description: null, imageUrl: null, color: null },
        { id: "5", order: 5, title: "Thai", description: null, imageUrl: null, color: null },
        { id: "6", order: 6, title: "Chinese", description: null, imageUrl: null, color: null },
        { id: "7", order: 7, title: "Portuguese", description: null, imageUrl: null, color: null },
        { id: "8", order: 8, title: "French", description: null, imageUrl: null, color: null },
        { id: "9", order: 9, title: "Greek", description: null, imageUrl: null, color: null },
        { id: "10", order: 10, title: "American BBQ", description: null, imageUrl: null, color: null }
    ],
    votes: [
      {
        id: "1",
        assignments: [
          { id: "1", order: 1, tierId: "1", optionId: "1" },
          { id: "2", order: 2, tierId: "1", optionId: "2" },
          { id: "3", order: 3, tierId: "2", optionId: "4" },
          { id: "4", order: 4, tierId: "2", optionId: "3" },
          { id: "5", order: 5, tierId: "3", optionId: "7" },
          { id: "6", order: 6, tierId: "3", optionId: "10" },
          { id: "7", order: 7, tierId: "4", optionId: "5" },
          { id: "8", order: 8, tierId: "4", optionId: "6" },
          { id: "9", order: 9, tierId: "5", optionId: "8" },
          { id: "10", order: 10, tierId: "5", optionId: "9" }
        ]
      },
      {
        id: "2",
        assignments: [
          { id: "1", order: 1, tierId: "1", optionId: "2" },
          { id: "2", order: 2, tierId: "1", optionId: "1" },
          { id: "3", order: 3, tierId: "2", optionId: "3" },
          { id: "4", order: 4, tierId: "2", optionId: "4" },
          { id: "5", order: 5, tierId: "3", optionId: "10" },
          { id: "6", order: 6, tierId: "3", optionId: "7" },
          { id: "7", order: 7, tierId: "4", optionId: "6" },
          { id: "8", order: 8, tierId: "4", optionId: "5" },
          { id: "9", order: 9, tierId: "5", optionId: "8" },
          { id: "10", order: 10, tierId: "5", optionId: "9" }
        ]
      }
    ]
  },
  {
    id: "3",
    title: "Classic Movies (Pre-2000)",
    description: "All-time favorite classics before the year 2000.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/4/46/Movie-reel.svg",
    color: null,
    tiers: [
        { id: "1", order: 1, title: "Masterpiece", description: null, imageUrl: "https://upload.wikimedia.org/wikipedia/commons/b/ba/Star.svg", color: null },
        { id: "2", order: 2, title: "Excellent", description: null, imageUrl: "https://upload.wikimedia.org/wikipedia/commons/1/15/Gold_medal.svg", color: null },
        { id: "3", order: 3, title: "Great", description: null, imageUrl: "https://upload.wikimedia.org/wikipedia/commons/0/03/Silver_medal.svg", color: null },
        { id: "4", order: 4, title: "Good", description: null, imageUrl: "https://upload.wikimedia.org/wikipedia/commons/5/52/Bronze_medal.svg", color: null },
        { id: "5", order: 5, title: "Okay", description: null, imageUrl: "https://upload.wikimedia.org/wikipedia/commons/5/5f/Red_X.svg", color: null }
    ],
    options: [
      { id: "1", order: 1, title: "The Godfather (1972)", description: null, imageUrl: null, color: null },
      { id: "2", order: 2, title: "Pulp Fiction (1994)", description: null, imageUrl: null, color: null },
      { id: "3", order: 3, title: "The Shawshank Redemption (1994)", description: null, imageUrl: null, color: null },
      { id: "4", order: 4, title: "Fight Club (1999)", description: null, imageUrl: null, color: null },
      { id: "5", order: 5, title: "Star Wars: A New Hope (1977)", description: null, imageUrl: null, color: null },
      { id: "6", order: 6, title: "The Matrix (1999)", description: null, imageUrl: null, color: null },
      { id: "7", order: 7, title: "Forrest Gump (1994)", description: null, imageUrl: null, color: null },
      { id: "8", order: 8, title: "The Silence of the Lambs (1991)", description: null, imageUrl: null, color: null },
      { id: "9", order: 9, title: "Goodfellas (1990)", description: null, imageUrl: null, color: null },
      { id: "10", order: 10, title: "The Terminator (1984)", description: null, imageUrl: null, color: null }
    ],
    votes: [
      {
        id: "1",
        assignments: [
          { id: "1", order: 1, tierId: "1", optionId: "1" },
          { id: "2", order: 2, tierId: "1", optionId: "3" },
          { id: "3", order: 3, tierId: "2", optionId: "2" },
          { id: "4", order: 4, tierId: "2", optionId: "6" },
          { id: "5", order: 5, tierId: "3", optionId: "5" },
          { id: "6", order: 6, tierId: "3", optionId: "7" },
          { id: "7", order: 7, tierId: "4", optionId: "8" },
          { id: "8", order: 8, tierId: "4", optionId: "9" },
          { id: "9", order: 9, tierId: "5", optionId: "4" },
          { id: "10", order: 10, tierId: "5", optionId: "10" }
        ]
      }
    ]
  },
  {
    id: "4",
    title: "European Cities to Visit",
    description: "Touristic appeal, culture, food, and walkability.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/6/66/Blank_map_of_Europe_cropped.svg",
    color: null,
    tiers: [
        { id: "1", order: 1, title: "Must-See", description: null, imageUrl: "https://upload.wikimedia.org/wikipedia/commons/b/ba/Star.svg", color: null },
        { id: "2", order: 2, title: "Fantastic", description: null, imageUrl: "https://upload.wikimedia.org/wikipedia/commons/1/15/Gold_medal.svg", color: null },
        { id: "3", order: 3, title: "Great", description: null, imageUrl: "https://upload.wikimedia.org/wikipedia/commons/0/03/Silver_medal.svg", color: null },
        { id: "4", order: 4, title: "Nice", description: null, imageUrl: "https://upload.wikimedia.org/wikipedia/commons/5/52/Bronze_medal.svg", color: null },
        { id: "5", order: 5, title: "Skip", description: null, imageUrl: "https://upload.wikimedia.org/wikipedia/commons/5/5f/Red_X.svg", color: null }
    ],
    options: [
        { id: "1",  order: 1,  title: "Lisbon",     description: null, imageUrl: "https://upload.wikimedia.org/wikipedia/commons/5/5c/Flag_of_Portugal.svg", color: null },
        { id: "2",  order: 2,  title: "Paris",      description: null, imageUrl: "https://upload.wikimedia.org/wikipedia/en/c/c3/Flag_of_France.svg", color: null },
        { id: "3",  order: 3,  title: "Barcelona",  description: null, imageUrl: "https://upload.wikimedia.org/wikipedia/en/9/9a/Flag_of_Spain.svg", color: null },
        { id: "4",  order: 4,  title: "Rome",       description: null, imageUrl: "https://upload.wikimedia.org/wikipedia/commons/0/03/Flag_of_Italy.svg", color: null },
        { id: "5",  order: 5,  title: "Amsterdam",  description: null, imageUrl: "https://upload.wikimedia.org/wikipedia/commons/2/20/Flag_of_the_Netherlands.svg", color: null },
        { id: "6",  order: 6,  title: "Prague",     description: null, imageUrl: "https://upload.wikimedia.org/wikipedia/commons/c/cb/Flag_of_the_Czech_Republic.svg", color: null },
        { id: "7",  order: 7,  title: "Berlin",     description: null, imageUrl: "https://upload.wikimedia.org/wikipedia/commons/b/ba/Flag_of_Germany.svg", color: null },
        { id: "8",  order: 8,  title: "Vienna",     description: null, imageUrl: "https://upload.wikimedia.org/wikipedia/commons/4/41/Flag_of_Austria.svg", color: null },
        { id: "9",  order: 9,  title: "Copenhagen", description: null, imageUrl: "https://upload.wikimedia.org/wikipedia/commons/9/9c/Flag_of_Denmark.svg", color: null },
        { id: "10", order: 10, title: "Budapest",   description: null, imageUrl: "https://upload.wikimedia.org/wikipedia/commons/c/c1/Flag_of_Hungary.svg", color: null }
    ],
    votes: [
      {
        id: "1",
        assignments: [
          { id: "1", order: 1, tierId: "1", optionId: "1" },
          { id: "2", order: 2, tierId: "1", optionId: "3" },
          { id: "3", order: 3, tierId: "2", optionId: "4" },
          { id: "4", order: 4, tierId: "2", optionId: "2" },
          { id: "5", order: 5, tierId: "3", optionId: "6" },
          { id: "6", order: 6, tierId: "3", optionId: "5" },
          { id: "7", order: 7, tierId: "4", optionId: "7" },
          { id: "8", order: 8, tierId: "4", optionId: "8" },
          { id: "9", order: 9, tierId: "5", optionId: "10" },
          { id: "10", order: 10, tierId: "5", optionId: "9" }
        ]
      }
    ]
  },
  {
    id: "5",
    title: "2024–2025 Flagship Smartphones",
    description: "Flagship models from major brands in the 2024/25 cycle.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/3/37/Smartphone_icon.svg",
    color: null,
    tiers: [
      { id: "1", order: 1, title: "S-Tier", description: "Outstanding overall", imageUrl: null, color: null },
      { id: "2", order: 2, title: "A-Tier", description: null, imageUrl: null, color: null },
      { id: "3", order: 3, title: "B-Tier", description: null, imageUrl: null, color: null },
      { id: "4", order: 4, title: "C-Tier", description: null, imageUrl: null, color: null },
      { id: "5", order: 5, title: "D-Tier", description: null, imageUrl: null, color: null }
    ],
    options: [
      { id: "1", order: 1, title: "iPhone 15 Pro", description: null, imageUrl: null, color: null },
      { id: "2", order: 2, title: "Samsung Galaxy S24 Ultra", description: null, imageUrl: null, color: null },
      { id: "3", order: 3, title: "Google Pixel 9 Pro", description: null, imageUrl: null, color: null },
      { id: "4", order: 4, title: "OnePlus 12", description: null, imageUrl: null, color: null },
      { id: "5", order: 5, title: "Xiaomi 14 Ultra", description: null, imageUrl: null, color: null },
      { id: "6", order: 6, title: "Sony Xperia 1 VI", description: null, imageUrl: null, color: null },
      { id: "7", order: 7, title: "Huawei Pura 70 Pro", description: null, imageUrl: null, color: null },
      { id: "8", order: 8, title: "Nothing Phone (2a) Plus", description: null, imageUrl: null, color: null },
      { id: "9", order: 9, title: "Asus ROG Phone 8", description: null, imageUrl: null, color: null },
      { id: "10", order: 10, title: "Motorola Edge 50 Ultra", description: null, imageUrl: null, color: null }
    ],
    votes: [
      {
        id: "1",
        assignments: [
          { id: "1", order: 1, tierId: "1", optionId: "2" },
          { id: "2", order: 2, tierId: "1", optionId: "1" },
          { id: "3", order: 3, tierId: "2", optionId: "3" },
          { id: "4", order: 4, tierId: "2", optionId: "5" },
          { id: "5", order: 5, tierId: "3", optionId: "4" },
          { id: "6", order: 6, tierId: "3", optionId: "6" },
          { id: "7", order: 7, tierId: "4", optionId: "9" },
          { id: "8", order: 8, tierId: "4", optionId: "8" },
          { id: "9", order: 9, tierId: "5", optionId: "10" },
          { id: "10", order: 10, tierId: "5", optionId: "7" }
        ]
      }
    ]
  }
];

export const RANKS = MOCKED_DATA.map(rank => {
    return {
        id: "RANK-" + rank.id,
        creationDate: new Date(),
        lastUpdateDate: new Date(),
        title: rank.title,
        description: rank.description,
        imageUrl: rank.imageUrl,
        color: rank.color
    }
})

export const TIERS = MOCKED_DATA.map(rank => {
    return rank.tiers.map(tier => {
        return {
            id: "TIER-" + rank.id + "-" + tier.id,
            creationDate: new Date(),
            lastUpdateDate: new Date(),
            rankId: "RANK-" + rank.id,
            order: tier.order,
            title: tier.title,
            description: tier.description,
            imageUrl: tier.imageUrl,
            color: tier.color
        }
    })
}).flat()

export const OPTIONS = MOCKED_DATA.map(rank => {
    return rank.options.map(option => {
        return {
            id: "OPTION-" + rank.id + "-" + option.id,
            creationDate: new Date(),
            lastUpdateDate: new Date(),
            rankId: "RANK-" + rank.id,
            order: option.order,
            title: option.title,
            description: option.description,
            imageUrl: option.imageUrl,
            color: option.color
        }
    })
}).flat()

export const VOTES = MOCKED_DATA.map(rank => {
    return rank.votes.map(vote => {
        return {
            id: "VOTE-" + rank.id + "-" + vote.id,
            creationDate: new Date(),
            lastUpdateDate: new Date(),
            rankId: "RANK-" + rank.id
        }
    })
}).flat()

export const ASSIGNMENTS = MOCKED_DATA.map(rank => {
    return rank.votes.map(vote => {
        return vote.assignments.map(assignment => {
            return {
                id: "ASSIGNMENT-" + rank.id + "-" + vote.id + "-" + assignment.id,
                creationDate: new Date(),
                lastUpdateDate: new Date(),
                voteId: "VOTE-" + rank.id + "-" + vote.id,
                order: assignment.order,
                optionId: "OPTION-" + rank.id + "-" + assignment.optionId,
                tierId: "TIER-" + rank.id + "-" + assignment.tierId
            }
        })
    }).flat()
}).flat()