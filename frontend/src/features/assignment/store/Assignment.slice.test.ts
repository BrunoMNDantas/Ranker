// Mock Firebase/Stores to prevent initialization
jest.mock('../../../services/store/Stores', () => ({
  ASSIGNMENT_STORE: {},
}));

import assignmentReducer, {
  setAssignments,
  addAssignment,
  addAssignments,
  updateAssignment,
  updateAssignments,
  deleteAssignment,
  deleteAssignments,
  setLoading,
  setError,
} from './Assignment.slice';
import { fetchAllAssignments, fetchAssignmentById, fetchAssignmentsByIds, fetchAssignmentsOfUser, createAssignmentThunk, updateAssignmentThunk, deleteAssignmentThunk } from './Assignment.thunks';
import { Assignment } from '../model/Assignment.types';

describe('Assignment Slice', () => {

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

  const mockAssignment3: Assignment = {
    id: 'assignment-3',
    creationDate: new Date('2024-01-05'),
    lastUpdateDate: new Date('2024-01-06'),
    ownerId: 'user-2',
    voteId: 'vote-2',
    optionId: 'option-2',
    tierId: 'tier-2',
    order: 3
  };

  const initialState = {
    ids: [],
    entities: {},
    loading: false,
    error: null,
  };

  describe('reducer', () => {

    it('should return the initial state', () => {
      const result = assignmentReducer(undefined, { type: 'unknown' });

      expect(result).toEqual(initialState);
    });

  });

  describe('setAssignments', () => {

    it('should replace all assignments', () => {
      const state = {
        ids: ['assignment-1'],
        entities: { 'assignment-1': mockAssignment1 },
        loading: false,
        error: null,
      };

      const result = assignmentReducer(state, setAssignments([mockAssignment2, mockAssignment3]));

      expect(result.ids).toEqual(['assignment-2', 'assignment-3']);
      expect(result.entities).toEqual({
        'assignment-2': mockAssignment2,
        'assignment-3': mockAssignment3,
      });
    });

  });

  describe('addAssignment', () => {

    it('should add a single assignment', () => {
      const result = assignmentReducer(initialState, addAssignment(mockAssignment1));

      expect(result.ids).toEqual(['assignment-1']);
      expect(result.entities['assignment-1']).toEqual(mockAssignment1);
    });

  });

  describe('addAssignments', () => {

    it('should add multiple assignments', () => {
      const result = assignmentReducer(initialState, addAssignments([mockAssignment1, mockAssignment2]));

      expect(result.ids).toEqual(['assignment-1', 'assignment-2']);
      expect(result.entities).toEqual({
        'assignment-1': mockAssignment1,
        'assignment-2': mockAssignment2,
      });
    });

  });

  describe('updateAssignment', () => {

    it('should update an existing assignment', () => {
      const state = {
        ids: ['assignment-1'],
        entities: { 'assignment-1': mockAssignment1 },
        loading: false,
        error: null,
      };

      const updatedAssignment = { id: 'assignment-1', changes: { ...mockAssignment1, tierId: 'Updated Tier Id' } };

      const result = assignmentReducer(state, updateAssignment(updatedAssignment));

      expect(result.entities['assignment-1']?.tierId).toBe('Updated Tier Id');
      expect(result.entities['assignment-1']?.ownerId).toBe(mockAssignment1.ownerId);
    });

  });

  describe('updateAssignments', () => {

    it('should update multiple assignments', () => {
      const state = {
        ids: ['assignment-1', 'assignment-2'],
        entities: {
          'assignment-1': mockAssignment1,
          'assignment-2': mockAssignment2,
        },
        loading: false,
        error: null,
      };

      const updates = [
        { id: 'assignment-1', changes: { ...mockAssignment1, tierId: 'Updated Tier 1' } },
        { id: 'assignment-2', changes: { ...mockAssignment2, tierId: 'Updated Tier 2' } },
      ];

      const result = assignmentReducer(state, updateAssignments(updates));

      expect(result.entities['assignment-1']?.tierId).toBe('Updated Tier 1');
      expect(result.entities['assignment-2']?.tierId).toBe('Updated Tier 2');
    });

  });

  describe('deleteAssignment', () => {

    it('should remove a assignment', () => {
      const state = {
        ids: ['assignment-1', 'assignment-2'],
        entities: {
          'assignment-1': mockAssignment1,
          'assignment-2': mockAssignment2,
        },
        loading: false,
        error: null,
      };

      const result = assignmentReducer(state, deleteAssignment('assignment-1'));

      expect(result.ids).toEqual(['assignment-2']);
      expect(result.entities['assignment-1']).toBeUndefined();
    });

  });

  describe('deleteAssignments', () => {

    it('should remove multiple assignments', () => {
      const state = {
        ids: ['assignment-1', 'assignment-2', 'assignment-3'],
        entities: {
          'assignment-1': mockAssignment1,
          'assignment-2': mockAssignment2,
          'assignment-3': mockAssignment3,
        },
        loading: false,
        error: null,
      };

      const result = assignmentReducer(state, deleteAssignments(['assignment-1', 'assignment-3']));

      expect(result.ids).toEqual(['assignment-2']);
    });

  });

  describe('setLoading', () => {

    it('should set loading to true', () => {
      const result = assignmentReducer(initialState, setLoading(true));

      expect(result.loading).toBe(true);
    });

    it('should set loading to false', () => {
      const state = { ...initialState, loading: true };

      const result = assignmentReducer(state, setLoading(false));

      expect(result.loading).toBe(false);
    });

  });

  describe('setError', () => {

    it('should set error message', () => {
      const errorMessage = 'Failed to fetch assignments';

      const result = assignmentReducer(initialState, setError(errorMessage));

      expect(result.error).toBe(errorMessage);
    });

    it('should clear error when null is provided', () => {
      const state = { ...initialState, error: 'Previous error' };

      const result = assignmentReducer(state, setError(null));

      expect(result.error).toBeNull();
    });

  });

  describe('fetchAllAssignments extraReducers', () => {

    it('should set loading true on pending', () => {
      const action = { type: fetchAllAssignments.pending.type };

      const result = assignmentReducer(initialState, action);

      expect(result.loading).toBe(true);
      expect(result.error).toBeNull();
    });

    it('should set all assignments on fulfilled', () => {
      const action = {
        type: fetchAllAssignments.fulfilled.type,
        payload: [mockAssignment1, mockAssignment2],
      };

      const result = assignmentReducer(initialState, action);

      expect(result.loading).toBe(false);
      expect(result.ids).toEqual(['assignment-1', 'assignment-2']);
    });

    it('should set error on rejected', () => {
      const action = {
        type: fetchAllAssignments.rejected.type,
        error: { message: 'Network error' },
      };

      const result = assignmentReducer(initialState, action);

      expect(result.loading).toBe(false);
      expect(result.error).toBe('Network error');
    });

  });

  describe('fetchAssignmentById extraReducers', () => {

    it('should set loading true on pending', () => {
      const action = { type: fetchAssignmentById.pending.type };

      const result = assignmentReducer(initialState, action);

      expect(result.loading).toBe(true);
    });

    it('should upsert assignment on fulfilled', () => {
      const action = {
        type: fetchAssignmentById.fulfilled.type,
        payload: mockAssignment1,
      };

      const result = assignmentReducer(initialState, action);

      expect(result.loading).toBe(false);
      expect(result.entities['assignment-1']).toEqual(mockAssignment1);
    });

    it('should not add assignment when payload is null', () => {
      const action = {
        type: fetchAssignmentById.fulfilled.type,
        payload: null,
      };

      const result = assignmentReducer(initialState, action);

      expect(result.loading).toBe(false);
      expect(result.ids).toEqual([]);
    });

  });

  describe('fetchAssignmentsByIds extraReducers', () => {

    it('should upsert multiple assignments on fulfilled', () => {
      const action = {
        type: fetchAssignmentsByIds.fulfilled.type,
        payload: [mockAssignment1, mockAssignment2],
      };

      const result = assignmentReducer(initialState, action);

      expect(result.loading).toBe(false);
      expect(result.ids).toEqual(['assignment-1', 'assignment-2']);
    });

  });

  describe('fetchAssignmentsOfUser extraReducers', () => {

    it('should set all assignments on fulfilled', () => {
      const action = {
        type: fetchAssignmentsOfUser.fulfilled.type,
        payload: [mockAssignment1, mockAssignment2],
      };

      const result = assignmentReducer(initialState, action);

      expect(result.loading).toBe(false);
      expect(result.ids).toEqual(['assignment-1', 'assignment-2']);
    });

  });

  describe('createAssignmentThunk extraReducers', () => {

    it('should add new assignment on fulfilled', () => {
      const action = {
        type: createAssignmentThunk.fulfilled.type,
        payload: mockAssignment1,
      };

      const result = assignmentReducer(initialState, action);

      expect(result.loading).toBe(false);
      expect(result.entities['assignment-1']).toEqual(mockAssignment1);
    });

  });

  describe('updateAssignmentThunk extraReducers', () => {

    it('should upsert updated assignment on fulfilled', () => {
      const state = {
        ids: ['assignment-1'],
        entities: { 'assignment-1': mockAssignment1 },
        loading: false,
        error: null,
      };

      const updatedAssignment = { ...mockAssignment1, tierId: 'Updated Tier Id' };
      const action = {
        type: updateAssignmentThunk.fulfilled.type,
        payload: updatedAssignment,
      };

      const result = assignmentReducer(state, action);

      expect(result.loading).toBe(false);
      expect(result.entities['assignment-1']?.tierId).toBe('Updated Tier Id');
    });

  });

  describe('deleteAssignmentThunk extraReducers', () => {

    it('should remove assignment on fulfilled', () => {
      const state = {
        ids: ['assignment-1', 'assignment-2'],
        entities: {
          'assignment-1': mockAssignment1,
          'assignment-2': mockAssignment2,
        },
        loading: false,
        error: null,
      };

      const action = {
        type: deleteAssignmentThunk.fulfilled.type,
        payload: 'assignment-1',
      };

      const result = assignmentReducer(state, action);

      expect(result.loading).toBe(false);
      expect(result.ids).toEqual(['assignment-2']);
    });

  });

});