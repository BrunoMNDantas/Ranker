import authReducer, { setUser, setLoading, setError, logout } from './Auth.slice';

describe('Auth Slice', () => {

  const initialState = {
    userId: null,
    isAuthenticated: false,
    loading: true,
    error: null,
  };

  describe('reducer', () => {

    it('should return the initial state', () => {
      const result = authReducer(undefined, { type: 'unknown' });

      expect(result).toEqual(initialState);
    });

  });

  describe('setUser', () => {

    it('should set userId, mark as authenticated, and stop loading when userId is provided', () => {
      const userId = 'user-123';

      const result = authReducer(initialState, setUser(userId));

      expect(result.userId).toBe(userId);
      expect(result.isAuthenticated).toBe(true);
      expect(result.loading).toBe(false);
    });

    it('should set userId to null, mark as not authenticated, and stop loading when null is provided', () => {
      const state = {
        userId: 'user-123',
        isAuthenticated: true,
        loading: false,
        error: null,
      };

      const result = authReducer(state, setUser(null));

      expect(result.userId).toBeNull();
      expect(result.isAuthenticated).toBe(false);
      expect(result.loading).toBe(false);
    });

  });

  describe('setLoading', () => {

    it('should set loading to true', () => {
      const state = { ...initialState, loading: false };

      const result = authReducer(state, setLoading(true));

      expect(result.loading).toBe(true);
    });

    it('should set loading to false', () => {
      const state = { ...initialState, loading: true };

      const result = authReducer(state, setLoading(false));

      expect(result.loading).toBe(false);
    });

  });

  describe('setError', () => {

    it('should set error message', () => {
      const errorMessage = 'Authentication failed';

      const result = authReducer(initialState, setError(errorMessage));

      expect(result.error).toBe(errorMessage);
    });

    it('should clear error when null is provided', () => {
      const state = { ...initialState, error: 'Previous error' };

      const result = authReducer(state, setError(null));

      expect(result.error).toBeNull();
    });

  });

  describe('logout', () => {

    it('should reset userId, authentication status, and stop loading', () => {
      const state = {
        userId: 'user-123',
        isAuthenticated: true,
        loading: true,
        error: 'Some error',
      };

      const result = authReducer(state, logout());

      expect(result.userId).toBeNull();
      expect(result.isAuthenticated).toBe(false);
      expect(result.loading).toBe(false);
      expect(result.error).toBe('Some error');
    });

    it('should not clear error on logout', () => {
      const errorMessage = 'Authentication error';
      const state = {
        userId: 'user-123',
        isAuthenticated: true,
        loading: false,
        error: errorMessage,
      };

      const result = authReducer(state, logout());

      expect(result.error).toBe(errorMessage);
    });

  });

});
