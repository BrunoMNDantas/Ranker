// Mock the Stores module to prevent Firebase initialization
jest.mock("../../../services/store/Stores", () => ({
  VOTE_STORE: {},
}));

// Mock the Assignment API to prevent cross-API dependencies
jest.mock("../../assignment/api/Assignment.api", () => ({
  deleteAssignmentsOfVote: jest.fn(),
}));

import { VoteApi } from "./Vote.api";
import { deleteAssignmentsOfVote } from "../../assignment/api/Assignment.api";
import { Vote } from "../model/Vote.types";
import Store from "../../../services/store/Store";

const mockStore: Store<Vote> = {
  getAll: jest.fn(),
  get: jest.fn(),
  getByIds: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

const voteApi = new VoteApi(mockStore);

const mockVotes: Vote[] = [
  {
    id: "vote-1",
    creationDate: new Date("2024-01-01"),
    lastUpdateDate: new Date("2024-01-01"),
    ownerId: "user-1",
    rankId: "rank-1",
  },
  {
    id: "vote-2",
    creationDate: new Date("2024-01-02"),
    lastUpdateDate: new Date("2024-01-02"),
    ownerId: "user-1",
    rankId: "rank-2",
  },
  {
    id: "vote-3",
    creationDate: new Date("2024-01-03"),
    lastUpdateDate: new Date("2024-01-03"),
    ownerId: "user-2",
    rankId: "rank-1",
  },
];

describe("Vote API", () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getAllVotes", () => {

    it("should return all votes", async () => {
      (mockStore.getAll as jest.Mock).mockResolvedValue(mockVotes);

      const result = await voteApi.getAllVotes();

      expect(result).toEqual(mockVotes);
      expect(mockStore.getAll).toHaveBeenCalledTimes(1);
    });

    it("should return empty array when no votes exist", async () => {
      (mockStore.getAll as jest.Mock).mockResolvedValue([]);

      const result = await voteApi.getAllVotes();

      expect(result).toEqual([]);
      expect(mockStore.getAll).toHaveBeenCalledTimes(1);
    });

  });

  describe("getVote", () => {

    it("should return vote by id", async () => {
      (mockStore.get as jest.Mock).mockResolvedValue(mockVotes[0]);

      const result = await voteApi.getVote("vote-1");

      expect(result).toEqual(mockVotes[0]);
      expect(mockStore.get).toHaveBeenCalledWith("vote-1");
    });

    it("should return null when vote does not exist", async () => {
      (mockStore.get as jest.Mock).mockResolvedValue(null);

      const result = await voteApi.getVote("non-existent");

      expect(result).toBeNull();
      expect(mockStore.get).toHaveBeenCalledWith("non-existent");
    });

  });

  describe("getVotesByIds", () => {

    it("should return multiple votes by ids", async () => {
      const expectedVotes = [mockVotes[0], mockVotes[2]];
      (mockStore.getByIds as jest.Mock).mockResolvedValue(expectedVotes);

      const result = await voteApi.getVotesByIds(["vote-1", "vote-3"]);

      expect(result).toEqual(expectedVotes);
      expect(mockStore.getByIds).toHaveBeenCalledWith(["vote-1", "vote-3"]);
    });

    it("should return empty array when no ids provided", async () => {
      (mockStore.getByIds as jest.Mock).mockResolvedValue([]);

      const result = await voteApi.getVotesByIds([]);

      expect(result).toEqual([]);
      expect(mockStore.getByIds).toHaveBeenCalledWith([]);
    });

  });

  describe("getVotesOfRank", () => {

    it("should return all votes for a rank", async () => {
      (mockStore.getAll as jest.Mock).mockResolvedValue(mockVotes);

      const result = await voteApi.getVotesOfRank("rank-1");

      expect(result).toHaveLength(2);
      expect(result).toEqual([mockVotes[0], mockVotes[2]]);
      expect(mockStore.getAll).toHaveBeenCalledTimes(1);
    });

    it("should return empty array when rank has no votes", async () => {
      (mockStore.getAll as jest.Mock).mockResolvedValue(mockVotes);

      const result = await voteApi.getVotesOfRank("rank-non-existent");

      expect(result).toEqual([]);
      expect(mockStore.getAll).toHaveBeenCalledTimes(1);
    });

    it("should return empty array when no votes exist", async () => {
      (mockStore.getAll as jest.Mock).mockResolvedValue([]);

      const result = await voteApi.getVotesOfRank("rank-1");

      expect(result).toEqual([]);
    });

  });

  describe("getVotesOfUser", () => {

    it("should return all votes for a user", async () => {
      (mockStore.getAll as jest.Mock).mockResolvedValue(mockVotes);

      const result = await voteApi.getVotesOfUser("user-1");

      expect(result).toHaveLength(2);
      expect(result).toEqual([mockVotes[0], mockVotes[1]]);
      expect(mockStore.getAll).toHaveBeenCalledTimes(1);
    });

    it("should return empty array when user has no votes", async () => {
      (mockStore.getAll as jest.Mock).mockResolvedValue(mockVotes);

      const result = await voteApi.getVotesOfUser("user-non-existent");

      expect(result).toEqual([]);
      expect(mockStore.getAll).toHaveBeenCalledTimes(1);
    });

    it("should return empty array when no votes exist", async () => {
      (mockStore.getAll as jest.Mock).mockResolvedValue([]);

      const result = await voteApi.getVotesOfUser("user-1");

      expect(result).toEqual([]);
    });

  });

  describe("createVote", () => {

    it("should create a new vote", async () => {
      const newVote: Vote = {
        id: "vote-4",
        creationDate: new Date("2024-01-04"),
        lastUpdateDate: new Date("2024-01-04"),
        ownerId: "user-3",
        rankId: "rank-3",
      };
      (mockStore.create as jest.Mock).mockResolvedValue("vote-4");

      const result = await voteApi.createVote(newVote);

      expect(result).toBe("vote-4");
      expect(mockStore.create).toHaveBeenCalledWith(newVote);
    });

  });

  describe("updateVote", () => {

    it("should update an existing vote", async () => {
      const updatedVote: Vote = {
        ...mockVotes[0],
        lastUpdateDate: new Date("2024-01-10"),
      };
      (mockStore.update as jest.Mock).mockResolvedValue(undefined);

      await voteApi.updateVote(updatedVote);

      expect(mockStore.update).toHaveBeenCalledWith(updatedVote);
    });

  });

  describe("deleteVote", () => {

    it("should delete vote", async () => {
      (mockStore.delete as jest.Mock).mockResolvedValue(undefined);
      (deleteAssignmentsOfVote as jest.Mock).mockResolvedValue(undefined);

      await voteApi.deleteVote("vote-1");

      expect(deleteAssignmentsOfVote).toHaveBeenCalledWith("vote-1");
      expect(mockStore.delete).toHaveBeenCalledWith("vote-1");
    });

  });

  describe("deleteVotesOfRank", () => {

    it("should delete all votes of a rank", async () => {
      (mockStore.getAll as jest.Mock).mockResolvedValue(mockVotes);
      (mockStore.delete as jest.Mock).mockResolvedValue(undefined);
      (deleteAssignmentsOfVote as jest.Mock).mockResolvedValue(undefined);

      await voteApi.deleteVotesOfRank("rank-1");

      expect(mockStore.delete).toHaveBeenCalledTimes(2);
      expect(mockStore.delete).toHaveBeenCalledWith("vote-1");
      expect(mockStore.delete).toHaveBeenCalledWith("vote-3");
    });

    it("should handle deleting votes when rank has no votes", async () => {
      (mockStore.getAll as jest.Mock).mockResolvedValue(mockVotes);
      (mockStore.delete as jest.Mock).mockResolvedValue(undefined);

      await voteApi.deleteVotesOfRank("rank-non-existent");

      expect(mockStore.delete).not.toHaveBeenCalled();
    });

  });

  describe("deleteVotesOfUser", () => {

    it("should delete all votes of a user", async () => {
      (mockStore.getAll as jest.Mock).mockResolvedValue(mockVotes);
      (mockStore.delete as jest.Mock).mockResolvedValue(undefined);
      (deleteAssignmentsOfVote as jest.Mock).mockResolvedValue(undefined);

      await voteApi.deleteVotesOfUser("user-1");

      expect(mockStore.delete).toHaveBeenCalledTimes(2);
      expect(mockStore.delete).toHaveBeenCalledWith("vote-1");
      expect(mockStore.delete).toHaveBeenCalledWith("vote-2");
    });

    it("should handle deleting votes when user has no votes", async () => {
      (mockStore.getAll as jest.Mock).mockResolvedValue(mockVotes);
      (mockStore.delete as jest.Mock).mockResolvedValue(undefined);

      await voteApi.deleteVotesOfUser("user-non-existent");

      expect(mockStore.delete).not.toHaveBeenCalled();
    });

  });

});
