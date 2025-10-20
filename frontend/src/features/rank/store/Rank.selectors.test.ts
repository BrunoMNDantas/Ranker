// Mock Firebase/Stores to prevent initialization
jest.mock('../../../services/store/Stores', () => ({
  RANK_STORE: {},
}));

import { RootState } from '../../../app/store';
import {
  selectAllRanks,
  selectRankById,
  selectRankIds,
  selectRanksLoading,
  selectRanksError,
  selectRanksByIds,
  selectRanksOfUser,
} from './Rank.selectors';
import { Rank } from '../model/Rank.types';

describe('Rank Selectors', () => {

  const mockRank1: Rank = {
    id: 'rank-1',
    creationDate: new Date('2024-01-01'),
    lastUpdateDate: new Date('2024-01-02'),
    ownerId: 'user-1',
    title: 'Rank One',
    description: 'Description One',
    imageUrl: null,
    color: null,
  };

  const mockRank2: Rank = {
    id: 'rank-2',
    creationDate: new Date('2024-01-03'),
    lastUpdateDate: new Date('2024-01-04'),
    ownerId: 'user-1',
    title: 'Rank Two',
    description: 'Description Two',
    imageUrl: null,
    color: null,
  };

  const mockRank3: Rank = {
    id: 'rank-3',
    creationDate: new Date('2024-01-05'),
    lastUpdateDate: new Date('2024-01-06'),
    ownerId: 'user-2',
    title: 'Rank Three',
    description: 'Description Three',
    imageUrl: null,
    color: null,
  };

  const createMockState = (overrides?: Partial<RootState['rank']>): RootState => {
    return {
      rank: {
        ids: [],
        entities: {},
        loading: false,
        error: null,
        ...overrides,
      },
    } as RootState;
  };

  describe('selectAllRanks', () => {

    it('should return empty array when no ranks exist', () => {
      const state = createMockState();

      const result = selectAllRanks(state);

      expect(result).toEqual([]);
    });

    it('should return all ranks', () => {
      const state = createMockState({
        ids: ['rank-1', 'rank-2'],
        entities: {
          'rank-1': mockRank1,
          'rank-2': mockRank2,
        },
      });

      const result = selectAllRanks(state);

      expect(result).toEqual([mockRank1, mockRank2]);
    });

  });

  describe('selectRankById', () => {

    it('should return undefined when rank does not exist', () => {
      const state = createMockState();

      const result = selectRankById(state, 'non-existent');

      expect(result).toBeUndefined();
    });

    it('should return rank when it exists', () => {
      const state = createMockState({
        ids: ['rank-1'],
        entities: {
          'rank-1': mockRank1,
        },
      });

      const result = selectRankById(state, 'rank-1');

      expect(result).toEqual(mockRank1);
    });

  });

  describe('selectRankIds', () => {

    it('should return empty array when no ranks exist', () => {
      const state = createMockState();

      const result = selectRankIds(state);

      expect(result).toEqual([]);
    });

    it('should return all rank ids', () => {
      const state = createMockState({
        ids: ['rank-1', 'rank-2', 'rank-3'],
        entities: {
          'rank-1': mockRank1,
          'rank-2': mockRank2,
          'rank-3': mockRank3,
        },
      });

      const result = selectRankIds(state);

      expect(result).toEqual(['rank-1', 'rank-2', 'rank-3']);
    });

  });

  describe('selectRanksLoading', () => {

    it('should return false when not loading', () => {
      const state = createMockState({ loading: false });

      const result = selectRanksLoading(state);

      expect(result).toBe(false);
    });

    it('should return true when loading', () => {
      const state = createMockState({ loading: true });

      const result = selectRanksLoading(state);

      expect(result).toBe(true);
    });

  });

  describe('selectRanksError', () => {

    it('should return null when no error', () => {
      const state = createMockState({ error: null });

      const result = selectRanksError(state);

      expect(result).toBeNull();
    });

    it('should return error message when error exists', () => {
      const errorMessage = 'Failed to fetch ranks';
      const state = createMockState({ error: errorMessage });

      const result = selectRanksError(state);

      expect(result).toBe(errorMessage);
    });

  });

  describe('selectRanksByIds', () => {

    it('should return empty array when ids array is empty', () => {
      const state = createMockState({
        ids: ['rank-1', 'rank-2'],
        entities: {
          'rank-1': mockRank1,
          'rank-2': mockRank2,
        },
      });

      const result = selectRanksByIds(state, []);

      expect(result).toEqual([]);
    });

    it('should return array with undefined for non-existent ranks', () => {
      const state = createMockState();

      const result = selectRanksByIds(state, ['rank-1', 'rank-2']);

      expect(result).toEqual([undefined, undefined]);
    });

    it('should return requested ranks', () => {
      const state = createMockState({
        ids: ['rank-1', 'rank-2', 'rank-3'],
        entities: {
          'rank-1': mockRank1,
          'rank-2': mockRank2,
          'rank-3': mockRank3,
        },
      });

      const result = selectRanksByIds(state, ['rank-1', 'rank-3']);

      expect(result).toEqual([mockRank1, mockRank3]);
    });

  });

  describe('selectRanksOfUser', () => {

    it('should return empty array when no ranks exist', () => {
      const state = createMockState();

      const result = selectRanksOfUser(state, 'user-1');

      expect(result).toEqual([]);
    });

    it('should return only ranks belonging to specified user', () => {
      const state = createMockState({
        ids: ['rank-1', 'rank-2', 'rank-3'],
        entities: {
          'rank-1': mockRank1,
          'rank-2': mockRank2,
          'rank-3': mockRank3,
        },
      });

      const result = selectRanksOfUser(state, 'user-1');

      expect(result).toEqual([mockRank1, mockRank2]);
    });

    it('should return empty array when user has no ranks', () => {
      const state = createMockState({
        ids: ['rank-1', 'rank-2'],
        entities: {
          'rank-1': mockRank1,
          'rank-2': mockRank2,
        },
      });

      const result = selectRanksOfUser(state, 'user-3');

      expect(result).toEqual([]);
    });

  });

});
