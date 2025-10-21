// Mock Firebase/Stores to prevent initialization
jest.mock('../../../services/store/Stores', () => ({
  USER_STORE: {},
}));

import userReducer, {
  setUsers,
  addUser,
  addUsers,
  updateUser,
  updateUsers,
  deleteUser,
  deleteUsers,
  setLoading,
  setError,
} from './User.slice';
import { fetchAllUsers, fetchUserById, fetchUsersByIds, createUserThunk, updateUserThunk, deleteUserThunk } from './User.thunks';
import { User } from '../model/User.types';

describe('User Slice', () => {

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

  const mockUser3: User = {
    id: 'user-3',
    creationDate: new Date('2024-01-05'),
    lastUpdateDate: new Date('2024-01-06'),
    username: 'userthree',
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
      const result = userReducer(undefined, { type: 'unknown' });

      expect(result).toEqual(initialState);
    });

  });

  describe('setUsers', () => {

    it('should replace all users', () => {
      const state = {
        ids: ['user-1'],
        entities: { 'user-1': mockUser1 },
        loading: false,
        error: null,
      };

      const result = userReducer(state, setUsers([mockUser2, mockUser3]));

      expect(result.ids).toEqual(['user-2', 'user-3']);
      expect(result.entities).toEqual({
        'user-2': mockUser2,
        'user-3': mockUser3,
      });
    });

  });

  describe('addUser', () => {

    it('should add a single user', () => {
      const result = userReducer(initialState, addUser(mockUser1));

      expect(result.ids).toEqual(['user-1']);
      expect(result.entities['user-1']).toEqual(mockUser1);
    });

    it('should not duplicate existing user', () => {
      const state = {
        ids: ['user-1'],
        entities: { 'user-1': mockUser1 },
        loading: false,
        error: null,
      };

      const result = userReducer(state, addUser(mockUser1));

      expect(result.ids).toEqual(['user-1']);
    });

  });

  describe('addUsers', () => {

    it('should add multiple users', () => {
      const result = userReducer(initialState, addUsers([mockUser1, mockUser2]));

      expect(result.ids).toEqual(['user-1', 'user-2']);
      expect(result.entities).toEqual({
        'user-1': mockUser1,
        'user-2': mockUser2,
      });
    });

  });

  describe('updateUser', () => {

    it('should update an existing user', () => {
      const state = {
        ids: ['user-1'],
        entities: { 'user-1': mockUser1 },
        loading: false,
        error: null,
      };

      const updatedUser = { id: 'user-1', changes: { username: 'updatedname' } };

      const result = userReducer(state, updateUser(updatedUser));

      expect(result.entities['user-1']?.username).toBe('updatedname');
      expect(result.entities['user-1']?.imageUrl).toBe(mockUser1.imageUrl);
    });

  });

  describe('updateUsers', () => {

    it('should update multiple users', () => {
      const state = {
        ids: ['user-1', 'user-2'],
        entities: {
          'user-1': mockUser1,
          'user-2': mockUser2,
        },
        loading: false,
        error: null,
      };

      const updates = [
        { id: 'user-1', changes: { username: 'updatedone' } },
        { id: 'user-2', changes: { username: 'updatedtwo' } },
      ];

      const result = userReducer(state, updateUsers(updates));

      expect(result.entities['user-1']?.username).toBe('updatedone');
      expect(result.entities['user-2']?.username).toBe('updatedtwo');
    });

  });

  describe('deleteUser', () => {

    it('should remove a user', () => {
      const state = {
        ids: ['user-1', 'user-2'],
        entities: {
          'user-1': mockUser1,
          'user-2': mockUser2,
        },
        loading: false,
        error: null,
      };

      const result = userReducer(state, deleteUser('user-1'));

      expect(result.ids).toEqual(['user-2']);
      expect(result.entities['user-1']).toBeUndefined();
      expect(result.entities['user-2']).toEqual(mockUser2);
    });

  });

  describe('deleteUsers', () => {

    it('should remove multiple users', () => {
      const state = {
        ids: ['user-1', 'user-2', 'user-3'],
        entities: {
          'user-1': mockUser1,
          'user-2': mockUser2,
          'user-3': mockUser3,
        },
        loading: false,
        error: null,
      };

      const result = userReducer(state, deleteUsers(['user-1', 'user-3']));

      expect(result.ids).toEqual(['user-2']);
      expect(result.entities['user-1']).toBeUndefined();
      expect(result.entities['user-3']).toBeUndefined();
      expect(result.entities['user-2']).toEqual(mockUser2);
    });

  });

  describe('setLoading', () => {

    it('should set loading to true', () => {
      const result = userReducer(initialState, setLoading(true));

      expect(result.loading).toBe(true);
    });

    it('should set loading to false', () => {
      const state = { ...initialState, loading: true };

      const result = userReducer(state, setLoading(false));

      expect(result.loading).toBe(false);
    });

  });

  describe('setError', () => {

    it('should set error message', () => {
      const errorMessage = 'Failed to fetch users';

      const result = userReducer(initialState, setError(errorMessage));

      expect(result.error).toBe(errorMessage);
    });

    it('should clear error when null is provided', () => {
      const state = { ...initialState, error: 'Previous error' };

      const result = userReducer(state, setError(null));

      expect(result.error).toBeNull();
    });

  });

  describe('fetchAllUsers extraReducers', () => {

    it('should set loading true on pending', () => {
      const action = { type: fetchAllUsers.pending.type };

      const result = userReducer(initialState, action);

      expect(result.loading).toBe(true);
      expect(result.error).toBeNull();
    });

    it('should set all users on fulfilled', () => {
      const action = {
        type: fetchAllUsers.fulfilled.type,
        payload: [mockUser1, mockUser2],
      };

      const result = userReducer(initialState, action);

      expect(result.loading).toBe(false);
      expect(result.ids).toEqual(['user-1', 'user-2']);
      expect(result.entities).toEqual({
        'user-1': mockUser1,
        'user-2': mockUser2,
      });
    });

    it('should set error on rejected', () => {
      const action = {
        type: fetchAllUsers.rejected.type,
        error: { message: 'Network error' },
      };

      const result = userReducer(initialState, action);

      expect(result.loading).toBe(false);
      expect(result.error).toBe('Network error');
    });

  });

  describe('fetchUserById extraReducers', () => {

    it('should set loading true on pending', () => {
      const action = { type: fetchUserById.pending.type };

      const result = userReducer(initialState, action);

      expect(result.loading).toBe(true);
      expect(result.error).toBeNull();
    });

    it('should upsert user on fulfilled', () => {
      const action = {
        type: fetchUserById.fulfilled.type,
        payload: mockUser1,
      };

      const result = userReducer(initialState, action);

      expect(result.loading).toBe(false);
      expect(result.entities['user-1']).toEqual(mockUser1);
    });

    it('should not add user when payload is null', () => {
      const action = {
        type: fetchUserById.fulfilled.type,
        payload: null,
      };

      const result = userReducer(initialState, action);

      expect(result.loading).toBe(false);
      expect(result.ids).toEqual([]);
    });

    it('should set error on rejected', () => {
      const action = {
        type: fetchUserById.rejected.type,
        error: { message: 'User not found' },
      };

      const result = userReducer(initialState, action);

      expect(result.loading).toBe(false);
      expect(result.error).toBe('User not found');
    });

  });

  describe('fetchUsersByIds extraReducers', () => {

    it('should set loading true on pending', () => {
      const action = { type: fetchUsersByIds.pending.type };

      const result = userReducer(initialState, action);

      expect(result.loading).toBe(true);
      expect(result.error).toBeNull();
    });

    it('should upsert multiple users on fulfilled', () => {
      const action = {
        type: fetchUsersByIds.fulfilled.type,
        payload: [mockUser1, mockUser2],
      };

      const result = userReducer(initialState, action);

      expect(result.loading).toBe(false);
      expect(result.ids).toEqual(['user-1', 'user-2']);
      expect(result.entities).toEqual({
        'user-1': mockUser1,
        'user-2': mockUser2,
      });
    });

    it('should set error on rejected', () => {
      const action = {
        type: fetchUsersByIds.rejected.type,
        error: { message: 'Failed to fetch users' },
      };

      const result = userReducer(initialState, action);

      expect(result.loading).toBe(false);
      expect(result.error).toBe('Failed to fetch users');
    });

  });

  describe('createUserThunk extraReducers', () => {

    it('should set loading true on pending', () => {
      const action = { type: createUserThunk.pending.type };

      const result = userReducer(initialState, action);

      expect(result.loading).toBe(true);
      expect(result.error).toBeNull();
    });

    it('should add new user on fulfilled', () => {
      const action = {
        type: createUserThunk.fulfilled.type,
        payload: mockUser1,
      };

      const result = userReducer(initialState, action);

      expect(result.loading).toBe(false);
      expect(result.entities['user-1']).toEqual(mockUser1);
    });

    it('should set error on rejected', () => {
      const action = {
        type: createUserThunk.rejected.type,
        error: { message: 'Failed to create user' },
      };

      const result = userReducer(initialState, action);

      expect(result.loading).toBe(false);
      expect(result.error).toBe('Failed to create user');
    });

  });

  describe('updateUserThunk extraReducers', () => {

    it('should set loading true on pending', () => {
      const action = { type: updateUserThunk.pending.type };

      const result = userReducer(initialState, action);

      expect(result.loading).toBe(true);
      expect(result.error).toBeNull();
    });

    it('should upsert updated user on fulfilled', () => {
      const state = {
        ids: ['user-1'],
        entities: { 'user-1': mockUser1 },
        loading: false,
        error: null,
      };

      const updatedUser = { ...mockUser1, username: 'updatedname' };
      const action = {
        type: updateUserThunk.fulfilled.type,
        payload: updatedUser,
      };

      const result = userReducer(state, action);

      expect(result.loading).toBe(false);
      expect(result.entities['user-1']?.username).toBe('updatedname');
    });

    it('should set error on rejected', () => {
      const action = {
        type: updateUserThunk.rejected.type,
        error: { message: 'Failed to update user' },
      };

      const result = userReducer(initialState, action);

      expect(result.loading).toBe(false);
      expect(result.error).toBe('Failed to update user');
    });

  });

  describe('deleteUserThunk extraReducers', () => {

    it('should set loading true on pending', () => {
      const action = { type: deleteUserThunk.pending.type };

      const result = userReducer(initialState, action);

      expect(result.loading).toBe(true);
      expect(result.error).toBeNull();
    });

    it('should remove user on fulfilled', () => {
      const state = {
        ids: ['user-1', 'user-2'],
        entities: {
          'user-1': mockUser1,
          'user-2': mockUser2,
        },
        loading: false,
        error: null,
      };

      const action = {
        type: deleteUserThunk.fulfilled.type,
        payload: 'user-1',
      };

      const result = userReducer(state, action);

      expect(result.loading).toBe(false);
      expect(result.ids).toEqual(['user-2']);
      expect(result.entities['user-1']).toBeUndefined();
    });

    it('should set error on rejected', () => {
      const action = {
        type: deleteUserThunk.rejected.type,
        error: { message: 'Failed to delete user' },
      };

      const result = userReducer(initialState, action);

      expect(result.loading).toBe(false);
      expect(result.error).toBe('Failed to delete user');
    });

  });

});
