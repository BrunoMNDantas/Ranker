import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { fetchRankById } from '../store/Rank.thunks';
import { fetchOptionsOfRank } from '../../option/store/Option.thunks';
import { fetchTiersOfRank } from '../../tier/store/Tier.thunks';
import { fetchUserById } from '../../user/store/User.thunks';
import { rankSelectors } from '../store/Rank.slice';
import { optionSelectors } from '../../option/store/Option.slice';
import { tierSelectors } from '../../tier/store/Tier.slice';
import { userSelectors } from '../../user/store/User.slice';

export const useVotingPageData = (rankId: string) => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (rankId) {
            dispatch(fetchRankById(rankId));
            dispatch(fetchOptionsOfRank(rankId));
            dispatch(fetchTiersOfRank(rankId));
        }
    }, [dispatch, rankId]);

    const rank = useAppSelector((state) => rankSelectors.selectById(state, rankId));
    const options = useAppSelector((state) => optionSelectors.selectAll(state));
    const tiers = useAppSelector((state) => tierSelectors.selectAll(state));

    useEffect(() => {
        if (rank) {
            dispatch(fetchUserById(rank.ownerId));
        }
    }, [dispatch, rank]);

    const user = useAppSelector((state) =>
        rank ? userSelectors.selectById(state, rank.ownerId) : null
    );

    const loading = useAppSelector((state) =>
        state.rank.loading ||
        state.option.loading ||
        state.tier.loading ||
        state.user.loading
    );

    const error = useAppSelector((state) =>
        state.rank.error ||
        state.option.error ||
        state.tier.error ||
        state.user.error
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
