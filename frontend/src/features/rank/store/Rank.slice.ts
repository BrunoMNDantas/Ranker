import { createSlice, createEntityAdapter, PayloadAction } from '@reduxjs/toolkit';
import { Rank } from '../model/Rank.types';
import { RootState } from '../../../app/store';

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
});

export const { setRanks, addRank, addRanks, updateRank, updateRanks, deleteRank, deleteRanks, setLoading, setError } = rankSlice.actions;

export const rankSelectors = rankAdapter.getSelectors<RootState>((state) => state.rank);

export default rankSlice.reducer;
