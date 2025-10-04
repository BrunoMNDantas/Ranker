import { createAsyncThunk } from '@reduxjs/toolkit';
import { Tier } from '../model/Tier.types';
import { getAllTiers, getTier, getTiersByIds, getTiersOfRank, getTiersOfUser, createTier, updateTier, deleteTier } from '../api/Tier.api';

export const fetchAllTiers = createAsyncThunk(
    'tier/fetchAll',
    async () => {
        return await getAllTiers();
    }
);

export const fetchTierById = createAsyncThunk(
    'tier/fetchById',
    async (id: string) => {
        return await getTier(id);
    }
);

export const fetchTiersByIds = createAsyncThunk(
    'tier/fetchByIds',
    async (ids: string[]) => {
        return await getTiersByIds(ids);
    }
);

export const fetchTiersOfRank = createAsyncThunk(
    'tier/fetchOfRank',
    async (rankId: string) => {
        return await getTiersOfRank(rankId);
    }
);

export const fetchTiersOfUser = createAsyncThunk(
    'tier/fetchOfUser',
    async (ownerId: string) => {
        return await getTiersOfUser(ownerId);
    }
);

export const createTierThunk = createAsyncThunk(
    'tier/create',
    async (tier: Tier) => {
        const id = await createTier(tier);
        return { ...tier, id };
    }
);

export const updateTierThunk = createAsyncThunk(
    'tier/update',
    async (tier: Tier) => {
        await updateTier(tier);
        return tier;
    }
);

export const deleteTierThunk = createAsyncThunk(
    'tier/delete',
    async (id: string) => {
        await deleteTier(id);
        return id;
    }
);
