import { RootState } from '../../../app/store';
import { tierSelectors as adapterSelectors } from './Tier.slice';

// Re-export adapter selectors
export const selectAllTiers = adapterSelectors.selectAll;
export const selectTierById = adapterSelectors.selectById;
export const selectTierIds = adapterSelectors.selectIds;

// Custom selectors
export const selectTiersLoading = (state: RootState): boolean => state.tier.loading;
export const selectTiersError = (state: RootState): string | null => state.tier.error;
