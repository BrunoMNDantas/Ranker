// Mock the Stores module to prevent Firebase initialization
jest.mock("../../../services/store/Stores", () => ({
  TIER_STORE: {},
}));

// Mock the Assignment API to prevent cross-API dependencies
jest.mock("../../assignment/api/Assignment.api", () => ({
  deleteAssignmentsOfTier: jest.fn(),
}));

import { TierApi } from "./Tier.api";
import { deleteAssignmentsOfTier } from "../../assignment/api/Assignment.api";
import { Tier } from "../model/Tier.types";
import Store from "../../../services/store/Store";

const mockStore: Store<Tier> = {
  getAll: jest.fn(),
  get: jest.fn(),
  getByIds: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

const tierApi = new TierApi(mockStore);

const mockTiers: Tier[] = [
  {
    id: "tier-1",
    creationDate: new Date("2024-01-01"),
    lastUpdateDate: new Date("2024-01-01"),
    ownerId: "user-1",
    rankId: "rank-1",
    title: "S Tier",
    description: "Best tier",
    imageUrl: null,
    order: 1,
    color: "#FF0000",
  },
  {
    id: "tier-2",
    creationDate: new Date("2024-01-02"),
    lastUpdateDate: new Date("2024-01-02"),
    ownerId: "user-1",
    rankId: "rank-1",
    title: "A Tier",
    description: "Good tier",
    imageUrl: null,
    order: 2,
    color: "#00FF00",
  },
  {
    id: "tier-3",
    creationDate: new Date("2024-01-03"),
    lastUpdateDate: new Date("2024-01-03"),
    ownerId: "user-2",
    rankId: "rank-2",
    title: "S Tier",
    description: "Top tier",
    imageUrl: null,
    order: 1,
    color: "#0000FF",
  },
  {
    id: "tier-4",
    creationDate: new Date("2024-01-04"),
    lastUpdateDate: new Date("2024-01-04"),
    ownerId: "user-1",
    rankId: "rank-1",
    title: "B Tier",
    description: "Medium tier",
    imageUrl: null,
    order: 3,
    color: "#FFFF00",
  },
];

describe("Tier API", () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getAllTiers", () => {

    it("should return all tiers", async () => {
      (mockStore.getAll as jest.Mock).mockResolvedValue(mockTiers);

      const result = await tierApi.getAllTiers();

      expect(result).toEqual(mockTiers);
      expect(mockStore.getAll).toHaveBeenCalledTimes(1);
    });

    it("should return empty array when no tiers exist", async () => {
      (mockStore.getAll as jest.Mock).mockResolvedValue([]);

      const result = await tierApi.getAllTiers();

      expect(result).toEqual([]);
      expect(mockStore.getAll).toHaveBeenCalledTimes(1);
    });

  });

  describe("getTier", () => {

    it("should return tier by id", async () => {
      (mockStore.get as jest.Mock).mockResolvedValue(mockTiers[0]);

      const result = await tierApi.getTier("tier-1");

      expect(result).toEqual(mockTiers[0]);
      expect(mockStore.get).toHaveBeenCalledWith("tier-1");
    });

    it("should return null when tier does not exist", async () => {
      (mockStore.get as jest.Mock).mockResolvedValue(null);

      const result = await tierApi.getTier("non-existent");

      expect(result).toBeNull();
      expect(mockStore.get).toHaveBeenCalledWith("non-existent");
    });

  });

  describe("getTiersByIds", () => {

    it("should return multiple tiers by ids", async () => {
      const expectedTiers = [mockTiers[0], mockTiers[2]];
      (mockStore.getByIds as jest.Mock).mockResolvedValue(expectedTiers);

      const result = await tierApi.getTiersByIds(["tier-1", "tier-3"]);

      expect(result).toEqual(expectedTiers);
      expect(mockStore.getByIds).toHaveBeenCalledWith(["tier-1", "tier-3"]);
    });

    it("should return empty array when no ids provided", async () => {
      (mockStore.getByIds as jest.Mock).mockResolvedValue([]);

      const result = await tierApi.getTiersByIds([]);

      expect(result).toEqual([]);
      expect(mockStore.getByIds).toHaveBeenCalledWith([]);
    });

  });

  describe("getTiersOfRank", () => {

    it("should return all tiers for a rank", async () => {
      (mockStore.getAll as jest.Mock).mockResolvedValue(mockTiers);

      const result = await tierApi.getTiersOfRank("rank-1");

      expect(result).toHaveLength(3);
      expect(result).toEqual([mockTiers[0], mockTiers[1], mockTiers[3]]);
      expect(mockStore.getAll).toHaveBeenCalledTimes(1);
    });

    it("should return empty array when rank has no tiers", async () => {
      (mockStore.getAll as jest.Mock).mockResolvedValue(mockTiers);

      const result = await tierApi.getTiersOfRank("rank-non-existent");

      expect(result).toEqual([]);
      expect(mockStore.getAll).toHaveBeenCalledTimes(1);
    });

    it("should return empty array when no tiers exist", async () => {
      (mockStore.getAll as jest.Mock).mockResolvedValue([]);

      const result = await tierApi.getTiersOfRank("rank-1");

      expect(result).toEqual([]);
    });

  });

  describe("getTiersOfUser", () => {

    it("should return all tiers for a user", async () => {
      (mockStore.getAll as jest.Mock).mockResolvedValue(mockTiers);

      const result = await tierApi.getTiersOfUser("user-1");

      expect(result).toHaveLength(3);
      expect(result).toEqual([mockTiers[0], mockTiers[1], mockTiers[3]]);
      expect(mockStore.getAll).toHaveBeenCalledTimes(1);
    });

    it("should return empty array when user has no tiers", async () => {
      (mockStore.getAll as jest.Mock).mockResolvedValue(mockTiers);

      const result = await tierApi.getTiersOfUser("user-non-existent");

      expect(result).toEqual([]);
      expect(mockStore.getAll).toHaveBeenCalledTimes(1);
    });

    it("should return empty array when no tiers exist", async () => {
      (mockStore.getAll as jest.Mock).mockResolvedValue([]);

      const result = await tierApi.getTiersOfUser("user-1");

      expect(result).toEqual([]);
    });

  });

  describe("createTier", () => {

    it("should create a new tier", async () => {
      const newTier: Tier = {
        id: "tier-5",
        creationDate: new Date("2024-01-05"),
        lastUpdateDate: new Date("2024-01-05"),
        ownerId: "user-3",
        rankId: "rank-3",
        title: "S Tier",
        description: null,
        imageUrl: null,
        order: 1,
        color: "#FF00FF",
      };
      (mockStore.create as jest.Mock).mockResolvedValue("tier-5");

      const result = await tierApi.createTier(newTier);

      expect(result).toBe("tier-5");
      expect(mockStore.create).toHaveBeenCalledWith(newTier);
    });

  });

  describe("updateTier", () => {

    it("should update an existing tier", async () => {
      const updatedTier: Tier = {
        ...mockTiers[0],
        title: "SS Tier",
      };
      (mockStore.update as jest.Mock).mockResolvedValue(undefined);

      await tierApi.updateTier(updatedTier);

      expect(mockStore.update).toHaveBeenCalledWith(updatedTier);
    });

  });

  describe("deleteTier", () => {

    it("should delete tier and reorder remaining tiers", async () => {
      (mockStore.get as jest.Mock).mockResolvedValue(mockTiers[1]);
      (mockStore.getAll as jest.Mock).mockResolvedValue(mockTiers);
      (mockStore.update as jest.Mock).mockResolvedValue(undefined);
      (mockStore.delete as jest.Mock).mockResolvedValue(undefined);
      (deleteAssignmentsOfTier as jest.Mock).mockResolvedValue(undefined);

      await tierApi.deleteTier("tier-2");

      expect(mockStore.get).toHaveBeenCalledWith("tier-2");
      expect(mockStore.getAll).toHaveBeenCalledTimes(1);

      // Should update orders for remaining tiers in the same rank
      expect(mockStore.update).toHaveBeenCalledWith({
        ...mockTiers[0],
        order: 1,
      });
      expect(mockStore.update).toHaveBeenCalledWith({
        ...mockTiers[3],
        order: 2,
      });

      expect(mockStore.delete).toHaveBeenCalledWith("tier-2");
    });

    it("should handle deleting tier when tier does not exist", async () => {
      (mockStore.get as jest.Mock).mockResolvedValue(null);
      (mockStore.getAll as jest.Mock).mockResolvedValue(mockTiers);
      (mockStore.delete as jest.Mock).mockResolvedValue(undefined);
      (deleteAssignmentsOfTier as jest.Mock).mockResolvedValue(undefined);

      await tierApi.deleteTier("non-existent");

      expect(mockStore.get).toHaveBeenCalledWith("non-existent");
      expect(mockStore.delete).toHaveBeenCalledWith("non-existent");
    });

    it("should handle deleting only tier in a rank", async () => {
      const singleTier = mockTiers[2];
      (mockStore.get as jest.Mock).mockResolvedValue(singleTier);
      (mockStore.getAll as jest.Mock).mockResolvedValue([singleTier]);
      (mockStore.update as jest.Mock).mockResolvedValue(undefined);
      (mockStore.delete as jest.Mock).mockResolvedValue(undefined);
      (deleteAssignmentsOfTier as jest.Mock).mockResolvedValue(undefined);

      await tierApi.deleteTier("tier-3");

      expect(mockStore.update).not.toHaveBeenCalled();
      expect(mockStore.delete).toHaveBeenCalledWith("tier-3");
    });

  });

  describe("deleteTiersOfRank", () => {

    it("should delete all tiers of a rank", async () => {
      (mockStore.getAll as jest.Mock).mockResolvedValue(mockTiers);
      (mockStore.get as jest.Mock).mockImplementation((id: string) => {
        return Promise.resolve(mockTiers.find(t => t.id === id) || null);
      });
      (mockStore.update as jest.Mock).mockResolvedValue(undefined);
      (mockStore.delete as jest.Mock).mockResolvedValue(undefined);
      (deleteAssignmentsOfTier as jest.Mock).mockResolvedValue(undefined);

      await tierApi.deleteTiersOfRank("rank-1");

      expect(mockStore.delete).toHaveBeenCalledTimes(3);
      expect(mockStore.delete).toHaveBeenCalledWith("tier-1");
      expect(mockStore.delete).toHaveBeenCalledWith("tier-2");
      expect(mockStore.delete).toHaveBeenCalledWith("tier-4");
    });

    it("should handle deleting tiers when rank has no tiers", async () => {
      (mockStore.getAll as jest.Mock).mockResolvedValue(mockTiers);
      (mockStore.delete as jest.Mock).mockResolvedValue(undefined);

      await tierApi.deleteTiersOfRank("rank-non-existent");

      expect(mockStore.delete).not.toHaveBeenCalled();
    });

  });

  describe("deleteTiersOfUser", () => {

    it("should delete all tiers of a user", async () => {
      (mockStore.getAll as jest.Mock).mockResolvedValue(mockTiers);
      (mockStore.get as jest.Mock).mockImplementation((id: string) => {
        return Promise.resolve(mockTiers.find(t => t.id === id) || null);
      });
      (mockStore.update as jest.Mock).mockResolvedValue(undefined);
      (mockStore.delete as jest.Mock).mockResolvedValue(undefined);
      (deleteAssignmentsOfTier as jest.Mock).mockResolvedValue(undefined);

      await tierApi.deleteTiersOfUser("user-1");

      expect(mockStore.delete).toHaveBeenCalledTimes(3);
      expect(mockStore.delete).toHaveBeenCalledWith("tier-1");
      expect(mockStore.delete).toHaveBeenCalledWith("tier-2");
      expect(mockStore.delete).toHaveBeenCalledWith("tier-4");
    });

    it("should handle deleting tiers when user has no tiers", async () => {
      (mockStore.getAll as jest.Mock).mockResolvedValue(mockTiers);
      (mockStore.delete as jest.Mock).mockResolvedValue(undefined);

      await tierApi.deleteTiersOfUser("user-non-existent");

      expect(mockStore.delete).not.toHaveBeenCalled();
    });

  });

  describe("edge cases", () => {

    it("should handle deleteTier with complex order reordering", async () => {
      const complexTiers: Tier[] = [
        { ...mockTiers[0], order: 5 },
        { ...mockTiers[1], order: 10 },
        { ...mockTiers[3], order: 15 },
      ];

      (mockStore.get as jest.Mock).mockResolvedValue(complexTiers[1]);
      (mockStore.getAll as jest.Mock).mockResolvedValue(complexTiers);
      (mockStore.update as jest.Mock).mockResolvedValue(undefined);
      (mockStore.delete as jest.Mock).mockResolvedValue(undefined);
      (deleteAssignmentsOfTier as jest.Mock).mockResolvedValue(undefined);

      await tierApi.deleteTier("tier-2");

      // Should reorder to 1, 2 instead of 5, 15
      expect(mockStore.update).toHaveBeenCalledWith({
        ...complexTiers[0],
        order: 1,
      });
      expect(mockStore.update).toHaveBeenCalledWith({
        ...complexTiers[2],
        order: 2,
      });
    });

  });

});
