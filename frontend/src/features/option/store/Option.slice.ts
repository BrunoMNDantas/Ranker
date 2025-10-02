import { createSlice, createEntityAdapter, PayloadAction } from '@reduxjs/toolkit';
import { Option } from '../model/Option.types';
import { RootState } from '../../../app/store';

const optionAdapter = createEntityAdapter<Option>();

interface OptionState {
    loading: boolean;
    error: string | null;
}

const initialState = optionAdapter.getInitialState<OptionState>({
    loading: false,
    error: null,
});

const optionSlice = createSlice({
    name: 'option',
    initialState,
    reducers: {
        setOptions: optionAdapter.setAll,
        addOption: optionAdapter.addOne,
        addOptions: optionAdapter.addMany,
        updateOption: optionAdapter.updateOne,
        updateOptions: optionAdapter.updateMany,
        deleteOption: optionAdapter.removeOne,
        deleteOptions: optionAdapter.removeMany,
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
    },
});

export const { setOptions, addOption, addOptions, updateOption, updateOptions, deleteOption, deleteOptions, setLoading, setError } = optionSlice.actions;

export const optionSelectors = optionAdapter.getSelectors<RootState>((state) => state.option);

export default optionSlice.reducer;
