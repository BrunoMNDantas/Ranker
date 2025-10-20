// Mock Firebase/Stores to prevent initialization
jest.mock('../../../services/store/Stores', () => ({
  TIER_STORE: {},
}));

import { RootState } from '../../../app/store';
import {
  selectAllTiers,
  selectTierById,
  selectTierIds,
  selectTiersLoading,
  selectTiersError,
  selectTiersByIds,
  selectTiersOfRank,
  selectTiersOfUser,
} from './Tier.selectors';
import { Tier } from '../model/Tier.types';

describe('Tier Selectors', () => {

  const mockTier1: Tier = {
    id: 'tier-1',
    creationDate: new Date('2024-01-01'),
    lastUpdateDate: new Date('2024-01-02'),
    ownerId: 'user-1',
    rankId: 'rank-1',
    order: 1,
    title: 'Tier One',
    description: 'Description One',
    imageUrl: null,
    color: null,
  };

  const mockTier2: Tier = {
    id: 'tier-2',
    creationDate: new Date('2024-01-03'),
    lastUpdateDate: new Date('2024-01-04'),
    ownerId: 'user-1',
    rankId: 'rank-1',
    order: 2,
    title: 'Tier Two',
    description: null,
    imageUrl: null,
    color: null,
  };

  const mockTier3: Tier = {
    id: 'tier-3',
    creationDate: new Date('2024-01-05'),
    lastUpdateDate: new Date('2024-01-06'),
    ownerId: 'user-2',
    rankId: 'rank-2',
    order: 3,
    title: 'Tier Three',
    description: null,
    imageUrl: null,
    color: null,
  };

  const createMockState = (overrides?: Partial<RootState['tier']>): RootState => {
    return {
      tier: {
        ids: [],
        entities: {},
        loading: false,
        error: null,
        ...overrides,
      },
    } as RootState;
  };

  describe('selectAllTiers', () => {

    it('should return empty array when no tiers exist', () => {
      const state = createMockState();

      const result = selectAllTiers(state);

      expect(result).toEqual([]);
    });

    it('should return all tiers', () => {
      const state = createMockState({
        ids: ['tier-1', 'tier-2'],
        entities: {
          'tier-1': mockTier1,
          'tier-2': mockTier2,
        },
      });

      const result = selectAllTiers(state);

      expect(result).toEqual([mockTier1, mockTier2]);
    });

  });

  describe('selectTierById', () => {

    it('should return undefined when tier does not exist', () => {
      const state = createMockState();

      const result = selectTierById(state, 'non-existent');

      expect(result).toBeUndefined();
    });

    it('should return tier when it exists', () => {
      const state = createMockState({
        ids: ['tier-1'],
        entities: {
          'tier-1': mockTier1,
        },
      });

      const result = selectTierById(state, 'tier-1');

      expect(result).toEqual(mockTier1);
    });

  });

  describe('selectTierIds', () => {

    it('should return empty array when no tiers exist', () => {
      const state = createMockState();

      const result = selectTierIds(state);

      expect(result).toEqual([]);
    });

    it('should return all tier ids', () => {
      const state = createMockState({
        ids: ['tier-1', 'tier-2', 'tier-3'],
        entities: {
          'tier-1': mockTier1,
          'tier-2': mockTier2,
          'tier-3': mockTier3,
        },
      });

      const result = selectTierIds(state);

      expect(result).toEqual(['tier-1', 'tier-2', 'tier-3']);
    });

  });

  describe('selectTiersLoading', () => {

    it('should return false when not loading', () => {
      const state = createMockState({ loading: false });

      const result = selectTiersLoading(state);

      expect(result).toBe(false);
    });

    it('should return true when loading', () => {
      const state = createMockState({ loading: true });

      const result = selectTiersLoading(state);

      expect(result).toBe(true);
    });

  });

  describe('selectTiersError', () => {

    it('should return null when no error', () => {
      const state = createMockState({ error: null });

      const result = selectTiersError(state);

      expect(result).toBeNull();
    });

    it('should return error message when error exists', () => {
      const errorMessage = 'Failed to fetch tiers';
      const state = createMockState({ error: errorMessage });

      const result = selectTiersError(state);

      expect(result).toBe(errorMessage);
    });

  });

  describe('selectTiersByIds', () => {

    it('should return empty array when ids array is empty', () => {
      const state = createMockState({
        ids: ['tier-1', 'tier-2'],
        entities: {
          'tier-1': mockTier1,
          'tier-2': mockTier2,
        },
      });

      const result = selectTiersByIds(state, []);

      expect(result).toEqual([]);
    });

    it('should return array with undefined for non-existent tiers', () => {
      const state = createMockState();

      const result = selectTiersByIds(state, ['tier-1', 'tier-2']);

      expect(result).toEqual([undefined, undefined]);
    });

    it('should return requested tiers', () => {
      const state = createMockState({
        ids: ['tier-1', 'tier-2', 'tier-3'],
        entities: {
          'tier-1': mockTier1,
          'tier-2': mockTier2,
          'tier-3': mockTier3,
        },
      });

      const result = selectTiersByIds(state, ['tier-1', 'tier-3']);

      expect(result).toEqual([mockTier1, mockTier3]);
    });

  });

  describe('selectTiersOfRank', () => {

    it('should return empty array when no tiers exist', () => {
      const state = createMockState();

      const result = selectTiersOfRank(state, 'rank-1');

      expect(result).toEqual([]);
    });

    it('should return only tiers belonging to specified rank', () => {
      const state = createMockState({
        ids: ['tier-1', 'tier-2', 'tier-3'],
        entities: {
          'tier-1': mockTier1,
          'tier-2': mockTier2,
          'tier-3': mockTier3,
        },
      });

      const result = selectTiersOfRank(state, 'rank-1');

      expect(result).toEqual([mockTier1, mockTier2]);
    });

    it('should return empty array when rank has no tiers', () => {
      const state = createMockState({
        ids: ['tier-1', 'tier-2'],
        entities: {
          'tier-1': mockTier1,
          'tier-2': mockTier2,
        },
      });

      const result = selectTiersOfRank(state, 'rank-3');

      expect(result).toEqual([]);
    });

  });
  describe('selectTiersOfUser', () => {

    it('should return empty array when no tiers exist', () => {
      const state = createMockState();

      const result = selectTiersOfUser(state, 'user-1');

      expect(result).toEqual([]);
    });

    it('should return only tiers belonging to specified user', () => {
      const state = createMockState({
        ids: ['tier-1', 'tier-2', 'tier-3'],
        entities: {
          'tier-1': mockTier1,
          'tier-2': mockTier2,
          'tier-3': mockTier3,
        },
      });

      const result = selectTiersOfUser(state, 'user-1');

      expect(result).toEqual([mockTier1, mockTier2]);
    });

    it('should return empty array when user has no tiers', () => {
      const state = createMockState({
        ids: ['tier-1', 'tier-2'],
        entities: {
          'tier-1': mockTier1,
          'tier-2': mockTier2,
        },
      });

      const result = selectTiersOfUser(state, 'user-3');

      expect(result).toEqual([]);
    });

  });

});
