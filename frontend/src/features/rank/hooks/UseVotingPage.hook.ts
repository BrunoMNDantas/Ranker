import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { fetchRankById } from '../store/Rank.thunks';
import { fetchOptionsOfRank } from '../../option/store/Option.thunks';
import { fetchTiersOfRank } from '../../tier/store/Tier.thunks';
import { fetchUserById } from '../../user/store/User.thunks';
import { selectRankById, selectRanksLoading, selectRanksError } from '../store/Rank.selectors';
import { selectOptionsLoading, selectOptionsError } from '../../option/store/Option.selectors';
import { selectTiersLoading, selectTiersError } from '../../tier/store/Tier.selectors';
import { selectUsersLoading, selectUsersError } from '../../user/store/User.selectors';
import { RootState } from '../../../app/store';

export const getVotingPageData = (state: RootState) => {
    const loading =
        selectRanksLoading(state) ||
        selectOptionsLoading(state) ||
        selectTiersLoading(state) ||
        selectUsersLoading(state);

    const error =
        selectRanksError(state) ||
        selectOptionsError(state) ||
        selectTiersError(state) ||
        selectUsersError(state);

    return {
        fetching: loading,
        error,
    };
};

export const useVotingPageData = (rankId: string) => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (rankId) {
            dispatch(fetchRankById(rankId));
            dispatch(fetchOptionsOfRank(rankId));
            dispatch(fetchTiersOfRank(rankId));
        }
    }, [dispatch, rankId]);

    const rank = useAppSelector((state) => selectRankById(state, rankId));

    useEffect(() => {
        if (rank) {
            dispatch(fetchUserById(rank.ownerId));
        }
    }, [dispatch, rank?.ownerId]);

    return useAppSelector(getVotingPageData);
};
