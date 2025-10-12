import { RootState } from '../../../app/store';
import { optionSelectors as adapterSelectors } from './Option.slice';
import { Option } from '../model/Option.types';

// Re-export adapter selectors
export const selectAllOptions = adapterSelectors.selectAll;
export const selectOptionById = adapterSelectors.selectById;
export const selectOptionIds = adapterSelectors.selectIds;

// Custom selectors
export const selectOptionsLoading = (state: RootState): boolean => state.option.loading;
export const selectOptionsError = (state: RootState): string | null => state.option.error;

export const selectOptionsByIds = (state: RootState, ids: string[]): Option[] => {
  return ids.map(id => adapterSelectors.selectById(state, id));
};

export const selectOptionsOfRank = (state: RootState, rankId: string): Option[] => {
  return adapterSelectors.selectAll(state).filter(option => option.rankId === rankId);
};

export const selectOptionsOfUser = (state: RootState, userId: string): Option[] => {
  return adapterSelectors.selectAll(state).filter(option => option.ownerId === userId);
};
