import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { fetchUserById } from '../store/User.thunks';
import { fetchRanksOfUser } from '../../rank/store/Rank.thunks';
import { fetchVotesOfUser } from '../../vote/store/Vote.thunks';
import { selectUserById, selectUsersLoading, selectUsersError } from '../store/User.selectors';
import { selectRanksOfUser, selectRanksLoading, selectRanksError } from '../../rank/store/Rank.selectors';
import { selectVotesOfUser, selectVotesLoading, selectVotesError } from '../../vote/store/Vote.selectors';

export const useUserPageData = (userId: string) => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (userId) {
            dispatch(fetchUserById(userId));
            dispatch(fetchRanksOfUser(userId));
            dispatch(fetchVotesOfUser(userId));
        }
    }, [dispatch, userId]);

    const user = useAppSelector((state) => selectUserById(state, userId));
    const ranks = useAppSelector((state) => selectRanksOfUser(state, userId));
    const votes = useAppSelector((state) => selectVotesOfUser(state, userId));

    const loading = useAppSelector((state) =>
        selectUsersLoading(state) ||
        selectRanksLoading(state) ||
        selectVotesLoading(state)
    );

    const error = useAppSelector((state) =>
        selectUsersError(state) ||
        selectRanksError(state) ||
        selectVotesError(state)
    );

    return {
        user,
        ranks,
        votes,
        fetching: loading,
        error,
    };
};
