import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { fetchRankById } from '../store/Rank.thunks';
import { fetchOptionsOfRank } from '../../option/store/Option.thunks';
import { fetchTiersOfRank } from '../../tier/store/Tier.thunks';
import { fetchUserById } from '../../user/store/User.thunks';
import { selectRankById, selectRanksLoading, selectRanksError } from '../store/Rank.selectors';
import { selectAllOptions, selectOptionsLoading, selectOptionsError } from '../../option/store/Option.selectors';
import { selectAllTiers, selectTiersLoading, selectTiersError } from '../../tier/store/Tier.selectors';
import { selectUserById, selectUsersLoading, selectUsersError } from '../../user/store/User.selectors';

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
    const options = useAppSelector((state) => selectAllOptions(state));
    const tiers = useAppSelector((state) => selectAllTiers(state));

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
        selectUsersLoading(state)
    );

    const error = useAppSelector((state) =>
        selectRanksError(state) ||
        selectOptionsError(state) ||
        selectTiersError(state) ||
        selectUsersError(state)
    );

    return {
        rank,
        options,
        tiers,
        user,
        fetching: loading,
        error,
    };
};
