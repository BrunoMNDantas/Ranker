import { RootState } from '../../../app/store';
import { tierSelectors as adapterSelectors } from './Tier.slice';
import { Tier } from '../model/Tier.types';

// Re-export adapter selectors
export const selectAllTiers = adapterSelectors.selectAll;
export const selectTierById = adapterSelectors.selectById;
export const selectTierIds = adapterSelectors.selectIds;

// Custom selectors
export const selectTiersLoading = (state: RootState): boolean => state.tier.loading;
export const selectTiersError = (state: RootState): string | null => state.tier.error;

export const selectTiersByIds = (state: RootState, ids: string[]): Tier[] => {
  return ids.map(id => adapterSelectors.selectById(state, id));
};

export const selectTiersOfRank = (state: RootState, rankId: string): Tier[] => {
  return adapterSelectors.selectAll(state).filter(tier => tier.rankId === rankId);
};

export const selectTiersOfUser = (state: RootState, userId: string): Tier[] => {
  return adapterSelectors.selectAll(state).filter(tier => tier.ownerId === userId);
};
