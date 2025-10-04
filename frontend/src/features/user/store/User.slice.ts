import { createSlice, createEntityAdapter, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../model/User.types';
import { RootState } from '../../../app/store';
import { fetchAllUsers, fetchUserById, fetchUsersByIds, createUserThunk, updateUserThunk, deleteUserThunk } from './User.thunks';

const userAdapter = createEntityAdapter<User>();

interface UserState {
    loading: boolean;
    error: string | null;
}

const initialState = userAdapter.getInitialState<UserState>({
    loading: false,
    error: null,
});

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUsers: userAdapter.setAll,
        addUser: userAdapter.addOne,
        addUsers: userAdapter.addMany,
        updateUser: userAdapter.updateOne,
        updateUsers: userAdapter.updateMany,
        deleteUser: userAdapter.removeOne,
        deleteUsers: userAdapter.removeMany,
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch all users
            .addCase(fetchAllUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllUsers.fulfilled, (state, action) => {
                userAdapter.setAll(state, action.payload);
                state.loading = false;
            })
            .addCase(fetchAllUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch users';
            })
            // Fetch user by id
            .addCase(fetchUserById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUserById.fulfilled, (state, action) => {
                if (action.payload) {
                    userAdapter.upsertOne(state, action.payload);
                }
                state.loading = false;
            })
            .addCase(fetchUserById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch user';
            })
            // Fetch users by ids
            .addCase(fetchUsersByIds.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUsersByIds.fulfilled, (state, action) => {
                userAdapter.upsertMany(state, action.payload);
                state.loading = false;
            })
            .addCase(fetchUsersByIds.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch users';
            })
            // Create user
            .addCase(createUserThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createUserThunk.fulfilled, (state, action) => {
                userAdapter.addOne(state, action.payload);
                state.loading = false;
            })
            .addCase(createUserThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to create user';
            })
            // Update user
            .addCase(updateUserThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateUserThunk.fulfilled, (state, action) => {
                userAdapter.upsertOne(state, action.payload);
                state.loading = false;
            })
            .addCase(updateUserThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to update user';
            })
            // Delete user
            .addCase(deleteUserThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteUserThunk.fulfilled, (state, action) => {
                userAdapter.removeOne(state, action.payload);
                state.loading = false;
            })
            .addCase(deleteUserThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to delete user';
            });
    },
});

export const { setUsers, addUser, addUsers, updateUser, updateUsers, deleteUser, deleteUsers, setLoading, setError } = userSlice.actions;

export const userSelectors = userAdapter.getSelectors<RootState>((state) => state.user);

export default userSlice.reducer;
