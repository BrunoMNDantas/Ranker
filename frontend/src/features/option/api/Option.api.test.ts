// Mock the Stores module to prevent Firebase initialization
jest.mock("../../../services/store/Stores", () => ({
  OPTION_STORE: {},
}));

// Mock the Assignment API to prevent cross-API dependencies
jest.mock("../../assignment/api/Assignment.api", () => ({
  deleteAssignmentsOfOption: jest.fn(),
}));

import { OptionApi } from "./Option.api";
import { deleteAssignmentsOfOption } from "../../assignment/api/Assignment.api";
import { Option } from "../model/Option.types";
import Store from "../../../services/store/Store";

const mockStore: Store<Option> = {
  getAll: jest.fn(),
  get: jest.fn(),
  getByIds: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

const optionApi = new OptionApi(mockStore);

const mockOptions: Option[] = [
  {
    id: "option-1",
    creationDate: new Date("2024-01-01"),
    lastUpdateDate: new Date("2024-01-01"),
    ownerId: "user-1",
    rankId: "rank-1",
    title: "The Shawshank Redemption",
    description: "Great movie",
    imageUrl: "https://example.com/shawshank.jpg",
    order: 1,
    color: "#FF5733",
  },
  {
    id: "option-2",
    creationDate: new Date("2024-01-02"),
    lastUpdateDate: new Date("2024-01-02"),
    ownerId: "user-1",
    rankId: "rank-1",
    title: "The Godfather",
    description: "Classic film",
    imageUrl: "https://example.com/godfather.jpg",
    order: 2,
    color: "#3357FF",
  },
  {
    id: "option-3",
    creationDate: new Date("2024-01-03"),
    lastUpdateDate: new Date("2024-01-03"),
    ownerId: "user-2",
    rankId: "rank-2",
    title: "Zelda",
    description: "Best game",
    imageUrl: "https://example.com/zelda.jpg",
    order: 1,
    color: "#33FF57",
  },
  {
    id: "option-4",
    creationDate: new Date("2024-01-04"),
    lastUpdateDate: new Date("2024-01-04"),
    ownerId: "user-1",
    rankId: "rank-1",
    title: "Pulp Fiction",
    description: null,
    imageUrl: null,
    order: 3,
    color: null,
  },
];

describe("Option API", () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getAllOptions", () => {

    it("should return all options", async () => {
      (mockStore.getAll as jest.Mock).mockResolvedValue(mockOptions);

      const result = await optionApi.getAllOptions();

      expect(result).toEqual(mockOptions);
      expect(mockStore.getAll).toHaveBeenCalledTimes(1);
    });

    it("should return empty array when no options exist", async () => {
      (mockStore.getAll as jest.Mock).mockResolvedValue([]);

      const result = await optionApi.getAllOptions();

      expect(result).toEqual([]);
      expect(mockStore.getAll).toHaveBeenCalledTimes(1);
    });

  });

  describe("getOption", () => {

    it("should return option by id", async () => {
      (mockStore.get as jest.Mock).mockResolvedValue(mockOptions[0]);

      const result = await optionApi.getOption("option-1");

      expect(result).toEqual(mockOptions[0]);
      expect(mockStore.get).toHaveBeenCalledWith("option-1");
    });

    it("should return null when option does not exist", async () => {
      (mockStore.get as jest.Mock).mockResolvedValue(null);

      const result = await optionApi.getOption("non-existent");

      expect(result).toBeNull();
      expect(mockStore.get).toHaveBeenCalledWith("non-existent");
    });

  });

  describe("getOptionsByIds", () => {

    it("should return multiple options by ids", async () => {
      const expectedOptions = [mockOptions[0], mockOptions[2]];
      (mockStore.getByIds as jest.Mock).mockResolvedValue(expectedOptions);

      const result = await optionApi.getOptionsByIds(["option-1", "option-3"]);

      expect(result).toEqual(expectedOptions);
      expect(mockStore.getByIds).toHaveBeenCalledWith(["option-1", "option-3"]);
    });

    it("should return empty array when no ids provided", async () => {
      (mockStore.getByIds as jest.Mock).mockResolvedValue([]);

      const result = await optionApi.getOptionsByIds([]);

      expect(result).toEqual([]);
      expect(mockStore.getByIds).toHaveBeenCalledWith([]);
    });

  });

  describe("getOptionsOfRank", () => {

    it("should return all options for a rank", async () => {
      (mockStore.getAll as jest.Mock).mockResolvedValue(mockOptions);

      const result = await optionApi.getOptionsOfRank("rank-1");

      expect(result).toHaveLength(3);
      expect(result).toEqual([mockOptions[0], mockOptions[1], mockOptions[3]]);
      expect(mockStore.getAll).toHaveBeenCalledTimes(1);
    });

    it("should return empty array when rank has no options", async () => {
      (mockStore.getAll as jest.Mock).mockResolvedValue(mockOptions);

      const result = await optionApi.getOptionsOfRank("rank-non-existent");

      expect(result).toEqual([]);
      expect(mockStore.getAll).toHaveBeenCalledTimes(1);
    });

    it("should return empty array when no options exist", async () => {
      (mockStore.getAll as jest.Mock).mockResolvedValue([]);

      const result = await optionApi.getOptionsOfRank("rank-1");

      expect(result).toEqual([]);
    });

  });

  describe("getOptionsOfUser", () => {

    it("should return all options for a user", async () => {
      (mockStore.getAll as jest.Mock).mockResolvedValue(mockOptions);

      const result = await optionApi.getOptionsOfUser("user-1");

      expect(result).toHaveLength(3);
      expect(result).toEqual([mockOptions[0], mockOptions[1], mockOptions[3]]);
      expect(mockStore.getAll).toHaveBeenCalledTimes(1);
    });

    it("should return empty array when user has no options", async () => {
      (mockStore.getAll as jest.Mock).mockResolvedValue(mockOptions);

      const result = await optionApi.getOptionsOfUser("user-non-existent");

      expect(result).toEqual([]);
      expect(mockStore.getAll).toHaveBeenCalledTimes(1);
    });

    it("should return empty array when no options exist", async () => {
      (mockStore.getAll as jest.Mock).mockResolvedValue([]);

      const result = await optionApi.getOptionsOfUser("user-1");

      expect(result).toEqual([]);
    });

  });

  describe("createOption", () => {

    it("should create a new option", async () => {
      const newOption: Option = {
        id: "option-5",
        creationDate: new Date("2024-01-05"),
        lastUpdateDate: new Date("2024-01-05"),
        ownerId: "user-3",
        rankId: "rank-3",
        title: "New Option",
        description: "A new option",
        imageUrl: null,
        order: 1,
        color: "#FF00FF",
      };
      (mockStore.create as jest.Mock).mockResolvedValue("option-5");

      const result = await optionApi.createOption(newOption);

      expect(result).toBe("option-5");
      expect(mockStore.create).toHaveBeenCalledWith(newOption);
    });

  });

  describe("updateOption", () => {

    it("should update an existing option", async () => {
      const updatedOption: Option = {
        ...mockOptions[0],
        title: "Updated Title",
      };
      (mockStore.update as jest.Mock).mockResolvedValue(undefined);

      await optionApi.updateOption(updatedOption);

      expect(mockStore.update).toHaveBeenCalledWith(updatedOption);
    });

  });

  describe("deleteOption", () => {

    it("should delete option and reorder remaining options", async () => {
      (mockStore.get as jest.Mock).mockResolvedValue(mockOptions[1]);
      (mockStore.getAll as jest.Mock).mockResolvedValue(mockOptions);
      (mockStore.update as jest.Mock).mockResolvedValue(undefined);
      (mockStore.delete as jest.Mock).mockResolvedValue(undefined);
      (deleteAssignmentsOfOption as jest.Mock).mockResolvedValue(undefined);

      await optionApi.deleteOption("option-2");

      expect(mockStore.get).toHaveBeenCalledWith("option-2");
      expect(mockStore.getAll).toHaveBeenCalledTimes(1);

      // Should update orders for remaining options in the same rank
      expect(mockStore.update).toHaveBeenCalledWith({
        ...mockOptions[0],
        order: 1,
      });
      expect(mockStore.update).toHaveBeenCalledWith({
        ...mockOptions[3],
        order: 2,
      });

      expect(mockStore.delete).toHaveBeenCalledWith("option-2");
    });

    it("should handle deleting option when option does not exist", async () => {
      (mockStore.get as jest.Mock).mockResolvedValue(null);
      (mockStore.getAll as jest.Mock).mockResolvedValue(mockOptions);
      (mockStore.delete as jest.Mock).mockResolvedValue(undefined);
      (deleteAssignmentsOfOption as jest.Mock).mockResolvedValue(undefined);

      await optionApi.deleteOption("non-existent");

      expect(mockStore.get).toHaveBeenCalledWith("non-existent");
      expect(mockStore.delete).toHaveBeenCalledWith("non-existent");
    });

    it("should handle deleting only option in a rank", async () => {
      const singleOption = mockOptions[2];
      (mockStore.get as jest.Mock).mockResolvedValue(singleOption);
      (mockStore.getAll as jest.Mock).mockResolvedValue([singleOption]);
      (mockStore.update as jest.Mock).mockResolvedValue(undefined);
      (mockStore.delete as jest.Mock).mockResolvedValue(undefined);
      (deleteAssignmentsOfOption as jest.Mock).mockResolvedValue(undefined);

      await optionApi.deleteOption("option-3");

      expect(mockStore.update).not.toHaveBeenCalled();
      expect(mockStore.delete).toHaveBeenCalledWith("option-3");
    });

  });

  describe("deleteOptionsOfRank", () => {

    it("should delete all options of a rank", async () => {
      (mockStore.getAll as jest.Mock).mockResolvedValue(mockOptions);
      (mockStore.get as jest.Mock).mockImplementation((id: string) => {
        return Promise.resolve(mockOptions.find(o => o.id === id) || null);
      });
      (mockStore.update as jest.Mock).mockResolvedValue(undefined);
      (mockStore.delete as jest.Mock).mockResolvedValue(undefined);
      (deleteAssignmentsOfOption as jest.Mock).mockResolvedValue(undefined);

      await optionApi.deleteOptionsOfRank("rank-1");

      expect(mockStore.delete).toHaveBeenCalledTimes(3);
      expect(mockStore.delete).toHaveBeenCalledWith("option-1");
      expect(mockStore.delete).toHaveBeenCalledWith("option-2");
      expect(mockStore.delete).toHaveBeenCalledWith("option-4");
    });

    it("should handle deleting options when rank has no options", async () => {
      (mockStore.getAll as jest.Mock).mockResolvedValue(mockOptions);
      (mockStore.delete as jest.Mock).mockResolvedValue(undefined);

      await optionApi.deleteOptionsOfRank("rank-non-existent");

      expect(mockStore.delete).not.toHaveBeenCalled();
    });

  });

  describe("deleteOptionsOfUser", () => {

    it("should delete all options of a user", async () => {
      (mockStore.getAll as jest.Mock).mockResolvedValue(mockOptions);
      (mockStore.get as jest.Mock).mockImplementation((id: string) => {
        return Promise.resolve(mockOptions.find(o => o.id === id) || null);
      });
      (mockStore.update as jest.Mock).mockResolvedValue(undefined);
      (mockStore.delete as jest.Mock).mockResolvedValue(undefined);
      (deleteAssignmentsOfOption as jest.Mock).mockResolvedValue(undefined);

      await optionApi.deleteOptionsOfUser("user-1");

      expect(mockStore.delete).toHaveBeenCalledTimes(3);
      expect(mockStore.delete).toHaveBeenCalledWith("option-1");
      expect(mockStore.delete).toHaveBeenCalledWith("option-2");
      expect(mockStore.delete).toHaveBeenCalledWith("option-4");
    });

    it("should handle deleting options when user has no options", async () => {
      (mockStore.getAll as jest.Mock).mockResolvedValue(mockOptions);
      (mockStore.delete as jest.Mock).mockResolvedValue(undefined);

      await optionApi.deleteOptionsOfUser("user-non-existent");

      expect(mockStore.delete).not.toHaveBeenCalled();
    });

  });

  describe("edge cases", () => {

    it("should handle deleteOption with complex order reordering", async () => {
      const complexOptions: Option[] = [
        { ...mockOptions[0], order: 5 },
        { ...mockOptions[1], order: 10 },
        { ...mockOptions[3], order: 15 },
      ];

      (mockStore.get as jest.Mock).mockResolvedValue(complexOptions[1]);
      (mockStore.getAll as jest.Mock).mockResolvedValue(complexOptions);
      (mockStore.update as jest.Mock).mockResolvedValue(undefined);
      (mockStore.delete as jest.Mock).mockResolvedValue(undefined);
      (deleteAssignmentsOfOption as jest.Mock).mockResolvedValue(undefined);

      await optionApi.deleteOption("option-2");

      // Should reorder to 1, 2 instead of 5, 15
      expect(mockStore.update).toHaveBeenCalledWith({
        ...complexOptions[0],
        order: 1,
      });
      expect(mockStore.update).toHaveBeenCalledWith({
        ...complexOptions[2],
        order: 2,
      });
    });

  });

});
