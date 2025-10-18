// Mock Firebase/Stores to prevent initialization
jest.mock('../../../services/store/Stores', () => ({
  VOTE_STORE: {},
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
const mockFetchVoteById = jest.fn();
const mockFetchAssignmentsOfVote = jest.fn();
const mockFetchRankById = jest.fn();
const mockFetchUserById = jest.fn();

jest.mock('../store/Vote.thunks', () => ({
  fetchVoteById: (...args: any[]) => mockFetchVoteById(...args),
}));

jest.mock('../../assignment/store/Assignment.thunks', () => ({
  fetchAssignmentsOfVote: (...args: any[]) => mockFetchAssignmentsOfVote(...args),
}));

jest.mock('../../rank/store/Rank.thunks', () => ({
  fetchRankById: (...args: any[]) => mockFetchRankById(...args),
}));

jest.mock('../../user/store/User.thunks', () => ({
  fetchUserById: (...args: any[]) => mockFetchUserById(...args),
}));

import { renderHook } from '@testing-library/react';
import { getVotePageData, useVotePageData } from './UseVotePage.hook';
import { RootState } from '../../../app/store';

describe('getVotePageData', () => {

  const createMockState = (
    voteOverrides?: Partial<RootState['vote']>,
    assignmentOverrides?: Partial<RootState['assignment']>,
    rankOverrides?: Partial<RootState['rank']>,
    userOverrides?: Partial<RootState['user']>
  ): RootState => {
    return {
      vote: {
        ids: [],
        entities: {},
        loading: false,
        error: null,
        ...voteOverrides,
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

    it('should return fetching true when votes are loading', () => {
      const state = createMockState({ loading: true });

      const result = getVotePageData(state);

      expect(result.fetching).toBe(true);
    });

    it('should return fetching true when assignments are loading', () => {
      const state = createMockState(undefined, { loading: true });

      const result = getVotePageData(state);

      expect(result.fetching).toBe(true);
    });

    it('should return fetching true when ranks are loading', () => {
      const state = createMockState(undefined, undefined, { loading: true });

      const result = getVotePageData(state);

      expect(result.fetching).toBe(true);
    });

    it('should return fetching true when users are loading', () => {
      const state = createMockState(undefined, undefined, undefined, { loading: true });

      const result = getVotePageData(state);

      expect(result.fetching).toBe(true);
    });

    it('should return fetching false when nothing is loading', () => {
      const state = createMockState();

      const result = getVotePageData(state);

      expect(result.fetching).toBe(false);
    });

  });

  describe('error state', () => {

    it('should return vote error when present', () => {
      const errorMessage = 'Failed to fetch vote';
      const state = createMockState({ error: errorMessage });

      const result = getVotePageData(state);

      expect(result.error).toBe(errorMessage);
    });

    it('should return assignment error when present', () => {
      const errorMessage = 'Failed to fetch assignments';
      const state = createMockState(undefined, { error: errorMessage });

      const result = getVotePageData(state);

      expect(result.error).toBe(errorMessage);
    });

    it('should return rank error when present', () => {
      const errorMessage = 'Failed to fetch rank';
      const state = createMockState(undefined, undefined, { error: errorMessage });

      const result = getVotePageData(state);

      expect(result.error).toBe(errorMessage);
    });

    it('should return user error when present', () => {
      const errorMessage = 'Failed to fetch user';
      const state = createMockState(undefined, undefined, undefined, { error: errorMessage });

      const result = getVotePageData(state);

      expect(result.error).toBe(errorMessage);
    });

    it('should return null when no error', () => {
      const state = createMockState();

      const result = getVotePageData(state);

      expect(result.error).toBeNull();
    });

  });

  describe('return value structure', () => {

    it('should always return object with fetching and error keys', () => {
      const state = createMockState();

      const result = getVotePageData(state);

      expect(result).toHaveProperty('fetching');
      expect(result).toHaveProperty('error');
      expect(Object.keys(result)).toHaveLength(2);
    });

  });

});

describe('useVotePageData', () => {

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseAppSelector.mockReturnValue({ fetching: false, error: null });
  });

  describe('dispatching behavior', () => {

    it('should dispatch fetchVoteById and fetchAssignmentsOfVote on mount when voteId is provided', () => {
      const voteId = 'test-vote-123';

      // Mock useAppSelector to return null for vote
      mockUseAppSelector.mockReturnValue(null);

      renderHook(() => useVotePageData(voteId));

      expect(mockFetchVoteById).toHaveBeenCalledWith(voteId);
      expect(mockFetchAssignmentsOfVote).toHaveBeenCalledWith(voteId);
      expect(mockDispatch).toHaveBeenCalledTimes(2);
    });

    it('should not dispatch when voteId is empty string', () => {
      // Mock useAppSelector to return null for vote
      mockUseAppSelector.mockReturnValue(null);

      renderHook(() => useVotePageData(''));

      expect(mockFetchVoteById).not.toHaveBeenCalled();
      expect(mockFetchAssignmentsOfVote).not.toHaveBeenCalled();
      expect(mockDispatch).not.toHaveBeenCalled();
    });

    it('should dispatch again when voteId changes', () => {
      const firstId = 'vote-1';
      const secondId = 'vote-2';

      // Mock useAppSelector to return null for vote
      mockUseAppSelector.mockReturnValue(null);

      const { rerender } = renderHook(
        ({ id }) => useVotePageData(id),
        {
          initialProps: { id: firstId },
        }
      );

      expect(mockFetchVoteById).toHaveBeenCalledWith(firstId);
      expect(mockFetchAssignmentsOfVote).toHaveBeenCalledWith(firstId);
      expect(mockDispatch).toHaveBeenCalledTimes(2);

      rerender({ id: secondId });

      expect(mockFetchVoteById).toHaveBeenCalledWith(secondId);
      expect(mockFetchAssignmentsOfVote).toHaveBeenCalledWith(secondId);
      expect(mockDispatch).toHaveBeenCalledTimes(4);
    });

    it('should not dispatch again when voteId remains the same', () => {
      const voteId = 'vote-1';

      // Mock useAppSelector to return null for vote
      mockUseAppSelector.mockReturnValue(null);

      const { rerender } = renderHook(() => useVotePageData(voteId));

      expect(mockDispatch).toHaveBeenCalledTimes(2);

      rerender();

      expect(mockDispatch).toHaveBeenCalledTimes(2);
    });

    it('should dispatch when transitioning from empty to valid voteId', () => {
      // Mock useAppSelector to return null for vote
      mockUseAppSelector.mockReturnValue(null);

      const { rerender } = renderHook(
        ({ id }) => useVotePageData(id),
        {
          initialProps: { id: '' },
        }
      );

      expect(mockDispatch).not.toHaveBeenCalled();

      rerender({ id: 'new-vote' });

      expect(mockFetchVoteById).toHaveBeenCalledWith('new-vote');
      expect(mockFetchAssignmentsOfVote).toHaveBeenCalledWith('new-vote');
      expect(mockDispatch).toHaveBeenCalledTimes(2);
    });

    it('should dispatch fetchRankById when vote is loaded', () => {
      const voteId = 'vote-123';
      const rankId = 'rank-456';
      const mockVote = { id: voteId, rankId, ownerId: 'user-789' };

      // First render without vote
      mockUseAppSelector.mockImplementation((selector) => {
        if (selector === getVotePageData) {
          return { fetching: false, error: null };
        }
        return null;
      });

      const { rerender } = renderHook(() => useVotePageData(voteId));

      expect(mockDispatch).toHaveBeenCalledTimes(2);
      expect(mockFetchRankById).not.toHaveBeenCalled();

      // Second render with vote loaded
      mockUseAppSelector.mockImplementation((selector) => {
        if (selector === getVotePageData) {
          return { fetching: false, error: null };
        }
        return mockVote;
      });

      rerender();

      expect(mockFetchRankById).toHaveBeenCalledWith(rankId);
      expect(mockDispatch).toHaveBeenCalledTimes(4); // 2 initial + 1 rank + 1 user
    });

    it('should dispatch fetchUserById when vote is loaded', () => {
      const voteId = 'vote-123';
      const ownerId = 'user-456';
      const mockVote = { id: voteId, rankId: 'rank-789', ownerId };

      // First render without vote
      mockUseAppSelector.mockImplementation((selector) => {
        if (selector === getVotePageData) {
          return { fetching: false, error: null };
        }
        return null;
      });

      const { rerender } = renderHook(() => useVotePageData(voteId));

      expect(mockDispatch).toHaveBeenCalledTimes(2);
      expect(mockFetchUserById).not.toHaveBeenCalled();

      // Second render with vote loaded
      mockUseAppSelector.mockImplementation((selector) => {
        if (selector === getVotePageData) {
          return { fetching: false, error: null };
        }
        return mockVote;
      });

      rerender();

      expect(mockFetchUserById).toHaveBeenCalledWith(ownerId);
      expect(mockDispatch).toHaveBeenCalledTimes(4); // 2 initial + 1 rank + 1 user
    });

    it('should not dispatch fetchRankById and fetchUserById again when vote properties remain the same', () => {
      const voteId = 'vote-123';
      const mockVote = { id: voteId, rankId: 'rank-456', ownerId: 'user-789' };

      mockUseAppSelector.mockImplementation((selector) => {
        if (selector === getVotePageData) {
          return { fetching: false, error: null };
        }
        return mockVote;
      });

      const { rerender } = renderHook(() => useVotePageData(voteId));

      expect(mockDispatch).toHaveBeenCalledTimes(4); // 2 initial + 1 rank + 1 user

      rerender();

      expect(mockDispatch).toHaveBeenCalledTimes(4); // Should not increase
    });

  });

  describe('return value', () => {

    it('should return data from useAppSelector', () => {
      const mockData = { fetching: true, error: null };
      mockUseAppSelector.mockReturnValue(mockData);

      const { result } = renderHook(() => useVotePageData('test-id'));

      expect(result.current).toEqual(mockData);
    });

    it('should call useAppSelector with getVotePageData selector', () => {
      renderHook(() => useVotePageData('test-id'));

      expect(mockUseAppSelector).toHaveBeenCalledWith(getVotePageData);
    });

  });

});