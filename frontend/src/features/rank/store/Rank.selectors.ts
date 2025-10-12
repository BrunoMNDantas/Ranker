import { RootState } from '../../../app/store';
import { rankSelectors as adapterSelectors } from './Rank.slice';
import { Rank } from '../model/Rank.types';

// Re-export adapter selectors
export const selectAllRanks = adapterSelectors.selectAll;
export const selectRankById = adapterSelectors.selectById;
export const selectRankIds = adapterSelectors.selectIds;

// Custom selectors
export const selectRanksLoading = (state: RootState): boolean => state.rank.loading;
export const selectRanksError = (state: RootState): string | null => state.rank.error;

export const selectRanksByIds = (state: RootState, ids: string[]): Rank[] => {
  return ids.map(id => adapterSelectors.selectById(state, id));
};

export const selectRanksOfUser = (state: RootState, userId: string): Rank[] => {
  return adapterSelectors.selectAll(state).filter(rank => rank.ownerId === userId);
};
