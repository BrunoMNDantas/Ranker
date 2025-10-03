import { createSlice, createEntityAdapter, PayloadAction } from '@reduxjs/toolkit';
import { Option } from '../model/Option.types';
import { RootState } from '../../../app/store';
import { fetchAllOptions, fetchOptionById, fetchOptionsOfRank, fetchOptionsOfUser, createOptionThunk, updateOptionThunk, deleteOptionThunk } from './Option.thunks';

const optionAdapter = createEntityAdapter<Option>();

interface OptionState {
    loading: boolean;
    error: string | null;
}

const initialState = optionAdapter.getInitialState<OptionState>({
    loading: false,
    error: null,
});

const optionSlice = createSlice({
    name: 'option',
    initialState,
    reducers: {
        setOptions: optionAdapter.setAll,
        addOption: optionAdapter.addOne,
        addOptions: optionAdapter.addMany,
        updateOption: optionAdapter.updateOne,
        updateOptions: optionAdapter.updateMany,
        deleteOption: optionAdapter.removeOne,
        deleteOptions: optionAdapter.removeMany,
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch all options
            .addCase(fetchAllOptions.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllOptions.fulfilled, (state, action) => {
                optionAdapter.setAll(state, action.payload);
                state.loading = false;
            })
            .addCase(fetchAllOptions.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch options';
            })
            // Fetch option by id
            .addCase(fetchOptionById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchOptionById.fulfilled, (state, action) => {
                if (action.payload) {
                    optionAdapter.upsertOne(state, action.payload);
                }
                state.loading = false;
            })
            .addCase(fetchOptionById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch option';
            })
            // Fetch options of rank
            .addCase(fetchOptionsOfRank.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchOptionsOfRank.fulfilled, (state, action) => {
                optionAdapter.setAll(state, action.payload);
                state.loading = false;
            })
            .addCase(fetchOptionsOfRank.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch rank options';
            })
            // Fetch options of user
            .addCase(fetchOptionsOfUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchOptionsOfUser.fulfilled, (state, action) => {
                optionAdapter.setAll(state, action.payload);
                state.loading = false;
            })
            .addCase(fetchOptionsOfUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch user options';
            })
            // Create option
            .addCase(createOptionThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createOptionThunk.fulfilled, (state, action) => {
                optionAdapter.addOne(state, action.payload);
                state.loading = false;
            })
            .addCase(createOptionThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to create option';
            })
            // Update option
            .addCase(updateOptionThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateOptionThunk.fulfilled, (state, action) => {
                optionAdapter.upsertOne(state, action.payload);
                state.loading = false;
            })
            .addCase(updateOptionThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to update option';
            })
            // Delete option
            .addCase(deleteOptionThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteOptionThunk.fulfilled, (state, action) => {
                optionAdapter.removeOne(state, action.payload);
                state.loading = false;
            })
            .addCase(deleteOptionThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to delete option';
            });
    },
});

export const { setOptions, addOption, addOptions, updateOption, updateOptions, deleteOption, deleteOptions, setLoading, setError } = optionSlice.actions;

export const optionSelectors = optionAdapter.getSelectors<RootState>((state) => state.option);

export default optionSlice.reducer;
