// Mock Firebase/Stores to prevent initialization
jest.mock('../../../services/store/Stores', () => ({
  OPTION_STORE: {},
}));

// Mock the API
const mockGetAllOptions = jest.fn();
const mockGetOption = jest.fn();
const mockGetOptionsByIds = jest.fn();
const mockGetOptionsOfUser = jest.fn();
const mockCreateOption = jest.fn();
const mockUpdateOption = jest.fn();
const mockDeleteOption = jest.fn();

jest.mock('../api/Option.api', () => ({
  getAllOptions: (...args: any[]) => mockGetAllOptions(...args),
  getOption: (...args: any[]) => mockGetOption(...args),
  getOptionsByIds: (...args: any[]) => mockGetOptionsByIds(...args),
  getOptionsOfUser: (...args: any[]) => mockGetOptionsOfUser(...args),
  createOption: (...args: any[]) => mockCreateOption(...args),
  updateOption: (...args: any[]) => mockUpdateOption(...args),
  deleteOption: (...args: any[]) => mockDeleteOption(...args),
}));

import { fetchAllOptions, fetchOptionById, fetchOptionsByIds, fetchOptionsOfUser, createOptionThunk, updateOptionThunk, deleteOptionThunk } from './Option.thunks';
import { Option } from '../model/Option.types';

describe('Option Thunks', () => {

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

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('fetchAllOptions', () => {

    it('should fetch all options successfully', async () => {
      const options = [mockOption1, mockOption2];
      mockGetAllOptions.mockResolvedValue(options);

      const dispatch = jest.fn();
      const getState = jest.fn();

      const thunk = fetchAllOptions();
      const result = await thunk(dispatch, getState, undefined);

      expect(mockGetAllOptions).toHaveBeenCalledTimes(1);
      expect(result.payload).toEqual(options);
    });

    it('should handle errors', async () => {
      const errorMessage = 'Network error';
      mockGetAllOptions.mockRejectedValue(new Error(errorMessage));

      const dispatch = jest.fn();
      const getState = jest.fn();

      const thunk = fetchAllOptions();
      const result = await thunk(dispatch, getState, undefined);

      expect(mockGetAllOptions).toHaveBeenCalledTimes(1);
      expect(result.type).toBe('option/fetchAll/rejected');
      expect(result.error.message).toBe(errorMessage);
    });

  });

  describe('fetchOptionById', () => {

    it('should fetch option by id successfully', async () => {
      const optionId = 'option-1';
      mockGetOption.mockResolvedValue(mockOption1);

      const dispatch = jest.fn();
      const getState = jest.fn();

      const thunk = fetchOptionById(optionId);
      const result = await thunk(dispatch, getState, undefined);

      expect(mockGetOption).toHaveBeenCalledWith(optionId);
      expect(result.payload).toEqual(mockOption1);
    });

    it('should handle errors', async () => {
      const optionId = 'option-1';
      const errorMessage = 'Option not found';
      mockGetOption.mockRejectedValue(new Error(errorMessage));

      const dispatch = jest.fn();
      const getState = jest.fn();

      const thunk = fetchOptionById(optionId);
      const result = await thunk(dispatch, getState, undefined);

      expect(mockGetOption).toHaveBeenCalledWith(optionId);
      expect(result.type).toBe('option/fetchById/rejected');
      expect(result.error.message).toBe(errorMessage);
    });

  });

  describe('fetchOptionsByIds', () => {

    it('should fetch multiple options by ids successfully', async () => {
      const optionIds = ['option-1', 'option-2'];
      const options = [mockOption1, mockOption2];
      mockGetOptionsByIds.mockResolvedValue(options);

      const dispatch = jest.fn();
      const getState = jest.fn();

      const thunk = fetchOptionsByIds(optionIds);
      const result = await thunk(dispatch, getState, undefined);

      expect(mockGetOptionsByIds).toHaveBeenCalledWith(optionIds);
      expect(result.payload).toEqual(options);
    });

    it('should handle errors', async () => {
      const optionIds = ['option-1', 'option-2'];
      const errorMessage = 'Failed to fetch options';
      mockGetOptionsByIds.mockRejectedValue(new Error(errorMessage));

      const dispatch = jest.fn();
      const getState = jest.fn();

      const thunk = fetchOptionsByIds(optionIds);
      const result = await thunk(dispatch, getState, undefined);

      expect(mockGetOptionsByIds).toHaveBeenCalledWith(optionIds);
      expect(result.type).toBe('option/fetchByIds/rejected');
      expect(result.error.message).toBe(errorMessage);
    });

  });

  describe('fetchOptionsOfUser', () => {

    it('should fetch options of user successfully', async () => {
      const ownerId = 'user-1';
      const options = [mockOption1, mockOption2];
      mockGetOptionsOfUser.mockResolvedValue(options);

      const dispatch = jest.fn();
      const getState = jest.fn();

      const thunk = fetchOptionsOfUser(ownerId);
      const result = await thunk(dispatch, getState, undefined);

      expect(mockGetOptionsOfUser).toHaveBeenCalledWith(ownerId);
      expect(result.payload).toEqual(options);
    });

    it('should handle errors', async () => {
      const ownerId = 'user-1';
      const errorMessage = 'Failed to fetch user options';
      mockGetOptionsOfUser.mockRejectedValue(new Error(errorMessage));

      const dispatch = jest.fn();
      const getState = jest.fn();

      const thunk = fetchOptionsOfUser(ownerId);
      const result = await thunk(dispatch, getState, undefined);

      expect(mockGetOptionsOfUser).toHaveBeenCalledWith(ownerId);
      expect(result.type).toBe('option/fetchOfUser/rejected');
      expect(result.error.message).toBe(errorMessage);
    });

  });

  describe('createOptionThunk', () => {

    it('should create option successfully', async () => {
      const newOption: Option = {
        creationDate: new Date('2024-01-01'),
        lastUpdateDate: new Date('2024-01-02'),
        ownerId: 'user-1',
        title: 'New Option',
        description: 'New Description',
        imageUrl: null,
        color: null,
      };
      const createdId = 'option-123';
      mockCreateOption.mockResolvedValue(createdId);

      const dispatch = jest.fn();
      const getState = jest.fn();

      const thunk = createOptionThunk(newOption);
      const result = await thunk(dispatch, getState, undefined);

      expect(mockCreateOption).toHaveBeenCalledWith(newOption);
      expect(result.payload).toEqual({ ...newOption, id: createdId });
    });

    it('should handle errors', async () => {
      const newOption: Option = {
        creationDate: new Date('2024-01-01'),
        lastUpdateDate: new Date('2024-01-02'),
        ownerId: 'user-1',
        title: 'New Option',
        description: 'New Description',
        imageUrl: null,
        color: null,
      };
      const errorMessage = 'Failed to create option';
      mockCreateOption.mockRejectedValue(new Error(errorMessage));

      const dispatch = jest.fn();
      const getState = jest.fn();

      const thunk = createOptionThunk(newOption);
      const result = await thunk(dispatch, getState, undefined);

      expect(mockCreateOption).toHaveBeenCalledWith(newOption);
      expect(result.type).toBe('option/create/rejected');
      expect(result.error.message).toBe(errorMessage);
    });

  });

  describe('updateOptionThunk', () => {

    it('should update option successfully', async () => {
      const updatedOption: Option = {
        id: 'option-1',
        creationDate: new Date('2024-01-01'),
        lastUpdateDate: new Date('2024-01-02'),
        ownerId: 'user-1',
        title: 'Updated Title',
        description: 'Updated Description',
        imageUrl: null,
        color: null,
      };
      mockUpdateOption.mockResolvedValue(undefined);

      const dispatch = jest.fn();
      const getState = jest.fn();

      const thunk = updateOptionThunk(updatedOption);
      const result = await thunk(dispatch, getState, undefined);

      expect(mockUpdateOption).toHaveBeenCalledWith(updatedOption);
      expect(result.payload).toEqual(updatedOption);
    });

    it('should handle errors', async () => {
      const updatedOption: Option = {
        id: 'option-1',
        creationDate: new Date('2024-01-01'),
        lastUpdateDate: new Date('2024-01-02'),
        ownerId: 'user-1',
        title: 'Updated Title',
        description: 'Updated Description',
        imageUrl: null,
        color: null,
      };
      const errorMessage = 'Failed to update option';
      mockUpdateOption.mockRejectedValue(new Error(errorMessage));

      const dispatch = jest.fn();
      const getState = jest.fn();

      const thunk = updateOptionThunk(updatedOption);
      const result = await thunk(dispatch, getState, undefined);

      expect(mockUpdateOption).toHaveBeenCalledWith(updatedOption);
      expect(result.type).toBe('option/update/rejected');
      expect(result.error.message).toBe(errorMessage);
    });

  });

  describe('deleteOptionThunk', () => {

    it('should delete option successfully', async () => {
      const optionId = 'option-1';
      mockDeleteOption.mockResolvedValue(undefined);

      const dispatch = jest.fn();
      const getState = jest.fn();

      const thunk = deleteOptionThunk(optionId);
      const result = await thunk(dispatch, getState, undefined);

      expect(mockDeleteOption).toHaveBeenCalledWith(optionId);
      expect(result.payload).toBe(optionId);
    });

    it('should handle errors', async () => {
      const optionId = 'option-1';
      const errorMessage = 'Failed to delete option';
      mockDeleteOption.mockRejectedValue(new Error(errorMessage));

      const dispatch = jest.fn();
      const getState = jest.fn();

      const thunk = deleteOptionThunk(optionId);
      const result = await thunk(dispatch, getState, undefined);

      expect(mockDeleteOption).toHaveBeenCalledWith(optionId);
      expect(result.type).toBe('option/delete/rejected');
      expect(result.error.message).toBe(errorMessage);
    });

  });

});
