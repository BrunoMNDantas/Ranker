// Mock Firebase/Stores to prevent initialization
jest.mock('../../../services/store/Stores', () => ({
  VOTE_STORE: {},
}));

// Mock the API
const mockGetAllVotes = jest.fn();
const mockGetVote = jest.fn();
const mockGetVotesByIds = jest.fn();
const mockGetVotesOfRank = jest.fn();
const mockGetVotesOfUser = jest.fn();
const mockCreateVote = jest.fn();
const mockUpdateVote = jest.fn();
const mockDeleteVote = jest.fn();

jest.mock('../api/Vote.api', () => ({
  getAllVotes: (...args: any[]) => mockGetAllVotes(...args),
  getVote: (...args: any[]) => mockGetVote(...args),
  getVotesByIds: (...args: any[]) => mockGetVotesByIds(...args),
  getVotesOfRank: (...args: any[]) => mockGetVotesOfRank(...args),
  getVotesOfUser: (...args: any[]) => mockGetVotesOfUser(...args),
  createVote: (...args: any[]) => mockCreateVote(...args),
  updateVote: (...args: any[]) => mockUpdateVote(...args),
  deleteVote: (...args: any[]) => mockDeleteVote(...args),
}));

import { fetchAllVotes, fetchVoteById, fetchVotesByIds, fetchVotesOfRank, fetchVotesOfUser, createVoteThunk, updateVoteThunk, deleteVoteThunk } from './Vote.thunks';
import { Vote } from '../model/Vote.types';

describe('Vote Thunks', () => {

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

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('fetchAllVotes', () => {

    it('should fetch all votes successfully', async () => {
      const votes = [mockVote1, mockVote2];
      mockGetAllVotes.mockResolvedValue(votes);

      const dispatch = jest.fn();
      const getState = jest.fn();

      const thunk = fetchAllVotes();
      const result = await thunk(dispatch, getState, undefined);

      expect(mockGetAllVotes).toHaveBeenCalledTimes(1);
      expect(result.payload).toEqual(votes);
    });

    it('should handle errors', async () => {
      const errorMessage = 'Network error';
      mockGetAllVotes.mockRejectedValue(new Error(errorMessage));

      const dispatch = jest.fn();
      const getState = jest.fn();

      const thunk = fetchAllVotes();
      const result = await thunk(dispatch, getState, undefined);

      expect(mockGetAllVotes).toHaveBeenCalledTimes(1);
      expect(result.type).toBe('vote/fetchAll/rejected');
      expect('error' in result && result.error.message).toBe(errorMessage);
    });

  });

  describe('fetchVoteById', () => {

    it('should fetch vote by id successfully', async () => {
      const voteId = 'vote-1';
      mockGetVote.mockResolvedValue(mockVote1);

      const dispatch = jest.fn();
      const getState = jest.fn();

      const thunk = fetchVoteById(voteId);
      const result = await thunk(dispatch, getState, undefined);

      expect(mockGetVote).toHaveBeenCalledWith(voteId);
      expect(result.payload).toEqual(mockVote1);
    });

    it('should handle errors', async () => {
      const voteId = 'vote-1';
      const errorMessage = 'Vote not found';
      mockGetVote.mockRejectedValue(new Error(errorMessage));

      const dispatch = jest.fn();
      const getState = jest.fn();

      const thunk = fetchVoteById(voteId);
      const result = await thunk(dispatch, getState, undefined);

      expect(mockGetVote).toHaveBeenCalledWith(voteId);
      expect(result.type).toBe('vote/fetchById/rejected');
      expect('error' in result && result.error.message).toBe(errorMessage);
    });

  });

  describe('fetchVotesByIds', () => {

    it('should fetch multiple votes by ids successfully', async () => {
      const voteIds = ['vote-1', 'vote-2'];
      const votes = [mockVote1, mockVote2];
      mockGetVotesByIds.mockResolvedValue(votes);

      const dispatch = jest.fn();
      const getState = jest.fn();

      const thunk = fetchVotesByIds(voteIds);
      const result = await thunk(dispatch, getState, undefined);

      expect(mockGetVotesByIds).toHaveBeenCalledWith(voteIds);
      expect(result.payload).toEqual(votes);
    });

    it('should handle errors', async () => {
      const voteIds = ['vote-1', 'vote-2'];
      const errorMessage = 'Failed to fetch votes';
      mockGetVotesByIds.mockRejectedValue(new Error(errorMessage));

      const dispatch = jest.fn();
      const getState = jest.fn();

      const thunk = fetchVotesByIds(voteIds);
      const result = await thunk(dispatch, getState, undefined);

      expect(mockGetVotesByIds).toHaveBeenCalledWith(voteIds);
      expect(result.type).toBe('vote/fetchByIds/rejected');
      expect('error' in result && result.error.message).toBe(errorMessage);
    });

  });

  describe('fetchVotesOfRank', () => {

    it('should fetch votes of rank successfully', async () => {
      const rankId = 'rank-1';
      const votes = [mockVote1, mockVote2];
      mockGetVotesOfRank.mockResolvedValue(votes);

      const dispatch = jest.fn();
      const getState = jest.fn();

      const thunk = fetchVotesOfRank(rankId);
      const result = await thunk(dispatch, getState, undefined);

      expect(mockGetVotesOfRank).toHaveBeenCalledWith(rankId);
      expect(result.payload).toEqual(votes);
    });

    it('should handle errors', async () => {
      const rankId = 'rank-1';
      const errorMessage = 'Failed to fetch rank votes';
      mockGetVotesOfRank.mockRejectedValue(new Error(errorMessage));

      const dispatch = jest.fn();
      const getState = jest.fn();

      const thunk = fetchVotesOfRank(rankId);
      const result = await thunk(dispatch, getState, undefined);

      expect(mockGetVotesOfRank).toHaveBeenCalledWith(rankId);
      expect(result.type).toBe('vote/fetchOfRank/rejected');
      expect('error' in result && result.error.message).toBe(errorMessage);
    });

  });

  describe('fetchVotesOfUser', () => {

    it('should fetch votes of user successfully', async () => {
      const ownerId = 'user-1';
      const votes = [mockVote1, mockVote2];
      mockGetVotesOfUser.mockResolvedValue(votes);

      const dispatch = jest.fn();
      const getState = jest.fn();

      const thunk = fetchVotesOfUser(ownerId);
      const result = await thunk(dispatch, getState, undefined);

      expect(mockGetVotesOfUser).toHaveBeenCalledWith(ownerId);
      expect(result.payload).toEqual(votes);
    });

    it('should handle errors', async () => {
      const ownerId = 'user-1';
      const errorMessage = 'Failed to fetch user votes';
      mockGetVotesOfUser.mockRejectedValue(new Error(errorMessage));

      const dispatch = jest.fn();
      const getState = jest.fn();

      const thunk = fetchVotesOfUser(ownerId);
      const result = await thunk(dispatch, getState, undefined);

      expect(mockGetVotesOfUser).toHaveBeenCalledWith(ownerId);
      expect(result.type).toBe('vote/fetchOfUser/rejected');
      expect('error' in result && result.error.message).toBe(errorMessage);
    });

  });

  describe('createVoteThunk', () => {

    it('should create vote successfully', async () => {
      const newVote: Vote = {
        id: '',
        creationDate: new Date('2024-01-01'),
        lastUpdateDate: new Date('2024-01-02'),
        ownerId: 'user-1',
        rankId: 'rank-1',
      };
      const createdId = 'vote-123';
      mockCreateVote.mockResolvedValue(createdId);

      const dispatch = jest.fn();
      const getState = jest.fn();

      const thunk = createVoteThunk(newVote);
      const result = await thunk(dispatch, getState, undefined);

      expect(mockCreateVote).toHaveBeenCalledWith(newVote);
      expect(result.payload).toEqual({ ...newVote, id: createdId });
    });

    it('should handle errors', async () => {
      const newVote: Vote = {
        id: '',
        creationDate: new Date('2024-01-01'),
        lastUpdateDate: new Date('2024-01-02'),
        ownerId: 'user-1',
        rankId: 'rank-1',
      };
      const errorMessage = 'Failed to create vote';
      mockCreateVote.mockRejectedValue(new Error(errorMessage));

      const dispatch = jest.fn();
      const getState = jest.fn();

      const thunk = createVoteThunk(newVote);
      const result = await thunk(dispatch, getState, undefined);

      expect(mockCreateVote).toHaveBeenCalledWith(newVote);
      expect(result.type).toBe('vote/create/rejected');
      expect('error' in result && result.error.message).toBe(errorMessage);
    });

  });

  describe('updateVoteThunk', () => {

    it('should update vote successfully', async () => {
      const updatedVote: Vote = {
        id: 'vote-1',
        creationDate: new Date('2024-01-01'),
        lastUpdateDate: new Date('2024-01-02'),
        ownerId: 'user-1',
        rankId: 'rank-updated',
      };
      mockUpdateVote.mockResolvedValue(undefined);

      const dispatch = jest.fn();
      const getState = jest.fn();

      const thunk = updateVoteThunk(updatedVote);
      const result = await thunk(dispatch, getState, undefined);

      expect(mockUpdateVote).toHaveBeenCalledWith(updatedVote);
      expect(result.payload).toEqual(updatedVote);
    });

    it('should handle errors', async () => {
      const updatedVote: Vote = {
        id: 'vote-1',
        creationDate: new Date('2024-01-01'),
        lastUpdateDate: new Date('2024-01-02'),
        ownerId: 'user-1',
        rankId: 'rank-updated',
      };
      const errorMessage = 'Failed to update vote';
      mockUpdateVote.mockRejectedValue(new Error(errorMessage));

      const dispatch = jest.fn();
      const getState = jest.fn();

      const thunk = updateVoteThunk(updatedVote);
      const result = await thunk(dispatch, getState, undefined);

      expect(mockUpdateVote).toHaveBeenCalledWith(updatedVote);
      expect(result.type).toBe('vote/update/rejected');
      expect('error' in result && result.error.message).toBe(errorMessage);
    });

  });

  describe('deleteVoteThunk', () => {

    it('should delete vote successfully', async () => {
      const voteId = 'vote-1';
      mockDeleteVote.mockResolvedValue(undefined);

      const dispatch = jest.fn();
      const getState = jest.fn();

      const thunk = deleteVoteThunk(voteId);
      const result = await thunk(dispatch, getState, undefined);

      expect(mockDeleteVote).toHaveBeenCalledWith(voteId);
      expect(result.payload).toBe(voteId);
    });

    it('should handle errors', async () => {
      const voteId = 'vote-1';
      const errorMessage = 'Failed to delete vote';
      mockDeleteVote.mockRejectedValue(new Error(errorMessage));

      const dispatch = jest.fn();
      const getState = jest.fn();

      const thunk = deleteVoteThunk(voteId);
      const result = await thunk(dispatch, getState, undefined);

      expect(mockDeleteVote).toHaveBeenCalledWith(voteId);
      expect(result.type).toBe('vote/delete/rejected');
      expect('error' in result && result.error.message).toBe(errorMessage);
    });

  });

});
