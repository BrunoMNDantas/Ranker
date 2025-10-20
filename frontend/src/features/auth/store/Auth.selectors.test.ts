import { RootState } from '../../../app/store';
import {
  selectAuthUserId,
  selectIsAuthenticated,
  selectAuthLoading,
  selectAuthError,
} from './Auth.selectors';

describe('Auth Selectors', () => {

  const createMockState = (authOverrides?: Partial<RootState['auth']>): RootState => {
    return {
      auth: {
        userId: null,
        isAuthenticated: false,
        loading: false,
        error: null,
        ...authOverrides,
      },
    } as RootState;
  };

  describe('selectAuthUserId', () => {

    it('should return null when user is not authenticated', () => {
      const state = createMockState();

      const result = selectAuthUserId(state);

      expect(result).toBeNull();
    });

    it('should return userId when user is authenticated', () => {
      const userId = 'user-123';
      const state = createMockState({ userId });

      const result = selectAuthUserId(state);

      expect(result).toBe(userId);
    });

  });

  describe('selectIsAuthenticated', () => {

    it('should return false when user is not authenticated', () => {
      const state = createMockState({ isAuthenticated: false });

      const result = selectIsAuthenticated(state);

      expect(result).toBe(false);
    });

    it('should return true when user is authenticated', () => {
      const state = createMockState({ isAuthenticated: true });

      const result = selectIsAuthenticated(state);

      expect(result).toBe(true);
    });

  });

  describe('selectAuthLoading', () => {

    it('should return false when not loading', () => {
      const state = createMockState({ loading: false });

      const result = selectAuthLoading(state);

      expect(result).toBe(false);
    });

    it('should return true when loading', () => {
      const state = createMockState({ loading: true });

      const result = selectAuthLoading(state);

      expect(result).toBe(true);
    });

  });

  describe('selectAuthError', () => {

    it('should return null when no error', () => {
      const state = createMockState({ error: null });

      const result = selectAuthError(state);

      expect(result).toBeNull();
    });

    it('should return error message when error exists', () => {
      const errorMessage = 'Authentication failed';
      const state = createMockState({ error: errorMessage });

      const result = selectAuthError(state);

      expect(result).toBe(errorMessage);
    });

  });

});
