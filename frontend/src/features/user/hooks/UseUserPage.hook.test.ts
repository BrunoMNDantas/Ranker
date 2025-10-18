// Mock Firebase/Stores to prevent initialization
jest.mock('../../../services/store/Stores', () => ({
  USER_STORE: {},
  RANK_STORE: {},
  VOTE_STORE: {},
}));

// Mock the hooks from react-redux
const mockDispatch = jest.fn();
const mockUseAppSelector = jest.fn();

jest.mock('../../../app/hooks', () => ({
  useAppDispatch: () => mockDispatch,
  useAppSelector: (selector: any) => mockUseAppSelector(selector),
}));

// Mock the thunks
const mockFetchUserById = jest.fn();
const mockFetchRanksOfUser = jest.fn();
const mockFetchVotesOfUser = jest.fn();

jest.mock('../store/User.thunks', () => ({
  fetchUserById: (...args: any[]) => mockFetchUserById(...args),
}));

jest.mock('../../rank/store/Rank.thunks', () => ({
  fetchRanksOfUser: (...args: any[]) => mockFetchRanksOfUser(...args),
}));

jest.mock('../../vote/store/Vote.thunks', () => ({
  fetchVotesOfUser: (...args: any[]) => mockFetchVotesOfUser(...args),
}));

import { renderHook } from '@testing-library/react';
import { getUserPageData, useUserPageData } from './UseUserPage.hook';
import { RootState } from '../../../app/store';

describe('getUserPageData', () => {

  const createMockState = (
    userOverrides?: Partial<RootState['user']>,
    rankOverrides?: Partial<RootState['rank']>,
    voteOverrides?: Partial<RootState['vote']>
  ): RootState => {
    return {
      user: {
        ids: [],
        entities: {},
        loading: false,
        error: null,
        ...userOverrides,
      },
      rank: {
        ids: [],
        entities: {},
        loading: false,
        error: null,
        ...rankOverrides,
      },
      vote: {
        ids: [],
        entities: {},
        loading: false,
        error: null,
        ...voteOverrides,
      },
    } as RootState;
  };

  describe('loading state', () => {

    it('should return fetching true when users are loading', () => {
      const state = createMockState({ loading: true });

      const result = getUserPageData(state);

      expect(result.fetching).toBe(true);
    });

    it('should return fetching true when ranks are loading', () => {
      const state = createMockState(undefined, { loading: true });

      const result = getUserPageData(state);

      expect(result.fetching).toBe(true);
    });

    it('should return fetching true when votes are loading', () => {
      const state = createMockState(undefined, undefined, { loading: true });

      const result = getUserPageData(state);

      expect(result.fetching).toBe(true);
    });

    it('should return fetching false when nothing is loading', () => {
      const state = createMockState();

      const result = getUserPageData(state);

      expect(result.fetching).toBe(false);
    });

  });

  describe('error state', () => {

    it('should return user error when present', () => {
      const errorMessage = 'Failed to fetch user';
      const state = createMockState({ error: errorMessage });

      const result = getUserPageData(state);

      expect(result.error).toBe(errorMessage);
    });

    it('should return rank error when present', () => {
      const errorMessage = 'Failed to fetch ranks';
      const state = createMockState(undefined, { error: errorMessage });

      const result = getUserPageData(state);

      expect(result.error).toBe(errorMessage);
    });

    it('should return vote error when present', () => {
      const errorMessage = 'Failed to fetch votes';
      const state = createMockState(undefined, undefined, { error: errorMessage });

      const result = getUserPageData(state);

      expect(result.error).toBe(errorMessage);
    });

    it('should return null when no error', () => {
      const state = createMockState();

      const result = getUserPageData(state);

      expect(result.error).toBeNull();
    });

  });

  describe('return value structure', () => {

    it('should always return object with fetching and error keys', () => {
      const state = createMockState();

      const result = getUserPageData(state);

      expect(result).toHaveProperty('fetching');
      expect(result).toHaveProperty('error');
      expect(Object.keys(result)).toHaveLength(2);
    });

  });

});

describe('useUserPageData', () => {

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseAppSelector.mockReturnValue({ fetching: false, error: null });
  });

  describe('dispatching behavior', () => {

    it('should dispatch fetchUserById, fetchRanksOfUser, and fetchVotesOfUser on mount when userId is provided', () => {
      const userId = 'test-user-123';

      renderHook(() => useUserPageData(userId));

      expect(mockFetchUserById).toHaveBeenCalledWith(userId);
      expect(mockFetchRanksOfUser).toHaveBeenCalledWith(userId);
      expect(mockFetchVotesOfUser).toHaveBeenCalledWith(userId);
      expect(mockDispatch).toHaveBeenCalledTimes(3);
    });

    it('should not dispatch when userId is empty string', () => {
      renderHook(() => useUserPageData(''));

      expect(mockFetchUserById).not.toHaveBeenCalled();
      expect(mockFetchRanksOfUser).not.toHaveBeenCalled();
      expect(mockFetchVotesOfUser).not.toHaveBeenCalled();
      expect(mockDispatch).not.toHaveBeenCalled();
    });

    it('should dispatch again when userId changes', () => {
      const firstId = 'user-1';
      const secondId = 'user-2';

      const { rerender } = renderHook(
        ({ id }) => useUserPageData(id),
        {
          initialProps: { id: firstId },
        }
      );

      expect(mockFetchUserById).toHaveBeenCalledWith(firstId);
      expect(mockFetchRanksOfUser).toHaveBeenCalledWith(firstId);
      expect(mockFetchVotesOfUser).toHaveBeenCalledWith(firstId);
      expect(mockDispatch).toHaveBeenCalledTimes(3);

      rerender({ id: secondId });

      expect(mockFetchUserById).toHaveBeenCalledWith(secondId);
      expect(mockFetchRanksOfUser).toHaveBeenCalledWith(secondId);
      expect(mockFetchVotesOfUser).toHaveBeenCalledWith(secondId);
      expect(mockDispatch).toHaveBeenCalledTimes(6);
    });

    it('should not dispatch again when userId remains the same', () => {
      const userId = 'user-1';

      const { rerender } = renderHook(() => useUserPageData(userId));

      expect(mockDispatch).toHaveBeenCalledTimes(3);

      rerender();

      expect(mockDispatch).toHaveBeenCalledTimes(3);
    });

    it('should dispatch when transitioning from empty to valid userId', () => {
      const { rerender } = renderHook(
        ({ id }) => useUserPageData(id),
        {
          initialProps: { id: '' },
        }
      );

      expect(mockDispatch).not.toHaveBeenCalled();

      rerender({ id: 'new-user' });

      expect(mockFetchUserById).toHaveBeenCalledWith('new-user');
      expect(mockFetchRanksOfUser).toHaveBeenCalledWith('new-user');
      expect(mockFetchVotesOfUser).toHaveBeenCalledWith('new-user');
      expect(mockDispatch).toHaveBeenCalledTimes(3);
    });

  });

  describe('return value', () => {

    it('should return data from useAppSelector', () => {
      const mockData = { fetching: true, error: null };
      mockUseAppSelector.mockReturnValue(mockData);

      const { result } = renderHook(() => useUserPageData('test-id'));

      expect(result.current).toEqual(mockData);
    });

    it('should call useAppSelector with getUserPageData selector', () => {
      renderHook(() => useUserPageData('test-id'));

      expect(mockUseAppSelector).toHaveBeenCalledWith(getUserPageData);
    });

  });

});