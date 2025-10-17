import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { fetchUserById } from '../store/User.thunks';
import { fetchRanksOfUser } from '../../rank/store/Rank.thunks';
import { fetchVotesOfUser } from '../../vote/store/Vote.thunks';
import { selectUsersLoading, selectUsersError } from '../store/User.selectors';
import { selectRanksLoading, selectRanksError } from '../../rank/store/Rank.selectors';
import { selectVotesLoading, selectVotesError } from '../../vote/store/Vote.selectors';
import { RootState } from '../../../app/store';

export const getUserPageData = (state: RootState) => {
    const loading =
        selectUsersLoading(state) ||
        selectRanksLoading(state) ||
        selectVotesLoading(state);

    const error =
        selectUsersError(state) ||
        selectRanksError(state) ||
        selectVotesError(state);

    return {
        fetching: loading,
        error,
    };
};

export const useUserPageData = (userId: string) => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (userId) {
            dispatch(fetchUserById(userId));
            dispatch(fetchRanksOfUser(userId));
            dispatch(fetchVotesOfUser(userId));
        }
    }, [dispatch, userId]);

    return useAppSelector(getUserPageData);
};
