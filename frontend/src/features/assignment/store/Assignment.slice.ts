import { createSlice, createEntityAdapter, PayloadAction } from '@reduxjs/toolkit';
import { Assignment } from '../model/Assignment.types';
import { RootState } from '../../../app/store';

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
});

export const { setAssignments, addAssignment, addAssignments, updateAssignment, updateAssignments, deleteAssignment, deleteAssignments, setLoading, setError } = assignmentSlice.actions;

export const assignmentSelectors = assignmentAdapter.getSelectors<RootState>((state) => state.assignment);

export default assignmentSlice.reducer;
