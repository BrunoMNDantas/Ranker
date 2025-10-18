// Mock Firebase/Stores to prevent initialization
jest.mock('../../../services/store/Stores', () => ({
  OPTION_STORE: {},
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
const mockFetchOptionById = jest.fn();
const mockFetchAssignmentsOfOption = jest.fn();
const mockFetchRankById = jest.fn();
const mockFetchUserById = jest.fn();

jest.mock('../store/Option.thunks', () => ({
  fetchOptionById: (...args: any[]) => mockFetchOptionById(...args),
}));

jest.mock('../../assignment/store/Assignment.thunks', () => ({
  fetchAssignmentsOfOption: (...args: any[]) => mockFetchAssignmentsOfOption(...args),
}));

jest.mock('../../rank/store/Rank.thunks', () => ({
  fetchRankById: (...args: any[]) => mockFetchRankById(...args),
}));

jest.mock('../../user/store/User.thunks', () => ({
  fetchUserById: (...args: any[]) => mockFetchUserById(...args),
}));

import { renderHook } from '@testing-library/react';
import { getOptionPageData, useOptionPageData } from './UseOptionPage.hook';
import { RootState } from '../../../app/store';

describe('getOptionPageData', () => {

  const createMockState = (
    optionOverrides?: Partial<RootState['option']>,
    assignmentOverrides?: Partial<RootState['assignment']>,
    rankOverrides?: Partial<RootState['rank']>,
    userOverrides?: Partial<RootState['user']>
  ): RootState => {
    return {
      option: {
        ids: [],
        entities: {},
        loading: false,
        error: null,
        ...optionOverrides,
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

    it('should return fetching true when options are loading', () => {
      const state = createMockState({ loading: true });

      const result = getOptionPageData(state);

      expect(result.fetching).toBe(true);
    });

    it('should return fetching true when assignments are loading', () => {
      const state = createMockState(undefined, { loading: true });

      const result = getOptionPageData(state);

      expect(result.fetching).toBe(true);
    });

    it('should return fetching true when ranks are loading', () => {
      const state = createMockState(undefined, undefined, { loading: true });

      const result = getOptionPageData(state);

      expect(result.fetching).toBe(true);
    });

    it('should return fetching true when users are loading', () => {
      const state = createMockState(undefined, undefined, undefined, { loading: true });

      const result = getOptionPageData(state);

      expect(result.fetching).toBe(true);
    });

    it('should return fetching false when nothing is loading', () => {
      const state = createMockState();

      const result = getOptionPageData(state);

      expect(result.fetching).toBe(false);
    });

  });

  describe('error state', () => {

    it('should return option error when present', () => {
      const errorMessage = 'Failed to fetch option';
      const state = createMockState({ error: errorMessage });

      const result = getOptionPageData(state);

      expect(result.error).toBe(errorMessage);
    });

    it('should return assignment error when present', () => {
      const errorMessage = 'Failed to fetch assignments';
      const state = createMockState(undefined, { error: errorMessage });

      const result = getOptionPageData(state);

      expect(result.error).toBe(errorMessage);
    });

    it('should return rank error when present', () => {
      const errorMessage = 'Failed to fetch rank';
      const state = createMockState(undefined, undefined, { error: errorMessage });

      const result = getOptionPageData(state);

      expect(result.error).toBe(errorMessage);
    });

    it('should return user error when present', () => {
      const errorMessage = 'Failed to fetch user';
      const state = createMockState(undefined, undefined, undefined, { error: errorMessage });

      const result = getOptionPageData(state);

      expect(result.error).toBe(errorMessage);
    });

    it('should return null when no error', () => {
      const state = createMockState();

      const result = getOptionPageData(state);

      expect(result.error).toBeNull();
    });

  });

  describe('return value structure', () => {

    it('should always return object with fetching and error keys', () => {
      const state = createMockState();

      const result = getOptionPageData(state);

      expect(result).toHaveProperty('fetching');
      expect(result).toHaveProperty('error');
      expect(Object.keys(result)).toHaveLength(2);
    });

  });

});

describe('useOptionPageData', () => {

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseAppSelector.mockReturnValue({ fetching: false, error: null });
  });

  describe('dispatching behavior', () => {

    it('should dispatch fetchOptionById and fetchAssignmentsOfOption on mount when optionId is provided', () => {
      const optionId = 'test-option-123';

      renderHook(() => useOptionPageData(optionId));

      expect(mockFetchOptionById).toHaveBeenCalledWith(optionId);
      expect(mockFetchAssignmentsOfOption).toHaveBeenCalledWith(optionId);
      expect(mockDispatch).toHaveBeenCalled();
    });

    it('should not dispatch when optionId is empty string', () => {
      renderHook(() => useOptionPageData(''));

      expect(mockFetchOptionById).not.toHaveBeenCalled();
      expect(mockFetchAssignmentsOfOption).not.toHaveBeenCalled();
    });

    it('should dispatch again when optionId changes', () => {
      const firstId = 'option-1';
      const secondId = 'option-2';

      const { rerender } = renderHook(
        ({ id }) => useOptionPageData(id),
        {
          initialProps: { id: firstId },
        }
      );

      expect(mockFetchOptionById).toHaveBeenCalledWith(firstId);
      expect(mockFetchAssignmentsOfOption).toHaveBeenCalledWith(firstId);

      rerender({ id: secondId });

      expect(mockFetchOptionById).toHaveBeenCalledWith(secondId);
      expect(mockFetchAssignmentsOfOption).toHaveBeenCalledWith(secondId);
    });

    it('should not dispatch again when optionId remains the same', () => {
      const optionId = 'option-1';

      // Mock useAppSelector to return null for option
      mockUseAppSelector.mockReturnValue(null);

      const { rerender } = renderHook(() => useOptionPageData(optionId));

      expect(mockDispatch).toHaveBeenCalledTimes(2);

      rerender();

      expect(mockDispatch).toHaveBeenCalledTimes(2);
    });

    it('should dispatch when transitioning from empty to valid optionId', () => {
      // Mock useAppSelector to return null for option
      mockUseAppSelector.mockReturnValue(null);

      const { rerender } = renderHook(
        ({ id }) => useOptionPageData(id),
        {
          initialProps: { id: '' },
        }
      );

      expect(mockDispatch).not.toHaveBeenCalled();

      rerender({ id: 'new-option' });

      expect(mockFetchOptionById).toHaveBeenCalledWith('new-option');
      expect(mockFetchAssignmentsOfOption).toHaveBeenCalledWith('new-option');
      expect(mockDispatch).toHaveBeenCalledTimes(2);
    });

    it('should dispatch fetchRankById when option with rankId is available', () => {
      const optionId = 'option-1';
      const rankId = 'rank-1';
      const option = { id: optionId, rankId, ownerId: 'user-1' };

      // First call returns null (no option yet), second call returns the option
      mockUseAppSelector
        .mockReturnValueOnce(null)
        .mockReturnValueOnce(option)
        .mockReturnValue({ fetching: false, error: null });

      const { rerender } = renderHook(() => useOptionPageData(optionId));

      expect(mockFetchRankById).not.toHaveBeenCalled();

      // Simulate option being loaded
      mockUseAppSelector.mockReturnValue(option);
      rerender();

      expect(mockFetchRankById).toHaveBeenCalledWith(rankId);
    });

    it('should dispatch fetchUserById when option with ownerId is available', () => {
      const optionId = 'option-1';
      const ownerId = 'user-1';
      const option = { id: optionId, rankId: 'rank-1', ownerId };

      mockUseAppSelector
        .mockReturnValueOnce(null)
        .mockReturnValueOnce(option)
        .mockReturnValue({ fetching: false, error: null });

      const { rerender } = renderHook(() => useOptionPageData(optionId));

      expect(mockFetchUserById).not.toHaveBeenCalled();

      mockUseAppSelector.mockReturnValue(option);
      rerender();

      expect(mockFetchUserById).toHaveBeenCalledWith(ownerId);
    });

    it('should not dispatch fetchRankById and fetchUserById again when option properties remain the same', () => {
      const optionId = 'option-123';
      const mockOption = { id: optionId, rankId: 'rank-456', ownerId: 'user-789' };

      mockUseAppSelector.mockImplementation((selector) => {
        if (selector === getOptionPageData) {
          return { fetching: false, error: null };
        }
        return mockOption;
      });

      const { rerender } = renderHook(() => useOptionPageData(optionId));

      expect(mockDispatch).toHaveBeenCalledTimes(4); // 2 initial + 1 rank + 1 user

      rerender();

      expect(mockDispatch).toHaveBeenCalledTimes(4); // Should not increase
    });

  });

  describe('return value', () => {

    it('should return data from useAppSelector', () => {
      const mockData = { fetching: true, error: null };
      mockUseAppSelector.mockReturnValue(mockData);

      const { result } = renderHook(() => useOptionPageData('test-id'));

      expect(result.current).toEqual(mockData);
    });

    it('should call useAppSelector with getOptionPageData selector', () => {
      renderHook(() => useOptionPageData('test-id'));

      expect(mockUseAppSelector).toHaveBeenCalledWith(getOptionPageData);
    });

  });

});