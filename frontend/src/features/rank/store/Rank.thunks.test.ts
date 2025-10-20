// Mock Firebase/Stores to prevent initialization
jest.mock('../../../services/store/Stores', () => ({
  RANK_STORE: {},
}));

// Mock the API
const mockGetAllRanks = jest.fn();
const mockGetRank = jest.fn();
const mockGetRanksByIds = jest.fn();
const mockGetRanksOfUser = jest.fn();
const mockCreateRank = jest.fn();
const mockUpdateRank = jest.fn();
const mockDeleteRank = jest.fn();

jest.mock('../api/Rank.api', () => ({
  getAllRanks: (...args: any[]) => mockGetAllRanks(...args),
  getRank: (...args: any[]) => mockGetRank(...args),
  getRanksByIds: (...args: any[]) => mockGetRanksByIds(...args),
  getRanksOfUser: (...args: any[]) => mockGetRanksOfUser(...args),
  createRank: (...args: any[]) => mockCreateRank(...args),
  updateRank: (...args: any[]) => mockUpdateRank(...args),
  deleteRank: (...args: any[]) => mockDeleteRank(...args),
}));

import { fetchAllRanks, fetchRankById, fetchRanksByIds, fetchRanksOfUser, createRankThunk, updateRankThunk, deleteRankThunk } from './Rank.thunks';
import { Rank } from '../model/Rank.types';

describe('Rank Thunks', () => {

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

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('fetchAllRanks', () => {

    it('should fetch all ranks successfully', async () => {
      const ranks = [mockRank1, mockRank2];
      mockGetAllRanks.mockResolvedValue(ranks);

      const dispatch = jest.fn();
      const getState = jest.fn();

      const thunk = fetchAllRanks();
      const result = await thunk(dispatch, getState, undefined);

      expect(mockGetAllRanks).toHaveBeenCalledTimes(1);
      expect(result.payload).toEqual(ranks);
    });

    it('should handle errors', async () => {
      const errorMessage = 'Network error';
      mockGetAllRanks.mockRejectedValue(new Error(errorMessage));

      const dispatch = jest.fn();
      const getState = jest.fn();

      const thunk = fetchAllRanks();
      const result = await thunk(dispatch, getState, undefined);

      expect(mockGetAllRanks).toHaveBeenCalledTimes(1);
      expect(result.type).toBe('rank/fetchAll/rejected');
      expect(result.error.message).toBe(errorMessage);
    });

  });

  describe('fetchRankById', () => {

    it('should fetch rank by id successfully', async () => {
      const rankId = 'rank-1';
      mockGetRank.mockResolvedValue(mockRank1);

      const dispatch = jest.fn();
      const getState = jest.fn();

      const thunk = fetchRankById(rankId);
      const result = await thunk(dispatch, getState, undefined);

      expect(mockGetRank).toHaveBeenCalledWith(rankId);
      expect(result.payload).toEqual(mockRank1);
    });

    it('should handle errors', async () => {
      const rankId = 'rank-1';
      const errorMessage = 'Rank not found';
      mockGetRank.mockRejectedValue(new Error(errorMessage));

      const dispatch = jest.fn();
      const getState = jest.fn();

      const thunk = fetchRankById(rankId);
      const result = await thunk(dispatch, getState, undefined);

      expect(mockGetRank).toHaveBeenCalledWith(rankId);
      expect(result.type).toBe('rank/fetchById/rejected');
      expect(result.error.message).toBe(errorMessage);
    });

  });

  describe('fetchRanksByIds', () => {

    it('should fetch multiple ranks by ids successfully', async () => {
      const rankIds = ['rank-1', 'rank-2'];
      const ranks = [mockRank1, mockRank2];
      mockGetRanksByIds.mockResolvedValue(ranks);

      const dispatch = jest.fn();
      const getState = jest.fn();

      const thunk = fetchRanksByIds(rankIds);
      const result = await thunk(dispatch, getState, undefined);

      expect(mockGetRanksByIds).toHaveBeenCalledWith(rankIds);
      expect(result.payload).toEqual(ranks);
    });

    it('should handle errors', async () => {
      const rankIds = ['rank-1', 'rank-2'];
      const errorMessage = 'Failed to fetch ranks';
      mockGetRanksByIds.mockRejectedValue(new Error(errorMessage));

      const dispatch = jest.fn();
      const getState = jest.fn();

      const thunk = fetchRanksByIds(rankIds);
      const result = await thunk(dispatch, getState, undefined);

      expect(mockGetRanksByIds).toHaveBeenCalledWith(rankIds);
      expect(result.type).toBe('rank/fetchByIds/rejected');
      expect(result.error.message).toBe(errorMessage);
    });

  });

  describe('fetchRanksOfUser', () => {

    it('should fetch ranks of user successfully', async () => {
      const ownerId = 'user-1';
      const ranks = [mockRank1, mockRank2];
      mockGetRanksOfUser.mockResolvedValue(ranks);

      const dispatch = jest.fn();
      const getState = jest.fn();

      const thunk = fetchRanksOfUser(ownerId);
      const result = await thunk(dispatch, getState, undefined);

      expect(mockGetRanksOfUser).toHaveBeenCalledWith(ownerId);
      expect(result.payload).toEqual(ranks);
    });

    it('should handle errors', async () => {
      const ownerId = 'user-1';
      const errorMessage = 'Failed to fetch user ranks';
      mockGetRanksOfUser.mockRejectedValue(new Error(errorMessage));

      const dispatch = jest.fn();
      const getState = jest.fn();

      const thunk = fetchRanksOfUser(ownerId);
      const result = await thunk(dispatch, getState, undefined);

      expect(mockGetRanksOfUser).toHaveBeenCalledWith(ownerId);
      expect(result.type).toBe('rank/fetchOfUser/rejected');
      expect(result.error.message).toBe(errorMessage);
    });

  });

  describe('createRankThunk', () => {

    it('should create rank successfully', async () => {
      const newRank: Rank = {
        creationDate: new Date('2024-01-01'),
        lastUpdateDate: new Date('2024-01-02'),
        ownerId: 'user-1',
        title: 'New Rank',
        description: 'New Description',
        imageUrl: null,
        color: null,
      };
      const createdId = 'rank-123';
      mockCreateRank.mockResolvedValue(createdId);

      const dispatch = jest.fn();
      const getState = jest.fn();

      const thunk = createRankThunk(newRank);
      const result = await thunk(dispatch, getState, undefined);

      expect(mockCreateRank).toHaveBeenCalledWith(newRank);
      expect(result.payload).toEqual({ ...newRank, id: createdId });
    });

    it('should handle errors', async () => {
      const newRank: Rank = {
        creationDate: new Date('2024-01-01'),
        lastUpdateDate: new Date('2024-01-02'),
        ownerId: 'user-1',
        title: 'New Rank',
        description: 'New Description',
        imageUrl: null,
        color: null,
      };
      const errorMessage = 'Failed to create rank';
      mockCreateRank.mockRejectedValue(new Error(errorMessage));

      const dispatch = jest.fn();
      const getState = jest.fn();

      const thunk = createRankThunk(newRank);
      const result = await thunk(dispatch, getState, undefined);

      expect(mockCreateRank).toHaveBeenCalledWith(newRank);
      expect(result.type).toBe('rank/create/rejected');
      expect(result.error.message).toBe(errorMessage);
    });

  });

  describe('updateRankThunk', () => {

    it('should update rank successfully', async () => {
      const updatedRank: Rank = {
        id: 'rank-1',
        creationDate: new Date('2024-01-01'),
        lastUpdateDate: new Date('2024-01-02'),
        ownerId: 'user-1',
        title: 'Updated Title',
        description: 'Updated Description',
        imageUrl: null,
        color: null,
      };
      mockUpdateRank.mockResolvedValue(undefined);

      const dispatch = jest.fn();
      const getState = jest.fn();

      const thunk = updateRankThunk(updatedRank);
      const result = await thunk(dispatch, getState, undefined);

      expect(mockUpdateRank).toHaveBeenCalledWith(updatedRank);
      expect(result.payload).toEqual(updatedRank);
    });

    it('should handle errors', async () => {
      const updatedRank: Rank = {
        id: 'rank-1',
        creationDate: new Date('2024-01-01'),
        lastUpdateDate: new Date('2024-01-02'),
        ownerId: 'user-1',
        title: 'Updated Title',
        description: 'Updated Description',
        imageUrl: null,
        color: null,
      };
      const errorMessage = 'Failed to update rank';
      mockUpdateRank.mockRejectedValue(new Error(errorMessage));

      const dispatch = jest.fn();
      const getState = jest.fn();

      const thunk = updateRankThunk(updatedRank);
      const result = await thunk(dispatch, getState, undefined);

      expect(mockUpdateRank).toHaveBeenCalledWith(updatedRank);
      expect(result.type).toBe('rank/update/rejected');
      expect(result.error.message).toBe(errorMessage);
    });

  });

  describe('deleteRankThunk', () => {

    it('should delete rank successfully', async () => {
      const rankId = 'rank-1';
      mockDeleteRank.mockResolvedValue(undefined);

      const dispatch = jest.fn();
      const getState = jest.fn();

      const thunk = deleteRankThunk(rankId);
      const result = await thunk(dispatch, getState, undefined);

      expect(mockDeleteRank).toHaveBeenCalledWith(rankId);
      expect(result.payload).toBe(rankId);
    });

    it('should handle errors', async () => {
      const rankId = 'rank-1';
      const errorMessage = 'Failed to delete rank';
      mockDeleteRank.mockRejectedValue(new Error(errorMessage));

      const dispatch = jest.fn();
      const getState = jest.fn();

      const thunk = deleteRankThunk(rankId);
      const result = await thunk(dispatch, getState, undefined);

      expect(mockDeleteRank).toHaveBeenCalledWith(rankId);
      expect(result.type).toBe('rank/delete/rejected');
      expect(result.error.message).toBe(errorMessage);
    });

  });

});
