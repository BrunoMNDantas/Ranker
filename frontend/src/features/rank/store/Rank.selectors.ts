import { RootState } from '../../../app/store';
import { rankSelectors as adapterSelectors } from './Rank.slice';

// Re-export adapter selectors
export const selectAllRanks = adapterSelectors.selectAll;
export const selectRankById = adapterSelectors.selectById;
export const selectRankIds = adapterSelectors.selectIds;

// Custom selectors
export const selectRanksLoading = (state: RootState): boolean => state.rank.loading;
export const selectRanksError = (state: RootState): string | null => state.rank.error;
