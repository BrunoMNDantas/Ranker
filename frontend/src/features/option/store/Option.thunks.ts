import { createAsyncThunk } from '@reduxjs/toolkit';
import { Option } from '../model/Option.types';
import { getAllOptions, getOption, getOptionsOfRank, getOptionsOfUser, createOption, updateOption, deleteOption } from '../api/Option.api';

export const fetchAllOptions = createAsyncThunk(
    'option/fetchAll',
    async () => {
        return await getAllOptions();
    }
);

export const fetchOptionById = createAsyncThunk(
    'option/fetchById',
    async (id: string) => {
        return await getOption(id);
    }
);

export const fetchOptionsOfRank = createAsyncThunk(
    'option/fetchOfRank',
    async (rankId: string) => {
        return await getOptionsOfRank(rankId);
    }
);

export const fetchOptionsOfUser = createAsyncThunk(
    'option/fetchOfUser',
    async (ownerId: string) => {
        return await getOptionsOfUser(ownerId);
    }
);

export const createOptionThunk = createAsyncThunk(
    'option/create',
    async (option: Option) => {
        const id = await createOption(option);
        return { ...option, id };
    }
);

export const updateOptionThunk = createAsyncThunk(
    'option/update',
    async (option: Option) => {
        await updateOption(option);
        return option;
    }
);

export const deleteOptionThunk = createAsyncThunk(
    'option/delete',
    async (id: string) => {
        await deleteOption(id);
        return id;
    }
);
