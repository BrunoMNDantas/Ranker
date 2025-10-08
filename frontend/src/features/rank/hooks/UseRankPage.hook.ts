import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { fetchRankById } from '../store/Rank.thunks';
import { fetchOptionsOfRank } from '../../option/store/Option.thunks';
import { fetchTiersOfRank } from '../../tier/store/Tier.thunks';
import { fetchVotesOfRank } from '../../vote/store/Vote.thunks';
import { fetchUserById } from '../../user/store/User.thunks';
import { selectRankById, selectRanksLoading, selectRanksError } from '../store/Rank.selectors';
import { selectAllOptions, selectOptionsLoading, selectOptionsError } from '../../option/store/Option.selectors';
import { selectAllTiers, selectTiersLoading, selectTiersError } from '../../tier/store/Tier.selectors';
import { selectAllVotes, selectVotesLoading, selectVotesError } from '../../vote/store/Vote.selectors';
import { selectUserById, selectUsersLoading, selectUsersError } from '../../user/store/User.selectors';

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
    const options = useAppSelector((state) => selectAllOptions(state));
    const tiers = useAppSelector((state) => selectAllTiers(state));
    const votes = useAppSelector((state) => selectAllVotes(state));

    useEffect(() => {
        if (rank) {
            dispatch(fetchUserById(rank.ownerId));
        }
    }, [dispatch, rank]);

    const user = useAppSelector((state) =>
        rank ? selectUserById(state, rank.ownerId) : null
    );

    const loading = useAppSelector((state) =>
        selectRanksLoading(state) ||
        selectOptionsLoading(state) ||
        selectTiersLoading(state) ||
        selectVotesLoading(state) ||
        selectUsersLoading(state)
    );

    const error = useAppSelector((state) =>
        selectRanksError(state) ||
        selectOptionsError(state) ||
        selectTiersError(state) ||
        selectVotesError(state) ||
        selectUsersError(state)
    );

    return {
        rank,
        options,
        tiers,
        votes,
        user,
        fetching: loading,
        error,
    };
};