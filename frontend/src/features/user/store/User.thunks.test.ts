// Mock Firebase/Stores to prevent initialization
jest.mock('../../../services/store/Stores', () => ({
  USER_STORE: {},
}));

// Mock the API
const mockGetAllUsers = jest.fn();
const mockGetUser = jest.fn();
const mockGetUsersByIds = jest.fn();
const mockCreateUser = jest.fn();
const mockUpdateUser = jest.fn();
const mockDeleteUser = jest.fn();

jest.mock('../api/User.api', () => ({
  getAllUsers: (...args: any[]) => mockGetAllUsers(...args),
  getUser: (...args: any[]) => mockGetUser(...args),
  getUsersByIds: (...args: any[]) => mockGetUsersByIds(...args),
  createUser: (...args: any[]) => mockCreateUser(...args),
  updateUser: (...args: any[]) => mockUpdateUser(...args),
  deleteUser: (...args: any[]) => mockDeleteUser(...args),
}));

import { fetchAllUsers, fetchUserById, fetchUsersByIds, createUserThunk, updateUserThunk, deleteUserThunk } from './User.thunks';
import { User } from '../model/User.types';

describe('User Thunks', () => {

  const mockUser1: User = {
    id: 'user-1',
    creationDate: new Date('2024-01-01'),
    lastUpdateDate: new Date('2024-01-02'),
    username: 'userone',
    imageUrl: null,
    color: null,
  };

  const mockUser2: User = {
    id: 'user-2',
    creationDate: new Date('2024-01-03'),
    lastUpdateDate: new Date('2024-01-04'),
    username: 'usertwo',
    imageUrl: null,
    color: null,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('fetchAllUsers', () => {

    it('should fetch all users successfully', async () => {
      const users = [mockUser1, mockUser2];
      mockGetAllUsers.mockResolvedValue(users);

      const dispatch = jest.fn();
      const getState = jest.fn();

      const thunk = fetchAllUsers();
      const result = await thunk(dispatch, getState, undefined);

      expect(mockGetAllUsers).toHaveBeenCalledTimes(1);
      expect(result.payload).toEqual(users);
    });

    it('should handle errors', async () => {
      const errorMessage = 'Network error';
      mockGetAllUsers.mockRejectedValue(new Error(errorMessage));

      const dispatch = jest.fn();
      const getState = jest.fn();

      const thunk = fetchAllUsers();
      const result = await thunk(dispatch, getState, undefined);

      expect(mockGetAllUsers).toHaveBeenCalledTimes(1);
      expect(result.type).toBe('user/fetchAll/rejected');
      expect('error' in result && result.error.message).toBe(errorMessage);
    });

  });

  describe('fetchUserById', () => {

    it('should fetch user by id successfully', async () => {
      const userId = 'user-1';
      mockGetUser.mockResolvedValue(mockUser1);

      const dispatch = jest.fn();
      const getState = jest.fn();

      const thunk = fetchUserById(userId);
      const result = await thunk(dispatch, getState, undefined);

      expect(mockGetUser).toHaveBeenCalledWith(userId);
      expect(result.payload).toEqual(mockUser1);
    });

    it('should handle errors', async () => {
      const userId = 'user-1';
      const errorMessage = 'User not found';
      mockGetUser.mockRejectedValue(new Error(errorMessage));

      const dispatch = jest.fn();
      const getState = jest.fn();

      const thunk = fetchUserById(userId);
      const result = await thunk(dispatch, getState, undefined);

      expect(mockGetUser).toHaveBeenCalledWith(userId);
      expect(result.type).toBe('user/fetchById/rejected');
      expect('error' in result && result.error.message).toBe(errorMessage);
    });

  });

  describe('fetchUsersByIds', () => {

    it('should fetch multiple users by ids successfully', async () => {
      const userIds = ['user-1', 'user-2'];
      const users = [mockUser1, mockUser2];
      mockGetUsersByIds.mockResolvedValue(users);

      const dispatch = jest.fn();
      const getState = jest.fn();

      const thunk = fetchUsersByIds(userIds);
      const result = await thunk(dispatch, getState, undefined);

      expect(mockGetUsersByIds).toHaveBeenCalledWith(userIds);
      expect(result.payload).toEqual(users);
    });

    it('should handle errors', async () => {
      const userIds = ['user-1', 'user-2'];
      const errorMessage = 'Failed to fetch users';
      mockGetUsersByIds.mockRejectedValue(new Error(errorMessage));

      const dispatch = jest.fn();
      const getState = jest.fn();

      const thunk = fetchUsersByIds(userIds);
      const result = await thunk(dispatch, getState, undefined);

      expect(mockGetUsersByIds).toHaveBeenCalledWith(userIds);
      expect(result.type).toBe('user/fetchByIds/rejected');
      expect('error' in result && result.error.message).toBe(errorMessage);
    });

  });

  describe('createUserThunk', () => {

    it('should create user successfully', async () => {
      const newUser: User = {
        id: '',
        creationDate: new Date('2024-01-01'),
        lastUpdateDate: new Date('2024-01-02'),
        username: 'newuser',
        imageUrl: null,
        color: null,
      };
      const createdId = 'user-123';
      mockCreateUser.mockResolvedValue(createdId);

      const dispatch = jest.fn();
      const getState = jest.fn();

      const thunk = createUserThunk(newUser);
      const result = await thunk(dispatch, getState, undefined);

      expect(mockCreateUser).toHaveBeenCalledWith(newUser);
      expect(result.payload).toEqual({ ...newUser, id: createdId });
    });

    it('should handle errors', async () => {
      const newUser: User = {
        id: '',
        creationDate: new Date('2024-01-01'),
        lastUpdateDate: new Date('2024-01-02'),
        username: 'newuser',
        imageUrl: null,
        color: null,
      };
      const errorMessage = 'Failed to create user';
      mockCreateUser.mockRejectedValue(new Error(errorMessage));

      const dispatch = jest.fn();
      const getState = jest.fn();

      const thunk = createUserThunk(newUser);
      const result = await thunk(dispatch, getState, undefined);

      expect(mockCreateUser).toHaveBeenCalledWith(newUser);
      expect(result.type).toBe('user/create/rejected');
      expect('error' in result && result.error.message).toBe(errorMessage);
    });

  });

  describe('updateUserThunk', () => {

    it('should update user successfully', async () => {
      const updatedUser: User = {
        id: 'user-1',
        creationDate: new Date('2024-01-01'),
        lastUpdateDate: new Date('2024-01-02'),
        username: 'updateduser',
        imageUrl: null,
        color: null,
      };
      mockUpdateUser.mockResolvedValue(undefined);

      const dispatch = jest.fn();
      const getState = jest.fn();

      const thunk = updateUserThunk(updatedUser);
      const result = await thunk(dispatch, getState, undefined);

      expect(mockUpdateUser).toHaveBeenCalledWith(updatedUser);
      expect(result.payload).toEqual(updatedUser);
    });

    it('should handle errors', async () => {
      const updatedUser: User = {
        id: 'user-1',
        creationDate: new Date('2024-01-01'),
        lastUpdateDate: new Date('2024-01-02'),
        username: 'updateduser',
        imageUrl: null,
        color: null,
      };
      const errorMessage = 'Failed to update user';
      mockUpdateUser.mockRejectedValue(new Error(errorMessage));

      const dispatch = jest.fn();
      const getState = jest.fn();

      const thunk = updateUserThunk(updatedUser);
      const result = await thunk(dispatch, getState, undefined);

      expect(mockUpdateUser).toHaveBeenCalledWith(updatedUser);
      expect(result.type).toBe('user/update/rejected');
      expect('error' in result && result.error.message).toBe(errorMessage);
    });

  });

  describe('deleteUserThunk', () => {

    it('should delete user successfully', async () => {
      const userId = 'user-1';
      mockDeleteUser.mockResolvedValue(undefined);

      const dispatch = jest.fn();
      const getState = jest.fn();

      const thunk = deleteUserThunk(userId);
      const result = await thunk(dispatch, getState, undefined);

      expect(mockDeleteUser).toHaveBeenCalledWith(userId);
      expect(result.payload).toBe(userId);
    });

    it('should handle errors', async () => {
      const userId = 'user-1';
      const errorMessage = 'Failed to delete user';
      mockDeleteUser.mockRejectedValue(new Error(errorMessage));

      const dispatch = jest.fn();
      const getState = jest.fn();

      const thunk = deleteUserThunk(userId);
      const result = await thunk(dispatch, getState, undefined);

      expect(mockDeleteUser).toHaveBeenCalledWith(userId);
      expect(result.type).toBe('user/delete/rejected');
      expect('error' in result && result.error.message).toBe(errorMessage);
    });

  });

});
