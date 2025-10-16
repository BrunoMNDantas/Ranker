import {
  createUser,
  createRank,
  createTier,
  createOption,
  createVote,
  createAssignment,
} from "./EntityFactory.service";

describe("EntityFactory Service", () => {

  describe("createUser", () => {

    it("should create a user with default values", () => {
      const user = createUser({});

      expect(user).toBeDefined();
      expect(user.id).toBe("");
      expect(user.username).toBe("");
      expect(user.imageUrl).toBeNull();
      expect(user.color).toBeNull();
      expect(user.creationDate).toBeInstanceOf(Date);
      expect(user.lastUpdateDate).toBeInstanceOf(Date);
    });

    it("should create a user with partial values", () => {
      const user = createUser({
        id: "user-123",
        username: "testuser",
      });

      expect(user.id).toBe("user-123");
      expect(user.username).toBe("testuser");
      expect(user.imageUrl).toBeNull();
      expect(user.color).toBeNull();
      expect(user.creationDate).toBeInstanceOf(Date);
      expect(user.lastUpdateDate).toBeInstanceOf(Date);
    });

    it("should create a user with all values", () => {
      const creationDate = new Date("2024-01-01");
      const lastUpdateDate = new Date("2024-01-15");

      const user = createUser({
        id: "user-123",
        username: "testuser",
        imageUrl: "https://example.com/image.jpg",
        color: "#FF5733",
        creationDate,
        lastUpdateDate,
      });

      expect(user.id).toBe("user-123");
      expect(user.username).toBe("testuser");
      expect(user.imageUrl).toBe("https://example.com/image.jpg");
      expect(user.color).toBe("#FF5733");
      expect(user.creationDate).toBe(creationDate);
      expect(user.lastUpdateDate).toBe(lastUpdateDate);
    });

  });

  describe("createRank", () => {

    it("should create a rank with default values", () => {
      const rank = createRank({});

      expect(rank).toBeDefined();
      expect(rank.id).toBe("");
      expect(rank.ownerId).toBe("");
      expect(rank.title).toBe("");
      expect(rank.description).toBeNull();
      expect(rank.imageUrl).toBeNull();
      expect(rank.color).toBeNull();
      expect(rank.creationDate).toBeInstanceOf(Date);
      expect(rank.lastUpdateDate).toBeInstanceOf(Date);
    });

    it("should create a rank with partial values", () => {
      const rank = createRank({
        id: "rank-456",
        ownerId: "user-123",
        title: "My Rank",
      });

      expect(rank.id).toBe("rank-456");
      expect(rank.ownerId).toBe("user-123");
      expect(rank.title).toBe("My Rank");
      expect(rank.description).toBeNull();
      expect(rank.imageUrl).toBeNull();
      expect(rank.color).toBeNull();
    });

    it("should create a rank with all values", () => {
      const creationDate = new Date("2024-01-01");
      const lastUpdateDate = new Date("2024-01-15");

      const rank = createRank({
        id: "rank-456",
        ownerId: "user-123",
        title: "Complete Rank",
        description: "A complete rank description",
        imageUrl: "https://example.com/rank.jpg",
        color: "#00FF00",
        creationDate,
        lastUpdateDate,
      });

      expect(rank.id).toBe("rank-456");
      expect(rank.ownerId).toBe("user-123");
      expect(rank.title).toBe("Complete Rank");
      expect(rank.description).toBe("A complete rank description");
      expect(rank.imageUrl).toBe("https://example.com/rank.jpg");
      expect(rank.color).toBe("#00FF00");
      expect(rank.creationDate).toBe(creationDate);
      expect(rank.lastUpdateDate).toBe(lastUpdateDate);
    });

  });

  describe("createTier", () => {

    it("should create a tier with default values", () => {
      const tier = createTier({});

      expect(tier).toBeDefined();
      expect(tier.id).toBe("");
      expect(tier.ownerId).toBe("");
      expect(tier.rankId).toBe("");
      expect(tier.order).toBe(0);
      expect(tier.title).toBe("");
      expect(tier.description).toBeNull();
      expect(tier.imageUrl).toBeNull();
      expect(tier.color).toBeNull();
      expect(tier.creationDate).toBeInstanceOf(Date);
      expect(tier.lastUpdateDate).toBeInstanceOf(Date);
    });

    it("should create a tier with partial values", () => {
      const tier = createTier({
        id: "tier-789",
        ownerId: "user-123",
        rankId: "rank-456",
        order: 1,
        title: "S Tier",
      });

      expect(tier.id).toBe("tier-789");
      expect(tier.ownerId).toBe("user-123");
      expect(tier.rankId).toBe("rank-456");
      expect(tier.order).toBe(1);
      expect(tier.title).toBe("S Tier");
      expect(tier.description).toBeNull();
    });

    it("should create a tier with all values", () => {
      const creationDate = new Date("2024-01-01");
      const lastUpdateDate = new Date("2024-01-15");

      const tier = createTier({
        id: "tier-789",
        ownerId: "user-123",
        rankId: "rank-456",
        order: 2,
        title: "A Tier",
        description: "Second best tier",
        imageUrl: "https://example.com/tier.jpg",
        color: "#FFD700",
        creationDate,
        lastUpdateDate,
      });

      expect(tier.id).toBe("tier-789");
      expect(tier.ownerId).toBe("user-123");
      expect(tier.rankId).toBe("rank-456");
      expect(tier.order).toBe(2);
      expect(tier.title).toBe("A Tier");
      expect(tier.description).toBe("Second best tier");
      expect(tier.imageUrl).toBe("https://example.com/tier.jpg");
      expect(tier.color).toBe("#FFD700");
      expect(tier.creationDate).toBe(creationDate);
      expect(tier.lastUpdateDate).toBe(lastUpdateDate);
    });

  });

  describe("createOption", () => {

    it("should create an option with default values", () => {
      const option = createOption({});

      expect(option).toBeDefined();
      expect(option.id).toBe("");
      expect(option.ownerId).toBe("");
      expect(option.rankId).toBe("");
      expect(option.order).toBe(0);
      expect(option.title).toBe("");
      expect(option.description).toBeNull();
      expect(option.imageUrl).toBeNull();
      expect(option.color).toBeNull();
      expect(option.creationDate).toBeInstanceOf(Date);
      expect(option.lastUpdateDate).toBeInstanceOf(Date);
    });

    it("should create an option with partial values", () => {
      const option = createOption({
        id: "option-111",
        ownerId: "user-123",
        rankId: "rank-456",
        order: 3,
        title: "Option A",
      });

      expect(option.id).toBe("option-111");
      expect(option.ownerId).toBe("user-123");
      expect(option.rankId).toBe("rank-456");
      expect(option.order).toBe(3);
      expect(option.title).toBe("Option A");
      expect(option.description).toBeNull();
    });

    it("should create an option with all values", () => {
      const creationDate = new Date("2024-01-01");
      const lastUpdateDate = new Date("2024-01-15");

      const option = createOption({
        id: "option-111",
        ownerId: "user-123",
        rankId: "rank-456",
        order: 5,
        title: "Complete Option",
        description: "A fully specified option",
        imageUrl: "https://example.com/option.jpg",
        color: "#0000FF",
        creationDate,
        lastUpdateDate,
      });

      expect(option.id).toBe("option-111");
      expect(option.ownerId).toBe("user-123");
      expect(option.rankId).toBe("rank-456");
      expect(option.order).toBe(5);
      expect(option.title).toBe("Complete Option");
      expect(option.description).toBe("A fully specified option");
      expect(option.imageUrl).toBe("https://example.com/option.jpg");
      expect(option.color).toBe("#0000FF");
      expect(option.creationDate).toBe(creationDate);
      expect(option.lastUpdateDate).toBe(lastUpdateDate);
    });

  });

  describe("createVote", () => {

    it("should create a vote with default values", () => {
      const vote = createVote({});

      expect(vote).toBeDefined();
      expect(vote.id).toBe("");
      expect(vote.ownerId).toBe("");
      expect(vote.rankId).toBe("");
      expect(vote.creationDate).toBeInstanceOf(Date);
      expect(vote.lastUpdateDate).toBeInstanceOf(Date);
    });

    it("should create a vote with partial values", () => {
      const vote = createVote({
        id: "vote-222",
        ownerId: "user-123",
      });

      expect(vote.id).toBe("vote-222");
      expect(vote.ownerId).toBe("user-123");
      expect(vote.rankId).toBe("");
      expect(vote.creationDate).toBeInstanceOf(Date);
      expect(vote.lastUpdateDate).toBeInstanceOf(Date);
    });

    it("should create a vote with all values", () => {
      const creationDate = new Date("2024-01-01");
      const lastUpdateDate = new Date("2024-01-15");

      const vote = createVote({
        id: "vote-222",
        ownerId: "user-123",
        rankId: "rank-456",
        creationDate,
        lastUpdateDate,
      });

      expect(vote.id).toBe("vote-222");
      expect(vote.ownerId).toBe("user-123");
      expect(vote.rankId).toBe("rank-456");
      expect(vote.creationDate).toBe(creationDate);
      expect(vote.lastUpdateDate).toBe(lastUpdateDate);
    });

  });

  describe("createAssignment", () => {

    it("should create an assignment with default values", () => {
      const assignment = createAssignment({});

      expect(assignment).toBeDefined();
      expect(assignment.id).toBe("");
      expect(assignment.ownerId).toBe("");
      expect(assignment.voteId).toBe("");
      expect(assignment.order).toBe(0);
      expect(assignment.optionId).toBe("");
      expect(assignment.tierId).toBe("");
      expect(assignment.creationDate).toBeInstanceOf(Date);
      expect(assignment.lastUpdateDate).toBeInstanceOf(Date);
    });

    it("should create an assignment with partial values", () => {
      const assignment = createAssignment({
        id: "assignment-333",
        ownerId: "user-123",
        voteId: "vote-222",
        optionId: "option-111",
        tierId: "tier-789",
      });

      expect(assignment.id).toBe("assignment-333");
      expect(assignment.ownerId).toBe("user-123");
      expect(assignment.voteId).toBe("vote-222");
      expect(assignment.optionId).toBe("option-111");
      expect(assignment.tierId).toBe("tier-789");
      expect(assignment.order).toBe(0);
    });

    it("should create an assignment with all values", () => {
      const creationDate = new Date("2024-01-01");
      const lastUpdateDate = new Date("2024-01-15");

      const assignment = createAssignment({
        id: "assignment-333",
        ownerId: "user-123",
        voteId: "vote-222",
        order: 7,
        optionId: "option-111",
        tierId: "tier-789",
        creationDate,
        lastUpdateDate,
      });

      expect(assignment.id).toBe("assignment-333");
      expect(assignment.ownerId).toBe("user-123");
      expect(assignment.voteId).toBe("vote-222");
      expect(assignment.order).toBe(7);
      expect(assignment.optionId).toBe("option-111");
      expect(assignment.tierId).toBe("tier-789");
      expect(assignment.creationDate).toBe(creationDate);
      expect(assignment.lastUpdateDate).toBe(lastUpdateDate);
    });

  });

});