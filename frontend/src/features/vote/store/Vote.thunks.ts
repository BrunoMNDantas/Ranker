import { createAsyncThunk } from '@reduxjs/toolkit';
import { Vote } from '../model/Vote.types';
import { getAllVotes, getVote, getVotesOfRank, getVotesOfUser, createVote, updateVote, deleteVote } from '../api/Vote.api';

export const fetchAllVotes = createAsyncThunk(
    'vote/fetchAll',
    async () => {
        return await getAllVotes();
    }
);

export const fetchVoteById = createAsyncThunk(
    'vote/fetchById',
    async (id: string) => {
        return await getVote(id);
    }
);

export const fetchVotesOfRank = createAsyncThunk(
    'vote/fetchOfRank',
    async (rankId: string) => {
        return await getVotesOfRank(rankId);
    }
);

export const fetchVotesOfUser = createAsyncThunk(
    'vote/fetchOfUser',
    async (ownerId: string) => {
        return await getVotesOfUser(ownerId);
    }
);

export const createVoteThunk = createAsyncThunk(
    'vote/create',
    async (vote: Vote) => {
        const id = await createVote(vote);
        return { ...vote, id };
    }
);

export const updateVoteThunk = createAsyncThunk(
    'vote/update',
    async (vote: Vote) => {
        await updateVote(vote);
        return vote;
    }
);

export const deleteVoteThunk = createAsyncThunk(
    'vote/delete',
    async (id: string) => {
        await deleteVote(id);
        return id;
    }
);
