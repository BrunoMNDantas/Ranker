import { createSlice, createEntityAdapter, PayloadAction } from '@reduxjs/toolkit';
import { Vote } from '../model/Vote.types';
import { RootState } from '../../../app/store';

const voteAdapter = createEntityAdapter<Vote>();

interface VoteState {
    loading: boolean;
    error: string | null;
}

const initialState = voteAdapter.getInitialState<VoteState>({
    loading: false,
    error: null,
});

const voteSlice = createSlice({
    name: 'vote',
    initialState,
    reducers: {
        setVotes: voteAdapter.setAll,
        addVote: voteAdapter.addOne,
        addVotes: voteAdapter.addMany,
        updateVote: voteAdapter.updateOne,
        updateVotes: voteAdapter.updateMany,
        deleteVote: voteAdapter.removeOne,
        deleteVotes: voteAdapter.removeMany,
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
    },
});

export const { setVotes, addVote, addVotes, updateVote, updateVotes, deleteVote, deleteVotes, setLoading, setError } = voteSlice.actions;

export const voteSelectors = voteAdapter.getSelectors<RootState>((state) => state.vote);

export default voteSlice.reducer;
