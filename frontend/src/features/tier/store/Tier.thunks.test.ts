// Mock Firebase/Stores to prevent initialization
jest.mock('../../../services/store/Stores', () => ({
  TIER_STORE: {},
}));

// Mock the API
const mockGetAllTiers = jest.fn();
const mockGetTier = jest.fn();
const mockGetTiersByIds = jest.fn();
const mockGetTiersOfUser = jest.fn();
const mockCreateTier = jest.fn();
const mockUpdateTier = jest.fn();
const mockDeleteTier = jest.fn();

jest.mock('../api/Tier.api', () => ({
  getAllTiers: (...args: any[]) => mockGetAllTiers(...args),
  getTier: (...args: any[]) => mockGetTier(...args),
  getTiersByIds: (...args: any[]) => mockGetTiersByIds(...args),
  getTiersOfUser: (...args: any[]) => mockGetTiersOfUser(...args),
  createTier: (...args: any[]) => mockCreateTier(...args),
  updateTier: (...args: any[]) => mockUpdateTier(...args),
  deleteTier: (...args: any[]) => mockDeleteTier(...args),
}));

import { fetchAllTiers, fetchTierById, fetchTiersByIds, fetchTiersOfUser, createTierThunk, updateTierThunk, deleteTierThunk } from './Tier.thunks';
import { Tier } from '../model/Tier.types';

describe('Tier Thunks', () => {

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

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('fetchAllTiers', () => {

    it('should fetch all tiers successfully', async () => {
      const tiers = [mockTier1, mockTier2];
      mockGetAllTiers.mockResolvedValue(tiers);

      const dispatch = jest.fn();
      const getState = jest.fn();

      const thunk = fetchAllTiers();
      const result = await thunk(dispatch, getState, undefined);

      expect(mockGetAllTiers).toHaveBeenCalledTimes(1);
      expect(result.payload).toEqual(tiers);
    });

    it('should handle errors', async () => {
      const errorMessage = 'Network error';
      mockGetAllTiers.mockRejectedValue(new Error(errorMessage));

      const dispatch = jest.fn();
      const getState = jest.fn();

      const thunk = fetchAllTiers();
      const result = await thunk(dispatch, getState, undefined);

      expect(mockGetAllTiers).toHaveBeenCalledTimes(1);
      expect(result.type).toBe('tier/fetchAll/rejected');
      expect('error' in result && result.error.message).toBe(errorMessage);
    });

  });

  describe('fetchTierById', () => {

    it('should fetch tier by id successfully', async () => {
      const tierId = 'tier-1';
      mockGetTier.mockResolvedValue(mockTier1);

      const dispatch = jest.fn();
      const getState = jest.fn();

      const thunk = fetchTierById(tierId);
      const result = await thunk(dispatch, getState, undefined);

      expect(mockGetTier).toHaveBeenCalledWith(tierId);
      expect(result.payload).toEqual(mockTier1);
    });

    it('should handle errors', async () => {
      const tierId = 'tier-1';
      const errorMessage = 'Tier not found';
      mockGetTier.mockRejectedValue(new Error(errorMessage));

      const dispatch = jest.fn();
      const getState = jest.fn();

      const thunk = fetchTierById(tierId);
      const result = await thunk(dispatch, getState, undefined);

      expect(mockGetTier).toHaveBeenCalledWith(tierId);
      expect(result.type).toBe('tier/fetchById/rejected');
      expect('error' in result && result.error.message).toBe(errorMessage);
    });

  });

  describe('fetchTiersByIds', () => {

    it('should fetch multiple tiers by ids successfully', async () => {
      const tierIds = ['tier-1', 'tier-2'];
      const tiers = [mockTier1, mockTier2];
      mockGetTiersByIds.mockResolvedValue(tiers);

      const dispatch = jest.fn();
      const getState = jest.fn();

      const thunk = fetchTiersByIds(tierIds);
      const result = await thunk(dispatch, getState, undefined);

      expect(mockGetTiersByIds).toHaveBeenCalledWith(tierIds);
      expect(result.payload).toEqual(tiers);
    });

    it('should handle errors', async () => {
      const tierIds = ['tier-1', 'tier-2'];
      const errorMessage = 'Failed to fetch tiers';
      mockGetTiersByIds.mockRejectedValue(new Error(errorMessage));

      const dispatch = jest.fn();
      const getState = jest.fn();

      const thunk = fetchTiersByIds(tierIds);
      const result = await thunk(dispatch, getState, undefined);

      expect(mockGetTiersByIds).toHaveBeenCalledWith(tierIds);
      expect(result.type).toBe('tier/fetchByIds/rejected');
      expect('error' in result && result.error.message).toBe(errorMessage);
    });

  });

  describe('fetchTiersOfUser', () => {

    it('should fetch tiers of user successfully', async () => {
      const ownerId = 'user-1';
      const tiers = [mockTier1, mockTier2];
      mockGetTiersOfUser.mockResolvedValue(tiers);

      const dispatch = jest.fn();
      const getState = jest.fn();

      const thunk = fetchTiersOfUser(ownerId);
      const result = await thunk(dispatch, getState, undefined);

      expect(mockGetTiersOfUser).toHaveBeenCalledWith(ownerId);
      expect(result.payload).toEqual(tiers);
    });

    it('should handle errors', async () => {
      const ownerId = 'user-1';
      const errorMessage = 'Failed to fetch user tiers';
      mockGetTiersOfUser.mockRejectedValue(new Error(errorMessage));

      const dispatch = jest.fn();
      const getState = jest.fn();

      const thunk = fetchTiersOfUser(ownerId);
      const result = await thunk(dispatch, getState, undefined);

      expect(mockGetTiersOfUser).toHaveBeenCalledWith(ownerId);
      expect(result.type).toBe('tier/fetchOfUser/rejected');
      expect('error' in result && result.error.message).toBe(errorMessage);
    });

  });

  describe('createTierThunk', () => {

    it('should create tier successfully', async () => {
      const newTier: Tier = {
        id: '',
        creationDate: new Date('2024-01-01'),
        lastUpdateDate: new Date('2024-01-02'),
        ownerId: 'user-1',
        rankId: 'rank-1',
        order: 3,
        title: 'New Tier',
        description: 'New Description',
        imageUrl: null,
        color: null,
      };
      const createdId = 'tier-123';
      mockCreateTier.mockResolvedValue(createdId);

      const dispatch = jest.fn();
      const getState = jest.fn();

      const thunk = createTierThunk(newTier);
      const result = await thunk(dispatch, getState, undefined);

      expect(mockCreateTier).toHaveBeenCalledWith(newTier);
      expect(result.payload).toEqual({ ...newTier, id: createdId });
    });

    it('should handle errors', async () => {
      const newTier: Tier = {
        id: '',
        creationDate: new Date('2024-01-01'),
        lastUpdateDate: new Date('2024-01-02'),
        ownerId: 'user-1',
        rankId: 'rank-1',
        order: 3,
        title: 'New Tier',
        description: 'New Description',
        imageUrl: null,
        color: null,
      };
      const errorMessage = 'Failed to create tier';
      mockCreateTier.mockRejectedValue(new Error(errorMessage));

      const dispatch = jest.fn();
      const getState = jest.fn();

      const thunk = createTierThunk(newTier);
      const result = await thunk(dispatch, getState, undefined);

      expect(mockCreateTier).toHaveBeenCalledWith(newTier);
      expect(result.type).toBe('tier/create/rejected');
      expect('error' in result && result.error.message).toBe(errorMessage);
    });

  });

  describe('updateTierThunk', () => {

    it('should update tier successfully', async () => {
      const updatedTier: Tier = {
        id: 'tier-1',
        creationDate: new Date('2024-01-01'),
        lastUpdateDate: new Date('2024-01-02'),
        ownerId: 'user-1',
        rankId: 'rank-1',
        order: 1,
        title: 'Updated Title',
        description: 'Updated Description',
        imageUrl: null,
        color: null,
      };
      mockUpdateTier.mockResolvedValue(undefined);

      const dispatch = jest.fn();
      const getState = jest.fn();

      const thunk = updateTierThunk(updatedTier);
      const result = await thunk(dispatch, getState, undefined);

      expect(mockUpdateTier).toHaveBeenCalledWith(updatedTier);
      expect(result.payload).toEqual(updatedTier);
    });

    it('should handle errors', async () => {
      const updatedTier: Tier = {
        id: 'tier-1',
        creationDate: new Date('2024-01-01'),
        lastUpdateDate: new Date('2024-01-02'),
        ownerId: 'user-1',
        rankId: 'rank-1',
        order: 1,
        title: 'Updated Title',
        description: 'Updated Description',
        imageUrl: null,
        color: null,
      };
      const errorMessage = 'Failed to update tier';
      mockUpdateTier.mockRejectedValue(new Error(errorMessage));

      const dispatch = jest.fn();
      const getState = jest.fn();

      const thunk = updateTierThunk(updatedTier);
      const result = await thunk(dispatch, getState, undefined);

      expect(mockUpdateTier).toHaveBeenCalledWith(updatedTier);
      expect(result.type).toBe('tier/update/rejected');
      expect('error' in result && result.error.message).toBe(errorMessage);
    });

  });

  describe('deleteTierThunk', () => {

    it('should delete tier successfully', async () => {
      const tierId = 'tier-1';
      mockDeleteTier.mockResolvedValue(undefined);

      const dispatch = jest.fn();
      const getState = jest.fn();

      const thunk = deleteTierThunk(tierId);
      const result = await thunk(dispatch, getState, undefined);

      expect(mockDeleteTier).toHaveBeenCalledWith(tierId);
      expect(result.payload).toBe(tierId);
    });

    it('should handle errors', async () => {
      const tierId = 'tier-1';
      const errorMessage = 'Failed to delete tier';
      mockDeleteTier.mockRejectedValue(new Error(errorMessage));

      const dispatch = jest.fn();
      const getState = jest.fn();

      const thunk = deleteTierThunk(tierId);
      const result = await thunk(dispatch, getState, undefined);

      expect(mockDeleteTier).toHaveBeenCalledWith(tierId);
      expect(result.type).toBe('tier/delete/rejected');
      expect('error' in result && result.error.message).toBe(errorMessage);
    });

  });

});
