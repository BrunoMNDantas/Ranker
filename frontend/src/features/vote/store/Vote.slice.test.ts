// Mock Firebase/Stores to prevent initialization
jest.mock('../../../services/store/Stores', () => ({
  VOTE_STORE: {},
}));

import voteReducer, {
  setVotes,
  addVote,
  addVotes,
  updateVote,
  updateVotes,
  deleteVote,
  deleteVotes,
  setLoading,
  setError,
} from './Vote.slice';
import { fetchAllVotes, fetchVoteById, fetchVotesByIds, fetchVotesOfRank, fetchVotesOfUser, createVoteThunk, updateVoteThunk, deleteVoteThunk } from './Vote.thunks';
import { Vote } from '../model/Vote.types';

describe('Vote Slice', () => {

  const mockVote1: Vote = {
    id: 'vote-1',
    creationDate: new Date('2024-01-01'),
    lastUpdateDate: new Date('2024-01-02'),
    ownerId: 'user-1',
    rankId: 'rank-1',
  };

  const mockVote2: Vote = {
    id: 'vote-2',
    creationDate: new Date('2024-01-03'),
    lastUpdateDate: new Date('2024-01-04'),
    ownerId: 'user-1',
    rankId: 'rank-1',
  };

  const mockVote3: Vote = {
    id: 'vote-3',
    creationDate: new Date('2024-01-05'),
    lastUpdateDate: new Date('2024-01-06'),
    ownerId: 'user-2',
    rankId: 'rank-2',
  };

  const initialState = {
    ids: [],
    entities: {},
    loading: false,
    error: null,
  };

  describe('reducer', () => {

    it('should return the initial state', () => {
      const result = voteReducer(undefined, { type: 'unknown' });

      expect(result).toEqual(initialState);
    });

  });

  describe('setVotes', () => {

    it('should replace all votes', () => {
      const state = {
        ids: ['vote-1'],
        entities: { 'vote-1': mockVote1 },
        loading: false,
        error: null,
      };

      const result = voteReducer(state, setVotes([mockVote2, mockVote3]));

      expect(result.ids).toEqual(['vote-2', 'vote-3']);
      expect(result.entities).toEqual({
        'vote-2': mockVote2,
        'vote-3': mockVote3,
      });
    });

  });

  describe('addVote', () => {

    it('should add a single vote', () => {
      const result = voteReducer(initialState, addVote(mockVote1));

      expect(result.ids).toEqual(['vote-1']);
      expect(result.entities['vote-1']).toEqual(mockVote1);
    });

  });

  describe('addVotes', () => {

    it('should add multiple votes', () => {
      const result = voteReducer(initialState, addVotes([mockVote1, mockVote2]));

      expect(result.ids).toEqual(['vote-1', 'vote-2']);
      expect(result.entities).toEqual({
        'vote-1': mockVote1,
        'vote-2': mockVote2,
      });
    });

  });

  describe('updateVote', () => {

    it('should update an existing vote', () => {
      const state = {
        ids: ['vote-1'],
        entities: { 'vote-1': mockVote1 },
        loading: false,
        error: null,
      };

      const updatedVote = { id: 'vote-1', changes: { rankId: 'rank-updated' } };

      const result = voteReducer(state, updateVote(updatedVote));

      expect(result.entities['vote-1']?.rankId).toBe('rank-updated');
      expect(result.entities['vote-1']?.ownerId).toBe(mockVote1.ownerId);
    });

  });

  describe('updateVotes', () => {

    it('should update multiple votes', () => {
      const state = {
        ids: ['vote-1', 'vote-2'],
        entities: {
          'vote-1': mockVote1,
          'vote-2': mockVote2,
        },
        loading: false,
        error: null,
      };

      const updates = [
        { id: 'vote-1', changes: { rankId: 'rank-updated-1' } },
        { id: 'vote-2', changes: { rankId: 'rank-updated-2' } },
      ];

      const result = voteReducer(state, updateVotes(updates));

      expect(result.entities['vote-1']?.rankId).toBe('rank-updated-1');
      expect(result.entities['vote-2']?.rankId).toBe('rank-updated-2');
    });

  });

  describe('deleteVote', () => {

    it('should remove a vote', () => {
      const state = {
        ids: ['vote-1', 'vote-2'],
        entities: {
          'vote-1': mockVote1,
          'vote-2': mockVote2,
        },
        loading: false,
        error: null,
      };

      const result = voteReducer(state, deleteVote('vote-1'));

      expect(result.ids).toEqual(['vote-2']);
      expect(result.entities['vote-1']).toBeUndefined();
    });

  });

  describe('deleteVotes', () => {

    it('should remove multiple votes', () => {
      const state = {
        ids: ['vote-1', 'vote-2', 'vote-3'],
        entities: {
          'vote-1': mockVote1,
          'vote-2': mockVote2,
          'vote-3': mockVote3,
        },
        loading: false,
        error: null,
      };

      const result = voteReducer(state, deleteVotes(['vote-1', 'vote-3']));

      expect(result.ids).toEqual(['vote-2']);
    });

  });

  describe('setLoading', () => {

    it('should set loading to true', () => {
      const result = voteReducer(initialState, setLoading(true));

      expect(result.loading).toBe(true);
    });

    it('should set loading to false', () => {
      const state = { ...initialState, loading: true };

      const result = voteReducer(state, setLoading(false));

      expect(result.loading).toBe(false);
    });

  });

  describe('setError', () => {

    it('should set error message', () => {
      const errorMessage = 'Failed to fetch votes';

      const result = voteReducer(initialState, setError(errorMessage));

      expect(result.error).toBe(errorMessage);
    });

    it('should clear error when null is provided', () => {
      const state = { ...initialState, error: 'Previous error' };

      const result = voteReducer(state, setError(null));

      expect(result.error).toBeNull();
    });

  });

  describe('fetchAllVotes extraReducers', () => {

    it('should set loading true on pending', () => {
      const action = { type: fetchAllVotes.pending.type };

      const result = voteReducer(initialState, action);

      expect(result.loading).toBe(true);
      expect(result.error).toBeNull();
    });

    it('should set all votes on fulfilled', () => {
      const action = {
        type: fetchAllVotes.fulfilled.type,
        payload: [mockVote1, mockVote2],
      };

      const result = voteReducer(initialState, action);

      expect(result.loading).toBe(false);
      expect(result.ids).toEqual(['vote-1', 'vote-2']);
    });

    it('should set error on rejected', () => {
      const action = {
        type: fetchAllVotes.rejected.type,
        error: { message: 'Network error' },
      };

      const result = voteReducer(initialState, action);

      expect(result.loading).toBe(false);
      expect(result.error).toBe('Network error');
    });

  });

  describe('fetchVoteById extraReducers', () => {

    it('should set loading true on pending', () => {
      const action = { type: fetchVoteById.pending.type };

      const result = voteReducer(initialState, action);

      expect(result.loading).toBe(true);
    });

    it('should upsert vote on fulfilled', () => {
      const action = {
        type: fetchVoteById.fulfilled.type,
        payload: mockVote1,
      };

      const result = voteReducer(initialState, action);

      expect(result.loading).toBe(false);
      expect(result.entities['vote-1']).toEqual(mockVote1);
    });

    it('should not add vote when payload is null', () => {
      const action = {
        type: fetchVoteById.fulfilled.type,
        payload: null,
      };

      const result = voteReducer(initialState, action);

      expect(result.loading).toBe(false);
      expect(result.ids).toEqual([]);
    });

  });

  describe('fetchVotesByIds extraReducers', () => {

    it('should upsert multiple votes on fulfilled', () => {
      const action = {
        type: fetchVotesByIds.fulfilled.type,
        payload: [mockVote1, mockVote2],
      };

      const result = voteReducer(initialState, action);

      expect(result.loading).toBe(false);
      expect(result.ids).toEqual(['vote-1', 'vote-2']);
    });

  });

  describe('fetchVotesOfRank extraReducers', () => {

    it('should set all votes on fulfilled', () => {
      const action = {
        type: fetchVotesOfRank.fulfilled.type,
        payload: [mockVote1, mockVote2],
      };

      const result = voteReducer(initialState, action);

      expect(result.loading).toBe(false);
      expect(result.ids).toEqual(['vote-1', 'vote-2']);
    });

  });

  describe('fetchVotesOfUser extraReducers', () => {

    it('should set all votes on fulfilled', () => {
      const action = {
        type: fetchVotesOfUser.fulfilled.type,
        payload: [mockVote1, mockVote2],
      };

      const result = voteReducer(initialState, action);

      expect(result.loading).toBe(false);
      expect(result.ids).toEqual(['vote-1', 'vote-2']);
    });

  });

  describe('createVoteThunk extraReducers', () => {

    it('should add new vote on fulfilled', () => {
      const action = {
        type: createVoteThunk.fulfilled.type,
        payload: mockVote1,
      };

      const result = voteReducer(initialState, action);

      expect(result.loading).toBe(false);
      expect(result.entities['vote-1']).toEqual(mockVote1);
    });

  });

  describe('updateVoteThunk extraReducers', () => {

    it('should upsert updated vote on fulfilled', () => {
      const state = {
        ids: ['vote-1'],
        entities: { 'vote-1': mockVote1 },
        loading: false,
        error: null,
      };

      const updatedVote = { ...mockVote1, rankId: 'rank-updated' };
      const action = {
        type: updateVoteThunk.fulfilled.type,
        payload: updatedVote,
      };

      const result = voteReducer(state, action);

      expect(result.loading).toBe(false);
      expect(result.entities['vote-1']?.rankId).toBe('rank-updated');
    });

  });

  describe('deleteVoteThunk extraReducers', () => {

    it('should remove vote on fulfilled', () => {
      const state = {
        ids: ['vote-1', 'vote-2'],
        entities: {
          'vote-1': mockVote1,
          'vote-2': mockVote2,
        },
        loading: false,
        error: null,
      };

      const action = {
        type: deleteVoteThunk.fulfilled.type,
        payload: 'vote-1',
      };

      const result = voteReducer(state, action);

      expect(result.loading).toBe(false);
      expect(result.ids).toEqual(['vote-2']);
    });

  });

});
