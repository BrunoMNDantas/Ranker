// Mock Firebase/Stores to prevent initialization
jest.mock('../../../services/store/Stores', () => ({
  USER_STORE: {},
}));

import { RootState } from '../../../app/store';
import {
  selectAllUsers,
  selectUserById,
  selectUserIds,
  selectUsersLoading,
  selectUsersError,
  selectUsersByIds,
} from './User.selectors';
import { User } from '../model/User.types';

describe('User Selectors', () => {

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

  const createMockState = (overrides?: Partial<RootState['user']>): RootState => {
    return {
      user: {
        ids: [],
        entities: {},
        loading: false,
        error: null,
        ...overrides,
      },
    } as RootState;
  };

  describe('selectAllUsers', () => {

    it('should return empty array when no users exist', () => {
      const state = createMockState();

      const result = selectAllUsers(state);

      expect(result).toEqual([]);
    });

    it('should return all users', () => {
      const state = createMockState({
        ids: ['user-1', 'user-2'],
        entities: {
          'user-1': mockUser1,
          'user-2': mockUser2,
        },
      });

      const result = selectAllUsers(state);

      expect(result).toEqual([mockUser1, mockUser2]);
    });

  });

  describe('selectUserById', () => {

    it('should return undefined when user does not exist', () => {
      const state = createMockState();

      const result = selectUserById(state, 'non-existent');

      expect(result).toBeUndefined();
    });

    it('should return user when it exists', () => {
      const state = createMockState({
        ids: ['user-1'],
        entities: {
          'user-1': mockUser1,
        },
      });

      const result = selectUserById(state, 'user-1');

      expect(result).toEqual(mockUser1);
    });

  });

  describe('selectUserIds', () => {

    it('should return empty array when no users exist', () => {
      const state = createMockState();

      const result = selectUserIds(state);

      expect(result).toEqual([]);
    });

    it('should return all user ids', () => {
      const state = createMockState({
        ids: ['user-1', 'user-2', 'user-3'],
        entities: {
          'user-1': mockUser1,
          'user-2': mockUser2,
          'user-3': mockUser3,
        },
      });

      const result = selectUserIds(state);

      expect(result).toEqual(['user-1', 'user-2', 'user-3']);
    });

  });

  describe('selectUsersLoading', () => {

    it('should return false when not loading', () => {
      const state = createMockState({ loading: false });

      const result = selectUsersLoading(state);

      expect(result).toBe(false);
    });

    it('should return true when loading', () => {
      const state = createMockState({ loading: true });

      const result = selectUsersLoading(state);

      expect(result).toBe(true);
    });

  });

  describe('selectUsersError', () => {

    it('should return null when no error', () => {
      const state = createMockState({ error: null });

      const result = selectUsersError(state);

      expect(result).toBeNull();
    });

    it('should return error message when error exists', () => {
      const errorMessage = 'Failed to fetch users';
      const state = createMockState({ error: errorMessage });

      const result = selectUsersError(state);

      expect(result).toBe(errorMessage);
    });

  });

  describe('selectUsersByIds', () => {

    it('should return empty array when ids array is empty', () => {
      const state = createMockState({
        ids: ['user-1', 'user-2'],
        entities: {
          'user-1': mockUser1,
          'user-2': mockUser2,
        },
      });

      const result = selectUsersByIds(state, []);

      expect(result).toEqual([]);
    });

    it('should return array with undefined for non-existent users', () => {
      const state = createMockState();

      const result = selectUsersByIds(state, ['user-1', 'user-2']);

      expect(result).toEqual([undefined, undefined]);
    });

    it('should return requested users', () => {
      const state = createMockState({
        ids: ['user-1', 'user-2', 'user-3'],
        entities: {
          'user-1': mockUser1,
          'user-2': mockUser2,
          'user-3': mockUser3,
        },
      });

      const result = selectUsersByIds(state, ['user-1', 'user-3']);

      expect(result).toEqual([mockUser1, mockUser3]);
    });

    it('should handle mix of existing and non-existing users', () => {
      const state = createMockState({
        ids: ['user-1'],
        entities: {
          'user-1': mockUser1,
        },
      });

      const result = selectUsersByIds(state, ['user-1', 'non-existent']);

      expect(result).toEqual([mockUser1, undefined]);
    });

  });

});
