import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { fetchRankById } from '../store/Rank.thunks';
import { fetchOptionsOfRank } from '../../option/store/Option.thunks';
import { fetchTiersOfRank } from '../../tier/store/Tier.thunks';
import { fetchVotesOfRank } from '../../vote/store/Vote.thunks';
import { fetchUserById } from '../../user/store/User.thunks';
import { selectRankById, selectRanksLoading, selectRanksError } from '../store/Rank.selectors';
import { selectOptionsLoading, selectOptionsError } from '../../option/store/Option.selectors';
import { selectTiersLoading, selectTiersError } from '../../tier/store/Tier.selectors';
import { selectVotesLoading, selectVotesError } from '../../vote/store/Vote.selectors';
import { selectUsersLoading, selectUsersError } from '../../user/store/User.selectors';
import { RootState } from '../../../app/store';

export const getRankPageData = (state: RootState) => {
    const loading =
        selectRanksLoading(state) ||
        selectOptionsLoading(state) ||
        selectTiersLoading(state) ||
        selectVotesLoading(state) ||
        selectUsersLoading(state);

    const error =
        selectRanksError(state) ||
        selectOptionsError(state) ||
        selectTiersError(state) ||
        selectVotesError(state) ||
        selectUsersError(state);

    return {
        fetching: loading,
        error,
    };
};

export const useRankPageData = (rankId: string) => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (rankId) {
            dispatch(fetchRankById(rankId));
            dispatch(fetchOptionsOfRank(rankId));
            dispatch(fetchTiersOfRank(rankId));
            dispatch(fetchVotesOfRank(rankId));
        }
    }, [dispatch, rankId]);

    const rank = useAppSelector((state) => selectRankById(state, rankId));

    useEffect(() => {
        if (rank) {
            dispatch(fetchUserById(rank.ownerId));
        }
    }, [dispatch, rank?.ownerId]);

    return useAppSelector(getRankPageData);
};