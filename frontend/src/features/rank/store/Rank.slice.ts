import { createSlice, createEntityAdapter, PayloadAction } from '@reduxjs/toolkit';
import { Rank } from '../model/Rank.types';
import { RootState } from '../../../app/store';
import { fetchAllRanks, fetchRankById, fetchRanksByIds, fetchRanksOfUser, createRankThunk, updateRankThunk, deleteRankThunk } from './Rank.thunks';

const rankAdapter = createEntityAdapter<Rank>();

interface RankState {
    loading: boolean;
    error: string | null;
}

const initialState = rankAdapter.getInitialState<RankState>({
    loading: false,
    error: null,
});

const rankSlice = createSlice({
    name: 'rank',
    initialState,
    reducers: {
        setRanks: rankAdapter.setAll,
        addRank: rankAdapter.addOne,
        addRanks: rankAdapter.addMany,
        updateRank: rankAdapter.updateOne,
        updateRanks: rankAdapter.updateMany,
        deleteRank: rankAdapter.removeOne,
        deleteRanks: rankAdapter.removeMany,
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch all ranks
            .addCase(fetchAllRanks.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllRanks.fulfilled, (state, action) => {
                rankAdapter.setAll(state, action.payload);
                state.loading = false;
            })
            .addCase(fetchAllRanks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch ranks';
            })
            // Fetch rank by id
            .addCase(fetchRankById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchRankById.fulfilled, (state, action) => {
                if (action.payload) {
                    rankAdapter.upsertOne(state, action.payload);
                }
                state.loading = false;
            })
            .addCase(fetchRankById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch rank';
            })
            // Fetch ranks by ids
            .addCase(fetchRanksByIds.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchRanksByIds.fulfilled, (state, action) => {
                rankAdapter.upsertMany(state, action.payload);
                state.loading = false;
            })
            .addCase(fetchRanksByIds.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch ranks';
            })
            // Fetch ranks of user
            .addCase(fetchRanksOfUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchRanksOfUser.fulfilled, (state, action) => {
                rankAdapter.setAll(state, action.payload);
                state.loading = false;
            })
            .addCase(fetchRanksOfUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch user ranks';
            })
            // Create rank
            .addCase(createRankThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createRankThunk.fulfilled, (state, action) => {
                rankAdapter.addOne(state, action.payload);
                state.loading = false;
            })
            .addCase(createRankThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to create rank';
            })
            // Update rank
            .addCase(updateRankThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateRankThunk.fulfilled, (state, action) => {
                rankAdapter.upsertOne(state, action.payload);
                state.loading = false;
            })
            .addCase(updateRankThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to update rank';
            })
            // Delete rank
            .addCase(deleteRankThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteRankThunk.fulfilled, (state, action) => {
                rankAdapter.removeOne(state, action.payload);
                state.loading = false;
            })
            .addCase(deleteRankThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to delete rank';
            });
    },
});

export const { setRanks, addRank, addRanks, updateRank, updateRanks, deleteRank, deleteRanks, setLoading, setError } = rankSlice.actions;

export const rankSelectors = rankAdapter.getSelectors<RootState>((state) => state.rank);

export default rankSlice.reducer;
