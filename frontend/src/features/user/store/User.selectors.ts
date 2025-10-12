import { RootState } from '../../../app/store';
import { userSelectors as adapterSelectors } from './User.slice';
import { User } from '../model/User.types';

// Re-export adapter selectors
export const selectAllUsers = adapterSelectors.selectAll;
export const selectUserById = adapterSelectors.selectById;
export const selectUserIds = adapterSelectors.selectIds;

// Custom selectors
export const selectUsersLoading = (state: RootState): boolean => state.user.loading;
export const selectUsersError = (state: RootState): string | null => state.user.error;

export const selectUsersByIds = (state: RootState, ids: string[]): User[] => {
  return ids.map(id => adapterSelectors.selectById(state, id));
};
