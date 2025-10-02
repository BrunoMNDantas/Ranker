import { RootState } from '../../../app/store';

export const selectAuthUserId = (state: RootState): string | null => state.auth.userId;

export const selectIsAuthenticated = (state: RootState): boolean => state.auth.isAuthenticated;

export const selectAuthLoading = (state: RootState): boolean => state.auth.loading;

export const selectAuthError = (state: RootState): string | null => state.auth.error;
