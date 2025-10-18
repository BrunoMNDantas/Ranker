// Mock Firebase/Stores to prevent initialization
jest.mock('../../../services/store/Stores', () => ({
  RANK_STORE: {},
  OPTION_STORE: {},
  TIER_STORE: {},
  VOTE_STORE: {},
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
const mockFetchRankById = jest.fn();
const mockFetchOptionsOfRank = jest.fn();
const mockFetchTiersOfRank = jest.fn();
const mockFetchVotesOfRank = jest.fn();
const mockFetchUserById = jest.fn();

jest.mock('../store/Rank.thunks', () => ({
  fetchRankById: (...args: any[]) => mockFetchRankById(...args),
}));

jest.mock('../../option/store/Option.thunks', () => ({
  fetchOptionsOfRank: (...args: any[]) => mockFetchOptionsOfRank(...args),
}));

jest.mock('../../tier/store/Tier.thunks', () => ({
  fetchTiersOfRank: (...args: any[]) => mockFetchTiersOfRank(...args),
}));

jest.mock('../../vote/store/Vote.thunks', () => ({
  fetchVotesOfRank: (...args: any[]) => mockFetchVotesOfRank(...args),
}));

jest.mock('../../user/store/User.thunks', () => ({
  fetchUserById: (...args: any[]) => mockFetchUserById(...args),
}));

import { renderHook } from '@testing-library/react';
import { getRankPageData, useRankPageData } from './UseRankPage.hook';
import { RootState } from '../../../app/store';

describe('getRankPageData', () => {

  const createMockState = (overrides?: Partial<RootState>): RootState => {
    return {
      rank: {
        ids: [],
        entities: {},
        loading: false,
        error: null,
      },
      option: {
        ids: [],
        entities: {},
        loading: false,
        error: null,
      },
      tier: {
        ids: [],
        entities: {},
        loading: false,
        error: null,
      },
      vote: {
        ids: [],
        entities: {},
        loading: false,
        error: null,
      },
      user: {
        ids: [],
        entities: {},
        loading: false,
        error: null,
      },
      ...overrides,
    } as RootState;
  };

  describe('loading state', () => {

    it('should return fetching true when ranks are loading', () => {
      const state = createMockState({
        rank: {
          ids: [],
          entities: {},
          loading: true,
          error: null,
        },
      });

      const result = getRankPageData(state);

      expect(result.fetching).toBe(true);
    });

    it('should return fetching true when options are loading', () => {
      const state = createMockState({
        option: {
          ids: [],
          entities: {},
          loading: true,
          error: null,
        },
      });

      const result = getRankPageData(state);

      expect(result.fetching).toBe(true);
    });

    it('should return fetching true when tiers are loading', () => {
      const state = createMockState({
        tier: {
          ids: [],
          entities: {},
          loading: true,
          error: null,
        },
      });

      const result = getRankPageData(state);

      expect(result.fetching).toBe(true);
    });

    it('should return fetching true when votes are loading', () => {
      const state = createMockState({
        vote: {
          ids: [],
          entities: {},
          loading: true,
          error: null,
        },
      });

      const result = getRankPageData(state);

      expect(result.fetching).toBe(true);
    });

    it('should return fetching true when users are loading', () => {
      const state = createMockState({
        user: {
          ids: [],
          entities: {},
          loading: true,
          error: null,
        },
      });

      const result = getRankPageData(state);

      expect(result.fetching).toBe(true);
    });

    it('should return fetching false when nothing is loading', () => {
      const state = createMockState();

      const result = getRankPageData(state);

      expect(result.fetching).toBe(false);
    });

  });

  describe('error state', () => {

    it('should return error from ranks', () => {
      const state = createMockState({
        rank: {
          ids: [],
          entities: {},
          loading: false,
          error: 'Rank error',
        },
      });

      const result = getRankPageData(state);

      expect(result.error).toBe('Rank error');
    });

    it('should return error from options', () => {
      const state = createMockState({
        option: {
          ids: [],
          entities: {},
          loading: false,
          error: 'Option error',
        },
      });

      const result = getRankPageData(state);

      expect(result.error).toBe('Option error');
    });

    it('should return error from tiers', () => {
      const state = createMockState({
        tier: {
          ids: [],
          entities: {},
          loading: false,
          error: 'Tier error',
        },
      });

      const result = getRankPageData(state);

      expect(result.error).toBe('Tier error');
    });

    it('should return error from votes', () => {
      const state = createMockState({
        vote: {
          ids: [],
          entities: {},
          loading: false,
          error: 'Vote error',
        },
      });

      const result = getRankPageData(state);

      expect(result.error).toBe('Vote error');
    });

    it('should return error from users', () => {
      const state = createMockState({
        user: {
          ids: [],
          entities: {},
          loading: false,
          error: 'User error',
        },
      });

      const result = getRankPageData(state);

      expect(result.error).toBe('User error');
    });

    it('should return null when no errors', () => {
      const state = createMockState();

      const result = getRankPageData(state);

      expect(result.error).toBeNull();
    });

  });

  describe('return value structure', () => {

    it('should always return object with fetching and error keys', () => {
      const state = createMockState();

      const result = getRankPageData(state);

      expect(result).toHaveProperty('fetching');
      expect(result).toHaveProperty('error');
      expect(Object.keys(result)).toHaveLength(2);
    });

  });

});

describe('useRankPageData', () => {

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseAppSelector.mockReturnValue({ fetching: false, error: null });
  });

  describe('dispatching behavior', () => {

    it('should dispatch fetchRankById and related thunks on mount when rankId is provided', () => {
      const rankId = 'test-rank-123';

      // Mock useAppSelector to return null for rank selector (first call)
      // and default data for page data selector (second call)
      let selectorCallCount = 0;
      mockUseAppSelector.mockImplementation(() => {
        selectorCallCount++;
        if (selectorCallCount === 1) return null; // selectRankById returns null
        return { fetching: false, error: null }; // getRankPageData
      });

      renderHook(() => useRankPageData(rankId));

      expect(mockFetchRankById).toHaveBeenCalledWith(rankId);
      expect(mockFetchOptionsOfRank).toHaveBeenCalledWith(rankId);
      expect(mockFetchTiersOfRank).toHaveBeenCalledWith(rankId);
      expect(mockFetchVotesOfRank).toHaveBeenCalledWith(rankId);
      expect(mockDispatch).toHaveBeenCalledTimes(4);
    });

    it('should not dispatch when rankId is empty string', () => {
      // Mock useAppSelector to return null for rank selector
      mockUseAppSelector.mockReturnValue(null);

      renderHook(() => useRankPageData(''));

      expect(mockFetchRankById).not.toHaveBeenCalled();
      expect(mockFetchOptionsOfRank).not.toHaveBeenCalled();
      expect(mockFetchTiersOfRank).not.toHaveBeenCalled();
      expect(mockFetchVotesOfRank).not.toHaveBeenCalled();
      expect(mockDispatch).not.toHaveBeenCalled();
    });

    it('should dispatch again when rankId changes', () => {
      const firstId = 'rank-1';
      const secondId = 'rank-2';

      // Mock useAppSelector to return null for rank
      mockUseAppSelector.mockReturnValue(null);

      const { rerender } = renderHook(
        ({ id }) => useRankPageData(id),
        {
          initialProps: { id: firstId },
        }
      );

      expect(mockFetchRankById).toHaveBeenCalledWith(firstId);
      expect(mockFetchOptionsOfRank).toHaveBeenCalledWith(firstId);
      expect(mockDispatch).toHaveBeenCalledTimes(4);

      rerender({ id: secondId });

      expect(mockFetchRankById).toHaveBeenCalledWith(secondId);
      expect(mockFetchOptionsOfRank).toHaveBeenCalledWith(secondId);
      expect(mockDispatch).toHaveBeenCalledTimes(8);
    });

    it('should not dispatch again when rankId remains the same', () => {
      const rankId = 'rank-1';

      // Mock useAppSelector to return null for rank
      mockUseAppSelector.mockReturnValue(null);

      const { rerender } = renderHook(() => useRankPageData(rankId));

      expect(mockDispatch).toHaveBeenCalledTimes(4);

      rerender();

      expect(mockDispatch).toHaveBeenCalledTimes(4);
    });

    it('should dispatch when transitioning from empty to valid rankId', () => {
      // Mock useAppSelector to return null for rank
      mockUseAppSelector.mockReturnValue(null);

      const { rerender } = renderHook(
        ({ id }) => useRankPageData(id),
        {
          initialProps: { id: '' },
        }
      );

      expect(mockDispatch).not.toHaveBeenCalled();

      rerender({ id: 'new-rank' });

      expect(mockFetchRankById).toHaveBeenCalledWith('new-rank');
      expect(mockFetchOptionsOfRank).toHaveBeenCalledWith('new-rank');
      expect(mockDispatch).toHaveBeenCalledTimes(4);
    });

    it('should dispatch fetchUserById when rank is loaded', () => {
      const rankId = 'rank-123';
      const ownerId = 'user-456';
      const mockRank = { id: rankId, ownerId };

      // First render without rank
      mockUseAppSelector.mockImplementation((selector) => {
        if (selector === getRankPageData) {
          return { fetching: false, error: null };
        }
        return null;
      });

      const { rerender } = renderHook(() => useRankPageData(rankId));

      expect(mockDispatch).toHaveBeenCalledTimes(4);
      expect(mockFetchUserById).not.toHaveBeenCalled();

      // Second render with rank loaded
      mockUseAppSelector.mockImplementation((selector) => {
        if (selector === getRankPageData) {
          return { fetching: false, error: null };
        }
        return mockRank;
      });

      rerender();

      expect(mockFetchUserById).toHaveBeenCalledWith(ownerId);
      expect(mockDispatch).toHaveBeenCalledTimes(5);
    });

    it('should not dispatch fetchUserById again when rank ownerId remains the same', () => {
      const rankId = 'rank-123';
      const ownerId = 'user-456';
      const mockRank = { id: rankId, ownerId };

      mockUseAppSelector.mockImplementation((selector) => {
        if (selector === getRankPageData) {
          return { fetching: false, error: null };
        }
        return mockRank;
      });

      const { rerender } = renderHook(() => useRankPageData(rankId));

      expect(mockDispatch).toHaveBeenCalledTimes(5); // 4 initial + 1 for user

      rerender();

      expect(mockDispatch).toHaveBeenCalledTimes(5); // Should not increase
    });

  });

  describe('return value', () => {

    it('should return data from useAppSelector', () => {
      const mockData = { fetching: true, error: null };
      mockUseAppSelector.mockReturnValue(mockData);

      const { result } = renderHook(() => useRankPageData('test-id'));

      expect(result.current).toEqual(mockData);
    });

    it('should call useAppSelector with getRankPageData selector', () => {
      renderHook(() => useRankPageData('test-id'));

      expect(mockUseAppSelector).toHaveBeenCalledWith(getRankPageData);
    });

  });

});
