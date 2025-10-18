// Mock Firebase/Stores to prevent initialization
jest.mock('../../../services/store/Stores', () => ({
  RANK_STORE: {},
  USER_STORE: {},
}));

// Mock the hooks from react-redux
const mockDispatch = jest.fn();
const mockUseAppSelector = jest.fn();

jest.mock('../../../app/hooks', () => ({
  useAppDispatch: () => mockDispatch,
  useAppSelector: (selector: any) => mockUseAppSelector(selector),
}));

// Mock the thunks
const mockFetchAllRanks = jest.fn();
const mockFetchUserById = jest.fn();

jest.mock('../store/Rank.thunks', () => ({
  fetchAllRanks: (...args: any[]) => mockFetchAllRanks(...args),
}));

jest.mock('../../user/store/User.thunks', () => ({
  fetchUserById: (...args: any[]) => mockFetchUserById(...args),
}));

import { renderHook } from '@testing-library/react';
import { getRanksPageData, useRanksPageData } from './UseRanksPage.hook';
import { RootState } from '../../../app/store';

describe('getRanksPageData', () => {

  const createMockState = (
    rankOverrides?: Partial<RootState['rank']>,
    userOverrides?: Partial<RootState['user']>
  ): RootState => {
    return {
      rank: {
        ids: [],
        entities: {},
        loading: false,
        error: null,
        ...rankOverrides,
      },
      user: {
        ids: [],
        entities: {},
        loading: false,
        error: null,
        ...userOverrides,
      },
    } as RootState;
  };

  describe('loading state', () => {

    it('should return fetching true when ranks are loading', () => {
      const state = createMockState({ loading: true }, { loading: false });

      const result = getRanksPageData(state);

      expect(result.fetching).toBe(true);
    });

    it('should return fetching true when users are loading', () => {
      const state = createMockState({ loading: false }, { loading: true });

      const result = getRanksPageData(state);

      expect(result.fetching).toBe(true);
    });

    it('should return fetching false when nothing is loading', () => {
      const state = createMockState({ loading: false }, { loading: false });

      const result = getRanksPageData(state);

      expect(result.fetching).toBe(false);
    });

  });

  describe('error state', () => {

    it('should return rank error when present', () => {
      const errorMessage = 'Failed to fetch ranks';
      const state = createMockState({ error: errorMessage }, { error: null });

      const result = getRanksPageData(state);

      expect(result.error).toBe(errorMessage);
    });

    it('should return user error when present', () => {
      const errorMessage = 'Failed to fetch users';
      const state = createMockState({ error: null }, { error: errorMessage });

      const result = getRanksPageData(state);

      expect(result.error).toBe(errorMessage);
    });

    it('should return null when no error', () => {
      const state = createMockState({ error: null }, { error: null });

      const result = getRanksPageData(state);

      expect(result.error).toBeNull();
    });

  });

  describe('return value structure', () => {

    it('should always return object with fetching and error keys', () => {
      const state = createMockState();

      const result = getRanksPageData(state);

      expect(result).toHaveProperty('fetching');
      expect(result).toHaveProperty('error');
      expect(Object.keys(result)).toHaveLength(2);
    });

  });

});

describe('useRanksPageData', () => {

  beforeEach(() => {
    jest.clearAllMocks();
    // Default mock for selectAllRanks returns empty array, getRanksPageData returns default state
    mockUseAppSelector.mockReturnValue([]);
  });

  describe('dispatching behavior', () => {

    it('should dispatch fetchAllRanks on mount', () => {
      renderHook(() => useRanksPageData());

      expect(mockFetchAllRanks).toHaveBeenCalled();
      expect(mockDispatch).toHaveBeenCalledTimes(1);
    });

    it('should not dispatch again when component rerenders without dependency changes', () => {
      const { rerender } = renderHook(() => useRanksPageData());

      expect(mockDispatch).toHaveBeenCalledTimes(1);

      rerender();

      expect(mockDispatch).toHaveBeenCalledTimes(1);
    });

    it('should dispatch fetchUserById for each rank when ranks are loaded', () => {
      const mockRanks = [
        { id: 'rank-1', ownerId: 'user-1' },
        { id: 'rank-2', ownerId: 'user-2' },
        { id: 'rank-3', ownerId: 'user-3' },
      ];

      // First render without ranks
      mockUseAppSelector.mockImplementation((selector) => {
        if (selector === getRanksPageData) {
          return { fetching: false, error: null };
        }
        return [];
      });

      const { rerender } = renderHook(() => useRanksPageData());

      expect(mockDispatch).toHaveBeenCalledTimes(1);
      expect(mockFetchUserById).not.toHaveBeenCalled();

      // Second render with ranks loaded
      mockUseAppSelector.mockImplementation((selector) => {
        if (selector === getRanksPageData) {
          return { fetching: false, error: null };
        }
        return mockRanks;
      });

      rerender();

      expect(mockFetchUserById).toHaveBeenCalledWith('user-1');
      expect(mockFetchUserById).toHaveBeenCalledWith('user-2');
      expect(mockFetchUserById).toHaveBeenCalledWith('user-3');
      expect(mockDispatch).toHaveBeenCalledTimes(4); // 1 initial + 3 users
    });

    it('should not dispatch fetchUserById again when ranks remain the same', () => {
      const mockRanks = [
        { id: 'rank-1', ownerId: 'user-1' },
      ];

      mockUseAppSelector.mockImplementation((selector) => {
        if (selector === getRanksPageData) {
          return { fetching: false, error: null };
        }
        return mockRanks;
      });

      const { rerender } = renderHook(() => useRanksPageData());

      expect(mockDispatch).toHaveBeenCalledTimes(2); // 1 initial + 1 user

      rerender();

      expect(mockDispatch).toHaveBeenCalledTimes(2); // Should not increase
    });

  });

  describe('return value', () => {

    it('should return data from useAppSelector', () => {
      const mockData = { fetching: true, error: null };

      // Mock to return [] for selectAllRanks and mockData for getRanksPageData
      let callCount = 0;
      mockUseAppSelector.mockImplementation(() => {
        callCount++;
        if (callCount === 1) return []; // selectAllRanks
        return mockData; // getRanksPageData
      });

      const { result } = renderHook(() => useRanksPageData());

      expect(result.current).toEqual(mockData);
    });

    it('should call useAppSelector with getRanksPageData selector', () => {
      mockUseAppSelector.mockReturnValue([]);

      renderHook(() => useRanksPageData());

      expect(mockUseAppSelector).toHaveBeenCalledWith(getRanksPageData);
    });

  });

});
