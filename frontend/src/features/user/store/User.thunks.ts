import { createAsyncThunk } from '@reduxjs/toolkit';
import { User } from '../model/User.types';
import { getAllUsers, getUser, getUsersByIds, createUser, updateUser, deleteUser } from '../api/User.api';

export const fetchAllUsers = createAsyncThunk(
    'user/fetchAll',
    async () => {
        return await getAllUsers();
    }
);

export const fetchUserById = createAsyncThunk(
    'user/fetchById',
    async (id: string) => {
        return await getUser(id);
    }
);

export const fetchUsersByIds = createAsyncThunk(
    'user/fetchByIds',
    async (ids: string[]) => {
        return await getUsersByIds(ids);
    }
);

export const createUserThunk = createAsyncThunk(
    'user/create',
    async (user: User) => {
        const id = await createUser(user);
        return { ...user, id };
    }
);

export const updateUserThunk = createAsyncThunk(
    'user/update',
    async (user: User) => {
        await updateUser(user);
        return user;
    }
);

export const deleteUserThunk = createAsyncThunk(
    'user/delete',
    async (id: string) => {
        await deleteUser(id);
        return id;
    }
);
