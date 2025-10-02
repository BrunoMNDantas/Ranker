import { RootState } from '../../../app/store';
import { userSelectors as adapterSelectors } from './User.slice';

// Re-export adapter selectors
export const selectAllUsers = adapterSelectors.selectAll;
export const selectUserById = adapterSelectors.selectById;
export const selectUserIds = adapterSelectors.selectIds;

// Custom selectors
export const selectUsersLoading = (state: RootState): boolean => state.user.loading;
export const selectUsersError = (state: RootState): string | null => state.user.error;
