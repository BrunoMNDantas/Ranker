// Mock Firebase/Stores to prevent initialization
jest.mock('../../../services/store/Stores', () => ({
  VOTE_STORE: {},
}));

import { RootState } from '../../../app/store';
import {
  selectAllVotes,
  selectVoteById,
  selectVoteIds,
  selectVotesLoading,
  selectVotesError,
  selectVotesByIds,
  selectVotesOfRank,
  selectVotesOfUser,
} from './Vote.selectors';
import { Vote } from '../model/Vote.types';

describe('Vote Selectors', () => {

  const mockVote1: Vote = {
    id: 'vote-1',
    creationDate: new Date('2024-01-01'),
    lastUpdateDate: new Date('2024-01-02'),
    ownerId: 'user-1',
    rankId: 'rank-1',
    title: 'Vote One',
  };

  const mockVote2: Vote = {
    id: 'vote-2',
    creationDate: new Date('2024-01-03'),
    lastUpdateDate: new Date('2024-01-04'),
    ownerId: 'user-1',
    rankId: 'rank-1',
    title: 'Vote Two',
  };

  const mockVote3: Vote = {
    id: 'vote-3',
    creationDate: new Date('2024-01-05'),
    lastUpdateDate: new Date('2024-01-06'),
    ownerId: 'user-2',
    rankId: 'rank-2',
    title: 'Vote Three',
  };

  const createMockState = (overrides?: Partial<RootState['vote']>): RootState => {
    return {
      vote: {
        ids: [],
        entities: {},
        loading: false,
        error: null,
        ...overrides,
      },
    } as RootState;
  };

  describe('selectAllVotes', () => {

    it('should return empty array when no votes exist', () => {
      const state = createMockState();

      const result = selectAllVotes(state);

      expect(result).toEqual([]);
    });

    it('should return all votes', () => {
      const state = createMockState({
        ids: ['vote-1', 'vote-2'],
        entities: {
          'vote-1': mockVote1,
          'vote-2': mockVote2,
        },
      });

      const result = selectAllVotes(state);

      expect(result).toEqual([mockVote1, mockVote2]);
    });

  });

  describe('selectVoteById', () => {

    it('should return undefined when vote does not exist', () => {
      const state = createMockState();

      const result = selectVoteById(state, 'non-existent');

      expect(result).toBeUndefined();
    });

    it('should return vote when it exists', () => {
      const state = createMockState({
        ids: ['vote-1'],
        entities: {
          'vote-1': mockVote1,
        },
      });

      const result = selectVoteById(state, 'vote-1');

      expect(result).toEqual(mockVote1);
    });

  });

  describe('selectVoteIds', () => {

    it('should return empty array when no votes exist', () => {
      const state = createMockState();

      const result = selectVoteIds(state);

      expect(result).toEqual([]);
    });

    it('should return all vote ids', () => {
      const state = createMockState({
        ids: ['vote-1', 'vote-2', 'vote-3'],
        entities: {
          'vote-1': mockVote1,
          'vote-2': mockVote2,
          'vote-3': mockVote3,
        },
      });

      const result = selectVoteIds(state);

      expect(result).toEqual(['vote-1', 'vote-2', 'vote-3']);
    });

  });

  describe('selectVotesLoading', () => {

    it('should return false when not loading', () => {
      const state = createMockState({ loading: false });

      const result = selectVotesLoading(state);

      expect(result).toBe(false);
    });

    it('should return true when loading', () => {
      const state = createMockState({ loading: true });

      const result = selectVotesLoading(state);

      expect(result).toBe(true);
    });

  });

  describe('selectVotesError', () => {

    it('should return null when no error', () => {
      const state = createMockState({ error: null });

      const result = selectVotesError(state);

      expect(result).toBeNull();
    });

    it('should return error message when error exists', () => {
      const errorMessage = 'Failed to fetch votes';
      const state = createMockState({ error: errorMessage });

      const result = selectVotesError(state);

      expect(result).toBe(errorMessage);
    });

  });

  describe('selectVotesByIds', () => {

    it('should return empty array when ids array is empty', () => {
      const state = createMockState({
        ids: ['vote-1', 'vote-2'],
        entities: {
          'vote-1': mockVote1,
          'vote-2': mockVote2,
        },
      });

      const result = selectVotesByIds(state, []);

      expect(result).toEqual([]);
    });

    it('should return array with undefined for non-existent votes', () => {
      const state = createMockState();

      const result = selectVotesByIds(state, ['vote-1', 'vote-2']);

      expect(result).toEqual([undefined, undefined]);
    });

    it('should return requested votes', () => {
      const state = createMockState({
        ids: ['vote-1', 'vote-2', 'vote-3'],
        entities: {
          'vote-1': mockVote1,
          'vote-2': mockVote2,
          'vote-3': mockVote3,
        },
      });

      const result = selectVotesByIds(state, ['vote-1', 'vote-3']);

      expect(result).toEqual([mockVote1, mockVote3]);
    });

  });

  describe('selectVotesOfRank', () => {

    it('should return empty array when no votes exist', () => {
      const state = createMockState();

      const result = selectVotesOfRank(state, 'rank-1');

      expect(result).toEqual([]);
    });

    it('should return only votes belonging to specified rank', () => {
      const state = createMockState({
        ids: ['vote-1', 'vote-2', 'vote-3'],
        entities: {
          'vote-1': mockVote1,
          'vote-2': mockVote2,
          'vote-3': mockVote3,
        },
      });

      const result = selectVotesOfRank(state, 'rank-1');

      expect(result).toEqual([mockVote1, mockVote2]);
    });

    it('should return empty array when rank has no votes', () => {
      const state = createMockState({
        ids: ['vote-1', 'vote-2'],
        entities: {
          'vote-1': mockVote1,
          'vote-2': mockVote2,
        },
      });

      const result = selectVotesOfRank(state, 'rank-3');

      expect(result).toEqual([]);
    });

  });
  describe('selectVotesOfUser', () => {

    it('should return empty array when no votes exist', () => {
      const state = createMockState();

      const result = selectVotesOfUser(state, 'user-1');

      expect(result).toEqual([]);
    });

    it('should return only votes belonging to specified user', () => {
      const state = createMockState({
        ids: ['vote-1', 'vote-2', 'vote-3'],
        entities: {
          'vote-1': mockVote1,
          'vote-2': mockVote2,
          'vote-3': mockVote3,
        },
      });

      const result = selectVotesOfUser(state, 'user-1');

      expect(result).toEqual([mockVote1, mockVote2]);
    });

    it('should return empty array when user has no votes', () => {
      const state = createMockState({
        ids: ['vote-1', 'vote-2'],
        entities: {
          'vote-1': mockVote1,
          'vote-2': mockVote2,
        },
      });

      const result = selectVotesOfUser(state, 'user-3');

      expect(result).toEqual([]);
    });

  });

});
