import { RootState } from '../../../app/store';
import { assignmentSelectors as adapterSelectors } from './Assignment.slice';
import { Assignment } from '../model/Assignment.types';

// Re-export adapter selectors
export const selectAllAssignments = adapterSelectors.selectAll;
export const selectAssignmentById = adapterSelectors.selectById;
export const selectAssignmentIds = adapterSelectors.selectIds;

// Custom selectors
export const selectAssignmentsLoading = (state: RootState): boolean => state.assignment.loading;
export const selectAssignmentsError = (state: RootState): string | null => state.assignment.error;

export const selectAssignmentsByIds = (state: RootState, ids: string[]): Assignment[] => {
  return ids.map(id => adapterSelectors.selectById(state, id));
};

export const selectAssignmentsOfVote = (state: RootState, voteId: string): Assignment[] => {
  return adapterSelectors.selectAll(state).filter(assignment => assignment.voteId === voteId);
};

export const selectAssignmentsOfOption = (state: RootState, optionId: string): Assignment[] => {
  return adapterSelectors.selectAll(state).filter(assignment => assignment.optionId === optionId);
};

export const selectAssignmentsOfTier = (state: RootState, tierId: string): Assignment[] => {
  return adapterSelectors.selectAll(state).filter(assignment => assignment.tierId === tierId);
};

export const selectAssignmentsOfUser = (state: RootState, userId: string): Assignment[] => {
  return adapterSelectors.selectAll(state).filter(assignment => assignment.ownerId === userId);
};
