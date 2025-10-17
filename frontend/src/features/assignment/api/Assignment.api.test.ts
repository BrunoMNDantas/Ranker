// Mock the Stores module to prevent Firebase initialization
jest.mock("../../../services/store/Stores", () => ({
  ASSIGNMENT_STORE: {},
}));

import { AssignmentApi } from "./Assignment.api";
import { Assignment } from "../model/Assignment.types";
import Store from "../../../services/store/Store";

const mockStore: Store<Assignment> = {
  getAll: jest.fn(),
  get: jest.fn(),
  getByIds: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

const assignmentApi = new AssignmentApi(mockStore);

const mockAssignments: Assignment[] = [
  {
    id: "assignment-1",
    creationDate: new Date("2024-01-01"),
    lastUpdateDate: new Date("2024-01-01"),
    ownerId: "user-1",
    voteId: "vote-1",
    order: 1,
    optionId: "option-1",
    tierId: "tier-1",
  },
  {
    id: "assignment-2",
    creationDate: new Date("2024-01-02"),
    lastUpdateDate: new Date("2024-01-02"),
    ownerId: "user-1",
    voteId: "vote-1",
    order: 2,
    optionId: "option-2",
    tierId: "tier-1",
  },
  {
    id: "assignment-3",
    creationDate: new Date("2024-01-03"),
    lastUpdateDate: new Date("2024-01-03"),
    ownerId: "user-2",
    voteId: "vote-2",
    order: 1,
    optionId: "option-3",
    tierId: "tier-2",
  },
  {
    id: "assignment-4",
    creationDate: new Date("2024-01-04"),
    lastUpdateDate: new Date("2024-01-04"),
    ownerId: "user-1",
    voteId: "vote-1",
    order: 3,
    optionId: "option-4",
    tierId: "tier-2",
  }
];

describe("Assignment API", () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getAllAssignments", () => {

    it("should return all assignments", async () => {
      (mockStore.getAll as jest.Mock).mockResolvedValue(mockAssignments);

      const result = await assignmentApi.getAllAssignments();

      expect(result).toEqual(mockAssignments);
      expect(mockStore.getAll).toHaveBeenCalledTimes(1);
    });

    it("should return empty array when no assignments exist", async () => {
      (mockStore.getAll as jest.Mock).mockResolvedValue([]);

      const result = await assignmentApi.getAllAssignments();

      expect(result).toEqual([]);
      expect(mockStore.getAll).toHaveBeenCalledTimes(1);
    });

  });

  describe("getAssignment", () => {

    it("should return assignment by id", async () => {
      (mockStore.get as jest.Mock).mockResolvedValue(mockAssignments[0]);

      const result = await assignmentApi.getAssignment("assignment-1");

      expect(result).toEqual(mockAssignments[0]);
      expect(mockStore.get).toHaveBeenCalledWith("assignment-1");
    });

    it("should return null when assignment does not exist", async () => {
      (mockStore.get as jest.Mock).mockResolvedValue(null);

      const result = await assignmentApi.getAssignment("non-existent");

      expect(result).toBeNull();
      expect(mockStore.get).toHaveBeenCalledWith("non-existent");
    });

  });

  describe("getAssignmentsByIds", () => {

    it("should return multiple assignments by ids", async () => {
      const expectedAssignments = [mockAssignments[0], mockAssignments[2]];
      (mockStore.getByIds as jest.Mock).mockResolvedValue(expectedAssignments);

      const result = await assignmentApi.getAssignmentsByIds(["assignment-1", "assignment-3"]);

      expect(result).toEqual(expectedAssignments);
      expect(mockStore.getByIds).toHaveBeenCalledWith(["assignment-1", "assignment-3"]);
    });

    it("should return empty array when no ids provided", async () => {
      (mockStore.getByIds as jest.Mock).mockResolvedValue([]);

      const result = await assignmentApi.getAssignmentsByIds([]);

      expect(result).toEqual([]);
      expect(mockStore.getByIds).toHaveBeenCalledWith([]);
    });

  });

  describe("getAssignmentsOfVote", () => {

    it("should return all assignments for a vote", async () => {
      (mockStore.getAll as jest.Mock).mockResolvedValue(mockAssignments);

      const result = await assignmentApi.getAssignmentsOfVote("vote-1");

      expect(result).toHaveLength(3);
      expect(result).toEqual([mockAssignments[0], mockAssignments[1], mockAssignments[3]]);
      expect(mockStore.getAll).toHaveBeenCalledTimes(1);
    });

    it("should return empty array when vote has no assignments", async () => {
      (mockStore.getAll as jest.Mock).mockResolvedValue(mockAssignments);

      const result = await assignmentApi.getAssignmentsOfVote("vote-non-existent");

      expect(result).toEqual([]);
      expect(mockStore.getAll).toHaveBeenCalledTimes(1);
    });

    it("should return empty array when no assignments exist", async () => {
      (mockStore.getAll as jest.Mock).mockResolvedValue([]);

      const result = await assignmentApi.getAssignmentsOfVote("vote-1");

      expect(result).toEqual([]);
    });

  });

  describe("getAssignmentsOfTier", () => {

    it("should return all assignments for a tier", async () => {
      (mockStore.getAll as jest.Mock).mockResolvedValue(mockAssignments);

      const result = await assignmentApi.getAssignmentsOfTier("tier-1");

      expect(result).toHaveLength(2);
      expect(result).toEqual([mockAssignments[0], mockAssignments[1]]);
      expect(mockStore.getAll).toHaveBeenCalledTimes(1);
    });

    it("should return empty array when tier has no assignments", async () => {
      (mockStore.getAll as jest.Mock).mockResolvedValue(mockAssignments);

      const result = await assignmentApi.getAssignmentsOfTier("tier-non-existent");

      expect(result).toEqual([]);
      expect(mockStore.getAll).toHaveBeenCalledTimes(1);
    });

     it("should return empty array when no assignments exist", async () => {
      (mockStore.getAll as jest.Mock).mockResolvedValue([]);

      const result = await assignmentApi.getAssignmentsOfTier("tier-1");

      expect(result).toEqual([]);
    });

  });

  describe("getAssignmentsOfOption", () => {

    it("should return all assignments for an option", async () => {
      (mockStore.getAll as jest.Mock).mockResolvedValue(mockAssignments);

      const result = await assignmentApi.getAssignmentsOfOption("option-1");

      expect(result).toHaveLength(1);
      expect(result).toEqual([mockAssignments[0]]);
      expect(mockStore.getAll).toHaveBeenCalledTimes(1);
    });

    it("should return empty array when option has no assignments", async () => {
      (mockStore.getAll as jest.Mock).mockResolvedValue(mockAssignments);

      const result = await assignmentApi.getAssignmentsOfOption("option-non-existent");

      expect(result).toEqual([]);
      expect(mockStore.getAll).toHaveBeenCalledTimes(1);
    });

     it("should return empty array when no assignments exist", async () => {
      (mockStore.getAll as jest.Mock).mockResolvedValue([]);

      const result = await assignmentApi.getAssignmentsOfOption("option-1");

      expect(result).toEqual([]);
    });

  });

  describe("getAssignmentsOfUser", () => {

    it("should return all assignments for a user", async () => {
      (mockStore.getAll as jest.Mock).mockResolvedValue(mockAssignments);

      const result = await assignmentApi.getAssignmentsOfUser("user-1");

      expect(result).toHaveLength(3);
      expect(result).toEqual([mockAssignments[0], mockAssignments[1], mockAssignments[3]]);
      expect(mockStore.getAll).toHaveBeenCalledTimes(1);
    });

    it("should return empty array when user has no assignments", async () => {
      (mockStore.getAll as jest.Mock).mockResolvedValue(mockAssignments);

      const result = await assignmentApi.getAssignmentsOfUser("user-non-existent");

      expect(result).toEqual([]);
      expect(mockStore.getAll).toHaveBeenCalledTimes(1);
    });

     it("should return empty array when no assignments exist", async () => {
      (mockStore.getAll as jest.Mock).mockResolvedValue([]);

      const result = await assignmentApi.getAssignmentsOfUser("user-1");

      expect(result).toEqual([]);
    });

  });

  describe("createAssignment", () => {

    it("should create a new assignment", async () => {
      const newAssignment: Assignment = {
        id: "assignment-5",
        creationDate: new Date("2024-01-05"),
        lastUpdateDate: new Date("2024-01-05"),
        ownerId: "user-3",
        voteId: "vote-3",
        order: 1,
        optionId: "option-5",
        tierId: "tier-3",
      };
      (mockStore.create as jest.Mock).mockResolvedValue("assignment-5");

      const result = await assignmentApi.createAssignment(newAssignment);

      expect(result).toBe("assignment-5");
      expect(mockStore.create).toHaveBeenCalledWith(newAssignment);
    });

  });

  describe("updateAssignment", () => {

    it("should update an existing assignment", async () => {
      const updatedAssignment: Assignment = {
        ...mockAssignments[0],
        order: 5,
      };
      (mockStore.update as jest.Mock).mockResolvedValue(undefined);

      await assignmentApi.updateAssignment(updatedAssignment);

      expect(mockStore.update).toHaveBeenCalledWith(updatedAssignment);
    });

  });

  describe("deleteAssignment", () => {

    it("should delete assignment and reorder remaining assignments", async () => {
      (mockStore.get as jest.Mock).mockResolvedValue(mockAssignments[1]);
      (mockStore.getAll as jest.Mock).mockResolvedValue(mockAssignments);
      (mockStore.update as jest.Mock).mockResolvedValue(undefined);
      (mockStore.delete as jest.Mock).mockResolvedValue(undefined);

      await assignmentApi.deleteAssignment("assignment-2");

      expect(mockStore.get).toHaveBeenCalledWith("assignment-2");
      expect(mockStore.getAll).toHaveBeenCalledTimes(1);

      // Should update orders for remaining assignments in the same vote
      expect(mockStore.update).toHaveBeenCalledWith({
        ...mockAssignments[0],
        order: 1,
      });
      expect(mockStore.update).toHaveBeenCalledWith({
        ...mockAssignments[3],
        order: 2,
      });

      expect(mockStore.delete).toHaveBeenCalledWith("assignment-2");
    });

    it("should handle deleting assignment when assignment does not exist", async () => {
      (mockStore.get as jest.Mock).mockResolvedValue(null);
      (mockStore.getAll as jest.Mock).mockResolvedValue(mockAssignments);
      (mockStore.delete as jest.Mock).mockResolvedValue(undefined);

      await assignmentApi.deleteAssignment("non-existent");

      expect(mockStore.get).toHaveBeenCalledWith("non-existent");
      expect(mockStore.delete).toHaveBeenCalledWith("non-existent");
    });

    it("should handle deleting only assignment in a vote", async () => {
      const singleAssignment = mockAssignments[2];
      (mockStore.get as jest.Mock).mockResolvedValue(singleAssignment);
      (mockStore.getAll as jest.Mock).mockResolvedValue([singleAssignment]);
      (mockStore.update as jest.Mock).mockResolvedValue(undefined);
      (mockStore.delete as jest.Mock).mockResolvedValue(undefined);

      await assignmentApi.deleteAssignment("assignment-3");

      expect(mockStore.update).not.toHaveBeenCalled();
      expect(mockStore.delete).toHaveBeenCalledWith("assignment-3");
    });

  });

  describe("deleteAssignmentsOfVote", () => {

    it("should delete all assignments of a vote", async () => {
      (mockStore.getAll as jest.Mock).mockResolvedValue(mockAssignments);
      (mockStore.get as jest.Mock).mockImplementation((id: string) => {
        return Promise.resolve(mockAssignments.find(a => a.id === id) || null);
      });
      (mockStore.update as jest.Mock).mockResolvedValue(undefined);
      (mockStore.delete as jest.Mock).mockResolvedValue(undefined);

      await assignmentApi.deleteAssignmentsOfVote("vote-1");

      expect(mockStore.delete).toHaveBeenCalledTimes(3);
      expect(mockStore.delete).toHaveBeenCalledWith("assignment-1");
      expect(mockStore.delete).toHaveBeenCalledWith("assignment-2");
      expect(mockStore.delete).toHaveBeenCalledWith("assignment-4");
    });

    it("should handle deleting assignments when vote has no assignments", async () => {
      (mockStore.getAll as jest.Mock).mockResolvedValue(mockAssignments);
      (mockStore.delete as jest.Mock).mockResolvedValue(undefined);

      await assignmentApi.deleteAssignmentsOfVote("vote-non-existent");

      expect(mockStore.delete).not.toHaveBeenCalled();
    });

  });

  describe("deleteAssignmentsOfTier", () => {

    it("should delete all assignments of a tier", async () => {
      (mockStore.getAll as jest.Mock).mockResolvedValue(mockAssignments);
      (mockStore.get as jest.Mock).mockImplementation((id: string) => {
        return Promise.resolve(mockAssignments.find(a => a.id === id) || null);
      });
      (mockStore.update as jest.Mock).mockResolvedValue(undefined);
      (mockStore.delete as jest.Mock).mockResolvedValue(undefined);

      await assignmentApi.deleteAssignmentsOfTier("tier-1");

      expect(mockStore.delete).toHaveBeenCalledTimes(2);
      expect(mockStore.delete).toHaveBeenCalledWith("assignment-1");
      expect(mockStore.delete).toHaveBeenCalledWith("assignment-2");
    });

    it("should handle deleting assignments when tier has no assignments", async () => {
      (mockStore.getAll as jest.Mock).mockResolvedValue(mockAssignments);
      (mockStore.delete as jest.Mock).mockResolvedValue(undefined);

      await assignmentApi.deleteAssignmentsOfTier("tier-non-existent");

      expect(mockStore.delete).not.toHaveBeenCalled();
    });

  });

  describe("deleteAssignmentsOfOption", () => {

    it("should delete all assignments of an option", async () => {
      (mockStore.getAll as jest.Mock).mockResolvedValue(mockAssignments);
      (mockStore.get as jest.Mock).mockImplementation((id: string) => {
        return Promise.resolve(mockAssignments.find(a => a.id === id) || null);
      });
      (mockStore.update as jest.Mock).mockResolvedValue(undefined);
      (mockStore.delete as jest.Mock).mockResolvedValue(undefined);

      await assignmentApi.deleteAssignmentsOfOption("option-1");

      expect(mockStore.delete).toHaveBeenCalledTimes(1);
      expect(mockStore.delete).toHaveBeenCalledWith("assignment-1");
    });

    it("should handle deleting assignments when option has no assignments", async () => {
      (mockStore.getAll as jest.Mock).mockResolvedValue(mockAssignments);
      (mockStore.delete as jest.Mock).mockResolvedValue(undefined);

      await assignmentApi.deleteAssignmentsOfOption("option-non-existent");

      expect(mockStore.delete).not.toHaveBeenCalled();
    });

  });

  describe("deleteAssignmentsOfUser", () => {

    it("should delete all assignments of a user", async () => {
      (mockStore.getAll as jest.Mock).mockResolvedValue(mockAssignments);
      (mockStore.get as jest.Mock).mockImplementation((id: string) => {
        return Promise.resolve(mockAssignments.find(a => a.id === id) || null);
      });
      (mockStore.update as jest.Mock).mockResolvedValue(undefined);
      (mockStore.delete as jest.Mock).mockResolvedValue(undefined);

      await assignmentApi.deleteAssignmentsOfUser("user-1");

      expect(mockStore.delete).toHaveBeenCalledTimes(3);
      expect(mockStore.delete).toHaveBeenCalledWith("assignment-1");
      expect(mockStore.delete).toHaveBeenCalledWith("assignment-2");
      expect(mockStore.delete).toHaveBeenCalledWith("assignment-4");
    });

    it("should handle deleting assignments when user has no assignments", async () => {
      (mockStore.getAll as jest.Mock).mockResolvedValue(mockAssignments);
      (mockStore.delete as jest.Mock).mockResolvedValue(undefined);

      await assignmentApi.deleteAssignmentsOfUser("user-non-existent");

      expect(mockStore.delete).not.toHaveBeenCalled();
    });

  });

  describe("edge cases", () => {

    it("should handle deleteAssignment with complex order reordering", async () => {
      const complexAssignments: Assignment[] = [
        { ...mockAssignments[0], order: 5 },
        { ...mockAssignments[1], order: 10 },
        { ...mockAssignments[3], order: 15 },
      ];

      (mockStore.get as jest.Mock).mockResolvedValue(complexAssignments[1]);
      (mockStore.getAll as jest.Mock).mockResolvedValue(complexAssignments);
      (mockStore.update as jest.Mock).mockResolvedValue(undefined);
      (mockStore.delete as jest.Mock).mockResolvedValue(undefined);

      await assignmentApi.deleteAssignment("assignment-2");

      // Should reorder to 1, 2 instead of 5, 15
      expect(mockStore.update).toHaveBeenCalledWith({
        ...complexAssignments[0],
        order: 1,
      });
      expect(mockStore.update).toHaveBeenCalledWith({
        ...complexAssignments[2],
        order: 2,
      });
    });

  });

});