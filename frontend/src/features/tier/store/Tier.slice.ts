import { createSlice, createEntityAdapter, PayloadAction } from '@reduxjs/toolkit';
import { Tier } from '../model/Tier.types';
import { RootState } from '../../../app/store';

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
});

export const { setTiers, addTier, addTiers, updateTier, updateTiers, deleteTier, deleteTiers, setLoading, setError } = tierSlice.actions;

export const tierSelectors = tierAdapter.getSelectors<RootState>((state) => state.tier);

export default tierSlice.reducer;
