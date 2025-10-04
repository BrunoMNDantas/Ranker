import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { fetchAllRanks } from '../store/Rank.thunks';
import { fetchUserById } from '../../user/store/User.thunks';
import { rankSelectors } from '../store/Rank.slice';
import { userSelectors } from '../../user/store/User.slice';

export const useRanksPageData = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchAllRanks());
    }, [dispatch]);

    const ranks = useAppSelector((state) => rankSelectors.selectAll(state));

    useEffect(() => {
        ranks.forEach((rank) => {
            dispatch(fetchUserById(rank.ownerId));
        });
    }, [dispatch, ranks]);

    const users = useAppSelector((state) => userSelectors.selectAll(state));
    const loading = useAppSelector((state) => state.rank.loading || state.user.loading);
    const error = useAppSelector((state) => state.rank.error || state.user.error);

    return {
        ranks,
        users,
        fetching: loading,
        error,
    };
};
