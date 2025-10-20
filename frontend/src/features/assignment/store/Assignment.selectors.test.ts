// Mock Firebase/Stores to prevent initialization
jest.mock('../../../services/store/Stores', () => ({
  ASSIGNMENT_STORE: {},
}));

import { RootState } from '../../../app/store';
import {
  selectAllAssignments,
  selectAssignmentById,
  selectAssignmentIds,
  selectAssignmentsLoading,
  selectAssignmentsError,
  selectAssignmentsByIds,
  selectAssignmentsOfUser,
  selectAssignmentsOfVote,
  selectAssignmentsOfOption,
  selectAssignmentsOfTier,
} from './Assignment.selectors';
import { Assignment } from '../model/Assignment.types';

describe('Assignment Selectors', () => {

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

  const createMockState = (overrides?: Partial<RootState['assignment']>): RootState => {
    return {
      assignment: {
        ids: [],
        entities: {},
        loading: false,
        error: null,
        ...overrides,
      },
    } as RootState;
  };

  describe('selectAllAssignments', () => {

    it('should return empty array when no assignments exist', () => {
      const state = createMockState();

      const result = selectAllAssignments(state);

      expect(result).toEqual([]);
    });

    it('should return all assignments', () => {
      const state = createMockState({
        ids: ['assignment-1', 'assignment-2'],
        entities: {
          'assignment-1': mockAssignment1,
          'assignment-2': mockAssignment2,
        },
      });

      const result = selectAllAssignments(state);

      expect(result).toEqual([mockAssignment1, mockAssignment2]);
    });

  });

  describe('selectAssignmentById', () => {

    it('should return undefined when assignment does not exist', () => {
      const state = createMockState();

      const result = selectAssignmentById(state, 'non-existent');

      expect(result).toBeUndefined();
    });

    it('should return assignment when it exists', () => {
      const state = createMockState({
        ids: ['assignment-1'],
        entities: {
          'assignment-1': mockAssignment1,
        },
      });

      const result = selectAssignmentById(state, 'assignment-1');

      expect(result).toEqual(mockAssignment1);
    });

  });

  describe('selectAssignmentIds', () => {

    it('should return empty array when no assignments exist', () => {
      const state = createMockState();

      const result = selectAssignmentIds(state);

      expect(result).toEqual([]);
    });

    it('should return all assignment ids', () => {
      const state = createMockState({
        ids: ['assignment-1', 'assignment-2', 'assignment-3'],
        entities: {
          'assignment-1': mockAssignment1,
          'assignment-2': mockAssignment2,
          'assignment-3': mockAssignment3,
        },
      });

      const result = selectAssignmentIds(state);

      expect(result).toEqual(['assignment-1', 'assignment-2', 'assignment-3']);
    });

  });

  describe('selectAssignmentsLoading', () => {

    it('should return false when not loading', () => {
      const state = createMockState({ loading: false });

      const result = selectAssignmentsLoading(state);

      expect(result).toBe(false);
    });

    it('should return true when loading', () => {
      const state = createMockState({ loading: true });

      const result = selectAssignmentsLoading(state);

      expect(result).toBe(true);
    });

  });

  describe('selectAssignmentsError', () => {

    it('should return null when no error', () => {
      const state = createMockState({ error: null });

      const result = selectAssignmentsError(state);

      expect(result).toBeNull();
    });

    it('should return error message when error exists', () => {
      const errorMessage = 'Failed to fetch assignments';
      const state = createMockState({ error: errorMessage });

      const result = selectAssignmentsError(state);

      expect(result).toBe(errorMessage);
    });

  });

  describe('selectAssignmentsByIds', () => {

    it('should return empty array when ids array is empty', () => {
      const state = createMockState({
        ids: ['assignment-1', 'assignment-2'],
        entities: {
          'assignment-1': mockAssignment1,
          'assignment-2': mockAssignment2,
        },
      });

      const result = selectAssignmentsByIds(state, []);

      expect(result).toEqual([]);
    });

    it('should return array with undefined for non-existent assignments', () => {
      const state = createMockState();

      const result = selectAssignmentsByIds(state, ['assignment-1', 'assignment-2']);

      expect(result).toEqual([undefined, undefined]);
    });

    it('should return requested assignments', () => {
      const state = createMockState({
        ids: ['assignment-1', 'assignment-2', 'assignment-3'],
        entities: {
          'assignment-1': mockAssignment1,
          'assignment-2': mockAssignment2,
          'assignment-3': mockAssignment3,
        },
      });

      const result = selectAssignmentsByIds(state, ['assignment-1', 'assignment-3']);

      expect(result).toEqual([mockAssignment1, mockAssignment3]);
    });

  });

  describe('selectAssignmentsOfUser', () => {

    it('should return empty array when no assignments exist', () => {
      const state = createMockState();

      const result = selectAssignmentsOfUser(state, 'user-1');

      expect(result).toEqual([]);
    });

    it('should return only assignments belonging to specified user', () => {
      const state = createMockState({
        ids: ['assignment-1', 'assignment-2', 'assignment-3'],
        entities: {
          'assignment-1': mockAssignment1,
          'assignment-2': mockAssignment2,
          'assignment-3': mockAssignment3,
        },
      });

      const result = selectAssignmentsOfUser(state, 'user-1');

      expect(result).toEqual([mockAssignment1, mockAssignment2]);
    });

    it('should return empty array when user has no assignments', () => {
      const state = createMockState({
        ids: ['assignment-1', 'assignment-2'],
        entities: {
          'assignment-1': mockAssignment1,
          'assignment-2': mockAssignment2,
        },
      });

      const result = selectAssignmentsOfUser(state, 'user-3');

      expect(result).toEqual([]);
    });

  });

  describe('selectAssignmentsOfVote', () => {

    it('should return empty array when no assignments exist', () => {
      const state = createMockState();

      const result = selectAssignmentsOfVote(state, 'vote-1');

      expect(result).toEqual([]);
    });

    it('should return only assignments belonging to specified vote', () => {
      const state = createMockState({
        ids: ['assignment-1', 'assignment-2', 'assignment-3'],
        entities: {
          'assignment-1': mockAssignment1,
          'assignment-2': mockAssignment2,
          'assignment-3': mockAssignment3,
        },
      });

      const result = selectAssignmentsOfVote(state, 'vote-1');

      expect(result).toEqual([mockAssignment1, mockAssignment2]);
    });

    it('should return empty array when vote has no assignments', () => {
      const state = createMockState({
        ids: ['assignment-1', 'assignment-2'],
        entities: {
          'assignment-1': mockAssignment1,
          'assignment-2': mockAssignment2,
        },
      });

      const result = selectAssignmentsOfVote(state, 'vote-3');

      expect(result).toEqual([]);
    });

  });

  describe('selectAssignmentsOfOption', () => {

    it('should return empty array when no assignments exist', () => {
      const state = createMockState();

      const result = selectAssignmentsOfOption(state, 'option-1');

      expect(result).toEqual([]);
    });

    it('should return only assignments belonging to specified option', () => {
      const state = createMockState({
        ids: ['assignment-1', 'assignment-2', 'assignment-3'],
        entities: {
          'assignment-1': mockAssignment1,
          'assignment-2': mockAssignment2,
          'assignment-3': mockAssignment3,
        },
      });

      const result = selectAssignmentsOfOption(state, 'option-1');

      expect(result).toEqual([mockAssignment1, mockAssignment2]);
    });

    it('should return empty array when option has no assignments', () => {
      const state = createMockState({
        ids: ['assignment-1', 'assignment-2'],
        entities: {
          'assignment-1': mockAssignment1,
          'assignment-2': mockAssignment2,
        },
      });

      const result = selectAssignmentsOfOption(state, 'option-3');

      expect(result).toEqual([]);
    });

  });

  describe('selectAssignmentsOfTier', () => {

    it('should return empty array when no assignments exist', () => {
      const state = createMockState();

      const result = selectAssignmentsOfTier(state, 'tier-1');

      expect(result).toEqual([]);
    });

    it('should return only assignments belonging to specified tier', () => {
      const state = createMockState({
        ids: ['assignment-1', 'assignment-2', 'assignment-3'],
        entities: {
          'assignment-1': mockAssignment1,
          'assignment-2': mockAssignment2,
          'assignment-3': mockAssignment3,
        },
      });

      const result = selectAssignmentsOfTier(state, 'tier-1');

      expect(result).toEqual([mockAssignment1, mockAssignment2]);

    });

    it('should return empty array when tier has no assignments', () => {
      const state = createMockState({
        ids: ['assignment-1', 'assignment-2'],
        entities: {
          'assignment-1': mockAssignment1,
          'assignment-2': mockAssignment2,
        },
      });

      const result = selectAssignmentsOfTier(state, 'tier-3');

      expect(result).toEqual([]);
    });

  });

});