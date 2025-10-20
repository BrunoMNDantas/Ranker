// Mock Firebase/Stores to prevent initialization
jest.mock('../../../services/store/Stores', () => ({
  OPTION_STORE: {},
}));

import optionReducer, {
  setOptions,
  addOption,
  addOptions,
  updateOption,
  updateOptions,
  deleteOption,
  deleteOptions,
  setLoading,
  setError,
} from './Option.slice';
import { fetchAllOptions, fetchOptionById, fetchOptionsByIds, fetchOptionsOfUser, createOptionThunk, updateOptionThunk, deleteOptionThunk } from './Option.thunks';
import { Option } from '../model/Option.types';

describe('Option Slice', () => {

  const mockOption1: Option = {
    id: 'option-1',
    creationDate: new Date('2024-01-01'),
    lastUpdateDate: new Date('2024-01-02'),
    ownerId: 'user-1',
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
    title: 'Option Three',
    description: null,
    imageUrl: null,
    color: null,
  };

  const initialState = {
    ids: [],
    entities: {},
    loading: false,
    error: null,
  };

  describe('reducer', () => {

    it('should return the initial state', () => {
      const result = optionReducer(undefined, { type: 'unknown' });

      expect(result).toEqual(initialState);
    });

  });

  describe('setOptions', () => {

    it('should replace all options', () => {
      const state = {
        ids: ['option-1'],
        entities: { 'option-1': mockOption1 },
        loading: false,
        error: null,
      };

      const result = optionReducer(state, setOptions([mockOption2, mockOption3]));

      expect(result.ids).toEqual(['option-2', 'option-3']);
      expect(result.entities).toEqual({
        'option-2': mockOption2,
        'option-3': mockOption3,
      });
    });

  });

  describe('addOption', () => {

    it('should add a single option', () => {
      const result = optionReducer(initialState, addOption(mockOption1));

      expect(result.ids).toEqual(['option-1']);
      expect(result.entities['option-1']).toEqual(mockOption1);
    });

  });

  describe('addOptions', () => {

    it('should add multiple options', () => {
      const result = optionReducer(initialState, addOptions([mockOption1, mockOption2]));

      expect(result.ids).toEqual(['option-1', 'option-2']);
      expect(result.entities).toEqual({
        'option-1': mockOption1,
        'option-2': mockOption2,
      });
    });

  });

  describe('updateOption', () => {

    it('should update an existing option', () => {
      const state = {
        ids: ['option-1'],
        entities: { 'option-1': mockOption1 },
        loading: false,
        error: null,
      };

      const updatedOption = { id: 'option-1', changes: { title: 'Updated Title' } };

      const result = optionReducer(state, updateOption(updatedOption));

      expect(result.entities['option-1']?.title).toBe('Updated Title');
      expect(result.entities['option-1']?.ownerId).toBe(mockOption1.ownerId);
    });

  });

  describe('updateOptions', () => {

    it('should update multiple options', () => {
      const state = {
        ids: ['option-1', 'option-2'],
        entities: {
          'option-1': mockOption1,
          'option-2': mockOption2,
        },
        loading: false,
        error: null,
      };

      const updates = [
        { id: 'option-1', changes: { title: 'Updated One' } },
        { id: 'option-2', changes: { title: 'Updated Two' } },
      ];

      const result = optionReducer(state, updateOptions(updates));

      expect(result.entities['option-1']?.title).toBe('Updated One');
      expect(result.entities['option-2']?.title).toBe('Updated Two');
    });

  });

  describe('deleteOption', () => {

    it('should remove a option', () => {
      const state = {
        ids: ['option-1', 'option-2'],
        entities: {
          'option-1': mockOption1,
          'option-2': mockOption2,
        },
        loading: false,
        error: null,
      };

      const result = optionReducer(state, deleteOption('option-1'));

      expect(result.ids).toEqual(['option-2']);
      expect(result.entities['option-1']).toBeUndefined();
    });

  });

  describe('deleteOptions', () => {

    it('should remove multiple options', () => {
      const state = {
        ids: ['option-1', 'option-2', 'option-3'],
        entities: {
          'option-1': mockOption1,
          'option-2': mockOption2,
          'option-3': mockOption3,
        },
        loading: false,
        error: null,
      };

      const result = optionReducer(state, deleteOptions(['option-1', 'option-3']));

      expect(result.ids).toEqual(['option-2']);
    });

  });

  describe('setLoading', () => {

    it('should set loading to true', () => {
      const result = optionReducer(initialState, setLoading(true));

      expect(result.loading).toBe(true);
    });

    it('should set loading to false', () => {
      const state = { ...initialState, loading: true };

      const result = optionReducer(state, setLoading(false));

      expect(result.loading).toBe(false);
    });

  });

  describe('setError', () => {

    it('should set error message', () => {
      const errorMessage = 'Failed to fetch options';

      const result = optionReducer(initialState, setError(errorMessage));

      expect(result.error).toBe(errorMessage);
    });

    it('should clear error when null is provided', () => {
      const state = { ...initialState, error: 'Previous error' };

      const result = optionReducer(state, setError(null));

      expect(result.error).toBeNull();
    });

  });

  describe('fetchAllOptions extraReducers', () => {

    it('should set loading true on pending', () => {
      const action = { type: fetchAllOptions.pending.type };

      const result = optionReducer(initialState, action);

      expect(result.loading).toBe(true);
      expect(result.error).toBeNull();
    });

    it('should set all options on fulfilled', () => {
      const action = {
        type: fetchAllOptions.fulfilled.type,
        payload: [mockOption1, mockOption2],
      };

      const result = optionReducer(initialState, action);

      expect(result.loading).toBe(false);
      expect(result.ids).toEqual(['option-1', 'option-2']);
    });

    it('should set error on rejected', () => {
      const action = {
        type: fetchAllOptions.rejected.type,
        error: { message: 'Network error' },
      };

      const result = optionReducer(initialState, action);

      expect(result.loading).toBe(false);
      expect(result.error).toBe('Network error');
    });

  });

  describe('fetchOptionById extraReducers', () => {

    it('should set loading true on pending', () => {
      const action = { type: fetchOptionById.pending.type };

      const result = optionReducer(initialState, action);

      expect(result.loading).toBe(true);
    });

    it('should upsert option on fulfilled', () => {
      const action = {
        type: fetchOptionById.fulfilled.type,
        payload: mockOption1,
      };

      const result = optionReducer(initialState, action);

      expect(result.loading).toBe(false);
      expect(result.entities['option-1']).toEqual(mockOption1);
    });

    it('should not add option when payload is null', () => {
      const action = {
        type: fetchOptionById.fulfilled.type,
        payload: null,
      };

      const result = optionReducer(initialState, action);

      expect(result.loading).toBe(false);
      expect(result.ids).toEqual([]);
    });

  });

  describe('fetchOptionsByIds extraReducers', () => {

    it('should upsert multiple options on fulfilled', () => {
      const action = {
        type: fetchOptionsByIds.fulfilled.type,
        payload: [mockOption1, mockOption2],
      };

      const result = optionReducer(initialState, action);

      expect(result.loading).toBe(false);
      expect(result.ids).toEqual(['option-1', 'option-2']);
    });

  });

  describe('fetchOptionsOfUser extraReducers', () => {

    it('should set all options on fulfilled', () => {
      const action = {
        type: fetchOptionsOfUser.fulfilled.type,
        payload: [mockOption1, mockOption2],
      };

      const result = optionReducer(initialState, action);

      expect(result.loading).toBe(false);
      expect(result.ids).toEqual(['option-1', 'option-2']);
    });

  });

  describe('createOptionThunk extraReducers', () => {

    it('should add new option on fulfilled', () => {
      const action = {
        type: createOptionThunk.fulfilled.type,
        payload: mockOption1,
      };

      const result = optionReducer(initialState, action);

      expect(result.loading).toBe(false);
      expect(result.entities['option-1']).toEqual(mockOption1);
    });

  });

  describe('updateOptionThunk extraReducers', () => {

    it('should upsert updated option on fulfilled', () => {
      const state = {
        ids: ['option-1'],
        entities: { 'option-1': mockOption1 },
        loading: false,
        error: null,
      };

      const updatedOption = { ...mockOption1, title: 'Updated Title' };
      const action = {
        type: updateOptionThunk.fulfilled.type,
        payload: updatedOption,
      };

      const result = optionReducer(state, action);

      expect(result.loading).toBe(false);
      expect(result.entities['option-1']?.title).toBe('Updated Title');
    });

  });

  describe('deleteOptionThunk extraReducers', () => {

    it('should remove option on fulfilled', () => {
      const state = {
        ids: ['option-1', 'option-2'],
        entities: {
          'option-1': mockOption1,
          'option-2': mockOption2,
        },
        loading: false,
        error: null,
      };

      const action = {
        type: deleteOptionThunk.fulfilled.type,
        payload: 'option-1',
      };

      const result = optionReducer(state, action);

      expect(result.loading).toBe(false);
      expect(result.ids).toEqual(['option-2']);
    });

  });

});
