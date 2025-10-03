import { createSlice, createEntityAdapter, PayloadAction } from '@reduxjs/toolkit';
import { Vote } from '../model/Vote.types';
import { RootState } from '../../../app/store';
import { fetchAllVotes, fetchVoteById, fetchVotesOfRank, fetchVotesOfUser, createVoteThunk, updateVoteThunk, deleteVoteThunk } from './Vote.thunks';

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
    extraReducers: (builder) => {
        builder
            // Fetch all votes
            .addCase(fetchAllVotes.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllVotes.fulfilled, (state, action) => {
                voteAdapter.setAll(state, action.payload);
                state.loading = false;
            })
            .addCase(fetchAllVotes.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch votes';
            })
            // Fetch vote by id
            .addCase(fetchVoteById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchVoteById.fulfilled, (state, action) => {
                if (action.payload) {
                    voteAdapter.upsertOne(state, action.payload);
                }
                state.loading = false;
            })
            .addCase(fetchVoteById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch vote';
            })
            // Fetch votes of rank
            .addCase(fetchVotesOfRank.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchVotesOfRank.fulfilled, (state, action) => {
                voteAdapter.setAll(state, action.payload);
                state.loading = false;
            })
            .addCase(fetchVotesOfRank.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch rank votes';
            })
            // Fetch votes of user
            .addCase(fetchVotesOfUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchVotesOfUser.fulfilled, (state, action) => {
                voteAdapter.setAll(state, action.payload);
                state.loading = false;
            })
            .addCase(fetchVotesOfUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch user votes';
            })
            // Create vote
            .addCase(createVoteThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createVoteThunk.fulfilled, (state, action) => {
                voteAdapter.addOne(state, action.payload);
                state.loading = false;
            })
            .addCase(createVoteThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to create vote';
            })
            // Update vote
            .addCase(updateVoteThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateVoteThunk.fulfilled, (state, action) => {
                voteAdapter.upsertOne(state, action.payload);
                state.loading = false;
            })
            .addCase(updateVoteThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to update vote';
            })
            // Delete vote
            .addCase(deleteVoteThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteVoteThunk.fulfilled, (state, action) => {
                voteAdapter.removeOne(state, action.payload);
                state.loading = false;
            })
            .addCase(deleteVoteThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to delete vote';
            });
    },
});

export const { setVotes, addVote, addVotes, updateVote, updateVotes, deleteVote, deleteVotes, setLoading, setError } = voteSlice.actions;

export const voteSelectors = voteAdapter.getSelectors<RootState>((state) => state.vote);

export default voteSlice.reducer;
