import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { fetchUserById } from '../store/User.thunks';
import { fetchRanksOfUser } from '../../rank/store/Rank.thunks';
import { fetchVotesOfUser } from '../../vote/store/Vote.thunks';
import { userSelectors } from '../store/User.slice';
import { rankSelectors } from '../../rank/store/Rank.slice';
import { voteSelectors } from '../../vote/store/Vote.slice';

export const useUserPageData = (userId: string) => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (userId) {
            dispatch(fetchUserById(userId));
            dispatch(fetchRanksOfUser(userId));
            dispatch(fetchVotesOfUser(userId));
        }
    }, [dispatch, userId]);

    const user = useAppSelector((state) => userSelectors.selectById(state, userId));
    const ranks = useAppSelector((state) => rankSelectors.selectAll(state));
    const votes = useAppSelector((state) => voteSelectors.selectAll(state));

    const loading = useAppSelector((state) =>
        state.user.loading ||
        state.rank.loading ||
        state.vote.loading
    );

    const error = useAppSelector((state) =>
        state.user.error ||
        state.rank.error ||
        state.vote.error
    );

    return {
        user,
        ranks,
        votes,
        fetching: loading,
        error,
    };
};
