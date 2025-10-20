// Mock Firebase/Stores to prevent initialization
jest.mock('../../../services/store/Stores', () => ({
  OPTION_STORE: {},
}));

import { RootState } from '../../../app/store';
import {
  selectAllOptions,
  selectOptionById,
  selectOptionIds,
  selectOptionsLoading,
  selectOptionsError,
  selectOptionsByIds,
  selectOptionsOfRank,
  selectOptionsOfUser,
} from './Option.selectors';
import { Option } from '../model/Option.types';

describe('Option Selectors', () => {

  const mockOption1: Option = {
    id: 'option-1',
    creationDate: new Date('2024-01-01'),
    lastUpdateDate: new Date('2024-01-02'),
    ownerId: 'user-1',
    rankId: 'rank-1',
    order: 1,
    title: 'Option One',
    description: 'Description One',
    imageUrl: null,
    color: null,
  };

  const mockOption2: Option = {
    id: 'option-2',
    creationDate: new Date('2024-01-03'),
    lastUpdateDate: new Date('2024-01-04'),
    ownerId: 'user-1',
    rankId: 'rank-1',
    order: 2,
    title: 'Option Two',
    description: null,
    imageUrl: null,
    color: null,
  };

  const mockOption3: Option = {
    id: 'option-3',
    creationDate: new Date('2024-01-05'),
    lastUpdateDate: new Date('2024-01-06'),
    ownerId: 'user-2',
    rankId: 'rank-2',
    order: 3,
    title: 'Option Three',
    description: null,
    imageUrl: null,
    color: null,
  };

  const createMockState = (overrides?: Partial<RootState['option']>): RootState => {
    return {
      option: {
        ids: [],
        entities: {},
        loading: false,
        error: null,
        ...overrides,
      },
    } as RootState;
  };

  describe('selectAllOptions', () => {

    it('should return empty array when no options exist', () => {
      const state = createMockState();

      const result = selectAllOptions(state);

      expect(result).toEqual([]);
    });

    it('should return all options', () => {
      const state = createMockState({
        ids: ['option-1', 'option-2'],
        entities: {
          'option-1': mockOption1,
          'option-2': mockOption2,
        },
      });

      const result = selectAllOptions(state);

      expect(result).toEqual([mockOption1, mockOption2]);
    });

  });

  describe('selectOptionById', () => {

    it('should return undefined when option does not exist', () => {
      const state = createMockState();

      const result = selectOptionById(state, 'non-existent');

      expect(result).toBeUndefined();
    });

    it('should return option when it exists', () => {
      const state = createMockState({
        ids: ['option-1'],
        entities: {
          'option-1': mockOption1,
        },
      });

      const result = selectOptionById(state, 'option-1');

      expect(result).toEqual(mockOption1);
    });

  });

  describe('selectOptionIds', () => {

    it('should return empty array when no options exist', () => {
      const state = createMockState();

      const result = selectOptionIds(state);

      expect(result).toEqual([]);
    });

    it('should return all option ids', () => {
      const state = createMockState({
        ids: ['option-1', 'option-2', 'option-3'],
        entities: {
          'option-1': mockOption1,
          'option-2': mockOption2,
          'option-3': mockOption3,
        },
      });

      const result = selectOptionIds(state);

      expect(result).toEqual(['option-1', 'option-2', 'option-3']);
    });

  });

  describe('selectOptionsLoading', () => {

    it('should return false when not loading', () => {
      const state = createMockState({ loading: false });

      const result = selectOptionsLoading(state);

      expect(result).toBe(false);
    });

    it('should return true when loading', () => {
      const state = createMockState({ loading: true });

      const result = selectOptionsLoading(state);

      expect(result).toBe(true);
    });

  });

  describe('selectOptionsError', () => {

    it('should return null when no error', () => {
      const state = createMockState({ error: null });

      const result = selectOptionsError(state);

      expect(result).toBeNull();
    });

    it('should return error message when error exists', () => {
      const errorMessage = 'Failed to fetch options';
      const state = createMockState({ error: errorMessage });

      const result = selectOptionsError(state);

      expect(result).toBe(errorMessage);
    });

  });

  describe('selectOptionsByIds', () => {

    it('should return empty array when ids array is empty', () => {
      const state = createMockState({
        ids: ['option-1', 'option-2'],
        entities: {
          'option-1': mockOption1,
          'option-2': mockOption2,
        },
      });

      const result = selectOptionsByIds(state, []);

      expect(result).toEqual([]);
    });

    it('should return array with undefined for non-existent options', () => {
      const state = createMockState();

      const result = selectOptionsByIds(state, ['option-1', 'option-2']);

      expect(result).toEqual([undefined, undefined]);
    });

    it('should return requested options', () => {
      const state = createMockState({
        ids: ['option-1', 'option-2', 'option-3'],
        entities: {
          'option-1': mockOption1,
          'option-2': mockOption2,
          'option-3': mockOption3,
        },
      });

      const result = selectOptionsByIds(state, ['option-1', 'option-3']);

      expect(result).toEqual([mockOption1, mockOption3]);
    });

  });

  describe('selectOptionsOfRank', () => {

    it('should return empty array when no options exist', () => {
      const state = createMockState();

      const result = selectOptionsOfRank(state, 'rank-1');

      expect(result).toEqual([]);
    });

    it('should return only options belonging to specified rank', () => {
      const state = createMockState({
        ids: ['option-1', 'option-2', 'option-3'],
        entities: {
          'option-1': mockOption1,
          'option-2': mockOption2,
          'option-3': mockOption3,
        },
      });

      const result = selectOptionsOfRank(state, 'rank-1');

      expect(result).toEqual([mockOption1, mockOption2]);
    });

    it('should return empty array when rank has no options', () => {
      const state = createMockState({
        ids: ['option-1', 'option-2'],
        entities: {
          'option-1': mockOption1,
          'option-2': mockOption2,
        },
      });

      const result = selectOptionsOfRank(state, 'rank-3');

      expect(result).toEqual([]);
    });

  });
  describe('selectOptionsOfUser', () => {

    it('should return empty array when no options exist', () => {
      const state = createMockState();

      const result = selectOptionsOfUser(state, 'user-1');

      expect(result).toEqual([]);
    });

    it('should return only options belonging to specified user', () => {
      const state = createMockState({
        ids: ['option-1', 'option-2', 'option-3'],
        entities: {
          'option-1': mockOption1,
          'option-2': mockOption2,
          'option-3': mockOption3,
        },
      });

      const result = selectOptionsOfUser(state, 'user-1');

      expect(result).toEqual([mockOption1, mockOption2]);
    });

    it('should return empty array when user has no options', () => {
      const state = createMockState({
        ids: ['option-1', 'option-2'],
        entities: {
          'option-1': mockOption1,
          'option-2': mockOption2,
        },
      });

      const result = selectOptionsOfUser(state, 'user-3');

      expect(result).toEqual([]);
    });

  });

});
