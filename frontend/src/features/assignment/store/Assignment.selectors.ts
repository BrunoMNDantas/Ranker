import { RootState } from '../../../app/store';
import { assignmentSelectors as adapterSelectors } from './Assignment.slice';

// Re-export adapter selectors
export const selectAllAssignments = adapterSelectors.selectAll;
export const selectAssignmentById = adapterSelectors.selectById;
export const selectAssignmentIds = adapterSelectors.selectIds;

// Custom selectors
export const selectAssignmentsLoading = (state: RootState): boolean => state.assignment.loading;
export const selectAssignmentsError = (state: RootState): string | null => state.assignment.error;
