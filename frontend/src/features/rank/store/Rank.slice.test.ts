// Mock Firebase/Stores to prevent initialization
jest.mock('../../../services/store/Stores', () => ({
  RANK_STORE: {},
}));

import rankReducer, {
  setRanks,
  addRank,
  addRanks,
  updateRank,
  updateRanks,
  deleteRank,
  deleteRanks,
  setLoading,
  setError,
} from './Rank.slice';
import { fetchAllRanks, fetchRankById, fetchRanksByIds, fetchRanksOfUser, createRankThunk, updateRankThunk, deleteRankThunk } from './Rank.thunks';
import { Rank } from '../model/Rank.types';

describe('Rank Slice', () => {

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
    description: null,
    imageUrl: null,
    color: null,
  };

  const mockRank3: Rank = {
    id: 'rank-3',
    creationDate: new Date('2024-01-05'),
    lastUpdateDate: new Date('2024-01-06'),
    ownerId: 'user-2',
    title: 'Rank Three',
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
      const result = rankReducer(undefined, { type: 'unknown' });

      expect(result).toEqual(initialState);
    });

  });

  describe('setRanks', () => {

    it('should replace all ranks', () => {
      const state = {
        ids: ['rank-1'],
        entities: { 'rank-1': mockRank1 },
        loading: false,
        error: null,
      };

      const result = rankReducer(state, setRanks([mockRank2, mockRank3]));

      expect(result.ids).toEqual(['rank-2', 'rank-3']);
      expect(result.entities).toEqual({
        'rank-2': mockRank2,
        'rank-3': mockRank3,
      });
    });

  });

  describe('addRank', () => {

    it('should add a single rank', () => {
      const result = rankReducer(initialState, addRank(mockRank1));

      expect(result.ids).toEqual(['rank-1']);
      expect(result.entities['rank-1']).toEqual(mockRank1);
    });

  });

  describe('addRanks', () => {

    it('should add multiple ranks', () => {
      const result = rankReducer(initialState, addRanks([mockRank1, mockRank2]));

      expect(result.ids).toEqual(['rank-1', 'rank-2']);
      expect(result.entities).toEqual({
        'rank-1': mockRank1,
        'rank-2': mockRank2,
      });
    });

  });

  describe('updateRank', () => {

    it('should update an existing rank', () => {
      const state = {
        ids: ['rank-1'],
        entities: { 'rank-1': mockRank1 },
        loading: false,
        error: null,
      };

      const updatedRank = { id: 'rank-1', changes: { title: 'Updated Title' } };

      const result = rankReducer(state, updateRank(updatedRank));

      expect(result.entities['rank-1']?.title).toBe('Updated Title');
      expect(result.entities['rank-1']?.ownerId).toBe(mockRank1.ownerId);
    });

  });

  describe('updateRanks', () => {

    it('should update multiple ranks', () => {
      const state = {
        ids: ['rank-1', 'rank-2'],
        entities: {
          'rank-1': mockRank1,
          'rank-2': mockRank2,
        },
        loading: false,
        error: null,
      };

      const updates = [
        { id: 'rank-1', changes: { title: 'Updated One' } },
        { id: 'rank-2', changes: { title: 'Updated Two' } },
      ];

      const result = rankReducer(state, updateRanks(updates));

      expect(result.entities['rank-1']?.title).toBe('Updated One');
      expect(result.entities['rank-2']?.title).toBe('Updated Two');
    });

  });

  describe('deleteRank', () => {

    it('should remove a rank', () => {
      const state = {
        ids: ['rank-1', 'rank-2'],
        entities: {
          'rank-1': mockRank1,
          'rank-2': mockRank2,
        },
        loading: false,
        error: null,
      };

      const result = rankReducer(state, deleteRank('rank-1'));

      expect(result.ids).toEqual(['rank-2']);
      expect(result.entities['rank-1']).toBeUndefined();
    });

  });

  describe('deleteRanks', () => {

    it('should remove multiple ranks', () => {
      const state = {
        ids: ['rank-1', 'rank-2', 'rank-3'],
        entities: {
          'rank-1': mockRank1,
          'rank-2': mockRank2,
          'rank-3': mockRank3,
        },
        loading: false,
        error: null,
      };

      const result = rankReducer(state, deleteRanks(['rank-1', 'rank-3']));

      expect(result.ids).toEqual(['rank-2']);
    });

  });

  describe('setLoading', () => {

    it('should set loading to true', () => {
      const result = rankReducer(initialState, setLoading(true));

      expect(result.loading).toBe(true);
    });

    it('should set loading to false', () => {
      const state = { ...initialState, loading: true };

      const result = rankReducer(state, setLoading(false));

      expect(result.loading).toBe(false);
    });

  });

  describe('setError', () => {

    it('should set error message', () => {
      const errorMessage = 'Failed to fetch ranks';

      const result = rankReducer(initialState, setError(errorMessage));

      expect(result.error).toBe(errorMessage);
    });

    it('should clear error when null is provided', () => {
      const state = { ...initialState, error: 'Previous error' };

      const result = rankReducer(state, setError(null));

      expect(result.error).toBeNull();
    });

  });

  describe('fetchAllRanks extraReducers', () => {

    it('should set loading true on pending', () => {
      const action = { type: fetchAllRanks.pending.type };

      const result = rankReducer(initialState, action);

      expect(result.loading).toBe(true);
      expect(result.error).toBeNull();
    });

    it('should set all ranks on fulfilled', () => {
      const action = {
        type: fetchAllRanks.fulfilled.type,
        payload: [mockRank1, mockRank2],
      };

      const result = rankReducer(initialState, action);

      expect(result.loading).toBe(false);
      expect(result.ids).toEqual(['rank-1', 'rank-2']);
    });

    it('should set error on rejected', () => {
      const action = {
        type: fetchAllRanks.rejected.type,
        error: { message: 'Network error' },
      };

      const result = rankReducer(initialState, action);

      expect(result.loading).toBe(false);
      expect(result.error).toBe('Network error');
    });

  });

  describe('fetchRankById extraReducers', () => {

    it('should set loading true on pending', () => {
      const action = { type: fetchRankById.pending.type };

      const result = rankReducer(initialState, action);

      expect(result.loading).toBe(true);
    });

    it('should upsert rank on fulfilled', () => {
      const action = {
        type: fetchRankById.fulfilled.type,
        payload: mockRank1,
      };

      const result = rankReducer(initialState, action);

      expect(result.loading).toBe(false);
      expect(result.entities['rank-1']).toEqual(mockRank1);
    });

    it('should not add rank when payload is null', () => {
      const action = {
        type: fetchRankById.fulfilled.type,
        payload: null,
      };

      const result = rankReducer(initialState, action);

      expect(result.loading).toBe(false);
      expect(result.ids).toEqual([]);
    });

  });

  describe('fetchRanksByIds extraReducers', () => {

    it('should upsert multiple ranks on fulfilled', () => {
      const action = {
        type: fetchRanksByIds.fulfilled.type,
        payload: [mockRank1, mockRank2],
      };

      const result = rankReducer(initialState, action);

      expect(result.loading).toBe(false);
      expect(result.ids).toEqual(['rank-1', 'rank-2']);
    });

  });

  describe('fetchRanksOfUser extraReducers', () => {

    it('should set all ranks on fulfilled', () => {
      const action = {
        type: fetchRanksOfUser.fulfilled.type,
        payload: [mockRank1, mockRank2],
      };

      const result = rankReducer(initialState, action);

      expect(result.loading).toBe(false);
      expect(result.ids).toEqual(['rank-1', 'rank-2']);
    });

  });

  describe('createRankThunk extraReducers', () => {

    it('should add new rank on fulfilled', () => {
      const action = {
        type: createRankThunk.fulfilled.type,
        payload: mockRank1,
      };

      const result = rankReducer(initialState, action);

      expect(result.loading).toBe(false);
      expect(result.entities['rank-1']).toEqual(mockRank1);
    });

  });

  describe('updateRankThunk extraReducers', () => {

    it('should upsert updated rank on fulfilled', () => {
      const state = {
        ids: ['rank-1'],
        entities: { 'rank-1': mockRank1 },
        loading: false,
        error: null,
      };

      const updatedRank = { ...mockRank1, title: 'Updated Title' };
      const action = {
        type: updateRankThunk.fulfilled.type,
        payload: updatedRank,
      };

      const result = rankReducer(state, action);

      expect(result.loading).toBe(false);
      expect(result.entities['rank-1']?.title).toBe('Updated Title');
    });

  });

  describe('deleteRankThunk extraReducers', () => {

    it('should remove rank on fulfilled', () => {
      const state = {
        ids: ['rank-1', 'rank-2'],
        entities: {
          'rank-1': mockRank1,
          'rank-2': mockRank2,
        },
        loading: false,
        error: null,
      };

      const action = {
        type: deleteRankThunk.fulfilled.type,
        payload: 'rank-1',
      };

      const result = rankReducer(state, action);

      expect(result.loading).toBe(false);
      expect(result.ids).toEqual(['rank-2']);
    });

  });

});
