import { RootState } from '../../../app/store';
import { voteSelectors as adapterSelectors } from './Vote.slice';
import { Vote } from '../model/Vote.types';

// Re-export adapter selectors
export const selectAllVotes = adapterSelectors.selectAll;
export const selectVoteById = adapterSelectors.selectById;
export const selectVoteIds = adapterSelectors.selectIds;

// Custom selectors
export const selectVotesLoading = (state: RootState): boolean => state.vote.loading;
export const selectVotesError = (state: RootState): string | null => state.vote.error;

export const selectVotesByIds = (state: RootState, ids: string[]): Vote[] => {
  return ids.map(id => adapterSelectors.selectById(state, id));
};

export const selectVotesOfRank = (state: RootState, rankId: string): Vote[] => {
  return adapterSelectors.selectAll(state).filter(vote => vote.rankId === rankId);
};

export const selectVotesOfUser = (state: RootState, userId: string): Vote[] => {
  return adapterSelectors.selectAll(state).filter(vote => vote.ownerId === userId);
};
