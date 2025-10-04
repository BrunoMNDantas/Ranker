import { createAsyncThunk } from '@reduxjs/toolkit';
import { Rank } from '../model/Rank.types';
import { getAllRanks, getRank, getRanksByIds, getRanksOfUser, createRank, updateRank, deleteRank } from '../api/Rank.api';

export const fetchAllRanks = createAsyncThunk(
    'rank/fetchAll',
    async () => {
        return await getAllRanks();
    }
);

export const fetchRankById = createAsyncThunk(
    'rank/fetchById',
    async (id: string) => {
        return await getRank(id);
    }
);

export const fetchRanksByIds = createAsyncThunk(
    'rank/fetchByIds',
    async (ids: string[]) => {
        return await getRanksByIds(ids);
    }
);

export const fetchRanksOfUser = createAsyncThunk(
    'rank/fetchOfUser',
    async (ownerId: string) => {
        return await getRanksOfUser(ownerId);
    }
);

export const createRankThunk = createAsyncThunk(
    'rank/create',
    async (rank: Rank) => {
        const id = await createRank(rank);
        return { ...rank, id };
    }
);

export const updateRankThunk = createAsyncThunk(
    'rank/update',
    async (rank: Rank) => {
        await updateRank(rank);
        return rank;
    }
);

export const deleteRankThunk = createAsyncThunk(
    'rank/delete',
    async (id: string) => {
        await deleteRank(id);
        return id;
    }
);
