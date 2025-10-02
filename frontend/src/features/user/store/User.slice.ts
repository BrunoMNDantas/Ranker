import { createSlice, createEntityAdapter, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../model/User.types';
import { RootState } from '../../../app/store';

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
});

export const { setUsers, addUser, addUsers, updateUser, updateUsers, deleteUser, deleteUsers, setLoading, setError } = userSlice.actions;

export const userSelectors = userAdapter.getSelectors<RootState>((state) => state.user);

export default userSlice.reducer;
