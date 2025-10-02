import { RootState } from '../../../app/store';
import { voteSelectors as adapterSelectors } from './Vote.slice';

// Re-export adapter selectors
export const selectAllVotes = adapterSelectors.selectAll;
export const selectVoteById = adapterSelectors.selectById;
export const selectVoteIds = adapterSelectors.selectIds;

// Custom selectors
export const selectVotesLoading = (state: RootState): boolean => state.vote.loading;
export const selectVotesError = (state: RootState): string | null => state.vote.error;
