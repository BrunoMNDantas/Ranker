// Mock Firebase/Stores to prevent initialization
jest.mock('../../../services/store/Stores', () => ({
  TIER_STORE: {},
}));

import tierReducer, {
  setTiers,
  addTier,
  addTiers,
  updateTier,
  updateTiers,
  deleteTier,
  deleteTiers,
  setLoading,
  setError,
} from './Tier.slice';
import { fetchAllTiers, fetchTierById, fetchTiersByIds, fetchTiersOfUser, createTierThunk, updateTierThunk, deleteTierThunk } from './Tier.thunks';
import { Tier } from '../model/Tier.types';

describe('Tier Slice', () => {

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
    order: 1,
    title: 'Tier Three',
    description: null,
    imageUrl: null,
    color: null,
  };

  const initialState = {
    ids: [],
    entities: {},
    loading: false,
    error: null,
  };

  describe('reducer', () => {

    it('should return the initial state', () => {
      const result = tierReducer(undefined, { type: 'unknown' });

      expect(result).toEqual(initialState);
    });

  });

  describe('setTiers', () => {

    it('should replace all tiers', () => {
      const state = {
        ids: ['tier-1'],
        entities: { 'tier-1': mockTier1 },
        loading: false,
        error: null,
      };

      const result = tierReducer(state, setTiers([mockTier2, mockTier3]));

      expect(result.ids).toEqual(['tier-2', 'tier-3']);
      expect(result.entities).toEqual({
        'tier-2': mockTier2,
        'tier-3': mockTier3,
      });
    });

  });

  describe('addTier', () => {

    it('should add a single tier', () => {
      const result = tierReducer(initialState, addTier(mockTier1));

      expect(result.ids).toEqual(['tier-1']);
      expect(result.entities['tier-1']).toEqual(mockTier1);
    });

  });

  describe('addTiers', () => {

    it('should add multiple tiers', () => {
      const result = tierReducer(initialState, addTiers([mockTier1, mockTier2]));

      expect(result.ids).toEqual(['tier-1', 'tier-2']);
      expect(result.entities).toEqual({
        'tier-1': mockTier1,
        'tier-2': mockTier2,
      });
    });

  });

  describe('updateTier', () => {

    it('should update an existing tier', () => {
      const state = {
        ids: ['tier-1'],
        entities: { 'tier-1': mockTier1 },
        loading: false,
        error: null,
      };

      const updatedTier = { id: 'tier-1', changes: { title: 'Updated Title' } };

      const result = tierReducer(state, updateTier(updatedTier));

      expect(result.entities['tier-1']?.title).toBe('Updated Title');
      expect(result.entities['tier-1']?.ownerId).toBe(mockTier1.ownerId);
    });

  });

  describe('updateTiers', () => {

    it('should update multiple tiers', () => {
      const state = {
        ids: ['tier-1', 'tier-2'],
        entities: {
          'tier-1': mockTier1,
          'tier-2': mockTier2,
        },
        loading: false,
        error: null,
      };

      const updates = [
        { id: 'tier-1', changes: { title: 'Updated One' } },
        { id: 'tier-2', changes: { title: 'Updated Two' } },
      ];

      const result = tierReducer(state, updateTiers(updates));

      expect(result.entities['tier-1']?.title).toBe('Updated One');
      expect(result.entities['tier-2']?.title).toBe('Updated Two');
    });

  });

  describe('deleteTier', () => {

    it('should remove a tier', () => {
      const state = {
        ids: ['tier-1', 'tier-2'],
        entities: {
          'tier-1': mockTier1,
          'tier-2': mockTier2,
        },
        loading: false,
        error: null,
      };

      const result = tierReducer(state, deleteTier('tier-1'));

      expect(result.ids).toEqual(['tier-2']);
      expect(result.entities['tier-1']).toBeUndefined();
    });

  });

  describe('deleteTiers', () => {

    it('should remove multiple tiers', () => {
      const state = {
        ids: ['tier-1', 'tier-2', 'tier-3'],
        entities: {
          'tier-1': mockTier1,
          'tier-2': mockTier2,
          'tier-3': mockTier3,
        },
        loading: false,
        error: null,
      };

      const result = tierReducer(state, deleteTiers(['tier-1', 'tier-3']));

      expect(result.ids).toEqual(['tier-2']);
    });

  });

  describe('setLoading', () => {

    it('should set loading to true', () => {
      const result = tierReducer(initialState, setLoading(true));

      expect(result.loading).toBe(true);
    });

    it('should set loading to false', () => {
      const state = { ...initialState, loading: true };

      const result = tierReducer(state, setLoading(false));

      expect(result.loading).toBe(false);
    });

  });

  describe('setError', () => {

    it('should set error message', () => {
      const errorMessage = 'Failed to fetch tiers';

      const result = tierReducer(initialState, setError(errorMessage));

      expect(result.error).toBe(errorMessage);
    });

    it('should clear error when null is provided', () => {
      const state = { ...initialState, error: 'Previous error' };

      const result = tierReducer(state, setError(null));

      expect(result.error).toBeNull();
    });

  });

  describe('fetchAllTiers extraReducers', () => {

    it('should set loading true on pending', () => {
      const action = { type: fetchAllTiers.pending.type };

      const result = tierReducer(initialState, action);

      expect(result.loading).toBe(true);
      expect(result.error).toBeNull();
    });

    it('should set all tiers on fulfilled', () => {
      const action = {
        type: fetchAllTiers.fulfilled.type,
        payload: [mockTier1, mockTier2],
      };

      const result = tierReducer(initialState, action);

      expect(result.loading).toBe(false);
      expect(result.ids).toEqual(['tier-1', 'tier-2']);
    });

    it('should set error on rejected', () => {
      const action = {
        type: fetchAllTiers.rejected.type,
        error: { message: 'Network error' },
      };

      const result = tierReducer(initialState, action);

      expect(result.loading).toBe(false);
      expect(result.error).toBe('Network error');
    });

  });

  describe('fetchTierById extraReducers', () => {

    it('should set loading true on pending', () => {
      const action = { type: fetchTierById.pending.type };

      const result = tierReducer(initialState, action);

      expect(result.loading).toBe(true);
    });

    it('should upsert tier on fulfilled', () => {
      const action = {
        type: fetchTierById.fulfilled.type,
        payload: mockTier1,
      };

      const result = tierReducer(initialState, action);

      expect(result.loading).toBe(false);
      expect(result.entities['tier-1']).toEqual(mockTier1);
    });

    it('should not add tier when payload is null', () => {
      const action = {
        type: fetchTierById.fulfilled.type,
        payload: null,
      };

      const result = tierReducer(initialState, action);

      expect(result.loading).toBe(false);
      expect(result.ids).toEqual([]);
    });

  });

  describe('fetchTiersByIds extraReducers', () => {

    it('should upsert multiple tiers on fulfilled', () => {
      const action = {
        type: fetchTiersByIds.fulfilled.type,
        payload: [mockTier1, mockTier2],
      };

      const result = tierReducer(initialState, action);

      expect(result.loading).toBe(false);
      expect(result.ids).toEqual(['tier-1', 'tier-2']);
    });

  });

  describe('fetchTiersOfUser extraReducers', () => {

    it('should set all tiers on fulfilled', () => {
      const action = {
        type: fetchTiersOfUser.fulfilled.type,
        payload: [mockTier1, mockTier2],
      };

      const result = tierReducer(initialState, action);

      expect(result.loading).toBe(false);
      expect(result.ids).toEqual(['tier-1', 'tier-2']);
    });

  });

  describe('createTierThunk extraReducers', () => {

    it('should add new tier on fulfilled', () => {
      const action = {
        type: createTierThunk.fulfilled.type,
        payload: mockTier1,
      };

      const result = tierReducer(initialState, action);

      expect(result.loading).toBe(false);
      expect(result.entities['tier-1']).toEqual(mockTier1);
    });

  });

  describe('updateTierThunk extraReducers', () => {

    it('should upsert updated tier on fulfilled', () => {
      const state = {
        ids: ['tier-1'],
        entities: { 'tier-1': mockTier1 },
        loading: false,
        error: null,
      };

      const updatedTier = { ...mockTier1, title: 'Updated Title' };
      const action = {
        type: updateTierThunk.fulfilled.type,
        payload: updatedTier,
      };

      const result = tierReducer(state, action);

      expect(result.loading).toBe(false);
      expect(result.entities['tier-1']?.title).toBe('Updated Title');
    });

  });

  describe('deleteTierThunk extraReducers', () => {

    it('should remove tier on fulfilled', () => {
      const state = {
        ids: ['tier-1', 'tier-2'],
        entities: {
          'tier-1': mockTier1,
          'tier-2': mockTier2,
        },
        loading: false,
        error: null,
      };

      const action = {
        type: deleteTierThunk.fulfilled.type,
        payload: 'tier-1',
      };

      const result = tierReducer(state, action);

      expect(result.loading).toBe(false);
      expect(result.ids).toEqual(['tier-2']);
    });

  });

});
