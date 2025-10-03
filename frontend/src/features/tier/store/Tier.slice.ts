import { createSlice, createEntityAdapter, PayloadAction } from '@reduxjs/toolkit';
import { Tier } from '../model/Tier.types';
import { RootState } from '../../../app/store';
import { fetchAllTiers, fetchTierById, fetchTiersOfRank, fetchTiersOfUser, createTierThunk, updateTierThunk, deleteTierThunk } from './Tier.thunks';

const tierAdapter = createEntityAdapter<Tier>();

interface TierState {
    loading: boolean;
    error: string | null;
}

const initialState = tierAdapter.getInitialState<TierState>({
    loading: false,
    error: null,
});

const tierSlice = createSlice({
    name: 'tier',
    initialState,
    reducers: {
        setTiers: tierAdapter.setAll,
        addTier: tierAdapter.addOne,
        addTiers: tierAdapter.addMany,
        updateTier: tierAdapter.updateOne,
        updateTiers: tierAdapter.updateMany,
        deleteTier: tierAdapter.removeOne,
        deleteTiers: tierAdapter.removeMany,
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch all tiers
            .addCase(fetchAllTiers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllTiers.fulfilled, (state, action) => {
                tierAdapter.setAll(state, action.payload);
                state.loading = false;
            })
            .addCase(fetchAllTiers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch tiers';
            })
            // Fetch tier by id
            .addCase(fetchTierById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTierById.fulfilled, (state, action) => {
                if (action.payload) {
                    tierAdapter.upsertOne(state, action.payload);
                }
                state.loading = false;
            })
            .addCase(fetchTierById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch tier';
            })
            // Fetch tiers of rank
            .addCase(fetchTiersOfRank.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTiersOfRank.fulfilled, (state, action) => {
                tierAdapter.setAll(state, action.payload);
                state.loading = false;
            })
            .addCase(fetchTiersOfRank.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch rank tiers';
            })
            // Fetch tiers of user
            .addCase(fetchTiersOfUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTiersOfUser.fulfilled, (state, action) => {
                tierAdapter.setAll(state, action.payload);
                state.loading = false;
            })
            .addCase(fetchTiersOfUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch user tiers';
            })
            // Create tier
            .addCase(createTierThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createTierThunk.fulfilled, (state, action) => {
                tierAdapter.addOne(state, action.payload);
                state.loading = false;
            })
            .addCase(createTierThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to create tier';
            })
            // Update tier
            .addCase(updateTierThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateTierThunk.fulfilled, (state, action) => {
                tierAdapter.upsertOne(state, action.payload);
                state.loading = false;
            })
            .addCase(updateTierThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to update tier';
            })
            // Delete tier
            .addCase(deleteTierThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteTierThunk.fulfilled, (state, action) => {
                tierAdapter.removeOne(state, action.payload);
                state.loading = false;
            })
            .addCase(deleteTierThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to delete tier';
            });
    },
});

export const { setTiers, addTier, addTiers, updateTier, updateTiers, deleteTier, deleteTiers, setLoading, setError } = tierSlice.actions;

export const tierSelectors = tierAdapter.getSelectors<RootState>((state) => state.tier);

export default tierSlice.reducer;
