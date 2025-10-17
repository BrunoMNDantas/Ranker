// Mock the Stores module to prevent Firebase initialization
jest.mock("../../../services/store/Stores", () => ({
  RANK_STORE: {},
}));

// Mock cross-API dependencies
jest.mock("../../option/api/Option.api", () => ({
  deleteOptionsOfRank: jest.fn(),
}));
jest.mock("../../tier/api/Tier.api", () => ({
  deleteTiersOfRank: jest.fn(),
}));
jest.mock("../../vote/api/Vote.api", () => ({
  deleteVotesOfRank: jest.fn(),
}));

import { RankApi } from "./Rank.api";
import { deleteOptionsOfRank } from "../../option/api/Option.api";
import { deleteTiersOfRank } from "../../tier/api/Tier.api";
import { deleteVotesOfRank } from "../../vote/api/Vote.api";
import { Rank } from "../model/Rank.types";
import Store from "../../../services/store/Store";

const mockStore: Store<Rank> = {
  getAll: jest.fn(),
  get: jest.fn(),
  getByIds: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

const rankApi = new RankApi(mockStore);

const mockRanks: Rank[] = [
  {
    id: "rank-1",
    creationDate: new Date("2024-01-01"),
    lastUpdateDate: new Date("2024-01-01"),
    ownerId: "user-1",
    title: "Best Movies",
    description: "My favorite movies",
    imageUrl: "https://example.com/movies.jpg",
    color: "#FF5733",
  },
  {
    id: "rank-2",
    creationDate: new Date("2024-01-02"),
    lastUpdateDate: new Date("2024-01-02"),
    ownerId: "user-1",
    title: "Top Games",
    description: "Best video games",
    imageUrl: "https://example.com/games.jpg",
    color: "#3357FF",
  },
  {
    id: "rank-3",
    creationDate: new Date("2024-01-03"),
    lastUpdateDate: new Date("2024-01-03"),
    ownerId: "user-2",
    title: "Best Books",
    description: "Must-read books",
    imageUrl: "https://example.com/books.jpg",
    color: "#33FF57",
  },
];

describe("Rank API", () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getAllRanks", () => {

    it("should return all ranks", async () => {
      (mockStore.getAll as jest.Mock).mockResolvedValue(mockRanks);

      const result = await rankApi.getAllRanks();

      expect(result).toEqual(mockRanks);
      expect(mockStore.getAll).toHaveBeenCalledTimes(1);
    });

    it("should return empty array when no ranks exist", async () => {
      (mockStore.getAll as jest.Mock).mockResolvedValue([]);

      const result = await rankApi.getAllRanks();

      expect(result).toEqual([]);
      expect(mockStore.getAll).toHaveBeenCalledTimes(1);
    });

  });

  describe("getRank", () => {

    it("should return rank by id", async () => {
      (mockStore.get as jest.Mock).mockResolvedValue(mockRanks[0]);

      const result = await rankApi.getRank("rank-1");

      expect(result).toEqual(mockRanks[0]);
      expect(mockStore.get).toHaveBeenCalledWith("rank-1");
    });

    it("should return null when rank does not exist", async () => {
      (mockStore.get as jest.Mock).mockResolvedValue(null);

      const result = await rankApi.getRank("non-existent");

      expect(result).toBeNull();
      expect(mockStore.get).toHaveBeenCalledWith("non-existent");
    });

  });

  describe("getRanksByIds", () => {

    it("should return multiple ranks by ids", async () => {
      const expectedRanks = [mockRanks[0], mockRanks[2]];
      (mockStore.getByIds as jest.Mock).mockResolvedValue(expectedRanks);

      const result = await rankApi.getRanksByIds(["rank-1", "rank-3"]);

      expect(result).toEqual(expectedRanks);
      expect(mockStore.getByIds).toHaveBeenCalledWith(["rank-1", "rank-3"]);
    });

    it("should return empty array when no ids provided", async () => {
      (mockStore.getByIds as jest.Mock).mockResolvedValue([]);

      const result = await rankApi.getRanksByIds([]);

      expect(result).toEqual([]);
      expect(mockStore.getByIds).toHaveBeenCalledWith([]);
    });

  });

  describe("getRanksOfUser", () => {

    it("should return all ranks for a user", async () => {
      (mockStore.getAll as jest.Mock).mockResolvedValue(mockRanks);

      const result = await rankApi.getRanksOfUser("user-1");

      expect(result).toHaveLength(2);
      expect(result).toEqual([mockRanks[0], mockRanks[1]]);
      expect(mockStore.getAll).toHaveBeenCalledTimes(1);
    });

    it("should return empty array when user has no ranks", async () => {
      (mockStore.getAll as jest.Mock).mockResolvedValue(mockRanks);

      const result = await rankApi.getRanksOfUser("user-non-existent");

      expect(result).toEqual([]);
      expect(mockStore.getAll).toHaveBeenCalledTimes(1);
    });

    it("should return empty array when no ranks exist", async () => {
      (mockStore.getAll as jest.Mock).mockResolvedValue([]);

      const result = await rankApi.getRanksOfUser("user-1");

      expect(result).toEqual([]);
    });

  });

  describe("createRank", () => {

    it("should create a new rank", async () => {
      const newRank: Rank = {
        id: "rank-4",
        creationDate: new Date("2024-01-04"),
        lastUpdateDate: new Date("2024-01-04"),
        ownerId: "user-3",
        title: "Best Albums",
        description: "Top music albums",
        imageUrl: "https://example.com/albums.jpg",
        color: "#FF33A1",
      };
      (mockStore.create as jest.Mock).mockResolvedValue("rank-4");

      const result = await rankApi.createRank(newRank);

      expect(result).toBe("rank-4");
      expect(mockStore.create).toHaveBeenCalledWith(newRank);
    });

  });

  describe("updateRank", () => {

    it("should update an existing rank", async () => {
      const updatedRank: Rank = {
        ...mockRanks[0],
        title: "Updated Movies",
      };
      (mockStore.update as jest.Mock).mockResolvedValue(undefined);

      await rankApi.updateRank(updatedRank);

      expect(mockStore.update).toHaveBeenCalledWith(updatedRank);
    });

  });

  describe("deleteRank", () => {

    it("should delete rank", async () => {
      (mockStore.delete as jest.Mock).mockResolvedValue(undefined);
      (deleteTiersOfRank as jest.Mock).mockResolvedValue(undefined);
      (deleteOptionsOfRank as jest.Mock).mockResolvedValue(undefined);
      (deleteVotesOfRank as jest.Mock).mockResolvedValue(undefined);

      await rankApi.deleteRank("rank-1");

      expect(deleteTiersOfRank).toHaveBeenCalledWith("rank-1");
      expect(deleteOptionsOfRank).toHaveBeenCalledWith("rank-1");
      expect(deleteVotesOfRank).toHaveBeenCalledWith("rank-1");
      expect(mockStore.delete).toHaveBeenCalledWith("rank-1");
    });

  });

  describe("deleteRanksOfUser", () => {

    it("should delete all ranks of a user", async () => {
      (mockStore.getAll as jest.Mock).mockResolvedValue(mockRanks);
      (mockStore.delete as jest.Mock).mockResolvedValue(undefined);
      (deleteTiersOfRank as jest.Mock).mockResolvedValue(undefined);
      (deleteOptionsOfRank as jest.Mock).mockResolvedValue(undefined);
      (deleteVotesOfRank as jest.Mock).mockResolvedValue(undefined);

      await rankApi.deleteRanksOfUser("user-1");

      expect(mockStore.delete).toHaveBeenCalledTimes(2);
      expect(mockStore.delete).toHaveBeenCalledWith("rank-1");
      expect(mockStore.delete).toHaveBeenCalledWith("rank-2");
    });

    it("should handle deleting ranks when user has no ranks", async () => {
      (mockStore.getAll as jest.Mock).mockResolvedValue(mockRanks);
      (mockStore.delete as jest.Mock).mockResolvedValue(undefined);

      await rankApi.deleteRanksOfUser("user-non-existent");

      expect(mockStore.delete).not.toHaveBeenCalled();
    });

  });

});
