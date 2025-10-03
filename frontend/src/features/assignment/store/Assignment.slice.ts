import { createSlice, createEntityAdapter, PayloadAction } from '@reduxjs/toolkit';
import { Assignment } from '../model/Assignment.types';
import { RootState } from '../../../app/store';
import {
    fetchAllAssignments,
    fetchAssignmentById,
    fetchAssignmentsOfVote,
    fetchAssignmentsOfTier,
    fetchAssignmentsOfOption,
    fetchAssignmentsOfUser,
    createAssignmentThunk,
    updateAssignmentThunk,
    deleteAssignmentThunk
} from './Assignment.thunks';

const assignmentAdapter = createEntityAdapter<Assignment>();

interface AssignmentState {
    loading: boolean;
    error: string | null;
}

const initialState = assignmentAdapter.getInitialState<AssignmentState>({
    loading: false,
    error: null,
});

const assignmentSlice = createSlice({
    name: 'assignment',
    initialState,
    reducers: {
        setAssignments: assignmentAdapter.setAll,
        addAssignment: assignmentAdapter.addOne,
        addAssignments: assignmentAdapter.addMany,
        updateAssignment: assignmentAdapter.updateOne,
        updateAssignments: assignmentAdapter.updateMany,
        deleteAssignment: assignmentAdapter.removeOne,
        deleteAssignments: assignmentAdapter.removeMany,
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch all assignments
            .addCase(fetchAllAssignments.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllAssignments.fulfilled, (state, action) => {
                assignmentAdapter.setAll(state, action.payload);
                state.loading = false;
            })
            .addCase(fetchAllAssignments.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch assignments';
            })
            // Fetch assignment by id
            .addCase(fetchAssignmentById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAssignmentById.fulfilled, (state, action) => {
                if (action.payload) {
                    assignmentAdapter.upsertOne(state, action.payload);
                }
                state.loading = false;
            })
            .addCase(fetchAssignmentById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch assignment';
            })
            // Fetch assignments of vote
            .addCase(fetchAssignmentsOfVote.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAssignmentsOfVote.fulfilled, (state, action) => {
                assignmentAdapter.setAll(state, action.payload);
                state.loading = false;
            })
            .addCase(fetchAssignmentsOfVote.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch vote assignments';
            })
            // Fetch assignments of tier
            .addCase(fetchAssignmentsOfTier.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAssignmentsOfTier.fulfilled, (state, action) => {
                assignmentAdapter.setAll(state, action.payload);
                state.loading = false;
            })
            .addCase(fetchAssignmentsOfTier.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch tier assignments';
            })
            // Fetch assignments of option
            .addCase(fetchAssignmentsOfOption.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAssignmentsOfOption.fulfilled, (state, action) => {
                assignmentAdapter.setAll(state, action.payload);
                state.loading = false;
            })
            .addCase(fetchAssignmentsOfOption.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch option assignments';
            })
            // Fetch assignments of user
            .addCase(fetchAssignmentsOfUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAssignmentsOfUser.fulfilled, (state, action) => {
                assignmentAdapter.setAll(state, action.payload);
                state.loading = false;
            })
            .addCase(fetchAssignmentsOfUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch user assignments';
            })
            // Create assignment
            .addCase(createAssignmentThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createAssignmentThunk.fulfilled, (state, action) => {
                assignmentAdapter.addOne(state, action.payload);
                state.loading = false;
            })
            .addCase(createAssignmentThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to create assignment';
            })
            // Update assignment
            .addCase(updateAssignmentThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateAssignmentThunk.fulfilled, (state, action) => {
                assignmentAdapter.upsertOne(state, action.payload);
                state.loading = false;
            })
            .addCase(updateAssignmentThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to update assignment';
            })
            // Delete assignment
            .addCase(deleteAssignmentThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteAssignmentThunk.fulfilled, (state, action) => {
                assignmentAdapter.removeOne(state, action.payload);
                state.loading = false;
            })
            .addCase(deleteAssignmentThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to delete assignment';
            });
    },
});

export const { setAssignments, addAssignment, addAssignments, updateAssignment, updateAssignments, deleteAssignment, deleteAssignments, setLoading, setError } = assignmentSlice.actions;

export const assignmentSelectors = assignmentAdapter.getSelectors<RootState>((state) => state.assignment);

export default assignmentSlice.reducer;
