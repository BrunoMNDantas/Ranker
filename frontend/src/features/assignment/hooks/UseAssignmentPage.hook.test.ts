// Mock Firebase/Stores to prevent initialization
jest.mock('../../../services/store/Stores', () => ({
  ASSIGNMENT_STORE: {},
}));

// Mock the hooks from react-redux
const mockDispatch = jest.fn();
const mockUseAppSelector = jest.fn();

jest.mock('../../../app/hooks', () => ({
  useAppDispatch: () => mockDispatch,
  useAppSelector: (selector: any) => mockUseAppSelector(selector),
}));

// Mock the thunk
const mockFetchAssignmentById = jest.fn();
jest.mock('../store/Assignment.thunks', () => ({
  fetchAssignmentById: (...args: any[]) => mockFetchAssignmentById(...args),
}));

import { renderHook } from '@testing-library/react';
import { getAssignmentPageData, useAssignmentPageData } from './UseAssignmentPage.hook';
import { RootState } from '../../../app/store';

describe('getAssignmentPageData', () => {

  const createMockState = (overrides?: Partial<RootState['assignment']>): RootState => {
    return {
      assignment: {
        ids: [],
        entities: {},
        loading: false,
        error: null,
        ...overrides,
      },
    } as RootState;
  };

  describe('loading state', () => {

    it('should return fetching true when loading', () => {
      const state = createMockState({ loading: true });

      const result = getAssignmentPageData(state);

      expect(result.fetching).toBe(true);
    });

    it('should return fetching false when not loading', () => {
      const state = createMockState({ loading: false });

      const result = getAssignmentPageData(state);

      expect(result.fetching).toBe(false);
    });

  });

  describe('error state', () => {

    it('should return error when present', () => {
      const errorMessage = 'Failed to fetch assignment';
      const state = createMockState({ error: errorMessage });

      const result = getAssignmentPageData(state);

      expect(result.error).toBe(errorMessage);
    });

    it('should return null when no error', () => {
      const state = createMockState({ error: null });

      const result = getAssignmentPageData(state);

      expect(result.error).toBeNull();
    });

  });

  describe('return value structure', () => {

    it('should always return object with fetching and error keys', () => {
      const state = createMockState();

      const result = getAssignmentPageData(state);

      expect(result).toHaveProperty('fetching');
      expect(result).toHaveProperty('error');
      expect(Object.keys(result)).toHaveLength(2);
    });

  });

});

describe('useAssignmentPageData', () => {

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseAppSelector.mockReturnValue({ fetching: false, error: null });
  });

  describe('dispatching behavior', () => {

    it('should dispatch fetchAssignmentById on mount when assignmentId is provided', () => {
      const assignmentId = 'test-assignment-123';

      renderHook(() => useAssignmentPageData(assignmentId));

      expect(mockFetchAssignmentById).toHaveBeenCalledWith(assignmentId);
      expect(mockDispatch).toHaveBeenCalledTimes(1);
    });

    it('should not dispatch when assignmentId is empty string', () => {
      renderHook(() => useAssignmentPageData(''));

      expect(mockFetchAssignmentById).not.toHaveBeenCalled();
      expect(mockDispatch).not.toHaveBeenCalled();
    });

    it('should dispatch again when assignmentId changes', () => {
      const firstId = 'assignment-1';
      const secondId = 'assignment-2';

      const { rerender } = renderHook(
        ({ id }) => useAssignmentPageData(id),
        {
          initialProps: { id: firstId },
        }
      );

      expect(mockFetchAssignmentById).toHaveBeenCalledWith(firstId);
      expect(mockDispatch).toHaveBeenCalledTimes(1);

      rerender({ id: secondId });

      expect(mockFetchAssignmentById).toHaveBeenCalledWith(secondId);
      expect(mockDispatch).toHaveBeenCalledTimes(2);
    });

    it('should not dispatch again when assignmentId remains the same', () => {
      const assignmentId = 'assignment-1';

      const { rerender } = renderHook(() => useAssignmentPageData(assignmentId));

      expect(mockDispatch).toHaveBeenCalledTimes(1);

      rerender();

      expect(mockDispatch).toHaveBeenCalledTimes(1);
    });

    it('should dispatch when transitioning from empty to valid assignmentId', () => {
      const { rerender } = renderHook(
        ({ id }) => useAssignmentPageData(id),
        {
          initialProps: { id: '' },
        }
      );

      expect(mockDispatch).not.toHaveBeenCalled();

      rerender({ id: 'new-assignment' });

      expect(mockFetchAssignmentById).toHaveBeenCalledWith('new-assignment');
      expect(mockDispatch).toHaveBeenCalledTimes(1);
    });

  });

  describe('return value', () => {

    it('should return data from useAppSelector', () => {
      const mockData = { fetching: true, error: null };
      mockUseAppSelector.mockReturnValue(mockData);

      const { result } = renderHook(() => useAssignmentPageData('test-id'));

      expect(result.current).toEqual(mockData);
    });

    it('should call useAppSelector with getAssignmentPageData selector', () => {
      renderHook(() => useAssignmentPageData('test-id'));

      expect(mockUseAppSelector).toHaveBeenCalledWith(getAssignmentPageData);
    });

  });

});
