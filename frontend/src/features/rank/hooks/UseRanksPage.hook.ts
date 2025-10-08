import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { fetchAllRanks } from '../store/Rank.thunks';
import { fetchUserById } from '../../user/store/User.thunks';
import { selectAllRanks, selectRanksLoading, selectRanksError } from '../store/Rank.selectors';
import { selectAllUsers, selectUsersLoading, selectUsersError } from '../../user/store/User.selectors';

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

    const users = useAppSelector((state) => selectAllUsers(state));
    const loading = useAppSelector((state) => selectRanksLoading(state) || selectUsersLoading(state));
    const error = useAppSelector((state) => selectRanksError(state) || selectUsersError(state));

    return {
        ranks,
        users,
        fetching: loading,
        error,
    };
};
