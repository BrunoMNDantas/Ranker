// Mock Firebase/Stores to prevent initialization
jest.mock('../../../services/store/Stores', () => ({
  ASSIGNMENT_STORE: {},
}));

// Mock the API
const mockGetAllAssignments = jest.fn();
const mockGetAssignment = jest.fn();
const mockGetAssignmentsByIds = jest.fn();
const mockGetAssignmentsOfUser = jest.fn();
const mockCreateAssignment = jest.fn();
const mockUpdateAssignment = jest.fn();
const mockDeleteAssignment = jest.fn();

jest.mock('../api/Assignment.api', () => ({
  getAllAssignments: (...args: any[]) => mockGetAllAssignments(...args),
  getAssignment: (...args: any[]) => mockGetAssignment(...args),
  getAssignmentsByIds: (...args: any[]) => mockGetAssignmentsByIds(...args),
  getAssignmentsOfUser: (...args: any[]) => mockGetAssignmentsOfUser(...args),
  createAssignment: (...args: any[]) => mockCreateAssignment(...args),
  updateAssignment: (...args: any[]) => mockUpdateAssignment(...args),
  deleteAssignment: (...args: any[]) => mockDeleteAssignment(...args),
}));

import {
  fetchAllAssignments, fetchAssignmentById, fetchAssignmentsByIds,
  fetchAssignmentsOfUser, createAssignmentThunk,
  updateAssignmentThunk, deleteAssignmentThunk
} from './Assignment.thunks';
import { Assignment } from '../model/Assignment.types';

describe('Assignment Thunks', () => {

  const mockAssignment1: Assignment = {
    id: 'assignment-1',
    creationDate: new Date('2024-01-01'),
    lastUpdateDate: new Date('2024-01-02'),
    ownerId: 'user-1',
    voteId: 'vote-1',
    optionId: 'option-1',
    tierId: 'tier-1',
    order: 1
  };

  const mockAssignment2: Assignment = {
    id: 'assignment-2',
    creationDate: new Date('2024-01-03'),
    lastUpdateDate: new Date('2024-01-04'),
    ownerId: 'user-1',
    voteId: 'vote-1',
    optionId: 'option-1',
    tierId: 'tier-1',
    order: 2
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('fetchAllAssignments', () => {

    it('should fetch all assignments successfully', async () => {
      const assignments = [mockAssignment1, mockAssignment2];
      mockGetAllAssignments.mockResolvedValue(assignments);

      const dispatch = jest.fn();
      const getState = jest.fn();

      const thunk = fetchAllAssignments();
      const result = await thunk(dispatch, getState, undefined);

      expect(mockGetAllAssignments).toHaveBeenCalledTimes(1);
      expect(result.payload).toEqual(assignments);
    });

    it('should handle errors', async () => {
      const errorMessage = 'Network error';
      mockGetAllAssignments.mockRejectedValue(new Error(errorMessage));

      const dispatch = jest.fn();
      const getState = jest.fn();

      const thunk = fetchAllAssignments();
      const result = await thunk(dispatch, getState, undefined);

      expect(mockGetAllAssignments).toHaveBeenCalledTimes(1);
      expect(result.type).toBe('assignment/fetchAll/rejected');
      expect('error' in result && result.error.message).toBe(errorMessage);
    });

  });

  describe('fetchAssignmentById', () => {

    it('should fetch assignment by id successfully', async () => {
      const assignmentId = 'assignment-1';
      mockGetAssignment.mockResolvedValue(mockAssignment1);

      const dispatch = jest.fn();
      const getState = jest.fn();

      const thunk = fetchAssignmentById(assignmentId);
      const result = await thunk(dispatch, getState, undefined);

      expect(mockGetAssignment).toHaveBeenCalledWith(assignmentId);
      expect(result.payload).toEqual(mockAssignment1);
    });

    it('should handle errors', async () => {
      const assignmentId = 'assignment-1';
      const errorMessage = 'Assignment not found';
      mockGetAssignment.mockRejectedValue(new Error(errorMessage));

      const dispatch = jest.fn();
      const getState = jest.fn();

      const thunk = fetchAssignmentById(assignmentId);
      const result = await thunk(dispatch, getState, undefined);

      expect(mockGetAssignment).toHaveBeenCalledWith(assignmentId);
      expect(result.type).toBe('assignment/fetchById/rejected');
      expect('error' in result && result.error.message).toBe(errorMessage);
    });

  });

  describe('fetchAssignmentsByIds', () => {

    it('should fetch multiple assignments by ids successfully', async () => {
      const assignmentIds = ['assignment-1', 'assignment-2'];
      const assignments = [mockAssignment1, mockAssignment2];
      mockGetAssignmentsByIds.mockResolvedValue(assignments);

      const dispatch = jest.fn();
      const getState = jest.fn();

      const thunk = fetchAssignmentsByIds(assignmentIds);
      const result = await thunk(dispatch, getState, undefined);

      expect(mockGetAssignmentsByIds).toHaveBeenCalledWith(assignmentIds);
      expect(result.payload).toEqual(assignments);
    });

    it('should handle errors', async () => {
      const assignmentIds = ['assignment-1', 'assignment-2'];
      const errorMessage = 'Failed to fetch assignments';
      mockGetAssignmentsByIds.mockRejectedValue(new Error(errorMessage));

      const dispatch = jest.fn();
      const getState = jest.fn();

      const thunk = fetchAssignmentsByIds(assignmentIds);
      const result = await thunk(dispatch, getState, undefined);

      expect(mockGetAssignmentsByIds).toHaveBeenCalledWith(assignmentIds);
      expect(result.type).toBe('assignment/fetchByIds/rejected');
      expect('error' in result && result.error.message).toBe(errorMessage);
    });

  });

  describe('fetchAssignmentsOfUser', () => {

    it('should fetch assignments of user successfully', async () => {
      const ownerId = 'user-1';
      const assignments = [mockAssignment1, mockAssignment2];
      mockGetAssignmentsOfUser.mockResolvedValue(assignments);

      const dispatch = jest.fn();
      const getState = jest.fn();

      const thunk = fetchAssignmentsOfUser(ownerId);
      const result = await thunk(dispatch, getState, undefined);

      expect(mockGetAssignmentsOfUser).toHaveBeenCalledWith(ownerId);
      expect(result.payload).toEqual(assignments);
    });

    it('should handle errors', async () => {
      const ownerId = 'user-1';
      const errorMessage = 'Failed to fetch user assignments';
      mockGetAssignmentsOfUser.mockRejectedValue(new Error(errorMessage));

      const dispatch = jest.fn();
      const getState = jest.fn();

      const thunk = fetchAssignmentsOfUser(ownerId);
      const result = await thunk(dispatch, getState, undefined);

      expect(mockGetAssignmentsOfUser).toHaveBeenCalledWith(ownerId);
      expect(result.type).toBe('assignment/fetchOfUser/rejected');
      expect('error' in result && result.error.message).toBe(errorMessage);
    });

  });

  describe('createAssignmentThunk', () => {

    it('should create assignment successfully', async () => {
      const newAssignment: Assignment = {
        id: '',
        creationDate: new Date('2024-01-01'),
        lastUpdateDate: new Date('2024-01-02'),
        ownerId: 'user-1',
        voteId: 'vote-1',
        optionId: 'option-1',
        tierId: 'tier-1',
        order: 2
      };
      const createdId = 'assignment-123';
      mockCreateAssignment.mockResolvedValue(createdId);

      const dispatch = jest.fn();
      const getState = jest.fn();

      const thunk = createAssignmentThunk(newAssignment);
      const result = await thunk(dispatch, getState, undefined);

      expect(mockCreateAssignment).toHaveBeenCalledWith(newAssignment);
      expect(result.payload).toEqual({ ...newAssignment, id: createdId });
    });

    it('should handle errors', async () => {
      const newAssignment: Assignment = {
        id: '',
        creationDate: new Date('2024-01-01'),
        lastUpdateDate: new Date('2024-01-02'),
        ownerId: 'user-1',
        voteId: 'vote-1',
        optionId: 'option-1',
        tierId: 'tier-1',
        order: 2
      };
      const errorMessage = 'Failed to create assignment';
      mockCreateAssignment.mockRejectedValue(new Error(errorMessage));

      const dispatch = jest.fn();
      const getState = jest.fn();

      const thunk = createAssignmentThunk(newAssignment);
      const result = await thunk(dispatch, getState, undefined);

      expect(mockCreateAssignment).toHaveBeenCalledWith(newAssignment);
      expect(result.type).toBe('assignment/create/rejected');
      expect('error' in result && result.error.message).toBe(errorMessage);
    });

  });

  describe('updateAssignmentThunk', () => {

    it('should update assignment successfully', async () => {
      const updatedAssignment: Assignment = {
        id: 'assignment-1',
        creationDate: new Date('2024-01-01'),
        lastUpdateDate: new Date('2024-01-02'),
        ownerId: 'user-1',
        voteId: 'vote-1',
        optionId: 'option-1',
        tierId: 'tier-1',
        order: 2
      };
      mockUpdateAssignment.mockResolvedValue(undefined);

      const dispatch = jest.fn();
      const getState = jest.fn();

      const thunk = updateAssignmentThunk(updatedAssignment);
      const result = await thunk(dispatch, getState, undefined);

      expect(mockUpdateAssignment).toHaveBeenCalledWith(updatedAssignment);
      expect(result.payload).toEqual(updatedAssignment);
    });

    it('should handle errors', async () => {
      const updatedAssignment: Assignment = {
        id: 'assignment-1',
        creationDate: new Date('2024-01-01'),
        lastUpdateDate: new Date('2024-01-02'),
        ownerId: 'user-1',
        voteId: 'vote-1',
        optionId: 'option-1',
        tierId: 'tier-1',
        order: 2
      };
      const errorMessage = 'Failed to update assignment';
      mockUpdateAssignment.mockRejectedValue(new Error(errorMessage));

      const dispatch = jest.fn();
      const getState = jest.fn();

      const thunk = updateAssignmentThunk(updatedAssignment);
      const result = await thunk(dispatch, getState, undefined);

      expect(mockUpdateAssignment).toHaveBeenCalledWith(updatedAssignment);
      expect(result.type).toBe('assignment/update/rejected');
      expect('error' in result && result.error.message).toBe(errorMessage);
    });

  });

  describe('deleteAssignmentThunk', () => {

    it('should delete assignment successfully', async () => {
      const assignmentId = 'assignment-1';
      mockDeleteAssignment.mockResolvedValue(undefined);

      const dispatch = jest.fn();
      const getState = jest.fn();

      const thunk = deleteAssignmentThunk(assignmentId);
      const result = await thunk(dispatch, getState, undefined);

      expect(mockDeleteAssignment).toHaveBeenCalledWith(assignmentId);
      expect(result.payload).toBe(assignmentId);
    });

    it('should handle errors', async () => {
      const assignmentId = 'assignment-1';
      const errorMessage = 'Failed to delete assignment';
      mockDeleteAssignment.mockRejectedValue(new Error(errorMessage));

      const dispatch = jest.fn();
      const getState = jest.fn();

      const thunk = deleteAssignmentThunk(assignmentId);
      const result = await thunk(dispatch, getState, undefined);

      expect(mockDeleteAssignment).toHaveBeenCalledWith(assignmentId);
      expect(result.type).toBe('assignment/delete/rejected');
      expect('error' in result && result.error.message).toBe(errorMessage);
    });

  });

});