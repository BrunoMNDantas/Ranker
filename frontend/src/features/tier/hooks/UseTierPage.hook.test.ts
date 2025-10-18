// Mock Firebase/Stores to prevent initialization
jest.mock('../../../services/store/Stores', () => ({
  TIER_STORE: {},
  ASSIGNMENT_STORE: {},
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
const mockFetchTierById = jest.fn();
const mockFetchAssignmentsOfTier = jest.fn();
const mockFetchRankById = jest.fn();
const mockFetchUserById = jest.fn();

jest.mock('../store/Tier.thunks', () => ({
  fetchTierById: (...args: any[]) => mockFetchTierById(...args),
}));

jest.mock('../../assignment/store/Assignment.thunks', () => ({
  fetchAssignmentsOfTier: (...args: any[]) => mockFetchAssignmentsOfTier(...args),
}));

jest.mock('../../rank/store/Rank.thunks', () => ({
  fetchRankById: (...args: any[]) => mockFetchRankById(...args),
}));

jest.mock('../../user/store/User.thunks', () => ({
  fetchUserById: (...args: any[]) => mockFetchUserById(...args),
}));

import { renderHook } from '@testing-library/react';
import { getTierPageData, useTierPageData } from './UseTierPage.hook';
import { RootState } from '../../../app/store';

describe('getTierPageData', () => {

  const createMockState = (
    tierOverrides?: Partial<RootState['tier']>,
    assignmentOverrides?: Partial<RootState['assignment']>,
    rankOverrides?: Partial<RootState['rank']>,
    userOverrides?: Partial<RootState['user']>
  ): RootState => {
    return {
      tier: {
        ids: [],
        entities: {},
        loading: false,
        error: null,
        ...tierOverrides,
      },
      assignment: {
        ids: [],
        entities: {},
        loading: false,
        error: null,
        ...assignmentOverrides,
      },
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

    it('should return fetching true when tiers are loading', () => {
      const state = createMockState({ loading: true });

      const result = getTierPageData(state);

      expect(result.fetching).toBe(true);
    });

    it('should return fetching true when assignments are loading', () => {
      const state = createMockState(undefined, { loading: true });

      const result = getTierPageData(state);

      expect(result.fetching).toBe(true);
    });

    it('should return fetching true when ranks are loading', () => {
      const state = createMockState(undefined, undefined, { loading: true });

      const result = getTierPageData(state);

      expect(result.fetching).toBe(true);
    });

    it('should return fetching true when users are loading', () => {
      const state = createMockState(undefined, undefined, undefined, { loading: true });

      const result = getTierPageData(state);

      expect(result.fetching).toBe(true);
    });

    it('should return fetching false when nothing is loading', () => {
      const state = createMockState();

      const result = getTierPageData(state);

      expect(result.fetching).toBe(false);
    });

  });

  describe('error state', () => {

    it('should return tier error when present', () => {
      const errorMessage = 'Failed to fetch tier';
      const state = createMockState({ error: errorMessage });

      const result = getTierPageData(state);

      expect(result.error).toBe(errorMessage);
    });

    it('should return assignment error when present', () => {
      const errorMessage = 'Failed to fetch assignments';
      const state = createMockState(undefined, { error: errorMessage });

      const result = getTierPageData(state);

      expect(result.error).toBe(errorMessage);
    });

    it('should return rank error when present', () => {
      const errorMessage = 'Failed to fetch rank';
      const state = createMockState(undefined, undefined, { error: errorMessage });

      const result = getTierPageData(state);

      expect(result.error).toBe(errorMessage);
    });

    it('should return user error when present', () => {
      const errorMessage = 'Failed to fetch user';
      const state = createMockState(undefined, undefined, undefined, { error: errorMessage });

      const result = getTierPageData(state);

      expect(result.error).toBe(errorMessage);
    });

    it('should return null when no error', () => {
      const state = createMockState();

      const result = getTierPageData(state);

      expect(result.error).toBeNull();
    });

  });

  describe('return value structure', () => {

    it('should always return object with fetching and error keys', () => {
      const state = createMockState();

      const result = getTierPageData(state);

      expect(result).toHaveProperty('fetching');
      expect(result).toHaveProperty('error');
      expect(Object.keys(result)).toHaveLength(2);
    });

  });

});

describe('useTierPageData', () => {

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseAppSelector.mockReturnValue({ fetching: false, error: null });
  });

  describe('dispatching behavior', () => {

    it('should dispatch fetchTierById and fetchAssignmentsOfTier on mount when tierId is provided', () => {
      const tierId = 'test-tier-123';

      // Mock useAppSelector to return null for tier
      mockUseAppSelector.mockReturnValue(null);

      renderHook(() => useTierPageData(tierId));

      expect(mockFetchTierById).toHaveBeenCalledWith(tierId);
      expect(mockFetchAssignmentsOfTier).toHaveBeenCalledWith(tierId);
      expect(mockDispatch).toHaveBeenCalledTimes(2);
    });

    it('should not dispatch when tierId is empty string', () => {
      // Mock useAppSelector to return null for tier
      mockUseAppSelector.mockReturnValue(null);

      renderHook(() => useTierPageData(''));

      expect(mockFetchTierById).not.toHaveBeenCalled();
      expect(mockFetchAssignmentsOfTier).not.toHaveBeenCalled();
      expect(mockDispatch).not.toHaveBeenCalled();
    });

    it('should dispatch again when tierId changes', () => {
      const firstId = 'tier-1';
      const secondId = 'tier-2';

      // Mock useAppSelector to return null for tier
      mockUseAppSelector.mockReturnValue(null);

      const { rerender } = renderHook(
        ({ id }) => useTierPageData(id),
        {
          initialProps: { id: firstId },
        }
      );

      expect(mockFetchTierById).toHaveBeenCalledWith(firstId);
      expect(mockFetchAssignmentsOfTier).toHaveBeenCalledWith(firstId);
      expect(mockDispatch).toHaveBeenCalledTimes(2);

      rerender({ id: secondId });

      expect(mockFetchTierById).toHaveBeenCalledWith(secondId);
      expect(mockFetchAssignmentsOfTier).toHaveBeenCalledWith(secondId);
      expect(mockDispatch).toHaveBeenCalledTimes(4);
    });

    it('should not dispatch again when tierId remains the same', () => {
      const tierId = 'tier-1';

      // Mock useAppSelector to return null for tier
      mockUseAppSelector.mockReturnValue(null);

      const { rerender } = renderHook(() => useTierPageData(tierId));

      expect(mockDispatch).toHaveBeenCalledTimes(2);

      rerender();

      expect(mockDispatch).toHaveBeenCalledTimes(2);
    });

    it('should dispatch when transitioning from empty to valid tierId', () => {
      // Mock useAppSelector to return null for tier
      mockUseAppSelector.mockReturnValue(null);

      const { rerender } = renderHook(
        ({ id }) => useTierPageData(id),
        {
          initialProps: { id: '' },
        }
      );

      expect(mockDispatch).not.toHaveBeenCalled();

      rerender({ id: 'new-tier' });

      expect(mockFetchTierById).toHaveBeenCalledWith('new-tier');
      expect(mockFetchAssignmentsOfTier).toHaveBeenCalledWith('new-tier');
      expect(mockDispatch).toHaveBeenCalledTimes(2);
    });

    it('should dispatch fetchRankById when tier is loaded', () => {
      const tierId = 'tier-123';
      const rankId = 'rank-456';
      const mockTier = { id: tierId, rankId, ownerId: 'user-789' };

      // First render without tier
      mockUseAppSelector.mockImplementation((selector) => {
        if (selector === getTierPageData) {
          return { fetching: false, error: null };
        }
        return null;
      });

      const { rerender } = renderHook(() => useTierPageData(tierId));

      expect(mockDispatch).toHaveBeenCalledTimes(2);
      expect(mockFetchRankById).not.toHaveBeenCalled();

      // Second render with tier loaded
      mockUseAppSelector.mockImplementation((selector) => {
        if (selector === getTierPageData) {
          return { fetching: false, error: null };
        }
        return mockTier;
      });

      rerender();

      expect(mockFetchRankById).toHaveBeenCalledWith(rankId);
      expect(mockDispatch).toHaveBeenCalledTimes(4); // 2 initial + 1 rank + 1 user
    });

    it('should dispatch fetchUserById when tier is loaded', () => {
      const tierId = 'tier-123';
      const ownerId = 'user-456';
      const mockTier = { id: tierId, rankId: 'rank-789', ownerId };

      // First render without tier
      mockUseAppSelector.mockImplementation((selector) => {
        if (selector === getTierPageData) {
          return { fetching: false, error: null };
        }
        return null;
      });

      const { rerender } = renderHook(() => useTierPageData(tierId));

      expect(mockDispatch).toHaveBeenCalledTimes(2);
      expect(mockFetchUserById).not.toHaveBeenCalled();

      // Second render with tier loaded
      mockUseAppSelector.mockImplementation((selector) => {
        if (selector === getTierPageData) {
          return { fetching: false, error: null };
        }
        return mockTier;
      });

      rerender();

      expect(mockFetchUserById).toHaveBeenCalledWith(ownerId);
      expect(mockDispatch).toHaveBeenCalledTimes(4); // 2 initial + 1 rank + 1 user
    });

    it('should not dispatch fetchRankById and fetchUserById again when tier properties remain the same', () => {
      const tierId = 'tier-123';
      const mockTier = { id: tierId, rankId: 'rank-456', ownerId: 'user-789' };

      mockUseAppSelector.mockImplementation((selector) => {
        if (selector === getTierPageData) {
          return { fetching: false, error: null };
        }
        return mockTier;
      });

      const { rerender } = renderHook(() => useTierPageData(tierId));

      expect(mockDispatch).toHaveBeenCalledTimes(4); // 2 initial + 1 rank + 1 user

      rerender();

      expect(mockDispatch).toHaveBeenCalledTimes(4); // Should not increase
    });

  });

  describe('return value', () => {

    it('should return data from useAppSelector', () => {
      const mockData = { fetching: true, error: null };
      mockUseAppSelector.mockReturnValue(mockData);

      const { result } = renderHook(() => useTierPageData('test-id'));

      expect(result.current).toEqual(mockData);
    });

    it('should call useAppSelector with getTierPageData selector', () => {
      renderHook(() => useTierPageData('test-id'));

      expect(mockUseAppSelector).toHaveBeenCalledWith(getTierPageData);
    });

  });

});
