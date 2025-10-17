// Mock the Stores module to prevent Firebase initialization
jest.mock("../../../services/store/Stores", () => ({
  USER_STORE: {},
}));

// Mock cross-API dependencies
jest.mock("../../rank/api/Rank.api", () => ({
  deleteRanksOfUser: jest.fn(),
}));
jest.mock("../../tier/api/Tier.api", () => ({
  deleteTiersOfUser: jest.fn(),
}));
jest.mock("../../option/api/Option.api", () => ({
  deleteOptionsOfUser: jest.fn(),
}));
jest.mock("../../vote/api/Vote.api", () => ({
  deleteVotesOfUser: jest.fn(),
}));
jest.mock("../../assignment/api/Assignment.api", () => ({
  deleteAssignmentsOfUser: jest.fn(),
}));

import { UserApi } from "./User.api";
import { deleteRanksOfUser } from "../../rank/api/Rank.api";
import { deleteTiersOfUser } from "../../tier/api/Tier.api";
import { deleteOptionsOfUser } from "../../option/api/Option.api";
import { deleteVotesOfUser } from "../../vote/api/Vote.api";
import { deleteAssignmentsOfUser } from "../../assignment/api/Assignment.api";
import { User } from "../model/User.types";
import Store from "../../../services/store/Store";

const mockStore: Store<User> = {
  getAll: jest.fn(),
  get: jest.fn(),
  getByIds: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

const userApi = new UserApi(mockStore);

const mockUsers: User[] = [
  {
    id: "user-1",
    creationDate: new Date("2024-01-01"),
    lastUpdateDate: new Date("2024-01-01"),
    username: "john_doe",
    imageUrl: "https://example.com/john.jpg",
    color: "#FF5733",
  },
  {
    id: "user-2",
    creationDate: new Date("2024-01-02"),
    lastUpdateDate: new Date("2024-01-02"),
    username: "jane_smith",
    imageUrl: "https://example.com/jane.jpg",
    color: "#3357FF",
  },
  {
    id: "user-3",
    creationDate: new Date("2024-01-03"),
    lastUpdateDate: new Date("2024-01-03"),
    username: "bob_wilson",
    imageUrl: null,
    color: null,
  },
];

describe("User API", () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getAllUsers", () => {

    it("should return all users", async () => {
      (mockStore.getAll as jest.Mock).mockResolvedValue(mockUsers);

      const result = await userApi.getAllUsers();

      expect(result).toEqual(mockUsers);
      expect(mockStore.getAll).toHaveBeenCalledTimes(1);
    });

    it("should return empty array when no users exist", async () => {
      (mockStore.getAll as jest.Mock).mockResolvedValue([]);

      const result = await userApi.getAllUsers();

      expect(result).toEqual([]);
      expect(mockStore.getAll).toHaveBeenCalledTimes(1);
    });

  });

  describe("getUser", () => {

    it("should return user by id", async () => {
      (mockStore.get as jest.Mock).mockResolvedValue(mockUsers[0]);

      const result = await userApi.getUser("user-1");

      expect(result).toEqual(mockUsers[0]);
      expect(mockStore.get).toHaveBeenCalledWith("user-1");
    });

    it("should return null when user does not exist", async () => {
      (mockStore.get as jest.Mock).mockResolvedValue(null);

      const result = await userApi.getUser("non-existent");

      expect(result).toBeNull();
      expect(mockStore.get).toHaveBeenCalledWith("non-existent");
    });

  });

  describe("getUsersByIds", () => {

    it("should return multiple users by ids", async () => {
      const expectedUsers = [mockUsers[0], mockUsers[2]];
      (mockStore.getByIds as jest.Mock).mockResolvedValue(expectedUsers);

      const result = await userApi.getUsersByIds(["user-1", "user-3"]);

      expect(result).toEqual(expectedUsers);
      expect(mockStore.getByIds).toHaveBeenCalledWith(["user-1", "user-3"]);
    });

    it("should return empty array when no ids provided", async () => {
      (mockStore.getByIds as jest.Mock).mockResolvedValue([]);

      const result = await userApi.getUsersByIds([]);

      expect(result).toEqual([]);
      expect(mockStore.getByIds).toHaveBeenCalledWith([]);
    });

  });

  describe("createUser", () => {

    it("should create a new user", async () => {
      const newUser: User = {
        id: "user-4",
        creationDate: new Date("2024-01-04"),
        lastUpdateDate: new Date("2024-01-04"),
        username: "alice_wonder",
        imageUrl: "https://example.com/alice.jpg",
        color: "#FF00FF",
      };
      (mockStore.create as jest.Mock).mockResolvedValue("user-4");

      const result = await userApi.createUser(newUser);

      expect(result).toBe("user-4");
      expect(mockStore.create).toHaveBeenCalledWith(newUser);
    });

  });

  describe("updateUser", () => {

    it("should update an existing user", async () => {
      const updatedUser: User = {
        ...mockUsers[0],
        username: "john_updated",
      };
      (mockStore.update as jest.Mock).mockResolvedValue(undefined);

      await userApi.updateUser(updatedUser);

      expect(mockStore.update).toHaveBeenCalledWith(updatedUser);
    });

  });

  describe("deleteUser", () => {

    it("should delete user", async () => {
      (mockStore.delete as jest.Mock).mockResolvedValue(undefined);
      (deleteAssignmentsOfUser as jest.Mock).mockResolvedValue(undefined);
      (deleteVotesOfUser as jest.Mock).mockResolvedValue(undefined);
      (deleteOptionsOfUser as jest.Mock).mockResolvedValue(undefined);
      (deleteTiersOfUser as jest.Mock).mockResolvedValue(undefined);
      (deleteRanksOfUser as jest.Mock).mockResolvedValue(undefined);

      await userApi.deleteUser("user-1");

      expect(deleteAssignmentsOfUser).toHaveBeenCalledWith("user-1");
      expect(deleteVotesOfUser).toHaveBeenCalledWith("user-1");
      expect(deleteOptionsOfUser).toHaveBeenCalledWith("user-1");
      expect(deleteTiersOfUser).toHaveBeenCalledWith("user-1");
      expect(deleteRanksOfUser).toHaveBeenCalledWith("user-1");
      expect(mockStore.delete).toHaveBeenCalledWith("user-1");
    });

  });

});
