import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { fetchAllRanks } from '../store/Rank.thunks';
import { fetchUserById } from '../../user/store/User.thunks';
import { selectAllRanks, selectRanksLoading, selectRanksError } from '../store/Rank.selectors';
import { selectUsersLoading, selectUsersError } from '../../user/store/User.selectors';
import { RootState } from '../../../app/store';

export const getRanksPageData = (state: RootState) => {
    const loading = selectRanksLoading(state) || selectUsersLoading(state);
    const error = selectRanksError(state) || selectUsersError(state);

    return {
        fetching: loading,
        error,
    };
};

export const useRanksPageData = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchAllRanks());
    }, [dispatch]);

    const ranks = useAppSelector((state) => selectAllRanks(state));

    useEffect(() => {
        ranks.forEach((rank) => {
            dispatch(fetchUserById(rank.ownerId));
        });
    }, [dispatch, ranks]);

    return useAppSelector(getRanksPageData);
};
