import { RootState } from '../../../app/store';
import { optionSelectors as adapterSelectors } from './Option.slice';

// Re-export adapter selectors
export const selectAllOptions = adapterSelectors.selectAll;
export const selectOptionById = adapterSelectors.selectById;
export const selectOptionIds = adapterSelectors.selectIds;

// Custom selectors
export const selectOptionsLoading = (state: RootState): boolean => state.option.loading;
export const selectOptionsError = (state: RootState): string | null => state.option.error;
