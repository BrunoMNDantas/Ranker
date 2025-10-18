// Mock Firebase/Stores to prevent initialization
jest.mock('../../../services/store/Stores', () => ({
  RANK_STORE: {},
  OPTION_STORE: {},
  TIER_STORE: {},
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

jest.mock('../../user/store/User.thunks', () => ({
  fetchUserById: (...args: any[]) => mockFetchUserById(...args),
}));

import { renderHook } from '@testing-library/react';
import { getVotingPageData, useVotingPageData } from './UseVotingPage.hook';
import { RootState } from '../../../app/store';

describe('getVotingPageData', () => {

  const createMockState = (
    rankOverrides?: Partial<RootState['rank']>,
    optionOverrides?: Partial<RootState['option']>,
    tierOverrides?: Partial<RootState['tier']>,
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
      option: {
        ids: [],
        entities: {},
        loading: false,
        error: null,
        ...optionOverrides,
      },
      tier: {
        ids: [],
        entities: {},
        loading: false,
        error: null,
        ...tierOverrides,
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
      const state = createMockState({ loading: true });

      const result = getVotingPageData(state);

      expect(result.fetching).toBe(true);
    });

    it('should return fetching true when options are loading', () => {
      const state = createMockState(undefined, { loading: true });

      const result = getVotingPageData(state);

      expect(result.fetching).toBe(true);
    });

    it('should return fetching true when tiers are loading', () => {
      const state = createMockState(undefined, undefined, { loading: true });

      const result = getVotingPageData(state);

      expect(result.fetching).toBe(true);
    });

    it('should return fetching true when users are loading', () => {
      const state = createMockState(undefined, undefined, undefined, { loading: true });

      const result = getVotingPageData(state);

      expect(result.fetching).toBe(true);
    });

    it('should return fetching false when nothing is loading', () => {
      const state = createMockState();

      const result = getVotingPageData(state);

      expect(result.fetching).toBe(false);
    });

  });

  describe('error state', () => {

    it('should return rank error when present', () => {
      const errorMessage = 'Failed to fetch rank';
      const state = createMockState({ error: errorMessage });

      const result = getVotingPageData(state);

      expect(result.error).toBe(errorMessage);
    });

    it('should return option error when present', () => {
      const errorMessage = 'Failed to fetch options';
      const state = createMockState(undefined, { error: errorMessage });

      const result = getVotingPageData(state);

      expect(result.error).toBe(errorMessage);
    });

    it('should return tier error when present', () => {
      const errorMessage = 'Failed to fetch tiers';
      const state = createMockState(undefined, undefined, { error: errorMessage });

      const result = getVotingPageData(state);

      expect(result.error).toBe(errorMessage);
    });

    it('should return user error when present', () => {
      const errorMessage = 'Failed to fetch user';
      const state = createMockState(undefined, undefined, undefined, { error: errorMessage });

      const result = getVotingPageData(state);

      expect(result.error).toBe(errorMessage);
    });

    it('should return null when no error', () => {
      const state = createMockState();

      const result = getVotingPageData(state);

      expect(result.error).toBeNull();
    });

  });

  describe('return value structure', () => {

    it('should always return object with fetching and error keys', () => {
      const state = createMockState();

      const result = getVotingPageData(state);

      expect(result).toHaveProperty('fetching');
      expect(result).toHaveProperty('error');
      expect(Object.keys(result)).toHaveLength(2);
    });

  });

});

describe('useVotingPageData', () => {

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseAppSelector.mockReturnValue({ fetching: false, error: null });
  });

  describe('dispatching behavior', () => {

    it('should dispatch fetchRankById and related thunks on mount when rankId is provided', () => {
      const rankId = 'test-rank-123';

      // Mock useAppSelector to return null for rank
      mockUseAppSelector.mockReturnValue(null);

      renderHook(() => useVotingPageData(rankId));

      expect(mockFetchRankById).toHaveBeenCalledWith(rankId);
      expect(mockFetchOptionsOfRank).toHaveBeenCalledWith(rankId);
      expect(mockFetchTiersOfRank).toHaveBeenCalledWith(rankId);
      expect(mockDispatch).toHaveBeenCalledTimes(3);
    });

    it('should not dispatch when rankId is empty string', () => {
      // Mock useAppSelector to return null for rank
      mockUseAppSelector.mockReturnValue(null);

      renderHook(() => useVotingPageData(''));

      expect(mockFetchRankById).not.toHaveBeenCalled();
      expect(mockFetchOptionsOfRank).not.toHaveBeenCalled();
      expect(mockFetchTiersOfRank).not.toHaveBeenCalled();
      expect(mockDispatch).not.toHaveBeenCalled();
    });

    it('should dispatch again when rankId changes', () => {
      const firstId = 'rank-1';
      const secondId = 'rank-2';

      // Mock useAppSelector to return null for rank
      mockUseAppSelector.mockReturnValue(null);

      const { rerender } = renderHook(
        ({ id }) => useVotingPageData(id),
        {
          initialProps: { id: firstId },
        }
      );

      expect(mockFetchRankById).toHaveBeenCalledWith(firstId);
      expect(mockFetchOptionsOfRank).toHaveBeenCalledWith(firstId);
      expect(mockDispatch).toHaveBeenCalledTimes(3);

      rerender({ id: secondId });

      expect(mockFetchRankById).toHaveBeenCalledWith(secondId);
      expect(mockFetchOptionsOfRank).toHaveBeenCalledWith(secondId);
      expect(mockDispatch).toHaveBeenCalledTimes(6);
    });

    it('should not dispatch again when rankId remains the same', () => {
      const rankId = 'rank-1';

      // Mock useAppSelector to return null for rank
      mockUseAppSelector.mockReturnValue(null);

      const { rerender } = renderHook(() => useVotingPageData(rankId));

      expect(mockDispatch).toHaveBeenCalledTimes(3);

      rerender();

      expect(mockDispatch).toHaveBeenCalledTimes(3);
    });

    it('should dispatch when transitioning from empty to valid rankId', () => {
      // Mock useAppSelector to return null for rank
      mockUseAppSelector.mockReturnValue(null);

      const { rerender } = renderHook(
        ({ id }) => useVotingPageData(id),
        {
          initialProps: { id: '' },
        }
      );

      expect(mockDispatch).not.toHaveBeenCalled();

      rerender({ id: 'new-rank' });

      expect(mockFetchRankById).toHaveBeenCalledWith('new-rank');
      expect(mockFetchOptionsOfRank).toHaveBeenCalledWith('new-rank');
      expect(mockDispatch).toHaveBeenCalledTimes(3);
    });

    it('should dispatch fetchUserById when rank is loaded', () => {
      const rankId = 'rank-123';
      const ownerId = 'user-456';
      const mockRank = { id: rankId, ownerId };

      // First render without rank
      mockUseAppSelector.mockImplementation((selector) => {
        if (selector === getVotingPageData) {
          return { fetching: false, error: null };
        }
        return null;
      });

      const { rerender } = renderHook(() => useVotingPageData(rankId));

      expect(mockDispatch).toHaveBeenCalledTimes(3);
      expect(mockFetchUserById).not.toHaveBeenCalled();

      // Second render with rank loaded
      mockUseAppSelector.mockImplementation((selector) => {
        if (selector === getVotingPageData) {
          return { fetching: false, error: null };
        }
        return mockRank;
      });

      rerender();

      expect(mockFetchUserById).toHaveBeenCalledWith(ownerId);
      expect(mockDispatch).toHaveBeenCalledTimes(4);
    });

    it('should not dispatch fetchUserById again when rank ownerId remains the same', () => {
      const rankId = 'rank-123';
      const ownerId = 'user-456';
      const mockRank = { id: rankId, ownerId };

      mockUseAppSelector.mockImplementation((selector) => {
        if (selector === getVotingPageData) {
          return { fetching: false, error: null };
        }
        return mockRank;
      });

      const { rerender } = renderHook(() => useVotingPageData(rankId));

      expect(mockDispatch).toHaveBeenCalledTimes(4); // 3 initial + 1 for user

      rerender();

      expect(mockDispatch).toHaveBeenCalledTimes(4); // Should not increase
    });

  });

  describe('return value', () => {

    it('should return data from useAppSelector', () => {
      const mockData = { fetching: true, error: null };
      mockUseAppSelector.mockReturnValue(mockData);

      const { result } = renderHook(() => useVotingPageData('test-id'));

      expect(result.current).toEqual(mockData);
    });

    it('should call useAppSelector with getVotingPageData selector', () => {
      renderHook(() => useVotingPageData('test-id'));

      expect(mockUseAppSelector).toHaveBeenCalledWith(getVotingPageData);
    });

  });

});
